
import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Shield, AlertTriangle, Edit, Trash2, Filter, Target, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface SWOTItem {
  id: string;
  text: string;
  category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats';
}

interface SWOTAnalysis {
  id: string;
  name: string;
  department: string;
  description: string;
  createdAt: string;
  items: SWOTItem[];
}

interface SWOTFormData {
  name: string;
  department: string;
  description: string;
}

const SWOT = () => {
  const { toast } = useToast();
  const [swotAnalyses, setSWOTAnalyses] = useState<SWOTAnalysis[]>([
    {
      id: '1',
      name: 'Análise Q4 2024',
      department: 'Marketing',
      description: 'Análise SWOT do departamento de Marketing para Q4 2024',
      createdAt: '2024-01-15',
      items: [
        { id: '1', text: 'Equipe altamente qualificada', category: 'strengths' },
        { id: '2', text: 'Tecnologia inovadora', category: 'strengths' },
        { id: '3', text: 'Processo de vendas lento', category: 'weaknesses' },
        { id: '4', text: 'Recursos limitados de marketing', category: 'weaknesses' },
        { id: '5', text: 'Expansão para novos mercados', category: 'opportunities' },
        { id: '6', text: 'Parcerias estratégicas', category: 'opportunities' },
        { id: '7', text: 'Concorrência crescente', category: 'threats' },
        { id: '8', text: 'Mudanças regulamentares', category: 'threats' },
      ]
    },
    {
      id: '2',
      name: 'Análise Vendas 2024',
      department: 'Sales',
      description: 'Análise SWOT do departamento de Vendas',
      createdAt: '2024-01-10',
      items: [
        { id: '9', text: 'Time experiente', category: 'strengths' },
        { id: '10', text: 'Boa relação com clientes', category: 'strengths' },
        { id: '11', text: 'Sistema CRM desatualizado', category: 'weaknesses' },
        { id: '12', text: 'Mercado em crescimento', category: 'opportunities' },
        { id: '13', text: 'Novos concorrentes', category: 'threats' },
      ]
    }
  ]);

  const [selectedAnalysis, setSelectedAnalysis] = useState<SWOTAnalysis | null>(swotAnalyses[0]);
  const [filterDepartment, setFilterDepartment] = useState<string>('all');
  const [filterStrategy, setFilterStrategy] = useState<string>('all');
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats'>('strengths');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnalysis, setEditingAnalysis] = useState<SWOTAnalysis | null>(null);

  const form = useForm<SWOTFormData>({
    defaultValues: {
      name: '',
      department: '',
      description: ''
    }
  });

  const departments = ['Marketing', 'Sales', 'IT', 'HR', 'Finance', 'Operations'];

  const filteredAnalyses = swotAnalyses.filter(analysis => {
    if (filterDepartment !== 'all' && analysis.department !== filterDepartment) {
      return false;
    }
    return true;
  });

  const addItem = () => {
    if (newItem.trim() && selectedAnalysis) {
      const item: SWOTItem = {
        id: Date.now().toString(),
        text: newItem,
        category: selectedCategory
      };
      
      const updatedAnalyses = swotAnalyses.map(analysis => 
        analysis.id === selectedAnalysis.id 
          ? { ...analysis, items: [...analysis.items, item] }
          : analysis
      );
      
      setSWOTAnalyses(updatedAnalyses);
      setSelectedAnalysis({ ...selectedAnalysis, items: [...selectedAnalysis.items, item] });
      setNewItem('');
      
      toast({
        title: "Item adicionado",
        description: "Item SWOT adicionado com sucesso!"
      });
    }
  };

  const removeItem = (itemId: string) => {
    if (selectedAnalysis) {
      const updatedAnalyses = swotAnalyses.map(analysis => 
        analysis.id === selectedAnalysis.id 
          ? { ...analysis, items: analysis.items.filter(item => item.id !== itemId) }
          : analysis
      );
      
      setSWOTAnalyses(updatedAnalyses);
      setSelectedAnalysis({ ...selectedAnalysis, items: selectedAnalysis.items.filter(item => item.id !== itemId) });
      
      toast({
        title: "Item removido",
        description: "Item SWOT removido com sucesso!"
      });
    }
  };

  const onSubmit = (data: SWOTFormData) => {
    if (editingAnalysis) {
      const updatedAnalyses = swotAnalyses.map(analysis => 
        analysis.id === editingAnalysis.id 
          ? { ...analysis, ...data }
          : analysis
      );
      setSWOTAnalyses(updatedAnalyses);
      setSelectedAnalysis({ ...editingAnalysis, ...data });
      
      toast({
        title: "Análise atualizada",
        description: "Análise SWOT atualizada com sucesso!"
      });
    } else {
      const newAnalysis: SWOTAnalysis = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString().split('T')[0],
        items: []
      };
      
      setSWOTAnalyses([...swotAnalyses, newAnalysis]);
      setSelectedAnalysis(newAnalysis);
      
      toast({
        title: "Análise criada",
        description: "Nova análise SWOT criada com sucesso!"
      });
    }
    
    form.reset();
    setIsDialogOpen(false);
    setEditingAnalysis(null);
  };

  const deleteAnalysis = (analysisId: string) => {
    const updatedAnalyses = swotAnalyses.filter(analysis => analysis.id !== analysisId);
    setSWOTAnalyses(updatedAnalyses);
    
    if (selectedAnalysis?.id === analysisId) {
      setSelectedAnalysis(updatedAnalyses[0] || null);
    }
    
    toast({
      title: "Análise removida",
      description: "Análise SWOT removida com sucesso!"
    });
  };

  const openEditDialog = (analysis: SWOTAnalysis) => {
    setEditingAnalysis(analysis);
    form.reset({
      name: analysis.name,
      department: analysis.department,
      description: analysis.description
    });
    setIsDialogOpen(true);
  };

  const getItemsByCategory = (category: string) => {
    if (!selectedAnalysis) return [];
    return selectedAnalysis.items.filter(item => item.category === category);
  };

  const getFilteredItemsByStrategy = (category: string) => {
    const items = getItemsByCategory(category);
    
    if (filterStrategy === 'so' && (category === 'strengths' || category === 'opportunities')) {
      return items;
    }
    if (filterStrategy === 'wo' && (category === 'weaknesses' || category === 'opportunities')) {
      return items;
    }
    if (filterStrategy === 'all') {
      return items;
    }
    
    return filterStrategy === 'all' ? items : [];
  };

  const getCategoryConfig = (category: string) => {
    const configs = {
      strengths: {
        title: 'Forças',
        icon: TrendingUp,
        color: 'border-green-200 bg-green-50',
        headerColor: 'bg-green-600 text-white',
        iconColor: 'text-green-600'
      },
      weaknesses: {
        title: 'Fraquezas',
        icon: TrendingDown,
        color: 'border-red-200 bg-red-50',
        headerColor: 'bg-red-600 text-white',
        iconColor: 'text-red-600'
      },
      opportunities: {
        title: 'Oportunidades',
        icon: Shield,
        color: 'border-blue-200 bg-blue-50',
        headerColor: 'bg-blue-600 text-white',
        iconColor: 'text-blue-600'
      },
      threats: {
        title: 'Ameaças',
        icon: AlertTriangle,
        color: 'border-yellow-200 bg-yellow-50',
        headerColor: 'bg-yellow-600 text-white',
        iconColor: 'text-yellow-600'
      }
    };
    return configs[category as keyof typeof configs];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Análise SWOT</h1>
          <p className="text-gray-600 mt-1">Strengths, Weaknesses, Opportunities, Threats</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus size={20} />
              <span>Nova Análise</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAnalysis ? 'Editar Análise SWOT' : 'Nova Análise SWOT'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da Análise</FormLabel>
                      <FormControl>
                        <input 
                          {...field} 
                          placeholder="Ex: Análise Q1 2024"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="department"
                  rules={{ required: "Departamento é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departamento</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o departamento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder="Descrição da análise..."
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit">
                    {editingAnalysis ? 'Atualizar' : 'Criar'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center space-x-2">
            <Filter size={16} />
            <span className="text-sm font-medium">Filtros:</span>
          </div>
          
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Departamentos</SelectItem>
              {departments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStrategy} onValueChange={setFilterStrategy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estratégia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Estratégias</SelectItem>
              <SelectItem value="so">SO (Forças-Oportunidades)</SelectItem>
              <SelectItem value="wo">WO (Fraquezas-Oportunidades)</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            variant="outline" 
            onClick={() => {
              setFilterDepartment('all');
              setFilterStrategy('all');
            }}
            size="sm"
          >
            Limpar Filtros
          </Button>
        </div>
      </div>

      {/* Lista de Análises */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Análises SWOT</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAnalyses.map((analysis) => (
            <div key={analysis.id} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedAnalysis?.id === analysis.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1" onClick={() => setSelectedAnalysis(analysis)}>
                  <h4 className="font-semibold text-gray-900">{analysis.name}</h4>
                  <p className="text-sm text-gray-600">{analysis.department}</p>
                  <p className="text-xs text-gray-500 mt-1">{analysis.description}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">⋮</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedAnalysis(analysis)}>
                      <Eye size={16} className="mr-2" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditDialog(analysis)}>
                      <Edit size={16} className="mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => deleteAnalysis(analysis.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={16} className="mr-2" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{analysis.items.length} itens</span>
                <span>{new Date(analysis.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedAnalysis && (
        <>
          {/* Formulário para adicionar item */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Adicionar Item - {selectedAnalysis.name}
            </h3>
            <div className="flex space-x-4">
              <Select value={selectedCategory} onValueChange={(value: any) => setSelectedCategory(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strengths">Forças</SelectItem>
                  <SelectItem value="weaknesses">Fraquezas</SelectItem>
                  <SelectItem value="opportunities">Oportunidades</SelectItem>
                  <SelectItem value="threats">Ameaças</SelectItem>
                </SelectContent>
              </Select>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Digite o item..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
              />
              <Button onClick={addItem} className="flex items-center space-x-2">
                <Plus size={20} />
                <span>Adicionar</span>
              </Button>
            </div>
          </div>

          {/* Matriz SWOT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {['strengths', 'weaknesses', 'opportunities', 'threats'].map((category) => {
              const config = getCategoryConfig(category);
              const Icon = config.icon;
              const items = getFilteredItemsByStrategy(category);

              return (
                <div key={category} className={`border-2 rounded-lg ${config.color}`}>
                  <div className={`p-4 rounded-t-lg ${config.headerColor}`}>
                    <div className="flex items-center space-x-2">
                      <Icon size={24} />
                      <h3 className="text-lg font-semibold">{config.title}</h3>
                      <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">
                        {items.length}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-2 min-h-[200px]">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex justify-between items-center"
                      >
                        <span className="text-sm text-gray-700">{item.text}</span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div className="text-center text-gray-400 py-8">
                        <Icon size={48} className={config.iconColor} />
                        <p className="mt-2">Nenhum item {filterStrategy !== 'all' ? 'na estratégia selecionada' : 'adicionado'}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default SWOT;
