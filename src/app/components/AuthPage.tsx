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
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
    // On success, Supabase redirects — no manual navigation needed
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInData.email || !signInData.password) {
      toast.error('Compila tutti i campi');
      return;
    }
    setIsLoading(true);
    const { data, error } = await signInWithEmail(signInData.email, signInData.password);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
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
    setIsLoading(true);
    const { data, error } = await signUpWithEmail(signUpData.email, signUpData.password, signUpData.name);
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Account creato!');
    onAuthSuccess(data.user?.email ?? signUpData.email, true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Torna a Wanderer
          </button>

          <div className="flex items-center justify-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C9.582 2 6 5.582 6 10c0 5.5 8 16 8 16s8-10.5 8-16c0-4.418-3.582-8-8-8z" fill="#7C3AED" opacity=".9"/>
              <circle cx="14" cy="10" r="2.8" fill="white"/>
            </svg>
            <span className="text-2xl font-bold text-gray-900">Entra in Wanderer</span>
          </div>

          <p className="text-gray-600">Connettiti con comunità spirituali in tutto il mondo</p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          variant="outline"
          className="w-full h-12 border-2"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          Continua con Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-background text-gray-500">oppure</span>
          </div>
        </div>

        <Card>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'signin' | 'signup')} className="w-full">
            <CardHeader className="pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Accedi</TabsTrigger>
                <TabsTrigger value="signup">Registrati</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="space-y-4">
              <TabsContent value="signin" className="space-y-4 mt-0">
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input id="signin-email" type="email" placeholder="tua@email.com" value={signInData.email}
                      onChange={(e) => setSignInData(p => ({ ...p, email: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input id="signin-password" type="password" placeholder="La tua password" value={signInData.password}
                      onChange={(e) => setSignInData(p => ({ ...p, password: e.target.value }))} required />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Accedi
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-0">
                <form onSubmit={handleEmailSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome completo</Label>
                    <Input id="signup-name" type="text" placeholder="Il tuo nome" value={signUpData.name}
                      onChange={(e) => setSignUpData(p => ({ ...p, name: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="tua@email.com" value={signUpData.email}
                      onChange={(e) => setSignUpData(p => ({ ...p, email: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" placeholder="Crea una password (min. 6 caratteri)" value={signUpData.password}
                      onChange={(e) => setSignUpData(p => ({ ...p, password: e.target.value }))} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Conferma password</Label>
                    <Input id="signup-confirm" type="password" placeholder="Ripeti la password" value={signUpData.confirmPassword}
                      onChange={(e) => setSignUpData(p => ({ ...p, confirmPassword: e.target.value }))} required />
                  </div>
                  <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                    {isLoading && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    Crea account
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-gray-600">
          Registrandoti accetti i nostri Termini di servizio e l'Informativa sulla privacy
        </p>
      </div>
    </div>
  );
}
