import React from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { User } from '@/types/user';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const CURRENT_USER: User = {
  id: 'usr-senior-01',
  email: 'alex.frontend@workspace.vn',
  full_name: 'Alex Nguyễn',
  role: 'LEADER',
  department: 'FRONTEND',
  level: 'SENIOR',
  skills: [
    'React 18',
    'Vite',
    'TypeScript',
    'Tailwind CSS',
    'TanStack Query',
    'React Router v6',
    'State Management',
    'Web Accessibility',
  ],
  bio_summary:
    'Senior Frontend Engineer với 6+ năm kinh nghiệm phát triển các ứng dụng web phức tạp. Đam mê tối ưu hóa hiệu năng, xây dựng Design System và tích hợp các giải pháp AI vào công cụ quản lý dự án.',
  is_active: true,
};

export const ProfilePage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header Banner Card */}
      <Card className="overflow-hidden border-slate-200">
        <div className="h-32 bg-gradient-to-r from-[#4F46E5] via-indigo-700 to-[#06B6D4]" />
        <CardContent className="relative px-6 pb-6 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 mb-4">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-1 shadow-lg">
                <div className="flex h-full w-full items-center justify-center rounded-xl bg-[#4F46E5] font-bold text-white text-3xl">
                  {CURRENT_USER.full_name.charAt(0)}
                </div>
              </div>
              <div className="mb-1">
                <h1 className="text-2xl font-bold text-slate-900">{CURRENT_USER.full_name}</h1>
                <p className="flex items-center gap-1.5 text-sm text-[#64748B]">
                  <AppIcons.mail size={15} className="text-[#64748B]" />
                  <span>{CURRENT_USER.email}</span>
                </p>
              </div>
            </div>

            <Button variant="outline" className="gap-2 self-start sm:self-auto text-xs text-[#64748B]">
              <AppIcons.edit size={14} />
              <span>Chỉnh sửa hồ sơ</span>
            </Button>
          </div>

          {/* Quick Metrics Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <AppIcons.adminRbac size={14} className="text-[#4F46E5]" />
                <span>Vai Trò (Role)</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{CURRENT_USER.role}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <AppIcons.adminOrg size={14} className="text-[#4F46E5]" />
                <span>Phòng Ban</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{CURRENT_USER.department}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <AppIcons.adminAgent size={14} className="text-[#4F46E5]" />
                <span>Trình Độ (Level)</span>
              </div>
              <p className="text-sm font-bold text-slate-800">{CURRENT_USER.level}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                <AppIcons.verifiedCheck size={14} className="text-emerald-600" />
                <span>Trạng Thái</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                Active Member
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio & Skills Details */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Bio Summary */}
        <Card className="md:col-span-2 border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AppIcons.user size={16} className="text-[#4F46E5]" />
              <span>Giới Thiệu Bản Thân (Bio Summary)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 leading-relaxed">
              {CURRENT_USER.bio_summary}
            </p>
          </CardContent>
        </Card>

        {/* Skills Tags */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
              <AppIcons.code size={16} className="text-[#4F46E5]" />
              <span>Kỹ Năng Kỹ Thuật</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {CURRENT_USER.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-[#4F46E5] border border-indigo-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
