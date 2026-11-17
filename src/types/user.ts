export type UserRole = 'ADMIN' | 'PM' | 'LEADER' | 'MEMBER';

export type Department = 'FRONTEND' | 'BACKEND' | 'DEVOPS' | 'QA' | 'FULLSTACK';

export type SeniorityLevel = 'INTERN' | 'FRESHER' | 'JUNIOR' | 'MIDDLE' | 'SENIOR';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  department: Department;
  level: SeniorityLevel;
  skills: string[];
  bio_summary?: string;
  is_active: boolean;
}
