import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ChefHat, Target, Users, Zap } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();

  // Check if user has completed onboarding
  useEffect(() => {
    // This will be implemented when we add the dashboard
  }, [user]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-accent/10 to-goals-healthy-living/10">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect authenticated users
  if (user) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-goals-healthy-living/10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-primary p-4 rounded-3xl shadow-glow">
              <ChefHat className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">Kitchin</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Your Personal Kitchen Assistant that recommends recipes based on your goals, 
            available ingredients, and helps you order what you need.
          </p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-gradient-primary text-white px-8 py-4 text-lg h-auto hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Start Your Culinary Journey
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
            <div className="bg-goals-weight-loss p-3 rounded-xl w-fit mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Goal-Based Recipes</h3>
            <p className="text-muted-foreground text-sm">
              Get recipes tailored to your fitness goals - weight loss, muscle building, or healthy living.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
            <div className="bg-goals-quick-meals p-3 rounded-xl w-fit mx-auto mb-4">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Smart Ingredient Matching</h3>
            <p className="text-muted-foreground text-sm">
              Find recipes based on ingredients you already have and easily order what's missing.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
            <div className="bg-goals-family-cooking p-3 rounded-xl w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Family Friendly</h3>
            <p className="text-muted-foreground text-sm">
              Cooking for one or feeding a family? Get portion recommendations that work for you.
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-white/60 backdrop-blur-sm shadow-card">
            <div className="bg-primary p-3 rounded-xl w-fit mx-auto mb-4">
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Skill Adaptive</h3>
            <p className="text-muted-foreground text-sm">
              From beginner to expert, get recipes that match your cooking skill level.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Kitchen?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of home cooks who've discovered their perfect recipes.
          </p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 text-lg h-auto transition-all duration-300"
          >
            Get Started Free
          </Button>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute top-20 left-10 w-20 h-20 bg-food-vegetables rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-food-proteins rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-food-grains rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-18 h-18 bg-food-spices rounded-full blur-xl animate-pulse delay-3000"></div>
      </div>
    </div>
  );
};

export default Index;
