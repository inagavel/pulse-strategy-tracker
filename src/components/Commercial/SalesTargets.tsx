
import React, { useState } from 'react';
import { Target, TrendingUp, Calendar, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SalesTarget {
  id: string;
  title: string;
  period: string;
  target: number;
  achieved: number;
  responsible: string;
  deadline: string;
  status: 'EM_ANDAMENTO' | 'CONCLUÍDO' | 'ATRASADO';
  category: 'RECEITA' | 'VENDAS' | 'CLIENTES' | 'LEADS';
}

const SalesTargets = () => {
  const [targets] = useState<SalesTarget[]>([
    {
      id: '1',
      title: 'Receita Mensal - Fevereiro',
      period: 'Fevereiro 2024',
      target: 2000000,
      achieved: 1350000,
      responsible: 'Equipa Comercial',
      deadline: '2024-02-29',
      status: 'EM_ANDAMENTO',
      category: 'RECEITA'
    },
    {
      id: '2',
      title: 'Novos Clientes - Q1',
      period: 'Q1 2024',
      target: 15,
      achieved: 8,
      responsible: 'Carlos Mendes',
      deadline: '2024-03-31',
      status: 'EM_ANDAMENTO',
      category: 'CLIENTES'
    },
    {
      id: '3',
      title: 'Leads Qualificados - Janeiro',
      period: 'Janeiro 2024',
      target: 50,
      achieved: 48,
      responsible: 'Ana Costa',
      deadline: '2024-01-31',
      status: 'CONCLUÍDO',
      category: 'LEADS'
    },
    {
      id: '4',
      title: 'Vendas Fechadas - Janeiro',
      period: 'Janeiro 2024',
      target: 12,
      achieved: 10,
      responsible: 'João Lopes',
      deadline: '2024-01-31',
      status: 'ATRASADO',
      category: 'VENDAS'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'EM_ANDAMENTO': 'bg-yellow-100 text-yellow-800',
      'CONCLUÍDO': 'bg-green-100 text-green-800',
      'ATRASADO': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'RECEITA': 'bg-green-100 text-green-800',
      'VENDAS': 'bg-blue-100 text-blue-800',
      'CLIENTES': 'bg-purple-100 text-purple-800',
      'LEADS': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const calculateProgress = (achieved: number, target: number) => {
    return Math.min((achieved / target) * 100, 100);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-yellow-500';
    if (progress >= 50) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Metas Comerciais</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <Plus size={16} />
          Nova Meta
        </Button>
      </div>

      {/* Resumo das Metas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {targets.length}
          </div>
          <div className="text-sm text-blue-600">Total de Metas</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {targets.filter(t => t.status === 'CONCLUÍDO').length}
          </div>
          <div className="text-sm text-green-600">Metas Concluídas</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {targets.filter(t => t.status === 'EM_ANDAMENTO').length}
          </div>
          <div className="text-sm text-yellow-600">Em Andamento</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {targets.filter(t => t.status === 'ATRASADO').length}
          </div>
          <div className="text-sm text-red-600">Atrasadas</div>
        </div>
      </div>

      {/* Lista de Metas */}
      <div className="grid gap-6">
        {targets.map((target) => {
          const progress = calculateProgress(target.achieved, target.target);
          
          return (
            <div key={target.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Target size={20} className="text-red-900" />
                    <h3 className="text-lg font-medium text-gray-900">{target.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(target.status)}`}>
                      {target.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(target.category)}`}>
                      {target.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Período</div>
                      <div className="text-sm font-medium text-gray-900">{target.period}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Responsável</div>
                      <div className="text-sm font-medium text-gray-900">{target.responsible}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Prazo</div>
                      <div className="text-sm font-medium text-gray-900">{target.deadline}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Progresso</div>
                      <div className="text-sm font-medium text-gray-900">{progress.toFixed(1)}%</div>
                    </div>
                  </div>

                  {/* Barra de Progresso */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        {target.category === 'RECEITA' 
                          ? `${target.achieved.toLocaleString()} / ${target.target.toLocaleString()} Kz`
                          : `${target.achieved} / ${target.target}`
                        }
                      </span>
                      <span className="text-sm font-medium text-gray-900">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="text-sm text-gray-600">
                    {target.category === 'RECEITA' && (
                      <span>Falta: {(target.target - target.achieved).toLocaleString()} Kz para atingir a meta</span>
                    )}
                    {target.category !== 'RECEITA' && (
                      <span>Falta: {target.target - target.achieved} unidades para atingir a meta</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Calendar size={14} />
                    Histórico
                  </Button>
                  <Button size="sm" className="bg-red-900 hover:bg-red-800">
                    Atualizar
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico de Performance (Placeholder) */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance das Metas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Metas por Categoria</h4>
            <div className="space-y-2">
              {['RECEITA', 'VENDAS', 'CLIENTES', 'LEADS'].map((category) => {
                const categoryTargets = targets.filter(t => t.category === category);
                const completedTargets = categoryTargets.filter(t => t.status === 'CONCLUÍDO');
                
                return (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{category}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {completedTargets.length}/{categoryTargets.length}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">Taxa de Sucesso por Responsável</h4>
            <div className="space-y-2">
              {Array.from(new Set(targets.map(t => t.responsible))).map((responsible) => {
                const responsibleTargets = targets.filter(t => t.responsible === responsible);
                const completedTargets = responsibleTargets.filter(t => t.status === 'CONCLUÍDO');
                const successRate = responsibleTargets.length > 0 
                  ? (completedTargets.length / responsibleTargets.length * 100).toFixed(1)
                  : '0';
                
                return (
                  <div key={responsible} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{responsible}</span>
                    <span className="text-sm font-medium text-gray-900">{successRate}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTargets;
