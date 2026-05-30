import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Calendar, MapPin, Users, Plus, Edit, LogOut, User } from 'lucide-react';
import { toast } from 'sonner';
import {
  getSession,
  getEventsByHost,
  getMyAttendances,
  leaveEvent,
} from '../utils/supabase/db';
import type { Event, EventAttendee } from '../utils/supabase/types';
import { useI18n } from '../utils/i18n';
import type { Profile } from '../utils/supabase/types';

interface MainDashboardProps {
  onHostEvent: () => void;
  onDiscoverEvents: () => void;
  userEmail: string;
  onSignOut?: () => void;
  onEditEvent?: (event: Event) => void;
  onProfile?: () => void;
  profile?: Profile | null;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    cancelled: 'bg-red-100 text-red-800',
    draft: 'bg-gray-100 text-gray-700',
    published: 'bg-purple-100 text-purple-800',
  };
  return (
    <Badge className={map[status] ?? 'bg-gray-100 text-gray-800'}>
      {status}
    </Badge>
  );
}

export function MainDashboard({
  onHostEvent,
  onDiscoverEvents,
  userEmail,
  onSignOut,
  onEditEvent,
  onProfile,
  profile,
}: MainDashboardProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('hosted');
  const [hostedEvents, setHostedEvents] = useState<Event[]>([]);
  const [attendances, setAttendances] = useState<EventAttendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    getSession().then(async (session) => {
      if (!session) return;
      setUserId(session.user.id);
      const [hosted, myAtt] = await Promise.all([
        getEventsByHost(session.user.id),
        getMyAttendances(session.user.id),
      ]);
      setHostedEvents(hosted);
      setAttendances(myAtt);
      setLoading(false);
    });
  }, []);

  const handleLeave = async (attendance: EventAttendee) => {
    if (!userId) return;
    const eventId = attendance.event_id;
    await leaveEvent(eventId, userId);
    setAttendances(prev => prev.filter(a => a.id !== attendance.id));
    toast.success('Hai lasciato l\'evento');
  };

  const displayName = profile?.full_name ?? profile?.nickname ?? userEmail;
  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-purple-100 cursor-pointer" onClick={onProfile}>
              <AvatarImage src={profile?.avatar_url ?? ''} />
              <AvatarFallback className="bg-purple-100 text-purple-700 text-sm font-semibold">{avatarInitial}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-gray-900">{displayName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onProfile} className="gap-1.5 hidden sm:flex">
              <User className="h-3.5 w-3.5" /> {t.profile}
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5" onClick={onHostEvent}>
              <Plus className="h-3.5 w-3.5" /> {t.hostEvent}
            </Button>
            <Button size="sm" variant="ghost" onClick={onSignOut} className="text-red-500 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hosted">{t.hostedEvents} ({hostedEvents.length})</TabsTrigger>
            <TabsTrigger value="attending">{t.attendingEvents} ({attendances.length})</TabsTrigger>
          </TabsList>

          {/* TAB: Hosted Events */}
          <TabsContent value="hosted" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">{t.hostedEvents}</h2>
              <Button size="sm" onClick={onHostEvent} className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Nuovo evento
              </Button>
            </div>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Caricamento...</div>
            ) : hostedEvents.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Calendar className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>{t.noHostedEvents}</p>
                  <Button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white" onClick={onHostEvent}>
                    <Plus className="h-4 w-4 mr-1.5" /> Organizza il tuo primo evento
                  </Button>
                </CardContent>
              </Card>
            ) : (
              hostedEvents.map(event => (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="py-4 px-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-gray-900 truncate">{event.title}</h3>
                          <StatusBadge status={event.status} />
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(event.date_start).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {event.city}, {event.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3.5 w-3.5" />
                            {event.current_attendees}/{event.max_attendees} {t.attendees}
                          </span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0 gap-1.5"
                        onClick={() => onEditEvent?.(event)}
                      >
                        <Edit className="h-3.5 w-3.5" />
                        {t.editEvent}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* TAB: Attending Events */}
          <TabsContent value="attending" className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-900">{t.attendingEvents}</h2>
              <Button size="sm" variant="outline" onClick={onDiscoverEvents}>
                Scopri eventi
              </Button>
            </div>
            {loading ? (
              <div className="text-center py-12 text-gray-400">Caricamento...</div>
            ) : attendances.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-gray-500">
                  <Users className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                  <p>{t.noAttendingEvents}</p>
                  <Button className="mt-4" variant="outline" onClick={onDiscoverEvents}>
                    Scopri eventi
                  </Button>
                </CardContent>
              </Card>
            ) : (
              attendances.map(att => {
                // event data is nested in att (from select '*, event:events(*)')
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const event = (att as any).event as Event | undefined;
                return (
                  <Card key={att.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="py-4 px-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-semibold text-gray-900 truncate">{event?.title ?? att.event_id}</h3>
                            <StatusBadge status={att.status} />
                          </div>
                          {event && (
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(event.date_start).toLocaleDateString('it-IT', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3.5 w-3.5" />
                                {event.city}, {event.country}
                              </span>
                            </div>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="shrink-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                          onClick={() => handleLeave(att)}
                        >
                          {t.leaveEvent}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
