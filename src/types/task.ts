export type TaskStatus = 'SCHEDULED' | 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TaskChecklistItem {
  step_id: number;
  text: string;
  is_completed: boolean;
}

export interface Task {
  id: string;
  project_id: string;
  parent_task_id?: string;
  assigned_to?: string;
  assigned_user_name?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  required_level?: string;
  scheduled_date?: string;
  checklist?: TaskChecklistItem[];
  created_at: string;
}
