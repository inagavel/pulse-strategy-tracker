
import React, { useState } from 'react';
import { FileText, Download, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Contract {
  id: string;
  candidateName: string;
  position: string;
  department: string;
  salary: string;
  startDate: string;
  contractType: string;
  status: 'RASCUNHO' | 'ENVIADO' | 'EM_ANÁLISE' | 'ASSINADO' | 'REJEITADO';
  createdDate: string;
  signedDate?: string;
  document: string;
}

const ContractManager = () => {
  const [contracts] = useState<Contract[]>([
    {
      id: '1',
      candidateName: 'Miguel Santos',
      position: 'Gestor de Vendas Sénior',
      department: 'Vendas',
      salary: '400.000 Kz',
      startDate: '2024-02-01',
      contractType: 'Tempo Integral',
      status: 'ASSINADO',
      createdDate: '2024-01-20',
      signedDate: '2024-01-22',
      document: 'contrato_miguel_santos.pdf'
    },
    {
      id: '2',
      candidateName: 'Ana Fernandes',
      position: 'Especialista em Marketing Digital',
      department: 'Marketing',
      salary: '280.000 Kz',
      startDate: '2024-02-05',
      contractType: 'Tempo Integral',
      status: 'ENVIADO',
      createdDate: '2024-01-21',
      document: 'contrato_ana_fernandes.pdf'
    },
    {
      id: '3',
      candidateName: 'Carlos Mendes',
      position: 'Gestor de Vendas Sénior',
      department: 'Vendas',
      salary: '420.000 Kz',
      startDate: '2024-02-10',
      contractType: 'Tempo Integral',
      status: 'RASCUNHO',
      createdDate: '2024-01-23',
      document: 'contrato_carlos_mendes.pdf'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'RASCUNHO': 'bg-gray-100 text-gray-800',
      'ENVIADO': 'bg-blue-100 text-blue-800',
      'EM_ANÁLISE': 'bg-yellow-100 text-yellow-800',
      'ASSINADO': 'bg-green-100 text-green-800',
      'REJEITADO': 'bg-red-100 text-red-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ASSINADO':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'ENVIADO':
      case 'EM_ANÁLISE':
        return <Clock size={16} className="text-blue-600" />;
      case 'REJEITADO':
        return <AlertCircle size={16} className="text-red-600" />;
      default:
        return <FileText size={16} className="text-gray-600" />;
    }
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'RASCUNHO': 'Rascunho',
      'ENVIADO': 'Enviado',
      'EM_ANÁLISE': 'Em Análise',
      'ASSINADO': 'Assinado',
      'REJEITADO': 'Rejeitado'
    };
    return labels[status as keyof typeof labels] || status;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Contratos</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <FileText size={16} />
          Novo Contrato
        </Button>
      </div>

      {/* Lista de Contratos */}
      <div className="grid gap-4">
        {contracts.map((contract) => (
          <div key={contract.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-lg font-medium text-gray-900">{contract.candidateName}</h3>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(contract.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(contract.status)}`}>
                      {getStatusLabel(contract.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Posição</div>
                    <div className="text-sm font-medium text-gray-900">{contract.position}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Departamento</div>
                    <div className="text-sm font-medium text-gray-900">{contract.department}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Salário</div>
                    <div className="text-sm font-medium text-gray-900">{contract.salary}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Início</div>
                    <div className="text-sm font-medium text-gray-900">{contract.startDate}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Criado:</span> {contract.createdDate}
                  </div>
                  {contract.signedDate && (
                    <div>
                      <span className="font-medium">Assinado:</span> {contract.signedDate}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Tipo:</span> {contract.contractType}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" title="Download">
                  <Download size={14} />
                </Button>
                
                {contract.status === 'RASCUNHO' && (
                  <>
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button size="sm" className="bg-red-900 hover:bg-red-800">
                      <Send size={14} />
                      Enviar
                    </Button>
                  </>
                )}
                
                {contract.status === 'ENVIADO' && (
                  <Button variant="outline" size="sm">
                    Reenviar
                  </Button>
                )}
                
                {contract.status === 'ASSINADO' && (
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas de Contratos */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-600">
            {contracts.filter(c => c.status === 'RASCUNHO').length}
          </div>
          <div className="text-sm text-gray-600">Rascunhos</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {contracts.filter(c => c.status === 'ENVIADO').length}
          </div>
          <div className="text-sm text-blue-600">Enviados</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {contracts.filter(c => c.status === 'EM_ANÁLISE').length}
          </div>
          <div className="text-sm text-yellow-600">Em Análise</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {contracts.filter(c => c.status === 'ASSINADO').length}
          </div>
          <div className="text-sm text-green-600">Assinados</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">
            {contracts.filter(c => c.status === 'REJEITADO').length}
          </div>
          <div className="text-sm text-red-600">Rejeitados</div>
        </div>
      </div>

      {/* Alertas e Lembretes */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-800 mb-2">Lembretes</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Ana Fernandes - Contrato enviado há 3 dias, aguardando assinatura</li>
          <li>• Carlos Mendes - Rascunho de contrato pendente de envio</li>
        </ul>
      </div>
    </div>
  );
};

export default ContractManager;
