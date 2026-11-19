import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

export const AcademicSubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId = 'TASK-06' } = useParams<{ taskId?: string }>();

  // State các tab & form
  const [activeTab, setActiveTab] = useState<'word_pdf' | 'canva_slides' | 'video'>('word_pdf');
  const [hasFile, setHasFile] = useState<boolean>(true);
  const [sharedLink, setSharedLink] = useState<string>(
    'https://docs.google.com/presentation/d/1xSmartWorkspace-SlideDeck'
  );
  const [summaryText, setSummaryText] = useState<string>(
    'Đã hoàn thiện toàn bộ chương 3 (Phân tích kiến trúc hệ thống Multi-Agent & Đồ thị CPM), bổ sung 12 sơ đồ luồng dữ liệu UML và hoàn tất bộ slide thuyết trình 18 trang trên Google Slides phục vụ buổi báo cáo tiến độ tuần 11. Các tham số benchmark phản hồi thời gian thực từ vLLM engine cũng đã được tổng hợp chi tiết tại Phụ lục B.'
  );

  // 3 Checkbox Self-Audit (Màu Royal Indigo chuẩn chỉ)
  const [audit1, setAudit1] = useState<boolean>(true);
  const [audit2, setAudit2] = useState<boolean>(true);
  const [audit3, setAudit3] = useState<boolean>(true);

  // New peer comment
  const [newComment, setNewComment] = useState<string>('');
  const [comments, setComments] = useState<
    { author: string; role: string; badge: string; isSuccess: boolean; content: string; time: string }[]
  >([
    {
      author: 'Tuấn Lê',
      role: 'Trưởng nhóm KT',
      badge: 'ĐẠT YÊU CẦU',
      isSuccess: true,
      content:
        'Bố cục tài liệu Word rõ ràng, các biểu đồ luồng dữ liệu khớp với đặc tả SRS v2.0. Đã kiểm tra link Google Slides mở được bình thường, hiệu ứng đồng bộ và không phát sinh lỗi layout trên máy tính bảng.',
      time: 'Đã xác nhận: 09:15 AM • Đồng ý thông qua',
    },
    {
      author: 'Hòa Nguyễn',
      role: 'Thành viên',
      badge: 'GÓP Ý NHỎ',
      isSuccess: false,
      content:
        'Slide số 14 nên bổ sung thêm bảng số liệu thời gian phản hồi thực tế của vLLM để tăng tính thuyết phục khi phản biện với ban thư ký.',
      time: 'Đã xác nhận: 08:42 AM • Cần lưu ý bổ sung',
    },
  ]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        author: 'Đặng Hồng Nguyên',
        role: 'Tác giả',
        badge: 'PHẢN HỒI',
        isSuccess: true,
        content: newComment,
        time: 'Vừa xong',
      },
    ]);
    setNewComment('');
  };

  const handleSubmitAll = () => {
    navigate('/kanban');
  };

  return (
    <div className="space-y-6 max-w-[1520px] mx-auto pb-12">
      {/* Header & Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F1F5F9] border border-[#E2E8F0] text-[#334155]">
              ACADEMIC ARTIFACT • NON-GIT
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
              HẠN CHÓT: 15/11/2026
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F0FDFA] border border-[#99F6E4] text-[#0D9488]">
              Sprint 04
            </span>
          </div>

          <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
            Nộp Báo Cáo Tổng Hợp &amp; Tài Liệu Thuyết Trình (#{taskId})
          </h1>
          <p className="text-xs text-[#64748B]">
            Hỗ trợ đính kèm trực tiếp tệp báo cáo Word/PDF hoặc liên kết Canva, Google Slides và video thuyết minh phục vụ hội đồng bảo vệ tiến độ.
          </p>
        </div>

        {/* Nút Hành Động */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/kanban')}
            className="h-9 text-xs border-[#E2E8F0] text-[#64748B] hover:bg-slate-50 gap-1.5"
          >
            <AppIcons.bookmark size={13} />
            <span>Lưu Bản Nháp</span>
          </Button>

          <Button
            size="sm"
            onClick={handleSubmitAll}
            className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
          >
            <AppIcons.verifiedCheck size={14} />
            <span>Nộp Sản Phẩm &amp; Gửi Duyệt</span>
          </Button>
        </div>
      </div>

      {/* 4 Thẻ KPI Chỉ Số Nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#64748B]">Trạng thái bàn giao</div>
            <div className="font-bold text-xs text-[#0F172A] mt-0.5">Đang hoàn tất</div>
          </div>
          <div className="h-7 w-7 rounded-md bg-emerald-50 text-[#0D9488] flex items-center justify-center">
            <AppIcons.verifiedCheck size={15} />
          </div>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#64748B]">Dung lượng tệp</div>
            <div className="font-mono font-bold text-xs text-[#0F172A] mt-0.5">2.4 MB / 50 MB</div>
          </div>
          <div className="h-7 w-7 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
            <AppIcons.uploadCloud size={15} />
          </div>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#64748B]">Độ tin cậy Rubric</div>
            <div className="font-mono font-bold text-xs text-[#0D9488] mt-0.5">96.8%</div>
          </div>
          <div className="h-7 w-7 rounded-md bg-emerald-50 text-[#0D9488] flex items-center justify-center">
            <AppIcons.gauge size={15} />
          </div>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#64748B]">Phản hồi chéo</div>
            <div className="font-mono font-bold text-xs text-[#4F46E5] mt-0.5">2 / 2 Người</div>
          </div>
          <div className="h-7 w-7 rounded-md bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
            <AppIcons.users size={15} />
          </div>
        </div>
      </div>

      {/* Grid 2 Cột: 7 : 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* CỘT TRÁI (7 Cột) — Form Nộp Hồ Sơ & Tự Kiểm Tra */}
        <div className="lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full bg-[#4F46E5] text-white text-[10px] font-bold flex items-center justify-center font-mono">
                1
              </span>
              <h2 className="text-xs font-bold text-[#0F172A]">Định dạng hồ sơ &amp; Tệp tải lên</h2>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">CHUẨN SRS-IEEE 830</span>
          </div>

          {/* 3 Tabs Định Dạng */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">Chọn phương thức bàn giao chính:</label>
            <div className="grid grid-cols-3 gap-1 bg-[#F1F5F9] p-1 rounded-md border border-[#E2E8F0] text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveTab('word_pdf')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-colors ${
                  activeTab === 'word_pdf'
                    ? 'bg-white text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <AppIcons.docWord size={13} />
                <span>Tài Liệu Word / PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('canva_slides')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-colors ${
                  activeTab === 'canva_slides'
                    ? 'bg-white text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <AppIcons.slides size={13} />
                <span>Canva / Slides</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded transition-colors ${
                  activeTab === 'video'
                    ? 'bg-white text-[#4F46E5] font-semibold shadow-xs'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                <AppIcons.video size={13} />
                <span>Video Thuyết Minh</span>
              </button>
            </div>
          </div>

          {/* Dropzone Tải Lên */}
          <div className="border border-dashed border-[#CBD5E1] rounded-lg p-5 bg-[#F8FAFC] text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="h-8 w-8 rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center">
                <AppIcons.uploadCloud size={16} />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-[#0F172A]">
                  Kéo thả tệp báo cáo (.docx, .pdf) vào đây
                </div>
                <div className="text-[11px] font-mono text-[#64748B]">
                  Hỗ trợ định dạng DOCX, PDF, PPTX. Tối đa 50MB mỗi tệp.
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-7 text-xs border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 ml-auto"
              >
                Chọn Tệp
              </Button>
            </div>
          </div>

          {/* Card Tệp Đã Nạp */}
          {hasFile && (
            <div className="rounded-lg border border-[#E2E8F0] bg-white p-3 flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="h-8 w-8 rounded-md bg-[#F0FDFA] border border-[#99F6E4] text-[#0D9488] flex items-center justify-center shrink-0">
                  <AppIcons.fileVerified size={16} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#0F172A] truncate">
                      Bao_Cao_Phan_Tich_He_Thong_v2.docx
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-[#F0FDFA] text-[#0D9488]">
                      VERIFIED
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#64748B]">
                    2.4 MB • Đã tải lên lúc 10:24 hôm nay
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="p-1 rounded text-[#64748B] hover:text-[#0F172A] hover:bg-slate-100"
                  title="Xem trước"
                >
                  <AppIcons.eye size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setHasFile(false)}
                  className="p-1 rounded text-[#94A3B8] hover:text-[#BE123C] hover:bg-rose-50"
                  title="Xóa tệp"
                >
                  <AppIcons.trash size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Ô Nhập Liên Kết Trình Chiếu */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#0F172A]">
              Liên Kết Trình Chiếu / Video Bổ Sung (Canva, Google Slides, YouTube/Drive)
            </label>
            <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs">
              <AppIcons.share size={13} className="text-[#64748B]" />
              <input
                type="text"
                value={sharedLink}
                onChange={(e) => setSharedLink(e.target.value)}
                className="w-full bg-transparent outline-hidden font-mono text-xs text-[#0F172A]"
              />
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-[#475569] whitespace-nowrap">
                Quyền xem: Công khai
              </span>
            </div>
          </div>

          {/* Textarea Tóm Tắt */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-[#0F172A]">
                Tóm Tắt Nội Dung Bài Làm &amp; Điểm Nổi Bật
              </label>
              <span className="font-mono text-[11px] text-[#64748B]">248 / 600 từ</span>
            </div>
            <textarea
              rows={3}
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
              className="w-full rounded-md border border-[#E2E8F0] bg-white p-2.5 text-xs text-[#334155] leading-relaxed outline-hidden hover:border-slate-300 focus:border-[#4F46E5]"
            />
          </div>

          {/* Tiêu Chí Tự Kiểm Tra Chất Lượng (ĐÃ CHUẨN HÓA MÀU ROYAL INDIGO THEO CHỈ THỊ) */}
          <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#0F172A]">Tiêu chí tự kiểm tra chất lượng (Self-Audit)</span>
              <span className="font-mono text-[11px] font-bold text-[#0D9488]">
                3/3 TIÊU CHÍ HOÀN TẤT
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={audit1}
                  onChange={(e) => setAudit1(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span className="text-[#334155]">
                  Khớp chuẩn cấu trúc báo cáo NCKH theo biểu mẫu BM-DA-04
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={audit2}
                  onChange={(e) => setAudit2(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span className="text-[#334155]">
                  Liên kết chia sẻ đã cấu hình chế độ Viewer mở cho toàn bộ giảng viên hướng dẫn
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={audit3}
                  onChange={(e) => setAudit3(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5]"
                />
                <span className="text-[#334155]">
                  Đã chạy kiểm tra chính tả tiếng Việt và trích dẫn theo định dạng APA 7th
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI (5 Cột) — Đánh Giá Chéo Peer-Review */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div className="flex items-center gap-2">
                <AppIcons.users size={16} className="text-[#4F46E5]" />
                <h3 className="text-xs font-bold text-[#0F172A]">Đánh Giá Chéo (Peer-Review)</h3>
              </div>

              {/* Badge ĐÃ SỬA THEO CHỈ THỊ: rounded-md 6px, 1 dòng */}
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5] whitespace-nowrap">
                2 / 2 ĐÃ NHẬN XÉT
              </span>
            </div>

            {/* Điểm Trung Bình Đồng Cấp */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#0F172A]">Điểm trung bình đồng cấp</span>
                <span className="font-mono text-xl font-bold text-[#4F46E5]">9.2 / 10.0</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-[#4F46E5] rounded-full w-[92%]" />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-[#64748B]">
                <span>Tính chuẩn xác: <strong>9.5</strong></span>
                <span>Hình thức: <strong>9.0</strong></span>
                <span>Tiến độ: <strong>9.2</strong></span>
              </div>
            </div>

            {/* Danh Sách 2 Nhận Xét */}
            <div className="space-y-3 pt-1">
              {comments.map((c, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0F172A]">{c.author}</span>
                      <span className="text-[11px] text-[#64748B]">({c.role})</span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        c.isSuccess
                          ? 'bg-[#F0FDFA] border border-[#99F6E4] text-[#0D9488]'
                          : 'bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]'
                      }`}
                    >
                      {c.badge}
                    </span>
                  </div>

                  <p className="text-slate-700 text-[11px] leading-relaxed italic">
                    &ldquo;{c.content}&rdquo;
                  </p>

                  <div className="text-[10px] font-mono text-[#64748B] pt-0.5 border-t border-slate-200">
                    {c.time}
                  </div>
                </div>
              ))}
            </div>

            {/* Form Nhập Nhận Xét Mới */}
            <div className="border-t border-[#E2E8F0] pt-3 space-y-2">
              <div className="text-[11px] font-bold uppercase text-[#64748B] flex items-center justify-between">
                <span>THÊM NHẬN XÉT ĐÁNH GIÁ CHÉO</span>
                <span className="text-[10px] font-mono lowercase">Nhận vai: Người đánh giá</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Nhập góp ý cho bài làm của thành viên..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#0F172A] outline-hidden hover:border-slate-300 focus:border-[#4F46E5]"
                />
                <Button
                  size="sm"
                  onClick={handleAddComment}
                  className="h-8 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold px-3 shadow-2xs"
                >
                  Gửi
                </Button>
              </div>
            </div>
          </div>

          {/* Thẻ Chính Sách Chấm Tự Động & Lưu Trữ */}
          <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex items-start gap-3 text-xs">
            <div className="h-7 w-7 rounded-md bg-emerald-50 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5">
              <AppIcons.adminRbac size={15} />
            </div>
            <div>
              <div className="font-bold text-[#0F172A]">Chính Sách Chấm Tự Động &amp; Lưu Trữ</div>
              <p className="text-[#64748B] text-[11px] mt-0.5 leading-relaxed">
                Bản nộp sau khi gửi duyệt sẽ tạo mã băm SHA-256 bất biến trên sổ quản lý nhiệm vụ để bảo lưu minh chứng phân công lao động giữa các sinh viên.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicSubmissionPage;
