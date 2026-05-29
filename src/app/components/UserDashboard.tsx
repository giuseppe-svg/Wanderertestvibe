import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Heart,
  Star,
  Clock,
  Activity,
  Trophy,
  TrendingUp,
  Settings,
  Plus,
  Eye,
  Share2
} from 'lucide-react';
import { EventCard } from './EventCard';

interface UserDashboardProps {
  onBack: () => void;
  onHostEvent: () => void;
}

// Mock user data
const mockUser = {
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  location: 'Brooklyn, NY',
  memberSince: 'January 2024',
  spiritualInterests: ['Meditation', 'Yoga', 'Sound Healing', 'Reiki'],
  stats: {
    eventsAttended: 24,
    eventsHosted: 3,
    communities: 8,
    totalHours: 156
  }
};

const mockUpcomingEvents = [
  {
    id: 1,
    title: "Sacred Cacao Ceremony",
    date: "Today, 7:00 PM",
    location: "Brooklyn, New York",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 24,
    organizer: "Sacred Space NYC",
    status: "confirmed"
  },
  {
    id: 2,
    title: "Morning Meditation",
    date: "Tomorrow, 8:00 AM",
    location: "Central Park, NY",
    price: "Free",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 12,
    organizer: "NYC Zen Group",
    status: "waitlist"
  }
];

const mockPastEvents = [
  {
    id: 3,
    title: "Sound Healing Journey",
    date: "Dec 1, 6:30 PM",
    location: "Venice, CA",
    price: "$35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 18,
    organizer: "Venice Healing Circle",
    rating: 5,
    review: "Absolutely transformative experience!"
  },
  {
    id: 4,
    title: "Kundalini Yoga Workshop",
    date: "Nov 28, 9:00 AM",
    location: "Tulum, Mexico",
    price: "$28",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 15,
    organizer: "Tulum Wellness",
    rating: 4,
    review: "Great energy and wonderful community."
  }
];

const mockFavorites = [
  {
    id: 5,
    title: "Weekly Reiki Circle",
    date: "Every Sunday, 3:00 PM",
    location: "Amsterdam, Netherlands",
    price: "€40",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 8,
    organizer: "Amsterdam Energy Center",
    saved: true
  }
];

export function UserDashboard({ onBack, onHostEvent }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800',
      waitlist: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
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
                <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
                <p className="text-gray-600">Track your spiritual journey</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button size="sm" onClick={onHostEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Host Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold">{mockUser.name}</h3>
                      <p className="text-gray-600 flex items-center justify-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {mockUser.location}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Member since {mockUser.memberSince}</p>
                    </div>
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Your Journey Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{mockUser.stats.eventsAttended}</div>
                      <div className="text-sm text-gray-600">Events Attended</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{mockUser.stats.eventsHosted}</div>
                      <div className="text-sm text-gray-600">Events Hosted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{mockUser.stats.communities}</div>
                      <div className="text-sm text-gray-600">Communities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{mockUser.stats.totalHours}</div>
                      <div className="text-sm text-gray-600">Practice Hours</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Spiritual Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Your Spiritual Interests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {mockUser.spiritualInterests.map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Attended Sound Healing Journey</p>
                    <p className="text-xs text-gray-600">2 days ago</p>
                  </div>
                  <Badge variant="outline">+2 hours</Badge>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Joined Tulum Wellness community</p>
                    <p className="text-xs text-gray-600">5 days ago</p>
                  </div>
                  <Badge variant="outline">New community</Badge>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Received review for Kundalini workshop</p>
                    <p className="text-xs text-gray-600">1 week ago</p>
                  </div>
                  <RatingStars rating={4} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Upcoming Events ({mockUpcomingEvents.length})</h2>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockUpcomingEvents.map((event) => (
                <Card key={event.id} className="relative">
                  <StatusBadge status={event.status} />
                  <EventCard {...event} />
                  <div className="p-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Past Events ({mockPastEvents.length})</h2>
            </div>
            
            <div className="space-y-4">
              {mockPastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{event.title}</h3>
                            <p className="text-sm text-gray-600 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {event.date}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <RatingStars rating={event.rating} />
                            <p className="text-sm text-gray-600 mt-1">Your rating</p>
                          </div>
                        </div>
                        {event.review && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm italic">"{event.review}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Saved Events ({mockFavorites.length})</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFavorites.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
            
            {mockFavorites.length === 0 && (
              <div className="text-center py-12">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved events yet</h3>
                <p className="text-gray-600 mb-4">
                  Start exploring and save events you're interested in.
                </p>
                <Button onClick={() => setActiveTab('upcoming')}>
                  Discover Events
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}