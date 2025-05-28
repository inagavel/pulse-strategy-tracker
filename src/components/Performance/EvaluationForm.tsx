
import React, { useState } from 'react';
import { X, Star, Target, User } from 'lucide-react';

interface EvaluationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (evaluation: any) => void;
}

const EvaluationForm = ({ isOpen, onClose, onSubmit }: EvaluationFormProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    period: '',
    evaluatedBy: '',
    goals: { achieved: 0, total: 0 },
    competencies: {
      leadership: 0,
      communication: 0,
      technical: 0,
      teamwork: 0
    }
  });

  const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro', 'Atendimento', 'Operações'];
  const competencyLabels = {
    leadership: 'Liderança',
    communication: 'Comunicação',
    technical: 'Técnica',
    teamwork: 'Trabalho em Equipe'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvaluation = {
      id: Date.now().toString(),
      ...formData,
      status: 'in-progress',
      overallScore: 0,
      evaluationDate: ''
    };
    onSubmit(newEvaluation);
    onClose();
    setFormData({
      employeeName: '',
      department: '',
      period: '',
      evaluatedBy: '',
      goals: { achieved: 0, total: 0 },
      competencies: {
        leadership: 0,
        communication: 0,
        technical: 0,
        teamwork: 0
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Nova Avaliação de Desempenho</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Colaborador
              </label>
              <input
                type="text"
                required
                value={formData.employeeName}
                onChange={(e) => setFormData({...formData, employeeName: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o departamento</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                required
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecione o período</option>
                <option value="Q1 2024">Q1 2024</option>
                <option value="Q2 2024">Q2 2024</option>
                <option value="Q3 2024">Q3 2024</option>
                <option value="Q4 2024">Q4 2024</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliado por
              </label>
              <input
                type="text"
                required
                value={formData.evaluatedBy}
                onChange={(e) => setFormData({...formData, evaluatedBy: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <Target size={16} />
              <span>Metas</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Metas Alcançadas</label>
                <input
                  type="number"
                  min="0"
                  value={formData.goals.achieved}
                  onChange={(e) => setFormData({
                    ...formData, 
                    goals: {...formData.goals, achieved: parseInt(e.target.value) || 0}
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Total de Metas</label>
                <input
                  type="number"
                  min="1"
                  value={formData.goals.total}
                  onChange={(e) => setFormData({
                    ...formData, 
                    goals: {...formData.goals, total: parseInt(e.target.value) || 0}
                  })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-3 flex items-center space-x-2">
              <Star size={16} />
              <span>Competências</span>
            </h3>
            <div className="space-y-3">
              {Object.entries(competencyLabels).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{label}</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          competencies: {
                            ...formData.competencies,
                            [key]: star
                          }
                        })}
                        className={`${
                          star <= formData.competencies[key as keyof typeof formData.competencies]
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      >
                        <Star size={20} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Criar Avaliação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EvaluationForm;
