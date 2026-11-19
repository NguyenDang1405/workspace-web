import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const AdaptiveCalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');

  const handleResolveConflict = () => {
    navigate('/calendar/conflicts');
  };

  return (
    <div className="space-y-5 max-w-[1520px] mx-auto pb-12">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Lịch Biểu Dự Án &amp; Thời Khóa Biểu Thích Ứng
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Các khối công việc được AI tự động lấp đầy vào các khoảng trống rảnh (FREE_TIME) sau khi né giờ học cố định.
          </p>
        </div>

        {/* View Switcher, Tuần & Đồng bộ */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F1F5F9] p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded transition-colors ${
                viewMode === 'week'
                  ? 'bg-white text-[#4F46E5] font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Tuần (Week)
            </button>
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`px-3 py-1.5 rounded transition-colors ${
                viewMode === 'month'
                  ? 'bg-white text-[#4F46E5] font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Tháng (Month)
            </button>
          </div>

          <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-mono font-medium text-[#0F172A] shadow-2xs">
            <button type="button" className="text-[#64748B] hover:text-[#0F172A]">
              &lt;
            </button>
            <span>10/11 - 16/11/2026 (Tuần 11)</span>
            <button type="button" className="text-[#64748B] hover:text-[#0F172A]">
              &gt;
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 gap-1.5 shadow-2xs"
          >
            <AppIcons.calendar size={13} className="text-[#4F46E5]" />
            <span>Đồng bộ Google Calendar</span>
          </Button>
        </div>
      </div>

      {/* Legend Chú Thích Màu & Banner Cảnh Báo Xung Đột */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        {/* 4 Nhóm màu */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300 border border-slate-400" />
            <span className="text-[#475569]">Lịch Cố Định (BUSY_CLASS)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4F46E5]" />
            <span className="text-[#4F46E5] font-medium">Task AI Tự Động Phân Bổ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#BE123C]" />
            <span className="text-[#BE123C] font-semibold">Xung Đột / Quá Hạn Đường Găng</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#0D9488]" />
            <span className="text-[#0D9488]">Khung Rảnh Dự Phòng (Slack Time)</span>
          </div>
        </div>

        {/* Banner Xung Đột - ĐÃ XÓA (Frame 15B) & KÝ TỰ LỖI THEO CHỈ THỊ */}
        <div className="flex items-center gap-2 rounded-md border border-[#FFE4E6] bg-[#FFF1F2] px-3 py-1.5 text-xs text-[#BE123C]">
          <AppIcons.criticalAlert size={14} className="shrink-0" />
          <span>Phát hiện 1 Xung Đột Lịch: Thi Giữa Kỳ đè lên #TASK-01</span>
          <button
            type="button"
            onClick={handleResolveConflict}
            className="font-bold underline hover:opacity-80 ml-1 inline-flex items-center gap-1"
          >
            <span>Xử lý ngay</span>
            <AppIcons.arrowRight size={12} />
          </button>
        </div>
      </div>

      {/* Lưới Lịch Tuần (Weekly Grid) */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
        {/* Header 7 Ngày */}
        <div className="grid grid-cols-8 border-b border-[#E2E8F0] bg-[#F8FAFC] text-center font-mono text-xs text-[#64748B]">
          <div className="py-2.5 border-r border-[#E2E8F0] font-bold text-[#0F172A]">GIỜ</div>
          <div className="py-2.5 border-r border-[#E2E8F0]">
            <div>Thứ 2</div>
            <div className="font-bold text-[#0F172A] mt-0.5">10/11</div>
          </div>
          <div className="py-2.5 border-r border-[#E2E8F0]">
            <div>Thứ 3</div>
            <div className="font-bold text-[#0F172A] mt-0.5">11/11</div>
          </div>
          <div className="py-2.5 border-r border-[#E2E8F0] bg-[#EEF2FF]/60 text-[#4F46E5] font-bold">
            <div className="text-[10px] uppercase font-sans tracking-wide">HÔM NAY</div>
            <div className="mt-0.5">Thứ 4 (12/11)</div>
          </div>
          <div className="py-2.5 border-r border-[#E2E8F0]">
            <div>Thứ 5</div>
            <div className="font-bold text-[#0F172A] mt-0.5">13/11</div>
          </div>
          <div className="py-2.5 border-r border-[#E2E8F0]">
            <div>Thứ 6</div>
            <div className="font-bold text-[#0F172A] mt-0.5">14/11</div>
          </div>
          <div className="py-2.5 border-r border-[#E2E8F0]">
            <div>Thứ 7</div>
            <div className="font-bold text-[#0F172A] mt-0.5">15/11</div>
          </div>
          <div className="py-2.5 text-rose-600">
            <div>Chủ Nhật</div>
            <div className="font-bold mt-0.5">16/11</div>
          </div>
        </div>

        {/* Thân Lưới Giờ */}
        <div className="grid grid-cols-8 divide-x divide-[#E2E8F0] text-xs min-h-[580px] relative font-mono">
          {/* Cột trục giờ */}
          <div className="divide-y divide-[#E2E8F0] bg-[#F8FAFC] text-[11px] text-[#64748B] text-center">
            <div className="h-24 flex items-center justify-center">08:00</div>
            <div className="h-24 flex items-center justify-center">10:00</div>
            <div className="h-24 flex items-center justify-center">12:00</div>
            <div className="h-24 flex items-center justify-center">14:00</div>
            <div className="h-24 flex items-center justify-center">16:00</div>
            <div className="h-24 flex items-center justify-center">18:00</div>
            <div className="h-24 flex items-center justify-center">20:00</div>
          </div>

          {/* Cột Thứ 2 */}
          <div className="p-2 relative">
            <div className="rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] p-3 text-slate-700 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#475569]">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                BUSY_CLASS
              </div>
              <div className="font-semibold text-xs text-[#0F172A] leading-snug">
                Kiến Trúc Phần Mềm (Học tại H6-204)
              </div>
              <div className="text-[11px] text-[#64748B]">08:00 - 11:30</div>
            </div>
          </div>

          {/* Cột Thứ 3 */}
          <div className="p-2 relative pt-72">
            <div className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-3 text-[#4F46E5] space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>AI ALLOCATED</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
              </div>
              <div className="font-semibold text-xs text-[#0F172A] leading-snug">
                #TASK-08: Cấu hình Docker &amp; vLLM inference
              </div>
              <div className="text-[10px] text-[#4F46E5] bg-white/70 px-1.5 py-0.5 rounded w-fit">
                Khớp Slot Rảnh AI
              </div>
              <div className="text-[11px] text-[#64748B]">14:00 - 17:30 • 3.5h</div>
            </div>
          </div>

          {/* Cột Thứ 4 (HÔM NAY - KHỐI XUNG ĐỘT) */}
          <div className="p-2 relative bg-[#EEF2FF]/15 pt-72">
            <div
              onClick={handleResolveConflict}
              className="rounded-lg border-2 border-dashed border-[#BE123C] bg-[#FFF1F2] p-3 text-[#BE123C] space-y-2 shadow-xs cursor-pointer hover:bg-rose-100/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-bold">
                  <AppIcons.criticalAlert size={13} />
                  <span>XUNG ĐỘT PHÁT HIỆN</span>
                </div>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#BE123C] text-white">
                  Trùng 2.5h
                </span>
              </div>

              <div className="text-xs font-semibold leading-snug text-[#0F172A]">
                Thi Giữa Kỳ (13:30) vs #TASK-01 CPM Critical (14:00)
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-[#BE123C] underline">
                <span>Nhấp để giải quyết xung đột</span>
                <AppIcons.arrowRight size={12} />
              </div>

              <div className="text-[10px] text-[#64748B] pt-0.5 border-t border-[#FFE4E6]">
                13:30 - 17:00 (Giao nhau)
              </div>
            </div>
          </div>

          {/* Cột Thứ 5 */}
          <div className="p-2 relative">
            <div className="h-full flex items-center justify-center text-[11px] text-slate-300">
              Trống
            </div>
          </div>

          {/* Cột Thứ 6 */}
          <div className="p-2 relative space-y-36">
            <div className="rounded-lg border border-[#CBD5E1] bg-[#F1F5F9] p-3 text-slate-700 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#475569]">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
                BUSY_CLASS
              </div>
              <div className="font-semibold text-xs text-[#0F172A] leading-snug">
                Kiến Trúc Phần Mềm (Học tại H6-204)
              </div>
              <div className="text-[11px] text-[#64748B]">08:00 - 11:30</div>
            </div>

            <div className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] p-3 text-[#4F46E5] space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>TASK AI TỰ ĐỘNG</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
              </div>
              <div className="font-semibold text-xs text-[#0F172A] leading-snug">
                #TASK-11: Thiết lập pipeline CI/CD kiểm thử
              </div>
              <div className="text-[11px] text-[#64748B]">18:30 - 21:00 (Night Shift)</div>
            </div>
          </div>

          {/* Cột Thứ 7 (Slack Buffer) */}
          <div className="p-2 relative">
            <div className="rounded-lg border border-[#99F6E4] bg-[#F0FDFA] p-3 text-[#0D9488] space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
                SLACK BUFFER
              </div>
              <div className="font-semibold text-xs text-[#0F172A] leading-snug">
                Khung Rảnh Dự Phòng (Slack Time Buffer)
              </div>
              <p className="text-[10px] text-[#64748B] leading-tight">
                Sẵn sàng đón task dời từ Thứ 4
              </p>
              <div className="text-[11px] text-[#0D9488] font-bold mt-1">08:30 - 11:00</div>
            </div>
          </div>

          {/* Cột Chủ Nhật */}
          <div className="p-2 relative bg-slate-50/50">
            <div className="h-full flex items-center justify-center text-[11px] text-slate-400">
              Nghỉ ngơi cuối tuần
            </div>
          </div>
        </div>
      </div>

      {/* Footer Summary Bar */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#64748B]">
          <AppIcons.clock size={14} className="text-[#4F46E5]" />
          <span>
            Tổng thời gian đã lên lịch trong tuần:{' '}
            <strong className="font-mono text-[#0F172A] font-bold">28.5 Giờ</strong>{' '}
            (Giờ học: 12h • Task đồ án AI: 16.5h)
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#F0FDFA] border border-[#99F6E4] text-xs font-medium text-[#0D9488]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
          <span>Mức tải tuần: <strong className="font-mono font-bold">78%</strong> (Tối ưu, còn 7.5h rảnh dự phòng)</span>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveCalendarPage;
