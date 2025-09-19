-- Fix missing RLS policy for recipe_ingredients table
-- Since recipes are public, recipe ingredients should also be publicly viewable
-- so users can see what ingredients are needed for each recipe
CREATE POLICY "Anyone can view recipe ingredients" 
ON public.recipe_ingredients 
FOR SELECT 
USING (true);