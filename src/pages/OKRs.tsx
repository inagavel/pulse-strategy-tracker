
import React, { useState } from 'react';
import { Plus, Target, Edit, Trash2, Users } from 'lucide-react';

interface KeyResult {
  id: string;
  description: string;
  progress: number;
  target: number;
  current: number;
}

interface OKR {
  id: string;
  title: string;
  description: string;
  owner: string;
  quarter: string;
  progress: number;
  keyResults: KeyResult[];
  status: 'active' | 'completed' | 'at-risk';
}

const OKRs = () => {
  const [okrs] = useState<OKR[]>([
    {
      id: '1',
      title: 'Aumentar receita em 25%',
      description: 'Expandir base de clientes e aumentar valor médio por venda',
      owner: 'João Silva',
      quarter: 'Q1 2024',
      progress: 78,
      status: 'active',
      keyResults: [
        { id: '1', description: 'Adquirir 100 novos clientes', progress: 85, target: 100, current: 85 },
        { id: '2', description: 'Aumentar ticket médio para €500', progress: 70, target: 500, current: 350 },
        { id: '3', description: 'Melhorar taxa de conversão para 15%', progress: 80, target: 15, current: 12 },
      ]
    },
    {
      id: '2',
      title: 'Melhorar satisfação do cliente',
      description: 'Implementar melhorias no atendimento e suporte',
      owner: 'Maria Santos',
      quarter: 'Q1 2024',
      progress: 65,
      status: 'active',
      keyResults: [
        { id: '4', description: 'Atingir NPS de 70', progress: 60, target: 70, current: 45 },
        { id: '5', description: 'Reduzir tempo de resposta para 2h', progress: 75, target: 2, current: 3 },
        { id: '6', description: 'Implementar chat 24/7', progress: 90, target: 100, current: 90 },
      ]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 60) return 'bg-blue-600';
    if (progress >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">OKRs</h1>
          <p className="text-gray-600 mt-1">Objectives and Key Results</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Novo OKR</span>
        </button>
      </div>

      <div className="space-y-6">
        {okrs.map((okr) => (
          <div key={okr.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <Target className="text-blue-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">{okr.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(okr.status)}`}>
                    {okr.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{okr.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Users size={16} />
                    <span>{okr.owner}</span>
                  </span>
                  <span>{okr.quarter}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Progresso geral */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
                <span className="text-sm text-gray-500">{okr.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(okr.progress)}`}
                  style={{ width: `${okr.progress}%` }}
                />
              </div>
            </div>

            {/* Key Results */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Key Results</h4>
              <div className="space-y-3">
                {okr.keyResults.map((kr) => (
                  <div key={kr.id} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{kr.description}</span>
                      <span className="text-sm text-gray-500">{kr.current}/{kr.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getProgressColor(kr.progress)}`}
                        style={{ width: `${kr.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OKRs;
