
import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const QualityManager = () => {
  const [processes, setProcesses] = useState([
    {
      id: 1,
      name: 'Controlo de Entrada de Materiais',
      category: 'Receção',
      status: 'Ativo',
      lastReview: '2024-01-15',
      nextReview: '2024-04-15',
      compliance: 95,
      responsible: 'Ana Silva'
    },
    {
      id: 2,
      name: 'Processo de Produção',
      category: 'Produção',
      status: 'Em Revisão',
      lastReview: '2024-01-10',
      nextReview: '2024-04-10',
      compliance: 88,
      responsible: 'João Santos'
    },
    {
      id: 3,
      name: 'Controlo Final de Qualidade',
      category: 'Expedição',
      status: 'Ativo',
      lastReview: '2024-01-20',
      nextReview: '2024-04-20',
      compliance: 92,
      responsible: 'Maria Costa'
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const categories = ['Receção', 'Produção', 'Expedição', 'Administrativo', 'Comercial'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-800';
      case 'Em Revisão': return 'bg-yellow-100 text-yellow-800';
      case 'Inativo': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceColor = (compliance: number) => {
    if (compliance >= 95) return 'text-green-600';
    if (compliance >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão da Qualidade</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Novo Processo
        </Button>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Processos Ativos</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taxa de Conformidade</p>
                <p className="text-2xl font-bold">92%</p>
              </div>
              <Badge className="bg-green-100 text-green-800">+2%</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Processos em Revisão</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <XCircle className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Próximas Revisões</p>
                <p className="text-2xl font-bold">7</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Este mês</Badge>
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
              placeholder="Buscar processos..." 
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
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filtros
        </Button>
      </div>

      {/* Formulário Novo Processo */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Processo de Qualidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Processo</label>
                <Input placeholder="Ex: Controlo de Qualidade" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsável</label>
                <Input placeholder="Nome do responsável" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Próxima Revisão</label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-24"
                placeholder="Descrição do processo..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button className="bg-red-900 hover:bg-red-800">Criar Processo</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Processos */}
      <div className="grid gap-4">
        {processes.map((process) => (
          <Card key={process.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{process.name}</h3>
                  <p className="text-sm text-gray-500">{process.category}</p>
                  <p className="text-sm text-gray-600 mt-1">Responsável: {process.responsible}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(process.status)}>
                    {process.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Última Revisão</p>
                  <p className="font-medium">{process.lastReview}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Próxima Revisão</p>
                  <p className="font-medium">{process.nextReview}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conformidade</p>
                  <p className={`text-lg font-bold ${getComplianceColor(process.compliance)}`}>
                    {process.compliance}%
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Nível de Conformidade</span>
                  <span>{process.compliance}%</span>
                </div>
                <Progress value={process.compliance} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QualityManager;
