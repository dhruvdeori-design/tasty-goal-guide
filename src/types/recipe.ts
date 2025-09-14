export interface Recipe {
  id: string;
  title: string;
  description: string;
  cookingTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
  image?: string;
  category: string[];
  ingredients: string[];
  instructions: string[];
  dietaryInfo: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  ratings: number; // Average rating out of 5
  reviewCount: number;
}

export interface UserPreferences {
  dietaryRestrictions: {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
  };
  favoriteCategories: string[];
  cookingSkillLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredCookingTime: number; // maximum cooking time in minutes
  caloriePreference?: {
    min: number;
    max: number;
  };
}