import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Recipe, UserPreferences } from '@/types/recipe';
import { useAuth } from './useAuth';

export const useRecommendedRecipes = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['recommendedRecipes', user?.id],
    queryFn: async () => {
      // First get user preferences
      const { data: preferences, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (preferencesError) throw preferencesError;

      // Then fetch recipes matching preferences
      const { data: recipes, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .contains('category', preferences.favoriteCategories)
        .eq(preferences.dietaryRestrictions.vegetarian ? 'dietaryInfo->>vegetarian' : '', true)
        .eq(preferences.dietaryRestrictions.vegan ? 'dietaryInfo->>vegan' : '', true)
        .eq(preferences.dietaryRestrictions.glutenFree ? 'dietaryInfo->>glutenFree' : '', true)
        .eq(preferences.dietaryRestrictions.dairyFree ? 'dietaryInfo->>dairyFree' : '', true)
        .lte('cookingTime', preferences.preferredCookingTime)
        .order('ratings', { ascending: false })
        .limit(6);

      if (recipesError) throw recipesError;
      return recipes as Recipe[];
    },
    enabled: !!user,
  });
};

export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['userPreferences', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) throw error;
      return data as UserPreferences;
    },
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async (preferences: Partial<UserPreferences>) => {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user?.id,
          ...preferences,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userPreferences', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['recommendedRecipes', user?.id] });
    },
  });

  return {
    ...query,
    updatePreferences: mutation.mutate,
  };
};