import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

interface ChecklistItem {
  id: string;
  category: 'prerequisite' | 'implementation' | 'testing' | 'security';
  text: string;
  isCompleted: boolean;
  isFocus?: boolean;
}

const initialChecklist: ChecklistItem[] = [
  // Yêu cầu tiên quyết
  {
    id: 'req-1',
    category: 'prerequisite',
    text: 'Xác nhận cấu trúc dữ liệu Adjacency List và schema bảng task_dependencies từ #TASK-00.',
    isCompleted: true,
  },
  {
    id: 'req-2',
    category: 'prerequisite',
    text: 'Kiểm tra điều kiện trạng thái FSM: Tác vụ tiên quyết đã đạt DONE.',
    isCompleted: true,
  },
  // Triển khai
  {
    id: 'imp-1',
    category: 'implementation',
    text: 'Cài đặt thuật toán Kahn Topological Sort và phát hiện chu trình vòng lặp (Cycle Detection).',
    isCompleted: true,
  },
  {
    id: 'imp-2',
    category: 'implementation',
    text: 'Viết hàm tính toán Forward Pass (ES, EF) và Backward Pass (LS, LF).',
    isCompleted: true,
  },
  {
    id: 'imp-3',
    category: 'implementation',
    text: 'Gắn cờ is_critical_path = true cho các node có Slack == 0 và xuất JSON cho React Flow.',
    isCompleted: false,
    isFocus: true,
  },
  // Kiểm thử
  {
    id: 'test-1',
    category: 'testing',
    text: 'Chạy Pytest kiểm thử đồ thị 50 node phân nhánh phức tạp (< 15ms).',
    isCompleted: true,
  },
  {
    id: 'test-2',
    category: 'testing',
    text: 'Kiểm thử biên trường hợp đồ thị rời rạc hoặc nhiều đường găng song song.',
    isCompleted: false,
  },
  // Bảo mật
  {
    id: 'sec-1',
    category: 'security',
    text: 'Xác thực quyền sở hữu workspace_id qua RBAC middleware trước khi ghi đè chỉ số CPM.',
    isCompleted: false,
  },
];

interface TaskDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
}

export const TaskDetailDrawer: React.FC<TaskDetailDrawerProps> = ({
  isOpen,
  onClose,
  taskId = '#TASK-01',
}) => {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);

  if (!isOpen) return null;

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const completedCount = checklist.filter((i) => i.isCompleted).length;
  const totalCount = checklist.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handleGoToReview = () => {
    navigate('/kanban/pr-review/PR-42');
  };

  const handleGoToSubmission = () => {
    navigate('/kanban/submission/TASK-06');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xs transition-opacity duration-200"
      />

      {/* Slide-over Drawer (ĐÃ SỬA LỖI TRÀN MÉP PHẢI THEO CHỈ THỊ) */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-full max-w-[680px] bg-white shadow-2xl border-l border-[#E2E8F0] flex flex-col justify-between overflow-x-hidden animate-in slide-in-from-right duration-200">
          {/* Top Header */}
          <div className="p-6 border-b border-[#E2E8F0] space-y-3 bg-[#F8FAFC]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#0F172A]">{taskId}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                  CPM CRITICAL
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#334155]">
                  IN_PROGRESS
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGoToSubmission}
                  className="text-[11px] font-mono text-[#4F46E5] hover:underline"
                  title="Chuyển sang trang Nộp bài (#TASK-06)"
                >
                  [Nộp Báo Cáo]
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors"
                >
                  <AppIcons.close size={16} />
                </button>
              </div>
            </div>

            <h2 className="text-base font-bold text-[#0F172A] leading-snug">
              Hiện thực hóa thuật toán tính toán đường găng DAG CPM
            </h2>

            {/* Dòng Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748B] font-mono pt-1">
              <div className="flex items-center gap-1.5 text-[#0F172A] font-sans font-medium">
                <span className="h-5 w-5 rounded-full bg-[#0F172A] text-white text-[9px] font-bold flex items-center justify-center">
                  ĐN
                </span>
                <span>Đặng Hồng Nguyên</span>
              </div>
              <span>/</span>
              <span>24h (5 SP)</span>
              <span>/</span>
              <span className="text-[#BE123C] font-bold">Slack: 0h</span>
              <span>/</span>
              <span className="text-emerald-700 font-medium">Phụ thuộc: #TASK-00 (Đã xong)</span>
            </div>
          </div>

          {/* Thân Ngăn Kéo (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 1. Khối Mục Tiêu Công Việc & Tiêu Chí Nghiệm Thu */}
            <div className="rounded-lg border border-[#E2E8F0] bg-[#FAFAFA] p-4 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                MỤC TIÊU CÔNG VIỆC &amp; TIÊU CHÍ NGHIỆM THU
              </div>
              <p className="text-xs text-[#334155] leading-relaxed">
                Xây dựng module Python/FastAPI thực thi thuật toán Kahn Topological Sort kết hợp Forward/Backward Pass để xác định chính xác Early Start, Late Finish, Slack Time và chuỗi đường găng cho toàn bộ đồ thị WBS.
              </p>
            </div>

            {/* 2. Checklist Hướng Dẫn Động (AI Adaptive Guidance) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AppIcons.navAiDecompose size={16} className="text-[#4F46E5]" />
                  <h3 className="text-xs font-bold text-[#0F172A] tracking-tight">
                    Checklist Hướng Dẫn Động (AI Adaptive Guidance)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#4F46E5]">
                    {completedCount} / {totalCount} Bước ({progressPercent}%)
                  </span>
                  <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className="h-full bg-[#4F46E5] rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Danh Sách 4 Nhóm Checklist */}
              <div className="space-y-4">
                {/* NHÓM: YÊU CẦU TIÊN QUYẾT */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    YÊU CẦU TIÊN QUYẾT
                  </div>
                  <div className="space-y-1.5">
                    {checklist
                      .filter((i) => i.category === 'prerequisite')
                      .map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                          />
                          <span
                            className={`text-xs leading-relaxed ${
                              item.isCompleted
                                ? 'line-through text-[#94A3B8]'
                                : 'text-[#334155]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>

                {/* NHÓM: TRIỂN KHAI */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    TRIỂN KHAI
                  </div>
                  <div className="space-y-1.5">
                    {checklist
                      .filter((i) => i.category === 'implementation')
                      .map((item) => (
                        <label
                          key={item.id}
                          className={`flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors ${
                            item.isFocus ? 'bg-indigo-50/40 border border-indigo-100' : ''
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                          />
                          <span
                            className={`text-xs leading-relaxed ${
                              item.isCompleted
                                ? 'line-through text-[#94A3B8]'
                                : item.isFocus
                                ? 'font-bold text-[#0F172A]'
                                : 'text-[#334155]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>

                {/* NHÓM: KIỂM THỬ */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    KIỂM THỬ
                  </div>
                  <div className="space-y-1.5">
                    {checklist
                      .filter((i) => i.category === 'testing')
                      .map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                          />
                          <span
                            className={`text-xs leading-relaxed ${
                              item.isCompleted
                                ? 'line-through text-[#94A3B8]'
                                : 'text-[#334155]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>

                {/* NHÓM: BẢO MẬT */}
                <div className="space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                    BẢO MẬT
                  </div>
                  <div className="space-y-1.5">
                    {checklist
                      .filter((i) => i.category === 'security')
                      .map((item) => (
                        <label
                          key={item.id}
                          className="flex items-start gap-2.5 p-2 rounded-md hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => toggleCheck(item.id)}
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#4F46E5] accent-[#4F46E5] focus:ring-[#4F46E5] cursor-pointer"
                          />
                          <span
                            className={`text-xs leading-relaxed ${
                              item.isCompleted
                                ? 'line-through text-[#94A3B8]'
                                : 'text-[#334155]'
                            }`}
                          >
                            {item.text}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Hộp Gợi Ý Từ AI Lập Lịch */}
            <div className="rounded-lg border border-indigo-100 bg-[#EEF2FF]/60 p-3.5 flex items-start gap-2.5 text-xs">
              <div className="h-6 w-6 rounded-full bg-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0 mt-0.5">
                <AppIcons.navAiDecompose size={13} />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-[#4F46E5]">Gợi ý từ AI Lập Lịch</div>
                <p className="text-slate-700 leading-relaxed">
                  Tác vụ #TASK-01 nằm trên đường găng (Slack = 0). Chậm trễ ở bước này sẽ đẩy lùi ngày bàn giao Release v1.4.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Ngăn Kéo (ĐÃ HIỂN THỊ ĐẦY ĐỦ 100% THEO CHỈ THỊ) */}
          <div className="p-4 border-t border-[#E2E8F0] bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-[11px] text-[#64748B]">
              Cập nhật tự động bởi AI Adaptive Engine • Đồng bộ với Bảng Kanban.
            </span>

            <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoToSubmission}
                className="h-9 text-xs border-[#E2E8F0] text-[#0D9488] hover:bg-teal-50 gap-1.5"
              >
                <AppIcons.fileVerified size={13} />
                <span>Nộp Sản Phẩm / Báo Cáo</span>
              </Button>

              <Button
                size="sm"
                onClick={handleGoToReview}
                className="h-9 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs"
              >
                <AppIcons.codeDiff size={13} />
                <span>Thẩm Định PR (#PR-42)</span>
                <AppIcons.arrowRight size={13} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailDrawer;
