
import React from 'react';
import { Target } from 'lucide-react';

interface OKRItem {
  id: string;
  title: string;
  progress: number;
  keyResults: number;
}

const okrs: OKRItem[] = [
  { id: '1', title: 'Aumentar receita em 25%', progress: 78, keyResults: 4 },
  { id: '2', title: 'Melhorar satisfação do cliente', progress: 65, keyResults: 3 },
  { id: '3', title: 'Reduzir custos operacionais', progress: 45, keyResults: 5 },
  { id: '4', title: 'Expandir equipe técnica', progress: 90, keyResults: 2 },
];

const OKRProgress = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="text-blue-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-900">Progresso dos OKRs</h3>
      </div>
      
      <div className="space-y-4">
        {okrs.map((okr) => (
          <div key={okr.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{okr.title}</span>
              <span className="text-sm text-gray-500">{okr.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${okr.progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500">{okr.keyResults} Key Results</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OKRProgress;
