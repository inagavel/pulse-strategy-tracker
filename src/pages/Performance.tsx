import React, { useState } from 'react';
import { Plus, UserCheck, Users, Calendar, Star, Target, TrendingUp, Award, UserPlus } from 'lucide-react';
import EvaluationForm from '../components/Performance/EvaluationForm';
import EmployeeForm from '../components/Performance/EmployeeForm';

interface PerformanceEvaluation {
  id: string;
  employeeName: string;
  department: string;
  period: string;
  status: 'pending' | 'in-progress' | 'completed';
  overallScore: number;
  evaluatedBy: string;
  evaluationDate: string;
  goals: {
    achieved: number;
    total: number;
  };
  competencies: {
    leadership: number;
    communication: number;
    technical: number;
    teamwork: number;
  };
}

const Performance = () => {
  const [evaluations, setEvaluations] = useState<PerformanceEvaluation[]>([
    {
      id: '1',
      employeeName: 'João Silva',
      department: 'Vendas',
      period: 'Q1 2024',
      status: 'completed',
      overallScore: 4.2,
      evaluatedBy: 'Maria Santos',
      evaluationDate: '2024-03-15',
      goals: { achieved: 8, total: 10 },
      competencies: {
        leadership: 4,
        communication: 5,
        technical: 4,
        teamwork: 4
      }
    },
    {
      id: '2',
      employeeName: 'Ana Costa',
      department: 'TI',
      period: 'Q1 2024',
      status: 'in-progress',
      overallScore: 0,
      evaluatedBy: 'Pedro Oliveira',
      evaluationDate: '',
      goals: { achieved: 0, total: 8 },
      competencies: {
        leadership: 0,
        communication: 0,
        technical: 0,
        teamwork: 0
      }
    },
    {
      id: '3',
      employeeName: 'Carlos Lima',
      department: 'Operações',
      period: 'Q1 2024',
      status: 'completed',
      overallScore: 3.8,
      evaluatedBy: 'Julia Ferreira',
      evaluationDate: '2024-03-10',
      goals: { achieved: 6, total: 8 },
      competencies: {
        leadership: 3,
        communication: 4,
        technical: 4,
        teamwork: 4
      }
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro', 'Atendimento', 'Operações'];

  const filteredEvaluations = evaluations.filter(evaluation => {
    const periodMatch = selectedPeriod === 'all' || evaluation.period === selectedPeriod;
    const departmentMatch = selectedDepartment === 'all' || evaluation.department === selectedDepartment;
    const statusMatch = selectedStatus === 'all' || evaluation.status === selectedStatus;
    return periodMatch && departmentMatch && statusMatch;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors];
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      pending: 'Pendente',
      'in-progress': 'Em Andamento',
      completed: 'Concluída'
    };
    return labels[status as keyof typeof labels];
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const clearFilters = () => {
    setSelectedPeriod('all');
    setSelectedDepartment('all');
    setSelectedStatus('all');
  };

  const handleNewEvaluation = (evaluation: any) => {
    setEvaluations([...evaluations, evaluation]);
  };

  const handleNewEmployee = (employee: any) => {
    console.log('Novo colaborador criado:', employee);
    // Aqui você integraria com o sistema de colaboradores
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Avaliação de Desempenho</h1>
          <p className="text-gray-600 mt-1">Gerencie e acompanhe as avaliações de desempenho dos colaboradores</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowEmployeeForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <UserPlus size={20} />
            <span>Novo Colaborador</span>
          </button>
          <button 
            onClick={() => setShowEvaluationForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Nova Avaliação</span>
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <UserCheck className="text-gray-400" size={20} />
            <span className="font-medium text-gray-700">Filtros:</span>
          </div>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Períodos</option>
              <option value="Q1 2024">Q1 2024</option>
              <option value="Q2 2024">Q2 2024</option>
              <option value="Q3 2024">Q3 2024</option>
              <option value="Q4 2024">Q4 2024</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Departamento</label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Departamentos</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos os Status</option>
              <option value="pending">Pendente</option>
              <option value="in-progress">Em Andamento</option>
              <option value="completed">Concluída</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resumo das avaliações */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{filteredEvaluations.length}</div>
          <div className="text-sm text-gray-600">Total de Avaliações</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{filteredEvaluations.filter(e => e.status === 'completed').length}</div>
          <div className="text-sm text-gray-600">Concluídas</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{filteredEvaluations.filter(e => e.status === 'in-progress').length}</div>
          <div className="text-sm text-gray-600">Em Andamento</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">{filteredEvaluations.filter(e => e.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pendentes</div>
        </div>
      </div>

      {/* Lista de avaliações */}
      <div className="space-y-4">
        {filteredEvaluations.map((evaluation) => (
          <div key={evaluation.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <UserCheck className="text-blue-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">{evaluation.employeeName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(evaluation.status)}`}>
                    {getStatusLabel(evaluation.status)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{evaluation.department}</span>
                  <span>•</span>
                  <span>{evaluation.period}</span>
                  {evaluation.evaluationDate && (
                    <>
                      <span>•</span>
                      <span>Avaliado em {evaluation.evaluationDate}</span>
                    </>
                  )}
                </div>
              </div>
              {evaluation.status === 'completed' && (
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                    {evaluation.overallScore.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-500">Nota Geral</div>
                </div>
              )}
            </div>

            {evaluation.status === 'completed' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Metas Alcançadas */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 flex items-center space-x-2">
                    <Target size={16} />
                    <span>Metas Alcançadas</span>
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progresso</span>
                      <span className="text-sm font-medium">
                        {evaluation.goals.achieved}/{evaluation.goals.total}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(evaluation.goals.achieved / evaluation.goals.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Competências */}
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-700 flex items-center space-x-2">
                    <Award size={16} />
                    <span>Competências</span>
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(evaluation.competencies).map(([competency, score]) => (
                      <div key={competency} className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 capitalize">{competency}</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={star <= score ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{score}/5</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {evaluation.status !== 'completed' && (
              <div className="text-center py-4">
                <div className="text-gray-500">
                  {evaluation.status === 'pending' ? 'Avaliação aguardando início' : 'Avaliação em andamento...'}
                </div>
                <div className="text-sm text-gray-400 mt-1">
                  Avaliador: {evaluation.evaluatedBy}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredEvaluations.length === 0 && (
        <div className="text-center py-12">
          <UserCheck size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma avaliação encontrada</h3>
          <p className="text-gray-600">Ajuste os filtros ou crie uma nova avaliação.</p>
        </div>
      )}

      <EvaluationForm
        isOpen={showEvaluationForm}
        onClose={() => setShowEvaluationForm(false)}
        onSubmit={handleNewEvaluation}
      />

      <EmployeeForm
        isOpen={showEmployeeForm}
        onClose={() => setShowEmployeeForm(false)}
        onSubmit={handleNewEmployee}
      />
    </div>
  );
};

export default Performance;
