
import React from 'react';
import MetricCard from '../components/Dashboard/MetricCard';
import OKRProgress from '../components/Dashboard/OKRProgress';
import TaskSummary from '../components/Dashboard/TaskSummary';
import { Target, Users, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Visão geral do desempenho da empresa</p>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="OKRs Atingidos"
          value="85%"
          change="+12% vs mês anterior"
          changeType="positive"
          icon={Target}
        />
        <MetricCard
          title="Colaboradores Ativos"
          value="47"
          change="+3 novos este mês"
          changeType="positive"
          icon={Users}
        />
        <MetricCard
          title="Performance Geral"
          value="92%"
          change="+5% vs trimestre anterior"
          changeType="positive"
          icon={TrendingUp}
        />
        <MetricCard
          title="ROI Projetos"
          value="€125K"
          change="+18% vs período anterior"
          changeType="positive"
          icon={DollarSign}
        />
      </div>

      {/* Gráficos e resumos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OKRProgress />
        <TaskSummary />
      </div>

      {/* Atividades recentes */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividades Recentes</h3>
        <div className="space-y-3">
          {[
            'João Silva completou o OKR "Aumentar vendas Q1"',
            'Maria Santos criou nova tarefa no projeto Alpha',
            'Equipe de Marketing atingiu 95% do objetivo mensal',
            'Pedro Oliveira atualizou análise SWOT do produto',
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
