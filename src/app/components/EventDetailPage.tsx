import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  Share2,
  Star,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventDetailPageProps {
  eventId: string;
  onBack: () => void;
}

// Default mock event data as fallback (based on Breathwork Circle example)
const defaultMockEvent = {
  id: 'default',
  title: "Breathwork Circle",
  startDate: "2026-01-22",
  startTime: "7:30 PM",
  endTime: "9:00 PM",
  location: "Wellness Center",
  address: "789 Healing Lane, San Francisco, CA 94110",
  country: "United States",
  city: "San Francisco",
  category: "Breathwork",
  price: "$20",
  image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  attendees: [],
  maxAttendees: 18,
  organizer: "Spiritual Seeker",
  organizerDescription: "Exploring mindfulness and spiritual growth through community events",
  eventsHosted: 12,
  rating: 4.9,
  description: "Explore the power of conscious breathing to release stress, increase energy, and access deeper states of awareness. This guided breathwork session uses ancient techniques combined with modern understanding.",
  language: "English",
  requirements: [
    "Not suitable for pregnant women",
    "Consult doctor if you have respiratory conditions"
  ]
};

// Mock events data (same as in DiscoverPage)
const mockEvents = [
  {
    id: '1',
    title: "Sacred Cacao Ceremony",
    startDate: "2026-02-01",
    startTime: "7:00 PM",
    endTime: "9:00 PM",
    location: "Brooklyn, New York",
    address: "789 Healing Lane, Brooklyn, NY 11201",
    country: "United States",
    city: "New York",
    category: "Cacao",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attendees: [],
    maxAttendees: 24,
    organizer: "Sacred Space NYC",
    organizerDescription: "Creating sacred spaces for spiritual exploration",
    eventsHosted: 8,
    rating: 4.8,
    description: "Join us for a heart-opening cacao ceremony in Brooklyn. Explore the power of sacred cacao to open your heart chakra and connect with your inner wisdom. This ceremony combines ancient Mayan traditions with modern mindfulness practices.",
    language: "English",
    requirements: [
      "Please arrive 10 minutes early",
      "Bring water and an open heart"
    ]
  },
  {
    id: '2',
    title: "Sound Healing Journey",
    startDate: "2026-02-02",
    startTime: "6:30 PM",
    endTime: "8:30 PM",
    location: "Venice, California",
    address: "123 Beach Way, Venice, CA 90291",
    country: "United States", 
    city: "Los Angeles",
    category: "Sound Healing",
    price: "$35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attendees: [],
    maxAttendees: 18,
    organizer: "Venice Healing Circle",
    organizerDescription: "Sound healing practitioners and energy workers",
    eventsHosted: 15,
    rating: 5.0,
    description: "Immersive sound bath with crystal bowls and gongs. Experience deep relaxation and healing vibrations as you journey through soundscapes designed to restore balance and harmony.",
    language: "English, Spanish",
    requirements: [
      "Wear comfortable clothing",
      "Bring a yoga mat or blanket"
    ]
  },
  {
    id: '3',
    title: "Kundalini Yoga & Meditation",
    startDate: "2026-02-08",
    startTime: "9:00 AM",
    endTime: "11:00 AM",
    location: "Tulum, Quintana Roo",
    address: "Wellness Center, Tulum Beach Road",
    country: "Mexico",
    city: "Tulum",
    category: "Kundalini",
    price: "$28",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    attendees: [],
    maxAttendees: 12,
    organizer: "Tulum Wellness",
    organizerDescription: "Ancient wisdom for modern seekers",
    eventsHosted: 20,
    rating: 4.9,
    description: "Awaken your inner energy with ancient practices. This Kundalini yoga session will activate your energy centers and help you tap into your unlimited potential.",
    language: "English, Spanish",
    requirements: [
      "All levels welcome",
      "No prior yoga experience needed"
    ]
  }
];

export function EventDetailPage({ eventId, onBack }: EventDetailPageProps) {
  const [event, setEvent] = useState<any>(defaultMockEvent);

  // Load event details from localStorage or mock data
  useEffect(() => {
    // First try to find in localStorage
    const storedEvents = localStorage.getItem('wanderer_events');
    if (storedEvents) {
      const parsedEvents = JSON.parse(storedEvents);
      const foundEvent = parsedEvents.find((e: any) => e.id === eventId);
      if (foundEvent) {
        setEvent({
          ...defaultMockEvent, // Use default as base
          ...foundEvent // Override with stored event data
        });
        return;
      }
    }
    
    // If not found in localStorage, try mock events
    const mockEvent = mockEvents.find((e) => e.id === eventId);
    if (mockEvent) {
      setEvent(mockEvent);
    } else {
      // Always show default mock event instead of "not found"
      setEvent(defaultMockEvent);
    }
  }, [eventId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const spotsLeft = event.maxAttendees - (event.attendees?.length || 0);
  const attendeeCount = event.attendees?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-80">
                <ImageWithFallback
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Header Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Badge variant="secondary" className="mb-3">
                      {event.category}
                    </Badge>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h1>
                  </div>
                </div>

                {/* Host Info */}
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-700 font-semibold text-lg">
                      {event.organizer.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Spiritual Seeker</p>
                    <p className="font-semibold text-gray-900">{event.organizer}</p>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>events hosted</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>rating</span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="ml-auto"
                  >
                    Contact Host
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="expect">What to Expect</TabsTrigger>
                  <TabsTrigger value="preparation">Preparation</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-4">
                  <div>
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                  {event.language && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Language:</span> {event.language}
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="expect" className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    This transformational experience will guide you through ancient practices 
                    combined with modern understanding. Expect a warm, welcoming atmosphere 
                    where you can connect with like-minded individuals and explore deeper 
                    aspects of your spiritual journey.
                  </p>
                </TabsContent>
                
                <TabsContent value="preparation" className="space-y-4">
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      To make the most of this experience, please:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      <li>Arrive 10 minutes early to settle in</li>
                      <li>Wear comfortable, loose-fitting clothing</li>
                      <li>Bring a water bottle</li>
                      <li>Come with an open heart and mind</li>
                      <li>Avoid heavy meals 2 hours before the session</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Participants Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Participants</h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Join this event to see other participants</p>
              </div>
            </div>

            {/* Location Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">{event.location}</h2>
              </div>
              <p className="text-gray-600 mb-4">{event.address}</p>
              
              {/* Map Placeholder */}
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Map view of location</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Star className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Reviews</h2>
              </div>
              <div className="text-center py-8">
                <p className="text-gray-600">No reviews yet</p>
                <p className="text-sm text-gray-500 mt-1">
                  Be the first to share your experience
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Event Details Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                {/* Date & Time */}
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(event.startDate)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {event.startTime} {event.endTime && `- ${event.endTime}`}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Location */}
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{event.location}</p>
                    <p className="text-sm text-gray-600">{event.address}</p>
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Participants */}
                <div className="flex items-start space-x-3">
                  <Users className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-semibold text-gray-900">
                      {attendeeCount} / {event.maxAttendees}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Price */}
                <div className="flex items-start space-x-3">
                  <DollarSign className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-2xl font-bold text-gray-900">{event.price}</p>
                  </div>
                </div>

                {/* Registration Requirements */}
                {event.maxAttendees && (
                  <>
                    <div className="border-t border-gray-100"></div>
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-2">
                        Registration
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start space-x-2">
                          {spotsLeft > 0 ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                          )}
                          <p className="text-sm text-gray-600">
                            {spotsLeft > 0 
                              ? `${spotsLeft} spots available`
                              : 'Event is full'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="lg"
                    disabled={spotsLeft === 0}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    {spotsLeft > 0 ? 'Join Community to Participate' : 'Event Full'}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    size="lg"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                  </Button>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start space-x-2 mb-2">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-gray-400">i</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">
                      Cancellation Policy
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Free cancellation up to 24 hours before the event. 
                      Please cancel if you cannot attend to allow others to join.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}