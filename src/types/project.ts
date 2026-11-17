export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED';

export type ProjectComplexity = 'EASY' | 'MEDIUM' | 'HARD';

export interface Project {
  id: string;
  name: string;
  description: string;
  assigned_team_id?: string;
  created_by: string;
  required_skills: string[];
  status: ProjectStatus;
  created_at: string;
}
