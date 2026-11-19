import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const ConflictMatrixPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'A' | 'B' | 'C'>('A');

  const handleApplySolution = () => {
    navigate('/calendar');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Phát Hiện Xung Đột Lịch &amp; Đề Xuất Điều Chỉnh Tự Động
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Thuật toán phát hiện sự kiện đột xuất đè lên tác vụ đường găng CPM và đã tính toán sẵn 3 kịch bản cứu vãn.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FFF1F2] border border-[#FFE4E6] text-xs font-mono font-bold text-[#BE123C] shrink-0">
          <AppIcons.criticalAlert size={13} />
          <span>1 XUNG ĐỘT TRỌNG YẾU</span>
        </div>
      </div>

      {/* Thẻ Đối Chiếu Xung Đột (2 Cột) */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột Trái: Sự Kiện Cố Định */}
        <div className="space-y-3 border-b md:border-b-0 md:border-r border-[#E2E8F0] pb-4 md:pb-0 md:pr-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#475569] uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-slate-400" />
            <span>SỰ KIỆN CỐ ĐỊNH (BUSY_CLASS)</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
              Thi Giữa Kỳ: Mạng Máy Tính &amp; An Toàn Thông Tin
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <AppIcons.clock size={13} className="text-[#94A3B8]" />
              <span>Thứ 4, 12/11/2026 • 13:30 - 16:30 (3 giờ)</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B] pt-2">
            <AppIcons.calendar size={12} className="text-[#4F46E5]" />
            <span>Đồng bộ từ Lịch Nhà Trường / Google Calendar</span>
          </div>
        </div>

        {/* Cột Phải: CPM Critical Task */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#BE123C] uppercase tracking-wide">
            <span className="h-2 w-2 rounded-full bg-[#BE123C]" />
            <span>CPM CRITICAL TASK</span>
          </div>

          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#0F172A] leading-snug">
              #TASK-01: Hiện thực hóa thuật toán tính toán đường găng DAG CPM
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-[#BE123C] font-semibold">
              <AppIcons.clock size={13} />
              <span>14:00 - 18:00 (Trùng 2.5 giờ)</span>
            </div>
            <div className="text-[11px] font-mono text-[#64748B]">
              Phụ trách: <strong>Đặng Hồng Nguyên</strong>
            </div>
          </div>

          <div className="rounded-md border border-[#FFE4E6] bg-[#FFF1F2] p-2.5 flex items-start gap-2 text-[11px] text-[#BE123C] leading-relaxed">
            <AppIcons.criticalAlert size={14} className="shrink-0 mt-0.5" />
            <span>Rủi ro làm trễ toàn bộ chuỗi đường găng đồ án thêm 1.5 ngày nếu không xử lý.</span>
          </div>
        </div>
      </div>

      {/* 3 Phương Án Khắc Phục Tối Ưu */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider">
          3 Phương Án Khắc Phục Tối Ưu Từ AI Synthesizer (Chọn 1 phương án):
        </h2>

        {/* Phương Án A (Khuyến nghị) */}
        <div
          onClick={() => setSelectedPlan('A')}
          className={`rounded-lg border bg-white p-4 cursor-pointer transition-all ${
            selectedPlan === 'A'
              ? 'border-[#4F46E5] ring-1 ring-[#4F46E5]/40 shadow-xs'
              : 'border-[#E2E8F0] hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2.5">
              <div
                className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'A'
                    ? 'border-[#4F46E5] bg-[#4F46E5]'
                    : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {selectedPlan === 'A' && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">
                Phương Án A: Dời Sang Khung Rảnh Cuối Tuần
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
              KHUYẾN NGHỊ (AI SCORE: 98%)
            </span>
          </div>

          <p className="text-xs text-[#64748B] pl-6 leading-relaxed">
            Tự động dời 2.5h bị xung đột sang slot rảnh Thứ 7 (14/11 • 08:30 - 11:00). Giữ nguyên người làm và hạn chót giao đồ án.
          </p>

          <div className="flex items-center gap-2 pl-6 mt-2.5 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488] font-medium">
              ✓ Tác động hạn chót: 0 ngày
            </span>
            <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
              Tải cá nhân: +2.5h cuối tuần
            </span>
          </div>
        </div>

        {/* Phương Án B */}
        <div
          onClick={() => setSelectedPlan('B')}
          className={`rounded-lg border bg-white p-4 cursor-pointer transition-all ${
            selectedPlan === 'B'
              ? 'border-[#4F46E5] ring-1 ring-[#4F46E5]/40 shadow-xs'
              : 'border-[#E2E8F0] hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2.5">
              <div
                className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'B'
                    ? 'border-[#4F46E5] bg-[#4F46E5]'
                    : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {selectedPlan === 'B' && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">
                Phương Án B: Tái Phân Bổ Task Cho Kỹ Sư Tương Đương Elo
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
              ĐỘ PHÙ HỢP: 89%
            </span>
          </div>

          <p className="text-xs text-[#64748B] pl-6 leading-relaxed">
            Chuyển giao task cho Tuấn Lê (Elo Backend: 1,680 - gần tương đương Nguyên 1,745). Tuấn Lê đang rảnh 14h và có cùng stack FastAPI/Graph.
          </p>

          <div className="flex items-center gap-2 pl-6 mt-2.5 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
              Người nhận mới: Tuấn Lê
            </span>
            <span className="px-2 py-0.5 rounded bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488] font-medium">
              Tác động hạn chót: 0 ngày
            </span>
          </div>
        </div>

        {/* Phương Án C - ĐÃ CHUẨN HÓA MÀU SẮC THEO CHỈ THỊ (Đổi sang Rose Crimson) */}
        <div
          onClick={() => setSelectedPlan('C')}
          className={`rounded-lg border bg-white p-4 cursor-pointer transition-all ${
            selectedPlan === 'C'
              ? 'border-[#4F46E5] ring-1 ring-[#4F46E5]/40 shadow-xs'
              : 'border-[#E2E8F0] hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2.5">
              <div
                className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'C'
                    ? 'border-[#4F46E5] bg-[#4F46E5]'
                    : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {selectedPlan === 'C' && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
              </div>
              <h3 className="text-xs font-bold text-[#0F172A]">
                Phương Án C: Kích Hoạt Độ Trôi (Slack Time Buffer)
              </h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
              TIÊU THỤ: 60% SLACK
            </span>
          </div>

          <p className="text-xs text-[#64748B] pl-6 leading-relaxed">
            Sử dụng 2.5h trong tổng số 4.0h Slack Time dự phòng của module trước khi đụng mốc Critical Finish. Không cần dời lịch cuối tuần.
          </p>

          <div className="flex items-center gap-2 pl-6 mt-2.5 text-[11px] font-mono">
            <span className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
              Slack còn lại: 1.5h
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C] font-semibold">
              Rủi ro: Đệm an toàn giảm
            </span>
          </div>
        </div>
      </div>

      {/* Footer Hành Động */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <AppIcons.verifiedCheck size={15} className="text-[#0D9488]" />
          <span>
            Lựa chọn sẽ tự động cập nhật lại các node trên Đồ thị DAG và gửi thông báo tới Google Calendar.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/calendar')}
            className="h-9 text-xs border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
          >
            Bỏ Qua / Tự Xử Lý Sau
          </Button>

          <Button
            onClick={handleApplySolution}
            className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
          >
            <span>Áp Dụng Phương Án Đã Chọn</span>
            <AppIcons.arrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConflictMatrixPage;
