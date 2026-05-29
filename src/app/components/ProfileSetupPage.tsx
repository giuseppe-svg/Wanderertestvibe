import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { User, Heart, Languages, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner';
import { getSession, upsertProfile } from '../utils/supabase/db';

interface ProfileSetupPageProps {
  onComplete: () => void;
  userEmail: string;
}

const SPIRITUAL_INTERESTS = [
  'Cerimonie del Cacao', 'Reiki', 'Medicina delle Piante', 'Kambo', 'Suono & Canto',
  'Yoga', 'Meditazione', 'Breathwork', 'Ayahuasca', 'Cristalli',
  'Guarigione dei Chakra', 'Sciamanesimo', 'Tantra', 'Astrologia', 'Tarot',
  'Guarigione Energetica', 'Kundalini', 'Mindfulness', 'Geometria Sacra', 'Bagni di Foresta'
];

const LANGUAGES = [
  'Italiano', 'Inglese', 'Spagnolo', 'Francese', 'Tedesco', 'Portoghese',
  'Olandese', 'Russo', 'Cinese', 'Giapponese', 'Arabo', 'Hindi', 'Altro'
];

const COUNTRIES = [
  'Italia', 'Stati Uniti', 'Canada', 'Regno Unito', 'Germania', 'Francia',
  'Spagna', 'Paesi Bassi', 'Australia', 'Brasile', 'Argentina', 'Messico',
  'India', 'Thailandia', 'Indonesia', 'Svezia', 'Norvegia', 'Svizzera', 'Altro'
];

export function ProfileSetupPage({ onComplete, userEmail }: ProfileSetupPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    full_name: '',
    location: '',
    city: '',
    bio: '',
    interests: [] as string[],
    languages: [] as string[],
    experience_level: '',
    seeking: '',
    instagram_url: '',
    website_url: '',
    whatsapp_number: '',
    telegram_username: '',
  });

  const toggleInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : prev.interests.length < 10 ? [...prev.interests, interest] : prev.interests
    }));
  };

  const toggleLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleSubmit = async () => {
    if (!profileData.full_name || !profileData.city) {
      toast.error('Compila i campi obbligatori');
      return;
    }
    if (profileData.interests.length === 0) {
      toast.error('Seleziona almeno un interesse spirituale');
      return;
    }
    setIsLoading(true);
    const session = await getSession();
    if (!session) {
      toast.error('Sessione scaduta. Accedi di nuovo.');
      setIsLoading(false);
      return;
    }
    const result = await upsertProfile({
      id: session.user.id,
      email: userEmail,
      full_name: profileData.full_name,
      location: profileData.location || null,
      city: profileData.city || null,
      bio: profileData.bio || null,
      interests: profileData.interests,
      languages: profileData.languages,
      experience_level: profileData.experience_level || null,
      seeking: profileData.seeking || null,
      instagram_url: profileData.instagram_url || null,
      website_url: profileData.website_url || null,
      whatsapp_number: profileData.whatsapp_number || null,
      telegram_username: profileData.telegram_username || null,
      role: 'user',
      nickname: null,
      avatar_url: null,
      facebook_url: null,
      x_url: null,
      onboarding_completed: true,
      onboarding_step: 3,
      suspended_until: null,
      suspended_reason: null,
      suspended_by: null,
    });
    setIsLoading(false);
    if (!result) {
      toast.error('Errore durante la creazione del profilo');
      return;
    }
    toast.success('Profilo creato! Benvenuto in Wanderer!');
    onComplete();
  };

  const nextStep = () => {
    if (step === 1 && !profileData.full_name) {
      toast.error('Inserisci il tuo nome');
      return;
    }
    if (step === 2 && profileData.interests.length === 0) {
      toast.error('Seleziona almeno un interesse');
      return;
    }
    setStep(step + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C9.582 2 6 5.582 6 10c0 5.5 8 16 8 16s8-10.5 8-16c0-4.418-3.582-8-8-8z" fill="#7C3AED" opacity=".9"/>
              <circle cx="14" cy="10" r="2.8" fill="white"/>
            </svg>
            <span className="text-2xl font-bold text-gray-900">Completa il tuo profilo</span>
          </div>
          <p className="text-gray-600">Aiutaci a connetterti con la comunità spirituale giusta</p>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className={`w-3 h-3 rounded-full ${n === step ? 'bg-purple-600' : n < step ? 'bg-purple-300' : 'bg-gray-200'}`} />
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {step === 1 && <><User className="h-5 w-5" /> Informazioni di base</>}
              {step === 2 && <><Heart className="h-5 w-5" /> Interessi spirituali</>}
              {step === 3 && <><Languages className="h-5 w-5" /> Lingue e contatti</>}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Raccontaci di te'}
              {step === 2 && 'Quali pratiche spirituali ti attraggono? (Max 10)'}
              {step === 3 && 'Lingue parlate e come contattarti'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo *</Label>
                  <Input id="name" value={profileData.full_name}
                    onChange={(e) => setProfileData(p => ({ ...p, full_name: e.target.value }))}
                    placeholder="Il tuo nome completo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Nazionalità</Label>
                  <Select value={profileData.location} onValueChange={(v) => setProfileData(p => ({ ...p, location: v }))}>
                    <SelectTrigger><SelectValue placeholder="Seleziona la tua nazionalità" /></SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Città *</Label>
                  <Input id="city" value={profileData.city}
                    onChange={(e) => setProfileData(p => ({ ...p, city: e.target.value }))}
                    placeholder="La tua città" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Chi sei</Label>
                  <Textarea id="bio" value={profileData.bio}
                    onChange={(e) => setProfileData(p => ({ ...p, bio: e.target.value }))}
                    placeholder="Racconta il tuo percorso spirituale..." rows={3} />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {SPIRITUAL_INTERESTS.map(interest => (
                    <Badge key={interest} variant={profileData.interests.includes(interest) ? 'default' : 'outline'}
                      className={`cursor-pointer p-3 text-center justify-center transition-colors ${profileData.interests.includes(interest) ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50'}`}
                      onClick={() => toggleInterest(interest)}>
                      {interest}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-gray-600 text-center">Selezionati: {profileData.interests.length}/10</div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Livello di esperienza</Label>
                  <Select value={profileData.experience_level} onValueChange={(v) => setProfileData(p => ({ ...p, experience_level: v }))}>
                    <SelectTrigger><SelectValue placeholder="Seleziona il tuo livello" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante — Sto iniziando il mio percorso</SelectItem>
                      <SelectItem value="intermediate">Intermedio — Ho qualche esperienza</SelectItem>
                      <SelectItem value="advanced">Avanzato — Praticante esperto</SelectItem>
                      <SelectItem value="teacher">Insegnante / Facilitatore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seeking">Cosa stai cercando?</Label>
                  <Textarea id="seeking" value={profileData.seeking}
                    onChange={(e) => setProfileData(p => ({ ...p, seeking: e.target.value }))}
                    placeholder="Guarigione, comunità, crescita, pratiche specifiche..." rows={2} />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>Lingue parlate</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {LANGUAGES.map(language => (
                      <Badge key={language} variant={profileData.languages.includes(language) ? 'default' : 'outline'}
                        className={`cursor-pointer p-2 text-center justify-center transition-colors ${profileData.languages.includes(language) ? 'bg-purple-600 hover:bg-purple-700' : 'hover:bg-purple-50'}`}
                        onClick={() => toggleLanguage(language)}>
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp (opzionale)</Label>
                    <Input id="whatsapp" value={profileData.whatsapp_number}
                      onChange={(e) => setProfileData(p => ({ ...p, whatsapp_number: e.target.value }))}
                      placeholder="+39 000 000 0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram (opzionale)</Label>
                    <Input id="telegram" value={profileData.telegram_username}
                      onChange={(e) => setProfileData(p => ({ ...p, telegram_username: e.target.value }))}
                      placeholder="@username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instagram">Instagram (opzionale)</Label>
                    <Input id="instagram" value={profileData.instagram_url}
                      onChange={(e) => setProfileData(p => ({ ...p, instagram_url: e.target.value }))}
                      placeholder="@tuousername" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Sito web (opzionale)</Label>
                    <Input id="website" value={profileData.website_url}
                      onChange={(e) => setProfileData(p => ({ ...p, website_url: e.target.value }))}
                      placeholder="tuosito.com" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 1}>
                Indietro
              </Button>
              {step < 3 ? (
                <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700">Avanti</Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
                  {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Completa profilo
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
