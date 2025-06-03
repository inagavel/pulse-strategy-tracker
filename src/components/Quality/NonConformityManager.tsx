
import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const NonConformityManager = () => {
  const [nonConformities, setNonConformities] = useState([
    {
      id: 1,
      title: 'Produto fora de especificação',
      category: 'Produto',
      severity: 'Alta',
      status: 'Aberta',
      reportedBy: 'João Silva',
      reportedDate: '2024-02-01',
      department: 'Produção',
      description: 'Dimensões do produto não conformes com especificação técnica',
      actionRequired: true
    },
    {
      id: 2,
      title: 'Procedimento não seguido',
      category: 'Processo',
      severity: 'Média',
      status: 'Em Análise',
      reportedBy: 'Ana Costa',
      reportedDate: '2024-01-28',
      department: 'Qualidade',
      description: 'Procedimento de verificação não foi seguido corretamente',
      actionRequired: true
    },
    {
      id: 3,
      title: 'Documentação desatualizada',
      category: 'Documentação',
      severity: 'Baixa',
      status: 'Resolvida',
      reportedBy: 'Carlos Mendes',
      reportedDate: '2024-01-20',
      department: 'Qualidade',
      description: 'Manual de procedimentos com informação desatualizada',
      actionRequired: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const categories = ['Produto', 'Processo', 'Documentação', 'Equipamento', 'Pessoal'];
  const severities = ['Baixa', 'Média', 'Alta', 'Crítica'];
  const departments = ['Produção', 'Qualidade', 'Compras', 'Comercial', 'Administração'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberta': return 'bg-red-100 text-red-800';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800';
      case 'Em Correção': return 'bg-blue-100 text-blue-800';
      case 'Resolvida': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Crítica': return 'bg-red-500 text-white';
      case 'Alta': return 'bg-red-200 text-red-800';
      case 'Média': return 'bg-yellow-200 text-yellow-800';
      case 'Baixa': return 'bg-green-200 text-green-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Não Conformidades</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Nova Não Conformidade
        </Button>
      </div>

      {/* Métricas de Não Conformidades */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Abertas este mês</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Em análise</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Clock className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resolvidas</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tempo médio resolução</p>
                <p className="text-2xl font-bold">5 dias</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">-1 dia</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Buscar não conformidades..." 
              className="pl-10"
            />
          </div>
        </div>
        <select className="border border-gray-300 rounded-md px-3 py-2">
          <option value="">Todas as categorias</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <select className="border border-gray-300 rounded-md px-3 py-2">
          <option value="">Todas as severidades</option>
          {severities.map(severity => (
            <option key={severity} value={severity}>{severity}</option>
          ))}
        </select>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filtros
        </Button>
      </div>

      {/* Formulário Nova Não Conformidade */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Não Conformidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <Input placeholder="Ex: Produto fora de especificação" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Severidade</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {severities.map(severity => (
                    <option key={severity} value={severity}>{severity}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departamento</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-24"
                placeholder="Descrição detalhada da não conformidade..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ação Corretiva Proposta</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-20"
                placeholder="Ação proposta para correção..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button className="bg-red-900 hover:bg-red-800">Registar Não Conformidade</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Não Conformidades */}
      <div className="grid gap-4">
        {nonConformities.map((nc) => (
          <Card key={nc.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{nc.title}</h3>
                  <p className="text-sm text-gray-500">{nc.category} • {nc.department}</p>
                  <p className="text-sm text-gray-600 mt-1">Reportado por: {nc.reportedBy}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getSeverityColor(nc.severity)}>
                    {nc.severity}
                  </Badge>
                  <Badge className={getStatusColor(nc.status)}>
                    {nc.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">{nc.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Data: {nc.reportedDate}
                </div>
                {nc.actionRequired && (
                  <Badge className="bg-orange-100 text-orange-800">
                    Ação Requerida
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NonConformityManager;
