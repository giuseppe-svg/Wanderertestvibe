import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Upload, MapPin, Calendar as CalendarIcon, DollarSign, Tag, Eye, Save, Loader2, Clock, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { getSession, createEvent, uploadEventImage, updateEvent } from '../utils/supabase/db';
import type { Event } from '../utils/supabase/types';

interface HostEventPageProps {
  onBack: () => void;
  onAuthRequired: () => void;
  isAuthenticated: boolean;
  userEmail: string;
  editEvent?: Event;
}

const CATEGORIES = [
  'Meditazione', 'Yoga', 'Cerimonia', 'Breathwork', 'Retreats',
  'Canto & Suono', 'Danza', 'Cacao', 'Reiki', 'Kambo',
  'Kundalini', 'Medicina delle Piante', 'Tantra', 'Astrologia', 'Tarot', 'Altro'
];

const LANGUAGES = [
  'Italiano', 'Inglese', 'Spagnolo', 'Francese', 'Tedesco',
  'Portoghese', 'Olandese', 'Russo', 'Arabo', 'Hindi', 'Altro'
];

const CURRENCIES = [
  { value: 'EUR', label: '€' },
  { value: 'USD', label: '$' },
  { value: 'GBP', label: '£' },
];

export function HostEventPage({ onBack, onAuthRequired, isAuthenticated, userEmail, editEvent }: HostEventPageProps) {
  const isEditing = !!editEvent;

  const [formData, setFormData] = useState({
    title: editEvent?.title ?? '',
    description: editEvent?.description ?? '',
    category: editEvent?.category ?? '',
    tags: editEvent?.tags ?? [] as string[],
    // Guidelines
    requirements: '',
    whatToExpect: '',
    preparation: '',
    // Date & time
    multiDay: !!(editEvent?.date_end),
    dateStart: editEvent?.date_start ?? '',
    dateEnd: editEvent?.date_end ?? '',
    allDay: editEvent ? !editEvent.time_start : false,
    timeStart: editEvent?.time_start ?? '',
    timeEnd: editEvent?.time_end ?? '',
    // Location
    locationSearch: '',
    venue: editEvent?.venue ?? '',
    city: editEvent?.city ?? '',
    country: editEvent?.country ?? '',
    address: editEvent?.address ?? '',
    showAddressImmediately: false,
    // Pricing
    priceModel: (editEvent?.price_type ?? 'fixed') as 'fixed' | 'free' | 'donation',
    price: editEvent?.price != null ? String(editEvent.price) : '',
    currency: editEvent?.currency ?? 'EUR',
    maxAttendees: editEvent?.max_attendees != null ? String(editEvent.max_attendees) : '',
    requiresApproval: editEvent?.requires_approval ?? false,
    // Language
    language: editEvent?.language ?? '',
    // Image
    image: null as File | null,
    imagePreview: editEvent?.cover_image_url ?? '',
    // Terms
    termsAccepted: false,
  });

  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (field: string, value: unknown) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set('image', file);
    const reader = new FileReader();
    reader.onload = (ev) => set('imagePreview', ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const addTag = () => {
    const t = currentTag.trim();
    if (t && !formData.tags.includes(t)) {
      set('tags', [...formData.tags, t]);
      setCurrentTag('');
    }
  };

  const removeTag = (tag: string) => set('tags', formData.tags.filter(t => t !== tag));

  const handleSubmit = async (asDraft = false) => {
    if (!isAuthenticated) {
      toast.error('Accedi per pubblicare un evento');
      onAuthRequired();
      return;
    }
    if (!formData.title || !formData.description || !formData.category || !formData.dateStart || !formData.city || !formData.country) {
      toast.error('Compila tutti i campi obbligatori (*)');
      return;
    }
    if (!asDraft && !formData.termsAccepted) {
      toast.error('Accetta i termini e condizioni');
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await getSession();
      if (!session) { toast.error('Sessione scaduta'); onAuthRequired(); return; }

      const priceNum = formData.priceModel === 'free' ? 0 : parseFloat(formData.price) || 0;

      const payload = {
        host_id: session.user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date_start: formData.dateStart,
        date_end: formData.multiDay && formData.dateEnd ? formData.dateEnd : null,
        time_start: formData.allDay ? null : (formData.timeStart || null),
        time_end: formData.allDay ? null : (formData.timeEnd || null),
        city: formData.city,
        country: formData.country,
        address: formData.address || null,
        venue: formData.venue || null,
        price: priceNum,
        currency: formData.currency,
        price_type: formData.priceModel,
        max_attendees: parseInt(formData.maxAttendees) || null,
        cover_image_url: null as string | null,
        tags: formData.tags,
        requires_approval: formData.requiresApproval,
        status: asDraft ? ('draft' as const) : ('published' as const),
        language: formData.language || null,
      };

      let eventId: string;
      if (isEditing && editEvent) {
        const updated = await updateEvent(editEvent.id, { ...payload });
        if (!updated) { toast.error('Errore durante la modifica dell\'evento'); return; }
        eventId = updated.id;
      } else {
        const created = await createEvent(payload);
        if (!created) { toast.error('Errore durante la creazione dell\'evento'); return; }
        eventId = created.id;
      }

      if (formData.image) {
        const imageUrl = await uploadEventImage(eventId, formData.image);
        if (imageUrl) {
          await updateEvent(eventId, { cover_image_url: imageUrl });
        }
      }

      toast.success(isEditing ? 'Evento aggiornato!' : asDraft ? 'Bozza salvata!' : 'Evento pubblicato!');
      setTimeout(() => onBack(), 800);
    } catch (err) {
      console.error(err);
      toast.error('Errore imprevisto. Riprova.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
              Indietro
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{isEditing ? 'Modifica evento' : 'Organizza un evento'}</h1>
              <p className="text-sm text-gray-500">Condividi la tua pratica spirituale con la community</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleSubmit(true)} disabled={isSubmitting}>
              <Save className="h-4 w-4 mr-1.5" />
              Salva bozza
            </Button>
            <Button variant="outline" size="sm" disabled>
              <Eye className="h-4 w-4 mr-1.5" />
              Anteprima
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main form ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. Informazioni di base */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Tag className="h-4 w-4" />
                  Informazioni di base
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Titolo evento *</Label>
                  <Input id="title" className="mt-1" placeholder="es. Cerimonia sacra del cacao"
                    value={formData.title} onChange={e => set('title', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="description">Descrizione *</Label>
                  <Textarea id="description" className="mt-1" rows={4}
                    placeholder="Descrivi il tuo evento, cosa possono aspettarsi i partecipanti e eventuali istruzioni speciali..."
                    value={formData.description} onChange={e => set('description', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select value={formData.category} onValueChange={v => set('category', v)}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona una categoria" /></SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Tag</Label>
                  <div className="mt-1 flex gap-2">
                    <Input placeholder="Aggiungi un tag" value={currentTag}
                      onChange={e => setCurrentTag(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }} />
                    <Button type="button" onClick={addTag} className="bg-gray-900 hover:bg-gray-800 text-white">Aggiungi</Button>
                  </div>
                  {formData.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {formData.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                          {tag} ×
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* 2. Linee guida dell'evento */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Linee guida dell'evento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="requirements">Requisiti</Label>
                  <Textarea id="requirements" className="mt-1" rows={3}
                    placeholder="Cosa dovrebbero sapere i partecipanti prima di partecipare?"
                    value={formData.requirements} onChange={e => set('requirements', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="whatToExpect">Cosa aspettarsi</Label>
                  <Textarea id="whatToExpect" className="mt-1" rows={3}
                    placeholder="Descrivi lo svolgimento dell'evento e cosa vivranno le persone."
                    value={formData.whatToExpect} onChange={e => set('whatToExpect', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="preparation">Preparazione</Label>
                  <Textarea id="preparation" className="mt-1" rows={3}
                    placeholder="Ci sono passi di preparazione? (es. porta il tappetino yoga, arriva 10 minuti prima)"
                    value={formData.preparation} onChange={e => set('preparation', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {/* 3. Data e ora */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CalendarIcon className="h-4 w-4" />
                  Data e ora
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Durata dell'evento</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button"
                      onClick={() => set('multiDay', false)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${!formData.multiDay ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}`}>
                      <CalendarIcon className="h-4 w-4" />
                      Un solo giorno
                    </button>
                    <button type="button"
                      onClick={() => set('multiDay', true)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-colors ${formData.multiDay ? 'border-purple-600 text-purple-700 bg-purple-50' : 'border-gray-200 text-gray-700 bg-white hover:bg-gray-50'}`}>
                      <CalendarIcon className="h-4 w-4" />
                      Più giorni
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateStart">{formData.multiDay ? 'Data inizio *' : 'Data evento *'}</Label>
                  <div className="mt-1 relative">
                    <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    <Input id="dateStart" type="date" className="pl-9"
                      placeholder="Scegli una data"
                      value={formData.dateStart} onChange={e => set('dateStart', e.target.value)} />
                  </div>
                </div>

                {formData.multiDay && (
                  <div>
                    <Label htmlFor="dateEnd">Data fine</Label>
                    <div className="mt-1 relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      <Input id="dateEnd" type="date" className="pl-9"
                        value={formData.dateEnd} onChange={e => set('dateEnd', e.target.value)} />
                    </div>
                  </div>
                )}

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-purple-600 w-4 h-4"
                    checked={formData.allDay} onChange={e => set('allDay', e.target.checked)} />
                  <span className="text-sm text-gray-700">Evento di tutto il giorno</span>
                </label>

                {!formData.allDay && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeStart">Ora inizio *</Label>
                      <div className="mt-1 relative">
                        <Input id="timeStart" type="time" className="pr-9"
                          value={formData.timeStart} onChange={e => set('timeStart', e.target.value)} />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="timeEnd">Ora fine</Label>
                      <div className="mt-1 relative">
                        <Input id="timeEnd" type="time" className="pr-9"
                          value={formData.timeEnd} onChange={e => set('timeEnd', e.target.value)} />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* 4. Luogo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="h-4 w-4" />
                  Luogo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="locationSearch">Cerca luogo</Label>
                  <Input id="locationSearch" className="mt-1"
                    placeholder="Inizia a digitare un indirizzo o il nome di un luogo"
                    value={formData.locationSearch} onChange={e => set('locationSearch', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="venue">Venue (opzionale)</Label>
                  <Input id="venue" className="mt-1" placeholder="es. Loft Studio Serenity"
                    value={formData.venue} onChange={e => set('venue', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">Città *</Label>
                    <Input id="city" className="mt-1" placeholder="es. New York"
                      value={formData.city} onChange={e => set('city', e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="country">Paese *</Label>
                    <Input id="country" className="mt-1" placeholder="es. Stati Uniti"
                      value={formData.country} onChange={e => set('country', e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Indirizzo *</Label>
                  <Input id="address" className="mt-1" placeholder="es. Via Benessere 123, Milano, MI 20100"
                    value={formData.address} onChange={e => set('address', e.target.value)} />
                </div>
              </CardContent>
            </Card>

            {/* 5. Prezzo e capienza */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <DollarSign className="h-4 w-4" />
                  Prezzo e capienza
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="mb-2 block">Modello di prezzo *</Label>
                  <div className="space-y-2">
                    {[
                      { value: 'fixed', icon: '⇄', label: 'Prezzo fisso', desc: 'Imposta un prezzo specifico per l\'evento' },
                      { value: 'free', icon: '🎟', label: 'Evento gratuito', desc: 'Nessun costo per i partecipanti' },
                      { value: 'donation', icon: '♡', label: 'A donazione', desc: 'I partecipanti pagano quanto possono al momento della prenotazione' },
                    ].map(opt => (
                      <button key={opt.value} type="button"
                        onClick={() => set('priceModel', opt.value)}
                        className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${formData.priceModel === opt.value ? 'border-purple-600 bg-white' : 'border-gray-200 bg-gray-50 hover:bg-white'}`}>
                        <span className={`mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${formData.priceModel === opt.value ? 'border-purple-600' : 'border-gray-300'}`}>
                          {formData.priceModel === opt.value && <span className="w-2 h-2 rounded-full bg-purple-600 block" />}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {formData.priceModel !== 'free' && (
                  <div>
                    <Label htmlFor="price">Prezzo *</Label>
                    <div className="mt-1 flex gap-2">
                      <Select value={formData.currency} onValueChange={v => set('currency', v)}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Input id="price" type="number" min="0" step="0.01" placeholder="0.00"
                        className="flex-1"
                        value={formData.price} onChange={e => set('price', e.target.value)} />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="maxAttendees">Numero massimo partecipanti *</Label>
                  <Input id="maxAttendees" type="number" min="1" className="mt-1" placeholder="es. 20"
                    value={formData.maxAttendees} onChange={e => set('maxAttendees', e.target.value)} />
                </div>

                <label className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${formData.requiresApproval ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600"
                    checked={formData.requiresApproval} onChange={e => set('requiresApproval', e.target.checked)} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Approva manualmente i partecipanti</p>
                    <p className="text-xs text-gray-500 mt-0.5">I nuovi iscritti entrano prima in lista d'attesa e richiedono approvazione dell'host.</p>
                  </div>
                </label>

                <label className={`flex items-start gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${formData.showAddressImmediately ? 'border-purple-300 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600"
                    checked={formData.showAddressImmediately} onChange={e => set('showAddressImmediately', e.target.checked)} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Mostra subito l'indirizzo preciso</p>
                    <p className="text-xs text-gray-500 mt-0.5">Se attiva, via e numero civico saranno visibili a tutti anche prima della conferma.</p>
                  </div>
                </label>
              </CardContent>
            </Card>

            {/* 6. Lingua dell'evento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Globe className="h-4 w-4" />
                  Lingua dell'evento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="language">Lingua principale in cui si svolge l'evento</Label>
                <Select value={formData.language} onValueChange={v => set('language', v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Seleziona una lingua" /></SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Image upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Upload className="h-4 w-4" />
                  Immagine evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {formData.imagePreview ? (
                  <div className="relative">
                    <img src={formData.imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                    <Button variant="destructive" size="sm" className="absolute top-2 right-2"
                      onClick={() => { set('image', null); set('imagePreview', ''); }}>
                      Rimuovi
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="image-upload" className="block cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Carica un'immagine per il tuo evento</p>
                      <p className="text-xs text-gray-400 mt-1">Clicca per scegliere un file</p>
                    </div>
                  </label>
                )}
                <input type="file" accept="image/*" id="image-upload" className="hidden" onChange={handleImageUpload} />
                <label htmlFor="image-upload">
                  <Button variant="outline" className="w-full" asChild>
                    <span className="cursor-pointer">Scegli immagine</span>
                  </Button>
                </label>
              </CardContent>
            </Card>

            {/* Publish */}
            <Card>
              <CardContent className="pt-5 space-y-4">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 text-purple-600"
                    checked={formData.termsAccepted} onChange={e => set('termsAccepted', e.target.checked)} />
                  <span className="text-sm text-gray-700">
                    Accetto i{' '}
                    <a href="#" className="text-purple-600 underline" onClick={e => e.preventDefault()}>
                      Termini e condizioni
                    </a>
                  </span>
                </label>
                <Button
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                  size="lg"
                  onClick={() => handleSubmit(false)}
                  disabled={isSubmitting || !formData.termsAccepted}>
                  {isSubmitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Pubblicazione...</> : 'Pubblica evento'}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Pubblicando, confermi che il tuo annuncio rispetta le regole della piattaforma.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
