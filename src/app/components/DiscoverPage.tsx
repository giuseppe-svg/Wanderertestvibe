import { useState, useMemo, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Users, 
  Grid3X3, 
  Map as MapIcon,
  Filter,
  ArrowLeft,
  Star,
  Coffee,
  Music,
  Hand,
  Mountain,
  Droplets,
  Wind,
  Zap,
  Leaf,
  Heart,
  Brain,
  Activity
} from 'lucide-react';
import { EventCard } from './EventCard';

interface DiscoverPageProps {
  onBack: () => void;
  onEventClick?: (eventId: string) => void;
}

// Mock events data with more detailed location information
const mockEvents = [
  {
    id: 1,
    title: "Sacred Cacao Ceremony",
    date: "Today, 7:00 PM",
    location: "Brooklyn, New York",
    country: "United States",
    city: "New York",
    type: "Cacao",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 24,
    organizer: "Sacred Space NYC",
    description: "Join us for a heart-opening cacao ceremony in Brooklyn",
    coordinates: { lat: 40.6782, lng: -73.9442 }
  },
  {
    id: 2,
    title: "Sound Healing Journey",
    date: "Tomorrow, 6:30 PM",
    location: "Venice, California",
    country: "United States", 
    city: "Los Angeles",
    type: "Sound Healing",
    price: "$35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 18,
    organizer: "Venice Healing Circle",
    description: "Immersive sound bath with crystal bowls and gongs",
    coordinates: { lat: 34.0522, lng: -118.2437 }
  },
  {
    id: 3,
    title: "Kundalini Yoga & Meditation",
    date: "Dec 8, 9:00 AM",
    location: "Tulum, Quintana Roo",
    country: "Mexico",
    city: "Tulum",
    type: "Kundalini",
    price: "$28",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 12,
    organizer: "Tulum Wellness",
    description: "Awaken your inner energy with ancient practices",
    coordinates: { lat: 20.2114, lng: -87.4654 }
  },
  {
    id: 4,
    title: "Reiki Healing Circle",
    date: "Dec 10, 2:00 PM",
    location: "Amsterdam, North Holland",
    country: "Netherlands",
    city: "Amsterdam",
    type: "Reiki",
    price: "€40",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 8,
    organizer: "Amsterdam Energy Center",
    description: "Group reiki session for deep healing",
    coordinates: { lat: 52.3676, lng: 4.9041 }
  },
  {
    id: 5,
    title: "Breathwork Ceremony",
    date: "Dec 12, 7:00 PM",
    location: "Byron Bay, New South Wales",
    country: "Australia",
    city: "Byron Bay",
    type: "Breathwork",
    price: "AU$50",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 15,
    organizer: "Byron Bay Breathwork",
    description: "Transformational breathing experience",
    coordinates: { lat: -28.6474, lng: 153.6020 }
  },
  {
    id: 6,
    title: "Sacred Plant Medicine Ceremony",
    date: "Dec 15, 6:00 PM",
    location: "Iquitos, Loreto",
    country: "Peru",
    city: "Iquitos",
    type: "Plant Medicine",
    price: "$180",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 10,
    organizer: "Amazon Healing Center",
    description: "Traditional ayahuasca ceremony with experienced shaman",
    coordinates: { lat: -3.7437, lng: -73.2516 }
  }
];

const categories = [
  { name: 'All', icon: Star },
  { name: 'Cacao', icon: Coffee },
  { name: 'Sound Healing', icon: Music },
  { name: 'Reiki', icon: Hand },
  { name: 'Temazcal', icon: Mountain },
  { name: 'Kambo', icon: Droplets },
  { name: 'Breathwork', icon: Wind },
  { name: 'Kundalini', icon: Zap },
  { name: 'Plant Medicine', icon: Leaf },
  { name: 'Sacred Dance', icon: Heart },
  { name: 'Meditation', icon: Brain },
  { name: 'Yoga', icon: Activity }
];

export function DiscoverPage({ onBack, onEventClick }: DiscoverPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [userCreatedEvents, setUserCreatedEvents] = useState<any[]>([]);

  // Load user-created events from localStorage
  useEffect(() => {
    const loadEvents = () => {
      const storedEvents = localStorage.getItem('wanderer_events');
      if (storedEvents) {
        const parsedEvents = JSON.parse(storedEvents);
        // Transform stored events to match the format
        const transformedEvents = parsedEvents.map((event: any) => ({
          id: event.id,
          title: event.title,
          date: event.startTime ? `${new Date(event.startDate).toLocaleDateString()} ${event.startTime}` : new Date(event.startDate).toLocaleDateString(),
          location: event.location,
          country: event.country,
          city: event.city,
          type: event.category,
          price: event.price,
          image: event.image,
          attendees: event.attendees?.length || 0,
          maxAttendees: event.maxAttendees,
          spotsLeft: event.spotsLeft,
          organizer: event.organizer,
          description: event.description,
          address: event.address,
          language: event.language,
          attendeesList: event.attendees || [],
          coordinates: { lat: 0, lng: 0 } // Default coordinates
        }));
        setUserCreatedEvents(transformedEvents);
      }
    };
    
    loadEvents();
    
    // Listen for storage changes
    window.addEventListener('storage', loadEvents);
    return () => window.removeEventListener('storage', loadEvents);
  }, []);

  // Filter and search logic
  const filteredEvents = useMemo(() => {
    // Merge mock events with user-created events
    let events = [...mockEvents, ...userCreatedEvents];

    // Filter by category
    if (selectedCategory !== 'All') {
      events = events.filter(event => event.type === selectedCategory);
    }

    // Filter by search query (city, country, or type)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      events = events.filter(event => 
        event.city.toLowerCase().includes(query) ||
        event.country.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query) ||
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query)
      );
    }

    // Sort events
    switch (sortBy) {
      case 'date':
        return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'price':
        return events.sort((a, b) => {
          const aPrice = parseFloat(a.price.replace(/[^0-9.]/g, ''));
          const bPrice = parseFloat(b.price.replace(/[^0-9.]/g, ''));
          return aPrice - bPrice;
        });
      case 'popularity':
        return events.sort((a, b) => b.attendees - a.attendees);
      default:
        return events;
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const MapView = () => (
    <div className="h-[600px] bg-gray-100 rounded-lg relative overflow-hidden">
      {/* Simplified map representation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <MapIcon className="h-12 w-12 text-gray-400 mx-auto" />
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Interactive Map View</h3>
            <p className="text-gray-500">Map integration would show event locations here</p>
          </div>
        </div>
      </div>
      
      {/* Event markers overlay */}
      <div className="absolute inset-0">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${20 + (index * 15) % 60}%`,
              top: `${30 + (index * 10) % 40}%`
            }}
          >
            <div className="relative">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold hover:scale-110 transition-transform">
                {event.attendees}
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-lg shadow-lg p-3 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <h4 className="font-semibold text-sm">{event.title}</h4>
                <p className="text-xs text-gray-600">{event.location}</p>
                <p className="text-xs text-purple-600">{event.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Discover Events</h1>
                <p className="text-gray-600">Find spiritual experiences worldwide</p>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="flex items-center space-x-2"
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Grid</span>
              </Button>
              <Button
                variant={viewMode === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('map')}
                className="flex items-center space-x-2"
              >
                <MapIcon className="h-4 w-4" />
                <span>Map</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by city, country, or event type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sacred Categories</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.name)}
                    className="rounded-full"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category.name}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Sort and Results Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {filteredEvents.length} events found
                {searchQuery && (
                  <span className="ml-1">for "{searchQuery}"</span>
                )}
              </span>
              {selectedCategory !== 'All' && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <span>{selectedCategory}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCategory('All')}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    ×
                  </Button>
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} {...event} onEventClick={onEventClick} />
            ))}
          </div>
        ) : (
          <MapView />
        )}

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters to find more events.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
              >
                Clear all filters
              </Button>
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredEvents.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Events
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}