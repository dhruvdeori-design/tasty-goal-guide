export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ingredients: {
        Row: {
          calories_per_100g: number | null
          carbs_per_100g: number | null
          category: string | null
          common_unit: string | null
          created_at: string | null
          fat_per_100g: number | null
          id: number
          name: string
          protein_per_100g: number | null
          seasonal_availability: string[] | null
          shelf_life_days: number | null
          storage_type: string | null
          substitutes: Json | null
          synonyms: string[] | null
        }
        Insert: {
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          category?: string | null
          common_unit?: string | null
          created_at?: string | null
          fat_per_100g?: number | null
          id?: number
          name: string
          protein_per_100g?: number | null
          seasonal_availability?: string[] | null
          shelf_life_days?: number | null
          storage_type?: string | null
          substitutes?: Json | null
          synonyms?: string[] | null
        }
        Update: {
          calories_per_100g?: number | null
          carbs_per_100g?: number | null
          category?: string | null
          common_unit?: string | null
          created_at?: string | null
          fat_per_100g?: number | null
          id?: number
          name?: string
          protein_per_100g?: number | null
          seasonal_availability?: string[] | null
          shelf_life_days?: number | null
          storage_type?: string | null
          substitutes?: Json | null
          synonyms?: string[] | null
        }
        Relationships: []
      }
      recipe_ingredients: {
        Row: {
          id: number
          ingredient_id: number | null
          is_optional: boolean | null
          preparation_note: string | null
          quantity: number
          recipe_id: number | null
          unit: string
        }
        Insert: {
          id?: number
          ingredient_id?: number | null
          is_optional?: boolean | null
          preparation_note?: string | null
          quantity: number
          recipe_id?: number | null
          unit: string
        }
        Update: {
          id?: number
          ingredient_id?: number | null
          is_optional?: boolean | null
          preparation_note?: string | null
          quantity?: number
          recipe_id?: number | null
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          calories_per_serving: number | null
          carbs_per_serving: number | null
          cook_time_minutes: number | null
          created_at: string | null
          created_by: string | null
          cuisine_type: string | null
          description: string | null
          dietary_tags: string[] | null
          difficulty_level: number | null
          fat_per_serving: number | null
          fiber_per_serving: number | null
          id: number
          image_url: string | null
          instructions: Json | null
          is_verified: boolean | null
          meal_type: string[] | null
          name: string
          prep_time_minutes: number | null
          protein_per_serving: number | null
          servings: number | null
          source_url: string | null
          spice_level: number | null
          suitable_for_goals: string[] | null
          total_time_minutes: number | null
          video_url: string | null
        }
        Insert: {
          calories_per_serving?: number | null
          carbs_per_serving?: number | null
          cook_time_minutes?: number | null
          created_at?: string | null
          created_by?: string | null
          cuisine_type?: string | null
          description?: string | null
          dietary_tags?: string[] | null
          difficulty_level?: number | null
          fat_per_serving?: number | null
          fiber_per_serving?: number | null
          id?: number
          image_url?: string | null
          instructions?: Json | null
          is_verified?: boolean | null
          meal_type?: string[] | null
          name: string
          prep_time_minutes?: number | null
          protein_per_serving?: number | null
          servings?: number | null
          source_url?: string | null
          spice_level?: number | null
          suitable_for_goals?: string[] | null
          total_time_minutes?: number | null
          video_url?: string | null
        }
        Update: {
          calories_per_serving?: number | null
          carbs_per_serving?: number | null
          cook_time_minutes?: number | null
          created_at?: string | null
          created_by?: string | null
          cuisine_type?: string | null
          description?: string | null
          dietary_tags?: string[] | null
          difficulty_level?: number | null
          fat_per_serving?: number | null
          fiber_per_serving?: number | null
          id?: number
          image_url?: string | null
          instructions?: Json | null
          is_verified?: boolean | null
          meal_type?: string[] | null
          name?: string
          prep_time_minutes?: number | null
          protein_per_serving?: number | null
          servings?: number | null
          source_url?: string | null
          spice_level?: number | null
          suitable_for_goals?: string[] | null
          total_time_minutes?: number | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recipes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_list_items: {
        Row: {
          actual_price_paid: number | null
          added_at: string | null
          estimated_price: number | null
          id: number
          ingredient_id: number | null
          is_purchased: boolean | null
          purchased_at: string | null
          quantity: number
          shopping_list_id: number | null
          unit: string
          vendor_id: number | null
        }
        Insert: {
          actual_price_paid?: number | null
          added_at?: string | null
          estimated_price?: number | null
          id?: number
          ingredient_id?: number | null
          is_purchased?: boolean | null
          purchased_at?: string | null
          quantity: number
          shopping_list_id?: number | null
          unit: string
          vendor_id?: number | null
        }
        Update: {
          actual_price_paid?: number | null
          added_at?: string | null
          estimated_price?: number | null
          id?: number
          ingredient_id?: number | null
          is_purchased?: boolean | null
          purchased_at?: string | null
          quantity?: number
          shopping_list_id?: number | null
          unit?: string
          vendor_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_list_items_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_items_shopping_list_id_fkey"
            columns: ["shopping_list_id"]
            isOneToOne: false
            referencedRelation: "shopping_lists"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_list_items_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      shopping_lists: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: number
          is_completed: boolean | null
          name: string | null
          recipe_ids: number[] | null
          user_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          is_completed?: boolean | null
          name?: string | null
          recipe_ids?: number[] | null
          user_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: number
          is_completed?: boolean | null
          name?: string | null
          recipe_ids?: number[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_lists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_goal_progress: {
        Row: {
          achievements: string[] | null
          created_at: string | null
          date: string
          goal_adherence_percentage: number | null
          id: number
          recipes_cooked_count: number | null
          total_calories: number | null
          total_carbs: number | null
          total_fat: number | null
          total_protein: number | null
          user_id: string | null
        }
        Insert: {
          achievements?: string[] | null
          created_at?: string | null
          date: string
          goal_adherence_percentage?: number | null
          id?: number
          recipes_cooked_count?: number | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          user_id?: string | null
        }
        Update: {
          achievements?: string[] | null
          created_at?: string | null
          date?: string
          goal_adherence_percentage?: number | null
          id?: number
          recipes_cooked_count?: number | null
          total_calories?: number | null
          total_carbs?: number | null
          total_fat?: number | null
          total_protein?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_goal_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_pantry: {
        Row: {
          added_at: string | null
          cost_paid: number | null
          expiry_date: string | null
          id: number
          ingredient_id: number | null
          purchase_date: string | null
          quantity: number | null
          unit: string | null
          user_id: string | null
        }
        Insert: {
          added_at?: string | null
          cost_paid?: number | null
          expiry_date?: string | null
          id?: number
          ingredient_id?: number | null
          purchase_date?: string | null
          quantity?: number | null
          unit?: string | null
          user_id?: string | null
        }
        Update: {
          added_at?: string | null
          cost_paid?: number | null
          expiry_date?: string | null
          id?: number
          ingredient_id?: number | null
          purchase_date?: string | null
          quantity?: number | null
          unit?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_pantry_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_pantry_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          allergies: string[] | null
          budget_per_meal_max: number | null
          budget_per_meal_min: number | null
          city: string | null
          cooking_time_preference: string | null
          created_at: string | null
          dietary_restrictions: string[] | null
          email: string
          food_type: string | null
          full_name: string | null
          household_size: number | null
          id: string
          phone_number: string | null
          preferred_cuisines: string[] | null
          primary_goal: string | null
          skill_level: number | null
          spice_level: number | null
          state: string | null
          target_calories: number | null
          target_protein: number | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string[] | null
          budget_per_meal_max?: number | null
          budget_per_meal_min?: number | null
          city?: string | null
          cooking_time_preference?: string | null
          created_at?: string | null
          dietary_restrictions?: string[] | null
          email: string
          food_type?: string | null
          full_name?: string | null
          household_size?: number | null
          id: string
          phone_number?: string | null
          preferred_cuisines?: string[] | null
          primary_goal?: string | null
          skill_level?: number | null
          spice_level?: number | null
          state?: string | null
          target_calories?: number | null
          target_protein?: number | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string[] | null
          budget_per_meal_max?: number | null
          budget_per_meal_min?: number | null
          city?: string | null
          cooking_time_preference?: string | null
          created_at?: string | null
          dietary_restrictions?: string[] | null
          email?: string
          food_type?: string | null
          full_name?: string | null
          household_size?: number | null
          id?: string
          phone_number?: string | null
          preferred_cuisines?: string[] | null
          primary_goal?: string | null
          skill_level?: number | null
          spice_level?: number | null
          state?: string | null
          target_calories?: number | null
          target_protein?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_recipe_interactions: {
        Row: {
          actual_cooking_time_minutes: number | null
          actual_difficulty_rating: number | null
          id: number
          ingredient_substitutions: Json | null
          interaction_date: string | null
          interaction_type: string | null
          rating: number | null
          recipe_id: number | null
          review: string | null
          user_id: string | null
          would_cook_again: boolean | null
        }
        Insert: {
          actual_cooking_time_minutes?: number | null
          actual_difficulty_rating?: number | null
          id?: number
          ingredient_substitutions?: Json | null
          interaction_date?: string | null
          interaction_type?: string | null
          rating?: number | null
          recipe_id?: number | null
          review?: string | null
          user_id?: string | null
          would_cook_again?: boolean | null
        }
        Update: {
          actual_cooking_time_minutes?: number | null
          actual_difficulty_rating?: number | null
          id?: number
          ingredient_substitutions?: Json | null
          interaction_date?: string | null
          interaction_type?: string | null
          rating?: number | null
          recipe_id?: number | null
          review?: string | null
          user_id?: string | null
          would_cook_again?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_recipe_interactions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_recipe_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_inventory: {
        Row: {
          discount_percentage: number | null
          estimated_delivery_time_hours: number | null
          id: number
          ingredient_id: number | null
          is_available: boolean | null
          last_updated: string | null
          max_order_quantity: number | null
          min_order_quantity: number | null
          price_per_unit: number
          stock_quantity: number | null
          unit: string
          vendor_id: number | null
        }
        Insert: {
          discount_percentage?: number | null
          estimated_delivery_time_hours?: number | null
          id?: number
          ingredient_id?: number | null
          is_available?: boolean | null
          last_updated?: string | null
          max_order_quantity?: number | null
          min_order_quantity?: number | null
          price_per_unit: number
          stock_quantity?: number | null
          unit: string
          vendor_id?: number | null
        }
        Update: {
          discount_percentage?: number | null
          estimated_delivery_time_hours?: number | null
          id?: number
          ingredient_id?: number | null
          is_available?: boolean | null
          last_updated?: string | null
          max_order_quantity?: number | null
          min_order_quantity?: number | null
          price_per_unit?: number
          stock_quantity?: number | null
          unit?: string
          vendor_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vendor_inventory_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_inventory_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          api_endpoint: string | null
          city: string | null
          created_at: string | null
          delivery_available: boolean | null
          delivery_fee: number | null
          external_app_deep_link: string | null
          external_app_name: string | null
          id: number
          is_active: boolean | null
          min_order_amount: number | null
          name: string
          ondc_participant_id: string | null
          operating_hours: Json | null
          phone: string | null
          type: string | null
        }
        Insert: {
          address?: string | null
          api_endpoint?: string | null
          city?: string | null
          created_at?: string | null
          delivery_available?: boolean | null
          delivery_fee?: number | null
          external_app_deep_link?: string | null
          external_app_name?: string | null
          id?: number
          is_active?: boolean | null
          min_order_amount?: number | null
          name: string
          ondc_participant_id?: string | null
          operating_hours?: Json | null
          phone?: string | null
          type?: string | null
        }
        Update: {
          address?: string | null
          api_endpoint?: string | null
          city?: string | null
          created_at?: string | null
          delivery_available?: boolean | null
          delivery_fee?: number | null
          external_app_deep_link?: string | null
          external_app_name?: string | null
          id?: number
          is_active?: boolean | null
          min_order_amount?: number | null
          name?: string
          ondc_participant_id?: string | null
          operating_hours?: Json | null
          phone?: string | null
          type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
