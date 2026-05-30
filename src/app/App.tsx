import { useState, useEffect } from 'react';
import { onAuthStateChange, getProfile, signOut as supabaseSignOut } from './utils/supabase/db';
import type { Profile, Event } from './utils/supabase/types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VerifiedHostsCarousel } from './components/VerifiedHostsCarousel';
import { EventCategoriesSection } from './components/EventCategoriesSection';
import { EventsGrid } from './components/EventsGrid';
import { JoinWandererCTA } from './components/JoinWandererCTA';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { ProfileSetupPage } from './components/ProfileSetupPage';
import { DiscoverPage } from './components/DiscoverPage';
import { HostEventPage } from './components/HostEventPage';
import { UserDashboard } from './components/UserDashboard';
import { HostDashboard } from './components/HostDashboard';
import { MainDashboard } from './components/MainDashboard';
import { MissionPage } from './components/MissionPage';
import { EventDetailPage } from './components/EventDetailPage';
import { AmbassadorPage } from './components/AmbassadorPage';
import { ContactPage } from './components/ContactPage';
import { ProfilePage } from './components/ProfilePage';
import { Toaster } from './components/ui/sonner';

type Page =
  | 'home'
  | 'auth'
  | 'profile-setup'
  | 'discover'
  | 'host-event'
  | 'user-dashboard'
  | 'host-dashboard'
  | 'main-dashboard'
  | 'mission'
  | 'event-detail'
  | 'ambassador'
  | 'contact'
  | 'profile-page';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'user' | 'host'>('user');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  // Where to redirect after login
  const [returnTo, setReturnTo] = useState<Page | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // block render until session resolved

  useEffect(() => {
    // Single source of truth: onAuthStateChange
    // INITIAL_SESSION fires on mount with existing session (or null)
    // SIGNED_IN fires on login (email, Google OAuth, etc.)
    // SIGNED_OUT fires on logout
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (event === 'INITIAL_SESSION') {
        if (session) {
          // User has an active session — restore state
          setIsAuthenticated(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email ?? '');
          const p = await getProfile(session.user.id);
          if (p) {
            setProfile(p);
            setUserType(p.role);
            if (!p.onboarding_completed) {
              setCurrentPage('profile-setup');
            }
            // else: stay on current page (home is fine on refresh)
          } else {
            // Profile not created yet → onboarding
            setUserEmail(session.user.email ?? '');
            setCurrentPage('profile-setup');
          }
        }
        // Always resolve loading after INITIAL_SESSION
        setAuthLoading(false);
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? '');
        const p = await getProfile(session.user.id);
        if (p) {
          setProfile(p);
          setUserType(p.role);
          if (p.onboarding_completed) {
            setCurrentPage(prev => {
              // returnTo has priority, otherwise go to dashboard if coming from auth
              if (prev === 'auth' || prev === 'home') return 'main-dashboard';
              return prev;
            });
          } else {
            setCurrentPage('profile-setup');
          }
        } else {
          // New user — no profile yet → onboarding
          setCurrentPage('profile-setup');
        }
        setAuthLoading(false);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserId('');
        setUserEmail('');
        setProfile(null);
        setUserType('user');
        setCurrentPage('home');
        setAuthLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigateToAuth = () => setCurrentPage('auth');
  const navigateToHome = () => setCurrentPage('home');
  const navigateToDiscover = () => setCurrentPage('discover');
  const navigateToHostEvent = () => {
    if (!isAuthenticated) {
      setReturnTo('host-event');
      setCurrentPage('auth');
      return;
    }
    setEditingEvent(null);
    setCurrentPage('host-event');
  };
  const navigateToUserDashboard = () => setCurrentPage('user-dashboard');
  const navigateToHostDashboard = () => setCurrentPage('host-dashboard');
  const navigateToMainDashboard = () => setCurrentPage('main-dashboard');
  const navigateToMission = () => setCurrentPage('mission');
  const navigateToAmbassador = () => setCurrentPage('ambassador');
  const navigateToContact = () => setCurrentPage('contact');
  const navigateToProfilePage = () => setCurrentPage('profile-page');
  const navigateToEventDetail = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage('event-detail');
  };
  const navigateToProfileSetup = (email: string) => {
    setUserEmail(email);
    setCurrentPage('profile-setup');
  };

  const handleAuthSuccess = (email: string, _isNewUser: boolean = false) => {
    // onAuthStateChange(SIGNED_IN) handles everything automatically.
    // This callback is only used as a fallback signal from AuthPage.
    setUserEmail(email);
  };

  const handleProfileComplete = () => {
    navigateToMainDashboard();
  };

  const handleSignOut = async () => {
    await supabaseSignOut();
    setIsAuthenticated(false);
    setUserId('');
    setUserEmail('');
    setProfile(null);
    setUserType('user');
    navigateToHome();
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setCurrentPage('host-event');
  };

  const handleProfileUpdated = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    setUserType(updatedProfile.role);
  };

  // Block render until Supabase resolves the session
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
            <path d="M14 2C9.582 2 6 5.582 6 10c0 5.5 8 16 8 16s8-10.5 8-16c0-4.418-3.582-8-8-8z" fill="#7C3AED" opacity=".9"/>
            <circle cx="14" cy="10" r="2.8" fill="white"/>
          </svg>
          <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (currentPage === 'auth') {
    return (
      <>
        <AuthPage onBack={navigateToHome} onAuthSuccess={handleAuthSuccess} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'profile-setup') {
    return (
      <>
        <ProfileSetupPage onComplete={handleProfileComplete} userEmail={userEmail} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'profile-page') {
    if (!profile) {
      navigateToHome();
      return null;
    }
    return (
      <>
        <ProfilePage
          profile={profile}
          onBack={navigateToMainDashboard}
          onSignOut={handleSignOut}
          onProfileUpdated={handleProfileUpdated}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'discover') {
    return (
      <>
        <DiscoverPage
          onBack={isAuthenticated ? navigateToMainDashboard : navigateToHome}
          onEventClick={navigateToEventDetail}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'host-event') {
    return (
      <>
        <HostEventPage
          onBack={isAuthenticated ? navigateToMainDashboard : navigateToHome}
          onAuthRequired={navigateToAuth}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
          editEvent={editingEvent ?? undefined}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'user-dashboard') {
    return (
      <>
        <UserDashboard onBack={navigateToMainDashboard} onHostEvent={navigateToHostEvent} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'host-dashboard') {
    return (
      <>
        <HostDashboard onBack={navigateToMainDashboard} onHostEvent={navigateToHostEvent} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'main-dashboard') {
    return (
      <>
        <MainDashboard
          onHostEvent={navigateToHostEvent}
          onDiscoverEvents={navigateToDiscover}
          userEmail={userEmail}
          onSignOut={handleSignOut}
          onEditEvent={handleEditEvent}
          onProfile={navigateToProfilePage}
          profile={profile}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'mission') {
    return (
      <>
        <MissionPage onBack={isAuthenticated ? navigateToMainDashboard : navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'event-detail') {
    return (
      <>
        <EventDetailPage
          onBack={navigateToDiscover}
          eventId={selectedEventId}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'ambassador') {
    return (
      <>
        <AmbassadorPage onBack={isAuthenticated ? navigateToMainDashboard : navigateToHome} />
        <Toaster />
      </>
    );
  }

  if (currentPage === 'contact') {
    return (
      <>
        <ContactPage onBack={isAuthenticated ? navigateToMainDashboard : navigateToHome} />
        <Toaster />
      </>
    );
  }

  // HOME
  return (
    <div className="min-h-screen bg-background">
      <Header
        onJoinCommunity={navigateToAuth}
        onDiscoverEvents={navigateToDiscover}
        onHostEvent={navigateToHostEvent}
        onUserDashboard={navigateToMainDashboard}
        onHostDashboard={navigateToHostDashboard}
        onMission={navigateToMission}
        onAmbassador={navigateToAmbassador}
        onContact={navigateToContact}
        onProfile={navigateToProfilePage}
        onSignOut={handleSignOut}
        isAuthenticated={isAuthenticated}
        userType={userType}
        profile={profile}
      />
      <main>
        <Hero onDiscoverEvents={navigateToDiscover} onHostEvent={navigateToHostEvent} />
        <EventsGrid onDiscoverEvents={navigateToDiscover} onEventClick={navigateToEventDetail} />
        <EventCategoriesSection />
        <VerifiedHostsCarousel />
      </main>
      <JoinWandererCTA onJoinCommunity={navigateToAuth} />
      <Footer />
      <Toaster />
    </div>
  );
}
