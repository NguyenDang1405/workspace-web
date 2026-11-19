import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export type Methodology = 'AGILE_SCRUM' | 'KANBAN_FLOW';
export type MemberRole = 'MEMBER' | 'LEADER';

export interface ManualMember {
  id: string;
  email: string;
  role: MemberRole;
}

export interface UploadedBatchFile {
  name: string;
  memberCount: number;
  isValid: boolean;
}

export const EnterpriseOnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  // Organization state
  const [orgName, setOrgName] = useState<string>('FPT Software Corp');
  const [slug, setSlug] = useState<string>('fpt-software');
  const [teamSize, setTeamSize] = useState<string>('50 - 200 Kỹ sư & PM');

  // Methodology selection
  const [methodology, setMethodology] = useState<Methodology>('AGILE_SCRUM');

  // Batch file upload state
  const [batchFile, setBatchFile] = useState<UploadedBatchFile | null>({
    name: 'FPT_Dev_Team_Sprint1.csv',
    memberCount: 24,
    isValid: true,
  });

  // Manual email input state
  const [inputEmail, setInputEmail] = useState<string>('');
  const [inputRole, setInputRole] = useState<MemberRole>('MEMBER');
  const [members, setMembers] = useState<ManualMember[]>([
    { id: 'm-1', email: 'tuan.le@fpt.com', role: 'LEADER' },
    { id: 'm-2', email: 'hoa.nguyen@fpt.com', role: 'MEMBER' },
    { id: 'm-3', email: 'dung.tran@fpt.com', role: 'MEMBER' },
  ]);

  // Total members count
  const totalMembers = (batchFile?.memberCount || 0) + members.length;

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim()) return;
    setMembers((prev) => [
      ...prev,
      {
        id: 'm-' + Date.now(),
        email: inputEmail.trim(),
        role: inputRole,
      },
    ]);
    setInputEmail('');
  };

  const handleRemoveMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleToggleRole = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, role: m.role === 'LEADER' ? 'MEMBER' : 'LEADER' } : m
      )
    );
  };

  const handleRemoveBatchFile = () => {
    setBatchFile(null);
  };

  const handleSimulateUpload = () => {
    setBatchFile({
      name: 'FPT_Engineering_Roster.xlsx',
      memberCount: 28,
      isValid: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans select-none">
      {/* ======================================================== */}
      {/* 1. TOP STEPPER HEADER                                   */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-30 h-14 w-full border-b border-[#E2E8F0] bg-white px-6 flex items-center justify-between">
        {/* Left: BrandLogoMark + Platform Title */}
        <div className="flex items-center gap-3">
          <BrandLogoMark size={28} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-[#0F172A] tracking-tight">Smart Workspace</span>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-normal text-[#64748B]">
                Thiết Lập Tổ Chức & Phương Pháp Luận Doanh Nghiệp
              </span>
            </div>
          </div>
        </div>

        {/* Center: 3-Step Stepper */}
        <div className="hidden md:flex items-center gap-2">
          {/* Step 1: Done */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FDF4] border border-teal-200 text-[#0D9488] text-xs font-semibold">
            <AppIcons.verifiedCheck size={14} className="text-[#0D9488]" />
            <span>1. Định Danh Doanh Nghiệp</span>
          </div>

          <span className="text-[#CBD5E1] text-xs font-mono">—</span>

          {/* Step 2: Active */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#4F46E5] text-white text-xs font-semibold shadow-xs">
            <span className="font-mono">2</span>
            <span>Không Gian & Phương Pháp Luận</span>
          </div>

          <span className="text-[#CBD5E1] text-xs font-mono">—</span>

          {/* Step 3: Inactive */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] text-xs font-medium">
            <span className="font-mono">3</span>
            <span>Tích Hợp Git & AI Service</span>
          </div>
        </div>

        {/* Right: Save Draft + Avatar */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/projects/demo-1/kanban')}
            className="h-8 gap-1.5 text-xs text-[#0F172A] border-[#E2E8F0] hover:bg-[#F8FAFC]"
          >
            <AppIcons.bookmark size={14} className="text-[#64748B]" />
            <span>Lưu nháp & Thoát</span>
          </Button>

          <div className="h-4 w-[1px] bg-[#E2E8F0]" />

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0F172A] text-xs font-semibold text-white">
              ĐN
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-medium text-[#0F172A] leading-tight">
                Đặng Hồng Nguyên
              </span>
              <span className="block text-[10px] text-[#64748B] font-mono leading-tight">
                Workspace Admin
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTAINER                                       */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-5">
        {/* Breadcrumb & Title */}
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#4F46E5] tracking-wide mb-1">
            <AppIcons.navBacklogSrs size={13} />
            <span>BƯỚC 02 / CẤU HÌNH HỆ THỐNG</span>
          </div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Khởi Tạo Không Gian Doanh Nghiệp & Đội Ngũ
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Cấu hình tên tổ chức, lựa chọn phương pháp điều phối dự án và mời các kỹ sư vào workspace để kích hoạt tính năng tính toán đường găng CPM tự động.
          </p>
        </div>

        {/* ======================================================== */}
        {/* 3. TOP 2-COLUMN CARDS: ORG INFO & METHODOLOGY            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left: Organization Info */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-2.5">
              <AppIcons.adminOrg size={16} className="text-[#4F46E5]" />
              <span>Thông Tin Tổ Chức</span>
            </div>

            {/* Field 1: Org Name */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0F172A]">
                Tên Công Ty / Tổ Chức <span className="text-[#BE123C]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                  <AppIcons.adminOrg size={15} />
                </div>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="FPT Software Corp"
                  className="w-full h-10 rounded-md border border-[#E2E8F0] bg-white pl-9 pr-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors"
                />
              </div>
            </div>

            {/* Field 2: Slug */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0F172A]">
                Mã Định Danh Không Gian (Workspace Slug) <span className="text-[#BE123C]">*</span>
              </label>
              <div className="relative flex items-center rounded-md border border-[#E2E8F0] bg-white px-3 h-10 focus-within:border-[#4F46E5] focus-within:ring-1 focus-within:ring-[#4F46E5] transition-colors">
                <span className="font-mono text-xs text-[#64748B] select-none">https://</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="fpt-software"
                  className="flex-1 font-mono text-xs font-semibold text-[#4F46E5] outline-none px-0.5 bg-transparent"
                />
                <span className="font-mono text-xs text-[#64748B] select-none">.smartworkspace.ai</span>
                <div className="ml-2 text-[#0D9488]">
                  <AppIcons.verifiedCheck size={16} />
                </div>
              </div>
              <p className="text-[11px] text-[#64748B]">
                Đường dẫn định danh độc quyền cho toàn bộ nhân sự công ty.
              </p>
            </div>

            {/* Field 3: Team Size */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#0F172A]">
                Quy Mô Đội Ngũ Dự Kiến
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                  <AppIcons.users size={15} />
                </div>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full h-10 rounded-md border border-[#E2E8F0] bg-white pl-9 pr-8 text-xs text-[#0F172A] appearance-none focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors cursor-pointer"
                >
                  <option value="10 - 50 Kỹ sư & PM">10 - 50 Kỹ sư & PM</option>
                  <option value="50 - 200 Kỹ sư & PM">50 - 200 Kỹ sư & PM</option>
                  <option value="200+ Kỹ sư (Enterprise)">200+ Kỹ sư (Enterprise)</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                  <AppIcons.chevronDown size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Methodology Selection */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                <AppIcons.workflow size={16} className="text-[#4F46E5]" />
                <span>Phương Pháp Luận Quản Trị & Điều Phối</span>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                Chuẩn hóa AI
              </span>
            </div>

            {/* Radio Card 1: Agile Scrum Framework */}
            <button
              type="button"
              onClick={() => setMethodology('AGILE_SCRUM')}
              className={`w-full text-left p-3.5 rounded-lg border transition-all relative ${
                methodology === 'AGILE_SCRUM'
                  ? 'border-[#4F46E5] bg-[#EEF2FF]/40 ring-1 ring-[#4F46E5] shadow-xs'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-[#4F46E5] text-white flex items-center justify-center shrink-0">
                    <AppIcons.workflow size={15} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">Agile Scrum Framework</h3>
                    <p className="font-mono text-[10px] font-semibold text-[#4F46E5]">
                      Khuyên dùng cho Engineering Teams
                    </p>
                  </div>
                </div>

                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    methodology === 'AGILE_SCRUM'
                      ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {methodology === 'AGILE_SCRUM' && <AppIcons.check size={11} strokeWidth={3} />}
                </div>
              </div>

              <p className="text-[11px] text-[#334155] mt-2.5 leading-relaxed">
                Quản lý theo Sprint 2 tuần, chấm Story Points, tự động sinh biểu đồ Burn-down và hỗ trợ trợ lý Daily Standup AI phân tích tiến độ thực tế.
              </p>

              <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                <span className="font-mono text-[10px] text-[#4F46E5] bg-white px-2 py-0.5 rounded border border-indigo-200">
                  CPM Critical Path
                </span>
                <span className="font-mono text-[10px] text-[#334155] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                  Sprint Planning
                </span>
                <span className="font-mono text-[10px] text-[#334155] bg-white px-2 py-0.5 rounded border border-[#E2E8F0]">
                  Velocity Analytics
                </span>
              </div>
            </button>

            {/* Radio Card 2: Kanban Thuần */}
            <button
              type="button"
              onClick={() => setMethodology('KANBAN_FLOW')}
              className={`w-full text-left p-3.5 rounded-lg border transition-all relative ${
                methodology === 'KANBAN_FLOW'
                  ? 'border-[#4F46E5] bg-[#EEF2FF]/40 ring-1 ring-[#4F46E5] shadow-xs'
                  : 'border-[#E2E8F0] bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-md bg-slate-100 text-[#64748B] flex items-center justify-center shrink-0">
                    <AppIcons.navKanban size={15} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#0F172A]">Kanban Thuần (Continuous Flow)</h3>
                    <p className="font-mono text-[10px] text-[#64748B]">Quy trình vận hành liên tục</p>
                  </div>
                </div>

                <div
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    methodology === 'KANBAN_FLOW'
                      ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {methodology === 'KANBAN_FLOW' && <AppIcons.check size={11} strokeWidth={3} />}
                </div>
              </div>

              <p className="text-[11px] text-[#64748B] mt-2.5 leading-relaxed">
                Dòng chảy công việc liên tục, giới hạn WIP (Work in Progress), tập trung vào tối ưu Lead Time & Cycle Time cho các đội nhóm bảo trì hoặc DevOps.
              </p>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. BOTTOM CARD: INVITE ENGINEERS & TEAM MEMBERS          */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-3">
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-[#0F172A]">
                <AppIcons.users size={16} className="text-[#4F46E5]" />
                <span>Mời Kỹ Sư & Thành Viên Dự Án</span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Hệ thống sẽ gửi email kích hoạt và tự động thiết lập hồ sơ kỹ năng Elo kết nối trực tiếp với ma trận phân bổ CPM.
              </p>
            </div>

            <div className="self-start sm:self-auto font-mono text-xs font-bold text-[#0F172A] bg-slate-100 border border-slate-200 px-3 py-1 rounded-md">
              Đã chọn: <span className="text-[#4F46E5]">{totalMembers} thành viên</span>
            </div>
          </div>

          {/* 2 Sub-Columns: Batch Upload vs Manual Input */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Method 1: Batch File Upload */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                CÁCH 1: TẢI FILE DANH SÁCH HÀNG LOẠT
              </span>

              {/* Dashed dropzone */}
              <div
                onClick={handleSimulateUpload}
                className="rounded-lg border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center cursor-pointer hover:border-[#4F46E5] hover:bg-indigo-50/20 transition-all"
              >
                <div className="h-10 w-10 mx-auto rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-2">
                  <AppIcons.uploadCloud size={20} />
                </div>
                <p className="text-xs font-semibold text-[#0F172A]">
                  Kéo thả file danh sách (.csv, .xlsx) hoặc <span className="text-[#4F46E5] underline">Bấm để tải lên</span>
                </p>
                <p className="text-[11px] text-[#64748B] mt-1">
                  Dung lượng tối đa 15MB • Hỗ trợ ánh xạ cột tự động
                </p>

                <a
                  href="#download-sample"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Đang tải file mẫu: danh_sach_nhan_su.csv');
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-[#4F46E5] hover:underline mt-2.5"
                >
                  <AppIcons.download size={12} />
                  <span>Tải file mẫu danh_sach_nhan_su.csv</span>
                </a>
              </div>

              {/* Uploaded file preview card */}
              {batchFile && (
                <div className="flex items-center justify-between p-3 rounded-md border border-[#E2E8F0] bg-white shadow-xs">
                  <div className="flex items-center gap-2.5 truncate">
                    <AppIcons.fileSpreadsheet size={18} className="text-[#0D9488] shrink-0" />
                    <div className="truncate">
                      <span className="font-mono text-xs font-bold text-[#0F172A] truncate">
                        {batchFile.name}
                      </span>
                      <span className="font-mono text-[11px] text-[#64748B] ml-2">
                        ({batchFile.memberCount} thành viên)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] font-semibold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                      Hợp lệ
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveBatchFile}
                      className="p-1 rounded text-[#64748B] hover:text-[#BE123C] hover:bg-rose-50"
                      aria-label="Xóa file"
                    >
                      <AppIcons.close size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Method 2: Manual Email Input */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider block">
                CÁCH 2: NHẬP EMAIL THỦ CÔNG
              </span>

              {/* Form row */}
              <form onSubmit={handleAddMember} className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                    <AppIcons.mail size={14} />
                  </div>
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    placeholder="engineer@fpt.com..."
                    className="w-full h-9 rounded-md border border-[#E2E8F0] bg-white pl-8 pr-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors font-mono"
                  />
                </div>

                <select
                  value={inputRole}
                  onChange={(e) => setInputRole(e.target.value as MemberRole)}
                  className="h-9 rounded-md border border-[#E2E8F0] bg-white px-2.5 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5] transition-colors cursor-pointer"
                >
                  <option value="MEMBER">Thành viên (Member)</option>
                  <option value="LEADER">Trưởng nhóm (Leader)</option>
                </select>

                <Button
                  type="submit"
                  size="sm"
                  className="h-9 px-3 gap-1 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shrink-0"
                >
                  <AppIcons.plus size={14} />
                  <span>Thêm</span>
                </Button>
              </form>

              {/* Members List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-2 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] text-xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className="text-[#64748B]">
                        {member.role === 'LEADER' ? (
                          <AppIcons.userCheck size={14} className="text-[#4F46E5]" />
                        ) : (
                          <AppIcons.user size={14} />
                        )}
                      </div>
                      <span className="font-mono text-xs text-[#0F172A] truncate">
                        {member.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleRole(member.id)}
                        className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border transition-colors ${
                          member.role === 'LEADER'
                            ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                            : 'bg-white text-[#64748B] border-[#CBD5E1] hover:text-[#0F172A]'
                        }`}
                      >
                        {member.role === 'LEADER' ? 'Trưởng nhóm (Leader)' : 'Thành viên (Member)'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1 rounded text-[#64748B] hover:text-[#BE123C] hover:bg-rose-50"
                        aria-label="Xóa thành viên"
                      >
                        <AppIcons.close size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. FOOTER ACTION BAR                                    */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* RBAC Lock Security Notice */}
          <div className="flex items-center gap-2 text-xs text-[#0F172A]">
            <div className="h-6 w-6 rounded bg-emerald-50 text-[#0D9488] flex items-center justify-center shrink-0 border border-teal-200">
              <AppIcons.lock size={13} />
            </div>
            <span className="text-[#334155]">
              Quyền truy cập RBAC cấp doanh nghiệp được áp dụng tự động cho toàn bộ lời mời.
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/auth')}
              className="h-9 gap-1.5 text-xs font-semibold text-[#64748B] border-[#E2E8F0] hover:bg-[#F8FAFC]"
            >
              <AppIcons.arrowLeft size={14} />
              <span>Quay Lại</span>
            </Button>

            <Button
              onClick={() => {
                localStorage.setItem('workspace_mode', 'ENTERPRISE');
                navigate('/ai-decompose/ingest');
              }}
              className="h-9 gap-2 text-xs font-semibold bg-[#4F46E5] hover:bg-indigo-700 text-white shadow-xs"
            >
              <span>Hoàn Tất Thiết Lập &amp; Vào Không Gian</span>
              <AppIcons.arrowRight size={14} />
            </Button>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="mt-auto border-t border-[#E2E8F0] bg-white py-3 px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#64748B]">
        <div>
          © 2025 Smart Workspace Platform. Toàn bộ thiết lập được mã hoá theo chuẩn doanh nghiệp.
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <AppIcons.shield size={13} className="text-[#0D9488]" />
            <span>Bảo mật AES-256</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <AppIcons.support size={13} className="text-[#4F46E5]" />
            <span>Hỗ trợ kỹ thuật</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default EnterpriseOnboardingPage;
