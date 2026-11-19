import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const DocumentIngestionPage: React.FC = () => {
  const navigate = useNavigate();

  // State quản lý tab & cài đặt
  const [activeTab, setActiveTab] = useState<'pdf' | 'markdown' | 'text'>('pdf');
  const [decompDepth, setDecompDepth] = useState<'granular' | 'epic'>('granular');
  const [targetDate, setTargetDate] = useState('20/12/2026');
  const [slackBuffer, setSlackBuffer] = useState('15%');
  const [hasUploadedFile, setHasUploadedFile] = useState(true);

  const handleStartDecomposition = () => {
    navigate('/ai-decompose/traceability');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header & Stepper ngang */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Khởi Tạo & Phân Rã AI: Nạp Tài Liệu Nguồn
          </h1>
          <p className="text-xs text-[#64748B] mt-1">
            Tải lên đề cương môn học, tài liệu SRS hoặc mục tiêu để AI tự động bóc tách User Stories và lập lịch đường găng CPM.
          </p>
        </div>

        {/* Stepper 3 Bước */}
        <div className="inline-flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-lg border border-[#E2E8F0]">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#4F46E5] text-white text-xs font-medium shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
            <span>Bước 1: Nạp Tài Liệu</span>
          </div>
          <span className="text-[#94A3B8] text-xs font-mono">&gt;</span>
          <div className="px-2.5 py-1 text-xs text-[#64748B] font-medium">
            Bước 2: Đối Soát Nguồn
          </div>
          <span className="text-[#94A3B8] text-xs font-mono">&gt;</span>
          <div className="px-2.5 py-1 text-xs text-[#64748B] font-medium">
            Bước 3: Duyệt Điều Phối
          </div>
        </div>
      </div>

      {/* Grid 2 Cột: 7 : 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CỘT TRÁI (Span 7) - Tài Liệu Nguồn */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                  <AppIcons.uploadFile size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-[#0F172A]">
                    Tài Liệu Nguồn (SRS & Specification Source)
                  </h2>
                  <p className="text-[11px] text-[#64748B]">
                    Định dạng văn bản kỹ thuật hoặc tài liệu đặc tả hệ thống
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                PDF / DOCX Parser
              </span>
            </div>

            {/* Segmented Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-[#F1F5F9] p-1 rounded-md border border-[#E2E8F0] text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('pdf')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-colors ${
                  activeTab === 'pdf'
                    ? 'bg-white text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <AppIcons.docWord size={13} />
                <span>Tệp PDF Đề Cương / SRS</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('markdown')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-colors ${
                  activeTab === 'markdown'
                    ? 'bg-white text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <AppIcons.codeDiff size={13} />
                <span>Markdown / DOCX</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('text')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-colors ${
                  activeTab === 'text'
                    ? 'bg-white text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <AppIcons.edit size={13} />
                <span>Soạn Thảo Tự Do</span>
              </button>
            </div>

            {/* Dropzone Nét Đứt */}
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-lg p-7 bg-[#F8FAFC] text-center hover:bg-slate-50/80 transition-colors cursor-pointer group">
              <div className="h-10 w-10 mx-auto rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <AppIcons.uploadCloud size={20} />
              </div>
              <p className="text-xs font-medium text-[#0F172A]">
                Kéo thả tài liệu SRS / Đề cương vào đây, hoặc Duyệt tệp từ máy tính
              </p>
              <p className="text-[11px] text-[#64748B] mt-1 font-mono">
                Hỗ trợ tệp định dạng .PDF, .MD, .DOCX dung lượng tối đa 25MB
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 h-7 text-xs border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 gap-1.5"
              >
                <AppIcons.uploadFile size={13} />
                <span>Chọn tệp từ máy tính</span>
              </Button>
            </div>

            {/* Card Tệp Đã Nạp */}
            {hasUploadedFile && (
              <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 shrink-0 rounded-md bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C] flex items-center justify-center">
                    <AppIcons.docWord size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-[#0F172A] truncate">
                        De_Cuong_Do_An_Tot_Nghiep_K2026.pdf
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488]">
                        <AppIcons.verifiedCheck size={11} />
                        Đã quét Text Layer
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-[#64748B] mt-0.5">
                      3.4 MB • 28 Trang • 100% OCR Hoàn Tất
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHasUploadedFile(false)}
                  className="p-1 rounded text-[#94A3B8] hover:text-[#BE123C] hover:bg-rose-50 transition-colors"
                  title="Xóa tệp"
                >
                  <AppIcons.close size={14} />
                </button>
              </div>
            )}

            {/* Box Tóm Tắt Trích Xuất Sơ Bộ */}
            <div className="rounded-md border border-indigo-100 bg-[#EEF2FF]/60 p-3 flex items-start gap-2.5 text-xs text-[#0F172A]">
              <div className="h-5 w-5 rounded bg-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0 mt-0.5">
                <AppIcons.navAiDecompose size={13} />
              </div>
              <p className="leading-relaxed">
                AI đã trích xuất sơ bộ <strong className="font-semibold text-[#4F46E5]">14 Chương mục</strong> và{' '}
                <strong className="font-semibold text-[#4F46E5]">42 Yêu cầu chức năng (FR)</strong> từ tài liệu nạp.
                Các khối thực thi sẵn sàng cho bộ phân rã DAG.
              </p>
            </div>

            {/* Thống kê OCR & Vector Index */}
            <div className="space-y-2 pt-1 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B] font-medium">Độ tin cậy cấu trúc tài liệu (OCR Index)</span>
                <span className="font-mono font-semibold text-[#0F172A]">98.4%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full w-[98.4%]" />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center font-mono">
                <div className="rounded bg-[#F8FAFC] border border-[#E2E8F0] p-2">
                  <div className="text-[10px] text-[#64748B] uppercase">TOKEN VECTOR</div>
                  <div className="text-xs font-bold text-[#0F172A] mt-0.5">38,410</div>
                </div>
                <div className="rounded bg-[#F8FAFC] border border-[#E2E8F0] p-2">
                  <div className="text-[10px] text-[#64748B] uppercase">CHƯƠNG TRÌNH LỌC</div>
                  <div className="text-xs font-bold text-[#4F46E5] mt-0.5">Semantic</div>
                </div>
                <div className="rounded bg-[#F8FAFC] border border-[#E2E8F0] p-2">
                  <div className="text-[10px] text-[#64748B] uppercase">NGÔN NGỮ</div>
                  <div className="text-xs font-bold text-[#0D9488] mt-0.5">VI / EN</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (Span 5) - Bảng Cài Đặt Thông Số Phân Rã */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                <AppIcons.sliders size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#0F172A]">
                  Bảng Cài Đặt Thông Số Phân Rã
                </h2>
                <p className="text-[11px] text-[#64748B]">
                  Tham số hóa tiến trình bóc tách đồ thị WBS
                </p>
              </div>
            </div>

            {/* Cài đặt 1: Độ sâu phân rã Task */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#0F172A] flex items-center justify-between">
                <span>Độ Sâu Phân Rã Task (Decomposition Depth)</span>
                <span className="text-[11px] font-mono text-[#64748B]">Auto-clustering</span>
              </label>

              {/* Radio Card 1: Granular */}
              <div
                onClick={() => setDecompDepth('granular')}
                className={`rounded-lg border p-3 cursor-pointer transition-all ${
                  decompDepth === 'granular'
                    ? 'border-[#4F46E5] bg-indigo-50/20 shadow-xs'
                    : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        decompDepth === 'granular'
                          ? 'border-[#4F46E5] bg-[#4F46E5]'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {decompDepth === 'granular' && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-semibold text-[#0F172A]">Chi Tiết (Granular WBS)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-50 text-[#4F46E5]">
                    Khuyên dùng
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] pl-6 mt-1 leading-relaxed">
                  Bóc tách đến từng User Story và Sub-task kỹ thuật 2-8 giờ, tự động gắn nhãn độ phức tạp.
                </p>
              </div>

              {/* Radio Card 2: High-Level */}
              <div
                onClick={() => setDecompDepth('epic')}
                className={`rounded-lg border p-3 cursor-pointer transition-all ${
                  decompDepth === 'epic'
                    ? 'border-[#4F46E5] bg-indigo-50/20 shadow-xs'
                    : 'border-[#E2E8F0] bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                        decompDepth === 'epic'
                          ? 'border-[#4F46E5] bg-[#4F46E5]'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {decompDepth === 'epic' && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-semibold text-[#0F172A]">Mức Cao (High-Level Epics)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-[#64748B]">
                    Milestones
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] pl-6 mt-1 leading-relaxed">
                  Chỉ bóc tách các giai đoạn lớn và cột mốc chính, phù hợp giai đoạn phác thảo ý tưởng.
                </p>
              </div>
            </div>

            {/* Cài đặt 2: Thời gian hoàn thành mong muốn */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Thời Gian Hoàn Thành Mong Muốn (Target Completion Date)
              </label>
              <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-xs">
                <AppIcons.calendar size={14} className="text-[#64748B]" />
                <input
                  type="text"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="flex-1 font-mono text-xs text-[#0F172A] outline-hidden bg-transparent"
                />
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-[#64748B]">
                  Quỹ thời gian: Sprint 1 - 4
                </span>
              </div>
            </div>

            {/* Cài đặt 3: Dự phòng độ trôi đường găng */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#0F172A] flex items-center justify-between">
                <span>Dự phòng độ trôi đường găng (Slack Buffer):</span>
                <span className="font-mono text-xs font-bold text-[#4F46E5]">{slackBuffer}</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={parseInt(slackBuffer)}
                  onChange={(e) => setSlackBuffer(`${e.target.value}%`)}
                  className="flex-1 accent-[#4F46E5] h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                />
                <span className="px-2 py-1 rounded border border-[#E2E8F0] font-mono text-xs text-[#0F172A] bg-white">
                  {slackBuffer}
                </span>
              </div>
            </div>

            {/* Cài đặt 4: Tác nhân AI xử lý */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0F172A]">Tác Nhân AI Xử Lý (AI Engine)</span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-[#0D9488]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488] animate-pulse" />
                  Online
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[#4F46E5] flex items-center justify-center">
                    <AppIcons.adminAgent size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0F172A]">Ingestion Agent</div>
                    <div className="text-[11px] font-mono text-[#64748B]">vLLM Local Llama-3</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded text-[10px] font-mono bg-white border border-[#E2E8F0] text-[#475569]">
                  K=24 Embeddings
                </span>
              </div>
            </div>

            {/* Nút CTA Chính */}
            <div className="pt-2">
              <Button
                onClick={handleStartDecomposition}
                className="w-full h-10 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-2 shadow-xs transition-colors"
              >
                <span>Kích Hoạt Phân Rã &amp; Đối Soát Nguồn</span>
                <AppIcons.arrowRight size={14} />
              </Button>
              <p className="text-center text-[11px] text-[#64748B] mt-2">
                Hệ thống sẽ chuyển sang giao diện đối soát nguồn bóc tách sau khi quét xong.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* KHỐI ĐÁY: Tiến Trình Đọc Hiểu Đa Tác Nhân (Telemetry Stream) */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0F172A]">
            <AppIcons.zap size={15} className="text-[#4F46E5]" />
            <span>Tiến Trình Đọc Hiểu Đa Tác Nhân (Telemetry Stream)</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px] text-[#64748B]">
            <span>Latency: 42ms</span>
            <span>•</span>
            <span>Throughput: 124 tok/s</span>
            <span>•</span>
            <span className="text-[#0D9488] font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]" />
              Tất cả worker sẵn sàng
            </span>
          </div>
        </div>

        {/* 4 Bước ngang */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-[#CCFBF1] bg-[#F0FDF4]">
            <div className="h-6 w-6 rounded-full bg-[#0D9488] text-white flex items-center justify-center shrink-0">
              <AppIcons.check size={13} />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#0D9488]">1. Nạp Tài Liệu &amp; OCR</div>
              <div className="text-[11px] text-[#64748B] font-mono">Hoàn thành (28/28 trang)</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-[#C7D2FE] bg-[#EEF2FF]">
            <div className="h-6 w-6 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shrink-0">
              <span className="font-mono text-xs">2</span>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#4F46E5]">2. Bóc Tách &amp; Gắn Nhãn WBS</div>
              <div className="text-[11px] text-[#64748B] font-mono">Đang chờ kích hoạt</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="h-6 w-6 rounded-full bg-slate-200 text-[#64748B] flex items-center justify-center shrink-0">
              <span className="font-mono text-xs">3</span>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#64748B]">3. Khớp Nối Phụ Thuộc (DAG)</div>
              <div className="text-[11px] text-[#94A3B8] font-mono">Thuật toán Kahn/Topo-sort</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2.5 rounded-md border border-[#E2E8F0] bg-[#F8FAFC]">
            <div className="h-6 w-6 rounded-full bg-slate-200 text-[#64748B] flex items-center justify-center shrink-0">
              <span className="font-mono text-xs">4</span>
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-[#64748B]">4. Tính Đường Găng CPM</div>
              <div className="text-[11px] text-[#94A3B8] font-mono">ES, EF, LS, LF &amp; Slack buffer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentIngestionPage;
