
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Target, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const QualityIndicators = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const qualityTrends = [
    { mes: 'Jan', conformidade: 92, naoConformidades: 8, custosQualidade: 15000 },
    { mes: 'Fev', conformidade: 94, naoConformidades: 6, custosQualidade: 12000 },
    { mes: 'Mar', conformidade: 91, naoConformidades: 9, custosQualidade: 18000 },
    { mes: 'Abr', conformidade: 96, naoConformidades: 4, custosQualidade: 10000 },
    { mes: 'Mai', conformidade: 95, naoConformidades: 5, custosQualidade: 11000 },
    { mes: 'Jun', conformidade: 97, naoConformidades: 3, custosQualidade: 8000 }
  ];

  const defectsByCategory = [
    { categoria: 'Dimensional', valor: 35, cor: '#8884d8' },
    { categoria: 'Visual', valor: 25, cor: '#82ca9d' },
    { categoria: 'Funcional', valor: 20, cor: '#ffc658' },
    { categoria: 'Material', valor: 15, cor: '#ff7300' },
    { categoria: 'Outros', valor: 5, cor: '#00ff00' }
  ];

  const processPerformance = [
    { processo: 'Receção', meta: 95, atual: 92, melhorias: 3 },
    { processo: 'Produção', meta: 98, atual: 96, melhorias: 2 },
    { processo: 'Expedição', meta: 99, atual: 98, melhorias: 1 },
    { processo: 'Administrativo', meta: 92, atual: 94, melhorias: 0 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Indicadores de Qualidade</h2>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        >
          <option value="semana">Última Semana</option>
          <option value="mes">Último Mês</option>
          <option value="trimestre">Último Trimestre</option>
          <option value="ano">Último Ano</option>
        </select>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taxa de Conformidade</p>
                <p className="text-2xl font-bold">96.8%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+2.1%</span>
                </div>
              </div>
              <Target className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Não Conformidades</p>
                <p className="text-2xl font-bold">12</p>
                <div className="flex items-center mt-1">
                  <TrendingDown size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">-8</span>
                </div>
              </div>
              <Badge className="bg-red-100 text-red-800">Este mês</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Custos da Qualidade</p>
                <p className="text-2xl font-bold">€8.2K</p>
                <div className="flex items-center mt-1">
                  <TrendingDown size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">-€2.8K</span>
                </div>
              </div>
              <BarChart3 className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tempo Médio Resolução</p>
                <p className="text-2xl font-bold">4.2 dias</p>
                <div className="flex items-center mt-1">
                  <TrendingDown size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">-1.3 dias</span>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Meta: 5 dias</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Tendências */}
      <Card>
        <CardHeader>
          <CardTitle>Tendências de Qualidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="conformidade" stroke="#8884d8" name="Taxa Conformidade (%)" />
              <Line type="monotone" dataKey="naoConformidades" stroke="#82ca9d" name="Não Conformidades" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Performance por Processo */}
        <Card>
          <CardHeader>
            <CardTitle>Performance por Processo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {processPerformance.map((process, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{process.processo}</span>
                    <span className="text-sm text-gray-500">{process.atual}% / {process.meta}%</span>
                  </div>
                  <Progress value={(process.atual / process.meta) * 100} className="h-2" />
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Meta: {process.meta}%</span>
                    <span>{process.melhorias} melhorias pendentes</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Distribuição de Defeitos */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Defeitos por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={defectsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="valor"
                >
                  {defectsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.cor} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Custos da Qualidade */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução dos Custos da Qualidade</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="custosQualidade" fill="#ffc658" name="Custos da Qualidade (€)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default QualityIndicators;
