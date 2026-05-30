import { createContext, useContext, useState } from 'react';

type Lang = 'it' | 'en' | 'es';

const translations = {
  it: {
    discover: 'Scopri', mission: 'Missione', myEvents: 'I miei eventi',
    hostEvent: '+ Organizza evento', signIn: 'Accedi', signUp: 'Registrati',
    home: 'Home', profile: 'Profilo', logout: 'Esci',
    upcomingEvents: 'Prossimi eventi spirituali', viewAll: 'Vedi tutti gli eventi',
    joinWanderer: 'Unisciti a Wanderer', startHosting: 'Inizia a organizzare',
    completeProfile: 'Completa il tuo profilo', next: 'Avanti', back: 'Indietro',
    finish: 'Completa profilo',
    myDashboard: 'Il mio dashboard', signOut: 'Esci',
    hostedEvents: 'I miei eventi', attendingEvents: 'Partecipo',
    editEvent: 'Modifica', leaveEvent: 'Lascia',
    noHostedEvents: 'Non hai ancora organizzato eventi',
    noAttendingEvents: 'Non sei iscritto a nessun evento',
    attendees: 'partecipanti',
    pending: 'in attesa', confirmed: 'confermato', cancelled: 'cancellato',
    draft: 'bozza', published: 'pubblicato',
  },
  en: {
    discover: 'Discover', mission: 'Mission', myEvents: 'My Events',
    hostEvent: '+ Host Event', signIn: 'Sign In', signUp: 'Sign Up',
    home: 'Home', profile: 'Profile', logout: 'Sign Out',
    upcomingEvents: 'Upcoming spiritual experiences', viewAll: 'View all events',
    joinWanderer: 'Join Wanderer', startHosting: 'Start hosting',
    completeProfile: 'Complete your profile', next: 'Next', back: 'Back',
    finish: 'Complete profile',
    myDashboard: 'My Dashboard', signOut: 'Sign Out',
    hostedEvents: 'My Events', attendingEvents: 'Attending',
    editEvent: 'Edit', leaveEvent: 'Leave',
    noHostedEvents: 'You have not hosted any events yet',
    noAttendingEvents: 'You are not attending any events',
    attendees: 'attendees',
    pending: 'pending', confirmed: 'confirmed', cancelled: 'cancelled',
    draft: 'draft', published: 'published',
  },
  es: {
    discover: 'Descubrir', mission: 'Misión', myEvents: 'Mis eventos',
    hostEvent: '+ Organizar evento', signIn: 'Iniciar sesión', signUp: 'Registrarse',
    home: 'Inicio', profile: 'Perfil', logout: 'Cerrar sesión',
    upcomingEvents: 'Próximas experiencias espirituales', viewAll: 'Ver todos los eventos',
    joinWanderer: 'Únete a Wanderer', startHosting: 'Empieza a organizar',
    completeProfile: 'Completa tu perfil', next: 'Siguiente', back: 'Atrás',
    finish: 'Completar perfil',
    myDashboard: 'Mi dashboard', signOut: 'Cerrar sesión',
    hostedEvents: 'Mis eventos', attendingEvents: 'Asistiendo',
    editEvent: 'Editar', leaveEvent: 'Salir',
    noHostedEvents: 'Aún no has organizado eventos',
    noAttendingEvents: 'No estás asistiendo a ningún evento',
    attendees: 'participantes',
    pending: 'pendiente', confirmed: 'confirmado', cancelled: 'cancelado',
    draft: 'borrador', published: 'publicado',
  },
};

export type Translations = typeof translations.it;
export type { Lang };

const I18nContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Translations }>({
  lang: 'it', setLang: () => {}, t: translations.it,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('it');
  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => useContext(I18nContext);
