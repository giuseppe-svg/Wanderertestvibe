import { getSupabaseClient } from './client';
import type { Profile, ProfileInsert, ProfileUpdate, Event, EventInsert, EventUpdate, EventAttendee } from './types';

const sb = () => getSupabaseClient();

// ─── AUTH ─────────────────────────────────────────────────────────────────────

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const { data, error } = await sb().auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  return { data, error };
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await sb().auth.signInWithPassword({ email, password });
  return { data, error };
}

const PRODUCTION_URL = 'https://wanderertestvibe.vercel.app';

export async function signInWithGoogle() {
  // In produzione usa il dominio Vercel, in locale usa l'origin corrente
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const redirectTo = isLocalhost ? window.location.origin : PRODUCTION_URL;

  const { data, error } = await sb().auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });
  return { data, error };
}

export async function signOut() {
  return await sb().auth.signOut();
}

export async function getSession() {
  const { data } = await sb().auth.getSession();
  return data.session;
}

export function onAuthStateChange(cb: Parameters<ReturnType<typeof getSupabaseClient>['auth']['onAuthStateChange']>[0]) {
  return sb().auth.onAuthStateChange(cb);
}

// ─── PROFILES ─────────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await sb()
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) { console.error('getProfile:', error.message); return null; }
  return data as Profile;
}

export async function upsertProfile(profile: ProfileInsert & { id: string }): Promise<Profile | null> {
  const { data, error } = await sb()
    .from('profiles')
    .upsert({ ...profile, updated_at: new Date().toISOString() }, { onConflict: 'id' })
    .select()
    .single();
  if (error) { console.error('upsertProfile:', error.message); return null; }
  return data as Profile;
}

export async function updateProfile(userId: string, updates: ProfileUpdate): Promise<Profile | null> {
  const { data, error } = await sb()
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', userId)
    .select()
    .single();
  if (error) { console.error('updateProfile:', error.message); return null; }
  return data as Profile;
}

export async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const path = `${userId}/avatar-${Date.now()}.${ext}`;
  const { error } = await sb().storage.from('avatars').upload(path, file, { upsert: true });
  if (error) { console.error('uploadAvatar:', error.message); return null; }
  const { data } = sb().storage.from('avatars').getPublicUrl(path);
  return data.publicUrl;
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────

export async function getEvents(filters?: {
  category?: string;
  city?: string;
  status?: string;
  limit?: number;
}): Promise<Event[]> {
  let query = sb()
    .from('events')
    .select('*, host:profiles!host_id(id, full_name, avatar_url, nickname)')
    .order('date_start', { ascending: true, nullsFirst: false });

  if (filters?.status) query = query.eq('status', filters.status);
  else query = query.eq('status', 'published');

  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.city) query = query.ilike('city', `%${filters.city}%`);
  if (filters?.limit) query = query.limit(filters.limit);

  const { data, error } = await query;
  if (error) { console.error('getEvents:', error.message); return []; }
  return (data ?? []) as Event[];
}

export async function getEventById(id: string): Promise<Event | null> {
  const { data, error } = await sb()
    .from('events')
    .select('*, host:profiles!host_id(id, full_name, avatar_url, nickname)')
    .eq('id', id)
    .single();
  if (error) { console.error('getEventById:', error.message); return null; }
  return data as Event;
}

export async function getEventsByHost(hostId: string): Promise<Event[]> {
  const { data, error } = await sb()
    .from('events')
    .select('*')
    .eq('host_id', hostId)
    .order('date_start', { ascending: true, nullsFirst: false });
  if (error) { console.error('getEventsByHost:', error.message); return []; }
  return (data ?? []) as Event[];
}

export async function createEvent(event: EventInsert): Promise<Event | null> {
  const { data, error } = await sb()
    .from('events')
    .insert(event)
    .select()
    .single();
  if (error) {
    console.error('createEvent error:', error.code, error.message, error.details, error.hint);
    throw new Error(error.message || 'Errore creazione evento');
  }
  return data as Event;
}

export async function updateEvent(id: string, updates: EventUpdate): Promise<Event | null> {
  const { data, error } = await sb()
    .from('events')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) { console.error('updateEvent:', error.message); return null; }
  return data as Event;
}

export async function deleteEvent(id: string) {
  return await sb().from('events').delete().eq('id', id);
}

export async function uploadEventImage(eventId: string, file: File): Promise<string | null> {
  const ext = file.name.split('.').pop();
  const path = `events/${eventId}/cover-${Date.now()}.${ext}`;
  const { error } = await sb().storage.from('event-images').upload(path, file, { upsert: true });
  if (error) { console.error('uploadEventImage:', error.message); return null; }
  const { data } = sb().storage.from('event-images').getPublicUrl(path);
  return data.publicUrl;
}

// ─── ATTENDEES ────────────────────────────────────────────────────────────────

export async function joinEvent(eventId: string, userId: string, requiresApproval: boolean): Promise<EventAttendee | null> {
  const status = requiresApproval ? 'pending' : 'confirmed';
  const { data, error } = await sb()
    .from('event_attendees')
    .insert({ event_id: eventId, user_id: userId, status })
    .select()
    .single();
  if (error) { console.error('joinEvent:', error.message); return null; }

  if (!requiresApproval) {
    await sb().rpc('increment_attendees', { event_id: eventId });
  }
  return data as EventAttendee;
}

export async function leaveEvent(eventId: string, userId: string) {
  const { data } = await sb()
    .from('event_attendees')
    .select('status')
    .eq('event_id', eventId)
    .eq('user_id', userId)
    .single();

  const res = await sb()
    .from('event_attendees')
    .delete()
    .eq('event_id', eventId)
    .eq('user_id', userId);

  if (data?.status === 'confirmed') {
    await sb().rpc('decrement_attendees', { event_id: eventId });
  }
  return res;
}

export async function getMyAttendances(userId: string): Promise<EventAttendee[]> {
  const { data, error } = await sb()
    .from('event_attendees')
    .select('*, event:events(*)')
    .eq('user_id', userId);
  if (error) { console.error('getMyAttendances:', error.message); return []; }
  return (data ?? []) as EventAttendee[];
}

export async function getEventAttendees(eventId: string): Promise<EventAttendee[]> {
  const { data, error } = await sb()
    .from('event_attendees')
    .select('*, profile:profiles(*)')
    .eq('event_id', eventId);
  if (error) { console.error('getEventAttendees:', error.message); return []; }
  return (data ?? []) as EventAttendee[];
}

export async function isAttending(eventId: string, userId: string): Promise<boolean> {
  const { data } = await sb()
    .from('event_attendees')
    .select('id')
    .eq('event_id', eventId)
    .eq('user_id', userId)
    .maybeSingle();
  return !!data;
}
