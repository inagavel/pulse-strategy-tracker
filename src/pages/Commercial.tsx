
import React, { useState } from 'react';
import { Plus, TrendingUp, Users, Target, DollarSign, BarChart3, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LeadManager from '../components/Commercial/LeadManager';
import SalesPipeline from '../components/Commercial/SalesPipeline';
import ClientManager from '../components/Commercial/ClientManager';
import CommercialReports from '../components/Commercial/CommercialReports';
import SalesTargets from '../components/Commercial/SalesTargets';

const Commercial = () => {
  const [activeTab, setActiveTab] = useState<'leads' | 'pipeline' | 'clientes' | 'metas' | 'relatorios'>('leads');

  const tabs = [
    { id: 'leads', label: 'Leads', icon: User },
    { id: 'pipeline', label: 'Pipeline de Vendas', icon: TrendingUp },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">MÓDULO COMERCIAL</h1>
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
        {activeTab === 'leads' && <LeadManager />}
        {activeTab === 'pipeline' && <SalesPipeline />}
        {activeTab === 'clientes' && <ClientManager />}
        {activeTab === 'metas' && <SalesTargets />}
        {activeTab === 'relatorios' && <CommercialReports />}
      </div>
    </div>
  );
};

export default Commercial;
