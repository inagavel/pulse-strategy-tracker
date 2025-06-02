
import React from 'react';
import { BarChart3, Users, Target, CheckSquare, TrendingUp, Award } from 'lucide-react';

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
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">PAINEL DE CONTROLO</h1>
        <p className="text-gray-600 mt-1 text-sm">Visão geral do desempenho e métricas da empresa</p>
      </div>

      <div className="px-6 py-6">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                    <p className="text-xs text-green-600 mt-1">{metric.change}</p>
                  </div>
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Destaques Recentes */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
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
    </div>
  );
};

export default Index;
