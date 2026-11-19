import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

interface AdminNavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    to: '/admin/pulse',
    label: 'Giám Sát Tài Nguyên & Server',
    icon: AppIcons.adminMonitor,
  },
  {
    to: '/admin/rbac',
    label: 'Người Dùng & Phân Quyền RBAC',
    icon: AppIcons.adminRbac,
  },
  {
    to: '/admin/organizations',
    label: 'Tổ Chức & Đa Không Gian',
    icon: AppIcons.adminOrg,
  },
  {
    to: '/admin/audit-log',
    label: 'Nhật Ký & Độ Trễ AI (Audit Log)',
    icon: AppIcons.adminAudit,
  },
  {
    to: '/admin/rag-config',
    label: 'Cấu Hình Thuật Toán & RAG',
    icon: AppIcons.adminRag,
  },
  {
    to: '/admin/multi-agent',
    label: 'Điều Phối Multi-Agent & Prompt',
    icon: AppIcons.adminAgent,
  },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get current page title for breadcrumb
  const getCurrentPageTitle = () => {
    const item = ADMIN_NAV_ITEMS.find((nav) => location.pathname.startsWith(nav.to));
    return item ? item.label : 'Bảng Điều Khiển Quản Trị';
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans select-none text-[#0F172A]">
      {/* ======================================================== */}
      {/* 1. LEFT ADMIN SIDEBAR (260px)                            */}
      {/* ======================================================== */}
      <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] min-w-[260px] flex-col border-r border-[#E2E8F0] bg-[#F1F5F9]">
        {/* Brand Header: BrandLogoMark 28px + Smart Workspace 16px Bold */}
        <div
          onClick={() => navigate('/admin/pulse')}
          className="flex h-14 items-center gap-3 border-b border-[#E2E8F0] px-4 bg-[#F1F5F9] cursor-pointer"
        >
          <BrandLogoMark size={28} />
          <span className="text-[16px] font-bold tracking-tight text-[#0F172A] whitespace-nowrap truncate">
            Smart Workspace
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Admin Portal Core
          </div>

          <nav className="space-y-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 text-xs transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-white border border-[#CBD5E1] rounded-md font-bold text-[#0F172A] shadow-xs'
                        : 'text-[#64748B] hover:bg-slate-200/50 hover:text-[#0F172A] rounded-md font-medium'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={16}
                        className={`shrink-0 transition-colors ${
                          isActive ? 'text-[#4F46E5]' : 'text-[#64748B]'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* Switch to User Workspace Link */}
            <div className="pt-3 mt-3 border-t border-[#E2E8F0]">
              <NavLink
                to="/projects/demo-1/kanban"
                className="flex items-center gap-3 px-3 py-2 text-xs text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/50 rounded-md transition-colors"
              >
                <AppIcons.navKanban size={16} className="text-[#64748B]" />
                <span>Vào Không Gian Làm Việc</span>
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer: Version + Online Status */}
        <div className="border-t border-[#E2E8F0] p-3.5 bg-[#F1F5F9] flex items-center justify-between font-mono text-[11px]">
          <span className="text-[#64748B]">v2.4.0-prod</span>
          <span className="flex items-center gap-1.5 font-bold text-[#0D9488]">
            <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse"></span>
            <span>Online</span>
          </span>
        </div>
      </aside>

      {/* ======================================================== */}
      {/* 2. MAIN WORKSPACE WITH TOP BAR                          */}
      {/* ======================================================== */}
      <div className="pl-[260px] flex flex-col flex-1 min-h-screen">
        {/* Top App Bar */}
        <header className="sticky top-0 z-20 flex h-14 w-full items-center justify-between border-b border-[#E2E8F0] bg-white px-6">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs">
            <span
              onClick={() => navigate('/admin/pulse')}
              className="text-[#64748B] hover:text-[#0F172A] cursor-pointer transition-colors"
            >
              Admin Portal
            </span>
            <span className="text-[#CBD5E1]">&gt;</span>
            <div className="flex items-center gap-1.5 font-bold text-[#0F172A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]"></span>
              <span>{getCurrentPageTitle()}</span>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3.5">
            {/* Tag Làm mới: 5s */}
            <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-2.5 py-1 text-xs text-[#64748B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse"></span>
              <span className="font-mono text-[11px] font-medium tracking-tight">Làm mới: 5s</span>
            </div>

            {/* Nút Xuất CSV */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => alert('Xuất dữ liệu kiểm toán hệ thống sang định dạng CSV...')}
              className="h-8 gap-1.5 rounded-md border border-[#E2E8F0] bg-white px-3 text-xs font-medium text-[#0F172A] hover:bg-[#F8FAFC]"
            >
              <AppIcons.download size={14} className="text-[#0F172A]" />
              <span>Xuất CSV</span>
            </Button>

            {/* Vạch đứng 1px */}
            <div className="h-5 w-[1px] bg-[#E2E8F0]" aria-hidden="true" />

            {/* User Identity: Avatar tròn ĐN + Tên Đặng Hồng Nguyên */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-xs font-semibold text-white shadow-xs">
                ĐN
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-[#0F172A] leading-tight">
                  Đặng Hồng Nguyên
                </p>
                <p className="text-[10px] text-[#64748B] font-mono leading-tight">
                  System Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
