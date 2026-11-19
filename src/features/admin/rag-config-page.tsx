import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

interface RagDocument {
  id: string;
  name: string;
  size: string;
  vectors: number;
  model: string;
  status: 'SYNCED' | 'CHUNKING';
  chunkProgress?: number;
}

const INITIAL_DOCS: RagDocument[] = [
  {
    id: 'doc-1',
    name: 'IEEE-830-SRS-Standard-Template.pdf',
    size: '1.8 MB',
    vectors: 850,
    model: 'text-embedding-3-small',
    status: 'SYNCED',
  },
  {
    id: 'doc-2',
    name: 'Engineering-Definition-of-Done-v2.md',
    size: '420 KB',
    vectors: 850,
    model: 'Quy chuẩn kiểm thử & nghiệm thu PR',
    status: 'SYNCED',
  },
  {
    id: 'doc-3',
    name: 'Software-Architecture-Guidelines.pdf',
    size: '3.1 MB',
    vectors: 640,
    model: 'Đang chunking 80% (640 / 800 chunks)',
    status: 'CHUNKING',
    chunkProgress: 80,
  },
];

export const RagConfigPage: React.FC = () => {
  const [docs, setDocs] = useState<RagDocument[]>(INITIAL_DOCS);
  const [chunkSize, setChunkSize] = useState<number>(512);
  const [chunkOverlap, setChunkOverlap] = useState<number>(64);
  const [embeddingModel, setEmbeddingModel] = useState<string>('text-embedding-3-small (1,536 dim)');
  const [topK, setTopK] = useState<number>(5);
  const [isHybridSearch, setIsHybridSearch] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<string>('Lưu Cấu Hình Thuật Toán');

  const handleDeleteDoc = (id: string) => {
    setDocs((prev) => prev.filter((d) => d.id !== id));
  };

  const handleResetDefaults = () => {
    setChunkSize(512);
    setChunkOverlap(64);
    setEmbeddingModel('text-embedding-3-small (1,536 dim)');
    setTopK(5);
    setIsHybridSearch(true);
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    setSaveStatus('Đang áp dụng...');
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('Đã Lưu Thành Công!');
      setTimeout(() => setSaveStatus('Lưu Cấu Hình Thuật Toán'), 2500);
    }, 700);
  };

  return (
    <div className="space-y-6 select-none font-sans text-[#0F172A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[#0F172A]">
            Cấu Hình Thuật Toán & Kho Tri Thức Dùng Chung (RAG Repository)
          </h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Quản lý kho tài liệu ngữ cảnh nền tảng, cơ chế chunking vector và tinh chỉnh trọng số thuật toán ghép cặp AI.
          </p>
        </div>

        <Button
          onClick={handleSaveConfig}
          disabled={isSaving}
          className="gap-2 bg-[#4F46E5] hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs self-start sm:self-auto"
        >
          {isSaving ? (
            <AppIcons.refresh size={14} className="animate-spin text-white" />
          ) : (
            <AppIcons.check size={14} strokeWidth={2.5} />
          )}
          <span>{saveStatus}</span>
        </Button>
      </div>

      {/* Main 2-Column Section (Span 6 : Span 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* ======================================================== */}
        {/* Left Column (Span 6): Global Documents Repository        */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Top Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-[#0F172A]">
                    Tài Liệu Nạp Dùng Chung (Global Documents)
                  </h2>
                  <span className="font-mono text-[11px] font-semibold text-[#64748B] bg-slate-100 px-2 py-0.5 rounded">
                    {docs.length} Tài liệu
                  </span>
                </div>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Hệ thống RAG tự động nhúng (embedding) và phân đoạn tri thức khi nạp vào pgvector.
                </p>
              </div>

              <Button
                size="sm"
                onClick={() => alert('Chọn tệp PDF/MD để tải lên kho tri thức dùng chung...')}
                className="h-8 gap-1.5 text-xs font-semibold bg-[#4F46E5] hover:bg-indigo-700 text-white shrink-0 shadow-xs"
              >
                <AppIcons.plus size={13} />
                <span>+ Tải Lên Tài Liệu (PDF/MD)</span>
              </Button>
            </div>

            {/* Dashed Dropzone */}
            <div
              onClick={() => alert('Mở cửa sổ chọn file tài liệu SRS, Coding Convention...')}
              className="rounded-lg border-2 border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-4 text-center cursor-pointer hover:border-[#4F46E5] hover:bg-indigo-50/20 transition-all space-y-1"
            >
              <div className="h-8 w-8 mx-auto rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                <AppIcons.uploadCloud size={16} />
              </div>
              <p className="text-xs font-semibold text-[#0F172A]">
                Kéo thả tài liệu chuẩn mẫu (SRS Standard, Coding Convention, Definition of Done)
              </p>
              <p className="text-[10px] text-[#64748B]">
                Hỗ trợ định dạng .PDF, .MD, .DOCX dung lượng tối đa 25MB • Chunk size: 512 tokens
              </p>
            </div>

            {/* Uploaded Documents List */}
            <div className="space-y-2.5">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="rounded-md border border-[#E2E8F0] bg-white p-3 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5 truncate">
                      <div className="mt-0.5 text-[#4F46E5] shrink-0">
                        <AppIcons.docWord size={16} />
                      </div>
                      <div className="truncate">
                        <p className="text-xs font-bold text-[#0F172A] truncate">{doc.name}</p>
                        <p className="font-mono text-[10px] text-[#64748B] mt-0.5">
                          {doc.size} • {doc.vectors} Vectors • Model: {doc.model}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {doc.status === 'SYNCED' ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#0D9488] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#0D9488]"></span>
                          Đã Đồng Bộ Vector
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                          <AppIcons.refresh size={10} className="animate-spin text-amber-600" />
                          Đang Lập Chỉ Mục...
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="text-[#64748B] hover:text-[#BE123C] p-1"
                        aria-label="Xóa tài liệu"
                      >
                        <AppIcons.trash size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar if chunking */}
                  {doc.status === 'CHUNKING' && doc.chunkProgress && (
                    <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all"
                        style={{ width: `${doc.chunkProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer: HNSW Index status */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-3 text-xs">
            <div className="flex items-center gap-2 font-mono text-[#0F172A]">
              <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse"></span>
              <span>
                HNSW Vector Index Status: <strong>4,270 chunks active</strong> in pgvector
              </span>
            </div>
            <button
              type="button"
              onClick={() => alert('Đang kích hoạt tác vụ tái tạo chỉ mục HNSW trên PostgreSQL...')}
              className="text-xs font-semibold text-[#4F46E5] hover:underline"
            >
              Xây dựng lại chỉ mục (Rebuild Index)
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* Right Column (Span 6): AI Algorithm & RAG Parameters    */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0F172A]">
                Cấu Hình Thuật Toán AI & Tham Số RAG
              </h2>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Vector chunking, embedding model và tham số truy vấn tri thức
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetDefaults}
              className="text-[11px] font-semibold text-[#4F46E5] hover:underline"
            >
              Mặc định
            </button>
          </div>

          <div className="space-y-4 text-xs">
            <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">
              THAM SỐ VECTOR & PHÂN ĐOẠN (CHUNKING CONFIG)
            </span>

            {/* Slider 1: Chunk Size */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#0F172A]">
                  Chunk Size (Kích thước phân đoạn)
                </label>
                <span className="font-mono font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded border border-[#E2E8F0]">
                  {chunkSize} tokens
                </span>
              </div>
              <input
                type="range"
                min={256}
                max={1024}
                step={32}
                value={chunkSize}
                onChange={(e) => setChunkSize(Number(e.target.value))}
                className="w-full accent-[#4F46E5] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#64748B]">
                <span>256</span>
                <span className="font-bold text-[#4F46E5]">{chunkSize}</span>
                <span>1,024</span>
              </div>
            </div>

            {/* Slider 2: Chunk Overlap */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-[#0F172A]">
                  Chunk Overlap (Độ chồng lặp ngữ cảnh)
                </label>
                <span className="font-mono font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded border border-[#E2E8F0]">
                  {chunkOverlap} overlap
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={128}
                step={8}
                value={chunkOverlap}
                onChange={(e) => setChunkOverlap(Number(e.target.value))}
                className="w-full accent-[#4F46E5] cursor-pointer"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#64748B]">
                <span>0</span>
                <span className="font-bold text-[#4F46E5]">{chunkOverlap}</span>
                <span>128</span>
              </div>
            </div>

            {/* Dropdown: Embedding Model */}
            <div className="space-y-1">
              <label className="font-semibold text-[#0F172A]">
                Mô Hình Nhúng (Embedding Model)
              </label>
              <div className="relative">
                <select
                  value={embeddingModel}
                  onChange={(e) => setEmbeddingModel(e.target.value)}
                  className="w-full h-9 rounded-md border border-[#E2E8F0] bg-white px-3 pr-8 text-xs font-mono text-[#0F172A] appearance-none focus:outline-none focus:border-[#4F46E5] transition-colors cursor-pointer"
                >
                  <option value="text-embedding-3-small (1,536 dim)">text-embedding-3-small (1,536 dim)</option>
                  <option value="text-embedding-3-large (3,072 dim)">text-embedding-3-large (3,072 dim)</option>
                  <option value="bge-m3-multilingual (1,024 dim)">bge-m3-multilingual (1,024 dim)</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none">
                  <AppIcons.chevronDown size={14} />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E2E8F0]">
              <span className="font-mono text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-3">
                CƠ CHẾ TRÍCH LỌC RAG (RETRIEVAL SETTINGS)
              </span>

              {/* Slider 3: Top-K */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#0F172A]">Top-K Vectors Retrieved</label>
                  <span className="font-mono font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded border border-[#E2E8F0]">
                    Top-K: {topK}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  value={topK}
                  onChange={(e) => setTopK(Number(e.target.value))}
                  className="w-full accent-[#4F46E5] cursor-pointer"
                />
              </div>

              {/* Cosine Distance Threshold Box */}
              <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-3 flex items-center justify-between mb-3">
                <div>
                  <span className="text-[11px] font-semibold text-[#0F172A] block">
                    Ngưỡng tương đồng Cosine Distance
                  </span>
                  <span className="font-mono text-[10px] text-[#64748B] mt-0.5 block">
                    Tương đương: Similarity &gt; 0.78
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-[#0F172A] block">
                    Cosine Distance &lt; 0.22
                  </span>
                  <span className="font-mono text-[9px] font-bold text-[#0D9488] bg-teal-50 border border-teal-200 px-1.5 py-0.2 rounded inline-block mt-0.5">
                    Khuyến Dùng
                  </span>
                </div>
              </div>

              {/* Hybrid Search Toggle */}
              <div className="flex items-center justify-between p-3 rounded-md border border-[#E2E8F0] bg-white">
                <div>
                  <span className="text-xs font-bold text-[#0F172A] block">
                    Tìm Kiếm Kết Hợp (Hybrid Search)
                  </span>
                  <span className="text-[10px] text-[#64748B]">
                    Kết hợp Dense Vector + Sparse BM25 Keywords
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsHybridSearch(!isHybridSearch)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    isHybridSearch ? 'bg-[#4F46E5]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      isHybridSearch ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E2E8F0] pt-3 text-[11px] font-mono text-[#64748B] flex items-center justify-between">
            <span>* Có hiệu lực ngay cho phiên truy vấn tiếp theo.</span>
            <span className="text-[#4F46E5]">API: /v1/ai/config/rag</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RagConfigPage;
