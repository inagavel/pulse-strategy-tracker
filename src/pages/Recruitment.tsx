
import React, { useState } from 'react';
import { Plus, Users, FileText, CheckCircle, Clock, Search, Clipboard, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JobPostingForm from '../components/Recruitment/JobPostingForm';
import CandidateList from '../components/Recruitment/CandidateList';
import InterviewScheduler from '../components/Recruitment/InterviewScheduler';
import TestingManager from '../components/Recruitment/TestingManager';
import ContractManager from '../components/Recruitment/ContractManager';
import IntegrationManager from '../components/Recruitment/IntegrationManager';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
  status: 'ABERTO' | 'FECHADO' | 'PAUSADO';
  createdAt: string;
  applicants: number;
}

const Recruitment = () => {
  const [activeTab, setActiveTab] = useState<'vagas' | 'candidatos' | 'testes' | 'entrevistas' | 'contratos' | 'integracao'>('vagas');
  const [showJobForm, setShowJobForm] = useState(false);
  
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([
    {
      id: '1',
      title: 'Gestor de Vendas Sénior',
      department: 'Vendas',
      location: 'Luanda, Angola',
      type: 'Tempo Integral',
      salary: '350.000 - 450.000 Kz',
      description: 'Procuramos um gestor de vendas experiente para liderar nossa equipa comercial em Luanda.',
      requirements: ['Experiência mínima de 5 anos em vendas', 'Liderança de equipas', 'Formação superior'],
      status: 'ABERTO',
      createdAt: '2024-01-15',
      applicants: 12
    },
    {
      id: '2',
      title: 'Especialista em Marketing Digital',
      department: 'Marketing',
      location: 'Benguela, Angola',
      type: 'Tempo Integral',
      salary: '250.000 - 320.000 Kz',
      description: 'Responsável por estratégias de marketing digital e gestão de redes sociais.',
      requirements: ['Experiência em marketing digital', 'Conhecimento de redes sociais', 'Criatividade'],
      status: 'ABERTO',
      createdAt: '2024-01-20',
      applicants: 8
    }
  ]);

  const handleNewJob = (jobData: any) => {
    const newJob: JobPosting = {
      id: Date.now().toString(),
      ...jobData,
      status: 'ABERTO',
      createdAt: new Date().toISOString().split('T')[0],
      applicants: 0
    };
    setJobPostings([...jobPostings, newJob]);
  };

  const tabs = [
    { id: 'vagas', label: 'Vagas de Emprego', icon: FileText },
    { id: 'candidatos', label: 'Candidatos', icon: Users },
    { id: 'testes', label: 'Testes', icon: Clipboard },
    { id: 'entrevistas', label: 'Entrevistas', icon: Clock },
    { id: 'contratos', label: 'Contratos', icon: CheckCircle },
    { id: 'integracao', label: 'Integração', icon: UserCheck }
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'ABERTO': 'bg-green-100 text-green-800',
      'FECHADO': 'bg-red-100 text-red-800',
      'PAUSADO': 'bg-yellow-100 text-yellow-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">MÓDULO DE RECRUTAMENTO</h1>
      </div>

      {/* Navegação por Tabs */}
      <div className="border-b border-gray-200 bg-white px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-900 text-red-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-6 py-6">
        {/* Vagas de Emprego */}
        {activeTab === 'vagas' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Vagas Publicadas</h2>
              <Button onClick={() => setShowJobForm(true)} className="bg-red-900 hover:bg-red-800">
                <Plus size={16} />
                Criar Nova Vaga
              </Button>
            </div>

            <div className="grid gap-4">
              {jobPostings.map((job) => (
                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{job.department}</span> • {job.location} • {job.type}
                      </div>
                      <div className="text-sm text-gray-600 mb-3">
                        Salário: {job.salary}
                      </div>
                      <p className="text-gray-700 mb-3">{job.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users size={14} className="mr-1" />
                        {job.applicants} candidatos
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver Candidatos
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidatos */}
        {activeTab === 'candidatos' && (
          <CandidateList />
        )}

        {/* Testes */}
        {activeTab === 'testes' && (
          <TestingManager />
        )}

        {/* Entrevistas */}
        {activeTab === 'entrevistas' && (
          <InterviewScheduler />
        )}

        {/* Contratos */}
        {activeTab === 'contratos' && (
          <ContractManager />
        )}

        {/* Integração */}
        {activeTab === 'integracao' && (
          <IntegrationManager />
        )}
      </div>

      <JobPostingForm
        isOpen={showJobForm}
        onClose={() => setShowJobForm(false)}
        onSubmit={handleNewJob}
      />
    </div>
  );
};

export default Recruitment;
