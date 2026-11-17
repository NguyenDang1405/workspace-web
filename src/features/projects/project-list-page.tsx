import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj-001',
    name: 'Smart Workspace Web Engine',
    description: 'Hệ thống điều phối công việc thông minh tích hợp AI Scheduler, Kanban Board và Real-time Metrics.',
    created_by: 'PM Lead',
    required_skills: ['React', 'TypeScript', 'TailwindCSS', 'TanStack Query', 'Axios'],
    status: 'IN_PROGRESS',
    created_at: '2026-09-01',
  },
  {
    id: 'proj-002',
    name: 'Microservice API Gateway',
    description: 'Xây dựng core backend API quản lý tasks, authentication, và phân công nguồn lực tự động.',
    created_by: 'Tech Leader',
    required_skills: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Docker'],
    status: 'IN_PROGRESS',
    created_at: '2026-08-20',
  },
  {
    id: 'proj-003',
    name: 'AI Resource Optimization Model',
    description: 'Mô hình học máy tối ưu hóa thời gian phân công dự án và cân bằng tải công việc giữa các lập trình viên.',
    created_by: 'AI Specialist',
    required_skills: ['Python', 'FastAPI', 'PyTorch', 'Scikit-learn'],
    status: 'PLANNING',
    created_at: '2026-09-10',
  },
  {
    id: 'proj-004',
    name: 'Mobile Task Tracker App',
    description: 'Ứng dụng di động theo dõi tiến độ công việc tức thì cho nhân viên field work và khách hàng.',
    created_by: 'Mobile Team Leader',
    required_skills: ['React Native', 'TypeScript', 'Redux Toolkit'],
    status: 'COMPLETED',
    created_at: '2026-06-15',
  },
];

const getStatusBadge = (status: Project['status']) => {
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
          <AppIcons.clock size={13} /> Đang Thực Hiện
        </span>
      );
    case 'PLANNING':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
          <AppIcons.criticalAlert size={13} className="text-amber-600" /> Đang Lập Kế Hoạch
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
          <AppIcons.verifiedCheck size={13} className="text-emerald-600" /> Hoàn Thành
        </span>
      );
    default:
      return null;
  }
};

export const ProjectListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Danh Sách Dự Án</h1>
          <p className="text-sm text-[#64748B]">
            Quản lý các dự án đang triển khai và điều phối nguồn lực
          </p>
        </div>
        <Button className="gap-2 self-start sm:self-auto bg-[#4F46E5] hover:bg-indigo-700 text-xs">
          <AppIcons.plus size={15} />
          <span>Tạo Dự Án Mới</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        {MOCK_PROJECTS.map((project) => (
          <Card key={project.id} className="flex flex-col justify-between hover:border-indigo-300">
            <CardHeader>
              <div className="flex items-start justify-between gap-3 mb-2">
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-[#4F46E5]">
                  {project.name}
                </CardTitle>
                {getStatusBadge(project.status)}
              </div>
              <CardDescription className="line-clamp-2 text-slate-600">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#64748B]">
                  <AppIcons.navBacklogSrs size={14} />
                  <span>Kỹ năng & Công nghệ yêu cầu:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.required_skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-[#64748B]">
              <div>
                <span>Người tạo: </span>
                <span className="font-semibold text-slate-700">{project.created_by}</span>
              </div>

              <Button
                size="sm"
                onClick={() => navigate(`/projects/${project.id}/kanban`)}
                className="gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-xs"
              >
                <AppIcons.navKanban size={14} />
                <span>Mở Kanban</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectListPage;
