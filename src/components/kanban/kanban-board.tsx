import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types/task';
import { KanbanColumn } from './kanban-column';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const COLUMNS: { status: TaskStatus; title: string; accentColor: string }[] = [
  { status: 'TODO', title: 'Cần Làm (To Do)', accentColor: 'bg-slate-400' },
  { status: 'IN_PROGRESS', title: 'Đang Thực Hiện (In Progress)', accentColor: 'bg-indigo-500' },
  { status: 'REVIEW', title: 'Đang Kiểm Thử (Review)', accentColor: 'bg-amber-500' },
  { status: 'DONE', title: 'Hoàn Thành (Done)', accentColor: 'bg-emerald-500' },
];

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onTaskStatusChange }) => {
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    if (onTaskStatusChange) {
      onTaskStatusChange(draggableId, newStatus);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter((t) => t.status === col.status);
          return (
            <KanbanColumn
              key={col.status}
              status={col.status}
              title={col.title}
              tasks={columnTasks}
              accentColor={col.accentColor}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
};
