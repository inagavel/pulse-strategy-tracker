
import React, { useState } from 'react';
import { Shield, ClipboardCheck, AlertTriangle, BarChart3, FileCheck, TrendingUp } from 'lucide-react';
import QualityManager from '../components/Quality/QualityManager';
import AuditManager from '../components/Quality/AuditManager';
import NonConformityManager from '../components/Quality/NonConformityManager';
import QualityIndicators from '../components/Quality/QualityIndicators';
import QualityReports from '../components/Quality/QualityReports';

const Quality = () => {
  const [activeTab, setActiveTab] = useState<'gestao' | 'auditorias' | 'nao-conformidades' | 'indicadores' | 'relatorios'>('gestao');

  const tabs = [
    { id: 'gestao', label: 'Gestão da Qualidade', icon: Shield },
    { id: 'auditorias', label: 'Auditorias', icon: ClipboardCheck },
    { id: 'nao-conformidades', label: 'Não Conformidades', icon: AlertTriangle },
    { id: 'indicadores', label: 'Indicadores', icon: TrendingUp },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">MÓDULO ANÁLISE E QUALIDADE</h1>
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
        {activeTab === 'gestao' && <QualityManager />}
        {activeTab === 'auditorias' && <AuditManager />}
        {activeTab === 'nao-conformidades' && <NonConformityManager />}
        {activeTab === 'indicadores' && <QualityIndicators />}
        {activeTab === 'relatorios' && <QualityReports />}
      </div>
    </div>
  );
};

export default Quality;
