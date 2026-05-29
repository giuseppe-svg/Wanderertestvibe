import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Star,
  Clock,
  DollarSign,
  TrendingUp,
  Settings,
  Plus,
  Eye,
  Edit,
  MoreVertical,
  BarChart3,
  UserCheck,
  MessageSquare,
  Copy,
  Share2
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface HostDashboardProps {
  onBack: () => void;
  onHostEvent: () => void;
}

// Mock host data
const mockHostStats = {
  totalEvents: 12,
  totalAttendees: 287,
  totalRevenue: 8450,
  averageRating: 4.8,
  upcomingEvents: 3,
  completedEvents: 9
};

const mockHostedEvents = [
  {
    id: 1,
    title: "Sacred Cacao Ceremony",
    date: "Dec 15, 2024 7:00 PM",
    location: "Brooklyn, New York",
    price: "$45",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 18,
    maxAttendees: 20,
    status: "upcoming",
    revenue: 810,
    rating: 4.9,
    reviews: 15
  },
  {
    id: 2,
    title: "Sound Healing Journey",
    date: "Dec 20, 2024 6:30 PM",
    location: "Venice, California",
    price: "$35",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 5,
    maxAttendees: 15,
    status: "upcoming",
    revenue: 175,
    rating: null,
    reviews: 0
  },
  {
    id: 3,
    title: "Kundalini Yoga Workshop",
    date: "Nov 28, 2024 9:00 AM",
    location: "Tulum, Mexico",
    price: "$28",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    attendees: 25,
    maxAttendees: 25,
    status: "completed",
    revenue: 700,
    rating: 4.7,
    reviews: 22
  }
];

const mockAnalytics = {
  monthlyRevenue: [
    { month: 'Jul', revenue: 1200 },
    { month: 'Aug', revenue: 1800 },
    { month: 'Sep', revenue: 2200 },
    { month: 'Oct', revenue: 1900 },
    { month: 'Nov', revenue: 2800 },
    { month: 'Dec', revenue: 3200 }
  ],
  popularCategories: [
    { category: 'Sound Healing', percentage: 35 },
    { category: 'Cacao', percentage: 28 },
    { category: 'Yoga', percentage: 22 },
    { category: 'Meditation', percentage: 15 }
  ]
};

const mockAttendees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    eventId: 1,
    status: 'confirmed',
    joinedDate: '2024-12-01'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    eventId: 1,
    status: 'waitlist',
    joinedDate: '2024-12-02'
  }
];

export function HostDashboard({ onBack, onHostEvent }: HostDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      draft: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  const RatingStars = ({ rating }: { rating: number | null }) => {
    if (!rating) return <span className="text-gray-400 text-sm">No ratings yet</span>;
    
    return (
      <div className="flex items-center space-x-1">
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
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

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
                <h1 className="text-2xl font-bold text-gray-900">Host Dashboard</h1>
                <p className="text-gray-600">Manage your events and community</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Host Settings
              </Button>
              <Button size="sm" onClick={onHostEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">My Events</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Events</p>
                      <p className="text-2xl font-bold">{mockHostStats.totalEvents}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Attendees</p>
                      <p className="text-2xl font-bold">{mockHostStats.totalAttendees}</p>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold">${mockHostStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold">{mockHostStats.averageRating}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recent Events</span>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('events')}>
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHostedEvents.slice(0, 3).map((event) => (
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
                          <Users className="h-4 w-4 mr-1" />
                          {event.attendees}/{event.maxAttendees} attendees
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-600">${event.revenue}</p>
                        <RatingStars rating={event.rating} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col" onClick={onHostEvent}>
                    <Plus className="h-6 w-6 mb-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <MessageSquare className="h-6 w-6 mb-2" />
                    Message Attendees
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Share2 className="h-6 w-6 mb-2" />
                    Promote Events
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Events ({mockHostedEvents.length})</h2>
              <Button onClick={onHostEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Event
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {mockHostedEvents.map((event) => (
                <Card key={event.id}>
                  <div className="relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <StatusBadge status={event.status} />
                    </div>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Event
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Event
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </p>
                      <p className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </p>
                      <p className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees}/{event.maxAttendees} attendees
                      </p>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-600">${event.revenue}</p>
                        <p className="text-xs text-gray-500">Revenue</p>
                      </div>
                      <div className="text-right">
                        <RatingStars rating={event.rating} />
                        {event.reviews > 0 && (
                          <p className="text-xs text-gray-500">{event.reviews} reviews</p>
                        )}
                      </div>
                    </div>

                    {event.status === 'upcoming' && event.attendees < event.maxAttendees && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Capacity</span>
                          <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
                        </div>
                        <Progress value={(event.attendees / event.maxAttendees) * 100} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Event Attendees</h2>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message All
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockAttendees.map((attendee) => (
                    <div key={attendee.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <img
                        src={attendee.avatar}
                        alt={attendee.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{attendee.name}</h3>
                        <p className="text-sm text-gray-600">{attendee.email}</p>
                        <p className="text-xs text-gray-500">
                          Joined {new Date(attendee.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <StatusBadge status={attendee.status} />
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.monthlyRevenue.map((month) => (
                      <div key={month.month} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{month.month}</span>
                        <div className="flex items-center space-x-2 flex-1 mx-4">
                          <Progress 
                            value={(month.revenue / 3200) * 100} 
                            className="h-2 flex-1" 
                          />
                          <span className="text-sm text-gray-600">${month.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Popular Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.popularCategories.map((category) => (
                      <div key={category.category} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <div className="flex items-center space-x-2 flex-1 mx-4">
                          <Progress 
                            value={category.percentage} 
                            className="h-2 flex-1" 
                          />
                          <span className="text-sm text-gray-600">{category.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800">High Demand</h4>
                    <p className="text-sm text-green-700">Sound Healing events have 95% attendance rate</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Growing Audience</h4>
                    <p className="text-sm text-blue-700">25% increase in repeat attendees this month</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Top Rated</h4>
                    <p className="text-sm text-purple-700">Your events average 4.8/5 stars</p>
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