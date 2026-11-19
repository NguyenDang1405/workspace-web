import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';

export const TopAppBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumbs = (pathname: string) => {
    // Phân hệ 5 & Profile
    if (pathname.includes('/analytics/standup')) {
      return { parent: 'Hồ Sơ Năng Lực & Báo Cáo', current: 'Bản Tin Scrum & Tổng Kết Học Tập' };
    }
    if (pathname.includes('/analytics/monte-carlo')) {
      return { parent: 'Hồ Sơ Năng Lực & Báo Cáo', current: 'Mô Phỏng Rủi Ro Monte Carlo & Chỉ Số Flow' };
    }
    if (pathname.includes('/profile/skill-elo')) {
      return { parent: 'Hồ Sơ Năng Lực & Báo Cáo', current: 'Hồ Sơ Năng Lực & Radar Skill Elo' };
    }
    if (pathname.includes('/profile') || pathname.includes('/analytics')) {
      return { parent: 'Hồ Sơ Năng Lực & Báo Cáo', current: 'Hồ Sơ Năng Lực & Báo Cáo' };
    }

    // Phân hệ 1: Khởi Tạo & Phân Rã AI
    if (pathname.includes('/ai-decompose/ingest')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Trung Tâm Nạp Tài Liệu (Document Ingestion Hub)' };
    }
    if (pathname.includes('/ai-decompose/traceability')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Đối Soát Nguồn Bóc Tách (Traceability Inspector)' };
    }
    if (pathname.includes('/ai-decompose/processing')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Ma Trận Xử Lý & Điều Phối AI (Processing Matrix)' };
    }
    if (pathname.includes('/ai-decompose/dispatch')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Đối Soát Kế Hoạch & Gán Tác Vụ (Dispatch Matrix)' };
    }
    if (pathname.includes('/ai-decompose/personal-roadmap')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Lộ Trình Học Tập & Đồ Án Cá Nhân' };
    }
    if (pathname.includes('/ai-decompose')) {
      return { parent: 'Khởi Tạo & Phân Rã AI', current: 'Nạp Tài Liệu Nguồn' };
    }

    // Phân hệ 3: Lịch Biểu Thích Ứng
    if (pathname.includes('/calendar/conflicts')) {
      return { parent: 'Lịch Biểu Thích Ứng', current: 'Giải Quyết Xung Đột Lịch Thông Minh (Conflict Matrix)' };
    }
    if (pathname.includes('/calendar')) {
      return { parent: 'Lịch Biểu Thích Ứng', current: 'Thời Khóa Biểu & Lịch Trình AI (Weekly Grid)' };
    }

    // Phân hệ 4: Đồ Thị Mạng DAG & Gantt
    if (pathname.includes('/dag-gantt')) {
      return { parent: 'Đồ Thị Mạng DAG & Gantt', current: 'Sơ Đồ Mạng DAG & Biểu Đồ Gantt CPM' };
    }

    // Phân hệ 2: Backlog & SRS Diff
    if (pathname.includes('/backlog/srs-diff')) {
      return { parent: 'Backlog & Yêu Cầu SRS', current: 'Đánh Giá Tác Động SRS v1.0 vs v2.0' };
    }
    if (pathname.includes('/backlog') || pathname.includes('/backlog-srs')) {
      return { parent: 'Backlog & Yêu Cầu SRS', current: 'Danh Sách Backlog & Phân Cấp WBS' };
    }

    // Phân hệ Nghiệm Thu & Kanban
    if (pathname.includes('/kanban/pr-review')) {
      return { parent: 'Bảng Công Việc (Kanban)', current: 'Thẩm Định PR & Code Diff' };
    }
    if (pathname.includes('/kanban/submission')) {
      return { parent: 'Bảng Công Việc (Kanban)', current: 'Nộp Sản Phẩm & Đánh Giá Chéo' };
    }
    if (pathname.includes('/kanban')) {
      return { parent: 'Bảng Công Việc (Kanban)', current: 'Bảng Điều Hành FSM Workflow' };
    }

    // Khác
    if (pathname.includes('/teams')) {
      return { parent: 'Cơ Cấu Đội Ngũ', current: 'Tổ Chức & Không Gian' };
    }
    if (pathname.includes('/projects')) {
      return { parent: 'Dự Án', current: 'Danh Sách Dự Án' };
    }
    return { parent: 'Smart Workspace', current: 'Không Gian Làm Việc' };
  };

  const handleExportCSV = () => {
    console.info('Exporting Workspace dataset to CSV...');
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    logout();
    navigate('/auth?mode=login');
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

        {/* User Identity với Dropdown Menu chuyển đổi nhanh */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 p-1 rounded-md hover:bg-slate-100/70 transition-colors focus:outline-hidden"
            aria-expanded={isUserMenuOpen}
            aria-haspopup="true"
          >
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
                Admin &amp; Lead Architect
              </p>
            </div>
            <AppIcons.chevronDown
              size={13}
              className={`text-[#94A3B8] transition-transform duration-150 ${
                isUserMenuOpen ? 'rotate-180 text-[#0F172A]' : ''
              }`}
            />
          </button>

          {/* Dropdown Menu Popup */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[#E2E8F0] bg-white p-1.5 shadow-lg text-xs z-50 animate-in fade-in duration-150">
              <div className="px-2.5 py-2 border-b border-[#E2E8F0] mb-1">
                <p className="font-semibold text-[#0F172A]">Đặng Hồng Nguyên</p>
                <p className="text-[11px] font-mono text-[#64748B] truncate">
                  nguyen.dang@university.edu.vn
                </p>
              </div>

              <div className="space-y-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/profile/skill-elo');
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-slate-700 hover:bg-indigo-50 hover:text-[#4F46E5] transition-colors"
                >
                  <AppIcons.trophy size={14} className="text-[#4F46E5]" />
                  <span>Hồ Sơ Năng Lực (Skill Elo)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/admin/pulse');
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-slate-700 hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
                >
                  <AppIcons.adminMonitor size={14} className="text-[#0D9488]" />
                  <span>Chuyển Sang Admin Portal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    navigate('/kanban');
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-slate-700 hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
                >
                  <AppIcons.navKanban size={14} className="text-[#4F46E5]" />
                  <span>Quay Lại User Workspace</span>
                </button>

                <div className="border-t border-[#E2E8F0] my-1" />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-[#BE123C] hover:bg-rose-50 transition-colors"
                >
                  <AppIcons.logout size={14} />
                  <span>Đăng Xuất</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopAppBar;
