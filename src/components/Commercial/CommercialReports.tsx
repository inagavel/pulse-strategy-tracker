
import React, { useState } from 'react';
import { BarChart3, Download, Filter, Calendar, TrendingUp, DollarSign, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommercialReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes-atual');
  const [selectedReport, setSelectedReport] = useState('vendas');

  // Dados simulados para os relatórios
  const salesData = {
    totalRevenue: 3450000,
    totalSales: 28,
    newClients: 12,
    conversionRate: 24.5,
    averageTicket: 123214,
    pipelineValue: 2800000
  };

  const monthlyData = [
    { month: 'Jan', revenue: 2800000, sales: 22, clients: 8 },
    { month: 'Fev', revenue: 3450000, sales: 28, clients: 12 },
    { month: 'Mar', revenue: 0, sales: 0, clients: 0 }
  ];

  const teamPerformance = [
    { name: 'Carlos Mendes', revenue: 1200000, sales: 12, conversionRate: 28.5 },
    { name: 'Ana Costa', revenue: 1450000, sales: 10, conversionRate: 31.2 },
    { name: 'João Lopes', revenue: 800000, sales: 6, conversionRate: 18.9 }
  ];

  const productPerformance = [
    { product: 'Sistema de Gestão', revenue: 1800000, sales: 15, percentage: 52.2 },
    { product: 'Consultoria', revenue: 950000, sales: 8, percentage: 27.5 },
    { product: 'Suporte Técnico', revenue: 700000, sales: 5, percentage: 20.3 }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Relatórios Comerciais</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter size={16} />
            Filtros
          </Button>
          <Button className="bg-red-900 hover:bg-red-800">
            <Download size={16} />
            Exportar
          </Button>
        </div>
      </div>

      {/* Seletores de Período e Tipo */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="mes-atual">Mês Atual</option>
              <option value="mes-anterior">Mês Anterior</option>
              <option value="trimestre">Trimestre</option>
              <option value="ano">Ano</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Tipo de Relatório</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="vendas">Vendas</option>
              <option value="pipeline">Pipeline</option>
              <option value="clientes">Clientes</option>
              <option value="performance">Performance</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs Principais */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign size={16} className="text-green-600" />
            <span className="text-sm text-green-600">Receita Total</span>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {salesData.totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">Kz</div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 size={16} className="text-blue-600" />
            <span className="text-sm text-blue-600">Total de Vendas</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {salesData.totalSales}
          </div>
          <div className="text-xs text-blue-600">vendas</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={16} className="text-purple-600" />
            <span className="text-sm text-purple-600">Novos Clientes</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            {salesData.newClients}
          </div>
          <div className="text-xs text-purple-600">clientes</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target size={16} className="text-orange-600" />
            <span className="text-sm text-orange-600">Taxa Conversão</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">
            {salesData.conversionRate}%
          </div>
          <div className="text-xs text-orange-600">leads para vendas</div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={16} className="text-yellow-600" />
            <span className="text-sm text-yellow-600">Ticket Médio</span>
          </div>
          <div className="text-2xl font-bold text-yellow-600">
            {salesData.averageTicket.toLocaleString()}
          </div>
          <div className="text-xs text-yellow-600">Kz</div>
        </div>

        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <BarChart3 size={16} className="text-indigo-600" />
            <span className="text-sm text-indigo-600">Pipeline</span>
          </div>
          <div className="text-2xl font-bold text-indigo-600">
            {salesData.pipelineValue.toLocaleString()}
          </div>
          <div className="text-xs text-indigo-600">Kz</div>
        </div>
      </div>

      {/* Gráfico de Evolução Mensal */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Evolução Mensal</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Mês</th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">Receita (Kz)</th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">Vendas</th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">Novos Clientes</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">{data.month}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">{data.revenue.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">{data.sales}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">{data.clients}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance da Equipa */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance da Equipa</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-700">Vendedor</th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">Receita (Kz)</th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">Vendas</th>
                <th className="text-right py-2 text-sm font-medium text-gray-700">Taxa Conversão (%)</th>
              </tr>
            </thead>
            <tbody>
              {teamPerformance.map((member, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm text-gray-900">{member.name}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">{member.revenue.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">{member.sales}</td>
                  <td className="py-3 text-sm text-gray-900 text-right">{member.conversionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance por Produto */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance por Produto/Serviço</h3>
        <div className="space-y-4">
          {productPerformance.map((product, index) => (
            <div key={index} className="border border-gray-100 rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">{product.product}</h4>
                <span className="text-sm text-gray-600">{product.percentage}% da receita</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Receita</div>
                  <div className="text-sm font-medium text-gray-900">{product.revenue.toLocaleString()} Kz</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vendas</div>
                  <div className="text-sm font-medium text-gray-900">{product.sales}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Participação</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-red-900 h-2 rounded-full"
                      style={{ width: `${product.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommercialReports;
