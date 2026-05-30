import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../utils/supabase/db';

interface AuthPageProps {
  onBack: () => void;
  onAuthSuccess: (email: string, isNewUser?: boolean) => void;
}

export function AuthPage({ onBack, onAuthSuccess }: AuthPageProps) {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
      setIsLoadingGoogle(false);
    }
    // In caso di successo Supabase redirige — il loader rimane fino al redirect
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast.error('Compila tutti i campi');
      return;
    }
    setIsLoadingEmail(true);
    const { data, error } = await signInWithEmail(signInData.email, signInData.password);
    setIsLoadingEmail(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Bentornato!');
    onAuthSuccess(data.user?.email ?? signInData.email, false);
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.password) {
      toast.error('Compila tutti i campi');
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      toast.error('Le password non corrispondono');
      return;
    }
    if (signUpData.password.length < 6) {
      toast.error('La password deve avere almeno 6 caratteri');
      return;
    }
    setIsLoadingEmail(true);
    const { data, error } = await signUpWithEmail(signUpData.email, signUpData.password, signUpData.name);
    setIsLoadingEmail(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Account creato!');
    onAuthSuccess(data.user?.email ?? signUpData.email, true);
  };

  const isLoading = isLoadingGoogle || isLoadingEmail;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-5">

        {/* Back */}
        <button
          onClick={onBack}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Torna a Wanderer
        </button>

        {/* Logo + titolo */}
        <div className="text-center space-y-2 pb-1">
          <div className="flex items-center justify-center gap-2">
            <svg width="30" height="30" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C9.582 2 6 5.582 6 10c0 5.5 8 16 8 16s8-10.5 8-16c0-4.418-3.582-8-8-8z" fill="#7C3AED" opacity=".9"/>
              <circle cx="14" cy="10" r="2.8" fill="white"/>
            </svg>
            <span className="text-2xl font-bold text-gray-900">Wanderer</span>
          </div>
          <p className="text-gray-500 text-sm">Connettiti con comunità spirituali in tutto il mondo</p>
        </div>

        {/* ── Google Sign-In ── */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-400 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoadingGoogle ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {isLoadingGoogle ? 'Reindirizzamento a Google...' : 'Continua con Google'}
        </button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-gray-50 text-gray-400 uppercase tracking-wide">oppure</span>
          </div>
        </div>

        {/* ── Email / Password ── */}
        <Card className="shadow-sm border-gray-200">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'signin' | 'signup')} className="w-full">
            <CardHeader className="pb-0 pt-4 px-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Accedi</TabsTrigger>
                <TabsTrigger value="signup">Registrati</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="pt-4 px-4 pb-5">
              {/* Sign In */}
              <TabsContent value="signin" className="space-y-3 mt-0">
                <form onSubmit={handleEmailSignIn} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signin-email" className="text-sm">Email</Label>
                    <Input id="signin-email" type="email" placeholder="tua@email.com"
                      value={signInData.email}
                      onChange={(e) => setSignInData(p => ({ ...p, email: e.target.value }))}
                      disabled={isLoading} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signin-password" className="text-sm">Password</Label>
                    <Input id="signin-password" type="password" placeholder="La tua password"
                      value={signInData.password}
                      onChange={(e) => setSignInData(p => ({ ...p, password: e.target.value }))}
                      disabled={isLoading} required />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 mt-1" disabled={isLoading}>
                    {isLoadingEmail && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Accedi
                  </Button>
                </form>
              </TabsContent>

              {/* Sign Up */}
              <TabsContent value="signup" className="space-y-3 mt-0">
                <form onSubmit={handleEmailSignUp} className="space-y-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-name" className="text-sm">Nome completo</Label>
                    <Input id="signup-name" type="text" placeholder="Il tuo nome"
                      value={signUpData.name}
                      onChange={(e) => setSignUpData(p => ({ ...p, name: e.target.value }))}
                      disabled={isLoading} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-email" className="text-sm">Email</Label>
                    <Input id="signup-email" type="email" placeholder="tua@email.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData(p => ({ ...p, email: e.target.value }))}
                      disabled={isLoading} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-password" className="text-sm">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Min. 6 caratteri"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData(p => ({ ...p, password: e.target.value }))}
                      disabled={isLoading} required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="signup-confirm" className="text-sm">Conferma password</Label>
                    <Input id="signup-confirm" type="password" placeholder="Ripeti la password"
                      value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(p => ({ ...p, confirmPassword: e.target.value }))}
                      disabled={isLoading} required />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 mt-1" disabled={isLoading}>
                    {isLoadingEmail && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Crea account
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-xs text-gray-400">
          Registrandoti accetti i nostri{' '}
          <a href="#" className="underline hover:text-gray-600">Termini di servizio</a>
          {' '}e l'{' '}
          <a href="#" className="underline hover:text-gray-600">Informativa sulla privacy</a>
        </p>
      </div>
    </div>
  );
}
