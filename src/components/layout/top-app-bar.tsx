import React from 'react';
import { useLocation } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export const TopAppBar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const getBreadcrumbTitle = (pathname: string) => {
    if (pathname.includes('/projects/demo-1/kanban') || pathname.includes('/kanban')) {
      return 'Bảng Công Việc (Kanban)';
    }
    if (pathname.includes('/projects')) {
      return 'Quản Lý Dự Án';
    }
    if (pathname.includes('/ai-decompose')) {
      return 'Khởi Tạo & Phân Rã AI';
    }
    if (pathname.includes('/calendar')) {
      return 'Lịch Biểu Thích Ứng';
    }
    if (pathname.includes('/dag-gantt')) {
      return 'Đồ Thị Mạng DAG & Gantt';
    }
    if (pathname.includes('/backlog-srs')) {
      return 'Backlog & Yêu Cầu SRS';
    }
    if (pathname.includes('/teams')) {
      return 'Tổ Chức & Không Gian';
    }
    if (pathname.includes('/profile')) {
      return 'Hồ Sơ Năng Lực & Báo Cáo';
    }
    if (pathname.includes('/admin/monitor')) {
      return 'Giám Sát Tài Nguyên';
    }
    if (pathname.includes('/admin/rbac')) {
      return 'Phân Quyền RBAC';
    }
    if (pathname.includes('/admin/audit')) {
      return 'Nhật Ký Audit Log';
    }
    if (pathname.includes('/admin/rag')) {
      return 'Thuật Toán & RAG';
    }
    if (pathname.includes('/admin/agent')) {
      return 'Multi-Agent & Prompt';
    }
    return 'Không Gian Làm Việc';
  };

  const handleExportCSV = () => {
    console.info('Exporting Workspace dataset to CSV...');
  };

  return (
    <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-[#64748B]">
        <span className="hover:text-[#0F172A] cursor-pointer transition-colors">Smart Workspace</span>
        <span className="text-[#CBD5E1]">/</span>
        <span className="font-medium text-[#0F172A]">
          {getBreadcrumbTitle(location.pathname)}
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
