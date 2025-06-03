
import React, { useState } from 'react';
import { Calculator, TrendingUp, FileText, BarChart3, PieChart, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FinancialManager from '../components/Finance/FinancialManager';
import AccountingManager from '../components/Finance/AccountingManager';
import CashFlowManager from '../components/Finance/CashFlowManager';
import FinancialReports from '../components/Finance/FinancialReports';
import BudgetManager from '../components/Finance/BudgetManager';

const Finance = () => {
  const [activeTab, setActiveTab] = useState<'gestao' | 'contabilidade' | 'fluxo' | 'orcamento' | 'relatorios'>('gestao');

  const tabs = [
    { id: 'gestao', label: 'Gestão Financeira', icon: DollarSign },
    { id: 'contabilidade', label: 'Contabilidade', icon: Calculator },
    { id: 'fluxo', label: 'Fluxo de Caixa', icon: TrendingUp },
    { id: 'orcamento', label: 'Orçamentos', icon: PieChart },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">MÓDULO CONTABILIDADE FINANCEIRA</h1>
      </div>

      {/* Navegação por Tabs */}
      <div className="border-b border-gray-200 bg-white px-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-red-900 text-red-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-6 py-6">
        {activeTab === 'gestao' && <FinancialManager />}
        {activeTab === 'contabilidade' && <AccountingManager />}
        {activeTab === 'fluxo' && <CashFlowManager />}
        {activeTab === 'orcamento' && <BudgetManager />}
        {activeTab === 'relatorios' && <FinancialReports />}
      </div>
    </div>
  );
};

export default Finance;
