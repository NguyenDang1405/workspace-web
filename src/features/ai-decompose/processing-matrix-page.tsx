import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const ProcessingMatrixPage: React.FC = () => {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(5.6);
  const [progress, setProgress] = useState(62);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => +(prev + 0.1).toFixed(1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleNextToDispatch = () => {
    navigate('/ai-decompose/dispatch');
  };

  const handleNextToPersonalRoadmap = () => {
    navigate('/ai-decompose/personal-roadmap');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Thẻ Trung Tâm */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-7 shadow-xs space-y-6">
        {/* Header Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] text-xs font-semibold">
            <AppIcons.zap size={14} />
            <span>MULTI-AGENT ORCHESTRATION ENGINE • ĐANG XỬ LÝ</span>
          </div>

          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#0D9488] font-semibold bg-[#F0FDF4] px-3 py-1 rounded-md border border-[#CCFBF1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse" />
            <span>Thời gian chạy: 00:0{seconds.toFixed(1)}s</span>
          </div>
        </div>

        {/* Tiêu đề & Tên tài liệu */}
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Đang Tổng Hợp Đồ Thị Công Việc &amp; Tối Ưu Lịch Trình...
          </h1>
          <p className="text-xs text-[#64748B] mt-1 font-mono">
            Hệ thống đang điều phối tuần tự 3 Agent chuyên biệt trên tệp{' '}
            <strong className="text-[#0F172A]">De_Cuong_Do_An_Tot_Nghiep_K2026.pdf</strong>
          </p>
        </div>

        {/* Tiến độ tổng thể */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#4F46E5]" />
              Tiến độ tổng thể: Đang thực thi Bước 2/4
            </span>
            <span className="font-mono font-bold text-[#4F46E5]">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Khung Console Stream (ai-service://vllm-orchestrator-stream) */}
        <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden font-mono text-xs">
          {/* Header Terminal */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b border-[#E2E8F0] text-[11px] text-[#64748B]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="h-2 w-2 rounded-full bg-slate-400" />
                <span className="h-2 w-2 rounded-full bg-slate-400" />
              </div>
              <span className="text-[#475569] font-medium">ai-service://vllm-orchestrator-stream</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#0F172A] font-medium">
              vLLM Local • Llama-3-8B-Instruct
            </span>
          </div>

          {/* Các bước xử lý Stream */}
          <div className="p-4 space-y-3">
            {/* Bước 1/4: Hoàn tất */}
            <div className="rounded-md border border-[#CCFBF1] bg-white p-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0">
                  <AppIcons.check size={11} />
                </div>
                <span className="font-semibold text-[#0F172A]">
                  [BƯỚC 1/4] Bóc tách yêu cầu và trích xuất cấu trúc thực thể
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488]">
                Hoàn tất (1.2s • 14 Stories, 42 Tasks)
              </span>
            </div>

            {/* Bước 2/4: Đang chạy với log stream */}
            <div className="rounded-md border border-[#C7D2FE] bg-white p-3.5 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0 animate-spin">
                    <AppIcons.refresh size={12} />
                  </div>
                  <span className="font-bold text-[#4F46E5]">
                    [BƯỚC 2/4] Xây dựng đồ thị có hướng DAG và tính toán CPM Critical Path...
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
                  Đang chạy (62%)
                </span>
              </div>

              {/* Terminal Logs */}
              <div className="rounded bg-slate-900 p-3 text-[11px] text-slate-300 space-y-1 font-mono leading-relaxed">
                <div className="text-emerald-400">
                  &gt; Đang kiểm tra chu trình đồ thị (Topological Sort): Hợp lệ (0 chu trình lặp)
                </div>
                <div className="text-slate-300">
                  &gt; Đang tính Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF)...
                </div>
                <div className="text-amber-400 font-semibold flex items-center gap-1">
                  <span>&gt; Phát hiện chuỗi đường găng (Slack = 0): 8 nút trọng yếu (Tổng thời lượng: 184 giờ)</span>
                  <span className="inline-block w-1.5 h-3 bg-amber-400 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Bước 3/4: Đang chờ */}
            <div className="rounded-md border border-[#E2E8F0] bg-white/60 p-3 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                  <AppIcons.clock size={11} />
                </div>
                <span>[BƯỚC 3/4] Quét hồ sơ năng lực thành viên và cân bằng tải công việc...</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-400">
                Đang chờ...
              </span>
            </div>

            {/* Bước 4/4: Đang chờ */}
            <div className="rounded-md border border-[#E2E8F0] bg-white/60 p-3 flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="h-5 w-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                  <AppIcons.clock size={11} />
                </div>
                <span>[BƯỚC 4/4] Tối ưu hóa khung thời gian trên lịch trình cá nhân...</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-400">
                Đang chờ...
              </span>
            </div>
          </div>
        </div>

        {/* Footer Telemetry & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#64748B]">
            <div className="flex items-center gap-1.5">
              <AppIcons.zap size={13} className="text-[#4F46E5]" />
              <span>Tốc độ sinh token: <strong className="text-[#0F172A]">68.4 tokens/s</strong></span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <AppIcons.verifiedCheck size={13} className="text-[#0D9488]" />
              <span>Bộ nhớ đệm Vector: <strong className="text-[#0D9488]">Đã đồng bộ</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/ai-decompose/ingest')}
              className="h-9 text-xs border-[#E2E8F0] bg-white text-[#64748B] hover:text-[#BE123C] hover:bg-rose-50"
            >
              Hủy Tiến Trình
            </Button>

            <Button
              onClick={handleNextToDispatch}
              className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
            >
              <span>Chuyển Tiếp Tới Bảng Đối Soát</span>
              <AppIcons.arrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingMatrixPage;
