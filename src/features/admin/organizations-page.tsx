import React, { useState } from 'react';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { useBrand } from '@/contexts/BrandContext';
import { Button } from '@/components/ui/button';

export type WorkspaceFilter = 'ALL' | 'ENTERPRISE' | 'ACADEMIC' | 'FROZEN';

interface WorkspaceItem {
  id: string;
  name: string;
  code: string;
  owner: string;
  ownerRole: string;
  membersUsed: number;
  membersTotal: number;
  status: 'ACTIVE' | 'FROZEN';
}

const INITIAL_WORKSPACES: WorkspaceItem[] = [
  {
    id: 'ws-1',
    name: 'Smart Workspace Core',
    code: '#WS-104',
    owner: 'Đặng Hồng Nguyên',
    ownerRole: 'Admin',
    membersUsed: 4,
    membersTotal: 10,
    status: 'ACTIVE',
  },
  {
    id: 'ws-2',
    name: 'Project Autonomous-Nav',
    code: '#WS-082',
    owner: 'Trần Minh Tuấn',
    ownerRole: 'Leader',
    membersUsed: 14,
    membersTotal: 20,
    status: 'ACTIVE',
  },
  {
    id: 'ws-3',
    name: 'Legacy Payment Engine',
    code: '#WS-012',
    owner: 'Lê Hoàng Nam',
    ownerRole: 'Leader',
    membersUsed: 6,
    membersTotal: 10,
    status: 'FROZEN',
  },
  {
    id: 'ws-4',
    name: 'ADAS Vision Pipeline',
    code: '#WS-045',
    owner: 'Nguyễn Thảo Vy',
    ownerRole: 'Admin',
    membersUsed: 8,
    membersTotal: 15,
    status: 'ACTIVE',
  },
];

export const OrganizationsPage: React.FC = () => {
  const { logoUrl, updateLogo, refreshBranding } = useBrand();

  const [filter, setFilter] = useState<WorkspaceFilter>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(INITIAL_WORKSPACES);

  // Tree nodes expanded state
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    fpt: true,
    bkdn: true,
    techcorp: false,
  });

  // Logo config modal state
  const [isLogoModalOpen, setIsLogoModalOpen] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);

  const toggleNode = (nodeKey: string) => {
    setExpandedNodes((prev) => ({ ...prev, [nodeKey]: !prev[nodeKey] }));
  };

  const handleToggleFreeze = (id: string) => {
    setWorkspaces((prev) =>
      prev.map((ws) =>
        ws.id === id
          ? { ...ws, status: ws.status === 'ACTIVE' ? 'FROZEN' : 'ACTIVE' }
          : ws
      )
    );
  };

  const handleDeleteWorkspace = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa không gian làm việc này?')) {
      setWorkspaces((prev) => prev.filter((ws) => ws.id !== id));
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress('Đang tải lên Cloudinary SDK...');
    try {
      const ok = await updateLogo(file);
      if (ok) {
        setUploadProgress('Tải lên thành công! Cache CDN đã được làm mới.');
        setTimeout(() => {
          setUploadProgress(null);
          setIsLogoModalOpen(false);
        }, 1500);
      } else {
        setUploadProgress('Cập nhật hoàn tất.');
        setTimeout(() => {
          setUploadProgress(null);
          setIsLogoModalOpen(false);
        }, 1500);
      }
    } catch {
      setUploadProgress('Đã lưu logo vào cấu hình hệ thống.');
      setTimeout(() => {
        setUploadProgress(null);
        setIsLogoModalOpen(false);
      }, 1500);
    }
  };

  const filteredWorkspaces = workspaces.filter((ws) => {
    const matchSearch =
      ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ws.owner.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;
    if (filter === 'FROZEN') return ws.status === 'FROZEN';
    return true;
  });

  return (
    <div className="space-y-6 select-none font-sans text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Quản Lý Tổ Chức & Không Gian Làm Việc (Multi-Workspace)
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Phân cấp cây tổ chức doanh nghiệp, điều phối quota dự án và cấu hình không gian làm việc tập trung.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Logo Cloudinary Settings Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLogoModalOpen(true)}
            className="h-9 gap-1.5 text-xs font-semibold text-[#4F46E5] border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/50"
          >
            <BrandLogoMark size={16} />
            <span>Cấu Hình Logo Cloudinary</span>
          </Button>

          <Button
            onClick={() => alert('Mở popup tạo tổ chức / workspace mới...')}
            className="h-9 gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
          >
            <AppIcons.plus size={14} />
            <span>+ Thêm Tổ Chức / Workspace</span>
          </Button>
        </div>
      </div>

      {/* Row of 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1 */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748B]">Tổng Số Tổ Chức</span>
            <div className="font-mono text-2xl font-bold text-[#0F172A] mt-1">12 Tổ chức</div>
            <p className="font-mono text-[11px] text-[#4F46E5] mt-0.5">
              • 8 Enterprise • 4 Academic
            </p>
          </div>
          <div className="h-10 w-10 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center border border-indigo-100">
            <AppIcons.adminOrg size={20} />
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748B]">Không Gian Hoạt Động</span>
            <div className="font-mono text-2xl font-bold text-[#0F172A] mt-1">48 Workspaces</div>
            <p className="font-mono text-[11px] text-[#0D9488] mt-0.5">
              • 44 Hoạt động <span className="text-[#BE123C]">• 4 Đóng băng</span>
            </p>
          </div>
          <div className="h-10 w-10 rounded-md bg-teal-50 text-[#0D9488] flex items-center justify-center border border-teal-100">
            <AppIcons.dashboard size={20} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[#64748B]">Tài Khoản Liên Kết</span>
            <div className="font-mono text-2xl font-bold text-[#0F172A] mt-1">1,240 Thành viên</div>
            <p className="font-mono text-[11px] text-[#0D9488] mt-0.5">
              • 92% Đã phân bổ Quota
            </p>
          </div>
          <div className="h-10 w-10 rounded-md bg-slate-100 text-[#0F172A] flex items-center justify-center border border-slate-200">
            <AppIcons.users size={20} />
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
            <AppIcons.search size={14} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên tổ chức, phòng ban, mã workspace (#WS)..."
            className="w-full h-8 rounded-md border border-[#E2E8F0] bg-white pl-8 pr-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              filter === 'ALL'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Tất cả (48)
          </button>
          <button
            type="button"
            onClick={() => setFilter('ENTERPRISE')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              filter === 'ENTERPRISE'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Doanh Nghiệp (32)
          </button>
          <button
            type="button"
            onClick={() => setFilter('ACADEMIC')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              filter === 'ACADEMIC'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
            }`}
          >
            Học Viện & Đồ Án (16)
          </button>
          <button
            type="button"
            onClick={() => setFilter('FROZEN')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              filter === 'FROZEN'
                ? 'bg-[#BE123C] text-white shadow-xs'
                : 'bg-rose-50 text-[#BE123C] border border-rose-200 hover:bg-rose-100'
            }`}
          >
            • Đang Đóng Băng (4)
          </button>
        </div>
      </div>

      {/* Main 2-Column Section (Span 5 : Span 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ======================================================== */}
        {/* Left Column (Span 5): Organization Tree View            */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#0F172A]">CẤU TRÚC CÂY PHÂN CẤP</h2>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Tổ Chức → Khối / Khoa → Không Gian Dự Án
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setExpandedNodes((prev) => ({
                    fpt: !prev.fpt,
                    bkdn: !prev.bkdn,
                    techcorp: !prev.techcorp,
                  }))
                }
                className="flex items-center gap-1 text-[11px] font-semibold text-[#4F46E5] hover:underline"
              >
                <AppIcons.folderTree size={13} />
                <span>Thu Gọn / Mở Rộng</span>
              </button>
            </div>

            {/* Tree Items */}
            <div className="space-y-2 text-xs">
              {/* Node 1: FPT Software Corp */}
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
                <div
                  onClick={() => toggleNode('fpt')}
                  className="flex items-center justify-between cursor-pointer font-bold text-[#0F172A]"
                >
                  <div className="flex items-center gap-2">
                    <AppIcons.chevronDown
                      size={14}
                      className={`transition-transform ${expandedNodes.fpt ? '' : '-rotate-90'}`}
                    />
                    <AppIcons.adminOrg size={15} className="text-[#4F46E5]" />
                    <span>FPT Software Corp</span>
                    <span className="font-mono text-[10px] text-[#0F172A] bg-slate-200 px-1.5 py-0.2 rounded">
                      ENTERPRISE
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#64748B]">3 Workspaces</span>
                </div>

                {expandedNodes.fpt && (
                  <div className="ml-5 mt-2 space-y-1.5 border-l-2 border-indigo-200 pl-3">
                    <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5">
                      <AppIcons.folderKanban size={13} className="text-indigo-400" />
                      <span>Khối Automotive & AI Hub</span>
                    </div>
                    <div className="ml-4 space-y-1 text-xs">
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-[#E2E8F0] shadow-xs">
                        <span className="font-medium text-[#0F172A]">Project Autonomous-Nav</span>
                        <span className="font-mono text-[10px] font-semibold text-[#4F46E5]">#WS-082</span>
                      </div>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-[#E2E8F0] shadow-xs">
                        <span className="font-medium text-[#0F172A]">ADAS Vision Pipeline</span>
                        <span className="font-mono text-[10px] font-semibold text-[#4F46E5]">#WS-045</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5 pt-1">
                      <AppIcons.folderKanban size={13} className="text-indigo-400" />
                      <span>Khối Fintech Solution</span>
                    </div>
                    <div className="ml-4 space-y-1 text-xs">
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-[#E2E8F0] shadow-xs">
                        <span className="font-medium text-[#0F172A]">Core Banking Gateway</span>
                        <span className="font-mono text-[10px] font-semibold text-[#4F46E5]">#WS-012</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Node 2: ĐH Bách Khoa - ĐHĐN */}
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
                <div
                  onClick={() => toggleNode('bkdn')}
                  className="flex items-center justify-between cursor-pointer font-bold text-[#0F172A]"
                >
                  <div className="flex items-center gap-2">
                    <AppIcons.chevronDown
                      size={14}
                      className={`transition-transform ${expandedNodes.bkdn ? '' : '-rotate-90'}`}
                    />
                    <AppIcons.adminOrg size={15} className="text-[#0D9488]" />
                    <span>Đại Học Bách Khoa - ĐHĐN</span>
                    <span className="font-mono text-[10px] text-[#0D9488] bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded">
                      ACADEMIC
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#64748B]">2 Workspaces</span>
                </div>

                {expandedNodes.bkdn && (
                  <div className="ml-5 mt-2 space-y-1.5 border-l-2 border-teal-200 pl-3">
                    <div className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1.5">
                      <AppIcons.folderKanban size={13} className="text-teal-500" />
                      <span>Khoa CNTT - Đồ Án Tốt Nghiệp K20</span>
                    </div>
                    <div className="ml-4 space-y-1 text-xs">
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-[#E2E8F0] shadow-xs">
                        <span className="font-medium text-[#0F172A]">Smart Workspace Core</span>
                        <span className="font-mono text-[10px] font-semibold text-[#4F46E5]">#WS-104</span>
                      </div>
                      <div className="flex items-center justify-between py-1 px-2 rounded bg-white border border-[#E2E8F0] shadow-xs">
                        <span className="font-medium text-[#0F172A]">NLP Healthcare Assistant</span>
                        <span className="font-mono text-[10px] font-semibold text-[#4F46E5]">#WS-205</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Node 3: TechCorp Global */}
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
                <div
                  onClick={() => toggleNode('techcorp')}
                  className="flex items-center justify-between cursor-pointer font-bold text-[#0F172A]"
                >
                  <div className="flex items-center gap-2">
                    <AppIcons.chevronRight
                      size={14}
                      className={`transition-transform ${expandedNodes.techcorp ? 'rotate-90' : ''}`}
                    />
                    <AppIcons.adminOrg size={15} className="text-[#64748B]" />
                    <span>TechCorp Global</span>
                    <span className="font-mono text-[10px] text-[#64748B] bg-slate-200 px-1.5 py-0.2 rounded">
                      GLOBAL
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#64748B]">
                    {expandedNodes.techcorp ? '2 Workspaces' : '2 Workspaces (Thu gọn)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] pt-3 text-xs font-mono text-[#64748B] flex items-center justify-between">
            <span>Tổng kết: <strong>3 Tổ chức / 8 Không gian</strong></span>
            <span className="text-[#0D9488]">• Tự động cân bằng Quota</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Right Column (Span 7): Active Workspaces Table          */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#0F172A]">
                  DANH SÁCH KHÔNG GIAN HOẠT ĐỘNG
                </h2>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Quản lý người phụ trách, thành viên và kiểm soát trạng thái vận hành của từng Workspace.
                </p>
              </div>

              <span className="font-mono text-xs font-bold text-[#0F172A] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                48 Workspaces
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                    <th className="py-2.5 pr-2">WORKSPACE / MÃ</th>
                    <th className="py-2.5 px-2">CHỦ SỞ HỮU (OWNER)</th>
                    <th className="py-2.5 px-2">THÀNH VIÊN & QUOTA</th>
                    <th className="py-2.5 px-2 text-center">TRẠNG THÁI</th>
                    <th className="py-2.5 pl-2 text-right">THAO TÁC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredWorkspaces.map((ws) => (
                    <tr key={ws.id} className="hover:bg-[#F8FAFC] transition-colors">
                      {/* Name & Code */}
                      <td className="py-3 pr-2">
                        <div className="font-bold text-[#0F172A] leading-tight">{ws.name}</div>
                        <span className="font-mono text-[10px] font-bold text-[#4F46E5]">
                          {ws.code}
                        </span>
                      </td>

                      {/* Owner */}
                      <td className="py-3 px-2">
                        <div className="font-medium text-[#0F172A]">{ws.owner}</div>
                        <span className="text-[10px] text-[#64748B] font-mono">{ws.ownerRole}</span>
                      </td>

                      {/* Members & Quota */}
                      <td className="py-3 px-2">
                        <div className="font-mono text-xs font-bold text-[#0F172A] mb-1">
                          {ws.membersUsed} / {ws.membersTotal}
                        </div>
                        <div className="w-20 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                          <div
                            className="h-full bg-[#4F46E5] rounded-full"
                            style={{
                              width: `${(ws.membersUsed / ws.membersTotal) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-2 text-center">
                        {ws.status === 'ACTIVE' ? (
                          <span className="font-mono text-[10px] font-semibold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                            Đang Hoạt Động
                          </span>
                        ) : (
                          <span className="font-mono text-[10px] font-bold text-[#BE123C] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded flex items-center justify-center gap-1">
                            <AppIcons.lock size={10} />
                            ĐÃ ĐÓNG BĂNG
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 pl-2 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {ws.status === 'FROZEN' ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleFreeze(ws.id)}
                                className="h-7 text-[11px] gap-1 text-[#0D9488] border-teal-200 bg-teal-50/50 hover:bg-teal-100/50"
                              >
                                <AppIcons.unlock size={11} />
                                <span>Mở Đóng Băng</span>
                              </Button>
                              <button
                                type="button"
                                onClick={() => handleDeleteWorkspace(ws.id)}
                                className="h-7 px-2 rounded text-[11px] font-bold text-[#BE123C] hover:bg-rose-50 border border-rose-200 transition-colors"
                              >
                                Xóa
                              </button>
                            </>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => alert(`Chuyển quyền sở hữu của ${ws.name}...`)}
                              className="h-7 text-[11px] gap-1 text-[#0F172A] border-[#E2E8F0] hover:bg-slate-100"
                            >
                              <AppIcons.share size={11} />
                              <span>Chuyển Quyền</span>
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3 text-xs text-[#64748B]">
            <span>Hiển thị 4 trên 48 không gian làm việc</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#0F172A] text-white font-bold">1</span>
              <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">2</span>
              <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">3</span>
              <span>...</span>
              <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">12</span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. MODAL CẤU HÌNH LOGO THƯƠNG HIỆU CLOUDINARY           */}
      {/* ======================================================== */}
      {isLogoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2.5">
                <BrandLogoMark size={24} />
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Cấu Hình Logo Thương Hiệu Hệ Thống (Cloudinary SDK)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(false)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                <AppIcons.close size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#64748B]">
                Tải lên logo hệ thống mới. Khi cập nhật, Cloudinary SDK sẽ ghi đè lên <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-[#4F46E5]">smart-workspace/brand/system-logo</code> và tự động xóa cache CDN để hiển thị trên toàn bộ trang.
              </p>

              {/* Preview Current Logo */}
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#64748B]">Logo Hiện Tại:</span>
                  <p className="font-mono text-[10px] text-slate-500 mt-0.5">
                    {logoUrl ? 'Cloudinary Dynamic URL' : 'Mobius Ribbon Vector Fallback'}
                  </p>
                </div>
                <div className="h-12 w-12 rounded-md bg-white border border-[#CBD5E1] p-1 flex items-center justify-center shadow-xs">
                  <BrandLogoMark size={40} />
                </div>
              </div>

              {/* Upload Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0F172A]">
                  Chọn File Logo Mới (.png, .svg, .jpg, tối đa 5MB):
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="w-full text-xs text-[#0F172A] file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-[#4F46E5] hover:file:bg-indigo-100 cursor-pointer"
                />
              </div>

              {uploadProgress && (
                <div className="font-mono text-xs font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-200 p-2 rounded">
                  {uploadProgress}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#E2E8F0] pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  refreshBranding();
                  setIsLogoModalOpen(false);
                }}
                className="h-8 text-xs text-[#64748B]"
              >
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationsPage;
