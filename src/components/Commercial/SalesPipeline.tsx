
import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, User, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Opportunity {
  id: string;
  title: string;
  client: string;
  value: number;
  probability: number;
  stage: 'PROSPECCAO' | 'QUALIFICACAO' | 'PROPOSTA' | 'NEGOCIACAO' | 'FECHAMENTO';
  expectedCloseDate: string;
  responsible: string;
  lastActivity: string;
  notes: string;
}

const SalesPipeline = () => {
  const [opportunities] = useState<Opportunity[]>([
    {
      id: '1',
      title: 'Sistema de Gestão - Empresa ABC',
      client: 'João Silva - Empresa ABC',
      value: 350000,
      probability: 80,
      stage: 'NEGOCIACAO',
      expectedCloseDate: '2024-02-15',
      responsible: 'Carlos Mendes',
      lastActivity: '2024-02-03',
      notes: 'Cliente interessado, aguardando aprovação final'
    },
    {
      id: '2',
      title: 'Consultoria Tech Solutions',
      client: 'Maria Santos - Tech Solutions',
      value: 500000,
      probability: 60,
      stage: 'PROPOSTA',
      expectedCloseDate: '2024-02-20',
      responsible: 'Ana Costa',
      lastActivity: '2024-02-02',
      notes: 'Proposta enviada, feedback positivo'
    },
    {
      id: '3',
      title: 'Plataforma E-commerce',
      client: 'Pedro Fernandes - Comércio Geral',
      value: 280000,
      probability: 40,
      stage: 'QUALIFICACAO',
      expectedCloseDate: '2024-02-25',
      responsible: 'João Lopes',
      lastActivity: '2024-02-01',
      notes: 'Reunião de requisitos marcada'
    }
  ]);

  const stages = [
    { id: 'PROSPECCAO', name: 'Prospecção', color: 'bg-gray-200' },
    { id: 'QUALIFICACAO', name: 'Qualificação', color: 'bg-blue-200' },
    { id: 'PROPOSTA', name: 'Proposta', color: 'bg-yellow-200' },
    { id: 'NEGOCIACAO', name: 'Negociação', color: 'bg-orange-200' },
    { id: 'FECHAMENTO', name: 'Fechamento', color: 'bg-green-200' }
  ];

  const getOpportunitiesByStage = (stage: string) => {
    return opportunities.filter(opp => opp.stage === stage);
  };

  const getTotalValueByStage = (stage: string) => {
    return getOpportunitiesByStage(stage).reduce((acc, opp) => acc + opp.value, 0);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600';
    if (probability >= 60) return 'text-yellow-600';
    if (probability >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Pipeline de Vendas</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <DollarSign size={16} />
          Nova Oportunidade
        </Button>
      </div>

      {/* Pipeline Kanban */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
        {stages.map((stage) => {
          const stageOpportunities = getOpportunitiesByStage(stage.id);
          const stageValue = getTotalValueByStage(stage.id);
          
          return (
            <div key={stage.id} className="border border-gray-200 rounded-lg">
              <div className={`${stage.color} p-3 rounded-t-lg border-b border-gray-200`}>
                <h3 className="font-medium text-gray-900">{stage.name}</h3>
                <div className="text-sm text-gray-600">
                  {stageOpportunities.length} oportunidades
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {stageValue.toLocaleString()} Kz
                </div>
              </div>
              
              <div className="p-2 space-y-2 min-h-[400px]">
                {stageOpportunities.map((opportunity) => (
                  <div 
                    key={opportunity.id}
                    className="bg-white border border-gray-200 rounded p-3 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-2">
                      {opportunity.title}
                    </h4>
                    
                    <div className="text-xs text-gray-600 mb-2">
                      {opportunity.client}
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {opportunity.value.toLocaleString()} Kz
                      </span>
                      <span className={`text-xs font-medium ${getProbabilityColor(opportunity.probability)}`}>
                        {opportunity.probability}%
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 mb-2">
                      Previsão: {opportunity.expectedCloseDate}
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Responsável: {opportunity.responsible}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Resumo do Pipeline */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {opportunities.length}
          </div>
          <div className="text-sm text-blue-600">Total de Oportunidades</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {opportunities.reduce((acc, opp) => acc + opp.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-green-600">Valor Total (Kz)</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(opportunities.reduce((acc, opp) => acc + opp.probability, 0) / opportunities.length)}%
          </div>
          <div className="text-sm text-purple-600">Probabilidade Média</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">
            {opportunities.reduce((acc, opp) => acc + (opp.value * opp.probability / 100), 0).toLocaleString()}
          </div>
          <div className="text-sm text-orange-600">Valor Ponderado (Kz)</div>
        </div>
      </div>

      {/* Lista Detalhada */}
      <div className="border border-gray-200 rounded-lg">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-medium text-gray-900">Oportunidades Detalhadas</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-medium text-gray-900">{opportunity.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${stages.find(s => s.id === opportunity.stage)?.color}`}>
                      {stages.find(s => s.id === opportunity.stage)?.name}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                    <div>
                      <div className="text-sm text-gray-500">Cliente</div>
                      <div className="text-sm font-medium text-gray-900">{opportunity.client}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Valor</div>
                      <div className="text-sm font-medium text-gray-900">{opportunity.value.toLocaleString()} Kz</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Probabilidade</div>
                      <div className={`text-sm font-medium ${getProbabilityColor(opportunity.probability)}`}>
                        {opportunity.probability}%
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Previsão de Fechamento</div>
                      <div className="text-sm font-medium text-gray-900">{opportunity.expectedCloseDate}</div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Responsável:</span> {opportunity.responsible}
                  </div>
                  
                  {opportunity.notes && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Notas:</span> {opportunity.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone size={14} />
                    Contactar
                  </Button>
                  <Button size="sm" className="bg-red-900 hover:bg-red-800">
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesPipeline;
