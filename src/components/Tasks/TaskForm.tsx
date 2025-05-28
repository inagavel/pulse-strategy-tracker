
import React, { useState } from 'react';
import { Calendar, User, Target, Flag, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

const TaskForm = ({ isOpen, onClose, onSubmit }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    startDate: '',
    endDate: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    okrId: '',
    okrTitle: '',
    department: ''
  });

  const mockOKRs = [
    { id: '1', title: 'Aumentar receita em 25%', area: 'Vendas' },
    { id: '2', title: 'Melhorar satisfação do cliente', area: 'Atendimento' },
    { id: '3', title: 'Otimizar processos internos', area: 'Operações' },
    { id: '4', title: 'Expansão digital', area: 'Marketing' },
    { id: '5', title: 'Modernização tecnológica', area: 'TI' }
  ];

  const collaborators = [
    { name: 'João Silva', department: 'Vendas', role: 'Gerente de Vendas' },
    { name: 'Maria Santos', department: 'Atendimento', role: 'Coordenadora de Suporte' },
    { name: 'Pedro Oliveira', department: 'Marketing', role: 'Analista de Marketing' },
    { name: 'Ana Costa', department: 'TI', role: 'Desenvolvedora' },
    { name: 'Carlos Lima', department: 'Operações', role: 'Supervisor' },
    { name: 'Julia Ferreira', department: 'RH', role: 'Analista de RH' },
    { name: 'Roberto Dias', department: 'Financeiro', role: 'Contador' }
  ];

  const departments = ['Vendas', 'Marketing', 'TI', 'RH', 'Financeiro', 'Atendimento', 'Operações'];

  const filteredCollaborators = formData.department && formData.department !== 'all-departments'
    ? collaborators.filter(c => c.department === formData.department)
    : collaborators;

  const filteredOKRs = formData.department && formData.department !== 'all-departments'
    ? mockOKRs.filter(okr => okr.area === formData.department)
    : mockOKRs;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.assignee || !formData.startDate || !formData.endDate) {
      return;
    }
    
    const selectedCollaborator = collaborators.find(c => c.name === formData.assignee);
    
    const newTask = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending' as const,
      progress: 0,
      department: selectedCollaborator?.department || (formData.department !== 'all-departments' ? formData.department : '')
    };

    onSubmit(newTask);
    setFormData({
      title: '',
      description: '',
      assignee: '',
      startDate: '',
      endDate: '',
      priority: 'medium',
      okrId: '',
      okrTitle: '',
      department: ''
    });
    onClose();
  };

  const handleOKRChange = (okrId: string) => {
    if (okrId === 'no-okr') {
      setFormData({
        ...formData,
        okrId: '',
        okrTitle: ''
      });
      return;
    }
    
    const okr = mockOKRs.find(okr => okr.id === okrId);
    setFormData({
      ...formData,
      okrId,
      okrTitle: okr?.title || ''
    });
  };

  const handleAssigneeChange = (assigneeName: string) => {
    const collaborator = collaborators.find(c => c.name === assigneeName);
    setFormData({
      ...formData,
      assignee: assigneeName,
      department: collaborator?.department || ''
    });
  };

  const handleDepartmentChange = (department: string) => {
    const finalDepartment = department === 'all-departments' ? '' : department;
    setFormData({ 
      ...formData, 
      department: finalDepartment, 
      assignee: '' 
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Média';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Tarefa</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o título da tarefa"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full"
              placeholder="Descreva a tarefa..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Building2 size={16} className="inline mr-1" />
                Departamento
              </label>
              <Select value={formData.department || 'all-departments'} onValueChange={handleDepartmentChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar departamento..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-departments">Todos os departamentos</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-1" />
                Responsável *
              </label>
              <Select value={formData.assignee} onValueChange={handleAssigneeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar responsável..." />
                </SelectTrigger>
                <SelectContent>
                  {filteredCollaborators.map(collaborator => (
                    <SelectItem key={collaborator.name} value={collaborator.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{collaborator.name}</span>
                        <span className="text-xs text-gray-500">{collaborator.role} - {collaborator.department}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Flag size={16} className="inline mr-1" />
                Prioridade
              </label>
              <Select value={formData.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor('low')}`}>
                        Baixa
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor('medium')}`}>
                        Média
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${getPriorityColor('high')}`}>
                        Alta
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target size={16} className="inline mr-1" />
                OKR Associado
              </label>
              <Select value={formData.okrId || 'no-okr'} onValueChange={handleOKRChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar OKR..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-okr">Nenhum OKR</SelectItem>
                  {filteredOKRs.map(okr => (
                    <SelectItem key={okr.id} value={okr.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{okr.title}</span>
                        <span className="text-xs text-gray-500">{okr.area}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Data Início *
              </label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-1" />
                Data Fim *
              </label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Preview da tarefa */}
          {(formData.title || formData.assignee || formData.okrTitle) && (
            <div className="bg-gray-50 rounded-lg p-4 border">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Preview da Tarefa</h4>
              <div className="space-y-2 text-sm">
                {formData.title && (
                  <div><strong>Título:</strong> {formData.title}</div>
                )}
                {formData.assignee && (
                  <div><strong>Responsável:</strong> {formData.assignee}</div>
                )}
                {formData.department && (
                  <div><strong>Departamento:</strong> {formData.department}</div>
                )}
                {formData.okrTitle && (
                  <div><strong>OKR:</strong> {formData.okrTitle}</div>
                )}
                <div>
                  <strong>Prioridade:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${getPriorityColor(formData.priority)}`}>
                    {getPriorityLabel(formData.priority)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700"
            >
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
