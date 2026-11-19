import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { LoginPage } from '@/features/auth/login-page';
import { RegisterPage } from '@/features/auth/register-page';
import { SplitAuthPage } from '@/features/auth/split-auth-page';
import { ProjectListPage } from '@/features/projects/project-list-page';
import { KanbanPage } from '@/features/kanban/kanban-page';
import { DagGanttPage } from '@/features/dag-gantt/dag-gantt-page';
import { AdaptiveCalendarPage } from '@/features/calendar/adaptive-calendar-page';
import { ConflictMatrixPage } from '@/features/calendar/conflict-matrix-page';
import { WbsBacklogPage } from '@/features/backlog/wbs-backlog-page';
import { SrsDiffPage } from '@/features/backlog/srs-diff-page';
import { TeamListPage } from '@/features/teams/team-list-page';
import { ProfilePage } from '@/features/profile/profile-page';
import { AcademicOnboardingPage } from '@/features/onboarding/academic-onboarding-page';
import { EnterpriseOnboardingPage } from '@/features/onboarding/enterprise-onboarding-page';
import { SkillEloPage } from '@/features/profile/skill-elo-page';
import { AdminLayout } from '@/components/layout/admin-layout';
import { PulsePage } from '@/features/admin/pulse-page';
import { RbacPage } from '@/features/admin/rbac-page';
import { OrganizationsPage } from '@/features/admin/organizations-page';
import { AuditLogPage } from '@/features/admin/audit-log-page';
import { RagConfigPage } from '@/features/admin/rag-config-page';
import { MultiAgentPage } from '@/features/admin/multi-agent-page';
import {
  DocumentIngestionPage,
  TraceabilityInspectorPage,
  ProcessingMatrixPage,
  DispatchMatrixPage,
  PersonalRoadmapPage,
} from '@/features/ai-decompose';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    localStorage.setItem('token', 'demo-jwt-token-smart-workspace');
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
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/pulse" replace />,
      },
      {
        path: 'pulse',
        element: <PulsePage />,
      },
      {
        path: 'rbac',
        element: <RbacPage />,
      },
      {
        path: 'organizations',
        element: <OrganizationsPage />,
      },
      {
        path: 'audit-log',
        element: <AuditLogPage />,
      },
      {
        path: 'rag-config',
        element: <RagConfigPage />,
      },
      {
        path: 'multi-agent',
        element: <MultiAgentPage />,
      },
    ],
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
        path: 'ai-decompose',
        element: <Navigate to="/ai-decompose/ingest" replace />,
      },
      {
        path: 'ai-decompose/ingest',
        element: <DocumentIngestionPage />,
      },
      {
        path: 'ai-decompose/traceability',
        element: <TraceabilityInspectorPage />,
      },
      {
        path: 'ai-decompose/processing',
        element: <ProcessingMatrixPage />,
      },
      {
        path: 'ai-decompose/dispatch',
        element: <DispatchMatrixPage />,
      },
      {
        path: 'ai-decompose/personal-roadmap',
        element: <PersonalRoadmapPage />,
      },
      {
        path: 'kanban',
        element: <KanbanPage />,
      },
      {
        path: 'projects/demo-1/kanban',
        element: <KanbanPage />,
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
        path: 'dag-gantt',
        element: <DagGanttPage />,
      },
      {
        path: 'calendar',
        element: <AdaptiveCalendarPage />,
      },
      {
        path: 'calendar/conflicts',
        element: <ConflictMatrixPage />,
      },
      {
        path: 'backlog',
        element: <WbsBacklogPage />,
      },
      {
        path: 'backlog-srs',
        element: <WbsBacklogPage />,
      },
      {
        path: 'backlog/srs-diff',
        element: <SrsDiffPage />,
      },
      {
        path: 'projects',
        element: <ProjectListPage />,
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
