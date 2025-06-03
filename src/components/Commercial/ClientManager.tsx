
import React, { useState } from 'react';
import { Plus, Search, Building, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  industry: string;
  status: 'ATIVO' | 'INATIVO' | 'POTENCIAL';
  totalValue: number;
  lastContact: string;
  responsible: string;
  acquisitionDate: string;
}

const ClientManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [clients] = useState<Client[]>([
    {
      id: '1',
      name: 'João Silva',
      company: 'Empresa ABC Lda',
      email: 'joao.silva@empresaabc.ao',
      phone: '+244 923 456 789',
      address: 'Rua da Independência, 123, Luanda',
      industry: 'Tecnologia',
      status: 'ATIVO',
      totalValue: 850000,
      lastContact: '2024-02-03',
      responsible: 'Carlos Mendes',
      acquisitionDate: '2023-08-15'
    },
    {
      id: '2',
      name: 'Maria Santos',
      company: 'Tech Solutions Angola',
      email: 'maria.santos@techsolutions.ao',
      phone: '+244 912 345 678',
      address: 'Avenida Talatona, 456, Luanda',
      industry: 'Consultoria',
      status: 'ATIVO',
      totalValue: 1200000,
      lastContact: '2024-02-02',
      responsible: 'Ana Costa',
      acquisitionDate: '2023-12-10'
    },
    {
      id: '3',
      name: 'Pedro Fernandes',
      company: 'Comércio Geral SA',
      email: 'pedro@comerciogeral.ao',
      phone: '+244 934 567 890',
      address: 'Rua do Comércio, 789, Benguela',
      industry: 'Comércio',
      status: 'POTENCIAL',
      totalValue: 0,
      lastContact: '2024-01-28',
      responsible: 'João Lopes',
      acquisitionDate: ''
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'ATIVO': 'bg-green-100 text-green-800',
      'INATIVO': 'bg-red-100 text-red-800',
      'POTENCIAL': 'bg-yellow-100 text-yellow-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Clientes</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <Plus size={16} />
          Novo Cliente
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
              <option value="ATIVO">Ativo</option>
              <option value="INATIVO">Inativo</option>
              <option value="POTENCIAL">Potencial</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <div key={client.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Building size={20} className="text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900">{client.company}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(client.status)}`}>
                    {client.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-500">Contacto Principal</div>
                    <div className="text-sm font-medium text-gray-900">{client.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="text-sm font-medium text-gray-900">{client.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Telefone</div>
                    <div className="text-sm font-medium text-gray-900">{client.phone}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Setor</div>
                    <div className="text-sm font-medium text-gray-900">{client.industry}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-sm text-gray-500">Endereço</div>
                  <div className="text-sm font-medium text-gray-900">{client.address}</div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <DollarSign size={14} />
                    <span>Valor Total: {client.totalValue.toLocaleString()} Kz</span>
                  </div>
                  <span>Responsável: {client.responsible}</span>
                  <span>Último contacto: {client.lastContact}</span>
                  {client.acquisitionDate && (
                    <span>Cliente desde: {client.acquisitionDate}</span>
                  )}
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
                  Ver Histórico
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {clients.filter(c => c.status === 'ATIVO').length}
          </div>
          <div className="text-sm text-green-600">Clientes Ativos</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {clients.filter(c => c.status === 'POTENCIAL').length}
          </div>
          <div className="text-sm text-yellow-600">Clientes Potenciais</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {clients.filter(c => c.status === 'ATIVO').reduce((acc, c) => acc + c.totalValue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Receita Total (Kz)</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {clients.filter(c => c.status === 'ATIVO').length > 0 
              ? Math.round(clients.filter(c => c.status === 'ATIVO').reduce((acc, c) => acc + c.totalValue, 0) / clients.filter(c => c.status === 'ATIVO').length).toLocaleString()
              : 0
            }
          </div>
          <div className="text-sm text-purple-600">Valor Médio (Kz)</div>
        </div>
      </div>
    </div>
  );
};

export default ClientManager;
