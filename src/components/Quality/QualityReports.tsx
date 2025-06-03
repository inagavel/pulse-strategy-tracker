
import React, { useState } from 'react';
import { Download, FileText, BarChart3, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const QualityReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');

  const availableReports = [
    {
      id: 1,
      title: 'Relatório Mensal de Qualidade',
      description: 'Resumo completo dos indicadores de qualidade do mês',
      type: 'Mensal',
      lastGenerated: '2024-02-01',
      size: '2.3 MB',
      icon: BarChart3
    },
    {
      id: 2,
      title: 'Análise de Não Conformidades',
      description: 'Relatório detalhado das não conformidades registadas',
      type: 'Pontual',
      lastGenerated: '2024-01-28',
      size: '1.8 MB',
      icon: FileText
    },
    {
      id: 3,
      title: 'Dashboard de Auditorias',
      description: 'Resumo das auditorias realizadas e pendentes',
      type: 'Trimestral',
      lastGenerated: '2024-01-15',
      size: '3.1 MB',
      icon: PieChart
    },
    {
      id: 4,
      title: 'Custos da Qualidade',
      description: 'Análise financeira dos custos relacionados com qualidade',
      type: 'Mensal',
      lastGenerated: '2024-02-01',
      size: '1.5 MB',
      icon: BarChart3
    }
  ];

  const qualityMetrics = [
    { metric: 'Taxa de Conformidade Geral', value: '96.8%', target: '95%', status: 'success' },
    { metric: 'Não Conformidades Abertas', value: '12', target: '< 15', status: 'success' },
    { metric: 'Tempo Médio de Resolução', value: '4.2 dias', target: '< 5 dias', status: 'success' },
    { metric: 'Custo da Qualidade', value: '€8,200', target: '< €10,000', status: 'success' },
    { metric: 'Auditorias em Atraso', value: '2', target: '0', status: 'warning' },
    { metric: 'Processos em Revisão', value: '3', target: '< 5', status: 'success' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'Dentro da Meta';
      case 'warning': return 'Atenção';
      case 'error': return 'Fora da Meta';
      default: return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Relatórios de Qualidade</h2>
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
            Gerar Relatório Personalizado
          </Button>
        </div>
      </div>

      {/* Resumo Executivo */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo Executivo - Indicadores de Qualidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {qualityMetrics.map((metric, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{metric.metric}</h4>
                  <Badge className={getStatusColor(metric.status)}>
                    {getStatusText(metric.status)}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-gray-500">Meta: {metric.target}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Relatórios Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {availableReports.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{report.title}</h3>
                      <p className="text-sm text-gray-500">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-400">Tipo: {report.type}</span>
                        <span className="text-xs text-gray-400">Última geração: {report.lastGenerated}</span>
                        <span className="text-xs text-gray-400">Tamanho: {report.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-1" />
                      Visualizar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download size={16} className="mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 size={24} className="mb-2" />
              <span>Exportar KPIs</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <PieChart size={24} className="mb-2" />
              <span>Análise de Tendências</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText size={24} className="mb-2" />
              <span>Relatório de Auditorias</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download size={24} className="mb-2" />
              <span>Exportar Dados</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico de Relatórios */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Relatórios Gerados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Relatório</th>
                  <th className="text-left py-2">Tipo</th>
                  <th className="text-left py-2">Data de Geração</th>
                  <th className="text-left py-2">Tamanho</th>
                  <th className="text-right py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {availableReports.map((report) => (
                  <tr key={report.id} className="border-b">
                    <td className="py-2">{report.title}</td>
                    <td className="py-2">
                      <Badge variant="outline">{report.type}</Badge>
                    </td>
                    <td className="py-2">{report.lastGenerated}</td>
                    <td className="py-2">{report.size}</td>
                    <td className="py-2 text-right">
                      <Button variant="ghost" size="sm">
                        <Download size={14} />
                      </Button>
                    </td>
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

export default QualityReports;
