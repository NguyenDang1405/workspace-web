import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/app-layout';
import { LoginPage } from '@/features/auth/login-page';
import { RegisterPage } from '@/features/auth/register-page';
import { SplitAuthPage } from '@/features/auth/split-auth-page';
import { ProjectListPage } from '@/features/projects/project-list-page';
import { KanbanPage } from '@/features/kanban/kanban-page';
import { PrVerificationPage } from '@/features/kanban/pr-verification-page';
import { AcademicSubmissionPage } from '@/features/kanban/academic-submission-page';
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
import { DailyStandupPage, MonteCarloPage } from '@/features/analytics';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth?mode=login" replace />;
  }
  return <>{children}</>;
};

export const router = createBrowserRouter([
  // Public / Authentication
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

  // Onboarding Flow (Không có Left Sidebar, chỉ có Top Stepper)
  {
    path: '/onboarding/academic',
    element: <AcademicOnboardingPage />,
  },
  {
    path: '/onboarding/enterprise',
    element: <EnterpriseOnboardingPage />,
  },

  // Admin Portal Layout (Sidebar 260px riêng cho Quản trị viên)
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

  // User Workspace (app-layout.tsx)
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
        element: <Navigate to="/kanban" replace />,
      },

      // Phân hệ 1: Khởi Tạo & Phân Rã AI
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

      // Phân hệ 2 & Nghiệm Thu: Bảng Công Việc (Kanban)
      {
        path: 'kanban',
        element: <KanbanPage />,
      },
      {
        path: 'kanban/pr-review/:prId',
        element: <PrVerificationPage />,
      },
      {
        path: 'kanban/submission/:taskId',
        element: <AcademicSubmissionPage />,
      },
      {
        path: 'projects/demo-1/kanban',
        element: <Navigate to="/kanban" replace />,
      },
      {
        path: 'projects/kanban',
        element: <Navigate to="/kanban" replace />,
      },
      {
        path: 'projects/:projectId/kanban',
        element: <Navigate to="/kanban" replace />,
      },

      // Phân hệ 3: Lịch Biểu Thích Ứng
      {
        path: 'calendar',
        element: <AdaptiveCalendarPage />,
      },
      {
        path: 'calendar/conflicts',
        element: <ConflictMatrixPage />,
      },

      // Phân hệ 4: Đồ Thị Mạng DAG & Gantt
      {
        path: 'dag-gantt',
        element: <DagGanttPage />,
      },

      // Phân hệ 5: Backlog & Yêu Cầu SRS
      {
        path: 'backlog',
        element: <WbsBacklogPage />,
      },
      {
        path: 'backlog-srs',
        element: <Navigate to="/backlog" replace />,
      },
      {
        path: 'backlog/srs-diff',
        element: <SrsDiffPage />,
      },

      // Phân hệ 6: Hồ Sơ Năng Lực & Báo Cáo
      {
        path: 'analytics',
        element: <Navigate to="/analytics/standup" replace />,
      },
      {
        path: 'analytics/standup',
        element: <DailyStandupPage />,
      },
      {
        path: 'analytics/monte-carlo',
        element: <MonteCarloPage />,
      },
      {
        path: 'profile/skill-elo',
        element: <SkillEloPage />,
      },
      {
        path: 'profile',
        element: <Navigate to="/profile/skill-elo" replace />,
      },

      // Khác
      {
        path: 'projects',
        element: <ProjectListPage />,
      },
      {
        path: 'teams',
        element: <TeamListPage />,
      },
    ],
  },

  // Fallback 404
  {
    path: '*',
    element: <Navigate to="/auth?mode=login" replace />,
  },
]);
