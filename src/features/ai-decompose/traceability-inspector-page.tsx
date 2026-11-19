import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

interface UserStoryItem {
  id: string;
  module: string;
  title: string;
  confidence: number;
  location: string;
  bullets: string[];
  citationText: string;
  citationHeading: string;
  isWarning?: boolean;
}

const mockStories: UserStoryItem[] = [
  {
    id: '#US-04',
    module: 'Topological CPM Solver',
    title: 'Hiện thực hóa thuật toán tính toán đường găng DAG CPM',
    confidence: 94.2,
    location: 'Trang 4 - Đoạn 3.2',
    bullets: [
      'Tính toán Early Start / Early Finish cho từng sub-task',
      'Nhận diện chính xác chuỗi task có Slack Time = 0 (Critical Path)',
    ],
    citationHeading: 'Mục 3.2: Đặc tả kiến trúc Multi-Agent & Thuật toán CPM',
    citationText:
      '...Hệ thống yêu cầu module lập lịch độc lập chịu trách nhiệm tính toán thời gian sớm nhất (Early Start/Finish), thời gian muộn nhất (Late Start/Finish) và độ trôi (Slack Time) trên đồ thị có hướng không chu trình (DAG) để xác định chính xác đường găng CPM trước khi phân bổ tài nguyên...',
  },
  {
    id: '#US-05',
    module: 'Talent Matchmaker',
    title: 'Khớp nối kỹ sư và tính toán điểm năng lực Bayesian Elo',
    confidence: 91.5,
    location: 'Trang 4 - Đoạn 3.3',
    bullets: [
      'Tính điểm trọng số W1, W2, W3 dựa trên vector khoảng cách kỹ năng',
      'Định kỳ cập nhật điểm Elo sau mỗi sprint hoàn tất',
    ],
    citationHeading: 'Mục 3.3: Mô hình ánh xạ nhân sự theo thang đo Bayesian Elo',
    citationText:
      '...Mỗi thành viên sau khi tham gia các chu kỳ dự án sẽ sở hữu một vector kỹ năng đa chiều. Điểm năng lực được cập nhật sau mỗi sprint thông qua hệ số điều chỉnh Bayes, giúp thuật toán phân bổ công việc có thể tối ưu hóa độ lệch tải giữa các thành viên có thâm niên khác nhau...',
  },
  {
    id: '#US-06',
    module: 'SRS Ingestion Worker',
    title: 'Bóc tách bảng biểu và sơ đồ khối từ file scan',
    confidence: 78.4,
    location: 'Trang 5 - Đoạn 4.1',
    bullets: [
      'Nhận diện cấu trúc bảng thông số kỹ thuật đa cột',
      'Chuyển đổi sơ đồ kiến trúc hệ thống sang định dạng JSON Schema',
    ],
    citationHeading: 'Mục 4.1: Xử lý dữ liệu đa phương thức từ tệp đề cương',
    citationText:
      '...Các bảng biểu ma trận yêu cầu và sơ đồ khối chức năng cần được OCR xử lý qua luồng thị giác máy tính chuyên biệt để bảo đảm tính toàn vẹn của cấu trúc dữ liệu bảng và các liên kết khối...',
    isWarning: true,
  },
];

export const TraceabilityInspectorPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedStoryId, setSelectedStoryId] = useState<string>('#US-04');
  const [filterType, setFilterType] = useState<'all' | 'high' | 'warning'>('all');

  const selectedStory =
    mockStories.find((s) => s.id === selectedStoryId) || mockStories[0];

  const filteredStories = mockStories.filter((s) => {
    if (filterType === 'high') return s.confidence >= 90;
    if (filterType === 'warning') return s.isWarning;
    return true;
  });

  const handleConfirmAndRun = () => {
    navigate('/ai-decompose/processing');
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-10">
      {/* Thanh Công Cụ Tài Liệu Nguồn */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-md bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C] flex items-center justify-center shrink-0">
            <AppIcons.docWord size={16} />
          </div>
          <span className="text-xs font-bold text-[#0F172A] truncate">
            De_Cuong_Do_An_Tot_Nghiep_K2026.pdf
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488] shrink-0">
            <AppIcons.verifiedCheck size={11} />
            Đã trích xuất: 14 User Stories • 42 Sub-tasks
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-[#E2E8F0] bg-white text-[#4F46E5] hover:bg-indigo-50 gap-1.5"
          >
            <AppIcons.zap size={13} />
            <span>Đối soát tự động (Auto-Trace)</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs border-[#E2E8F0] bg-white text-[#64748B] hover:bg-slate-50 gap-1.5"
          >
            <AppIcons.reset size={13} />
            <span>Tải Lại Bóc Tách</span>
          </Button>
        </div>
      </div>

      {/* Khối Split-View 2 Cột: 7 : 5 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* CỘT TRÁI (Span 7) - Trình Xem Tài Liệu Gốc & Highlight */}
        <div className="lg:col-span-7 rounded-lg border border-[#E2E8F0] bg-white p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                TRANG 04 / 28
              </span>
              <span className="text-xs font-semibold text-[#0F172A]">
                {selectedStory.citationHeading}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#64748B]">Document View</span>
          </div>

          <div className="space-y-4 text-xs leading-relaxed text-[#334155]">
            {/* Đoạn 3.1 mẫu */}
            <p className="text-slate-600">
              <strong className="font-semibold text-[#0F172A]">
                3.1. Tổng quan cơ chế phân rã yêu cầu phần mềm (SRS):
              </strong>{' '}
              Quá trình tiếp nhận tài liệu đề cương yêu cầu nhận diện các thực thể ngữ nghĩa từ văn bản thô. Hệ thống sử dụng mô hình LLM chuyên biệt để tách lớp thông tin từ mô tả chức năng, ràng buộc kỹ thuật và chỉ tiêu thời gian thực hiện của từng nhóm phát triển.
            </p>

            {/* Khối Đoạn Văn Được Highlight Trích Xuất */}
            <div
              className={`rounded-lg border p-4 transition-all duration-200 ${
                selectedStory.isWarning
                  ? 'border-rose-200 bg-rose-50/40'
                  : 'border-[#4F46E5]/40 bg-indigo-50/40 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    selectedStory.isWarning
                      ? 'bg-[#BE123C] text-white'
                      : 'bg-[#4F46E5] text-white'
                  }`}
                >
                  Căn cứ trích xuất cho {selectedStory.id} • Khớp {selectedStory.confidence}%
                </span>
                <span className="text-[10px] font-mono text-[#64748B]">
                  {selectedStory.location}
                </span>
              </div>
              <p
                className={`font-medium italic leading-relaxed ${
                  selectedStory.isWarning ? 'text-rose-950' : 'text-indigo-950'
                }`}
              >
                &ldquo;{selectedStory.citationText}&rdquo;
              </p>
            </div>

            {/* Đoạn 3.3 mẫu */}
            <p className="text-slate-600">
              <strong className="font-semibold text-[#0F172A]">
                3.3. Mô hình ánh xạ nhân sự theo thang đo Bayesian Elo:
              </strong>{' '}
              Mỗi thành viên sau khi tham gia các chu kỳ dự án sẽ sở hữu một vector kỹ năng đa chiều. Điểm năng lực được cập nhật sau mỗi sprint thông qua hệ số điều chỉnh Bayes, giúp thuật toán phân bổ công việc có thể tối ưu hóa độ lệch tải giữa các thành viên có thâm niên khác nhau.
            </p>
          </div>
        </div>

        {/* CỘT PHẢI (Span 5) - Danh Sách User Stories Đã Bóc Tách */}
        <div className="lg:col-span-5 space-y-3">
          {/* Chip filter 3 tab */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === 'all'
                  ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Tất cả (14)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('high')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === 'high'
                  ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Độ tin cậy &gt; 90%
            </button>
            <button
              type="button"
              onClick={() => setFilterType('warning')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                filterType === 'warning'
                  ? 'bg-rose-50 border border-rose-200 text-[#BE123C] font-semibold'
                  : 'bg-white border border-rose-200 text-[#BE123C] hover:bg-rose-50/50'
              }`}
            >
              Cần rà soát (2)
            </button>
          </div>

          {/* Danh Sách Thẻ User Story */}
          <div className="space-y-3">
            {filteredStories.map((story) => {
              const isSelected = story.id === selectedStoryId;
              return (
                <div
                  key={story.id}
                  onClick={() => setSelectedStoryId(story.id)}
                  className={`rounded-lg border bg-white p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#4F46E5] ring-1 ring-[#4F46E5]/30 shadow-xs'
                      : 'border-[#E2E8F0] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#4F46E5] text-white">
                        {story.id}
                      </span>
                      <span className="text-xs font-medium text-[#64748B]">
                        {story.module}
                      </span>
                    </div>

                    {story.isWarning ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                        <AppIcons.criticalAlert size={11} />
                        Độ tin cậy: {story.confidence}% (Cần rà soát)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F0FDF4] border border-[#CCFBF1] text-[#0D9488]">
                        Độ tin cậy: {story.confidence}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-[#0F172A] leading-snug">
                    {story.title}
                  </h3>

                  <ul className="mt-2 space-y-1 text-[11px] text-[#64748B]">
                    {story.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#4F46E5] font-bold">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {isSelected && (
                    <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono text-[#4F46E5]">
                      <span>Đang trỏ tới: {story.location}</span>
                      <span className="font-bold">Đang hiển thị &gt;</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div className="rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-[#0D9488]">
          <AppIcons.verifiedCheck size={16} />
          <span>
            Đã xác nhận 13/14 User Stories hợp lệ. Sẵn sàng chuyển sang bước tính toán đường găng.
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-xs border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-slate-50 gap-1.5"
          >
            <AppIcons.override size={14} className="text-[#4F46E5]" />
            <span>Chỉnh Sửa Thủ Công</span>
          </Button>

          <Button
            onClick={handleConfirmAndRun}
            className="h-9 px-4 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs transition-colors"
          >
            <span>Xác Nhận &amp; Chạy Ma Trận Xử Lý AI</span>
            <AppIcons.arrowRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TraceabilityInspectorPage;
