import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { LoginPage } from '@/features/auth/login-page';
import { RegisterPage } from '@/features/auth/register-page';
import { SplitAuthPage } from '@/features/auth/split-auth-page';
import { ProjectListPage } from '@/features/projects/project-list-page';
import { KanbanPage } from '@/features/projects/kanban-page';
import { TeamListPage } from '@/features/teams/team-list-page';
import { ProfilePage } from '@/features/profile/profile-page';
import { AcademicOnboardingPage } from '@/features/onboarding/academic-onboarding-page';
import { EnterpriseOnboardingPage } from '@/features/onboarding/enterprise-onboarding-page';
import { SkillEloPage } from '@/features/profile/skill-elo-page';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <SplitAuthPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/onboarding/academic',
    element: <AcademicOnboardingPage />,
  },
  {
    path: '/onboarding/enterprise',
    element: <EnterpriseOnboardingPage />,
  },
  {
    path: '/profile/skill-elo',
    element: <SkillEloPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/projects/demo-1/kanban" replace />,
      },
      {
        path: 'projects',
        element: <ProjectListPage />,
      },
      {
        path: 'projects/kanban',
        element: <KanbanPage />,
      },
      {
        path: 'projects/:projectId/kanban',
        element: <KanbanPage />,
      },
      {
        path: 'teams',
        element: <TeamListPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'profile/skill-elo',
        element: <SkillEloPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]);
