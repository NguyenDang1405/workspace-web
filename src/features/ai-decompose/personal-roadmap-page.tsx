import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const PersonalRoadmapPage: React.FC = () => {
  const navigate = useNavigate();

  const handleActivateToCalendar = () => {
    navigate('/calendar');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
          Kích Hoạt Lộ Trình Học Tập &amp; Làm Đồ Án Cá Nhân
        </h1>
        <p className="text-xs text-[#64748B] mt-1">
          Kế hoạch đã được AI phân rã và sắp xếp tối ưu vào 26 giờ rảnh trong tuần của bạn. Toàn bộ công việc sẽ tự động chuyển vào Lịch biểu thích ứng.
        </p>
      </div>

      {/* Hàng 3 Thẻ KPI Tổng Quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1 */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            TỔNG SỐ ĐẦU VIỆC
          </span>
          <div className="my-2">
            <span className="font-mono text-3xl font-bold text-[#0F172A]">24</span>
            <span className="text-sm font-semibold text-[#0F172A] ml-2">Tác Vụ</span>
          </div>
          <div>
            <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
              4 Giai đoạn WBS
            </span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            NGÀY DỰ KIẾN VỀ ĐÍCH
          </span>
          <div className="my-2">
            <span className="font-mono text-3xl font-bold text-[#4F46E5]">18/12/2026</span>
          </div>
          <div>
            <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F0FDF4] text-[#0D9488] border border-[#CCFBF1]">
              Sớm hơn hạn nộp 7 ngày
            </span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            THỜI GIAN TỰ HỌC TRUNG BÌNH
          </span>
          <div className="my-2">
            <span className="font-mono text-3xl font-bold text-[#0F172A]">16.5h</span>
            <span className="text-sm font-semibold text-[#64748B] ml-1">/ Tuần</span>
          </div>
          <div>
            <span className="inline-flex px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-indigo-50 text-[#4F46E5] border border-indigo-100">
              Khớp 100% mục tiêu cá nhân
            </span>
          </div>
        </div>
      </div>

      {/* Khối Lộ Trình Các Giai Đoạn Trọng Yếu (Milestone Roadmap) */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#0F172A]">
          Lộ Trình Các Giai Đoạn Trọng Yếu (Milestone Roadmap)
        </h2>

        {/* 4 Thanh Giai Đoạn */}
        <div className="space-y-3">
          {/* Giai đoạn 1 */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/50 p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                GIAI ĐOẠN 1
              </span>
              <span className="text-xs font-bold text-[#0F172A]">
                Bóc Tách &amp; Thiết Kế Kiến Trúc Hệ Thống
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">
                Tuần 1 - Tuần 2 (10/11 - 24/11)
              </span>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="font-mono text-xs text-[#64748B]">6 Tác vụ • 32 Giờ</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                Đã Xếp Vào Giờ Rảnh
              </span>
            </div>
          </div>

          {/* Giai đoạn 2 (ĐƯỜNG GĂNG CPM: Highlight Rose Crimson) */}
          <div className="rounded-lg border border-[#FFE4E6] bg-[#FFF1F2] p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFE4E6] text-[#BE123C]">
                GIAI ĐOẠN 2
              </span>
              <span className="text-xs font-bold text-[#0F172A]">
                Hiện Thực Hóa Thuật Toán Lõi DAG
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white border border-[#FFE4E6] text-[#BE123C]">
                ĐƯỜNG GĂNG CPM
              </span>
              <span className="text-[11px] font-mono text-[#BE123C]/80">
                Tuần 3 - Tuần 5 (25/11 - 15/12)
              </span>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="font-mono text-xs font-semibold text-[#BE123C]">10 Tác vụ • 54 Giờ</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-white border border-[#FFE4E6] text-[#BE123C]">
                Đã Xếp Vào Giờ Rảnh
              </span>
            </div>
          </div>

          {/* Giai đoạn 3 */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/50 p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                GIAI ĐOẠN 3
              </span>
              <span className="text-xs font-bold text-[#0F172A]">
                Tích Hợp Giao Diện Mobile &amp; Test Case
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">
                Tuần 6 (16/12 - 22/12)
              </span>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="font-mono text-xs text-[#64748B]">5 Tác vụ • 24 Giờ</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                Đã Xếp Vào Giờ Rảnh
              </span>
            </div>
          </div>

          {/* Giai đoạn 4 */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]/50 p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F1F5F9] border border-[#E2E8F0] text-[#475569]">
                GIAI ĐOẠN 4
              </span>
              <span className="text-xs font-bold text-[#0F172A]">
                Hoàn Thiện Báo Cáo &amp; Slide Bảo Vệ
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">
                Tuần 7 (23/12 - 30/12)
              </span>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="font-mono text-xs text-[#64748B]">3 Tác vụ • 14 Giờ</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Sẵn Sàng Nghiệm Thu
              </span>
            </div>
          </div>
        </div>

        {/* Thanh Đồng Bộ Lịch Cá Nhân */}
        <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs text-[#0F172A]">
            <div className="h-7 w-7 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
              <AppIcons.calendar size={15} />
            </div>
            <span className="font-medium">
              Đồng bộ hóa 2 chiều với Google Calendar (
              <strong className="text-[#4F46E5] font-mono font-normal">
                nguyen.dang@university.edu.vn
              </strong>
              )
            </span>
          </div>

          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-white border border-[#E2E8F0] text-[#475569]">
            Tự động khóa khung giờ học cố định
          </span>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-[#0D9488]">
          <AppIcons.verifiedCheck size={16} />
          <span>
            Không cần phê duyệt từ bên thứ ba. Kế hoạch này là của riêng bạn và sẵn sàng thực thi.
          </span>
        </div>

        <Button
          onClick={handleActivateToCalendar}
          className="h-9 px-5 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
        >
          <span>Kích Hoạt Vào Lịch Biểu Của Tôi</span>
          <AppIcons.arrowRight size={14} />
        </Button>
      </div>
    </div>
  );
};

export default PersonalRoadmapPage;
