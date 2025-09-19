-- Drop the existing potentially vulnerable SELECT policy
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;

-- Create a more restrictive SELECT policy that ensures proper authentication
CREATE POLICY "Users can view only their own profile" 
ON public.user_profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

-- Ensure no public access to user profiles for unauthenticated users
-- This policy explicitly denies access to anonymous users
CREATE POLICY "Deny anonymous access to profiles" 
ON public.user_profiles 
FOR ALL 
TO anon
USING (false);