import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, Camera, Save, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateProfile, uploadAvatar, signOut } from '../utils/supabase/db';
import type { Profile } from '../utils/supabase/types';
import { useI18n } from '../utils/i18n';

interface ProfilePageProps {
  profile: Profile;
  onBack: () => void;
  onSignOut: () => void;
  onProfileUpdated: (profile: Profile) => void;
}

const SPIRITUAL_INTERESTS = [
  'Cerimonie del Cacao', 'Reiki', 'Medicina delle Piante', 'Kambo', 'Suono & Canto',
  'Yoga', 'Meditazione', 'Breathwork', 'Ayahuasca', 'Cristalli',
  'Guarigione dei Chakra', 'Sciamanesimo', 'Tantra', 'Astrologia', 'Tarot',
  'Guarigione Energetica', 'Kundalini', 'Mindfulness', 'Geometria Sacra', 'Bagni di Foresta'
];

const LANGUAGES_LIST = [
  'Italiano', 'Inglese', 'Spagnolo', 'Francese', 'Tedesco', 'Portoghese',
  'Olandese', 'Russo', 'Cinese', 'Giapponese', 'Arabo', 'Hindi', 'Altro'
];

export function ProfilePage({ profile, onBack, onSignOut, onProfileUpdated }: ProfilePageProps) {
  const { t } = useI18n();
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    full_name: profile.full_name ?? '',
    nickname: profile.nickname ?? '',
    city: profile.city ?? '',
    location: profile.location ?? '',
    bio: profile.bio ?? '',
    interests: profile.interests ?? [],
    languages: profile.languages ?? [],
    experience_level: profile.experience_level ?? '',
    seeking: profile.seeking ?? '',
    whatsapp_number: profile.whatsapp_number ?? '',
    telegram_username: profile.telegram_username ?? '',
    instagram_url: profile.instagram_url ?? '',
    facebook_url: profile.facebook_url ?? '',
    x_url: profile.x_url ?? '',
    website_url: profile.website_url ?? '',
    avatar_url: profile.avatar_url ?? '',
  });

  const set = (field: string, value: unknown) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const toggleInterest = (interest: string) => {
    const curr = form.interests;
    if (curr.includes(interest)) {
      set('interests', curr.filter(i => i !== interest));
    } else if (curr.length < 10) {
      set('interests', [...curr, interest]);
    }
  };

  const toggleLanguage = (lang: string) => {
    const curr = form.languages;
    if (curr.includes(lang)) {
      set('languages', curr.filter(l => l !== lang));
    } else {
      set('languages', [...curr, lang]);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    const url = await uploadAvatar(profile.id, file);
    if (url) {
      set('avatar_url', url);
      await updateProfile(profile.id, { avatar_url: url });
      toast.success('Foto aggiornata!');
    } else {
      toast.error('Errore upload foto');
    }
    setUploadingAvatar(false);
  };

  const handleSave = async () => {
    if (!form.full_name || !form.city) {
      toast.error('Nome e città sono obbligatori');
      return;
    }
    setSaving(true);
    const updated = await updateProfile(profile.id, {
      full_name: form.full_name || null,
      nickname: form.nickname || null,
      city: form.city || null,
      location: form.location || null,
      bio: form.bio || null,
      interests: form.interests,
      languages: form.languages,
      experience_level: form.experience_level || null,
      seeking: form.seeking || null,
      whatsapp_number: form.whatsapp_number || null,
      telegram_username: form.telegram_username || null,
      instagram_url: form.instagram_url || null,
      facebook_url: form.facebook_url || null,
      x_url: form.x_url || null,
      website_url: form.website_url || null,
      avatar_url: form.avatar_url || null,
    });
    setSaving(false);
    if (updated) {
      toast.success('Profilo aggiornato!');
      onProfileUpdated(updated);
    } else {
      toast.error('Errore durante il salvataggio');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    onSignOut();
  };

  const avatarInitial = form.full_name ? form.full_name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
            {t.back}
          </button>
          <h1 className="text-lg font-bold text-gray-900">{t.profile}</h1>
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={saving} className="bg-purple-600 hover:bg-purple-700 text-white gap-1.5">
              {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              Salva
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Avatar */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-purple-100">
                  <AvatarImage src={form.avatar_url} />
                  <AvatarFallback className="bg-purple-100 text-purple-700 text-2xl font-semibold">{avatarInitial}</AvatarFallback>
                </Avatar>
                <button
                  className="absolute bottom-0 right-0 bg-purple-600 text-white rounded-full p-1.5 shadow hover:bg-purple-700 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingAvatar}
                >
                  {uploadingAvatar ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Camera className="h-3.5 w-3.5" />}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{form.full_name || 'Il tuo nome'}</h2>
                <p className="text-sm text-gray-500">{profile.email}</p>
                {form.city && <p className="text-sm text-gray-500">{form.city}{form.location ? `, ${form.location}` : ''}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info base */}
        <Card>
          <CardHeader><CardTitle className="text-base">Informazioni di base</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="full_name">Nome completo *</Label>
                <Input id="full_name" className="mt-1" value={form.full_name}
                  onChange={e => set('full_name', e.target.value)} placeholder="Il tuo nome" />
              </div>
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input id="nickname" className="mt-1" value={form.nickname}
                  onChange={e => set('nickname', e.target.value)} placeholder="@nickname" />
              </div>
              <div>
                <Label htmlFor="city">Città *</Label>
                <Input id="city" className="mt-1" value={form.city}
                  onChange={e => set('city', e.target.value)} placeholder="es. Milano" />
              </div>
              <div>
                <Label htmlFor="location">Paese</Label>
                <Input id="location" className="mt-1" value={form.location}
                  onChange={e => set('location', e.target.value)} placeholder="es. Italia" />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" className="mt-1" rows={3} value={form.bio}
                onChange={e => set('bio', e.target.value)}
                placeholder="Racconta il tuo percorso spirituale..." />
            </div>
          </CardContent>
        </Card>

        {/* Interessi */}
        <Card>
          <CardHeader><CardTitle className="text-base">Interessi spirituali ({form.interests.length}/10)</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {SPIRITUAL_INTERESTS.map(interest => (
                <Badge
                  key={interest}
                  variant={form.interests.includes(interest) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${form.interests.includes(interest) ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50'}`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lingue */}
        <Card>
          <CardHeader><CardTitle className="text-base">Lingue parlate</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES_LIST.map(lang => (
                <Badge
                  key={lang}
                  variant={form.languages.includes(lang) ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${form.languages.includes(lang) ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50'}`}
                  onClick={() => toggleLanguage(lang)}
                >
                  {lang}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seeking */}
        <Card>
          <CardHeader><CardTitle className="text-base">Cosa stai cercando?</CardTitle></CardHeader>
          <CardContent>
            <Textarea rows={3} value={form.seeking}
              onChange={e => set('seeking', e.target.value)}
              placeholder="Guarigione, comunità, crescita, pratiche specifiche..." />
          </CardContent>
        </Card>

        {/* Social links */}
        <Card>
          <CardHeader><CardTitle className="text-base">Contatti e social</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" className="mt-1" value={form.whatsapp_number}
                  onChange={e => set('whatsapp_number', e.target.value)} placeholder="+39 000 000 0000" />
              </div>
              <div>
                <Label htmlFor="telegram">Telegram</Label>
                <Input id="telegram" className="mt-1" value={form.telegram_username}
                  onChange={e => set('telegram_username', e.target.value)} placeholder="@username" />
              </div>
              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" className="mt-1" value={form.instagram_url}
                  onChange={e => set('instagram_url', e.target.value)} placeholder="@tuousername" />
              </div>
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" className="mt-1" value={form.facebook_url}
                  onChange={e => set('facebook_url', e.target.value)} placeholder="url profilo" />
              </div>
              <div>
                <Label htmlFor="x_url">X (Twitter)</Label>
                <Input id="x_url" className="mt-1" value={form.x_url}
                  onChange={e => set('x_url', e.target.value)} placeholder="@username" />
              </div>
              <div>
                <Label htmlFor="website">Sito web</Label>
                <Input id="website" className="mt-1" value={form.website_url}
                  onChange={e => set('website_url', e.target.value)} placeholder="tuosito.com" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sign out */}
        <Card className="border-red-100">
          <CardContent className="pt-6">
            <Button
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              {t.logout}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
