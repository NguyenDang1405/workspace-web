import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons, BrandLogoMark } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

// Brush Modes
export type BrushMode = 'BUSY_CLASS' | 'FREE_TIME' | 'REST';

// Cell Status
export type CellStatus = 'BUSY_CLASS' | 'FREE_TIME' | 'REST' | 'EMPTY';

export interface ScheduleCell {
  dayIndex: number; // 0: Thứ 2 -> 6: Chủ Nhật
  slotIndex: number; // 0 -> 5
  status: CellStatus;
  label?: string;
  subLabel?: string;
  durationHours: number;
}

const DAYS = [
  { name: 'Thứ 2', date: '24/02', isToday: false },
  { name: 'Thứ 3 (Hôm nay)', date: '25/02', isToday: true },
  { name: 'Thứ 4', date: '26/02', isToday: false },
  { name: 'Thứ 5', date: '27/02', isToday: false },
  { name: 'Thứ 6', date: '28/02', isToday: false },
  { name: 'Thứ 7', date: '01/03', isToday: false },
  { name: 'Chủ Nhật', date: '02/03', isToday: false, isSunday: true },
];

const TIME_SLOTS = [
  { time: '07:00 - 09:00', label: 'Ca Sáng 1', hours: 2.0 },
  { time: '09:15 - 11:30', label: 'Ca Sáng 2', hours: 2.25 },
  { time: '13:00 - 15:00', label: 'Ca Chiều 1', hours: 2.0 },
  { time: '15:15 - 17:15', label: 'Ca Chiều 2', hours: 2.0 },
  { time: '18:30 - 21:00', label: 'Ca Tối (Trọng Điểm)', hours: 2.5 },
  { time: '21:30 - 23:00', label: 'Ca Khuya', hours: 1.5 },
];

// Initial mock schedule matching image 1
const createInitialSchedule = (): ScheduleCell[] => {
  const cells: ScheduleCell[] = [];
  const presetData: Record<string, { status: CellStatus; label?: string; subLabel?: string }> = {
    // Thứ 2 (day 0)
    '0-0': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Cơ sở dữ liệu (P.A201)' },
    '0-1': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Thực hành SQL (Lab 3)' },
    '0-2': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Tự học 2 giờ' },
    '0-3': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Đọc tài liệu RAG' },
    '0-4': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Tự học 2.5 giờ' },
    '0-5': { status: 'REST', label: 'Nghỉ ngơi' },

    // Thứ 3 (day 1 - Hôm nay)
    '1-0': { status: 'EMPTY' },
    '1-1': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Ôn tập bài tập' },
    '1-2': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'An toàn thông tin' },
    '1-3': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Thực hành An toàn' },
    '1-4': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Tự học 2.5 giờ' },
    '1-5': { status: 'REST', label: 'Nghỉ ngơi' },

    // Thứ 4 (day 2)
    '2-0': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Kiến trúc phần mềm' },
    '2-1': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Làm đồ án SRS' },
    '2-2': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Quản trị dự án CNTT' },
    '2-3': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Coding Frontend' },
    '2-4': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Code Đồ Án Tốt Nghiệp' },
    '2-5': { status: 'REST', label: 'Nghỉ ngơi' },

    // Thứ 5 (day 3)
    '3-0': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Tự học 2 giờ' },
    '3-1': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Học máy & AI' },
    '3-2': { status: 'EMPTY' },
    '3-3': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Coding Backend' },
    '3-4': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Review Sprint Backlog' },
    '3-5': { status: 'REST', label: 'Nghỉ ngơi' },

    // Thứ 6 (day 4)
    '4-0': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Mạng máy tính' },
    '4-1': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Nghiên cứu tài liệu' },
    '4-2': { status: 'BUSY_CLASS', label: 'Học trên lớp', subLabel: 'Thực hành DevOps' },
    '4-3': { status: 'FREE_TIME', label: 'Đang kéo chọn...', subLabel: '2h' },
    '4-4': { status: 'REST', label: 'Sinh hoạt CLB / Bạn bè' },
    '4-5': { status: 'REST', label: 'Nghỉ ngơi' },

    // Thứ 7 (day 5)
    '5-0': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Tự học 2 giờ' },
    '5-1': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Họp nhóm Sprint' },
    '5-2': { status: 'REST', label: 'Thể thao / Cá nhân' },
    '5-3': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Luyện thuật toán' },
    '5-4': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Tổng kết tuần' },
    '5-5': { status: 'REST', label: 'Nghỉ ngơi' },

    // Chủ Nhật (day 6)
    '6-0': { status: 'REST', label: 'Nghỉ ngơi cuối tuần' },
    '6-1': { status: 'EMPTY', label: 'Trống' },
    '6-2': { status: 'REST', label: 'Gia đình / Nghỉ ngơi' },
    '6-3': { status: 'EMPTY', label: 'Trống' },
    '6-4': { status: 'FREE_TIME', label: 'Khung rảnh AI', subLabel: 'Lên kế hoạch tuần mới' },
    '6-5': { status: 'REST', label: 'Chuẩn bị ngủ' },
  };

  for (let d = 0; d < 7; d++) {
    for (let s = 0; s < 6; s++) {
      const key = `${d}-${s}`;
      const preset = presetData[key] || { status: 'EMPTY' };
      cells.push({
        dayIndex: d,
        slotIndex: s,
        status: preset.status,
        label: preset.label,
        subLabel: preset.subLabel,
        durationHours: TIME_SLOTS[s].hours,
      });
    }
  }
  return cells;
};

export const AcademicOnboardingPage: React.FC = () => {
  const navigate = useNavigate();

  // Brush state
  const [selectedBrush, setSelectedBrush] = useState<BrushMode>('BUSY_CLASS');

  // Weekly study target (hours)
  const [targetHours, setTargetHours] = useState<number>(18);
  const [isCustomTarget, setIsCustomTarget] = useState<boolean>(false);

  // Matrix cells state
  const [schedule, setSchedule] = useState<ScheduleCell[]>(createInitialSchedule);

  // Drag selection state
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Calculate live statistics
  const { busyHours, freeHours } = useMemo(() => {
    let busy = 0;
    let free = 0;
    schedule.forEach((cell) => {
      if (cell.status === 'BUSY_CLASS') busy += cell.durationHours;
      if (cell.status === 'FREE_TIME') free += cell.durationHours;
    });
    return { busyHours: Math.round(busy), freeHours: Math.round(free) };
  }, [schedule]);

  // Paint cell with current brush
  const handleCellPaint = (dayIndex: number, slotIndex: number) => {
    setSchedule((prev) =>
      prev.map((cell) => {
        if (cell.dayIndex === dayIndex && cell.slotIndex === slotIndex) {
          if (selectedBrush === 'BUSY_CLASS') {
            return {
              ...cell,
              status: 'BUSY_CLASS',
              label: 'Học trên lớp',
              subLabel: 'Môn học mới',
            };
          } else if (selectedBrush === 'FREE_TIME') {
            return {
              ...cell,
              status: 'FREE_TIME',
              label: 'Khung rảnh AI',
              subLabel: `Tự học ${cell.durationHours}h`,
            };
          } else {
            return {
              ...cell,
              status: 'REST',
              label: 'Nghỉ ngơi',
              subLabel: undefined,
            };
          }
        }
        return cell;
      })
    );
  };

  const handleCellMouseDown = (dayIndex: number, slotIndex: number) => {
    setIsMouseDown(true);
    handleCellPaint(dayIndex, slotIndex);
  };

  const handleCellMouseEnter = (dayIndex: number, slotIndex: number) => {
    if (isMouseDown) {
      handleCellPaint(dayIndex, slotIndex);
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // Reset / Clear all
  const handleClearAll = () => {
    setSchedule((prev) =>
      prev.map((c) => ({
        ...c,
        status: 'EMPTY',
        label: undefined,
        subLabel: undefined,
      }))
    );
  };

  // Apply default alternating week template
  const handleApplyTemplate = () => {
    setSchedule(createInitialSchedule());
  };

  return (
    <div
      className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans select-none"
      onMouseUp={handleMouseUp}
    >
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
              <span className="text-xs font-normal text-[#64748B]">Khảo Sát Lịch Rảnh & Thiết Lập Cá Nhân</span>
            </div>
          </div>
        </div>

        {/* Center: 3-Step Stepper */}
        <div className="hidden md:flex items-center gap-2">
          {/* Step 1: Done */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F0FDF4] border border-teal-200 text-[#0D9488] text-xs font-semibold">
            <AppIcons.verifiedCheck size={14} className="text-[#0D9488]" />
            <span>1. Chọn Vai Trò</span>
          </div>

          <span className="text-[#CBD5E1] text-xs font-mono">—</span>

          {/* Step 2: Active */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#4F46E5] text-white text-xs font-semibold shadow-xs">
            <span className="font-mono">2</span>
            <span>Thời Khóa Biểu & Giờ Rảnh</span>
          </div>

          <span className="text-[#CBD5E1] text-xs font-mono">—</span>

          {/* Step 3: Inactive */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[#64748B] text-xs font-medium">
            <span className="font-mono">3</span>
            <span>Mục Tiêu Tuần</span>
          </div>
        </div>

        {/* Right: Save draft + Avatar */}
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
            <span className="hidden sm:inline text-xs font-medium text-[#0F172A]">
              Đặng Hồng Nguyên
            </span>
          </div>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN CONTAINER                                       */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-5">
        {/* Title & Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Thiết Lập Khung Thời Gian & Giờ Học Cá Nhân
            </h1>
            <p className="text-xs text-[#64748B] mt-1">
              Kéo thả trên lưới thời gian để hệ thống AI tự động xếp lịch làm bài và đồ án vào các khung giờ rảnh tối ưu nhất của bạn.
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold font-mono self-start sm:self-auto shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5] animate-pulse"></span>
            <span>Thuật Toán CPM & Khung Giờ Rảnh</span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. BRUSH TOOLBAR & TARGET PICKER CARD                    */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Brush Selection */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mr-1">
              CHẾ ĐỘ CHỌN CỌ VẼ:
            </span>

            {/* Brush 1: BUSY_CLASS */}
            <button
              type="button"
              onClick={() => setSelectedBrush('BUSY_CLASS')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedBrush === 'BUSY_CLASS'
                  ? 'border border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5] ring-1 ring-[#4F46E5]'
                  : 'border border-[#E2E8F0] bg-white text-[#334155] hover:border-slate-300'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#4F46E5]"></span>
              <span>Giờ học trên lớp (BUSY_CLASS)</span>
              {selectedBrush === 'BUSY_CLASS' && (
                <span className="rounded bg-[#4F46E5] px-1.5 py-0.2 text-[9px] font-mono text-white">
                  Đang chọn
                </span>
              )}
            </button>

            {/* Brush 2: FREE_TIME */}
            <button
              type="button"
              onClick={() => setSelectedBrush('FREE_TIME')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedBrush === 'FREE_TIME'
                  ? 'border border-[#0D9488] bg-[#F0FDF4] text-[#0D9488] ring-1 ring-[#0D9488]'
                  : 'border border-[#E2E8F0] bg-white text-[#334155] hover:border-slate-300'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#0D9488]"></span>
              <span>Giờ rảnh làm bài (FREE_TIME)</span>
              {selectedBrush === 'FREE_TIME' && (
                <span className="rounded bg-[#0D9488] px-1.5 py-0.2 text-[9px] font-mono text-white">
                  Đang chọn
                </span>
              )}
            </button>

            {/* Brush 3: REST */}
            <button
              type="button"
              onClick={() => setSelectedBrush('REST')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                selectedBrush === 'REST'
                  ? 'border border-slate-400 bg-slate-100 text-[#0F172A] ring-1 ring-slate-400'
                  : 'border border-[#E2E8F0] bg-white text-[#64748B] hover:border-slate-300'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-[#64748B]"></span>
              <span>Nghỉ ngơi / Cá nhân</span>
              {selectedBrush === 'REST' && (
                <span className="rounded bg-slate-600 px-1.5 py-0.2 text-[9px] font-mono text-white">
                  Đang chọn
                </span>
              )}
            </button>
          </div>

          {/* Right: Weekly Study Target */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <span>Mục tiêu tự học tuần:</span>
              <span className="font-mono text-xs font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-md">
                {targetHours} Giờ / Tuần
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#F1F5F9] p-0.5 rounded-md border border-[#E2E8F0] text-xs">
              {[12, 18, 24].map((hrs) => (
                <button
                  key={hrs}
                  type="button"
                  onClick={() => {
                    setTargetHours(hrs);
                    setIsCustomTarget(false);
                  }}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-colors ${
                    targetHours === hrs && !isCustomTarget
                      ? 'bg-white text-[#4F46E5] font-bold shadow-xs border border-[#CBD5E1]'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {hrs}h {hrs === 18 && !isCustomTarget ? '(Active)' : ''}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  const input = prompt('Nhập số giờ mục tiêu tự học / tuần:', targetHours.toString());
                  if (input && !isNaN(Number(input))) {
                    setTargetHours(Number(input));
                    setIsCustomTarget(true);
                  }
                }}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  isCustomTarget
                    ? 'bg-white text-[#4F46E5] font-bold shadow-xs border border-[#CBD5E1]'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Tùy chỉnh
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. SCHEDULE MATRIX TABLE                                */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-4">
          {/* Table Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0F172A]">
                <AppIcons.navCalendar size={16} className="text-[#4F46E5]" />
                <span>Tuần Học Kỳ Hiện Tại (Thứ 2 - Chủ Nhật)</span>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyTemplate}
                className="h-7 text-[11px] gap-1.5 text-[#4F46E5] border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100/50"
              >
                <AppIcons.override size={13} />
                <span>Áp dụng mẫu tuần chẵn/lẻ</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="h-7 text-[11px] gap-1.5 text-[#BE123C] border-rose-200 bg-rose-50/50 hover:bg-rose-100/50"
              >
                <AppIcons.trash size={13} />
                <span>Xóa toàn bộ</span>
              </Button>
            </div>

            {/* Live Stats */}
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#4F46E5] font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#4F46E5]"></span>
                <span>{busyHours}h Giờ học</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-[#0D9488] font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#0D9488]"></span>
                <span>{freeHours}h Giờ rảnh khả dụng</span>
              </span>
            </div>
          </div>

          {/* Matrix Grid */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="w-28 p-2.5 text-center text-xs font-bold text-[#64748B] border border-[#E2E8F0] bg-[#F8FAFC]">
                    Khung Giờ
                  </th>
                  {DAYS.map((day, dIdx) => (
                    <th
                      key={day.name}
                      className={`p-2.5 text-center text-xs font-bold border border-[#E2E8F0] transition-colors ${
                        day.isToday
                          ? 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]'
                          : day.isSunday
                          ? 'bg-[#FFF1F2] text-[#BE123C]'
                          : 'bg-[#F8FAFC] text-[#0F172A]'
                      }`}
                    >
                      <div>{day.name}</div>
                      <div className="font-mono text-[11px] font-normal opacity-80 mt-0.5">
                        {day.date}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TIME_SLOTS.map((slot, sIdx) => (
                  <tr key={slot.time}>
                    {/* Time slot header */}
                    <td className="p-2.5 text-center border border-[#E2E8F0] bg-[#F8FAFC]">
                      <div className="font-mono text-[11px] font-semibold text-[#0F172A]">
                        {slot.time}
                      </div>
                      <div className="text-[10px] text-[#64748B] mt-0.5">{slot.label}</div>
                    </td>

                    {/* Day Cells */}
                    {DAYS.map((day, dIdx) => {
                      const cell = schedule.find(
                        (c) => c.dayIndex === dIdx && c.slotIndex === sIdx
                      ) || {
                        dayIndex: dIdx,
                        slotIndex: sIdx,
                        status: 'EMPTY' as CellStatus,
                        durationHours: slot.hours,
                      };

                      return (
                        <td
                          key={`${dIdx}-${sIdx}`}
                          onMouseDown={() => handleCellMouseDown(dIdx, sIdx)}
                          onMouseEnter={() => handleCellMouseEnter(dIdx, sIdx)}
                          className="p-1.5 border border-[#E2E8F0] align-middle cursor-pointer transition-colors"
                        >
                          {cell.status === 'BUSY_CLASS' && (
                            <div className="rounded-md border border-[#C7D2FE] bg-[#EEF2FF] p-2 text-left hover:border-indigo-400 transition-colors">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#4F46E5]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]"></span>
                                <span>{cell.label || 'Học trên lớp'}</span>
                              </div>
                              {cell.subLabel && (
                                <p className="text-[10px] text-[#4338CA] mt-0.5 truncate">
                                  {cell.subLabel}
                                </p>
                              )}
                            </div>
                          )}

                          {cell.status === 'FREE_TIME' && (
                            <div className="rounded-md border border-[#CCFBF1] bg-[#F0FDF4] p-2 text-left hover:border-teal-400 transition-colors">
                              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0D9488]">
                                <AppIcons.navAiDecompose size={12} className="text-[#0D9488] shrink-0" />
                                <span>{cell.label || 'Khung rảnh AI'}</span>
                              </div>
                              {cell.subLabel && (
                                <p className="text-[10px] text-[#0F766E] mt-0.5 truncate font-mono">
                                  {cell.subLabel}
                                </p>
                              )}
                            </div>
                          )}

                          {cell.status === 'REST' && (
                            <div className="rounded-md border border-[#E2E8F0] bg-[#F1F5F9] p-2 text-center text-[11px] text-[#64748B] hover:border-slate-300 transition-colors">
                              <span className="truncate block">{cell.label || 'Nghỉ ngơi'}</span>
                            </div>
                          )}

                          {cell.status === 'EMPTY' && (
                            <div className="h-12 rounded-md border border-dashed border-[#CBD5E1] bg-white flex items-center justify-center text-[10px] text-slate-400 hover:border-[#4F46E5] hover:text-[#4F46E5] hover:bg-indigo-50/30 transition-all">
                              + Thêm ca
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. FOOTER BANNER & ACTION BAR                           */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* AI Engine Suggestion Banner */}
          <div className="flex items-center gap-2.5 text-xs text-[#0F172A]">
            <div className="h-7 w-7 rounded-md bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-[#4F46E5]">
              <AppIcons.bot size={15} />
            </div>
            <div>
              <span className="font-semibold text-[#0F172A]">Gợi ý AI Engine: </span>
              <span className="text-[#334155]">
                Hệ thống sẽ căn cứ vào{' '}
                <strong className="font-mono text-[#0D9488] font-bold">{freeHours}h rảnh</strong> này để
                tự động phân rã WBS và gán task làm đồ án mà không trùng lịch thi.
              </span>
            </div>
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
              onClick={() => navigate('/projects/demo-1/kanban')}
              className="h-9 gap-2 text-xs font-semibold bg-[#4F46E5] hover:bg-indigo-700 text-white shadow-xs"
            >
              <span>Tiếp Tục: Thiết Lập Mục Tiêu Đồ Án</span>
              <AppIcons.arrowRight size={14} />
            </Button>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="mt-auto border-t border-[#E2E8F0] bg-white py-3 px-6 text-center text-[11px] font-mono text-[#64748B]">
        Smart Workspace • Onboarding Flow • Material Design 3 Clean Light & Retina 2x Architecture
      </footer>
    </div>
  );
};

export default AcademicOnboardingPage;
