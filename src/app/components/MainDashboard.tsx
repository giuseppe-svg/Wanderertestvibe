import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
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
  Share2,
  Search,
  Filter,
  Camera,
  Edit,
  DollarSign,
  BarChart3,
  MessageSquare,
  Globe,
  User,
  Upload,
  Save,
  Bell,
  Bookmark
} from 'lucide-react';
import { EventCard } from './EventCard';

interface MainDashboardProps {
  onHostEvent: () => void;
  onDiscoverEvents: () => void;
  userEmail: string;
  onSignOut?: () => void;
}

// Mock user data
const mockUser = {
  name: 'Sarah Chen',
  email: 'sarah@example.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  location: 'Brooklyn, NY',
  bio: 'Passionate about connecting with like-minded souls through transformative spiritual experiences. Love exploring different healing modalities.',
  memberSince: 'January 2024',
  spiritualInterests: ['Meditation', 'Yoga', 'Sound Healing', 'Reiki', 'Cacao'],
  languages: ['English', 'Spanish', 'Mandarin'],
  stats: {
    eventsAttended: 24,
    eventsHosted: 3,
    communities: 8,
    totalHours: 156,
    rating: 4.8,
    followers: 89
  }
};

const mockRecentEvents = [
  {
    id: 1,
    title: "Sacred Cacao Ceremony",
    date: "Today, 7:00 PM",
    location: "Brooklyn, New York",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 24,
    organizer: "Sacred Space NYC",
    status: "confirmed",
    type: "attending"
  },
  {
    id: 2,
    title: "Sound Healing Workshop",
    date: "Dec 20, 6:30 PM",
    location: "Venice, CA",
    price: "$35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 15,
    organizer: "Sarah Chen",
    status: "hosting",
    type: "hosting",
    revenue: 525
  }
];

const mockRecommendedEvents = [
  {
    id: 3,
    title: "Kundalini Awakening",
    date: "Dec 25, 9:00 AM",
    location: "Tulum, Mexico",
    price: "$28",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 12,
    organizer: "Tulum Wellness",
    category: "Yoga"
  },
  {
    id: 4,
    title: "Crystal Healing Circle",
    date: "Dec 22, 2:00 PM",
    location: "Sedona, AZ",
    price: "$50",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 8,
    organizer: "Desert Healing Center",
    category: "Crystal Healing"
  }
];

export function MainDashboard({ onHostEvent, onDiscoverEvents, userEmail, onSignOut }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState(mockUser);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileSave = () => {
    setIsEditingProfile(false);
    // Here you would save to backend
    console.log('Saving profile:', profileData);
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      confirmed: 'bg-green-100 text-green-800',
      hosting: 'bg-blue-100 text-blue-800',
      waitlist: 'bg-yellow-100 text-yellow-800',
      past: 'bg-gray-100 text-gray-800'
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl font-bold text-purple-600">✨ Wanderer</div>
                <div className="h-6 w-px bg-gray-300"></div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Welcome back, {profileData.name}</h1>
                  <p className="text-sm text-gray-600">Your spiritual journey continues</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              </div>
              
              <Button onClick={onHostEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Host Event
              </Button>
              
              <div className="relative">
                <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profileData.avatar} alt={profileData.name} />
                    <AvatarFallback>{profileData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
                {/* Simple dropdown menu could be added here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Welcome & Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="lg:col-span-3">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-semibold mb-2">Your Spiritual Journey</h2>
                      <p className="text-gray-600">Continue exploring and connecting with your community</p>
                    </div>
                    <Button onClick={onDiscoverEvents} variant="outline">
                      Discover More Events
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mockUser.stats.eventsAttended}</div>
                      <div className="text-sm text-gray-600">Events Attended</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockUser.stats.eventsHosted}</div>
                      <div className="text-sm text-gray-600">Events Hosted</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockUser.stats.totalHours}</div>
                      <div className="text-sm text-gray-600">Practice Hours</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{mockUser.stats.communities}</div>
                      <div className="text-sm text-gray-600">Communities</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span>Achievement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-3">
                    <div className="text-3xl">🌟</div>
                    <div>
                      <h3 className="font-semibold">Community Builder</h3>
                      <p className="text-sm text-gray-600">Hosted 3 successful events</p>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-500">7 events until next level</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Upcoming Events</span>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('my-events')}>
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockRecentEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{event.title}</h3>
                          <StatusBadge status={event.status} />
                        </div>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </p>
                        {event.type === 'hosting' && event.revenue && (
                          <p className="text-sm font-semibold text-green-600">${event.revenue} revenue</p>
                        )}
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recommended Events */}
            <Card>
              <CardHeader>
                <CardTitle>Recommended For You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockRecommendedEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <h3 className="font-semibold mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 flex items-center mb-1">
                          <Calendar className="h-4 w-4 mr-1" />
                          {event.date}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-purple-600">{event.price}</span>
                          <Button size="sm">Join</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Discover Events</h2>
              <Button onClick={onDiscoverEvents}>
                <Globe className="h-4 w-4 mr-2" />
                Advanced Search
              </Button>
            </div>

            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search events, cities, or categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {mockUser.spiritualInterests.map((interest) => (
                    <Badge key={interest} variant="secondary" className="cursor-pointer hover:bg-purple-100">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockRecommendedEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </TabsContent>

          {/* My Events Tab */}
          <TabsContent value="my-events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Events</h2>
              <Button onClick={onHostEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Host New Event
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Events I'm Attending</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentEvents.filter(e => e.type === 'attending').map((event) => (
                    <div key={event.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                      <img src={event.image} alt={event.title} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                      </div>
                      <StatusBadge status={event.status} />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Events I'm Hosting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecentEvents.filter(e => e.type === 'hosting').map((event) => (
                    <div key={event.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                      <img src={event.image} alt={event.title} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{event.title}</h4>
                        <p className="text-sm text-gray-600">{event.date}</p>
                        {event.revenue && (
                          <p className="text-sm font-semibold text-green-600">${event.revenue}</p>
                        )}
                      </div>
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Manage
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">My Profile</h2>
              <Button onClick={() => setIsEditingProfile(!isEditingProfile)}>
                <Edit className="h-4 w-4 mr-2" />
                {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Picture & Basic Info */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <Avatar className="h-32 w-32 mx-auto">
                        <AvatarImage src={profileData.avatar} alt={profileData.name} />
                        <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {isEditingProfile && (
                        <Button size="sm" className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0">
                          <Camera className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold">{profileData.name}</h3>
                      <p className="text-gray-600 flex items-center justify-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profileData.location}
                      </p>
                      <div className="flex items-center justify-center space-x-2 mt-2">
                        <RatingStars rating={Math.floor(mockUser.stats.rating)} />
                        <span className="text-sm text-gray-600">({mockUser.stats.followers} followers)</span>
                      </div>
                    </div>

                    {isEditingProfile ? (
                      <Button onClick={handleProfileSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full">
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </Button>
                        <Button variant="outline" className="w-full" onClick={onSignOut}>
                          Sign Out
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Profile Details */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditingProfile ? (
                    <>
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label>About Me</Label>
                        <p className="text-gray-700 mt-1">{profileData.bio}</p>
                      </div>
                      
                      <div>
                        <Label>Spiritual Interests</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profileData.spiritualInterests.map((interest) => (
                            <Badge key={interest} variant="secondary">{interest}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Languages</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {profileData.languages.map((language) => (
                            <Badge key={language} variant="outline">{language}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Member Since</Label>
                        <p className="text-gray-700 mt-1">{profileData.memberSince}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Your Analytics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Events</p>
                      <p className="text-2xl font-bold">{mockUser.stats.eventsAttended + mockUser.stats.eventsHosted}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Community Reach</p>
                      <p className="text-2xl font-bold">{mockUser.stats.followers}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Practice Hours</p>
                      <p className="text-2xl font-bold">{mockUser.stats.totalHours}</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-2xl font-bold">{mockUser.stats.rating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activity Graph Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Activity Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Activity chart coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}