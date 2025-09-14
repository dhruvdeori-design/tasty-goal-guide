import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DashboardStats, Goal, UserProfile } from '@/types/dashboard';

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const { data: profile, error } = await supabase
        .from('profiles')
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
      const { data: goals, error } = await supabase
        .from('goals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return goals as Goal[];
    },
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      const { data: goals, error } = await supabase
        .from('goals')
        .select('status');

      if (error) throw error;

      const stats: DashboardStats = {
        totalGoals: goals.length,
        completedGoals: goals.filter(g => g.status === 'completed').length,
        inProgressGoals: goals.filter(g => g.status === 'in_progress').length,
        achievements: Math.floor(goals.filter(g => g.status === 'completed').length / 5), // Every 5 completed goals = 1 achievement
      };

      return stats;
    },
  });
};