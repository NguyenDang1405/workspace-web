import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const MonteCarloPage: React.FC = () => {
  const [iterations, setIterations] = useState<number>(10000);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationCount, setSimulationCount] = useState<number>(1);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Xử lý chạy lại mô phỏng
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSimulationCount((prev) => prev + 1);
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] p-6 text-[#0F172A] space-y-5">
      {/* Header & Bộ Điều Khiển Mô Phỏng */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
              Mô Phỏng Rủi Ro Monte Carlo & Chỉ Số Dòng Chảy (Flow Metrics)
            </h1>
            <span className="inline-flex items-center rounded-md border border-indigo-200 bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-semibold text-[#4F46E5] uppercase tracking-wide whitespace-nowrap">
              PROD v2.4
            </span>
          </div>
          <p className="mt-1 text-xs text-[#64748B]">
            Dự báo phân phối xác suất ngày hoàn thành dự án ({iterations.toLocaleString()} vòng lặp) và đo lường hiệu suất luồng công việc Kanban.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Bộ chọn số vòng lặp tương tác */}
          <div className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 shadow-xs text-xs">
            <span className="text-[#64748B] whitespace-nowrap">Vòng lặp:</span>
            <div className="flex items-center gap-1 font-mono font-medium">
              {[1000, 5000, 10000].map((count) => (
                <button
                  key={count}
                  onClick={() => setIterations(count)}
                  className={`rounded px-1.5 py-0.5 transition-colors ${
                    iterations === count
                      ? 'bg-[#EEF2FF] text-[#4F46E5] font-bold'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {count.toLocaleString()}
                </button>
              ))}
            </div>
            <span className="text-[#64748B] text-[11px]">iterations</span>
          </div>

          {/* Nút Chạy Lại Mô Phỏng */}
          <Button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="gap-2 rounded-md bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#4338CA] transition-colors"
          >
            <AppIcons.play size={14} className={isSimulating ? 'animate-spin' : ''} />
            <span>{isSimulating ? 'Đang Tính Toán...' : 'Chạy Lại Mô Phỏng'}</span>
          </Button>
        </div>
      </div>

      {/* Hàng 4 Thẻ KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Xác suất đạt hạn (P85) */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Xác Suất Đạt Hạn (P85)</span>
            <AppIcons.verifiedCheck size={16} className="text-[#4F46E5]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-[#4F46E5]">
              16/12/2026
            </span>
            <span className="rounded-md border border-indigo-200 bg-[#EEF2FF] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#4F46E5]">
              85% Tin cậy
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
            <span>Sớm hơn 2 ngày so với mốc bảo vệ 18/12.</span>
          </div>
        </div>

        {/* KPI 2: Đang xử lý (WIP Count) */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Đang Xử Lý (WIP Count)</span>
            <AppIcons.checkSquare size={16} className="text-[#0D9488]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-[#0F172A]">
              6 / 8 Tasks
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#475569]">
              Giới hạn an toàn
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
            <span>Không vượt ngưỡng tắc nghẽn WIP Limit.</span>
          </div>
        </div>

        {/* KPI 3: Tốc độ hoàn thành (Throughput) */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Tốc Độ Hoàn Thành (Throughput)</span>
            <AppIcons.zap size={16} className="text-[#0D9488]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-[#0F172A]">
              1.8 <span className="text-sm font-normal text-[#64748B]">Tasks/ngày</span>
            </span>
            <span className="rounded-md border border-teal-200 bg-teal-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#0D9488]">
              +12.5%
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
            <span>Trung bình trượt 14 ngày gần nhất.</span>
          </div>
        </div>

        {/* KPI 4: Thời gian chu kỳ (Cycle Time) */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-[#64748B]">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Thời Gian Chu Kỳ (Cycle Time)</span>
            <AppIcons.clock size={16} className="text-[#BE123C]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-bold tracking-tight text-[#0F172A]">
              1.6 Ngày
            </span>
            <span className="rounded-md border border-rose-200 bg-rose-50 px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#BE123C]">
              P95: 3.4d
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-[#64748B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C]" />
            <span>Từ lúc IN_PROGRESS đến DONE.</span>
          </div>
        </div>
      </div>

      {/* Khối 2 Biểu Đồ Phân Tích Chuyên Sâu */}
      <div className="grid grid-cols-12 gap-5">
        {/* Biểu đồ trái (7 cột): Phân Phối Xác Suất Hoàn Thành Dự Án Monte Carlo */}
        <div className="col-span-12 lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header Biểu đồ */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Phân Phối Xác Suất Hoàn Thành Dự Án (Monte Carlo {iterations.toLocaleString()} Lần)
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Phân phối Gaussian thực tế từ lịch sử Throughput & Lead Time
                </p>
              </div>

              {/* Chú thích Legend */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#4F46E5]" />
                  <span className="text-[#64748B]">Tần suất</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 bg-[#0F172A]" />
                  <span className="text-[#64748B]">S-curve</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 border-b-2 border-dashed border-[#BE123C]" />
                  <span className="text-[#BE123C] font-medium">Mốc P85</span>
                </div>
              </div>
            </div>

            {/* Thân Biểu Đồ SVG Vector (Monte Carlo Histogram + S-curve) */}
            <div className="relative mt-4 h-64 w-full">
              <svg viewBox="0 0 650 240" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="indigoBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                  <linearGradient id="roseBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#BE123C" />
                    <stop offset="100%" stopColor="#E11D48" />
                  </linearGradient>
                </defs>

                {/* Grid lines ngang */}
                <line x1="45" y1="20" x2="605" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="45" y1="65" x2="605" y2="65" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="45" y1="110" x2="605" y2="110" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="45" y1="155" x2="605" y2="155" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="45" y1="200" x2="605" y2="200" stroke="#E2E8F0" strokeWidth="1" />

                {/* Trục Tung Trái (Tần suất) */}
                <text x="35" y="24" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">2500</text>
                <text x="35" y="69" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">2000</text>
                <text x="35" y="114" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">1500</text>
                <text x="35" y="159" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">1000</text>
                <text x="35" y="204" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">0</text>

                {/* Trục Tung Phải (Tỷ lệ %) */}
                <text x="615" y="24" textAnchor="start" className="text-[10px] fill-[#94A3B8] font-mono">100%</text>
                <text x="615" y="69" textAnchor="start" className="text-[10px] fill-[#94A3B8] font-mono">75%</text>
                <text x="615" y="114" textAnchor="start" className="text-[10px] fill-[#94A3B8] font-mono">50%</text>
                <text x="615" y="159" textAnchor="start" className="text-[10px] fill-[#94A3B8] font-mono">25%</text>
                <text x="615" y="204" textAnchor="start" className="text-[10px] fill-[#94A3B8] font-mono">0%</text>

                {/* Các cột Histogram
                  08/12: x=70, w=30, h=15 (y=185)
                  10/12: x=140, w=30, h=55 (y=145)
                  12/12: x=210, w=30, h=105 (y=95)
                  14/12 (P50): x=280, w=30, h=170 (y=30)
                  16/12 (P85): x=350, w=30, h=130 (y=70)
                  18/12 (Hạn): x=420, w=30, h=70 (y=130)
                  20/12: x=490, w=30, h=25 (y=175) [vượt hạn]
                  22/12: x=560, w=30, h=10 (y=190) [vượt hạn]
                */}
                <g className="transition-all duration-300">
                  {/* 08/12 */}
                  <rect x="70" y="185" width="30" height="15" rx="3" fill="#6366F1" opacity="0.8" />
                  {/* 10/12 */}
                  <rect x="140" y="145" width="30" height="55" rx="3" fill="#6366F1" opacity="0.85" />
                  {/* 12/12 */}
                  <rect x="210" y="95" width="30" height="105" rx="3" fill="#4F46E5" />
                  {/* 14/12 (P50) */}
                  <rect x="280" y="30" width="30" height="170" rx="3" fill="#4338CA" />
                  {/* 16/12 (P85) */}
                  <rect x="350" y="70" width="30" height="130" rx="3" fill="#4F46E5" />
                  {/* 18/12 (Hạn) */}
                  <rect x="420" y="130" width="30" height="70" rx="3" fill="#818CF8" />
                  {/* 20/12 (Trễ hạn) */}
                  <rect x="490" y="175" width="30" height="25" rx="3" fill="url(#roseBarGrad)" />
                  {/* 22/12 (Trễ hạn) */}
                  <rect x="560" y="190" width="30" height="10" rx="3" fill="url(#roseBarGrad)" />
                </g>

                {/* S-curve (Đường cong tích lũy xác suất) */}
                <path
                  d="M 85 190 Q 155 170, 225 130 T 295 65 T 365 38 T 435 25 L 575 22"
                  fill="none"
                  stroke="#0F172A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Chấm tròn trên đường S-curve */}
                <circle cx="295" cy="65" r="3.5" fill="#0F172A" />
                <circle cx="365" cy="38" r="4.5" fill="#BE123C" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="435" cy="25" r="3.5" fill="#0F172A" />

                {/* Đường gióng dọc Mốc P85 tại x=365 (16/12) */}
                <line
                  x1="365"
                  y1="25"
                  x2="365"
                  y2="200"
                  stroke="#BE123C"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />

                {/* Đường gióng mốc HẠN 18/12 tại x=435 */}
                <line
                  x1="435"
                  y1="60"
                  x2="435"
                  y2="200"
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <text x="435" y="55" textAnchor="middle" className="text-[10px] font-mono font-semibold fill-[#64748B]">
                  HẠN: 18/12
                </text>

                {/* Nhãn trục hoành */}
                <text x="85" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">08/12</text>
                <text x="155" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">10/12</text>
                <text x="225" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">12/12</text>
                <text x="295" y="218" textAnchor="middle" className="text-[10px] fill-[#4F46E5] font-mono font-semibold">14/12 (P50)</text>
                <text x="365" y="218" textAnchor="middle" className="text-[10px] fill-[#BE123C] font-mono font-bold">16/12 (P85)</text>
                <text x="435" y="218" textAnchor="middle" className="text-[10px] fill-[#475569] font-mono font-medium">18/12 (Hạn)</text>
                <text x="505" y="218" textAnchor="middle" className="text-[10px] fill-[#BE123C] font-mono">20/12</text>
                <text x="575" y="218" textAnchor="middle" className="text-[10px] fill-[#BE123C] font-mono">22/12</text>
              </svg>

              {/* TOOLTIP P85 TUYỆT ĐỐI KHÔNG BỊ CẮT CHỮ (Sửa Lỗi Mục 1.3) */}
              <div
                className="absolute top-2 left-[51%] -translate-x-1/2 z-10 pointer-events-none"
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#BE123C] px-2.5 py-1 text-white font-mono text-[11px] font-bold shadow-md">
                  <span>P85: 16/12/2026</span>
                </div>
                <div className="mx-auto h-1.5 w-1.5 -translate-y-0.5 rotate-45 bg-[#BE123C]" />
              </div>
            </div>
          </div>

          {/* Footer Biểu đồ: Khung kết luận (Đổi sang nền trung tính chuẩn #FAFAFA / #F8FAFC theo Mục 1.4) */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
            <div className="flex items-center gap-2 text-[#0F172A]">
              <AppIcons.alertCircle size={15} className="text-[#4F46E5] shrink-0" />
              <span>
                <strong>Kết quả mô phỏng:</strong> 85% kịch bản hoàn thành trước <strong>16/12</strong> • Rủi ro trễ hạn sau 18/12 là <span className="font-semibold text-[#BE123C]">6.2%</span>.
              </span>
            </div>
            <span className="font-mono text-[11px] text-[#64748B] shrink-0">
              Độ tin cậy 95% CI
            </span>
          </div>
        </div>

        {/* Biểu đồ phải (5 cột): Biểu Đồ Dòng Chảy (WIP & Cycle Time) */}
        <div className="col-span-12 lg:col-span-5 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            {/* Header Biểu đồ */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">
                  Biểu Đồ Dòng Chảy (WIP & Cycle Time)
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Phát hiện tắc nghẽn & dao động thời gian hoàn tất tác vụ
                </p>
              </div>
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-mono text-[#475569]">
                14 Ngày Qua
              </span>
            </div>

            {/* Chú thích Legend */}
            <div className="flex items-center justify-between mt-3 text-[11px] text-[#64748B]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-xs bg-slate-300" />
                  <span>WIP Tasks</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-xs bg-slate-500" />
                  <span>Throughput</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-0.5 w-3 bg-[#4F46E5]" />
                  <span className="text-[#4F46E5] font-medium">Cycle Time (d)</span>
                </div>
              </div>
              <span className="font-mono text-[10px]">Đơn vị: Ngày</span>
            </div>

            {/* Thân Biểu Đồ SVG Cột Đôi + Spline Cycle Time */}
            <div className="relative mt-3 h-64 w-full">
              <svg viewBox="0 0 450 240" className="h-full w-full overflow-visible" preserveAspectRatio="none">
                {/* Grid lines ngang */}
                <line x1="30" y1="20" x2="430" y2="20" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="80" x2="430" y2="80" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="140" x2="430" y2="140" stroke="#F1F5F9" strokeWidth="1" />
                <line x1="30" y1="200" x2="430" y2="200" stroke="#E2E8F0" strokeWidth="1" />

                {/* Trục Tung */}
                <text x="22" y="24" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">3.0d</text>
                <text x="22" y="84" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">2.0d</text>
                <text x="22" y="144" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">1.0d</text>
                <text x="22" y="204" textAnchor="end" className="text-[10px] fill-[#94A3B8] font-mono">0</text>

                {/* 7 Cặp Cột (T2 -> CN):
                  T2: x=60  (WIP h=70, TP h=50)
                  T3: x=115 (WIP h=65, TP h=60)
                  T4: x=170 (WIP h=75, TP h=40)
                  T5: x=225 (WIP h=110, TP h=25) -> Đỉnh điểm tắc nghẽn
                  T6: x=280 (WIP h=85, TP h=70)
                  T7: x=335 (WIP h=50, TP h=45)
                  CN: x=390 (WIP h=30, TP h=20)
                */}
                <g className="transition-all duration-300">
                  {/* T2 */}
                  <rect x="52" y="130" width="12" height="70" rx="2" fill="#CBD5E1" />
                  <rect x="66" y="150" width="12" height="50" rx="2" fill="#64748B" />

                  {/* T3 */}
                  <rect x="107" y="135" width="12" height="65" rx="2" fill="#CBD5E1" />
                  <rect x="121" y="140" width="12" height="60" rx="2" fill="#64748B" />

                  {/* T4 */}
                  <rect x="162" y="125" width="12" height="75" rx="2" fill="#CBD5E1" />
                  <rect x="176" y="160" width="12" height="40" rx="2" fill="#64748B" />

                  {/* T5 (Tắc nghẽn) */}
                  <rect x="217" y="90" width="12" height="110" rx="2" fill="#94A3B8" />
                  <rect x="231" y="175" width="12" height="25" rx="2" fill="#64748B" />

                  {/* T6 */}
                  <rect x="272" y="115" width="12" height="85" rx="2" fill="#CBD5E1" />
                  <rect x="286" y="130" width="12" height="70" rx="2" fill="#64748B" />

                  {/* T7 */}
                  <rect x="327" y="150" width="12" height="50" rx="2" fill="#CBD5E1" />
                  <rect x="341" y="155" width="12" height="45" rx="2" fill="#64748B" />

                  {/* CN */}
                  <rect x="382" y="170" width="12" height="30" rx="2" fill="#CBD5E1" />
                  <rect x="396" y="180" width="12" height="20" rx="2" fill="#64748B" />
                </g>

                {/* Đường Cycle Time spline qua các đỉnh:
                  T2: (65, 125) [1.25d]
                  T3: (120, 132) [1.13d]
                  T4: (175, 126) [1.23d]
                  T5: (230, 56) [2.4d] -> ĐỈNH
                  T6: (285, 120) [1.33d]
                  T7: (340, 142) [0.97d]
                  CN: (395, 138) [1.03d]
                */}
                <path
                  d="M 65 125 L 120 132 L 175 126 L 230 56 L 285 120 L 340 142 L 395 138"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Các điểm tròn */}
                <circle cx="65" cy="125" r="3.5" fill="#4F46E5" />
                <circle cx="120" cy="132" r="3.5" fill="#4F46E5" />
                <circle cx="175" cy="126" r="3.5" fill="#4F46E5" />
                {/* Điểm đỉnh T5 */}
                <circle cx="230" cy="56" r="5" fill="#BE123C" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="285" cy="120" r="3.5" fill="#4F46E5" />
                <circle cx="340" cy="142" r="3.5" fill="#4F46E5" />
                <circle cx="395" cy="138" r="3.5" fill="#4F46E5" />

                {/* Nhãn trục hoành */}
                <text x="65" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">T2</text>
                <text x="120" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">T3</text>
                <text x="175" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">T4</text>
                <text x="230" y="218" textAnchor="middle" className="text-[10px] fill-[#BE123C] font-mono font-bold">T5</text>
                <text x="285" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">T6</text>
                <text x="340" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">T7</text>
                <text x="395" y="218" textAnchor="middle" className="text-[10px] fill-[#64748B] font-mono">CN</text>
              </svg>

              {/* TOOLTIP 2.4d TUYỆT ĐỐI KHÔNG BỊ CẮT CHỮ (Sửa Lỗi Mục 1.3) */}
              <div
                className="absolute top-2 left-[51%] -translate-x-1/2 z-10 pointer-events-none"
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap rounded-md bg-[#BE123C] px-2.5 py-1 text-white font-mono text-[11px] font-bold shadow-md">
                  <span>2.4d: Xung đột lịch</span>
                </div>
                <div className="mx-auto h-1.5 w-1.5 -translate-y-0.5 rotate-45 bg-[#BE123C]" />
              </div>
            </div>
          </div>

          {/* Footer Biểu đồ: Khung kết luận */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-xs">
            <div className="flex items-center gap-2 text-[#0F172A]">
              <AppIcons.verifiedCheck size={15} className="text-[#0D9488] shrink-0" />
              <span>
                Độ ổn định luồng (Flow Efficiency): <strong>84%</strong> • Không ùn ứ tại Review.
              </span>
            </div>
            <span className="rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-[11px] font-semibold text-[#0F172A]">
              P50 Cycle: 1.4d
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonteCarloPage;
