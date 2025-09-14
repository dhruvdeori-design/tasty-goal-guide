import { useAuth } from '@/hooks/useAuth';
import { useDashboardStats, useGoals, useUserProfile } from '@/hooks/useDashboard';
import { useRecommendedRecipes, useUserPreferences } from '@/hooks/useRecipes';
import { StatCard, GoalCard } from '@/components/dashboard/cards';
import { RecipeCard } from '@/components/dashboard/recipe-card';
import { Target, Trophy, Clock, Star, ChefHat } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile, isLoading: profileLoading, error: profileError } = useUserProfile();
  const { data: stats, isLoading: statsLoading, error: statsError } = useDashboardStats();
  const { data: goals, isLoading: goalsLoading, error: goalsError } = useGoals();

  if (profileError || statsError || goalsError) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <AlertDescription>
            There was an error loading the dashboard. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const renderStats = () => {
    if (statsLoading) {
      return Array(4).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-[120px] w-full" />
      ));
    }

    return stats && (
      <>
        <StatCard
          title="Total Goals"
          value={stats.totalGoals}
          icon={<Target className="h-4 w-4" />}
        />
        <StatCard
          title="Completed"
          value={stats.completedGoals}
          icon={<Trophy className="h-4 w-4" />}
        />
        <StatCard
          title="In Progress"
          value={stats.inProgressGoals}
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Achievements"
          value={stats.achievements}
          icon={<Star className="h-4 w-4" />}
        />
      </>
    );
  };

  const renderGoals = () => {
    if (goalsLoading) {
      return Array(3).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-[200px] w-full" />
      ));
    }

    return goals?.slice(0, 3).map((goal) => (
      <GoalCard
        key={goal.id}
        title={goal.title}
        description={goal.description}
        status={goal.status}
        dueDate={goal.due_date}
        category={goal.category}
      />
    ));
  };

  const { data: recipes, isLoading: recipesLoading, error: recipesError } = useRecommendedRecipes();

  const renderRecipes = () => {
    if (recipesLoading) {
      return Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} className="h-[300px] w-full" />
      ));
    }

    if (recipesError) {
      return (
        <Alert variant="destructive" className="col-span-full">
          <AlertDescription>
            Failed to load recommended recipes. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    return recipes?.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {profileLoading ? (
          <Skeleton className="h-8 w-[200px] inline-block" />
        ) : (
          profile?.full_name || user?.email
        )}
      </h1>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {renderStats()}
      </div>

      {/* Recommended Recipes */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended Recipes</h2>
          <ChefHat className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renderRecipes()}
        </div>
      </div>

      {/* Recent Goals */}
      <h2 className="text-xl font-semibold mb-4">Recent Goals</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {renderGoals()}
      </div>
    </div>
  );
}