import { useState } from 'react';
import { Languages, Calendar, Plus, User, Menu, X, BarChart3 } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  onJoinCommunity?: () => void;
  onDiscoverEvents?: () => void;
  onHostEvent?: () => void;
  onUserDashboard?: () => void;
  onHostDashboard?: () => void;
  onMission?: () => void;
  onAmbassador?: () => void;
  onContact?: () => void;
  isAuthenticated?: boolean;
  userType?: 'user' | 'host';
}

export function Header({
  onJoinCommunity,
  onDiscoverEvents,
  onHostEvent,
  onUserDashboard,
  onHostDashboard,
  onMission,
  isAuthenticated,
  userType,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <button
            className="flex items-center gap-2 shrink-0"
            onClick={onDiscoverEvents}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 3C11.582 3 8 6.582 8 11c0 6 8 16 8 16s8-10 8-16c0-4.418-3.582-8-8-8z" fill="#7C3AED" opacity=".9"/>
              <circle cx="16" cy="11" r="3.2" fill="white"/>
              <path d="M10.5 7.5c1.8-2.4 5.5-3.5 9-2" stroke="white" stroke-width="1.3" stroke-linecap="round" opacity=".6"/>
            </svg>
            <span className="text-lg font-semibold text-gray-900">Wanderer</span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 ml-2">
            <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <Languages className="h-3.5 w-3.5" />
              IT
            </button>
            <button
              onClick={onDiscoverEvents}
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Scopri
            </button>
            <button
              onClick={onMission}
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Missione
            </button>
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3 ml-auto">
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 gap-1.5"
                  onClick={onUserDashboard}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  My Events
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
                  onClick={onHostEvent}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Host Event
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <Avatar className="h-8 w-8 border-2 border-gray-200">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-semibold">G</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onUserDashboard}>
                      <User className="mr-2 h-4 w-4" /> My Dashboard
                    </DropdownMenuItem>
                    {userType === 'host' && (
                      <DropdownMenuItem onClick={onHostDashboard}>
                        <BarChart3 className="mr-2 h-4 w-4" /> Host Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Sign Out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 gap-1.5"
                  onClick={onUserDashboard}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  My Events
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
                  onClick={onHostEvent}
                >
                  <Plus className="h-3.5 w-3.5" />
                  Host Event
                </Button>
                <button
                  onClick={onJoinCommunity}
                  className="rounded-full focus:outline-none"
                >
                  <Avatar className="h-8 w-8 border-2 border-gray-200 cursor-pointer">
                    <AvatarFallback className="bg-gray-100 text-gray-500 text-xs font-semibold">G</AvatarFallback>
                  </Avatar>
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden ml-auto p-2 rounded-md text-gray-500 hover:text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <button onClick={onDiscoverEvents} className="block w-full text-left text-sm font-medium text-gray-700 py-2">Scopri</button>
          <button onClick={onMission} className="block w-full text-left text-sm font-medium text-gray-700 py-2">Missione</button>
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" className="flex-1 border-purple-200 text-purple-700" onClick={onUserDashboard}>My Events</Button>
            <Button size="sm" className="flex-1 bg-purple-600 text-white" onClick={onHostEvent}>+ Host Event</Button>
          </div>
        </div>
      )}
    </header>
  );
}
