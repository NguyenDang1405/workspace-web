import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';
import { AnalyticsSubNav } from '@/components/layout/analytics-sub-nav';

export type EloFilterTab = 'ALL' | 'CORE_PROJECT' | 'CODE_REVIEW';

export interface EloHistoryEntry {
  id: string;
  timestamp: string;
  taskTitle: string;
  taskCode: string;
  moduleName: string;
  difficulty: 'HARD' | 'MEDIUM' | 'BASIC';
  difficultyLabel: string;
  eloChange: number; // e.g. +24, -8
  newElo: number;
  category: 'CORE_PROJECT' | 'CODE_REVIEW';
  isSlaViolation?: boolean;
  slaNote?: string;
}

const ELO_HISTORY: EloHistoryEntry[] = [
  {
    id: 'elo-1',
    timestamp: '04/11 - 16:20',
    taskTitle: 'Tích hợp suy luận vLLM offline cho',
    taskCode: '#PRJ-104',
    moduleName: 'Core Engine RAG',
    difficulty: 'HARD',
    difficultyLabel: 'Khó (1.5x)',
    eloChange: 24,
    newElo: 1745,
    category: 'CORE_PROJECT',
  },
  {
    id: 'elo-2',
    timestamp: '02/11 - 10:15',
    taskTitle: 'Tối ưu hóa thuật toán đường găng...',
    taskCode: '#PRJ-104',
    moduleName: 'Scheduler Graph',
    difficulty: 'HARD',
    difficultyLabel: 'Khó (1.5x)',
    eloChange: 18,
    newElo: 1721,
    category: 'CORE_PROJECT',
  },
  {
    id: 'elo-3',
    timestamp: '28/10 - 14:40',
    taskTitle: 'Sửa lỗi tràn bộ nhớ Worker HNSW...',
    taskCode: '#PRJ-019',
    moduleName: 'Vector DB Patch',
    difficulty: 'MEDIUM',
    difficultyLabel: 'Trung bình (1.0x)',
    eloChange: 12,
    newElo: 1703,
    category: 'CORE_PROJECT',
  },
  {
    id: 'elo-4',
    timestamp: '24/10 - 09:30',
    taskTitle: 'Trễ hạn bàn giao module đồng bộ...',
    taskCode: '#PRJ-082',
    moduleName: 'Sync Worker',
    difficulty: 'BASIC',
    difficultyLabel: 'Cơ bản (0.8x)',
    eloChange: -8,
    newElo: 1691,
    category: 'CORE_PROJECT',
    isSlaViolation: true,
    slaNote: 'SLA Violation (-2 ngày)',
  },
  {
    id: 'elo-5',
    timestamp: '20/10 - 15:00',
    taskTitle: 'Phê duyệt kiến trúc Multi-Agent & RAG pipeline',
    taskCode: '#PR-142',
    moduleName: 'Core PR Review',
    difficulty: 'HARD',
    difficultyLabel: 'Khó (1.5x)',
    eloChange: 15,
    newElo: 1699,
    category: 'CODE_REVIEW',
  },
  {
    id: 'elo-6',
    timestamp: '15/10 - 11:20',
    taskTitle: 'Thẩm định PR chuẩn hóa AppIcons SVG Registry',
    taskCode: '#PR-128',
    moduleName: 'Design System',
    difficulty: 'MEDIUM',
    difficultyLabel: 'Trung bình (1.0x)',
    eloChange: 10,
    newElo: 1684,
    category: 'CODE_REVIEW',
  },
];

// 6 Skill Radar Axes
const RADAR_AXES = [
  { label: 'AI & Vector RAG', score: 92, max: 100 },
  { label: 'Thuật Toán DAG & CPM', score: 85, max: 100 },
  { label: 'DevOps & CI/CD', score: 68, max: 100 },
  { label: 'Kiểm Thử & QA', score: 74, max: 100 },
  { label: 'Frontend & Mobile', score: 82, max: 100 },
  { label: 'Backend Architecture', score: 88, max: 100 },
];

export const SkillEloPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterTab, setFilterTab] = useState<EloFilterTab>('ALL');
  const [showAllHistory, setShowAllHistory] = useState<boolean>(false);

  // Filter history entries
  const filteredHistory = useMemo(() => {
    let list = ELO_HISTORY;
    if (filterTab === 'CORE_PROJECT') {
      list = list.filter((item) => item.category === 'CORE_PROJECT');
    } else if (filterTab === 'CODE_REVIEW') {
      list = list.filter((item) => item.category === 'CODE_REVIEW');
    }
    return showAllHistory ? list : list.slice(0, 4);
  }, [filterTab, showAllHistory]);

  // ========================================================
  // Radar Geometry Calculations (Center: 150, 150; Radius: 100)
  // ========================================================
  const centerX = 160;
  const centerY = 145;
  const maxRadius = 90;
  const numAxes = RADAR_AXES.length; // 6
  const angleStep = (2 * Math.PI) / numAxes;
  const startAngle = -Math.PI / 2; // start at top

  // Concentric hexagonal grid webs (20%, 40%, 60%, 80%, 100%)
  const gridWebs = [0.2, 0.4, 0.6, 0.8, 1.0].map((level) => {
    const points = Array.from({ length: numAxes }).map((_, i) => {
      const angle = startAngle + i * angleStep;
      const x = centerX + maxRadius * level * Math.cos(angle);
      const y = centerY + maxRadius * level * Math.sin(angle);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return points.join(' ');
  });

  // Calculate coordinates for 6 score vertices
  const dataPoints = RADAR_AXES.map((axis, i) => {
    const angle = startAngle + i * angleStep;
    const ratio = axis.score / axis.max;
    const x = centerX + maxRadius * ratio * Math.cos(angle);
    const y = centerY + maxRadius * ratio * Math.sin(angle);
    return { x, y };
  });

  const polygonPath = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Labels coordinates (pushed slightly further out)
  const labelPositions = RADAR_AXES.map((axis, i) => {
    const angle = startAngle + i * angleStep;
    const labelRadius = maxRadius + 28;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { ...axis, x, y, index: i };
  });

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#F8FAFC] p-6 text-[#0F172A] space-y-5 select-none font-sans">
      {/* Sub-Navigation Chuyển Đổi Phân Hệ 6 */}
      <div className="flex items-center justify-between pb-1">
        <AnalyticsSubNav />
      </div>

      <div className="max-w-7xl w-full mx-auto space-y-5">
        {/* ======================================================== */}
        {/* 3. PROFILE HEADER & OVERALL ELO CARD                    */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left: User Identity */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#0F172A] text-xl font-bold text-white shadow-xs">
                ĐN
              </div>
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-[#0D9488] ring-2 ring-white"></span>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-bold text-[#0F172A]">Đặng Hồng Nguyên</h1>
                <span className="font-mono text-[11px] font-semibold text-[#475569] bg-slate-100 border border-[#E2E8F0] px-2 py-0.5 rounded-md">
                  Khoa CNTT - ĐH Bách Khoa
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-1 font-medium">
                Kỹ sư Phần mềm • Full-Stack & AI Systems
              </p>
            </div>
          </div>

          {/* Center: Large Elo Score */}
          <div className="text-center md:border-x md:border-[#E2E8F0] md:px-8">
            <div className="font-mono text-3xl font-extrabold text-[#0F172A] tracking-tight">
              1,745
            </div>
            <div className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wider mt-0.5">
              Điểm Năng Lực Skill Elo
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                <AppIcons.trophy size={11} className="text-amber-600" />
                <span>TIER: GOLD RANK</span>
              </span>

              <span className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
                <span>Top 4.2% Kỹ sư trong Workspace</span>
              </span>
            </div>
          </div>

          {/* Right: Completed Tasks */}
          <div className="text-right">
            <div className="inline-flex items-center gap-1.5 font-mono text-lg font-bold text-[#0F172A]">
              <AppIcons.verifiedCheck size={18} className="text-[#4F46E5]" />
              <span>34 Tác Vụ</span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">Đã nghiệm thu chính thức</p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. MIDDLE SECTION: RADAR CHART (5 cols) & HISTORY (7 cols) */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ====================================================== */}
          {/* Left Column (Span 5): 6-Axis Technical Radar Chart      */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2.5">
                <div>
                  <h2 className="text-sm font-bold text-[#0F172A]">
                    Biểu Đồ Radar 6 Trục Kỹ Năng
                  </h2>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Tính toán tự động từ vector embeddings và độ phức tạp mã nguồn
                  </p>
                </div>
                <div className="text-[#64748B]">
                  <AppIcons.target size={18} />
                </div>
              </div>

              {/* Mathematical SVG Radar Chart */}
              <div className="my-4 flex items-center justify-center">
                <svg
                  viewBox="0 0 320 290"
                  className="w-full max-w-[340px] h-auto overflow-visible select-none"
                >
                  {/* Concentric Hexagon Webs */}
                  {gridWebs.map((points, idx) => (
                    <polygon
                      key={idx}
                      points={points}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeWidth={idx === 4 ? 1.5 : 1}
                      strokeDasharray={idx < 4 ? '3 3' : undefined}
                    />
                  ))}

                  {/* 6 Axis Spoke Lines */}
                  {Array.from({ length: numAxes }).map((_, i) => {
                    const angle = startAngle + i * angleStep;
                    const x = centerX + maxRadius * Math.cos(angle);
                    const y = centerY + maxRadius * Math.sin(angle);
                    return (
                      <line
                        key={i}
                        x1={centerX}
                        y1={centerY}
                        x2={x}
                        y2={y}
                        stroke="#CBD5E1"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Polygon Data Fill & Stroke */}
                  <polygon
                    points={polygonPath}
                    fill="#4F46E5"
                    fillOpacity="0.18"
                    stroke="#4F46E5"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />

                  {/* Dots at vertices */}
                  {dataPoints.map((p, i) => (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="4" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="1.5" />
                    </g>
                  ))}

                  {/* Axis Labels & Values */}
                  {labelPositions.map((item) => {
                    let textAnchor: 'start' | 'middle' | 'end' = 'middle';
                    let dx = 0;
                    let dy = 0;

                    if (item.index === 0) {
                      // Top
                      textAnchor = 'middle';
                      dy = -10;
                    } else if (item.index === 1) {
                      // Top-Right
                      textAnchor = 'start';
                      dx = 5;
                      dy = -2;
                    } else if (item.index === 2) {
                      // Bottom-Right
                      textAnchor = 'start';
                      dx = 5;
                      dy = 8;
                    } else if (item.index === 3) {
                      // Bottom
                      textAnchor = 'middle';
                      dy = 14;
                    } else if (item.index === 4) {
                      // Bottom-Left
                      textAnchor = 'end';
                      dx = -5;
                      dy = 8;
                    } else if (item.index === 5) {
                      // Top-Left
                      textAnchor = 'end';
                      dx = -5;
                      dy = -2;
                    }

                    return (
                      <g key={item.label} transform={`translate(${item.x + dx}, ${item.y + dy})`}>
                        <text
                          textAnchor={textAnchor}
                          className="text-[10px] font-bold fill-[#0F172A]"
                        >
                          {item.label}
                        </text>
                        <text
                          textAnchor={textAnchor}
                          y="11"
                          className="font-mono text-[9px] font-bold fill-[#4F46E5]"
                        >
                          {item.score}/100
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            {/* Bottom Note */}
            <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 text-xs text-[#64748B]">
              <AppIcons.code size={14} className="text-[#4F46E5] shrink-0" />
              <span className="font-mono text-[11px]">
                Mô hình đo lường: <strong>Bayesian Elo Updating (K=24)</strong>
              </span>
            </div>
          </div>

          {/* ====================================================== */}
          {/* Right Column (Span 7): Task Elo Progression History     */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
            <div>
              {/* Header & Segmented Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
                <h2 className="text-sm font-bold text-[#0F172A]">
                  Lịch Sử Thăng Hạng Qua Từng Tác Vụ
                </h2>

                <div className="flex items-center bg-[#F1F5F9] p-0.5 rounded-md border border-[#E2E8F0] text-xs">
                  <button
                    type="button"
                    onClick={() => setFilterTab('ALL')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      filterTab === 'ALL'
                        ? 'bg-[#4F46E5] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Tất cả
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterTab('CORE_PROJECT')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      filterTab === 'CORE_PROJECT'
                        ? 'bg-[#4F46E5] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Dự Án Lõi
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterTab('CODE_REVIEW')}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      filterTab === 'CODE_REVIEW'
                        ? 'bg-[#4F46E5] text-white shadow-xs'
                        : 'text-[#64748B] hover:text-[#0F172A]'
                    }`}
                  >
                    Code Review PR
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th className="py-2.5 pr-2 font-bold">THỜI GIAN</th>
                      <th className="py-2.5 px-2 font-bold">TÁC VỤ HOÀN THÀNH</th>
                      <th className="py-2.5 px-2 font-bold">ĐỘ KHÓ (W)</th>
                      <th className="py-2.5 px-2 text-center font-bold">BIẾN ĐỘNG</th>
                      <th className="py-2.5 pl-2 text-right font-bold">ĐIỂM MỚI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {filteredHistory.map((entry) => (
                      <tr key={entry.id} className="hover:bg-[#F8FAFC] transition-colors">
                        {/* Timestamp */}
                        <td className="py-3 pr-2 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                          {entry.timestamp}
                        </td>

                        {/* Task Title + Code */}
                        <td className="py-3 px-2">
                          <div className="text-xs font-semibold text-[#0F172A] line-clamp-1">
                            {entry.taskTitle}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[11px] font-bold text-[#4F46E5]">
                              {entry.taskCode}
                            </span>
                            <span className="text-[#CBD5E1] text-[10px]">•</span>
                            <span className="text-[11px] text-[#64748B]">{entry.moduleName}</span>
                            {entry.isSlaViolation && (
                              <span className="font-mono text-[10px] font-semibold text-[#BE123C] bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                                {entry.slaNote}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Difficulty */}
                        <td className="py-3 px-2 whitespace-nowrap">
                          <span
                            className={`font-mono text-[10px] font-semibold px-2 py-0.5 rounded border ${
                              entry.difficulty === 'HARD'
                                ? 'bg-indigo-50 text-[#4F46E5] border-indigo-200'
                                : entry.difficulty === 'MEDIUM'
                                ? 'bg-slate-100 text-[#475569] border-slate-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {entry.difficultyLabel}
                          </span>
                        </td>

                        {/* Elo Change */}
                        <td className="py-3 px-2 text-center whitespace-nowrap">
                          <span
                            className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded ${
                              entry.eloChange >= 0
                                ? 'bg-[#F0FDF4] text-[#0D9488]'
                                : 'bg-[#FFF1F2] text-[#BE123C]'
                            }`}
                          >
                            {entry.eloChange >= 0 ? `+${entry.eloChange} Elo` : `${entry.eloChange} Elo`}
                          </span>
                        </td>

                        {/* New Elo */}
                        <td className="py-3 pl-2 text-right font-mono text-xs font-bold text-[#0F172A] whitespace-nowrap">
                          {entry.newElo.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Button */}
            <button
              type="button"
              onClick={() => setShowAllHistory(!showAllHistory)}
              className="w-full py-2.5 rounded-md border border-[#E2E8F0] bg-white text-xs font-semibold text-[#0F172A] hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>{showAllHistory ? 'Thu Gọn Lịch Sử' : 'Xem Toàn Bộ Lịch Sử 34 Tác Vụ'}</span>
              <AppIcons.arrowRight size={13} />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 5. BOTTOM 3 QUALITY METRICS CARDS                        */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Code Quality */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0 border border-indigo-100">
              <AppIcons.code size={20} />
            </div>
            <div>
              <p className="text-xs text-[#64748B]">Đánh giá Code Quality</p>
              <div className="font-mono text-xl font-bold text-[#0F172A]">98.4 / 100</div>
              <p className="font-mono text-[11px] font-semibold text-[#0D9488] mt-0.5">
                A+ Clean Architecture
              </p>
            </div>
          </div>

          {/* Card 2: Turnaround Time */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-cyan-50 text-[#06B6D4] flex items-center justify-center shrink-0 border border-cyan-100">
              <AppIcons.gauge size={20} />
            </div>
            <div>
              <p className="text-xs text-[#64748B]">Thời gian giải quyết tác vụ</p>
              <div className="font-mono text-xl font-bold text-[#0F172A]">1.4 ngày / TB</div>
              <p className="font-mono text-[11px] font-semibold text-[#0D9488] mt-0.5">
                Nhanh hơn 38% trung bình
              </p>
            </div>
          </div>

          {/* Card 3: Algorithm Reliability */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-center gap-4">
            <div className="h-11 w-11 rounded-lg bg-teal-50 text-[#0D9488] flex items-center justify-center shrink-0 border border-teal-100">
              <AppIcons.network size={20} />
            </div>
            <div>
              <p className="text-xs text-[#64748B]">Độ tin cậy Thuật Toán</p>
              <div className="font-mono text-xl font-bold text-[#0F172A]">99.1%</div>
              <p className="font-mono text-[11px] font-semibold text-[#0D9488] mt-0.5">
                0 regressions detected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillEloPage;
