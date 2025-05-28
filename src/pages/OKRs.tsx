import React, { useState } from 'react';
import { Plus, Target, Edit, Trash2, Users, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { DepartmentCard } from '@/components/OKRs/DepartmentCard';
import { OKRDetailView } from '@/components/OKRs/OKRDetailView';

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

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
  priority: string;
  dueDate: string;
}

const OKRs = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  
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
    },
    {
      id: '3',
      title: 'Otimizar processos internos',
      description: 'Automatizar tarefas repetitivas e melhorar eficiência',
      owner: 'Carlos Lima',
      quarter: 'Q1 2024',
      progress: 45,
      status: 'at-risk',
      area: 'TI',
      keyResults: [
        { id: '7', description: 'Implementar 5 automações', progress: 40, target: 5, current: 2 },
        { id: '8', description: 'Reduzir tempo de processo em 30%', progress: 50, target: 30, current: 15 },
      ]
    },
    {
      id: '4',
      title: 'Expandir equipe de desenvolvimento',
      description: 'Contratar e treinar novos desenvolvedores',
      owner: 'Ana Costa',
      quarter: 'Q1 2024',
      progress: 90,
      status: 'completed',
      area: 'RH',
      keyResults: [
        { id: '9', description: 'Contratar 8 desenvolvedores', progress: 100, target: 8, current: 8 },
        { id: '10', description: 'Concluir programa de onboarding', progress: 80, target: 100, current: 80 },
      ]
    }
  ]);

  // Mock tasks data
  const mockTasks: Task[] = [
    { id: '1', title: 'Configurar CRM', description: 'Setup do sistema CRM', assignee: 'João Silva', status: 'completed', priority: 'high', dueDate: '2024-02-15' },
    { id: '2', title: 'Treinar equipe de vendas', description: 'Treinamento em técnicas de vendas', assignee: 'Maria Santos', status: 'in-progress', priority: 'medium', dueDate: '2024-02-20' },
    { id: '3', title: 'Implementar chat', description: 'Setup do sistema de chat 24/7', assignee: 'Carlos Lima', status: 'pending', priority: 'high', dueDate: '2024-02-25' },
    { id: '4', title: 'Análise de satisfação', description: 'Pesquisa de satisfação do cliente', assignee: 'Ana Costa', status: 'in-progress', priority: 'medium', dueDate: '2024-02-18' },
    { id: '5', title: 'Automação de relatórios', description: 'Automatizar geração de relatórios', assignee: 'Pedro Oliveira', status: 'pending', priority: 'low', dueDate: '2024-03-01' },
  ];

  const [isOKRFormOpen, setIsOKRFormOpen] = useState(false);
  const [editingOKR, setEditingOKR] = useState<OKR | null>(null);

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

  // Group OKRs by department
  const okrsByDepartment = areas.reduce((acc, area) => {
    const departmentOKRs = okrs.filter(okr => okr.area === area);
    if (departmentOKRs.length > 0) {
      acc[area] = departmentOKRs;
    }
    return acc;
  }, {} as Record<string, OKR[]>);

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

  if (selectedDepartment) {
    return (
      <OKRDetailView
        department={selectedDepartment}
        okrs={okrsByDepartment[selectedDepartment] || []}
        tasks={mockTasks}
        onBack={() => setSelectedDepartment(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">OKRs por Departamento</h1>
          <p className="text-gray-600 mt-1">Visão geral dos objetivos organizados por área</p>
        </div>
        <Button 
          onClick={() => setIsOKRFormOpen(true)}
          className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Novo OKR</span>
        </Button>
      </div>

      {/* Cards por Departamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(okrsByDepartment).map(([department, departmentOKRs]) => (
          <DepartmentCard
            key={department}
            department={department}
            okrs={departmentOKRs}
            onClick={setSelectedDepartment}
          />
        ))}
      </div>

      {Object.keys(okrsByDepartment).length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Nenhum OKR encontrado</div>
          <p className="text-gray-400 mt-2">Comece criando seu primeiro objetivo</p>
        </div>
      )}

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
