
import React, { useState } from 'react';
import { Plus, Search, Filter, Eye, Edit, Calendar, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const AuditManager = () => {
  const [audits, setAudits] = useState([
    {
      id: 1,
      title: 'Auditoria Interna ISO 9001',
      type: 'Interna',
      status: 'Agendada',
      auditor: 'Carlos Mendes',
      department: 'Produção',
      scheduledDate: '2024-02-15',
      duration: '2 dias',
      findings: 0
    },
    {
      id: 2,
      title: 'Auditoria Externa Certificação',
      type: 'Externa',
      status: 'Em Andamento',
      auditor: 'SGS Portugal',
      department: 'Geral',
      scheduledDate: '2024-02-10',
      duration: '3 dias',
      findings: 2
    },
    {
      id: 3,
      title: 'Auditoria de Processo - Compras',
      type: 'Interna',
      status: 'Concluída',
      auditor: 'Ana Santos',
      department: 'Compras',
      scheduledDate: '2024-01-25',
      duration: '1 dia',
      findings: 1
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const auditTypes = ['Interna', 'Externa', 'Fornecedor', 'Processo'];
  const departments = ['Produção', 'Qualidade', 'Compras', 'Comercial', 'Geral'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Agendada': return 'bg-blue-100 text-blue-800';
      case 'Em Andamento': return 'bg-yellow-100 text-yellow-800';
      case 'Concluída': return 'bg-green-100 text-green-800';
      case 'Cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Auditorias</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Nova Auditoria
        </Button>
      </div>

      {/* Métricas de Auditorias */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Auditorias este ano</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Calendar className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Em andamento</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Ativo</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total de descobertas</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <FileText className="text-orange-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taxa de conformidade</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <Badge className="bg-green-100 text-green-800">+2%</Badge>
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
              placeholder="Buscar auditorias..." 
              className="pl-10"
            />
          </div>
        </div>
        <select className="border border-gray-300 rounded-md px-3 py-2">
          <option value="">Todos os tipos</option>
          {auditTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filtros
        </Button>
      </div>

      {/* Formulário Nova Auditoria */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Auditoria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Auditoria</label>
                <Input placeholder="Ex: Auditoria ISO 9001" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {auditTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Auditor Responsável</label>
                <Input placeholder="Nome do auditor" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Agendada</label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duração</label>
                <Input placeholder="Ex: 2 dias" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Objetivo</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-24"
                placeholder="Objetivo da auditoria..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button className="bg-red-900 hover:bg-red-800">Agendar Auditoria</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Auditorias */}
      <div className="grid gap-4">
        {audits.map((audit) => (
          <Card key={audit.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{audit.title}</h3>
                  <p className="text-sm text-gray-500">{audit.type} • {audit.department}</p>
                  <p className="text-sm text-gray-600 mt-1">Auditor: {audit.auditor}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(audit.status)}>
                    {audit.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">{audit.scheduledDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Duração</p>
                    <p className="font-medium">{audit.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Descobertas</p>
                    <p className="font-medium">{audit.findings}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AuditManager;
