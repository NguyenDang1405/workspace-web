import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { AppIcons } from '@/components/icons/AppIcons';
import { Task } from '@/types/task';

interface TaskCardProps {
  task: Task;
  index: number;
}

const getPriorityBadgeClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'URGENT':
      return 'bg-rose-50 text-[#BE123C] border-rose-200';
    case 'HIGH':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'MEDIUM':
      return 'bg-blue-50 text-blue-700 border-blue-200';
    case 'LOW':
    default:
      return 'bg-slate-50 text-[#64748B] border-[#E2E8F0]';
  }
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const completedChecklistCount =
    task.checklist?.filter((item) => item.is_completed).length || 0;
  const totalChecklistCount = task.checklist?.length || 0;
  const formattedTaskId = `#${task.id.toUpperCase().replace('-', '_')}`;

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group rounded-lg border border-[#E2E8F0] bg-white p-4 shadow-xs transition-colors hover:border-[#CBD5E1] ${
            snapshot.isDragging ? 'rotate-1 ring-1 ring-[#4F46E5]' : ''
          }`}
        >
          {/* Header Badges: Task Code (Mono) + Priority */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] font-semibold text-[#64748B] tracking-tight">
                {formattedTaskId}
              </span>
              {task.priority === 'URGENT' && (
                <span className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#FFF1F2] text-[#BE123C] border border-[#FECDD3]">
                  <AppIcons.criticalAlert size={11} className="text-[#BE123C]" />
                  CPM CRITICAL
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold border ${getPriorityBadgeClass(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>

              {task.required_level && (
                <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#4F46E5] border border-indigo-100">
                  {task.required_level}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-[#0F172A] group-hover:text-[#4F46E5] transition-colors line-clamp-2 mb-1.5">
            {task.title}
          </h4>

          {/* Description */}
          <p className="text-xs text-[#64748B] line-clamp-2 mb-3">
            {task.description}
          </p>

          {/* Footer Metadata: Engineering Specs (Mono) */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-2.5 text-xs text-[#64748B]">
            {/* Checklist count ratio */}
            {totalChecklistCount > 0 ? (
              <div
                className={`flex items-center gap-1.5 font-mono text-[11px] font-medium ${
                  completedChecklistCount === totalChecklistCount
                    ? 'text-[#0D9488]'
                    : 'text-[#64748B]'
                }`}
              >
                <AppIcons.checkSquare size={13} />
                <span>
                  {completedChecklistCount}/{totalChecklistCount}
                </span>
              </div>
            ) : (
              <span className="font-mono text-[11px] text-[#64748B]">3 SP</span>
            )}

            {/* Scheduled Date */}
            {task.scheduled_date && (
              <div className="flex items-center gap-1 font-mono text-[11px] text-[#64748B]">
                <AppIcons.clock size={12} />
                <span>{task.scheduled_date}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
