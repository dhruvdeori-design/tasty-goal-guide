import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface GoalCardProps {
  title: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate?: string;
  category: string;
}

export function GoalCard({ title, description, status, dueDate, category }: GoalCardProps) {
  const statusColors = {
    not_started: 'bg-gray-200',
    in_progress: 'bg-blue-200',
    completed: 'bg-green-200',
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs ${statusColors[status]}`}>
            {status.replace('_', ' ')}
          </span>
        </div>
        <CardDescription>{category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
        {dueDate && (
          <p className="text-xs text-muted-foreground mt-2">
            Due by: {new Date(dueDate).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
}