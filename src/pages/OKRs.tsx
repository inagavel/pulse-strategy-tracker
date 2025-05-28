
import React, { useState } from 'react';
import { Plus, Target, Edit, Trash2, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

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
  area: string;
}

const OKRs = () => {
  const { toast } = useToast();
  const [okrs, setOkrs] = useState<OKR[]>([
    {
      id: '1',
      title: 'Aumentar receita em 25%',
      description: 'Expandir base de clientes e aumentar valor médio por venda',
      owner: 'João Silva',
      quarter: 'Q1 2024',
      progress: 78,
      status: 'active',
      area: 'Vendas',
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
      area: 'Atendimento',
      keyResults: [
        { id: '4', description: 'Atingir NPS de 70', progress: 60, target: 70, current: 45 },
        { id: '5', description: 'Reduzir tempo de resposta para 2h', progress: 75, target: 2, current: 3 },
        { id: '6', description: 'Implementar chat 24/7', progress: 90, target: 100, current: 90 },
      ]
    }
  ]);

  const [isOKRFormOpen, setIsOKRFormOpen] = useState(false);
  const [editingOKR, setEditingOKR] = useState<OKR | null>(null);
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const areas = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro', 'Atendimento', 'Operações'];
  const owners = ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Lima'];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    owner: '',
    quarter: 'Q1 2024',
    area: '',
    keyResults: [{ description: '', target: 0 }]
  });

  const filteredOkrs = okrs.filter(okr => 
    selectedArea === 'all' || okr.area === selectedArea
  );

  const handleAddOKR = () => {
    if (!formData.title || !formData.owner || !formData.area) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const newOKR: OKR = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      owner: formData.owner,
      quarter: formData.quarter,
      area: formData.area,
      progress: 0,
      status: 'active',
      keyResults: formData.keyResults.map((kr, index) => ({
        id: `${Date.now()}-${index}`,
        description: kr.description,
        progress: 0,
        target: kr.target,
        current: 0
      })).filter(kr => kr.description.trim() !== '')
    };

    setOkrs([...okrs, newOKR]);
    setFormData({
      title: '',
      description: '',
      owner: '',
      quarter: 'Q1 2024',
      area: '',
      keyResults: [{ description: '', target: 0 }]
    });
    setIsOKRFormOpen(false);

    toast({
      title: "OKR criado",
      description: "Novo OKR adicionado com sucesso!"
    });
  };

  const handleDeleteOKR = (id: string) => {
    setOkrs(okrs.filter(okr => okr.id !== id));
    toast({
      title: "OKR removido",
      description: "OKR excluído com sucesso!"
    });
  };

  const addKeyResult = () => {
    setFormData({
      ...formData,
      keyResults: [...formData.keyResults, { description: '', target: 0 }]
    });
  };

  const updateKeyResult = (index: number, field: string, value: string | number) => {
    const updatedKeyResults = formData.keyResults.map((kr, i) => 
      i === index ? { ...kr, [field]: value } : kr
    );
    setFormData({ ...formData, keyResults: updatedKeyResults });
  };

  const removeKeyResult = (index: number) => {
    if (formData.keyResults.length > 1) {
      setFormData({
        ...formData,
        keyResults: formData.keyResults.filter((_, i) => i !== index)
      });
    }
  };

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
        <button 
          onClick={() => setIsOKRFormOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Novo OKR</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Building2 className="text-gray-400" size={20} />
          <span className="font-medium text-gray-700">Filtrar por Área:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedArea === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todas as Áreas
          </button>
          {areas.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedArea === area 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredOkrs.map((okr) => (
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
                  <span className="flex items-center space-x-1">
                    <Building2 size={16} />
                    <span>{okr.area}</span>
                  </span>
                  <span>{okr.quarter}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => {
                    setEditingOKR(okr);
                    setFormData({
                      title: okr.title,
                      description: okr.description,
                      owner: okr.owner,
                      quarter: okr.quarter,
                      area: okr.area,
                      keyResults: okr.keyResults.map(kr => ({ description: kr.description, target: kr.target }))
                    });
                    setIsOKRFormOpen(true);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit size={16} />
                </button>
                <button 
                  onClick={() => handleDeleteOKR(okr.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
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

      {/* Modal para novo/editar OKR */}
      <Dialog open={isOKRFormOpen} onOpenChange={() => {
        setIsOKRFormOpen(false);
        setEditingOKR(null);
        setFormData({
          title: '',
          description: '',
          owner: '',
          quarter: 'Q1 2024',
          area: '',
          keyResults: [{ description: '', target: 0 }]
        });
      }}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingOKR ? 'Editar OKR' : 'Novo OKR'}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o título do OKR"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Área *
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar área...</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Descreva o objetivo..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável *
                </label>
                <select
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecionar responsável...</option>
                  {owners.map(owner => (
                    <option key={owner} value={owner}>{owner}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trimestre
                </label>
                <select
                  value={formData.quarter}
                  onChange={(e) => setFormData({ ...formData, quarter: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Q1 2024">Q1 2024</option>
                  <option value="Q2 2024">Q2 2024</option>
                  <option value="Q3 2024">Q3 2024</option>
                  <option value="Q4 2024">Q4 2024</option>
                </select>
              </div>
            </div>

            {/* Key Results */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Key Results
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addKeyResult}
                >
                  <Plus size={16} className="mr-1" />
                  Adicionar
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData.keyResults.map((kr, index) => (
                  <div key={index} className="flex gap-2 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={kr.description}
                        onChange={(e) => updateKeyResult(index, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Descrição do resultado..."
                      />
                    </div>
                    <div className="w-24">
                      <input
                        type="number"
                        value={kr.target}
                        onChange={(e) => updateKeyResult(index, 'target', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Meta"
                      />
                    </div>
                    {formData.keyResults.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeKeyResult(index)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOKRFormOpen(false);
                  setEditingOKR(null);
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddOKR}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingOKR ? 'Salvar' : 'Criar OKR'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OKRs;
