import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppIcons } from '@/components/icons/AppIcons';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import { Task, TaskStatus } from '@/types/task';
import { Button } from '@/components/ui/button';

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-101',
    project_id: 'proj-001',
    title: 'Thiết kế hệ thống giao diện Tailwind CSS & CVA primitives',
    description: 'Xây dựng toàn bộ design system gồm Button, Input, Card với màu sắc CSS variables.',
    priority: 'HIGH',
    status: 'DONE',
    required_level: 'SENIOR',
    scheduled_date: '2026-09-12',
    checklist: [
      { step_id: 1, text: 'Tạo tailwind.config.ts', is_completed: true },
      { step_id: 2, text: 'Xây dựng UI Primitives', is_completed: true },
    ],
    created_at: '2026-09-10',
  },
  {
    id: 'task-102',
    project_id: 'proj-001',
    title: 'Tích hợp drag-and-drop cho Kanban Board với hello-pangea/dnd',
    description: 'Cho phép kéo thả công việc mượt mà giữa các cột trạng thái TODO, IN_PROGRESS, REVIEW, DONE.',
    priority: 'URGENT',
    status: 'IN_PROGRESS',
    required_level: 'MIDDLE',
    scheduled_date: '2026-09-12',
    checklist: [
      { step_id: 1, text: 'Setup DragDropContext', is_completed: true },
      { step_id: 2, text: 'Xử lý reorder state', is_completed: true },
      { step_id: 3, text: 'Cập nhật API khi thả', is_completed: false },
    ],
    created_at: '2026-09-11',
  },
  {
    id: 'task-103',
    project_id: 'proj-001',
    title: 'Xây dựng hook useAuth và Axios interceptors',
    description: 'Tự động gắn Bearer Token vào header và xử lý chuyển hướng 401 về trang /login.',
    priority: 'HIGH',
    status: 'REVIEW',
    required_level: 'MIDDLE',
    scheduled_date: '2026-09-12',
    checklist: [
      { step_id: 1, text: 'Axios request interceptor', is_completed: true },
      { step_id: 2, text: 'Axios response interceptor 401', is_completed: true },
    ],
    created_at: '2026-09-11',
  },
  {
    id: 'task-104',
    project_id: 'proj-001',
    title: 'Tối ưu hoá thuật toán AI dispatch tự động',
    description: 'Tính toán ma trận độ tương thích kỹ năng nhân viên và khối lượng công việc hàng ngày.',
    priority: 'URGENT',
    status: 'TODO',
    required_level: 'SENIOR',
    scheduled_date: '2026-09-13',
    checklist: [
      { step_id: 1, text: 'Định nghĩa ma trận skill matrix', is_completed: false },
      { step_id: 2, text: 'Chạy mô phỏng tải công việc', is_completed: false },
    ],
    created_at: '2026-09-12',
  },
  {
    id: 'task-105',
    project_id: 'proj-001',
    title: 'Cấu hình React Router v6 protected layout',
    description: 'Bảo vệ các route riêng tư trong AppLayout và xử lý fallback.',
    priority: 'MEDIUM',
    status: 'DONE',
    required_level: 'JUNIOR',
    scheduled_date: '2026-09-10',
    checklist: [{ step_id: 1, text: 'Tạo routes/index.tsx', is_completed: true }],
    created_at: '2026-09-09',
  },
  {
    id: 'task-106',
    project_id: 'proj-001',
    title: 'Viết unit tests cho Kanban column filter',
    description: 'Đảm bảo lọc danh sách công việc chính xác theo từng trạng thái.',
    priority: 'LOW',
    status: 'TODO',
    required_level: 'FRESHER',
    scheduled_date: '2026-09-14',
    checklist: [{ step_id: 1, text: 'Viết Jest spec', is_completed: false }],
    created_at: '2026-09-12',
  },
];

export const KanbanPage: React.FC = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [dispatchDate, setDispatchDate] = useState<string>('2026-09-12');
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  const handleTaskStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const handleAIDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.status === 'TODO') {
            return { ...t, status: 'IN_PROGRESS' };
          }
          return t;
        })
      );
      setIsDispatching(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700">
            <AppIcons.navCalendar size={15} className="text-[#4F46E5]" />
            <span>Ngày điều phối:</span>
            <input
              type="date"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="bg-transparent font-bold text-[#4F46E5] outline-none cursor-pointer"
            />
          </div>
          <span className="text-xs text-slate-300">|</span>
          <span className="text-xs font-medium text-[#64748B]">
            Mã dự án: <span className="font-semibold text-slate-800">{projectId || 'proj-001'}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1.5 text-[#64748B]">
            <AppIcons.filter size={14} />
            <span>Bộ Lọc</span>
          </Button>

          <Button
            onClick={handleAIDispatch}
            disabled={isDispatching}
            className="gap-2 bg-gradient-to-r from-[#4F46E5] to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-200 text-xs font-semibold"
          >
            {isDispatching ? (
              <AppIcons.refresh size={15} className="animate-spin" />
            ) : (
              <AppIcons.navAiDecompose size={15} className="text-amber-300" />
            )}
            <span>{isDispatching ? 'AI Đang Điều Phối...' : 'AI Điều Phối Ngày (Dispatch)'}</span>
          </Button>
        </div>
      </div>

      {/* Kanban Drag and Drop Board */}
      <KanbanBoard tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />
    </div>
  );
};

export default KanbanPage;
