-- Fix missing RLS policy for recipe_ingredients table
-- This table contains recipe composition data and should have proper access controls

-- First, ensure RLS is enabled on recipe_ingredients table
ALTER TABLE public.recipe_ingredients ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to recipe ingredients
-- This aligns with recipes being publicly viewable
CREATE POLICY "Anyone can view recipe ingredients" 
ON public.recipe_ingredients 
FOR SELECT 
TO public
USING (true);

-- Restrict modifications to authenticated users only
-- In the future, you may want to restrict this further to recipe creators
CREATE POLICY "Authenticated users can manage recipe ingredients" 
ON public.recipe_ingredients 
FOR ALL 
TO authenticated
USING (true)
WITH CHECK (true);