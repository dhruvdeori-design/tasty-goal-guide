export interface UserProfile {
  id: string;
  created_at: string;
  full_name: string;
  avatar_url?: string;
  email: string;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    notifications?: boolean;
  };
}

export interface DashboardStats {
  totalGoals: number;
  completedGoals: number;
  inProgressGoals: number;
  achievements: number;
}

export interface Goal {
  id: string;
  created_at: string;
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  due_date?: string;
  category: string;
  user_id: string;
}