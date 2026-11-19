import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const DagGanttPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentView = searchParams.get('view') === 'gantt' ? 'gantt' : 'dag';
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isSimulatedExtension, setIsSimulatedExtension] = useState<boolean>(true);
  const [scaleMode, setScaleMode] = useState<'week' | 'day'>('week');

  const setView = (v: 'dag' | 'gantt') => {
    setSearchParams({ view: v });
  };

  return (
    <div className="space-y-5 max-w-[1520px] mx-auto pb-12">
      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            {currentView === 'dag'
              ? 'Sơ Đồ Mạng Đồ Thị (DAG) & Đường Găng CPM'
              : 'Biểu Đồ Tiến Độ Ngang (Interactive Gantt CPM)'}
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            {currentView === 'dag'
              ? 'Trực quan hóa quan hệ phụ thuộc tiên quyết và tính toán thời gian dự phòng Slack Time.'
              : 'Kéo giãn trực tiếp thanh thời lượng tác vụ để mô phỏng tác động và kích hoạt tính toán lại đường găng.'}
          </p>
        </div>

        {/* Tab Switcher & Nút Tính lại */}
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-md border border-[#E2E8F0] bg-[#F1F5F9] p-1 text-xs font-medium">
            <button
              type="button"
              onClick={() => setView('dag')}
              className={`px-3 py-1.5 rounded transition-colors ${
                currentView === 'dag'
                  ? 'bg-white text-[#4F46E5] font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Sơ Đồ DAG
            </button>
            <button
              type="button"
              onClick={() => setView('gantt')}
              className={`px-3 py-1.5 rounded transition-colors ${
                currentView === 'gantt'
                  ? 'bg-white text-[#4F46E5] font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Biểu Đồ Gantt
            </button>
          </div>

          {currentView === 'gantt' && (
            <div className="rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1 text-xs font-mono text-[#0F172A]">
              <span>Thang đo: Theo Tuần</span>
            </div>
          )}

          <Button
            size="sm"
            className="h-8 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs"
          >
            <AppIcons.refresh size={13} />
            <span>Tính Lại Đường Găng</span>
          </Button>
        </div>
      </div>

      {/* VIEW 1: SƠ ĐỒ MẠNG ĐỒ THỊ DAG */}
      {currentView === 'dag' && (
        <div className="space-y-4">
          {/* Thanh chú thích Legend */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#BE123C]" />
                <span className="font-semibold text-[#0F172A]">
                  Chuỗi Đường Găng{' '}
                  <span className="font-mono text-[#64748B] font-normal">
                    (is_critical_path = true, Slack = 0h)
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-6 h-0.5 border-t border-dashed border-[#94A3B8]" />
                <span className="text-[#64748B]">
                  Nhánh Phụ Thuộc Thường{' '}
                  <span className="font-mono text-[#94A3B8]">(Slack &gt; 0h)</span>
                </span>
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
              184 Giờ • 6 Nút Trọng Yếu
            </span>
          </div>

          {/* Canvas Đồ Thị DAG */}
          <div className="relative rounded-lg border border-[#E2E8F0] bg-white p-8 min-h-[560px] shadow-xs overflow-hidden select-none">
            {/* SVG Connector Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <defs>
                <marker
                  id="arrow-critical"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#BE123C" />
                </marker>
                <marker
                  id="arrow-normal"
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 8 5 L 0 9 z" fill="#94A3B8" />
                </marker>
              </defs>

              {/* Line 1: #TASK-00 (right: 320, 240) -> #TASK-01 (left: 480, 130) [Critical Path] */}
              <path
                d="M 340 240 C 400 240, 410 130, 480 130"
                fill="none"
                stroke="#BE123C"
                strokeWidth="2"
              />
              <circle cx="340" cy="240" r="4" fill="#BE123C" />
              <circle cx="480" cy="130" r="4" fill="#BE123C" />

              {/* Line 2: #TASK-00 (right: 320, 240) -> #TASK-02 (left: 480, 360) [Normal Slack Path] */}
              <path
                d="M 340 240 C 400 240, 410 360, 480 360"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="480" cy="360" r="3.5" fill="#94A3B8" />

              {/* Line 3: #TASK-01 (right: 740, 130) -> #TASK-04 (left: 880, 240) [Critical Path] */}
              <path
                d="M 740 130 C 810 130, 820 240, 880 240"
                fill="none"
                stroke="#BE123C"
                strokeWidth="2"
              />
              <circle cx="740" cy="130" r="4" fill="#BE123C" />
              <circle cx="880" cy="240" r="4" fill="#BE123C" />

              {/* Line 4: #TASK-02 (right: 740, 360) -> #TASK-04 (left: 880, 240) [Normal Slack Path] */}
              <path
                d="M 740 360 C 810 360, 820 240, 880 240"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="740" cy="360" r="3.5" fill="#94A3B8" />

              {/* Line 5: #TASK-04 (right: 1140, 240) -> next node forward */}
              <line
                x1="1140"
                y1="240"
                x2="1190"
                y2="240"
                stroke="#BE123C"
                strokeWidth="2"
                markerEnd="url(#arrow-critical)"
              />
            </svg>

            {/* NODE 1: #TASK-00 (Left: 80px, Top: 170px) */}
            <div className="absolute left-16 top-36 w-64 rounded-lg border-2 border-[#BE123C] bg-white p-3.5 shadow-md space-y-2 z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#BE123C]">#TASK-00</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] text-[#BE123C]">
                  CRITICAL
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] leading-snug">
                Phân Tích &amp; Bóc Tách SRS
              </h3>
              <p className="text-[11px] font-mono text-[#64748B]">Thuật toán Kahn Topo-sort • 16h</p>

              {/* Thông số CPM Table */}
              <div className="grid grid-cols-3 gap-1 rounded bg-[#F8FAFC] p-2 text-center font-mono text-[10px] border border-[#E2E8F0]">
                <div>
                  <div className="text-[#64748B]">ES / EF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">0h | 16h</div>
                </div>
                <div>
                  <div className="text-[#64748B]">LS / LF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">0h | 16h</div>
                </div>
                <div className="rounded bg-[#FFF1F2] border border-[#FFE4E6]">
                  <div className="text-[#BE123C]">SLACK</div>
                  <div className="font-bold text-[#BE123C] mt-0.5">0h</div>
                </div>
              </div>
            </div>

            {/* NODE 2: #TASK-01 (Critical - Middle Top) */}
            <div className="absolute left-[480px] top-12 w-64 rounded-lg border-2 border-[#BE123C] bg-white p-3.5 shadow-md space-y-2 z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#BE123C]">#TASK-01</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] text-[#BE123C]">
                  CRITICAL • ĐN
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] leading-snug">
                Thuật Toán Đường Găng DAG CPM
              </h3>
              <p className="text-[11px] font-mono text-[#64748B]">Tính toán Forward/Backward Pass</p>

              <div className="grid grid-cols-3 gap-1 rounded bg-[#F8FAFC] p-2 text-center font-mono text-[10px] border border-[#E2E8F0]">
                <div>
                  <div className="text-[#64748B]">ES / EF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">16h | 40h</div>
                </div>
                <div>
                  <div className="text-[#64748B]">LS / LF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">16h | 40h</div>
                </div>
                <div className="rounded bg-[#FFF1F2] border border-[#FFE4E6]">
                  <div className="text-[#BE123C]">SLACK</div>
                  <div className="font-bold text-[#BE123C] mt-0.5">0h</div>
                </div>
              </div>
            </div>

            {/* NODE 3: #TASK-02 (Slack - Middle Bottom) - ĐÃ XÓA HÌNH OVAL XÁM LẠC CHỖ THEO CHỈ THỊ */}
            <div className="absolute left-[480px] top-64 w-64 rounded-lg border border-[#CBD5E1] bg-white p-3.5 shadow-sm space-y-2 z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#475569]">#TASK-02</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#475569]">
                  SLACK: 12H • TL
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] leading-snug">
                Giao Diện Mobile Onboarding
              </h3>
              <p className="text-[11px] font-mono text-[#64748B]">Figma Tokens &amp; Responsive Shell</p>

              <div className="grid grid-cols-3 gap-1 rounded bg-[#F8FAFC] p-2 text-center font-mono text-[10px] border border-[#E2E8F0]">
                <div>
                  <div className="text-[#64748B]">ES / EF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">16h | 28h</div>
                </div>
                <div>
                  <div className="text-[#64748B]">LS / LF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">28h | 40h</div>
                </div>
                <div className="rounded bg-[#F1F5F9] border border-[#E2E8F0]">
                  <div className="text-[#475569]">SLACK</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">12h</div>
                </div>
              </div>
            </div>

            {/* NODE 4: #TASK-04 (Critical - Right) */}
            <div className="absolute left-[880px] top-36 w-64 rounded-lg border-2 border-[#BE123C] bg-white p-3.5 shadow-md space-y-2 z-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#BE123C]">#TASK-04</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] text-[#BE123C]">
                  CRITICAL • HN
                </span>
              </div>
              <h3 className="text-xs font-bold text-[#0F172A] leading-snug">
                Tích Hợp Engine Suy Luận vLLM
              </h3>
              <p className="text-[11px] font-mono text-[#64748B]">Docker GPU Container • CUDA 12.1</p>

              <div className="grid grid-cols-3 gap-1 rounded bg-[#F8FAFC] p-2 text-center font-mono text-[10px] border border-[#E2E8F0]">
                <div>
                  <div className="text-[#64748B]">ES / EF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">40h | 64h</div>
                </div>
                <div>
                  <div className="text-[#64748B]">LS / LF</div>
                  <div className="font-bold text-[#0F172A] mt-0.5">40h | 64h</div>
                </div>
                <div className="rounded bg-[#FFF1F2] border border-[#FFE4E6]">
                  <div className="text-[#BE123C]">SLACK</div>
                  <div className="font-bold text-[#BE123C] mt-0.5">0h</div>
                </div>
              </div>
            </div>

            {/* Bộ điều khiển thu phóng (Góc trái dưới) */}
            <div className="absolute left-6 bottom-6 z-20 flex items-center gap-1.5 rounded-md border border-[#E2E8F0] bg-white p-1 shadow-md text-xs font-mono">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 10, 50))}
                className="px-2 py-1 rounded hover:bg-slate-100 text-[#0F172A]"
              >
                -
              </button>
              <span className="px-2 text-[#0F172A] font-semibold">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 10, 150))}
                className="px-2 py-1 rounded hover:bg-slate-100 text-[#0F172A]"
              >
                +
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="p-1 rounded hover:bg-slate-100 text-[#64748B]"
                title="Fit to screen"
              >
                <AppIcons.sliders size={13} />
              </button>
            </div>

            {/* Khung MINI-MAP (Góc phải dưới) */}
            <div className="absolute right-6 bottom-6 z-20 w-44 rounded-lg border border-[#E2E8F0] bg-white p-2 shadow-md">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] mb-1">
                <span>MINI-MAP</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]" />
              </div>
              <div className="h-14 rounded bg-[#F8FAFC] border border-[#E2E8F0] relative overflow-hidden flex items-center justify-center">
                <div className="w-6 h-3 bg-[#BE123C] rounded-2xs absolute left-3 top-5" />
                <div className="w-6 h-3 bg-[#BE123C] rounded-2xs absolute left-12 top-2" />
                <div className="w-6 h-3 bg-slate-400 rounded-2xs absolute left-12 top-9" />
                <div className="w-6 h-3 bg-[#BE123C] rounded-2xs absolute left-22 top-5" />
                <div className="border border-[#4F46E5] w-24 h-11 rounded absolute left-8 top-1.5 opacity-60" />
              </div>
              <div className="text-right text-[9px] font-mono font-bold text-[#BE123C] mt-1">
                Critical: 4
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BIỂU ĐỒ TIẾN ĐỘ GANTT CPM */}
      {currentView === 'gantt' && (
        <div className="space-y-4">
          {/* Thanh chú thích Gantt */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded-2xs bg-[#BE123C]" />
                <span className="font-semibold text-[#0F172A]">Thanh Đường Găng (Slack = 0h)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded-2xs bg-[#4F46E5]" />
                <span className="text-[#64748B]">Thanh Tác Vụ Thường</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-3 rounded-2xs bg-slate-100 border border-dashed border-slate-300" />
                <span className="text-[#64748B]">Khoảng Trôi Dự Phòng (Slack Time Buffer)</span>
              </div>
            </div>
          </div>

          {/* Banner mô phỏng kéo giãn */}
          {isSimulatedExtension && (
            <div className="rounded-md border border-[#FFE4E6] bg-[#FFF1F2] px-3.5 py-2 flex items-center justify-between text-xs text-[#BE123C]">
              <div className="flex items-center gap-2 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C] animate-pulse" />
                <span>
                  Đang mô phỏng:{' '}
                  <strong className="font-bold">Kéo giãn #TASK-01 (+4h)</strong> &rarr; Đường găng
                  dịch chuyển +4h
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSimulatedExtension(false)}
                className="text-[11px] font-mono underline hover:opacity-80"
              >
                Hủy mô phỏng
              </button>
            </div>
          )}

          {/* Khung Biểu Đồ Gantt */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white shadow-xs overflow-hidden">
            {/* Header Timeline */}
            <div className="grid grid-cols-12 border-b border-[#E2E8F0] bg-[#F8FAFC] py-2.5 px-4 font-mono text-[11px] text-[#64748B]">
              <div className="col-span-4 font-bold text-[#0F172A] flex items-center justify-between pr-4">
                <span>MÃ &amp; TÊN TÁC VỤ (WBS)</span>
                <span>THỜI LƯỢNG</span>
              </div>
              <div className="col-span-8 grid grid-cols-6 text-center">
                <span>T1 (10/11)</span>
                <span className="text-[#4F46E5] font-bold relative">
                  T2 (17/11)
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1 py-0.2 rounded bg-[#4F46E5] text-[9px] text-white">
                    Hôm nay
                  </span>
                </span>
                <span>T3 (24/11)</span>
                <span>T4 (01/12)</span>
                <span>T5 (08/12)</span>
                <span>T6 (15/12)</span>
              </div>
            </div>

            {/* Danh Sách Hàng Tác Vụ Gantt */}
            <div className="divide-y divide-[#E2E8F0] text-xs relative">
              {/* Đường dọc 'Hôm Nay' xuyên suốt */}
              <div className="absolute top-0 bottom-0 left-[50%] w-px bg-[#4F46E5] z-0 pointer-events-none opacity-40" />

              {/* Hàng 1: #TASK-00 */}
              <div className="grid grid-cols-12 py-3 px-4 items-center hover:bg-slate-50/60 transition-colors">
                <div className="col-span-4 flex items-center justify-between pr-4 min-w-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-[#BE123C] shrink-0">#TASK-00</span>
                    <span className="truncate font-semibold text-[#0F172A]" title="Phân Tích & Bóc Tách SRS">
                      Phân Tích &amp; Bóc Tách SRS
                    </span>
                  </div>
                  <span className="font-mono text-[#64748B] shrink-0">16h</span>
                </div>
                <div className="col-span-8 relative h-7">
                  <div className="absolute left-0 w-[16%] h-full rounded bg-[#BE123C] text-white font-mono text-[10px] flex items-center justify-center font-bold shadow-2xs">
                    || 100% • ĐN ||
                  </div>
                </div>
              </div>

              {/* Hàng 2: #TASK-01 (Kéo giãn) */}
              <div className="grid grid-cols-12 py-3 px-4 items-center bg-indigo-50/20 hover:bg-indigo-50/40 transition-colors">
                <div className="col-span-4 flex items-center justify-between pr-4 min-w-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-[#BE123C] shrink-0">#TASK-01</span>
                    <span
                      className="truncate font-semibold text-[#0F172A]"
                      title="Thuật Toán Đường Găng DAG CPM"
                    >
                      Thuật Toán Đường Găng CPM
                    </span>
                  </div>
                  <span className="font-mono text-[#BE123C] font-bold shrink-0">24h (+4h)</span>
                </div>
                <div className="col-span-8 relative h-7">
                  <div className="absolute left-[16%] w-[38%] h-full rounded bg-[#BE123C] text-white font-mono text-[10px] flex items-center justify-between px-2.5 font-bold shadow-xs">
                    <span>||</span>
                    <span>ĐN • 24h (+4h)</span>
                    <span className="cursor-ew-resize bg-white/30 px-1 rounded hover:bg-white/50">
                      ••
                    </span>
                  </div>
                  {/* Tooltip Kéo giãn */}
                  <div className="absolute left-[45%] -top-4 rounded bg-[#0F172A] px-1.5 py-0.5 text-[9px] font-mono text-white shadow-md">
                    ● Kéo giãn +4h
                  </div>
                </div>
              </div>

              {/* Hàng 3: #TASK-02 (Slack) */}
              <div className="grid grid-cols-12 py-3 px-4 items-center hover:bg-slate-50/60 transition-colors">
                <div className="col-span-4 flex items-center justify-between pr-4 min-w-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-[#475569] shrink-0">#TASK-02</span>
                    <span className="truncate font-medium text-[#0F172A]" title="Giao Diện Mobile Onboarding">
                      Giao Diện Mobile Onboarding
                    </span>
                  </div>
                  <span className="font-mono text-[#64748B] shrink-0">12h</span>
                </div>
                <div className="col-span-8 relative h-7 flex items-center">
                  <div className="absolute left-[16%] w-[18%] h-full rounded bg-[#4F46E5] text-white font-mono text-[10px] flex items-center justify-center font-bold shadow-2xs">
                    TL • 12h
                  </div>
                  <div className="absolute left-[34%] w-[16%] h-full rounded bg-slate-100 border border-dashed border-slate-300 text-slate-500 font-mono text-[10px] flex items-center justify-center">
                    Slack: 12h
                  </div>
                </div>
              </div>

              {/* Hàng 4: #TASK-04 */}
              <div className="grid grid-cols-12 py-3 px-4 items-center hover:bg-slate-50/60 transition-colors">
                <div className="col-span-4 flex items-center justify-between pr-4 min-w-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-[#BE123C] shrink-0">#TASK-04</span>
                    <span className="truncate font-semibold text-[#0F172A]" title="Tích Hợp Engine Suy Luận vLLM">
                      Tích Hợp Engine Suy Luận
                    </span>
                  </div>
                  <span className="font-mono text-[#64748B] shrink-0">24h</span>
                </div>
                <div className="col-span-8 relative h-7">
                  <div className="absolute left-[54%] w-[32%] h-full rounded bg-[#BE123C] text-white font-mono text-[10px] flex items-center justify-between px-2.5 font-bold shadow-xs">
                    <span>||</span>
                    <span>HN • 24h</span>
                    <span>||</span>
                  </div>
                </div>
              </div>

              {/* Hàng 5: #TASK-09 */}
              <div className="grid grid-cols-12 py-3 px-4 items-center hover:bg-slate-50/60 transition-colors">
                <div className="col-span-4 flex items-center justify-between pr-4 min-w-0">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-mono font-bold text-[#BE123C] shrink-0">#TASK-09</span>
                    <span className="truncate font-semibold text-[#0F172A]" title="Kiểm Thử Hồi Quy & Đóng Gói">
                      Kiểm Thử Hồi Quy &amp; Đóng Gói
                    </span>
                  </div>
                  <span className="font-mono text-[#64748B] shrink-0">16h</span>
                </div>
                <div className="col-span-8 relative h-7">
                  <div className="absolute left-[86%] w-[14%] h-full rounded bg-[#BE123C] text-white font-mono text-[10px] flex items-center justify-between px-2 font-bold shadow-xs">
                    <span>||</span>
                    <span>ĐN • 16h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dòng mốc dự kiến & Action Bar */}
            <div className="border-t border-[#E2E8F0] p-4 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#0F172A]">
                <AppIcons.target size={15} className="text-[#BE123C]" />
                <span>
                  Mốc hoàn thành dự kiến (Project Finish):{' '}
                  <strong className="font-mono font-bold text-[#0F172A]">18/12/2026</strong>{' '}
                  <span className="font-mono text-[#BE123C] font-semibold">
                    (Dịch chuyển +4h so với Baseline ban đầu)
                  </span>
                  .
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSimulatedExtension(false)}
                  className="h-8 text-xs border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50"
                >
                  Hoàn Tác Thay Đổi
                </Button>
                <Button
                  size="sm"
                  className="h-8 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold shadow-xs"
                >
                  Lưu &amp; Cập Nhật Lịch Biểu
                </Button>
              </div>
            </div>
          </div>

          {/* 3 Thẻ Chỉ Số Dưới Cùng */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#BE123C]">
                <AppIcons.criticalAlert size={15} />
                <span className="text-xs font-bold uppercase">Độ Dài Đường Găng Hiện Tại</span>
              </div>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">80 Giờ Công</div>
              <p className="text-[11px] text-[#64748B]">
                Đã tăng 4h từ #TASK-01 mô phỏng kéo giãn.
              </p>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#0D9488]">
                <AppIcons.verifiedCheck size={15} />
                <span className="text-xs font-bold uppercase">Chỉ Số Độ Trễ Rủi Ro (SPI)</span>
              </div>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">0.96 / 1.00</div>
              <p className="text-[11px] text-[#64748B]">
                Vẫn trong ngưỡng dung sai cho phép (&gt;0.90).
              </p>
            </div>

            <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#4F46E5]">
                <AppIcons.clock size={15} />
                <span className="text-xs font-bold uppercase">Khoảng Trôi Toàn Phần (Total Float)</span>
              </div>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">12h Còn Lại</div>
              <p className="text-[11px] text-[#64748B]">
                Tác vụ #TASK-02 không làm xê dịch hạn cuối.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DagGanttPage;
