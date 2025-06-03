
import React, { useState } from 'react';
import { User, CheckCircle, Clock, FileText, BookOpen, Users, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Integration {
  id: string;
  employeeName: string;
  position: string;
  department: string;
  startDate: string;
  mentor: string;
  status: 'AGENDADO' | 'EM_ANDAMENTO' | 'CONCLUÍDO' | 'ATRASADO';
  progress: number;
  tasks: IntegrationTask[];
  documents: string[];
}

interface IntegrationTask {
  id: string;
  title: string;
  description: string;
  category: 'DOCUMENTAÇÃO' | 'FORMAÇÃO' | 'EQUIPAMENTOS' | 'APRESENTAÇÕES' | 'SISTEMAS';
  status: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUÍDO';
  dueDate: string;
  responsible: string;
}

const IntegrationManager = () => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const [integrations] = useState<Integration[]>([
    {
      id: '1',
      employeeName: 'Miguel Santos',
      position: 'Gestor de Vendas Sénior',
      department: 'Vendas',
      startDate: '2024-02-01',
      mentor: 'João Silva',
      status: 'EM_ANDAMENTO',
      progress: 65,
      tasks: [
        {
          id: '1',
          title: 'Assinatura de Documentos',
          description: 'Assinatura do contrato e documentos de RH',
          category: 'DOCUMENTAÇÃO',
          status: 'CONCLUÍDO',
          dueDate: '2024-02-01',
          responsible: 'RH'
        },
        {
          id: '2',
          title: 'Formação em Sistemas',
          description: 'Formação nos sistemas internos da empresa',
          category: 'FORMAÇÃO',
          status: 'EM_ANDAMENTO',
          dueDate: '2024-02-03',
          responsible: 'TI'
        },
        {
          id: '3',
          title: 'Entrega de Equipamentos',
          description: 'Computador, telemóvel e outros equipamentos',
          category: 'EQUIPAMENTOS',
          status: 'CONCLUÍDO',
          dueDate: '2024-02-01',
          responsible: 'TI'
        }
      ],
      documents: ['contrato_trabalho.pdf', 'manual_colaborador.pdf', 'politicas_empresa.pdf']
    },
    {
      id: '2',
      employeeName: 'Ana Fernandes',
      position: 'Especialista em Marketing Digital',
      department: 'Marketing',
      startDate: '2024-02-05',
      mentor: 'Maria Costa',
      status: 'AGENDADO',
      progress: 0,
      tasks: [
        {
          id: '4',
          title: 'Preparação do Espaço de Trabalho',
          description: 'Configuração da secretária e equipamentos',
          category: 'EQUIPAMENTOS',
          status: 'PENDENTE',
          dueDate: '2024-02-05',
          responsible: 'Administração'
        },
        {
          id: '5',
          title: 'Apresentação à Equipa',
          description: 'Apresentação aos colegas do departamento',
          category: 'APRESENTAÇÕES',
          status: 'PENDENTE',
          dueDate: '2024-02-05',
          responsible: 'Gestor Direto'
        }
      ],
      documents: ['manual_colaborador.pdf', 'guia_marketing.pdf']
    },
    {
      id: '3',
      employeeName: 'Carlos Mendes',
      position: 'Gestor de Vendas Sénior',
      department: 'Vendas',
      startDate: '2024-01-15',
      mentor: 'Pedro Lopes',
      status: 'CONCLUÍDO',
      progress: 100,
      tasks: [
        {
          id: '6',
          title: 'Integração Completa',
          description: 'Todas as tarefas de integração concluídas',
          category: 'APRESENTAÇÕES',
          status: 'CONCLUÍDO',
          dueDate: '2024-01-30',
          responsible: 'RH'
        }
      ],
      documents: ['certificado_integracao.pdf']
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'AGENDADO': 'bg-blue-100 text-blue-800',
      'EM_ANDAMENTO': 'bg-yellow-100 text-yellow-800',
      'CONCLUÍDO': 'bg-green-100 text-green-800',
      'ATRASADO': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getTaskStatusBadge = (status: string) => {
    const styles = {
      'PENDENTE': 'bg-gray-100 text-gray-800',
      'EM_ANDAMENTO': 'bg-yellow-100 text-yellow-800',
      'CONCLUÍDO': 'bg-green-100 text-green-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'DOCUMENTAÇÃO':
        return <FileText size={14} className="text-blue-600" />;
      case 'FORMAÇÃO':
        return <BookOpen size={14} className="text-green-600" />;
      case 'EQUIPAMENTOS':
        return <User size={14} className="text-purple-600" />;
      case 'APRESENTAÇÕES':
        return <Users size={14} className="text-orange-600" />;
      case 'SISTEMAS':
        return <Calendar size={14} className="text-red-600" />;
      default:
        return <FileText size={14} className="text-gray-600" />;
    }
  };

  const filteredIntegrations = selectedFilter 
    ? integrations.filter(integration => integration.status === selectedFilter)
    : integrations;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Integração</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <User size={16} />
          Nova Integração
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Filtrar por Status</label>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Todos os Status</option>
              <option value="AGENDADO">Agendado</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="CONCLUÍDO">Concluído</option>
              <option value="ATRASADO">Atrasado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Integrações */}
      <div className="grid gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{integration.employeeName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(integration.status)}`}>
                    {integration.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Posição</div>
                    <div className="text-sm font-medium text-gray-900">{integration.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Departamento</div>
                    <div className="text-sm font-medium text-gray-900">{integration.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Data de Início</div>
                    <div className="text-sm font-medium text-gray-900">{integration.startDate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Mentor</div>
                    <div className="text-sm font-medium text-gray-900">{integration.mentor}</div>
                  </div>
                </div>

                {/* Barra de Progresso */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Progresso da Integração</span>
                    <span className="text-sm font-medium text-gray-900">{integration.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-900 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${integration.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tarefas de Integração */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Tarefas de Integração</h4>
                  <div className="space-y-2">
                    {integration.tasks.slice(0, 3).map((task) => (
                      <div key={task.id} className="flex items-center justify-between bg-gray-50 rounded p-2">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(task.category)}
                          <span className="text-sm text-gray-900">{task.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{task.dueDate}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusBadge(task.status)}`}>
                            {task.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documentos */}
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Documentos:</span> {integration.documents.length} ficheiros
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <FileText size={14} />
                  Ver Tarefas
                </Button>
                <Button variant="outline" size="sm">
                  <Mail size={14} />
                  Contactar
                </Button>
                {integration.status !== 'CONCLUÍDO' && (
                  <Button size="sm" className="bg-red-900 hover:bg-red-800">
                    Atualizar Progresso
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas de Integração */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {integrations.filter(i => i.status === 'AGENDADO').length}
          </div>
          <div className="text-sm text-blue-600">Agendadas</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {integrations.filter(i => i.status === 'EM_ANDAMENTO').length}
          </div>
          <div className="text-sm text-yellow-600">Em Andamento</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {integrations.filter(i => i.status === 'CONCLUÍDO').length}
          </div>
          <div className="text-sm text-green-600">Concluídas</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(integrations.reduce((acc, i) => acc + i.progress, 0) / integrations.length)}%
          </div>
          <div className="text-sm text-purple-600">Progresso Médio</div>
        </div>
      </div>

      {/* Próximas Tarefas */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Próximas Tarefas</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Miguel Santos - Formação em Sistemas (vence em 2024-02-03)</li>
          <li>• Ana Fernandes - Preparação do espaço de trabalho (vence em 2024-02-05)</li>
        </ul>
      </div>
    </div>
  );
};

export default IntegrationManager;
