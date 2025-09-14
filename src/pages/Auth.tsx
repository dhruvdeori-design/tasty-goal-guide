import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { Chrome, Mail, Smartphone, ChefHat } from 'lucide-react';

const Auth = () => {
  const { user, loading, signInWithGoogle, signInWithOTP, signUpWithEmail } = useAuth();
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/onboarding" replace />;
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };

  const handleEmailOTP = async () => {
    if (!email) return;
    setIsLoading(true);
    await signInWithOTP(email);
    setIsLoading(false);
  };

  const handleEmailSignUp = async () => {
    if (!email || !password || !fullName) return;
    setIsLoading(true);
    await signUpWithEmail(email, password, fullName);
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-goals-healthy-living/10">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-goals-healthy-living/10 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-primary p-3 rounded-2xl shadow-glow">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome to Kitchin</h1>
          <p className="text-muted-foreground">Your Personal Kitchen Assistant</p>
        </div>

        <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl">
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {authMode === 'signin' 
                ? 'Welcome back! Choose your preferred sign-in method'
                : 'Join thousands of home cooks on their culinary journey'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Google Sign In - Primary Option */}
            <Button 
              onClick={handleGoogleAuth}
              disabled={isLoading}
              className="w-full h-12 bg-gradient-primary text-white hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              <Chrome className="mr-3 h-5 w-5" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Email/Password for Sign Up */}
            {authMode === 'signup' && (
              <div className="space-y-3">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12"
                />
                <Button 
                  onClick={handleEmailSignUp}
                  disabled={isLoading || !email || !password || !fullName}
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Create Account
                </Button>
              </div>
            )}

            {/* Email OTP for Sign In */}
            {authMode === 'signin' && (
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
                <Button 
                  onClick={handleEmailOTP}
                  disabled={isLoading || !email}
                  variant="outline"
                  className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Mail className="mr-3 h-4 w-4" />
                  Continue with Email OTP
                </Button>
              </div>
            )}

            {/* Mobile OTP - Future Implementation */}
            <div className="space-y-3">
              <Input
                type="tel"
                placeholder="Mobile number (+91)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
                disabled
              />
              <Button 
                disabled
                variant="outline"
                className="w-full h-12 opacity-50 cursor-not-allowed"
              >
                <Smartphone className="mr-3 h-4 w-4" />
                Mobile OTP (Coming Soon)
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {authMode === 'signin' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </button>
            </div>

            <div className="text-xs text-center text-muted-foreground space-y-1">
              <p>By continuing, you agree to our</p>
              <div className="flex justify-center space-x-4">
                <button className="hover:text-primary transition-colors">Terms of Service</button>
                <span>•</span>
                <button className="hover:text-primary transition-colors">Privacy Policy</button>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Background Food Illustration Placeholder */}
        <div className="fixed inset-0 -z-10 opacity-20">
          <div className="absolute top-20 left-10 w-20 h-20 bg-food-vegetables rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-food-proteins rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-food-grains rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-18 h-18 bg-food-spices rounded-full blur-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;