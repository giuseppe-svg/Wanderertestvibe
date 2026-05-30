import { useState, useEffect } from 'react';
import { getSession, onAuthStateChange, getProfile, signOut as supabaseSignOut } from './utils/supabase/db';
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

  useEffect(() => {
    // Restore session on mount
    getSession().then(session => {
      if (session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? '');
        getProfile(session.user.id).then(p => {
          if (p) {
            setProfile(p);
            setUserType(p.role);
            if (!p.onboarding_completed) {
              setCurrentPage('profile-setup');
            }
            // else: stay on home (user is logged in but page stays home unless navigated)
          } else {
            setCurrentPage('profile-setup');
          }
        });
      }
    });

    // Listen for auth state changes (e.g. Google OAuth redirect)
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setUserId(session.user.id);
        setUserEmail(session.user.email ?? '');
        getProfile(session.user.id).then(p => {
          if (p) {
            setProfile(p);
            setUserType(p.role);
            if (p.onboarding_completed) {
              // Check if we have a returnTo page
              setCurrentPage(prev => {
                if (prev === 'auth') {
                  return 'main-dashboard';
                }
                return prev;
              });
            } else {
              setCurrentPage('profile-setup');
            }
          } else {
            setCurrentPage('profile-setup');
          }
        });
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setUserId('');
        setUserEmail('');
        setProfile(null);
        setUserType('user');
        setCurrentPage('home');
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

  const handleAuthSuccess = async (email: string, isNewUser: boolean = false) => {
    setUserEmail(email);
    setIsAuthenticated(true);
    if (isNewUser) {
      navigateToProfileSetup(email);
      return;
    }
    const session = await getSession();
    if (session) {
      setUserId(session.user.id);
      const p = await getProfile(session.user.id);
      if (p) {
        setProfile(p);
        setUserType(p.role);
        if (p.onboarding_completed) {
          // If there's a returnTo, go there
          if (returnTo) {
            const dest = returnTo;
            setReturnTo(null);
            setCurrentPage(dest);
          } else {
            navigateToMainDashboard();
          }
        } else {
          navigateToProfileSetup(email);
        }
      } else {
        navigateToProfileSetup(email);
      }
    } else {
      navigateToProfileSetup(email);
    }
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
