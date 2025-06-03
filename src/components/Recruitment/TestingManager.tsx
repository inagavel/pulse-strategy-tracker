
import React, { useState } from 'react';
import { Clock, FileText, CheckCircle, X, Plus, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Test {
  id: string;
  candidateName: string;
  position: string;
  testType: 'TÉCNICO' | 'PRÁTICO' | 'PSICOLÓGICO' | 'PERSONALIDADE';
  title: string;
  description: string;
  duration: number; // em minutos
  maxScore: number;
  status: 'AGENDADO' | 'EM_ANDAMENTO' | 'CONCLUÍDO' | 'CANCELADO';
  scheduledDate: string;
  scheduledTime: string;
  score?: number;
  feedback?: string;
  startedAt?: string;
  completedAt?: string;
}

const TestingManager = () => {
  const [showTestForm, setShowTestForm] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

  const [tests] = useState<Test[]>([
    {
      id: '1',
      candidateName: 'Carlos Mendes',
      position: 'Gestor de Vendas Sénior',
      testType: 'TÉCNICO',
      title: 'Teste de Conhecimentos de Vendas',
      description: 'Avaliação de conhecimentos técnicos em estratégias de vendas e gestão de clientes.',
      duration: 60,
      maxScore: 100,
      status: 'AGENDADO',
      scheduledDate: '2024-01-26',
      scheduledTime: '09:00'
    },
    {
      id: '2',
      candidateName: 'Ana Fernandes',
      position: 'Especialista em Marketing Digital',
      testType: 'PRÁTICO',
      title: 'Criação de Campanha Digital',
      description: 'Desenvolvimento de uma estratégia de marketing digital para um produto específico.',
      duration: 120,
      maxScore: 100,
      status: 'CONCLUÍDO',
      scheduledDate: '2024-01-24',
      scheduledTime: '14:00',
      score: 85,
      feedback: 'Excelente criatividade e conhecimento técnico. Estratégia bem estruturada.',
      startedAt: '14:00',
      completedAt: '16:00'
    },
    {
      id: '3',
      candidateName: 'Miguel Santos',
      position: 'Gestor de Vendas Sénior',
      testType: 'PSICOLÓGICO',
      title: 'Avaliação de Perfil de Liderança',
      description: 'Teste psicológico para avaliar competências de liderança e trabalho em equipa.',
      duration: 45,
      maxScore: 100,
      status: 'EM_ANDAMENTO',
      scheduledDate: '2024-01-25',
      scheduledTime: '10:30',
      startedAt: '10:30'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'AGENDADO': 'bg-blue-100 text-blue-800',
      'EM_ANDAMENTO': 'bg-yellow-100 text-yellow-800',
      'CONCLUÍDO': 'bg-green-100 text-green-800',
      'CANCELADO': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'TÉCNICO': 'text-blue-600',
      'PRÁTICO': 'text-green-600',
      'PSICOLÓGICO': 'text-purple-600',
      'PERSONALIDADE': 'text-orange-600'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600';
  };

  const filteredTests = selectedFilter 
    ? tests.filter(test => test.status === selectedFilter)
    : tests;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Testes</h2>
        <Button onClick={() => setShowTestForm(true)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} />
          Criar Novo Teste
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
              <option value="CANCELADO">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Testes */}
      <div className="grid gap-4">
        {filteredTests.map((test) => (
          <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{test.candidateName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(test.status)}`}>
                    {test.status}
                  </span>
                  <span className={`text-sm font-medium ${getTypeColor(test.testType)}`}>
                    {test.testType}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{test.position}</span>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-900">{test.title}</h4>
                  <p className="text-sm text-gray-600">{test.description}</p>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{test.duration} min</span>
                  </div>
                  <div>
                    <span>Pontuação máxima: {test.maxScore}</span>
                  </div>
                  <div>
                    <span>Data: {test.scheduledDate} às {test.scheduledTime}</span>
                  </div>
                </div>

                {test.score !== undefined && (
                  <div className="mb-2">
                    <span className="text-sm font-medium">
                      Pontuação: {test.score}/{test.maxScore} ({Math.round((test.score / test.maxScore) * 100)}%)
                    </span>
                  </div>
                )}

                {test.feedback && (
                  <div className="bg-gray-50 rounded p-2 text-sm text-gray-700 mb-2">
                    <span className="font-medium">Feedback:</span> {test.feedback}
                  </div>
                )}

                {test.status === 'EM_ANDAMENTO' && (
                  <div className="text-sm text-yellow-600">
                    Iniciado às {test.startedAt}
                  </div>
                )}

                {test.status === 'CONCLUÍDO' && (
                  <div className="text-sm text-green-600">
                    Concluído: {test.startedAt} - {test.completedAt}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                {test.status === 'AGENDADO' && (
                  <>
                    <Button variant="outline" size="sm">
                      Reagendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <X size={14} />
                      Cancelar
                    </Button>
                    <Button size="sm" className="bg-red-900 hover:bg-red-800">
                      Iniciar Teste
                    </Button>
                  </>
                )}
                {test.status === 'EM_ANDAMENTO' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle size={14} />
                    Finalizar
                  </Button>
                )}
                {test.status === 'CONCLUÍDO' && (
                  <>
                    <Button variant="outline" size="sm">
                      <Eye size={14} />
                      Ver Resultado
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download size={14} />
                      Relatório
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {tests.filter(t => t.status === 'AGENDADO').length}
          </div>
          <div className="text-sm text-blue-600">Testes Agendados</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {tests.filter(t => t.status === 'EM_ANDAMENTO').length}
          </div>
          <div className="text-sm text-yellow-600">Em Andamento</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {tests.filter(t => t.status === 'CONCLUÍDO').length}
          </div>
          <div className="text-sm text-green-600">Concluídos</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {tests.filter(t => t.status === 'CONCLUÍDO').reduce((acc, t) => acc + (t.score || 0), 0) / 
             Math.max(tests.filter(t => t.status === 'CONCLUÍDO').length, 1)}
          </div>
          <div className="text-sm text-purple-600">Média de Pontuação</div>
        </div>
      </div>
    </div>
  );
};

export default TestingManager;
