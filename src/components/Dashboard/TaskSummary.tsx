
import React from 'react';
import { CheckSquare, Clock, AlertTriangle } from 'lucide-react';

const TaskSummary = () => {
  const taskStats = [
    { label: 'Concluídas', value: 24, icon: CheckSquare, color: 'text-green-600 bg-green-100' },
    { label: 'Em Andamento', value: 12, icon: Clock, color: 'text-blue-600 bg-blue-100' },
    { label: 'Atrasadas', value: 3, icon: AlertTriangle, color: 'text-red-600 bg-red-100' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Resumo de Tarefas</h3>
      
      <div className="space-y-4">
        {taskStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
              </div>
              <span className="text-xl font-bold text-gray-900">{stat.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskSummary;
