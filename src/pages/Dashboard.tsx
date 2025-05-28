
import React from 'react';
import MetricCard from '../components/Dashboard/MetricCard';
import OKRProgress from '../components/Dashboard/OKRProgress';
import TaskSummary from '../components/Dashboard/TaskSummary';
import { Target, Users, TrendingUp, DollarSign, Activity, Clock } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const Dashboard = () => {
  // Dados para o gráfico de evolução do progresso
  const progressData = [
    { month: 'Jan', progress: 65, okrs: 12, tasks: 85 },
    { month: 'Fev', progress: 72, okrs: 15, tasks: 92 },
    { month: 'Mar', progress: 78, okrs: 18, tasks: 88 },
    { month: 'Abr', progress: 75, okrs: 16, tasks: 95 },
    { month: 'Mai', progress: 85, okrs: 22, tasks: 98 },
    { month: 'Jun', progress: 88, okrs: 25, tasks: 90 },
    { month: 'Jul', progress: 92, okrs: 28, tasks: 94 },
    { month: 'Ago', progress: 89, okrs: 26, tasks: 96 },
    { month: 'Set', progress: 94, okrs: 30, tasks: 98 },
    { month: 'Out', progress: 91, okrs: 28, tasks: 92 },
    { month: 'Nov', progress: 96, okrs: 32, tasks: 99 },
    { month: 'Dez', progress: 98, okrs: 35, tasks: 97 }
  ];

  // Dados para o gráfico por departamento
  const departmentData = [
    { department: 'Vendas', completed: 95, inProgress: 12, pending: 8 },
    { department: 'Marketing', completed: 88, inProgress: 15, pending: 5 },
    { department: 'TI', completed: 92, inProgress: 18, pending: 7 },
    { department: 'RH', completed: 85, inProgress: 10, pending: 12 },
    { department: 'Financeiro', completed: 90, inProgress: 8, pending: 6 },
    { department: 'Operações', completed: 87, inProgress: 20, pending: 10 }
  ];

  const chartConfig = {
    progress: {
      label: "Progresso Geral",
      color: "hsl(var(--chart-1))",
    },
    okrs: {
      label: "OKRs Completados",
      color: "hsl(var(--chart-2))",
    },
    tasks: {
      label: "Tarefas Completadas",
      color: "hsl(var(--chart-3))",
    },
    completed: {
      label: "Concluídas",
      color: "hsl(142, 76%, 36%)",
    },
    inProgress: {
      label: "Em Andamento",
      color: "hsl(217, 91%, 60%)",
    },
    pending: {
      label: "Pendentes",
      color: "hsl(45, 93%, 47%)",
    },
  };

  // Atividades recentes modernizadas
  const recentActivities = [
    {
      id: 1,
      user: 'João Silva',
      action: 'completou o OKR',
      target: 'Aumentar vendas Q1',
      time: '2 min atrás',
      type: 'okr',
      avatar: 'JS'
    },
    {
      id: 2,
      user: 'Maria Santos',
      action: 'criou nova tarefa no projeto',
      target: 'Alpha',
      time: '15 min atrás',
      type: 'task',
      avatar: 'MS'
    },
    {
      id: 3,
      user: 'Equipe de Marketing',
      action: 'atingiu',
      target: '95% do objetivo mensal',
      time: '1 hora atrás',
      type: 'goal',
      avatar: 'EM'
    },
    {
      id: 4,
      user: 'Pedro Oliveira',
      action: 'atualizou análise SWOT do',
      target: 'produto',
      time: '2 horas atrás',
      type: 'analysis',
      avatar: 'PO'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'okr': return <Target className="w-4 h-4 text-green-600" />;
      case 'task': return <Activity className="w-4 h-4 text-blue-600" />;
      case 'goal': return <TrendingUp className="w-4 h-4 text-purple-600" />;
      case 'analysis': return <Users className="w-4 h-4 text-orange-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'okr': return 'bg-green-100 border-green-200';
      case 'task': return 'bg-blue-100 border-blue-200';
      case 'goal': return 'bg-purple-100 border-purple-200';
      case 'analysis': return 'bg-orange-100 border-orange-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

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

      {/* Gráficos de evolução */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Evolução do Progresso */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Evolução do Progresso Anual</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="progress" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="okrs" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="tasks" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ChartContainer>
        </div>

        {/* Gráfico por Departamento */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance por Departamento</h3>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="completed" fill="hsl(142, 76%, 36%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="inProgress" fill="hsl(217, 91%, 60%)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(45, 93%, 47%)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Progresso de OKRs e Resumo de Tarefas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OKRProgress />
        <TaskSummary />
      </div>

      {/* Atividades recentes modernizadas */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
          <Clock className="w-5 h-5 text-gray-500" />
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${getActivityColor(activity.type)}`}>
                {activity.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {getActivityIcon(activity.type)}
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span>
                    {' '}{activity.action}{' '}
                    <span className="font-medium text-blue-600">{activity.target}</span>
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todas as atividades
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
