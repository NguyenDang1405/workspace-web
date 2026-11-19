import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export const TopAppBar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const getBreadcrumbs = (pathname: string) => {
    if (pathname.includes('/ai-decompose/ingest')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Trung Tâm Nạp Tài Liệu (Document Ingestion Hub)' };
    }
    if (pathname.includes('/ai-decompose/traceability')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Bước 2: Đối Soát Nguồn Bóc Tách (Traceability Inspector)' };
    }
    if (pathname.includes('/ai-decompose/processing')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Bước 3: Ma Trận Xử Lý & Điều Phối AI (Processing Matrix)' };
    }
    if (pathname.includes('/ai-decompose/dispatch')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Bước 4: Đối Soát & Phân Bổ Nhân Sự (PM Dispatch)' };
    }
    if (pathname.includes('/ai-decompose/personal-roadmap')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Kích Hoạt Lộ Trình Học Tập Cá Nhân' };
    }
    if (pathname.includes('/ai-decompose')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Nạp Tài Liệu Nguồn' };
    }
    if (pathname.includes('/calendar/conflicts')) {
      return { parent: 'Lịch Biểu Thích Ứng', current: 'Giải Quyết Xung Đột Lịch (Conflict Matrix)' };
    }
    if (pathname.includes('/calendar')) {
      return { parent: 'Lịch Biểu Thích Ứng', current: 'Lịch Trình AI Tự Động Phân Bổ (Weekly Grid)' };
    }
    if (pathname.includes('/dag-gantt')) {
      return { parent: 'Đồ Thị Mạng DAG & Gantt', current: 'Sơ Đồ Đường Găng CPM' };
    }
    if (pathname.includes('/backlog/srs-diff')) {
      return { parent: 'Backlog & Yêu Cầu SRS', current: 'Phân Tích Tác Động Thay Đổi (SRS Diff & CPM Impact)' };
    }
    if (pathname.includes('/backlog') || pathname.includes('/backlog-srs')) {
      return { parent: 'Dự Án Alpha', current: 'Backlog & Phân Cấp WBS' };
    }
    if (pathname.includes('/projects/demo-1/kanban') || pathname.includes('/kanban')) {
      return { parent: 'Dự Án Đang Thực Thi', current: 'Bảng Công Việc (Kanban FSM)' };
    }
    if (pathname.includes('/teams')) {
      return { parent: 'Cơ Cấu Đội Ngũ', current: 'Tổ Chức & Không Gian' };
    }
    if (pathname.includes('/profile')) {
      return { parent: 'Hồ Sơ Cá Nhân', current: 'Hồ Sơ Năng Lực & Báo Cáo' };
    }
    return { parent: 'Smart Workspace', current: 'Không Gian Làm Việc' };
  };

  const handleExportCSV = () => {
    console.info('Exporting Workspace dataset to CSV...');
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <span className="hover:text-[#0F172A] cursor-pointer transition-colors">
          {getBreadcrumbs(location.pathname).parent}
        </span>
        <span className="text-[#CBD5E1]">&gt;</span>
        <span className="font-medium text-[#0F172A]">
          {getBreadcrumbs(location.pathname).current}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3.5">
        {/* Tag Làm mới: 5s với chấm xanh 6px */}
        <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#64748B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse"></span>
          <span className="font-mono text-[11px] font-medium tracking-tight">Làm mới: 5s</span>
        </div>

        {/* Nút Xuất CSV */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCSV}
          className="h-8 gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-3 text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
        >
          <AppIcons.download size={14} className="text-[#0F172A]" />
          <span>Xuất CSV</span>
        </Button>

        {/* Vạch đứng 1px */}
        <div className="h-5 w-[1px] bg-[#E2E8F0]" aria-hidden="true" />

        {/* User Identity: Avatar tròn ĐN + Tên Đặng Hồng Nguyên */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-xs font-semibold text-white select-none shadow-xs"
            title="Đặng Hồng Nguyên"
          >
            ĐN
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-[#0F172A] leading-tight">
              Đặng Hồng Nguyên
            </p>
            <p className="text-[10px] text-[#64748B] font-mono leading-tight">
              Admin & Lead Architect
            </p>
          </div>
        </div>

        {/* Nút Đăng xuất tiện ích */}
        <button
          type="button"
          onClick={logout}
          aria-label="Đăng xuất"
          title="Đăng xuất khỏi hệ thống"
          className="ml-1 rounded-md p-1.5 text-[#64748B] hover:bg-rose-50 hover:text-[#BE123C] transition-colors"
        >
          <AppIcons.logout size={15} />
        </button>
      </div>
    </header>
  );
};

export default TopAppBar;
