import { useState } from 'react';
import { Calendar, Plus, User, Menu, X, BarChart3, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useI18n } from '../utils/i18n';
import type { Lang } from '../utils/i18n';
import type { Profile } from '../utils/supabase/types';

interface HeaderProps {
  onJoinCommunity?: () => void;
  onDiscoverEvents?: () => void;
  onHostEvent?: () => void;
  onUserDashboard?: () => void;
  onHostDashboard?: () => void;
  onMission?: () => void;
  onAmbassador?: () => void;
  onContact?: () => void;
  onProfile?: () => void;
  onSignOut?: () => void;
  isAuthenticated?: boolean;
  userType?: 'user' | 'host';
  profile?: Profile | null;
}

export function Header({
  onJoinCommunity,
  onDiscoverEvents,
  onHostEvent,
  onUserDashboard,
  onHostDashboard,
  onMission,
  onProfile,
  onSignOut,
  isAuthenticated,
  userType,
  profile,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  const LANGS: Lang[] = ['it', 'en', 'es'];

  const avatarInitial = profile?.full_name
    ? profile.full_name.charAt(0).toUpperCase()
    : profile?.email
    ? profile.email.charAt(0).toUpperCase()
    : 'U';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 gap-6">
          {/* Logo */}
          <button
            className="flex items-center gap-2 shrink-0"
            onClick={isAuthenticated ? onUserDashboard : onDiscoverEvents}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 3C11.582 3 8 6.582 8 11c0 6 8 16 8 16s8-10 8-16c0-4.418-3.582-8-8-8z" fill="#7C3AED" opacity=".9"/>
              <circle cx="16" cy="11" r="3.2" fill="white"/>
              <path d="M10.5 7.5c1.8-2.4 5.5-3.5 9-2" stroke="white" strokeWidth="1.3" strokeLinecap="round" opacity=".6"/>
            </svg>
            <span className="text-lg font-semibold text-gray-900">Wanderer</span>
          </button>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 ml-2">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors uppercase font-medium">
                  {lang}
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor"><path d="M1 1l4 4 4-4"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-24">
                {LANGS.map(l => (
                  <DropdownMenuItem key={l} onClick={() => setLang(l)} className={lang === l ? 'font-semibold text-purple-600' : ''}>
                    {l.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={onDiscoverEvents}
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              {t.discover}
            </button>
            <button
              onClick={onMission}
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              {t.mission}
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
                  {t.myEvents}
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
                  onClick={onHostEvent}
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t.hostEvent}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400">
                      <Avatar className="h-8 w-8 border-2 border-gray-200">
                        <AvatarImage src={profile?.avatar_url ?? ''} />
                        <AvatarFallback className="bg-purple-100 text-purple-700 text-xs font-semibold">{avatarInitial}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={onProfile ?? onUserDashboard}>
                      <User className="mr-2 h-4 w-4" /> {t.profile}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onUserDashboard}>
                      <Calendar className="mr-2 h-4 w-4" /> {t.myEvents}
                    </DropdownMenuItem>
                    {userType === 'host' && (
                      <DropdownMenuItem onClick={onHostDashboard}>
                        <BarChart3 className="mr-2 h-4 w-4" /> Host Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSignOut} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" /> {t.logout}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  onClick={onJoinCommunity}
                >
                  {t.signIn}
                </Button>
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5"
                  onClick={onHostEvent}
                >
                  <Plus className="h-3.5 w-3.5" />
                  {t.hostEvent}
                </Button>
                <button
                  onClick={onJoinCommunity}
                  className="rounded-full focus:outline-none"
                >
                  <Avatar className="h-8 w-8 border-2 border-gray-200 cursor-pointer">
                    <AvatarFallback className="bg-gray-100 text-gray-500 text-xs font-semibold">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
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
          <div className="flex gap-2 mb-3">
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs rounded border ${lang === l ? 'border-purple-600 text-purple-600 font-semibold' : 'border-gray-200 text-gray-600'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={onDiscoverEvents} className="block w-full text-left text-sm font-medium text-gray-700 py-2">{t.discover}</button>
          <button onClick={onMission} className="block w-full text-left text-sm font-medium text-gray-700 py-2">{t.mission}</button>
          <div className="flex gap-2 pt-2">
            {isAuthenticated ? (
              <>
                <Button size="sm" variant="outline" className="flex-1 border-purple-200 text-purple-700" onClick={onUserDashboard}>{t.myEvents}</Button>
                <Button size="sm" className="flex-1 bg-purple-600 text-white" onClick={onHostEvent}>{t.hostEvent}</Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" className="flex-1 border-purple-200 text-purple-700" onClick={onJoinCommunity}>{t.signIn}</Button>
                <Button size="sm" className="flex-1 bg-purple-600 text-white" onClick={onHostEvent}>{t.hostEvent}</Button>
              </>
            )}
          </div>
          {isAuthenticated && (
            <button onClick={onSignOut} className="block w-full text-left text-sm text-red-600 py-2 font-medium">
              {t.logout}
            </button>
          )}
        </div>
      )}
    </header>
  );
}
