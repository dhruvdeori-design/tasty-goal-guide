-- Users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone_number TEXT,
    
    -- Fitness Goals
    primary_goal TEXT CHECK (primary_goal IN ('weight_loss', 'muscle_building', 'healthy_living', 'quick_meals', 'family_cooking')),
    target_calories INTEGER,
    target_protein INTEGER,
    
    -- Dietary Preferences  
    food_type TEXT CHECK (food_type IN ('vegetarian', 'non_vegetarian', 'vegan')),
    dietary_restrictions TEXT[], -- ['jain', 'keto', 'gluten_free']
    allergies TEXT[], -- ['nuts', 'dairy', 'shellfish']
    preferred_cuisines TEXT[], -- ['north_indian', 'south_indian', 'continental']
    spice_level INTEGER CHECK (spice_level BETWEEN 1 AND 5),
    
    -- Cooking Preferences
    cooking_time_preference TEXT CHECK (cooking_time_preference IN ('quick', 'moderate', 'elaborate', 'variable')),
    skill_level INTEGER CHECK (skill_level BETWEEN 1 AND 5),
    household_size INTEGER,
    budget_per_meal_min INTEGER,
    budget_per_meal_max INTEGER,
    
    -- Location
    city TEXT,
    state TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    cuisine_type TEXT,
    meal_type TEXT[], -- ['breakfast', 'lunch', 'dinner', 'snack']
    
    -- Timing
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    total_time_minutes INTEGER,
    
    -- Difficulty & Serving
    difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5),
    servings INTEGER,
    
    -- Goal-based categorization
    suitable_for_goals TEXT[], -- ['weight_loss', 'muscle_building']
    
    -- Instructions & Media
    instructions JSONB, -- [{"step": 1, "instruction": "...", "time_minutes": 5}]
    image_url TEXT,
    video_url TEXT,
    
    -- Nutrition (per serving)
    calories_per_serving INTEGER,
    protein_per_serving DECIMAL,
    carbs_per_serving DECIMAL,
    fat_per_serving DECIMAL,
    fiber_per_serving DECIMAL,
    
    -- Dietary Tags
    dietary_tags TEXT[], -- ['vegetarian', 'vegan', 'gluten_free', 'keto']
    spice_level INTEGER CHECK (spice_level BETWEEN 1 AND 5),
    
    -- Meta
    source_url TEXT,
    created_by UUID REFERENCES user_profiles(id),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ingredients master table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT, -- 'vegetables', 'spices', 'dairy', 'grains'
    common_unit TEXT, -- 'grams', 'cups', 'pieces'
    
    -- Normalization
    synonyms TEXT[], -- ['tomato', 'tamatar', 'टमाटर']
    substitutes JSONB, -- [{"ingredient_id": 123, "ratio": 1.5, "note": "use 1.5x quantity"}]
    
    -- Nutrition per 100g
    calories_per_100g INTEGER,
    protein_per_100g DECIMAL,
    carbs_per_100g DECIMAL,
    fat_per_100g DECIMAL,
    
    -- Storage & Availability
    shelf_life_days INTEGER,
    storage_type TEXT, -- 'refrigerated', 'room_temperature', 'frozen'
    seasonal_availability TEXT[], -- ['winter', 'summer', 'monsoon', 'year_round']
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recipe-Ingredient junction table
CREATE TABLE recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
    
    quantity DECIMAL NOT NULL,
    unit TEXT NOT NULL,
    is_optional BOOLEAN DEFAULT FALSE,
    preparation_note TEXT, -- 'finely chopped', 'grated'
    
    UNIQUE(recipe_id, ingredient_id)
);

-- User pantry (ingredients they have)
CREATE TABLE user_pantry (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
    
    quantity DECIMAL,
    unit TEXT,
    expiry_date DATE,
    purchase_date DATE,
    cost_paid DECIMAL,
    
    added_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, ingredient_id)
);

-- Vendor/Store information
CREATE TABLE vendors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT, -- 'online', 'local_store', 'supermarket'
    
    -- Contact & Location
    phone TEXT,
    address TEXT,
    city TEXT,
    
    -- Integration
    api_endpoint TEXT,
    ondc_participant_id TEXT,
    external_app_name TEXT, -- 'BigBasket', 'Zomato', 'Blinkit'
    external_app_deep_link TEXT,
    
    -- Operational
    delivery_available BOOLEAN DEFAULT FALSE,
    min_order_amount INTEGER,
    delivery_fee INTEGER,
    operating_hours JSONB, -- {"monday": {"open": "09:00", "close": "22:00"}}
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-time ingredient availability & pricing
CREATE TABLE vendor_inventory (
    id SERIAL PRIMARY KEY,
    vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
    
    -- Availability & Pricing
    is_available BOOLEAN DEFAULT TRUE,
    price_per_unit DECIMAL NOT NULL,
    unit TEXT NOT NULL,
    discount_percentage INTEGER DEFAULT 0,
    
    -- Stock
    stock_quantity INTEGER,
    min_order_quantity INTEGER DEFAULT 1,
    max_order_quantity INTEGER,
    
    -- Delivery
    estimated_delivery_time_hours INTEGER,
    
    last_updated TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(vendor_id, ingredient_id)
);

-- User recipe interactions (for ML)
CREATE TABLE user_recipe_interactions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    
    -- Interaction Types
    interaction_type TEXT CHECK (interaction_type IN ('viewed', 'saved', 'cooked', 'rated', 'shared')),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    review TEXT,
    
    -- Cooking Feedback
    actual_cooking_time_minutes INTEGER,
    actual_difficulty_rating INTEGER CHECK (actual_difficulty_rating BETWEEN 1 AND 5),
    would_cook_again BOOLEAN,
    ingredient_substitutions JSONB, -- what substitutions were made
    
    interaction_date TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, recipe_id, interaction_type)
);

-- Shopping lists
CREATE TABLE shopping_lists (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    name TEXT DEFAULT 'My Shopping List',
    
    -- Recipe association
    recipe_ids INTEGER[], -- recipes this shopping list is for
    
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

-- Shopping list items
CREATE TABLE shopping_list_items (
    id SERIAL PRIMARY KEY,
    shopping_list_id INTEGER REFERENCES shopping_lists(id) ON DELETE CASCADE,
    ingredient_id INTEGER REFERENCES ingredients(id),
    
    quantity DECIMAL NOT NULL,
    unit TEXT NOT NULL,
    estimated_price DECIMAL,
    
    -- Purchase tracking
    is_purchased BOOLEAN DEFAULT FALSE,
    actual_price_paid DECIMAL,
    vendor_id INTEGER REFERENCES vendors(id),
    purchased_at TIMESTAMPTZ,
    
    added_at TIMESTAMPTZ DEFAULT NOW()
);

-- Goal tracking
CREATE TABLE user_goal_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    
    -- Daily tracking
    date DATE NOT NULL,
    total_calories DECIMAL DEFAULT 0,
    total_protein DECIMAL DEFAULT 0,
    total_carbs DECIMAL DEFAULT 0,
    total_fat DECIMAL DEFAULT 0,
    
    -- Goals progress
    recipes_cooked_count INTEGER DEFAULT 0,
    goal_adherence_percentage DECIMAL, -- how well did they stick to their goal
    
    -- Achievements
    achievements TEXT[], -- ['first_week_complete', 'protein_goal_met']
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Indexes for performance
CREATE INDEX idx_recipes_goal ON recipes USING GIN(suitable_for_goals);
CREATE INDEX idx_recipes_dietary ON recipes USING GIN(dietary_tags);
CREATE INDEX idx_recipes_cuisine ON recipes(cuisine_type);
CREATE INDEX idx_vendor_inventory_ingredient ON vendor_inventory(ingredient_id);
CREATE INDEX idx_vendor_inventory_vendor ON vendor_inventory(vendor_id);
CREATE INDEX idx_user_pantry_user ON user_pantry(user_id);
CREATE INDEX idx_user_interactions_user_recipe ON user_recipe_interactions(user_id, recipe_id);

-- Row Level Security Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_pantry ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_recipe_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goal_progress ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own pantry" ON user_pantry FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own interactions" ON user_recipe_interactions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own shopping lists" ON shopping_lists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can view own shopping list items" ON shopping_list_items FOR ALL USING (auth.uid() = (SELECT user_id FROM shopping_lists WHERE id = shopping_list_id));
CREATE POLICY "Users can view own goal progress" ON user_goal_progress FOR ALL USING (auth.uid() = user_id);

-- Public read access for recipes, ingredients, vendors
CREATE POLICY "Anyone can view recipes" ON recipes FOR SELECT USING (true);
CREATE POLICY "Anyone can view ingredients" ON ingredients FOR SELECT USING (true);
CREATE POLICY "Anyone can view vendors" ON vendors FOR SELECT USING (true);
CREATE POLICY "Anyone can view vendor inventory" ON vendor_inventory FOR SELECT USING (true);

-- Trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at 
    BEFORE UPDATE ON user_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();