import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const PulsePage: React.FC = () => {
  const [isVerifyingHNSW, setIsVerifyingHNSW] = useState<boolean>(false);
  const [hnswStatusText, setHnswStatusText] = useState<string>('Kiểm Tra Chỉ Mục (Verify HNSW)');

  const handleVerifyHNSW = () => {
    setIsVerifyingHNSW(true);
    setHnswStatusText('Đang kiểm tra HNSW index...');
    setTimeout(() => {
      setIsVerifyingHNSW(false);
      setHnswStatusText('Chỉ Mục HNSW 100% Khớp Lệnh (Latency 8.4ms)');
      setTimeout(() => {
        setHnswStatusText('Kiểm Tra Chỉ Mục (Verify HNSW)');
      }, 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Xung Nhịp Hạ Tầng & Dịch Vụ AI
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Theo dõi tình trạng hoạt động thời gian thực của máy chủ nghiệp vụ, AI runtime và cơ sở dữ liệu vector.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-teal-200 text-[#0D9488] font-mono text-xs font-semibold self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse"></span>
          <span>2 Nodes Online • Tải hệ thống: 46.3%</span>
        </div>
      </div>

      {/* 4 Monitoring Cards (2x2 Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ======================================================== */}
        {/* Card 1: workspace-api Server                            */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          {/* Card Top */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5 text-sm font-bold text-[#0F172A]">
              <AppIcons.server size={16} className="text-[#4F46E5]" />
              <span>Máy Chủ Nghiệp Vụ: workspace-api</span>
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
              ONLINE
            </span>
          </div>

          {/* Sub Metrics: CPU & RAM */}
          <div className="grid grid-cols-2 gap-4">
            {/* CPU */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B]">CPU Usage</span>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">24.5%</div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#0D9488] rounded-full w-[24.5%]"></div>
              </div>
            </div>

            {/* RAM */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B]">RAM</span>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">32%</div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full w-[32%]"></div>
              </div>
            </div>
          </div>

          {/* Card Footer: WebSockets & Uptime */}
          <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0] text-xs">
            <div className="flex items-center gap-2 font-mono text-[#0F172A]">
              <span className="h-2 w-2 rounded-full bg-[#0D9488]"></span>
              <span>WebSockets: <strong>142</strong></span>
            </div>
            <div className="font-mono text-xs text-[#64748B]">
              Uptime: <span className="font-bold text-[#0F172A] bg-slate-100 px-1.5 py-0.5 rounded">99.98%</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Card 2: ai-service Server                               */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          {/* Card Top */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5 text-sm font-bold text-[#0F172A]">
              <AppIcons.adminAgent size={16} className="text-[#4F46E5]" />
              <span>Máy Chủ Trí Tuệ Nhân Tạo: ai-service</span>
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
              ONLINE
            </span>
          </div>

          {/* Sub Metrics: GPU & VRAM */}
          <div className="grid grid-cols-2 gap-4">
            {/* GPU Load */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B]">GPU Load</span>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">68.2%</div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[68.2%]"></div>
              </div>
            </div>

            {/* VRAM */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2">
              <span className="text-[11px] font-semibold text-[#64748B]">VRAM</span>
              <div className="font-mono text-2xl font-bold text-[#0F172A]">67.5%</div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full w-[67.5%]"></div>
              </div>
            </div>
          </div>

          {/* Card Footer: Latency & Queue */}
          <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-[#64748B]">Latency:</span>
              <span className="font-mono font-bold text-[#4F46E5] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                210ms
              </span>
            </div>
            <div className="font-mono text-xs text-[#64748B]">
              Queue: <span className="font-bold text-[#0F172A] bg-slate-100 px-1.5 py-0.5 rounded">0</span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Card 3: OpenAI API Tokens & Monthly Cost                */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          {/* Card Top */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5 text-sm font-bold text-[#0F172A]">
              <AppIcons.navAiDecompose size={16} className="text-[#4F46E5]" />
              <span>Tiêu Thụ OpenAI API & Chi Phí</span>
            </div>
            <span className="font-mono text-[11px] font-semibold text-[#64748B] bg-slate-100 border border-[#E2E8F0] px-2 py-0.5 rounded">
              Tháng 10/2024
            </span>
          </div>

          {/* 3 Metric Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
              <span className="text-[10px] font-semibold text-[#64748B] block truncate">Input Tokens</span>
              <div className="font-mono text-base font-bold text-[#0F172A] mt-1">412,800</div>
            </div>

            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
              <span className="text-[10px] font-semibold text-[#64748B] block truncate">Output Tokens</span>
              <div className="font-mono text-base font-bold text-[#4F46E5] mt-1">138,450</div>
            </div>

            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5">
              <span className="text-[10px] font-semibold text-[#64748B] block truncate">Chi phí tháng</span>
              <div className="font-mono text-base font-bold text-[#0F172A] mt-1">
                $42.80 <span className="text-[11px] font-normal text-[#64748B]">/ $100</span>
              </div>
              <span className="inline-flex items-center gap-1 font-mono text-[9px] font-semibold text-[#0D9488] bg-teal-50 border border-teal-200 px-1 py-0.2 rounded mt-1">
                <span className="h-1 w-1 rounded-full bg-[#0D9488]"></span>
                Trong ngưỡng an toàn
              </span>
            </div>
          </div>

          {/* SVG Line Chart: 14-day cumulative cost */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-[11px] text-[#64748B] mb-2 font-mono">
              <span>Chi phí tích lũy 14 ngày (USD)</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#4F46E5]"></span>
                  <span>Chi phí ngày</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-0.5 w-3 bg-[#06B6D4]"></span>
                  <span>Ngưỡng cảnh báo ($8/ngày)</span>
                </span>
              </div>
            </div>

            <div className="h-28 w-full">
              <svg viewBox="0 0 400 110" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Threshold line: $8/day */}
                <line x1="10" y1="28" x2="390" y2="28" stroke="#06B6D4" strokeWidth="1" strokeDasharray="3 3" />

                {/* Shaded Area */}
                <path
                  d="M 15 90 Q 70 85, 120 72 T 240 50 T 340 35 L 385 30 L 385 95 L 15 95 Z"
                  fill="url(#costGrad)"
                />

                {/* Blue Line */}
                <path
                  d="M 15 90 Q 70 85, 120 72 T 240 50 T 340 35 L 385 30"
                  fill="none"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Current Dot */}
                <circle cx="385" cy="30" r="3.5" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="1.5" />

                {/* X-Axis Labels */}
                <g className="font-mono text-[9px] fill-[#64748B]">
                  <text x="15" y="108" textAnchor="middle">17/10</text>
                  <text x="90" y="108" textAnchor="middle">20/10</text>
                  <text x="165" y="108" textAnchor="middle">23/10</text>
                  <text x="240" y="108" textAnchor="middle">26/10</text>
                  <text x="315" y="108" textAnchor="middle">28/10</text>
                  <text x="380" y="108" textAnchor="end" className="font-bold fill-[#4F46E5]">Hôm nay ($4.8)</text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Card 4: Vector Store & Database Status                  */}
        {/* ======================================================== */}
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Card Top */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2.5 text-sm font-bold text-[#0F172A]">
                <AppIcons.adminRag size={16} className="text-[#4F46E5]" />
                <span>Trạng Thái Vector Store & Database</span>
              </div>
            </div>

            {/* Sub-box 1: Active Vector Records */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#64748B]">
                  Active Vector Records (pgvector)
                </span>
                <div className="font-mono text-2xl font-bold text-[#0F172A] mt-0.5">
                  28,450 <span className="text-xs font-normal text-[#64748B]">records</span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-[#0F172A] bg-white border border-[#CBD5E1] px-2.5 py-1 rounded shadow-xs">
                HNSW Index • 8.4ms
              </span>
            </div>

            {/* Sub-box 2: Connection Pool */}
            <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#0F172A]">Connection Pool (Prisma)</span>
                <span className="font-mono font-bold text-[#0F172A]">22 / 100 Active</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div className="h-full bg-[#0D9488] rounded-full w-[22%]"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] pt-0.5">
                <span>Idle: 78</span>
                <span className="text-[#0D9488] font-semibold flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
                  Tối ưu
                </span>
              </div>
            </div>
          </div>

          {/* Action button: Verify HNSW */}
          <Button
            variant="outline"
            onClick={handleVerifyHNSW}
            disabled={isVerifyingHNSW}
            className="w-full h-9 gap-2 text-xs font-semibold text-[#4F46E5] border-[#E2E8F0] hover:bg-indigo-50/50"
          >
            {isVerifyingHNSW ? (
              <AppIcons.refresh size={14} className="animate-spin text-[#4F46E5]" />
            ) : (
              <AppIcons.checkCircle size={14} className="text-[#0D9488]" />
            )}
            <span>{hnswStatusText}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PulsePage;
