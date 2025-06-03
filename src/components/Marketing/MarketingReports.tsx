
import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, Eye, Users, Target, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const MarketingReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const campaignPerformance = [
    { name: 'Email Marketing', impressoes: 45000, cliques: 1200, conversoes: 85, custo: 3200 },
    { name: 'Google Ads', impressoes: 120000, cliques: 3500, conversoes: 280, custo: 4500 },
    { name: 'Facebook Ads', impressoes: 80000, cliques: 2100, conversoes: 150, custo: 2800 },
    { name: 'LinkedIn Ads', impressoes: 25000, cliques: 800, conversoes: 65, custo: 1500 }
  ];

  const monthlyTrends = [
    { mes: 'Jan', leads: 120, conversoes: 35, receita: 15000 },
    { mes: 'Fev', leads: 145, conversoes: 42, receita: 18500 },
    { mes: 'Mar', leads: 160, conversoes: 48, receita: 22000 },
    { mes: 'Abr', leads: 135, conversoes: 38, receita: 17500 },
    { mes: 'Mai', leads: 180, conversoes: 55, receita: 26000 },
    { mes: 'Jun', leads: 195, conversoes: 62, receita: 29500 }
  ];

  const channelDistribution = [
    { name: 'Orgânico', value: 35, color: '#8884d8' },
    { name: 'Pago', value: 25, color: '#82ca9d' },
    { name: 'Social Media', value: 20, color: '#ffc658' },
    { name: 'Email', value: 15, color: '#ff7300' },
    { name: 'Direto', value: 5, color: '#00ff00' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Relatórios de Marketing</h2>
        <div className="flex space-x-2">
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
          <Button className="bg-red-900 hover:bg-red-800">
            <Download size={16} className="mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total de Leads</p>
                <p className="text-2xl font-bold">1,245</p>
                <div className="flex items-center mt-1">
                  <TrendingUp size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+12.5%</span>
                </div>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taxa de Conversão</p>
                <p className="text-2xl font-bold">3.8%</p>
                <div className="flex items-center mt-1">
                  <TrendingUp size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">+0.5%</span>
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
                <p className="text-sm text-gray-500">ROI de Marketing</p>
                <p className="text-2xl font-bold">4.2x</p>
                <div className="flex items-center mt-1">
                  <TrendingDown size={12} className="text-red-500 mr-1" />
                  <span className="text-xs text-red-500">-0.3x</span>
                </div>
              </div>
              <DollarSign className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Custo por Lead</p>
                <p className="text-2xl font-bold">€25</p>
                <div className="flex items-center mt-1">
                  <TrendingDown size={12} className="text-green-500 mr-1" />
                  <span className="text-xs text-green-500">-€3</span>
                </div>
              </div>
              <Eye className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance das Campanhas */}
      <Card>
        <CardHeader>
          <CardTitle>Performance das Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="impressoes" fill="#8884d8" name="Impressões" />
              <Bar dataKey="cliques" fill="#82ca9d" name="Cliques" />
              <Bar dataKey="conversoes" fill="#ffc658" name="Conversões" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Tendências Mensais */}
        <Card>
          <CardHeader>
            <CardTitle>Tendências Mensais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#8884d8" name="Leads" />
                <Line type="monotone" dataKey="conversoes" stroke="#82ca9d" name="Conversões" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribuição por Canal */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={channelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Campanhas Detalhada */}
      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada das Campanhas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campanha</th>
                  <th className="text-right py-2">Impressões</th>
                  <th className="text-right py-2">Cliques</th>
                  <th className="text-right py-2">CTR</th>
                  <th className="text-right py-2">Conversões</th>
                  <th className="text-right py-2">Taxa Conversão</th>
                  <th className="text-right py-2">Custo</th>
                  <th className="text-right py-2">CPC</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{campaign.name}</td>
                    <td className="text-right py-2">{campaign.impressoes.toLocaleString()}</td>
                    <td className="text-right py-2">{campaign.cliques.toLocaleString()}</td>
                    <td className="text-right py-2">{((campaign.cliques / campaign.impressoes) * 100).toFixed(2)}%</td>
                    <td className="text-right py-2">{campaign.conversoes}</td>
                    <td className="text-right py-2">{((campaign.conversoes / campaign.cliques) * 100).toFixed(2)}%</td>
                    <td className="text-right py-2">€{campaign.custo.toLocaleString()}</td>
                    <td className="text-right py-2">€{(campaign.custo / campaign.cliques).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketingReports;
