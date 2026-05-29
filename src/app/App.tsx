import { useState, useEffect } from 'react';
import { getSession, onAuthStateChange, getProfile, signOut as supabaseSignOut } from './utils/supabase/db';
import type { Profile } from './utils/supabase/types';
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
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'profile-setup' | 'discover' | 'host-event' | 'user-dashboard' | 'host-dashboard' | 'main-dashboard' | 'mission' | 'event-detail' | 'ambassador' | 'contact'>('home');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userType, setUserType] = useState<'user' | 'host'>('user');
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // Restore session on mount
    getSession().then(session => {
      if (session) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email ?? '');
        getProfile(session.user.id).then(p => {
          if (p) {
            setProfile(p);
            setUserType(p.role);
            if (p.onboarding_completed) {
              // Stay on home; user can navigate to dashboard
            } else {
              setCurrentPage('profile-setup');
            }
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
        setUserEmail(session.user.email ?? '');
        getProfile(session.user.id).then(p => {
          if (p) {
            setProfile(p);
            setUserType(p.role);
            if (p.onboarding_completed) {
              setCurrentPage('main-dashboard');
            } else {
              setCurrentPage('profile-setup');
            }
          } else {
            setCurrentPage('profile-setup');
          }
        });
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
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
  const navigateToHostEvent = () => setCurrentPage('host-event');
  const navigateToUserDashboard = () => setCurrentPage('user-dashboard');
  const navigateToHostDashboard = () => setCurrentPage('host-dashboard');
  const navigateToMainDashboard = () => setCurrentPage('main-dashboard');
  const navigateToMission = () => setCurrentPage('mission');
  const navigateToAmbassador = () => setCurrentPage('ambassador');
  const navigateToContact = () => setCurrentPage('contact');
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
      const p = await getProfile(session.user.id);
      if (p && p.onboarding_completed) {
        setProfile(p);
        setUserType(p.role);
        navigateToMainDashboard();
      } else {
        navigateToProfileSetup(email);
      }
    } else {
      navigateToProfileSetup(email);
    }
  };

  const handleProfileComplete = () => {
    navigateToMainDashboard();
    // User is now directed to the main dashboard after profile setup
  };

  const handleSignOut = async () => {
    await supabaseSignOut();
    setIsAuthenticated(false);
    setUserEmail('');
    setProfile(null);
    setUserType('user');
    navigateToHome();
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
          onBack={navigateToHome}
          onAuthRequired={navigateToAuth}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
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
        isAuthenticated={isAuthenticated}
        userType={userType}
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