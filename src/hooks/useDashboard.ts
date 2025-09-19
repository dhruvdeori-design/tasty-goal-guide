import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStats, Goal, UserProfile } from '@/types/dashboard';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .single();

      if (error) throw error;
      return profile as UserProfile;
    },
  });
};

export const useGoals = () => {
  return useQuery({
    queryKey: ['goals'],
    queryFn: async () => {
      // Since there's no goals table, return empty array for now
      // This can be implemented later when goals functionality is added
      return [] as Goal[];
    },
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // Since there's no goals table, return default stats for now
      // This can be implemented later when goals functionality is added
      const stats: DashboardStats = {
        totalGoals: 0,
        completedGoals: 0,
        inProgressGoals: 0,
        achievements: 0,
      };

      return stats;
    },
  });
};