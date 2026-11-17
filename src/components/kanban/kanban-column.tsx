import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types/task';
import { TaskCard } from './task-card';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  accentColor: string;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  title,
  tasks,
  accentColor,
}) => {
  return (
    <div className="flex w-80 flex-shrink-0 flex-col rounded-lg bg-[#F1F5F9] p-3 border border-[#E2E8F0]">
      {/* Column Header */}
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accentColor}`} />
          <h3 className="text-xs font-bold text-[#0F172A] tracking-tight uppercase">{title}</h3>
        </div>
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-1.5 font-mono text-[11px] font-semibold text-[#0F172A]">
          {tasks.length}
        </span>
      </div>

      {/* Droppable Column Container */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 space-y-3 overflow-y-auto min-h-[450px] rounded-md p-1 transition-colors ${
              snapshot.isDraggingOver ? 'bg-indigo-50/60 ring-1 ring-[#4F46E5]' : ''
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}

            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-[#CBD5E1] text-xs text-[#64748B]">
                Chưa có công việc
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
};
