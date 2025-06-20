
import React, { useState } from 'react';
import { User, Calendar, Target, Clock } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high';
  okrId?: string;
  okrTitle?: string;
  progress: number;
}

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove?: (taskId: string, newStatus: string) => void;
}

const KanbanBoard = ({ tasks, onTaskMove }: KanbanBoardProps) => {
  const [draggedTask, setDraggedTask] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const columns = [
    { id: 'pending', title: 'Pendentes', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'in-progress', title: 'Em Andamento', color: 'bg-blue-50 border-blue-200' },
    { id: 'completed', title: 'Concluídas', color: 'bg-green-50 border-green-200' },
    { id: 'overdue', title: 'Atrasadas', color: 'bg-red-50 border-red-200' }
  ];

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors];
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 60) return 'bg-blue-600';
    if (progress >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    setDraggedTask(taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (columnId: string) => {
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnId: string) => {
    e.preventDefault();
    
    if (draggedTask && onTaskMove) {
      onTaskMove(draggedTask, columnId);
    }
    
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {columns.map((column) => (
        <div 
          key={column.id} 
          className={`${column.color} rounded-lg border-2 border-dashed p-4 transition-all duration-200 ${
            dragOverColumn === column.id ? 'border-blue-400 bg-blue-50' : ''
          }`}
          onDragOver={handleDragOver}
          onDragEnter={() => handleDragEnter(column.id)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">{column.title}</h3>
            <span className="text-sm text-gray-600">
              {getTasksByStatus(column.id).length} tarefa(s)
            </span>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {getTasksByStatus(column.id).map((task) => (
              <div
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all cursor-move ${
                  draggedTask === task.id ? 'opacity-50 transform rotate-2' : ''
                }`}
              >
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2">
                      {task.title}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-3">
                    {task.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <User size={12} />
                    <span className="truncate">{task.assignee}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar size={12} />
                    <span>{task.endDate}</span>
                  </div>
                  
                  {task.okrId && (
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Target size={12} />
                      <span className="truncate">{task.okrTitle}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>{task.progress}%</span>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Drop zone indicator */}
            {dragOverColumn === column.id && (
              <div className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center text-blue-600">
                <p className="text-sm">Solte a tarefa aqui</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
