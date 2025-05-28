
import React, { useState } from 'react';
import { Plus, FileText, Users, Calendar, DollarSign, MapPin, Lightbulb, Settings } from 'lucide-react';

interface Plan5W2H {
  id: string;
  title: string;
  what: string;
  why: string;
  where: string;
  when: string;
  who: string;
  how: string;
  howMuch: string;
  type: 'strategic' | 'tactical' | 'operational';
  status: 'planning' | 'in-progress' | 'completed';
  createdAt: string;
}

const Planning = () => {
  const [plans] = useState<Plan5W2H[]>([
    {
      id: '1',
      title: 'Expansão para Novos Mercados',
      what: 'Expandir operações para 3 novos países europeus',
      why: 'Aumentar receita e diversificar base de clientes',
      where: 'França, Alemanha e Espanha',
      when: 'Q2-Q4 2024',
      who: 'Equipe de Expansão Internacional (João Silva, Maria Santos)',
      how: 'Pesquisa de mercado, parcerias locais, setup de escritórios',
      howMuch: '€500.000',
      type: 'strategic',
      status: 'planning',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Implementação CRM',
      what: 'Implementar sistema CRM para gestão de clientes',
      why: 'Melhorar relacionamento com clientes e aumentar vendas',
      where: 'Todos os escritórios',
      when: 'Março-Junho 2024',
      who: 'Equipe de TI e Vendas (Pedro Oliveira, Ana Costa)',
      how: 'Seleção de fornecedor, treinamento, migração de dados',
      howMuch: '€75.000',
      type: 'tactical',
      status: 'in-progress',
      createdAt: '2024-01-20'
    }
  ]);

  const [selectedType, setSelectedType] = useState<'all' | 'strategic' | 'tactical' | 'operational'>('all');

  const filteredPlans = selectedType === 'all' ? plans : plans.filter(plan => plan.type === selectedType);

  const getTypeColor = (type: string) => {
    const colors = {
      strategic: 'bg-purple-100 text-purple-800',
      tactical: 'bg-blue-100 text-blue-800',
      operational: 'bg-green-100 text-green-800'
    };
    return colors[type as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-yellow-100 text-yellow-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Planejamento 5W2H</h1>
          <p className="text-gray-600 mt-1">What, Why, Where, When, Who, How, How Much</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Novo Plano</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex space-x-4">
          {[
            { key: 'all', label: 'Todos' },
            { key: 'strategic', label: 'Estratégico' },
            { key: 'tactical', label: 'Tático' },
            { key: 'operational', label: 'Operacional' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedType(filter.key as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedType === filter.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Planos */}
      <div className="space-y-6">
        {filteredPlans.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <FileText className="text-blue-600" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900">{plan.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(plan.type)}`}>
                    {plan.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 5W */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 border-b pb-2">As 5W</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">What (O que?)</p>
                      <p className="text-sm text-gray-600">{plan.what}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Settings className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Why (Por que?)</p>
                      <p className="text-sm text-gray-600">{plan.why}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Where (Onde?)</p>
                      <p className="text-sm text-gray-600">{plan.where}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">When (Quando?)</p>
                      <p className="text-sm text-gray-600">{plan.when}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Who (Quem?)</p>
                      <p className="text-sm text-gray-600">{plan.who}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2H */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 border-b pb-2">Os 2H</h4>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Settings className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">How (Como?)</p>
                      <p className="text-sm text-gray-600">{plan.how}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <DollarSign className="text-gray-400 mt-1" size={16} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">How Much (Quanto?)</p>
                      <p className="text-sm text-gray-600">{plan.howMuch}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planning;
