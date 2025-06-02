
import React from 'react';
import { BarChart3, Users, Target, CheckSquare, TrendingUp, Award } from 'lucide-react';
import MetricCard from '../components/Dashboard/MetricCard';
import TaskSummary from '../components/Dashboard/TaskSummary';
import OKRProgress from '../components/Dashboard/OKRProgress';

const Index = () => {
  const metrics = [
    {
      title: 'Funcionários Activos',
      value: '47',
      change: '+12% vs mês anterior',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'OKRs Concluídos',
      value: '85%',
      change: '+7% vs trimestre anterior',
      changeType: 'positive' as const,
      icon: Target
    },
    {
      title: 'Tarefas Concluídas',
      value: '89',
      change: '+15% vs semana anterior',
      changeType: 'positive' as const,
      icon: CheckSquare
    },
    {
      title: 'Performance Média',
      value: '92%',
      change: '+3% vs mês anterior',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Painel de Controlo</h1>
        <p className="text-gray-600 mt-1">Visão geral do desempenho e métricas da empresa</p>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Secção de Análise */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskSummary />
        <OKRProgress />
      </div>

      {/* Destaques Recentes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Award className="text-blue-600" size={24} />
          <span>Destaques Recentes</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <h4 className="font-medium text-green-900">Meta de Vendas Alcançada</h4>
              <p className="text-sm text-green-700">A equipa de vendas ultrapassou a meta mensal em 15%</p>
            </div>
            <div className="text-green-600 font-semibold">+15%</div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div>
              <h4 className="font-medium text-blue-900">Novo Funcionário Integrado</h4>
              <p className="text-sm text-blue-700">João Silva juntou-se à equipa de desenvolvimento</p>
            </div>
            <div className="text-blue-600 font-semibold">Novo</div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div>
              <h4 className="font-medium text-purple-900">OKR Trimestral Concluído</h4>
              <p className="text-sm text-purple-700">Objectivo de melhoria da satisfação do cliente atingido</p>
            </div>
            <div className="text-purple-600 font-semibold">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
