import React, { useState } from 'react';
import { Plus, CheckSquare, Clock, User, Target, Calendar, Filter, LayoutGrid, List } from 'lucide-react';
import KanbanBoard from '../components/Tasks/KanbanBoard';

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

const Tasks = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Desenvolver nova funcionalidade de relatórios',
      description: 'Criar dashboard com métricas de performance',
      assignee: 'João Silva',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      status: 'in-progress',
      priority: 'high',
      okrId: '1',
      okrTitle: 'Aumentar receita em 25%',
      progress: 65
    },
    {
      id: '2',
      title: 'Implementar sistema de feedback',
      description: 'Sistema para coletar feedback dos clientes',
      assignee: 'Maria Santos',
      startDate: '2024-01-20',
      endDate: '2024-02-10',
      status: 'pending',
      priority: 'medium',
      okrId: '2',
      okrTitle: 'Melhorar satisfação do cliente',
      progress: 0
    },
    {
      id: '3',
      title: 'Otimizar processo de vendas',
      description: 'Automatizar etapas do funil de vendas',
      assignee: 'Pedro Oliveira',
      startDate: '2024-01-10',
      endDate: '2024-01-30',
      status: 'overdue',
      priority: 'high',
      progress: 80
    },
    {
      id: '4',
      title: 'Treinamento da equipe',
      description: 'Capacitação em novas ferramentas',
      assignee: 'Ana Costa',
      startDate: '2024-02-01',
      endDate: '2024-02-20',
      status: 'completed',
      priority: 'medium',
      progress: 100
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState<'all' | 'pending' | 'in-progress' | 'completed' | 'overdue'>('all');
  const [selectedAssignee, setSelectedAssignee] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const filteredTasks = tasks.filter(task => {
    const statusMatch = selectedStatus === 'all' || task.status === selectedStatus;
    const assigneeMatch = selectedAssignee === 'all' || task.assignee === selectedAssignee;
    return statusMatch && assigneeMatch;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      overdue: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors];
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

  const uniqueAssignees = Array.from(new Set(tasks.map(task => task.assignee)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Tarefas</h1>
          <p className="text-gray-600 mt-1">Acompanhe e gerencie todas as tarefas da equipe</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Toggle de visualização */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                viewMode === 'kanban' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <LayoutGrid size={16} />
              <span className="text-sm">Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <List size={16} />
              <span className="text-sm">Lista</span>
            </button>
          </div>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus size={20} />
            <span>Nova Tarefa</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Filter className="text-gray-400" size={20} />
          <span className="font-medium text-gray-700">Filtros:</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="in-progress">Em Andamento</option>
              <option value="completed">Concluída</option>
              <option value="overdue">Atrasada</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Responsável</label>
            <select
              value={selectedAssignee}
              onChange={(e) => setSelectedAssignee(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Responsáveis</option>
              {uniqueAssignees.map(assignee => (
                <option key={assignee} value={assignee}>{assignee}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Conteúdo baseado no modo de visualização */}
      {viewMode === 'kanban' ? (
        <KanbanBoard tasks={filteredTasks} />
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckSquare className="text-blue-600" size={24} />
                    <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>{task.assignee}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{task.startDate} - {task.endDate}</span>
                </div>
                
                {task.okrId && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Target size={16} />
                    <span className="truncate">{task.okrTitle}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Progresso: {task.progress}%</span>
                </div>
              </div>

              {/* Barra de Progresso */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Progresso</span>
                  <span className="text-sm text-gray-500">{task.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma tarefa encontrada</h3>
          <p className="text-gray-600">Ajuste os filtros ou crie uma nova tarefa.</p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
