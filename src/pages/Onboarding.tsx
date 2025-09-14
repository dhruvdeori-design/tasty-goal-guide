import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Target, Heart, Zap, Users, 
  Leaf, Beef, Carrot, Wheat, 
  Clock, MapPin, IndianRupee,
  ChefHat, ArrowRight, ArrowLeft
} from 'lucide-react';

interface OnboardingData {
  primary_goal: string;
  target_calories?: number;
  target_protein?: number;
  food_type: string;
  dietary_restrictions: string[];
  allergies: string[];
  preferred_cuisines: string[];
  spice_level: number;
  cooking_time_preference: string;
  skill_level: number;
  household_size: number;
  budget_per_meal_min: number;
  budget_per_meal_max: number;
  city: string;
  state: string;
}

const goals = [
  { id: 'weight_loss', label: 'Weight Loss', icon: Target, description: 'Calorie deficit recipes', color: 'goals-weight-loss' },
  { id: 'muscle_building', label: 'Muscle Building', icon: Heart, description: 'High protein recipes', color: 'goals-muscle-building' },
  { id: 'healthy_living', label: 'Healthy Living', icon: Leaf, description: 'Balanced nutrition', color: 'goals-healthy-living' },
  { id: 'quick_meals', label: 'Quick Meals', icon: Zap, description: 'Time-efficient cooking', color: 'goals-quick-meals' },
  { id: 'family_cooking', label: 'Family Cooking', icon: Users, description: 'Large portions', color: 'goals-family-cooking' },
];

const foodTypes = [
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
  { id: 'non_vegetarian', label: 'Non-Vegetarian', icon: Beef },
  { id: 'vegan', label: 'Vegan', icon: Carrot },
];

const cuisines = [
  { id: 'north_indian', label: 'North Indian' },
  { id: 'south_indian', label: 'South Indian' },
  { id: 'continental', label: 'Continental' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'italian', label: 'Italian' },
  { id: 'mediterranean', label: 'Mediterranean' },
];

const cookingTimes = [
  { id: 'quick', label: 'Quick (15-30 min)', icon: Zap },
  { id: 'moderate', label: 'Moderate (30-60 min)', icon: Clock },
  { id: 'elaborate', label: 'Elaborate (60+ min)', icon: ChefHat },
  { id: 'variable', label: 'Variable (depends on mood)', icon: Heart },
];

const Onboarding = () => {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<OnboardingData>({
    primary_goal: '',
    food_type: '',
    dietary_restrictions: [],
    allergies: [],
    preferred_cuisines: [],
    spice_level: 3,
    cooking_time_preference: '',
    skill_level: 3,
    household_size: 2,
    budget_per_meal_min: 50,
    budget_per_meal_max: 200,
    city: '',
    state: '',
  });

  // Redirect if not authenticated
  if (!user && !loading) {
    return <Navigate to="/auth" replace />;
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>;
  }

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: keyof OnboardingData, item: string) => {
    const currentArray = data[key] as string[];
    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updateData(key, newArray);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(data)
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Profile completed!",
        description: "Welcome to your personalized cooking journey.",
      });

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return data.primary_goal !== '';
      case 2: return data.food_type !== '';
      case 3: return data.cooking_time_preference !== '';
      case 4: return data.city !== '';
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/10 to-goals-healthy-living/10 p-4">
      <div className="max-w-2xl mx-auto py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">Set Up Your Kitchen Profile</h1>
            <span className="text-sm text-muted-foreground">Step {currentStep} of {totalSteps}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-card border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center">
              {currentStep === 1 && "What's your primary goal?"}
              {currentStep === 2 && "Tell us about your dietary preferences"}
              {currentStep === 3 && "How much time do you have for cooking?"}
              {currentStep === 4 && "Where are you located?"}
              {currentStep === 5 && "Final details"}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Goals */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal) => {
                  const IconComponent = goal.icon;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => updateData('primary_goal', goal.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                        data.primary_goal === goal.id
                          ? `border-${goal.color} bg-gradient-to-br from-${goal.color}/10 to-${goal.color}/5 shadow-lg`
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          data.primary_goal === goal.id 
                            ? `bg-${goal.color} text-white`
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{goal.label}</h3>
                          <p className="text-sm text-muted-foreground">{goal.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 2: Dietary Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Food Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {foodTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => updateData('food_type', type.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            data.food_type === type.id
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <IconComponent className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <span className="text-sm font-medium">{type.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">Preferred Cuisines</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {cuisines.map((cuisine) => (
                      <button
                        key={cuisine.id}
                        onClick={() => toggleArrayItem('preferred_cuisines', cuisine.id)}
                        className={`p-3 rounded-lg border transition-all duration-300 text-sm ${
                          data.preferred_cuisines.includes(cuisine.id)
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {cuisine.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Spice Level: {['Mild', 'Light', 'Medium', 'Hot', 'Very Hot'][data.spice_level - 1]}
                  </Label>
                  <Slider
                    value={[data.spice_level]}
                    onValueChange={(value) => updateData('spice_level', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Mild</span>
                    <span>Very Hot</span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Cooking Preferences */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Usual Cooking Time</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {cookingTimes.map((time) => {
                      const IconComponent = time.icon;
                      return (
                        <button
                          key={time.id}
                          onClick={() => updateData('cooking_time_preference', time.id)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                            data.cooking_time_preference === time.id
                              ? 'border-primary bg-primary/10 shadow-lg'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-6 w-6 text-primary" />
                            <span className="font-medium">{time.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Cooking Experience: {['Beginner', 'Learning', 'Intermediate', 'Advanced', 'Expert'][data.skill_level - 1]}
                  </Label>
                  <Slider
                    value={[data.skill_level]}
                    onValueChange={(value) => updateData('skill_level', value[0])}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">Household Size</Label>
                  <div className="flex space-x-3">
                    {[1, 2, 3, 4, 5].map((size) => (
                      <button
                        key={size}
                        onClick={() => updateData('household_size', size)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-300 ${
                          data.household_size === size
                            ? 'border-primary bg-primary text-white'
                            : 'border-border text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {size === 5 ? '5+' : size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Location & Budget */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-base font-semibold">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      value={data.city}
                      onChange={(e) => updateData('city', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-base font-semibold">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter your state"
                      value={data.state}
                      onChange={(e) => updateData('state', e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Budget per meal: ₹{data.budget_per_meal_min} - ₹{data.budget_per_meal_max}
                  </Label>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Minimum: ₹{data.budget_per_meal_min}</Label>
                      <Slider
                        value={[data.budget_per_meal_min]}
                        onValueChange={(value) => updateData('budget_per_meal_min', value[0])}
                        max={500}
                        min={30}
                        step={10}
                        className="w-full mt-2"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Maximum: ₹{data.budget_per_meal_max}</Label>
                      <Slider
                        value={[data.budget_per_meal_max]}
                        onValueChange={(value) => updateData('budget_per_meal_max', value[0])}
                        max={1000}
                        min={data.budget_per_meal_min}
                        step={10}
                        className="w-full mt-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Review Your Profile</h3>
                  <p className="text-muted-foreground">Make sure everything looks good before we create your personalized experience</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Goal & Preferences</h4>
                    <p className="text-muted-foreground">
                      Primary Goal: {goals.find(g => g.id === data.primary_goal)?.label}<br/>
                      Food Type: {foodTypes.find(f => f.id === data.food_type)?.label}<br/>
                      Spice Level: {['Mild', 'Light', 'Medium', 'Hot', 'Very Hot'][data.spice_level - 1]}
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Cooking Style</h4>
                    <p className="text-muted-foreground">
                      Time Preference: {cookingTimes.find(t => t.id === data.cooking_time_preference)?.label}<br/>
                      Skill Level: {['Beginner', 'Learning', 'Intermediate', 'Advanced', 'Expert'][data.skill_level - 1]}<br/>
                      Household Size: {data.household_size === 5 ? '5+' : data.household_size} people
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Location & Budget</h4>
                    <p className="text-muted-foreground">
                      Location: {data.city}, {data.state}<br/>
                      Budget: ₹{data.budget_per_meal_min} - ₹{data.budget_per_meal_max} per meal
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold text-foreground mb-2">Preferred Cuisines</h4>
                    <p className="text-muted-foreground">
                      {data.preferred_cuisines.map(c => 
                        cuisines.find(cuisine => cuisine.id === c)?.label
                      ).join(', ') || 'No preferences selected'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid() || isLoading}
                className="flex items-center space-x-2 bg-gradient-primary text-white hover:shadow-glow"
              >
                <span>{currentStep === totalSteps ? 'Complete Setup' : 'Next'}</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;