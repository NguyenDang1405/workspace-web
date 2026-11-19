import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export type UserTypeFilter = 'ALL' | 'ENTERPRISE' | 'INDIVIDUAL' | 'SUSPENDED';

interface UserAccount {
  id: string;
  initials: string;
  name: string;
  email: string;
  type: 'ENTERPRISE' | 'INDIVIDUAL';
  role: 'ADMIN' | 'LEADER' | 'MEMBER' | 'INTERN';
  quotaUsed: number;
  quotaTotal: number;
  quotaLabel?: string;
  isHighLoad?: boolean;
  isExceeded?: boolean;
}

const INITIAL_USERS: UserAccount[] = [
  {
    id: 'u-1',
    initials: 'TM',
    name: 'Trần Minh Tuấn',
    email: 'tuan.tm@fpt.com',
    type: 'ENTERPRISE',
    role: 'LEADER',
    quotaUsed: 85,
    quotaTotal: 100,
  },
  {
    id: 'u-2',
    initials: 'HN',
    name: 'Lê Hoàng Nam',
    email: 'nam.lh@sv.dut.udn.vn',
    type: 'INDIVIDUAL',
    role: 'MEMBER',
    quotaUsed: 18,
    quotaTotal: 30,
  },
  {
    id: 'u-3',
    initials: 'TV',
    name: 'Nguyễn Thảo Vy',
    email: 'vy.nt@techcorp.io',
    type: 'ENTERPRISE',
    role: 'ADMIN',
    quotaUsed: 190,
    quotaTotal: 200,
    isHighLoad: true,
    quotaLabel: '95% High Load',
  },
  {
    id: 'u-4',
    initials: 'QB',
    name: 'Phạm Quốc Bảo',
    email: 'bao.pq@gmail.com',
    type: 'INDIVIDUAL',
    role: 'INTERN',
    quotaUsed: 30,
    quotaTotal: 30,
    isExceeded: true,
    quotaLabel: '(Hết hạn ngạch)',
  },
];

interface PermissionRow {
  key: string;
  label: string;
  group: 'DAG' | 'DISPATCH';
  admin: boolean;
  leader: boolean;
  member: boolean;
  intern: boolean;
}

const INITIAL_PERMISSIONS: PermissionRow[] = [
  // Group 1: DỰ ÁN & ĐỒ THỊ DAG
  { key: 'create_srs', label: 'Tạo / Phân rã SRS (Create)', group: 'DAG', admin: true, leader: true, member: false, intern: false },
  { key: 'read_multi', label: 'Xem đa góc nhìn (Read)', group: 'DAG', admin: true, leader: true, member: true, intern: true },
  { key: 'update_cpm', label: 'Sửa đường găng (Update)', group: 'DAG', admin: true, leader: true, member: false, intern: false },
  { key: 'delete_proj', label: 'Xóa dự án (Delete)', group: 'DAG', admin: true, leader: false, member: false, intern: false },

  // Group 2: ĐIỀU PHỐI & NGHIỆM THU
  { key: 'dispatch_tasks', label: 'Duyệt giao việc (Dispatch)', group: 'DISPATCH', admin: true, leader: true, member: false, intern: false },
  { key: 'review_pr', label: 'Thẩm định PR / Bài nộp', group: 'DISPATCH', admin: true, leader: true, member: true, intern: false },
  { key: 'config_rag', label: 'Cấu hình Hệ thống / RAG', group: 'DISPATCH', admin: true, leader: false, member: false, intern: false },
];

export const RbacPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<UserTypeFilter>('ALL');
  const [users] = useState<UserAccount[]>(INITIAL_USERS);
  const [permissions, setPermissions] = useState<PermissionRow[]>(INITIAL_PERMISSIONS);
  const [saveStatus, setSaveStatus] = useState<string>('Auto-saved');

  // Toggle permission checkbox
  const handleTogglePerm = (rowKey: string, role: 'admin' | 'leader' | 'member' | 'intern') => {
    setPermissions((prev) =>
      prev.map((row) => (row.key === rowKey ? { ...row, [role]: !row[role] } : row))
    );
    setSaveStatus('Đang lưu...');
    setTimeout(() => {
      setSaveStatus('Auto-saved');
    }, 500);
  };

  // Filter users
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;
    if (filterType === 'ENTERPRISE') return u.type === 'ENTERPRISE';
    if (filterType === 'INDIVIDUAL') return u.type === 'INDIVIDUAL';
    if (filterType === 'SUSPENDED') return u.isExceeded;
    return true;
  });

  return (
    <div className="space-y-6 select-none font-sans text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Quản Lý Tài Khoản & Ma Trận Phân Quyền (RBAC)
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Quản lý danh sách người dùng, cấp phát hạn ngạch AI và phân bổ ma trận quyền hạn thao tác hệ thống.
          </p>
        </div>

        <Button
          onClick={() => alert('Mở popup thêm tài khoản người dùng mới...')}
          className="gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto"
        >
          <AppIcons.plus size={14} />
          <span>+ Thêm Tài Khoản</span>
        </Button>
      </div>

      {/* Filter & Bulk Quota Bar */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search input + Chips */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative min-w-[220px] max-w-xs flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
              <AppIcons.search size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, email..."
              className="w-full h-8 rounded-md border border-[#E2E8F0] bg-white pl-8 pr-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
            />
          </div>

          {/* Chips */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                filterType === 'ALL'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Tất cả (1,240)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('ENTERPRISE')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                filterType === 'ENTERPRISE'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              ENTERPRISE (420)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('INDIVIDUAL')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                filterType === 'INDIVIDUAL'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              INDIVIDUAL (820)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('SUSPENDED')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                filterType === 'SUSPENDED'
                  ? 'bg-[#BE123C] text-white shadow-xs'
                  : 'bg-rose-50 text-[#BE123C] border border-rose-200 hover:bg-rose-100'
              }`}
            >
              Đình chỉ (12)
            </button>
          </div>
        </div>

        {/* Right Button: Bulk Quota */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => alert('Mở cửa sổ cấp phát token hạn ngạch hàng loạt...')}
          className="h-8 gap-1.5 text-xs font-semibold text-[#4F46E5] border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/50 shrink-0"
        >
          <AppIcons.zap size={13} />
          <span>Gán Hạn Ngạch AI Hàng Loạt (Bulk Quota)</span>
        </Button>
      </div>

      {/* Main 2-Column Content (Span 7 : Span 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ======================================================== */}
        {/* Left Column (Span 7): Users & AI Quota List             */}
        {/* ======================================================== */}
        <div className="lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-[#0F172A]">
                  Danh Sách Người Dùng & Hạn Ngạch AI
                </h2>
                <span className="font-mono text-[11px] text-[#64748B] bg-slate-100 px-2 py-0.5 rounded">
                  1,240 tài khoản
                </span>
              </div>
              <span className="font-mono text-[11px] font-semibold text-[#0D9488] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#0D9488]"></span>
                Hệ số Token: 1:1
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                    <th className="py-2.5 pr-2">TÀI KHOẢN</th>
                    <th className="py-2.5 px-2">PHÂN LOẠI</th>
                    <th className="py-2.5 px-2">VAI TRÒ</th>
                    <th className="py-2.5 pl-2">HẠ NGẠCH AI (TOKEN QUOTA)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {filteredUsers.map((user) => {
                    const percent = Math.min(100, Math.round((user.quotaUsed / user.quotaTotal) * 100));
                    return (
                      <tr key={user.id} className="hover:bg-[#F8FAFC] transition-colors">
                        {/* Account */}
                        <td className="py-3 pr-2">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 font-mono text-xs font-bold text-[#0F172A] border border-[#CBD5E1]">
                              {user.initials}
                            </div>
                            <div className="truncate max-w-[170px]">
                              <p className="text-xs font-bold text-[#0F172A] leading-tight truncate">
                                {user.name}
                              </p>
                              <p className="font-mono text-[10px] text-[#64748B] truncate">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Classification */}
                        <td className="py-3 px-2">
                          <span
                            className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              user.type === 'ENTERPRISE'
                                ? 'bg-slate-100 text-[#0F172A] border-slate-200'
                                : 'bg-slate-50 text-[#64748B] border-[#E2E8F0]'
                            }`}
                          >
                            {user.type}
                          </span>
                        </td>

                        {/* Role */}
                        <td className="py-3 px-2">
                          <span
                            className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded border ${
                              user.role === 'ADMIN'
                                ? 'bg-indigo-50 text-[#4F46E5] border-indigo-200'
                                : user.role === 'LEADER'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : user.role === 'MEMBER'
                                ? 'bg-slate-100 text-[#475569] border-slate-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>

                        {/* Quota Progress */}
                        <td className="py-3 pl-2 min-w-[150px]">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between font-mono text-[11px]">
                              <span className="font-bold text-[#0F172A]">
                                {user.quotaUsed}k / {user.quotaTotal}k
                              </span>
                              {user.quotaLabel && (
                                <span
                                  className={`text-[10px] font-semibold ${
                                    user.isExceeded ? 'text-[#BE123C]' : 'text-amber-600'
                                  }`}
                                >
                                  {user.quotaLabel}
                                </span>
                              )}
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  user.isExceeded
                                    ? 'bg-[#BE123C]'
                                    : user.isHighLoad
                                    ? 'bg-amber-500'
                                    : 'bg-[#4F46E5]'
                                }`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3 text-xs text-[#64748B]">
            <span>Hiển thị 4 trên 1,240 bản ghi</span>
            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#0F172A] text-white font-bold">Trang 1</span>
              <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">2</span>
              <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">3</span>
              <span>...</span>
              <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">124</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Right Column (Span 5): CRUD Authority Matrix            */}
        {/* ======================================================== */}
        <div className="lg:col-span-5 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <h2 className="text-sm font-bold text-[#0F172A]">
                  Quyền Hạn Thao Tác (CRUD Authority)
                </h2>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Ma trận phân vai trò người dùng trong hệ thống
                </p>
              </div>

              <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
                {saveStatus}
              </span>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                    <th className="py-2 pr-1 font-bold">QUYỀN HẠN</th>
                    <th className="py-2 px-1 text-center font-bold">ADMIN</th>
                    <th className="py-2 px-1 text-center font-bold">LEADER</th>
                    <th className="py-2 px-1 text-center font-bold">MEMBER</th>
                    <th className="py-2 pl-1 text-center font-bold">INTERN</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Group 1: DỰ ÁN & ĐỒ THỊ DAG */}
                  <tr>
                    <td colSpan={5} className="pt-3 pb-1.5 text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">
                      DỰ ÁN & ĐỒ THỊ DAG
                    </td>
                  </tr>
                  {permissions
                    .filter((p) => p.group === 'DAG')
                    .map((perm) => (
                      <tr key={perm.key} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-2 pr-1 text-xs text-[#0F172A] font-medium">{perm.label}</td>
                        {(['admin', 'leader', 'member', 'intern'] as const).map((r) => (
                          <td key={r} className="py-2 px-1 text-center">
                            <input
                              type="checkbox"
                              checked={perm[r]}
                              onChange={() => handleTogglePerm(perm.key, r)}
                              className="h-3.5 w-3.5 rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}

                  {/* Group 2: ĐIỀU PHỐI & NGHIỆM THU */}
                  <tr>
                    <td colSpan={5} className="pt-4 pb-1.5 text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider">
                      ĐIỀU PHỐI & NGHIỆM THU
                    </td>
                  </tr>
                  {permissions
                    .filter((p) => p.group === 'DISPATCH')
                    .map((perm) => (
                      <tr key={perm.key} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="py-2 pr-1 text-xs text-[#0F172A] font-medium">{perm.label}</td>
                        {(['admin', 'leader', 'member', 'intern'] as const).map((r) => (
                          <td key={r} className="py-2 px-1 text-center">
                            <input
                              type="checkbox"
                              checked={perm[r]}
                              onChange={() => handleTogglePerm(perm.key, r)}
                              className="h-3.5 w-3.5 rounded border-[#CBD5E1] text-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bottom Action Button */}
          <Button
            onClick={() => {
              setSaveStatus('Đã áp dụng RBAC thành công!');
              setTimeout(() => setSaveStatus('Auto-saved'), 3000);
            }}
            className="w-full h-9 gap-1.5 text-xs font-semibold bg-[#4F46E5] hover:bg-indigo-700 text-white shadow-xs"
          >
            <AppIcons.check size={14} strokeWidth={2.5} />
            <span>Lưu Cấu Hình Phân Quyền (Apply RBAC)</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RbacPage;
