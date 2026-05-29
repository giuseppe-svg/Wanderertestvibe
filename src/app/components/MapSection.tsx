import { Button } from './ui/button';
import { MapPin, Navigation, Plus } from 'lucide-react';
import { Badge } from './ui/badge';

interface MapSectionProps {
  onDiscoverEvents?: () => void;
}

export function MapSection({ onDiscoverEvents }: MapSectionProps) {
  return (
    <section id="map" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Your Spiritual Map
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover events, communities, and sacred spaces on your personalized 
            spiritual journey map. Every location tells a story of transformation.
          </p>
        </div>

        <div className="relative bg-gray-100 rounded-xl overflow-hidden h-[500px] border border-border">
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto" />
              <p className="text-gray-500">Interactive map coming soon</p>
              <Button>
                <Navigation className="h-4 w-4 mr-2" />
                Enable Location
              </Button>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Button size="sm" variant="secondary" className="bg-white shadow-md">
              <Plus className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" className="bg-white shadow-md">
              -
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold text-sm mb-3">Event Types</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Meditation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Yoga</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Sound Healing</span>
              </div>
            </div>
          </div>

          {/* Mock Event Pins */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform">
              3
            </div>
          </div>
          <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform">
              5
            </div>
          </div>
          <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg cursor-pointer hover:scale-110 transition-transform">
              2
            </div>
          </div>

          {/* Event Preview Card */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <Badge variant="secondary" className="mb-2">Meditation</Badge>
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                  Morning Zen Practice
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  0.3 miles away • Starting in 2 hours
                </p>
                <Button size="sm" className="mt-2 w-full">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}