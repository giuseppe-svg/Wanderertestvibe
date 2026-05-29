import { useEffect, useState } from 'react';
import { EventCard } from './EventCard';
import { Button } from './ui/button';
import { getEvents } from '../utils/supabase/db';
import type { Event } from '../utils/supabase/types';

const mockEvents = [
  {
    id: '1',
    title: 'Presentazione Corso di Biodanza',
    description: 'Buongiorno 🌻 condivido questa possibilità: a Bazzano continua il gruppo di Biodanza ✨ e ci...',
    date: 'Apr 17 – Jun 19, Daily',
    time: '7:45 PM - 10:00 PM',
    location: 'Bazzano',
    city: 'Valsamoggia, Bazzano, Italy',
    venue: 'Viale Dei Martiri',
    spotsLeft: 25,
    organizer: 'Biodanza Italia',
    attendees: 5,
    price: '€15.00',
    category: 'Energy Work',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&q=80',
    requiresApproval: false,
  },
  {
    id: '2',
    title: '💜 I VENERDÌ ESTATICI - La Notte dei Cristalli 💜',
    description: 'I VENERDÌ ESTATICI 💜 La Notte dei Cristalli 🦋 Nell\'esoterismo i cristalli sono considerati custodi di...',
    date: 'Today',
    time: '8:00 PM - 11:30 PM',
    location: 'Monreale',
    city: 'Monreale, Italy',
    venue: 'Yoga Aranyani Home',
    spotsLeft: 20,
    organizer: 'Yoga Aranyani',
    attendees: 15,
    price: '€20.00',
    category: 'Sacred Dance',
    image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80',
    requiresApproval: true,
  },
  {
    id: '3',
    title: '💎 I VENERDÌ ESTATICI 💎 La Notte dei Cristalli 💎',
    description: 'Ti do il benvenuto a questa sessione di Ecstatic Dance, uno spazio sacro dove il movimento diventa...',
    date: 'Today',
    time: '9:00 PM - 11:45 PM',
    location: 'Monreale',
    city: 'Monreale, Italy',
    venue: 'Yoga Aranyani Home',
    spotsLeft: 100,
    organizer: 'Yoga Aranyani',
    attendees: 30,
    price: '€15.00',
    category: 'Sacred Dance',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    requiresApproval: true,
  },
  {
    id: '4',
    title: 'Cerimonia del Cacao Sacro – Milano',
    description: 'Un viaggio nel cuore con il cacao ceremoniale. Apriremo lo spazio con canti, intention setting e musica dal vivo.',
    date: 'Jun 15',
    time: '7:00 PM - 10:00 PM',
    location: 'Milano',
    city: 'Milano, Italy',
    venue: 'Studio Luce',
    spotsLeft: 8,
    organizer: 'Maria Sole',
    attendees: 12,
    price: '€45.00',
    category: 'Cacao Ceremony',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80',
    requiresApproval: false,
  },
  {
    id: '5',
    title: 'Meditazione Vipassana – Introduzione',
    description: 'Un\'introduzione pratica alla meditazione Vipassana, la tecnica del vedere le cose come sono. Perfetto per principianti.',
    date: 'Jun 22',
    time: '8:00 AM - 12:00 PM',
    location: 'Firenze',
    city: 'Firenze, Italy',
    venue: 'Centro Dharma',
    spotsLeft: 12,
    organizer: 'Ravi Sharma',
    attendees: 18,
    price: 'Gratuito',
    category: 'Meditation',
    image: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80',
    requiresApproval: false,
  },
  {
    id: '6',
    title: 'Breathwork – Libera il Tuo Blocco',
    description: 'Sessione di breathwork olotropico per liberare emozioni represse e accedere a stati espansi di coscienza.',
    date: 'Jul 5',
    time: '10:00 AM - 1:00 PM',
    location: 'Roma',
    city: 'Roma, Italy',
    venue: 'Casa del Respiro',
    spotsLeft: 8,
    organizer: 'Claudio Mare',
    attendees: 7,
    price: '€60.00',
    category: 'Breathwork',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
    requiresApproval: true,
  },
];

interface EventsGridProps {
  onDiscoverEvents?: () => void;
  onEventClick?: (eventId: string) => void;
}

export function EventsGrid({ onDiscoverEvents, onEventClick }: EventsGridProps) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents({ status: 'published', limit: 6 }).then(data => {
      if (data.length > 0) setEvents(data);
      else setEvents(mockEvents as unknown as Event[]);
    });
  }, []);

  const displayEvents = events.length > 0 ? events : (mockEvents as unknown as Event[]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Upcoming spiritual experiences</h2>
            <p className="text-gray-500 mt-2">A curated feed of events happening soon, ready to explore and join.</p>
          </div>
          <Button
            variant="outline"
            className="shrink-0 border-gray-200 text-gray-700 hover:bg-gray-50"
            onClick={onDiscoverEvents}
          >
            View all events
          </Button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((event) => (
            <EventCard key={event.id} {...(event as any)} onEventClick={onEventClick} />
          ))}
        </div>
      </div>
    </section>
  );
}