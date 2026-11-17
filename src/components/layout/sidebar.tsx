import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';

interface NavItemConfig {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
}

export const Sidebar: React.FC = () => {
  // 6 mục điều hướng User Workspace bắt buộc (Frames 09-24)
  const userNavItems: NavItemConfig[] = [
    {
      to: '/ai-decompose',
      label: 'Khởi Tạo & Phân Rã AI',
      icon: AppIcons.navAiDecompose,
    },
    {
      to: '/projects/demo-1/kanban',
      label: 'Bảng Công Việc (Kanban)',
      icon: AppIcons.navKanban,
    },
    {
      to: '/calendar',
      label: 'Lịch Biểu Thích Ứng',
      icon: AppIcons.navCalendar,
    },
    {
      to: '/dag-gantt',
      label: 'Đồ Thị Mạng DAG & Gantt',
      icon: AppIcons.navDagGantt,
    },
    {
      to: '/backlog-srs',
      label: 'Backlog & Yêu Cầu SRS',
      icon: AppIcons.navBacklogSrs,
    },
    {
      to: '/profile',
      label: 'Hồ Sơ Năng Lực & Báo Cáo',
      icon: AppIcons.navAnalytics,
    },
  ];

  // 6 mục Quản trị Admin Portal (Frames 01-05B)
  const adminNavItems: NavItemConfig[] = [
    {
      to: '/admin/monitor',
      label: 'Giám Sát Tài Nguyên',
      icon: AppIcons.adminMonitor,
    },
    {
      to: '/admin/rbac',
      label: 'Phân Quyền RBAC',
      icon: AppIcons.adminRbac,
    },
    {
      to: '/teams',
      label: 'Tổ Chức & Không Gian',
      icon: AppIcons.adminOrg,
    },
    {
      to: '/admin/audit',
      label: 'Nhật Ký Audit Log',
      icon: AppIcons.adminAudit,
    },
    {
      to: '/admin/rag',
      label: 'Thuật Toán & RAG',
      icon: AppIcons.adminRag,
    },
    {
      to: '/admin/agent',
      label: 'Multi-Agent & Prompt',
      icon: AppIcons.adminAgent,
    },
  ];

  const renderNavList = (items: NavItemConfig[]) => (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-xs transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white border border-[#CBD5E1] rounded-md font-semibold text-[#0F172A] shadow-xs'
                  : 'text-[#64748B] hover:bg-slate-200/50 hover:text-[#0F172A] rounded-md'
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
    </nav>
  );

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-[260px] min-w-[260px] flex-col border-r border-[#E2E8F0] bg-[#F1F5F9] select-none">
      {/* Header: BrandLogoMark 28x28px + Smart Workspace 16px Bold #0F172A + Border-b 1px #E2E8F0 */}
      <div className="flex h-14 items-center gap-3 border-b border-[#E2E8F0] px-4 bg-[#F1F5F9]">
        <BrandLogoMark size={28} />
        <span className="text-[16px] font-bold tracking-tight text-[#0F172A] whitespace-nowrap truncate">
          Smart Workspace
        </span>
      </div>

      {/* Navigation Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        <div>
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Không Gian Làm Việc
          </div>
          {renderNavList(userNavItems)}
        </div>

        <div className="pt-2 border-t border-[#E2E8F0]">
          <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Quản Trị Hệ Thống
          </div>
          {renderNavList(adminNavItems)}
        </div>
      </div>

      {/* System Status Footer */}
      <div className="border-t border-[#E2E8F0] p-3 bg-[#F1F5F9]">
        <div className="rounded-md border border-[#E2E8F0] bg-white p-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-[#0F172A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse"></span>
              <span>FastAPI & Node API</span>
            </div>
            <span className="font-mono text-[10px] text-[#0D9488] font-semibold bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
              Ready
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] text-[#64748B]">M3 Light • WCAG AAA</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
