import React, { useState } from 'react';
import MetricCard from '../components/Dashboard/MetricCard';
import OKRProgress from '../components/Dashboard/OKRProgress';
import TaskSummary from '../components/Dashboard/TaskSummary';
import { Target, Users, TrendingUp, DollarSign, Activity, Clock, Filter, Calendar } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Dados para o gráfico de evolução do progresso - apenas progresso geral
  const progressData = [
    { month: 'Jan', progress: 65 },
    { month: 'Fev', progress: 72 },
    { month: 'Mar', progress: 78 },
    { month: 'Abr', progress: 75 },
    { month: 'Mai', progress: 85 },
    { month: 'Jun', progress: 88 },
    { month: 'Jul', progress: 92 },
    { month: 'Ago', progress: 89 },
    { month: 'Set', progress: 94 },
    { month: 'Out', progress: 91 },
    { month: 'Nov', progress: 96 },
    { month: 'Dez', progress: 98 }
  ];

  // Dados para o gráfico por departamento
  const allDepartmentData = [
    { department: 'Vendas', completed: 95, inProgress: 12, pending: 8 },
    { department: 'Marketing', completed: 88, inProgress: 15, pending: 5 },
    { department: 'TI', completed: 92, inProgress: 18, pending: 7 },
    { department: 'RH', completed: 85, inProgress: 10, pending: 12 },
    { department: 'Financeiro', completed: 90, inProgress: 8, pending: 6 },
    { department: 'Operações', completed: 87, inProgress: 20, pending: 10 }
  ];

  // Filtrar dados por departamento
  const filteredDepartmentData = selectedDepartment === 'all' 
    ? allDepartmentData 
    : allDepartmentData.filter(item => item.department.toLowerCase() === selectedDepartment);

  const chartConfig = {
    progress: {
      label: "Progresso Geral (%)",
      color: "#8B5CF6",
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

      {/* Filtros e Controles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="vendas">Vendas</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="ti">TI</SelectItem>
                <SelectItem value="rh">RH</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="operações">Operações</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedPeriod('2024');
              setSelectedDepartment('all');
            }}
          >
            Limpar Filtros
          </Button>
        </div>
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
        {/* Gráfico de Evolução do Progresso - Área com apenas progresso geral */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Evolução do Progresso Anual</h3>
            <div className="text-sm text-gray-500">
              Período: {selectedPeriod}
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <AreaChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="50%" stopColor="#A78BFA" stopOpacity={0.4}/>
                  <stop offset="100%" stopColor="#C4B5FD" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                domain={[0, 100]}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Area 
                type="monotone" 
                dataKey="progress" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                fill="url(#progressGradient)"
                dot={{ fill: "#8B5CF6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>

        {/* Gráfico por Departamento - Melhorado */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Performance por Departamento</h3>
            <div className="text-sm text-gray-500">
              {selectedDepartment === 'all' ? 'Todos os departamentos' : selectedDepartment.charAt(0).toUpperCase() + selectedDepartment.slice(1)}
            </div>
          </div>
          <ChartContainer config={chartConfig} className="h-[400px] w-full">
            <BarChart data={filteredDepartmentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="department" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="rect"
              />
              <Bar 
                dataKey="completed" 
                fill="hsl(142, 76%, 36%)" 
                radius={[4, 4, 0, 0]}
                name="Concluídas"
              />
              <Bar 
                dataKey="inProgress" 
                fill="hsl(217, 91%, 60%)" 
                radius={[4, 4, 0, 0]}
                name="Em Andamento"
              />
              <Bar 
                dataKey="pending" 
                fill="hsl(45, 93%, 47%)" 
                radius={[4, 4, 0, 0]}
                name="Pendentes"
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>

      {/* Progresso de OKRs e Resumo de Tarefas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OKRProgress />
        <TaskSummary />
      </div>

      {/* Atividades recentes com espaçamento reduzido */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
          <Clock className="w-5 h-5 text-gray-500" />
        </div>
        <div className="space-y-2">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-semibold ${getActivityColor(activity.type)}`}>
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
        <div className="mt-3 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todas as atividades
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
