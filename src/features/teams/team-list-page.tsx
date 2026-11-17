import React from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { User } from '@/types/user';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const MOCK_MEMBERS: User[] = [
  {
    id: 'usr-001',
    email: 'alex.frontend@workspace.vn',
    full_name: 'Alex Nguyễn',
    role: 'LEADER',
    department: 'FRONTEND',
    level: 'SENIOR',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux Toolkit'],
    bio_summary: 'Chuyên gia thiết kế kiến trúc Frontend & Tối ưu hiệu năng trải nghiệm người dùng.',
    is_active: true,
  },
  {
    id: 'usr-002',
    email: 'bao.backend@workspace.vn',
    full_name: 'Trần Văn Bảo',
    role: 'LEADER',
    department: 'BACKEND',
    level: 'SENIOR',
    skills: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Redis', 'Docker'],
    bio_summary: 'Xây dựng Microservices và thiết kế CSDL khả năng mở rộng cao.',
    is_active: true,
  },
  {
    id: 'usr-003',
    email: 'chi.devops@workspace.vn',
    full_name: 'Lê Kim Chi',
    role: 'MEMBER',
    department: 'DEVOPS',
    level: 'MIDDLE',
    skills: ['Kubernetes', 'Docker', 'AWS', 'GitHub Actions', 'Terraform'],
    bio_summary: 'Quản lý hạ tầng đám mây và thiết lập tự động hóa CI/CD pipeline.',
    is_active: true,
  },
  {
    id: 'usr-004',
    email: 'dung.fullstack@workspace.vn',
    full_name: 'Phạm Quốc Dũng',
    role: 'PM',
    department: 'FULLSTACK',
    level: 'SENIOR',
    skills: ['React', 'Node.js', 'System Architecture', 'Agile/Scrum'],
    bio_summary: 'Quản lý dự án kỹ thuật và điều phối nguồn lực nhân sự.',
    is_active: true,
  },
  {
    id: 'usr-005',
    email: 'emily.qa@workspace.vn',
    full_name: 'Emily Đỗ',
    role: 'MEMBER',
    department: 'QA',
    level: 'JUNIOR',
    skills: ['Playwright', 'Jest', 'Automation Testing', 'Postman'],
    bio_summary: 'Đảm bảo chất lượng sản phẩm qua kịch bản kiểm thử tự động.',
    is_active: true,
  },
];

const DEPARTMENTS: { code: User['department']; name: string }[] = [
  { code: 'FRONTEND', name: 'Phòng Frontend Development' },
  { code: 'BACKEND', name: 'Phòng Backend Development' },
  { code: 'FULLSTACK', name: 'Phòng Fullstack & Architecture' },
  { code: 'DEVOPS', name: 'Phòng DevOps & Infrastructure' },
  { code: 'QA', name: 'Phòng QA & Automation Test' },
];

export const TeamListPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Sơ Đồ Nhóm & Phòng Ban
        </h1>
        <p className="text-sm text-[#64748B]">
          Danh sách nhân sự và phân bổ năng lực kỹ thuật theo từng phòng ban
        </p>
      </div>

      <div className="space-y-6">
        {DEPARTMENTS.map((dept) => {
          const deptMembers = MOCK_MEMBERS.filter((m) => m.department === dept.code);
          return (
            <Card key={dept.code} className="border-slate-200">
              <CardHeader className="bg-slate-50/70 border-b border-slate-100 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-[#4F46E5] border border-indigo-100">
                      <AppIcons.users size={16} />
                    </div>
                    <CardTitle className="text-base font-bold text-slate-900">
                      {dept.name}
                    </CardTitle>
                  </div>
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                    {deptMembers.length} Thành viên
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-4">
                {deptMembers.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
                    {deptMembers.map((member) => (
                      <div
                        key={member.id}
                        className="rounded-lg border border-slate-200 bg-white p-4 transition-all hover:border-indigo-200 hover:shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4F46E5] font-bold text-white text-sm">
                              {member.full_name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">
                                {member.full_name}
                              </h4>
                              <p className="text-xs text-[#64748B]">{member.email}</p>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200">
                            <AppIcons.verifiedCheck size={12} className="text-emerald-600" /> Active
                          </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2 text-xs">
                          <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 font-semibold text-[#4F46E5] border border-indigo-100">
                            <AppIcons.adminRbac size={12} /> {member.role}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 font-semibold text-[#64748B]">
                            <AppIcons.adminAgent size={12} /> {member.level}
                          </span>
                        </div>

                        <p className="mt-2.5 text-xs text-slate-600 line-clamp-2">
                          {member.bio_summary}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1">
                          {member.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-[#64748B]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xs text-slate-400">
                    Chưa có nhân sự trực thuộc phòng ban này
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default TeamListPage;
