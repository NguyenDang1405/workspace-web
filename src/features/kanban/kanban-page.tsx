import React, { useState } from 'react';
import { AppIcons } from '@/components/icons/AppIcons';
import { Button } from '@/components/ui/button';

interface KanbanTask {
  id: string;
  title: string;
  priorityLabel: string;
  isCritical?: boolean;
  isPrReady?: boolean;
  isPendingReview?: boolean;
  isCompleted?: boolean;
  isInFlight?: boolean;
  duration: string;
  remaining?: string;
  assignee: string;
  wbsProgress?: number;
}

interface KanbanColumn {
  id: string;
  title: string;
  count: number;
  tasks: KanbanTask[];
}

const mockColumns: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'BACKLOG',
    count: 4,
    tasks: [
      {
        id: '#TASK-18',
        title: 'Viết kịch bản kiểm thử API Sandbox',
        priorityLabel: 'P3 Low',
        duration: '4h',
        assignee: 'TL',
      },
      {
        id: '#TASK-21',
        title: 'Đánh giá tài liệu microservices và OpenAPI',
        priorityLabel: 'P2 Medium',
        duration: '6h',
        assignee: 'TV',
      },
    ],
  },
  {
    id: 'todo',
    title: 'TODO',
    count: 6,
    tasks: [
      {
        id: '#TASK-08',
        title: 'Cấu hình Docker Compose cho cụm vLLM inference',
        priorityLabel: 'P2 Medium',
        duration: '8h',
        assignee: 'HN',
      },
      {
        id: '#TASK-11',
        title: 'Pipeline CI/CD tự động hóa',
        priorityLabel: 'P1 High',
        duration: '12h',
        assignee: 'QB',
      },
    ],
  },
  {
    id: 'in_progress',
    title: 'IN PROGRESS',
    count: 5,
    tasks: [
      {
        id: '#TASK-01',
        title: 'Hiện thực hóa thuật toán tính toán đường găng DAG CPM',
        priorityLabel: 'P1 High',
        isCritical: true,
        duration: '24h',
        remaining: 'Còn 8h',
        assignee: 'ĐN',
        wbsProgress: 65,
      },
      {
        id: '#TASK-02',
        title: 'Khớp nối kỹ sư và Bayesian Elo (#TASK-02)',
        priorityLabel: 'FSM In-Flight',
        isInFlight: true,
        duration: '12h',
        assignee: 'TL',
      },
    ],
  },
  {
    id: 'review',
    title: 'REVIEW',
    count: 3,
    tasks: [
      {
        id: '#TASK-05',
        title: 'Thiết kế bộ icon 3D và chuẩn hóa CSS M3 Light',
        priorityLabel: 'PR #14 Ready',
        isPrReady: true,
        duration: '16h',
        assignee: 'ĐN',
      },
      {
        id: '#TASK-09',
        title: 'Tối ưu hóa thời gian tính ma trận nghịch đảo Topological',
        priorityLabel: 'Chờ Duyệt',
        isPendingReview: true,
        duration: '10h',
        assignee: 'HN',
      },
    ],
  },
  {
    id: 'done',
    title: 'DONE',
    count: 6,
    tasks: [
      {
        id: '#TASK-00',
        title: 'Khảo sát và nạp tài liệu SRS đề cương đồ án',
        priorityLabel: 'Completed',
        isCompleted: true,
        duration: '16h',
        assignee: 'ĐN',
      },
      {
        id: '#TASK-04',
        title: 'Thiết lập môi trường Vector Database HNSW ChromaDB',
        priorityLabel: 'Completed',
        isCompleted: true,
        duration: '24h',
        assignee: 'TL',
      },
    ],
  },
];

export const KanbanPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'cpm' | 'mine'>('all');
  const [showFsmGuard, setShowFsmGuard] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAcceptTransition = () => {
    setShowFsmGuard(false);
  };

  return (
    <div className="space-y-5 max-w-[1520px] mx-auto pb-12 relative min-h-[calc(100vh-120px)]">
      {/* Header & Bộ Lọc */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-[#0F172A] tracking-tight">
              Bảng Điều Hành FSM Workflow
            </h1>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-[#EEF2FF] border border-[#C7D2FE] text-[#4F46E5]">
              <AppIcons.zap size={12} />
              CPM Synced
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Các bước chuyển trạng thái (Transitions) được bảo vệ bởi máy trạng thái hữu hạn FSM và ràng buộc phụ thuộc CPM.
          </p>
        </div>

        {/* Thanh tìm kiếm, Chips lọc & Nút thêm */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-2.5 py-1.5 text-xs text-[#64748B] w-56 shadow-2xs">
            <AppIcons.search size={14} className="text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Tìm kiếm tác vụ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-hidden text-[#0F172A] placeholder-[#94A3B8] text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Tất cả (24)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('cpm')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === 'cpm'
                  ? 'bg-[#BE123C] text-white font-semibold shadow-xs'
                  : 'bg-white border border-[#FFE4E6] text-[#BE123C] hover:bg-rose-50'
              }`}
            >
              Đường Găng CPM (5)
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('mine')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                activeFilter === 'mine'
                  ? 'bg-[#4F46E5] text-white font-semibold shadow-xs'
                  : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Của Tôi
            </button>
          </div>

          <Button
            size="sm"
            className="h-8 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs"
          >
            <AppIcons.plus size={14} />
            <span>Thêm Công Việc</span>
          </Button>
        </div>
      </div>

      {/* 4 Thẻ chỉ số nhanh */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2E8F0] bg-white shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-[#3B82F6]" />
          <span className="text-[#64748B]">Tổng số công việc:</span>
          <strong className="font-mono text-[#0F172A]">24 Tasks</strong>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[#FFE4E6] bg-[#FFF1F2]/60 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-[#BE123C]" />
          <span className="text-[#BE123C]">Độ trôi găng (Slack = 0):</span>
          <strong className="font-mono text-[#BE123C]">5 Critical</strong>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[#CCFBF1] bg-[#F0FDF4]/70 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-[#0D9488]" />
          <span className="text-[#64748B]">Tỷ lệ hoàn thành Sprint:</span>
          <strong className="font-mono text-[#0D9488]">58.3%</strong>
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-lg border border-[#E2E8F0] bg-white shadow-2xs">
          <AppIcons.adminRbac size={14} className="text-[#4F46E5]" />
          <span className="text-[#64748B]">Quy tắc FSM Guard:</span>
          <strong className="text-[#4F46E5] text-[11px]">Kích hoạt nghiêm ngặt</strong>
        </div>
      </div>

      {/* 5 Cột Kanban */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 items-start">
        {mockColumns.map((col) => (
          <div
            key={col.id}
            className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] p-3 space-y-3 min-h-[500px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0F172A] tracking-wide">
                  {col.title}
                </span>
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-200 text-[10px] font-mono font-bold text-[#475569]">
                  {col.count}
                </span>
              </div>
              <button
                type="button"
                className="p-1 rounded text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-200/60 transition-colors"
                title="Thêm tác vụ"
              >
                <AppIcons.plus size={13} />
              </button>
            </div>

            {/* Task Cards */}
            <div className="space-y-2.5">
              {col.tasks.map((task) => {
                if (task.isInFlight) {
                  return (
                    <div
                      key={task.id}
                      className="rounded-lg border-2 border-dashed border-[#818CF8] bg-white p-3 shadow-xs space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-[#4F46E5]">
                          {task.id}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-indigo-50 text-[#4F46E5]">
                          <AppIcons.refresh size={10} className="animate-spin" />
                          FSM In-Flight
                        </span>
                      </div>
                      <p className="text-xs font-medium text-[#0F172A] leading-snug">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[#4F46E5] pt-1">
                        <AppIcons.arrowRight size={12} />
                        <span>Đang kéo thả sang REVIEW...</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={task.id}
                    className={`rounded-lg border bg-white p-3 shadow-2xs space-y-2 hover:shadow-xs transition-shadow cursor-grab ${
                      task.isCritical
                        ? 'border-[#FFE4E6] ring-1 ring-[#FFE4E6]'
                        : 'border-[#E2E8F0]'
                    }`}
                  >
                    {/* Top Row: Code & Badge */}
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-mono text-[11px] font-bold text-[#0F172A]">
                        {task.id}
                      </span>
                      {task.isCritical ? (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#FFF1F2] border border-[#FFE4E6] text-[#BE123C]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#BE123C]" />
                          CPM CRITICAL
                        </span>
                      ) : task.isPrReady ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-indigo-50 border border-indigo-100 text-[#4F46E5]">
                          {task.priorityLabel}
                        </span>
                      ) : task.isPendingReview ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-amber-50 border border-amber-200 text-amber-700">
                          {task.priorityLabel}
                        </span>
                      ) : task.isCompleted ? (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-50 border border-emerald-100 text-[#0D9488]">
                          {task.priorityLabel}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#64748B]">
                          {task.priorityLabel}
                        </span>
                      )}
                    </div>

                    {/* Task Title */}
                    <p className="text-xs font-medium text-[#0F172A] leading-snug">
                      {task.title}
                    </p>

                    {/* WBS Progress if exists */}
                    {task.wbsProgress && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B]">
                          <span>Tiến độ WBS</span>
                          <span className="font-bold text-[#4F46E5]">{task.wbsProgress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className="h-full bg-[#4F46E5] rounded-full"
                            style={{ width: `${task.wbsProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Bottom Metadata */}
                    <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-[#64748B]">
                      <div className="flex items-center gap-1">
                        <AppIcons.clock size={12} className="text-[#94A3B8]" />
                        <span>{task.duration}</span>
                        {task.remaining && (
                          <span className="text-[#BE123C] font-semibold">({task.remaining})</span>
                        )}
                        {task.isCompleted && (
                          <span className="inline-flex items-center gap-0.5 text-[#0D9488]">
                            <AppIcons.verifiedCheck size={11} />
                            100% Verified
                          </span>
                        )}
                      </div>
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F172A] text-[9px] font-bold text-white shadow-2xs">
                        {task.assignee}
                      </span>
                    </div>
                  </div>
                );
              })}

              {col.id === 'backlog' && (
                <div className="rounded-lg border-2 border-dashed border-[#CBD5E1] p-3 text-center text-[11px] font-mono text-[#94A3B8]">
                  Kéo thả vào đây
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hộp Thoại Nổi FSM Transition Guard (Góc Phải Dưới) */}
      {showFsmGuard && (
        <div className="fixed bottom-5 right-6 z-40 w-96 rounded-lg border border-[#C7D2FE] bg-white p-4 shadow-xl space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-start gap-2.5">
            <div className="h-7 w-7 rounded-md bg-indigo-50 border border-indigo-100 text-[#4F46E5] flex items-center justify-center shrink-0">
              <AppIcons.adminRbac size={16} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs font-bold text-[#0F172A] leading-snug">
                FSM Transition Guard: Xác nhận chuyển trạng thái
              </h3>
              <p className="text-[11px] text-[#64748B] font-mono mt-0.5">
                Kiểm tra điều kiện tiên quyết cho tác vụ <strong className="text-[#4F46E5]">#TASK-02</strong> (IN_PROGRESS → REVIEW)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFsmGuard(false)}
              className="text-[#94A3B8] hover:text-[#0F172A]"
            >
              <AppIcons.close size={14} />
            </button>
          </div>

          {/* 3 Điều Kiện FSM Guard */}
          <div className="rounded-md border border-[#E2E8F0] bg-[#F8FAFC] p-2.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <AppIcons.verifiedCheck size={14} className="text-[#0D9488] shrink-0" />
              <span>Task tiền nhiệm (#TASK-00) đã hoàn thành (EF &le; ES)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <AppIcons.verifiedCheck size={14} className="text-[#0D9488] shrink-0" />
              <span>Branch Git đã mở Pull Request và pass CI unit tests</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <AppIcons.verifiedCheck size={14} className="text-[#0D9488] shrink-0" />
              <span>Không phát hiện Deadlock trên đồ thị DAG</span>
            </div>
          </div>

          {/* 2 Nút Hành Động */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFsmGuard(false)}
              className="h-8 text-xs border-[#E2E8F0] text-[#64748B] hover:bg-slate-50"
            >
              Hủy Bỏ
            </Button>
            <Button
              size="sm"
              onClick={handleAcceptTransition}
              className="h-8 rounded-md bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-semibold gap-1.5 shadow-xs"
            >
              <span>Chấp Nhận Chuyển → REVIEW</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanPage;
