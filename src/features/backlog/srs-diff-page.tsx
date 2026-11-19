import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const SrsDiffPage: React.FC = () => {
  const navigate = useNavigate();

  const handleApproveChanges = () => {
    navigate('/dag-gantt?view=dag');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header & Thẻ So Sánh Phiên Bản */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Đánh Giá Tác Động Thay Đổi Yêu Cầu (SRS Diff &amp; CPM)
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            So sánh trực quan phiên bản đặc tả kỹ thuật và mô phỏng biến động dây chuyền lên đường găng dự án.
          </p>
        </div>

        {/* Luồng phiên bản */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white p-2 shadow-2xs font-mono text-xs">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#F1F5F9] text-[#475569]">
            <AppIcons.docWord size={13} className="text-[#64748B]" />
            <span>Baseline: SRS_Specs_v1.0.pdf</span>
          </div>
          <span className="text-[#94A3B8]">&rarr;</span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] font-semibold">
            <AppIcons.docWord size={13} className="text-[#4F46E5]" />
            <span>Bản Cập Nhật: SRS_Specs_v2.0.pdf</span>
          </div>
        </div>
      </div>

      {/* Khối Báo Cáo Đánh Giá Tác Động Từ AI Synthesizer (3 KPI Cards) */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
            <AppIcons.navAiDecompose size={16} className="text-[#4F46E5]" />
            <span>Báo Cáo Đánh Giá Tác Động Tự Động Từ AI Synthesizer</span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C] animate-pulse" />
            CẢNH BÁO TRỄ HẠN BÀN GIAO
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Cột 1 */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase text-[#64748B]">
              BIẾN ĐỘNG KHỐI LƯỢNG WBS
            </div>
            <div className="font-mono text-2xl font-bold text-[#0F172A] flex items-baseline gap-2">
              <span>+3 Task Mới</span>
              <span className="text-xs font-normal text-[#64748B]">Tổng +32 Giờ công</span>
            </div>
            <p className="text-[11px] text-[#64748B] pt-1">
              Phát sinh 1 nhánh phụ thuộc mới nối trực tiếp vào nút <strong className="text-[#0F172A]">#TASK-04</strong>.
            </p>
          </div>

          {/* Cột 2 (Highlight viền đỏ) */}
          <div className="rounded-lg border border-[#FFE4E6] bg-[#FFF1F2]/40 p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase text-[#BE123C]">
              ĐỘ DÀI ĐƯỜNG GĂNG CPM
            </div>
            <div className="font-mono text-2xl font-bold text-[#BE123C]">
              +4 Ngày <span className="text-xs font-normal opacity-80">(184h &rarr; 216h)</span>
            </div>
            <p className="text-[11px] text-[#BE123C]/90 pt-1">
              Chuỗi đường găng mở rộng thêm 2 nút trọng yếu mới (#TASK-15, #TASK-16).
            </p>
          </div>

          {/* Cột 3 (Highlight viền đỏ) */}
          <div className="rounded-lg border border-[#FFE4E6] bg-[#FFF1F2]/40 p-4 space-y-1">
            <div className="text-[11px] font-bold uppercase text-[#BE123C]">
              DỰ BÁO NGUY CƠ BÀN GIAO
            </div>
            <div className="font-mono text-2xl font-bold text-[#BE123C]">
              Trễ Hạn 4 Ngày <span className="text-xs font-normal opacity-80">(22/12/2026)</span>
            </div>
            <p className="text-[11px] text-[#BE123C]/90 pt-1">
              Vượt quá mốc bảo vệ đồ án 18/12/2026 nếu không tái phân bổ nhân sự.
            </p>
          </div>
        </div>
      </div>

      {/* Bảng So Sánh Diff 2 Cột */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
        {/* Header 2 Cột */}
        <div className="grid grid-cols-2 border-b border-[#E2E8F0] bg-[#F8FAFC] py-2.5 px-4 font-mono text-[11px] font-bold text-[#64748B]">
          <div className="flex items-center justify-between pr-4 border-r border-[#E2E8F0]">
            <span>PHIÊN BẢN GỐC — SRS V1.0 (BASELINE)</span>
            <span className="text-slate-400 font-normal">commit #a4f89b</span>
          </div>
          <div className="flex items-center justify-between pl-4">
            <span>PHIÊN BẢN MỚI — SRS V2.0 (DELTA CHANGES)</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-indigo-50 text-[#4F46E5] font-semibold">
              DELTA DETECTED
            </span>
          </div>
        </div>

        {/* Nội dung So Sánh */}
        <div className="divide-y divide-[#E2E8F0] text-xs">
          {/* Row 1: FR-04 */}
          <div className="grid grid-cols-2 divide-x divide-[#E2E8F0]">
            {/* V1.0 */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F1F5F9] text-[#475569]">
                  FR-04
                </span>
                <span className="font-semibold text-[#0F172A]">Xác Thực Người Dùng Cơ Bản</span>
              </div>
              <p className="text-[#64748B] leading-relaxed">
                Hệ thống hỗ trợ đăng nhập cơ bản bằng Email/Password và duy trì phiên làm việc JWT tiêu chuẩn.
              </p>
            </div>

            {/* V2.0 (ĐÃ CĂN LỀ TRÁI CHUẨN XÁC THEO CHỈ THỊ) */}
            <div className="p-4 space-y-2 bg-indigo-50/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EEF2FF] text-[#4F46E5]">
                    FR-04 [SỬA ĐỔI]
                  </span>
                  <span className="font-semibold text-[#0F172A]">Xác Thực Nâng Cao Đa Yếu Tố</span>
                </div>
                <span className="font-mono text-[11px] text-[#4F46E5] font-semibold">
                  +12h • #TASK-15
                </span>
              </div>
              <div className="rounded-md border border-[#C7D2FE] bg-[#EEF2FF] p-2.5 text-xs text-[#1E1B4B] leading-relaxed">
                bổ sung xác thực 2 lớp (2FA TOTP) và đồng bộ OAuth2 Google Workspace.
              </div>
            </div>
          </div>

          {/* Row 2: FR-15 CPM Critical */}
          <div className="grid grid-cols-2 divide-x divide-[#E2E8F0]">
            {/* V1.0: Không tồn tại */}
            <div className="p-4 flex items-center justify-center font-mono text-[11px] text-slate-400 italic">
              — Không tồn tại trong đặc tả v1.0 —
            </div>

            {/* V2.0: Thêm mới CPM Critical */}
            <div className="p-4 space-y-2 bg-[#FFF1F2]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                    FR-15 [THÊM MỚI • CPM CRITICAL]
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#BE123C] font-bold">
                  +16h • #TASK-16
                </span>
              </div>
              <p className="font-semibold text-[#0F172A] leading-snug">
                Tích hợp Webhook đẩy cảnh báo xung đột lịch thời gian thực sang ứng dụng Telegram/Slack của từng thành viên.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#BE123C]">
                <AppIcons.criticalAlert size={12} />
                <span>Tác vụ trọng yếu nằm trên Đường Găng (Slack = 0)</span>
              </div>
            </div>
          </div>

          {/* Row 3: FR-16 */}
          <div className="grid grid-cols-2 divide-x divide-[#E2E8F0]">
            {/* V1.0: Không tồn tại */}
            <div className="p-4 flex items-center justify-center font-mono text-[11px] text-slate-400 italic">
              — Không tồn tại trong đặc tả v1.0 —
            </div>

            {/* V2.0 */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F1F5F9] text-[#475569]">
                    FR-16 [THÊM MỚI]
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F0FDFA] border border-[#99F6E4] text-[#0D9488]">
                    SLACK: 8H
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B]">
                  +4h • #TASK-17
                </span>
              </div>
              <p className="text-[#0F172A] leading-relaxed">
                Xuất báo cáo tiến độ WBS định dạng PDF có đính kèm chữ ký số xác nhận của giảng viên hướng dẫn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Phê Duyệt */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <AppIcons.navDagGantt size={16} className="text-[#4F46E5] shrink-0" />
          <span>
            Việc phê duyệt sẽ tự động chèn 3 node mới và tính toán lại toàn bộ chuỗi đường găng trên Đồ thị DAG.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/backlog')}
            className="h-9 text-xs border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
          >
            Từ Chối Bản v2.0
          </Button>

          <Button
            onClick={handleApproveChanges}
            className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
          >
            <AppIcons.verifiedCheck size={14} />
            <span>Phê duyệt thay đổi &amp; Tự động cập nhật lại đồ thị DAG</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SrsDiffPage;
