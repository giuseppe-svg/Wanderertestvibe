export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  role: 'user' | 'host' | 'seeker';
  nickname: string | null;
  languages: string[];
  interests: string[];
  instagram_url: string | null;
  facebook_url: string | null;
  x_url: string | null;
  created_at: string;
  updated_at: string;
  city: string | null;
  experience_level: string | null;
  seeking: string | null;
  website_url: string | null;
  onboarding_completed: boolean;
  onboarding_step: number;
  whatsapp_number: string | null;
  suspended_until: string | null;
  suspended_reason: string | null;
  suspended_by: string | null;
  telegram_username: string | null;
}

export interface Event {
  id: string;
  host_id: string;
  title: string;
  description: string | null;
  category: string;
  date_start: string;
  date_end: string | null;
  time_start: string | null;
  time_end: string | null;
  city: string;
  country: string;
  address: string | null;
  venue: string | null;
  price: number;
  currency: string;
  price_type: 'fixed' | 'free' | 'donation';
  max_attendees: number | null;
  attendees_count: number;
  cover_image_url: string | null;
  tags: string[];
  requires_approval: boolean;
  status: 'draft' | 'published' | 'cancelled';
  language: string | null;
  created_at: string;
  updated_at: string;
  // joined from profiles
  host?: Pick<Profile, 'id' | 'full_name' | 'avatar_url' | 'nickname'>;
}

export interface EventAttendee {
  id: string;
  event_id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  profile?: Profile;
}

export type ProfileInsert = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<Omit<Profile, 'id' | 'created_at'>>;
export type EventInsert = Omit<Event, 'id' | 'created_at' | 'updated_at' | 'attendees_count' | 'host'>;
export type EventUpdate = Partial<Omit<Event, 'id' | 'created_at' | 'host'>>;
