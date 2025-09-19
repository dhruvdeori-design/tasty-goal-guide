import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Recipe, UserPreferences } from '@/types/recipe';
import { useAuth } from './useAuth';

// Simple recipe fetch function that works with the actual database schema
export const useRecommendedRecipes = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['recommendedRecipes', user?.id],
    queryFn: async () => {
      // Get user profile to understand preferences
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('dietary_restrictions, preferred_cuisines, cooking_time_preference')
        .eq('id', user?.id)
        .single();

      // Fetch recipes - simplified approach for now
      const { data: recipes, error: recipesError } = await supabase
        .from('recipes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (recipesError) throw recipesError;
      
      // Convert database recipe format to our Recipe type
      const convertedRecipes: Recipe[] = (recipes || []).map(recipe => ({
        id: recipe.id.toString(),
        title: recipe.name,
        description: recipe.description || '',
        image: recipe.image_url,
        cookingTime: recipe.total_time_minutes || 0,
        difficulty: recipe.difficulty_level === 1 ? 'easy' : 
                    recipe.difficulty_level === 2 ? 'medium' : 'hard',
        calories: recipe.calories_per_serving || 0,
        category: recipe.cuisine_type ? [recipe.cuisine_type] : ['other'],
        ingredients: [], // This would need to be populated from recipe_ingredients table
        instructions: Array.isArray(recipe.instructions) ? 
                     recipe.instructions.map(String) : 
                     [recipe.instructions?.toString() || ''],
        dietaryInfo: {
          vegetarian: recipe.dietary_tags?.includes('vegetarian') || false,
          vegan: recipe.dietary_tags?.includes('vegan') || false,
          glutenFree: recipe.dietary_tags?.includes('gluten-free') || false,
          dairyFree: recipe.dietary_tags?.includes('dairy-free') || false,
        },
        ratings: 4.5, // Default rating for now
        reviewCount: 0, // Default review count for now
      }));

      return convertedRecipes;
    },
    enabled: !!user,
  });
};

// Simplified user preferences hook that works with user_profiles
export const useUserPreferences = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['userPreferences', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('dietary_restrictions, preferred_cuisines, cooking_time_preference, skill_level')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      
      // Convert to UserPreferences format
      const preferences: UserPreferences = {
        favoriteCategories: data.preferred_cuisines || [],
        dietaryRestrictions: {
          vegetarian: data.dietary_restrictions?.includes('vegetarian') || false,
          vegan: data.dietary_restrictions?.includes('vegan') || false,
          glutenFree: data.dietary_restrictions?.includes('gluten-free') || false,
          dairyFree: data.dietary_restrictions?.includes('dairy-free') || false,
        },
        preferredCookingTime: data.cooking_time_preference === 'quick' ? 30 : 
                            data.cooking_time_preference === 'medium' ? 60 : 120,
        cookingSkillLevel: data.skill_level === 1 ? 'beginner' :
                          data.skill_level === 2 ? 'intermediate' : 'advanced',
      };
      
      return preferences;
    },
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: async (preferences: Partial<UserPreferences>) => {
      // Convert UserPreferences back to user_profiles format
      const updateData: any = {};
      
      if (preferences.favoriteCategories) {
        updateData.preferred_cuisines = preferences.favoriteCategories;
      }
      
      if (preferences.dietaryRestrictions) {
        const restrictions = [];
        if (preferences.dietaryRestrictions.vegetarian) restrictions.push('vegetarian');
        if (preferences.dietaryRestrictions.vegan) restrictions.push('vegan');
        if (preferences.dietaryRestrictions.glutenFree) restrictions.push('gluten-free');
        if (preferences.dietaryRestrictions.dairyFree) restrictions.push('dairy-free');
        updateData.dietary_restrictions = restrictions;
      }
      
      if (preferences.preferredCookingTime) {
        updateData.cooking_time_preference = 
          preferences.preferredCookingTime <= 30 ? 'quick' :
          preferences.preferredCookingTime <= 60 ? 'medium' : 'long';
      }
      
      if (preferences.cookingSkillLevel) {
        updateData.skill_level = 
          preferences.cookingSkillLevel === 'beginner' ? 1 :
          preferences.cookingSkillLevel === 'intermediate' ? 2 : 3;
      }

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updateData)
        .eq('id', user?.id)
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