
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface JobPostingFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: any) => void;
}

const JobPostingForm = ({ isOpen, onClose, onSubmit }: JobPostingFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Tempo Integral',
    salary: '',
    description: '',
    requirements: ['']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
    onSubmit({
      ...formData,
      requirements: filteredRequirements
    });
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Tempo Integral',
      salary: '',
      description: '',
      requirements: ['']
    });
    onClose();
  };

  const addRequirement = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = formData.requirements.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      requirements: newRequirements
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Nova Vaga de Emprego</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título da Vaga *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="department">Departamento *</Label>
              <select
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                required
              >
                <option value="">Selecionar Departamento</option>
                <option value="Vendas">Vendas</option>
                <option value="Marketing">Marketing</option>
                <option value="Tecnologia">Tecnologia</option>
                <option value="Recursos Humanos">Recursos Humanos</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Operações">Operações</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Localização *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="ex: Luanda, Angola"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Tipo de Emprego *</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              >
                <option value="Tempo Integral">Tempo Integral</option>
                <option value="Meio Período">Meio Período</option>
                <option value="Contrato">Contrato</option>
                <option value="Estágio">Estágio</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="salary">Faixa Salarial *</Label>
            <Input
              id="salary"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              placeholder="ex: 250.000 - 350.000 Kz"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição da Vaga *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Requisitos</Label>
              <Button type="button" onClick={addRequirement} size="sm" variant="outline">
                <Plus size={14} />
                Adicionar Requisito
              </Button>
            </div>
            {formData.requirements.map((requirement, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <Input
                  value={requirement}
                  onChange={(e) => updateRequirement(index, e.target.value)}
                  placeholder="Digite um requisito"
                />
                {formData.requirements.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeRequirement(index)}
                    size="sm"
                    variant="outline"
                  >
                    <X size={14} />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-900 hover:bg-red-800">
              Publicar Vaga
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobPostingForm;
