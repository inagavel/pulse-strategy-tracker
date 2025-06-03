
import React, { useState } from 'react';
import { Search, Eye, Download, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  education: string;
  status: 'NOVO' | 'EM_ANÁLISE' | 'ENTREVISTA' | 'APROVADO' | 'REJEITADO';
  appliedDate: string;
  cv: string;
}

const CandidateList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  const [candidates] = useState<Candidate[]>([
    {
      id: '1',
      name: 'Carlos Mendes',
      email: 'carlos.mendes@email.com',
      phone: '+244 923 111 222',
      position: 'Gestor de Vendas Sénior',
      experience: '7 anos',
      education: 'Licenciatura em Gestão',
      status: 'NOVO',
      appliedDate: '2024-01-22',
      cv: 'carlos_mendes_cv.pdf'
    },
    {
      id: '2',
      name: 'Ana Fernandes',
      email: 'ana.fernandes@email.com',
      phone: '+244 934 333 444',
      position: 'Especialista em Marketing Digital',
      experience: '5 anos',
      education: 'Licenciatura em Marketing',
      status: 'EM_ANÁLISE',
      appliedDate: '2024-01-21',
      cv: 'ana_fernandes_cv.pdf'
    },
    {
      id: '3',
      name: 'Miguel Santos',
      email: 'miguel.santos@email.com',
      phone: '+244 945 555 666',
      position: 'Gestor de Vendas Sénior',
      experience: '6 anos',
      education: 'Licenciatura em Economia',
      status: 'ENTREVISTA',
      appliedDate: '2024-01-20',
      cv: 'miguel_santos_cv.pdf'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'NOVO': 'bg-blue-100 text-blue-800',
      'EM_ANÁLISE': 'bg-yellow-100 text-yellow-800',
      'ENTREVISTA': 'bg-purple-100 text-purple-800',
      'APROVADO': 'bg-green-100 text-green-800',
      'REJEITADO': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'NOVO': 'Novo',
      'EM_ANÁLISE': 'Em Análise',
      'ENTREVISTA': 'Entrevista',
      'APROVADO': 'Aprovado',
      'REJEITADO': 'Rejeitado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || candidate.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Candidatos</h2>
      </div>

      {/* Filtros */}
      <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Pesquisar</label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Nome, email ou vaga..."
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Todos os Status</option>
              <option value="NOVO">Novo</option>
              <option value="EM_ANÁLISE">Em Análise</option>
              <option value="ENTREVISTA">Entrevista</option>
              <option value="APROVADO">Aprovado</option>
              <option value="REJEITADO">Rejeitado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Candidatos */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">CANDIDATO</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">VAGA</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">EXPERIÊNCIA</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">STATUS</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">DATA</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">ACÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  Nenhum candidato encontrado
                </td>
              </tr>
            ) : (
              filteredCandidates.map((candidate) => (
                <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-sm text-gray-500">{candidate.email}</div>
                      <div className="text-sm text-gray-500">{candidate.phone}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{candidate.position}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900">{candidate.experience}</div>
                    <div className="text-sm text-gray-500">{candidate.education}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(candidate.status)}`}>
                      {getStatusLabel(candidate.status)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{candidate.appliedDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" title="Ver Perfil">
                        <Eye size={14} />
                      </Button>
                      <Button size="sm" variant="outline" title="Download CV">
                        <Download size={14} />
                      </Button>
                      <Button size="sm" variant="outline" title="Contactar">
                        <MessageCircle size={14} />
                      </Button>
                      <Button size="sm" variant="outline" title="Agendar Entrevista">
                        <Calendar size={14} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
