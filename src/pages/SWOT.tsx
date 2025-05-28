
import React, { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, Shield, AlertTriangle } from 'lucide-react';

interface SWOTItem {
  id: string;
  text: string;
  category: 'strengths' | 'weaknesses' | 'opportunities' | 'threats';
}

const SWOT = () => {
  const [swotItems, setSWOTItems] = useState<SWOTItem[]>([
    { id: '1', text: 'Equipe altamente qualificada', category: 'strengths' },
    { id: '2', text: 'Tecnologia inovadora', category: 'strengths' },
    { id: '3', text: 'Processo de vendas lento', category: 'weaknesses' },
    { id: '4', text: 'Recursos limitados de marketing', category: 'weaknesses' },
    { id: '5', text: 'Expansão para novos mercados', category: 'opportunities' },
    { id: '6', text: 'Parcerias estratégicas', category: 'opportunities' },
    { id: '7', text: 'Concorrência crescente', category: 'threats' },
    { id: '8', text: 'Mudanças regulamentares', category: 'threats' },
  ]);

  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'strengths' | 'weaknesses' | 'opportunities' | 'threats'>('strengths');

  const addItem = () => {
    if (newItem.trim()) {
      const item: SWOTItem = {
        id: Date.now().toString(),
        text: newItem,
        category: selectedCategory
      };
      setSWOTItems([...swotItems, item]);
      setNewItem('');
    }
  };

  const removeItem = (id: string) => {
    setSWOTItems(swotItems.filter(item => item.id !== id));
  };

  const getItemsByCategory = (category: string) => {
    return swotItems.filter(item => item.category === category);
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Análise SWOT</h1>
        <p className="text-gray-600 mt-1">Strengths, Weaknesses, Opportunities, Threats</p>
      </div>

      {/* Formulário para adicionar item */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Adicionar Item</h3>
        <div className="flex space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="strengths">Forças</option>
            <option value="weaknesses">Fraquezas</option>
            <option value="opportunities">Oportunidades</option>
            <option value="threats">Ameaças</option>
          </select>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Digite o item..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Adicionar</span>
          </button>
        </div>
      </div>

      {/* Matriz SWOT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {['strengths', 'weaknesses', 'opportunities', 'threats'].map((category) => {
          const config = getCategoryConfig(category);
          const Icon = config.icon;
          const items = getItemsByCategory(category);

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
                    <p className="mt-2">Nenhum item adicionado</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SWOT;
