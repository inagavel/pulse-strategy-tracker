
import React, { useState } from 'react';
import { Plus, Search, Filter, Mail, Phone, User, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: 'NOVO' | 'CONTACTADO' | 'QUALIFICADO' | 'INTERESSADO' | 'PERDIDO';
  value: number;
  createdAt: string;
  lastContact: string;
  responsible: string;
}

const LeadManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [leads] = useState<Lead[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao.silva@empresa.ao',
      phone: '+244 923 456 789',
      company: 'Empresa ABC',
      source: 'Website',
      status: 'NOVO',
      value: 150000,
      createdAt: '2024-02-01',
      lastContact: '2024-02-01',
      responsible: 'Carlos Mendes'
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria.santos@tech.ao',
      phone: '+244 912 345 678',
      company: 'Tech Solutions',
      source: 'Referência',
      status: 'QUALIFICADO',
      value: 300000,
      createdAt: '2024-01-28',
      lastContact: '2024-02-02',
      responsible: 'Ana Costa'
    },
    {
      id: '3',
      name: 'Pedro Fernandes',
      email: 'pedro@comercio.ao',
      phone: '+244 934 567 890',
      company: 'Comércio Geral',
      source: 'LinkedIn',
      status: 'INTERESSADO',
      value: 220000,
      createdAt: '2024-01-25',
      lastContact: '2024-02-03',
      responsible: 'João Lopes'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'NOVO': 'bg-blue-100 text-blue-800',
      'CONTACTADO': 'bg-yellow-100 text-yellow-800',
      'QUALIFICADO': 'bg-green-100 text-green-800',
      'INTERESSADO': 'bg-purple-100 text-purple-800',
      'PERDIDO': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Leads</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <Plus size={16} />
          Novo Lead
        </Button>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Pesquisar por nome, empresa ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Todos os Status</option>
              <option value="NOVO">Novo</option>
              <option value="CONTACTADO">Contactado</option>
              <option value="QUALIFICADO">Qualificado</option>
              <option value="INTERESSADO">Interessado</option>
              <option value="PERDIDO">Perdido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Leads */}
      <div className="grid gap-4">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{lead.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Empresa</div>
                    <div className="text-sm font-medium text-gray-900">{lead.company}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-sm font-medium text-gray-900">{lead.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Telefone</div>
                    <div className="text-sm font-medium text-gray-900">{lead.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Valor Potencial</div>
                    <div className="text-sm font-medium text-gray-900">{lead.value.toLocaleString()} Kz</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Origem: {lead.source}</span>
                  <span>Responsável: {lead.responsible}</span>
                  <span>Último contacto: {lead.lastContact}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone size={14} />
                  Ligar
                </Button>
                <Button variant="outline" size="sm">
                  <Mail size={14} />
                  Email
                </Button>
                <Button size="sm" className="bg-red-900 hover:bg-red-800">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {leads.filter(l => l.status === 'NOVO').length}
          </div>
          <div className="text-sm text-blue-600">Novos Leads</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {leads.filter(l => l.status === 'CONTACTADO').length}
          </div>
          <div className="text-sm text-yellow-600">Contactados</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {leads.filter(l => l.status === 'QUALIFICADO').length}
          </div>
          <div className="text-sm text-green-600">Qualificados</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {leads.filter(l => l.status === 'INTERESSADO').length}
          </div>
          <div className="text-sm text-purple-600">Interessados</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600">
            {leads.reduce((acc, l) => acc + l.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Valor Total (Kz)</div>
        </div>
      </div>
    </div>
  );
};

export default LeadManager;
