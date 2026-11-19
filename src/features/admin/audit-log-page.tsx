import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export type LogFilterTab = 'ALL' | 'SUCCESS' | 'TIMEOUT' | 'TOKEN_EXCEEDED' | 'FALLBACK';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  endpoint: string;
  taskTitle: string;
  isTaskTitleCritical?: boolean;
  model: string;
  latencyMs: number;
  isLatencyCritical?: boolean;
  statusHttp: '200_OK' | '504_TIMEOUT' | '200_FALLBACK';
  category: LogFilterTab;
}

const INITIAL_LOGS: AuditLogEntry[] = [
  {
    id: 'req-01',
    timestamp: '14:28:05',
    endpoint: 'POST /v1/ai/cpm/calculate-dag',
    taskTitle: 'Tính toán đường găng DAG (Smart Workspace Core)',
    model: 'vLLM / Qwen-2.5',
    latencyMs: 124,
    statusHttp: '200_OK',
    category: 'SUCCESS',
  },
  {
    id: 'req-02',
    timestamp: '14:26:12',
    endpoint: 'POST /v1/ai/rag/parse-srs',
    taskTitle: 'Phân rã thực thể tài liệu SRS v2.0',
    model: 'OpenAI / GPT-4o-mini',
    latencyMs: 840,
    statusHttp: '200_OK',
    category: 'SUCCESS',
  },
  {
    id: 'req-03',
    timestamp: '14:21:40',
    endpoint: 'POST /v1/ai/matchmaking/rank',
    taskTitle: 'Khớp hồ sơ năng lực & Elo thành viên',
    model: 'vLLM / Llama-3',
    latencyMs: 215,
    statusHttp: '200_OK',
    category: 'SUCCESS',
  },
  {
    id: 'req-04',
    timestamp: '14:15:02',
    endpoint: 'POST /v1/ai/rag/parse-srs',
    taskTitle: 'Bóc tách file PDF 80 trang',
    isTaskTitleCritical: true,
    model: 'vLLM Worker #1',
    latencyMs: 5200,
    isLatencyCritical: true,
    statusHttp: '504_TIMEOUT',
    category: 'TIMEOUT',
  },
  {
    id: 'req-05',
    timestamp: '14:15:05',
    endpoint: 'POST /v1/ai/rag/parse-srs',
    taskTitle: 'Tự động kích hoạt Fallback luồng bóc tách',
    model: 'Fallback → GPT-4o',
    latencyMs: 1120,
    statusHttp: '200_FALLBACK',
    category: 'FALLBACK',
  },
];

export const AuditLogPage: React.FC = () => {
  const [filterTab, setFilterTab] = useState<LogFilterTab>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [logs] = useState<AuditLogEntry[]>(INITIAL_LOGS);
  const [pingStatus, setPingStatus] = useState<string>('Ping AI Service');
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const handlePing = () => {
    setIsPinging(true);
    setPingStatus('Đang ping...');
    setTimeout(() => {
      setIsPinging(false);
      setPingStatus('AI Service Online (38ms)');
      setTimeout(() => setPingStatus('Ping AI Service'), 3500);
    }, 800);
  };

  const filteredLogs = logs.filter((log) => {
    const matchSearch =
      log.endpoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.taskTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.id.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;
    if (filterTab === 'SUCCESS') return log.statusHttp === '200_OK';
    if (filterTab === 'TIMEOUT') return log.statusHttp === '504_TIMEOUT';
    if (filterTab === 'FALLBACK') return log.statusHttp === '200_FALLBACK';
    return true;
  });

  return (
    <div className="space-y-6 select-none font-sans text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Nhật Ký Kiểm Toán & Đo Lường Độ Trễ AI (AI Service Audit)
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Giám sát thời gian phản hồi thực tế, tỷ lệ SLA và luồng xử lý tự động Fallback vLLM / OpenAI theo thời gian thực.
          </p>
        </div>

        <Button
          onClick={handlePing}
          disabled={isPinging}
          className="gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto"
        >
          {isPinging ? (
            <AppIcons.refresh size={14} className="animate-spin text-white" />
          ) : (
            <AppIcons.zap size={14} />
          )}
          <span>{pingStatus}</span>
        </Button>
      </div>

      {/* Row of 3 KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* KPI 1: Average Latency */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              ĐỘ TRỄ TRUNG BÌNH (AVG LATENCY)
            </span>
            <div className="h-7 w-7 rounded bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
              <AppIcons.clock size={15} />
            </div>
          </div>

          <div>
            <div className="font-mono text-3xl font-extrabold text-[#0F172A] tracking-tight">
              182ms
            </div>
            <p className="font-mono text-xs font-semibold text-[#0D9488] mt-1">
              ↓ 14ms so với giờ trước
            </p>
          </div>

          <div className="border-t border-[#E2E8F0] pt-2.5 flex items-center justify-between font-mono text-[11px] text-[#64748B]">
            <span>P95: <strong>340ms</strong> • P99: <strong>610ms</strong></span>
            <AppIcons.clock size={12} className="text-slate-400" />
          </div>
        </div>

        {/* KPI 2: Success Rate */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              TỶ LỆ THÀNH CÔNG (REQUEST SUCCESS RATE)
            </span>
            <div className="h-7 w-7 rounded bg-teal-50 text-[#0D9488] flex items-center justify-center">
              <AppIcons.checkCircle size={15} />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl font-extrabold text-[#0F172A] tracking-tight">
                99.4%
              </span>
              <span className="font-mono text-xs text-[#64748B]">(Target: 99.0%)</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 mt-2 overflow-hidden">
              <div className="h-full bg-[#4F46E5] rounded-full w-[99.4%]"></div>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] pt-2.5 flex items-center justify-between font-mono text-[11px] text-[#64748B]">
            <span>28,410 lượt gọi thành công hôm nay</span>
            <AppIcons.checkCircle2 size={13} className="text-[#0D9488]" />
          </div>
        </div>

        {/* KPI 3: Issues & Fallback */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
              SỰ CỐ & FALLBACK (ISSUES DETECTED)
            </span>
            <div className="h-7 w-7 rounded bg-rose-50 text-[#BE123C] flex items-center justify-center">
              <AppIcons.criticalAlert size={15} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-3xl font-extrabold text-[#BE123C] tracking-tight">
                16 lỗi
              </span>
              <span className="font-mono text-[11px] text-[#64748B] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">
                0.06% tổng lượt
              </span>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] pt-2.5 flex items-center justify-between font-mono text-[11px] text-[#64748B]">
            <span>12 Timeout • 4 Token Exceeded</span>
            <AppIcons.criticalAlert size={13} className="text-amber-500" />
          </div>
        </div>
      </div>

      {/* Audit Log Table Section */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
        {/* Top Controls: Search + Filter Chips + CSV Button */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="flex flex-wrap items-center gap-2.5 flex-1">
            {/* Search */}
            <div className="relative min-w-[240px] max-w-sm flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                <AppIcons.search size={14} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo Request ID, Endpoint, Task ID..."
                className="w-full h-8 rounded-md border border-[#E2E8F0] bg-white pl-8 pr-3 text-xs text-[#0F172A] focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] transition-colors font-mono"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setFilterTab('ALL')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  filterTab === 'ALL'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Tất cả (28,426)
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('SUCCESS')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  filterTab === 'SUCCESS'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Thành công 200 OK (28,410)
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('TIMEOUT')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  filterTab === 'TIMEOUT'
                    ? 'bg-[#BE123C] text-white shadow-xs'
                    : 'bg-rose-50 text-[#BE123C] border border-rose-200 hover:bg-rose-100'
                }`}
              >
                Timeout (12)
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('TOKEN_EXCEEDED')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  filterTab === 'TOKEN_EXCEEDED'
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-100 text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Token Exceeded (4)
              </button>
              <button
                type="button"
                onClick={() => setFilterTab('FALLBACK')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                  filterTab === 'FALLBACK'
                    ? 'bg-[#4F46E5] text-white shadow-xs'
                    : 'bg-indigo-50 text-[#4F46E5] border border-indigo-200 hover:bg-indigo-100'
                }`}
              >
                Fallback Triggered (8)
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Xuất toàn bộ 28,426 dòng log sang CSV...')}
            className="h-8 gap-1.5 text-xs font-semibold text-[#0F172A] border-[#E2E8F0] hover:bg-slate-100 shrink-0"
          >
            <AppIcons.download size={13} />
            <span>Xuất Log Kiểm Toán (CSV)</span>
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                <th className="py-2.5 pr-2">THỜI GIAN</th>
                <th className="py-2.5 px-2">ENDPOINT API</th>
                <th className="py-2.5 px-2">TÁC VỤ NGHIỆP VỤ</th>
                <th className="py-2.5 px-2">MODEL XỬ LÝ</th>
                <th className="py-2.5 px-2 text-center">ĐỘ TRỄ (LATENCY)</th>
                <th className="py-2.5 pl-2 text-right">TRẠNG THÁI HTTP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                  {/* Timestamp */}
                  <td className="py-3 pr-2 font-mono text-[11px] text-[#64748B] whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  {/* Endpoint */}
                  <td className="py-3 px-2 font-mono text-xs font-bold text-[#0F172A] whitespace-nowrap">
                    {log.endpoint}
                  </td>

                  {/* Task title */}
                  <td className="py-3 px-2">
                    <span
                      className={`text-xs ${
                        log.isTaskTitleCritical
                          ? 'font-bold text-[#BE123C]'
                          : 'font-medium text-[#334155]'
                      }`}
                    >
                      {log.taskTitle}
                    </span>
                  </td>

                  {/* Model */}
                  <td className="py-3 px-2 whitespace-nowrap">
                    <span className="font-mono text-[10px] font-semibold text-[#475569] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      {log.model}
                    </span>
                  </td>

                  {/* Latency */}
                  <td className="py-3 px-2 text-center whitespace-nowrap">
                    <span
                      className={`font-mono text-xs ${
                        log.isLatencyCritical
                          ? 'font-bold text-[#BE123C]'
                          : 'font-bold text-[#0F172A]'
                      }`}
                    >
                      {log.latencyMs.toLocaleString()}ms{' '}
                      {log.isLatencyCritical && (
                        <span className="text-[10px] font-semibold">(Vượt ngưỡng)</span>
                      )}
                    </span>
                  </td>

                  {/* HTTP Status */}
                  <td className="py-3 pl-2 text-right whitespace-nowrap">
                    {log.statusHttp === '200_OK' && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
                        200 OK
                      </span>
                    )}
                    {log.statusHttp === '504_TIMEOUT' && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#BE123C] bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C]"></span>
                        504 GATEWAY TIMEOUT
                      </span>
                    )}
                    {log.statusHttp === '200_FALLBACK' && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4F46E5]"></span>
                        200 OK (FALLBACK)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination & Live refresh info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-[#E2E8F0] pt-3 text-xs text-[#64748B] gap-2">
          <span>
            Hiển thị <strong>5</strong> trong tổng số <strong>28,426 logs</strong> • Tự động làm mới mỗi 5 giây
          </span>
          <div className="flex items-center gap-1 font-mono text-xs self-start sm:self-auto">
            <span className="px-2.5 py-1 rounded hover:bg-slate-100 cursor-pointer">Trước</span>
            <span className="px-2.5 py-1 rounded bg-[#0F172A] text-white font-bold">1</span>
            <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">2</span>
            <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">3</span>
            <span>...</span>
            <span className="px-2 py-1 rounded hover:bg-slate-100 cursor-pointer">5,685</span>
            <span className="px-2.5 py-1 rounded hover:bg-slate-100 cursor-pointer">Sau</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLogPage;
