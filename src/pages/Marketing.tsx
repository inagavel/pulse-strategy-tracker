
import React, { useState } from 'react';
import { Megaphone, Share2, FileText, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import CampaignManager from '../components/Marketing/CampaignManager';
import SocialMediaManager from '../components/Marketing/SocialMediaManager';
import ContentManager from '../components/Marketing/ContentManager';
import EventManager from '../components/Marketing/EventManager';
import MarketingReports from '../components/Marketing/MarketingReports';

const Marketing = () => {
  const [activeTab, setActiveTab] = useState<'campanhas' | 'social' | 'conteudo' | 'eventos' | 'relatorios'>('campanhas');

  const tabs = [
    { id: 'campanhas', label: 'Campanhas', icon: Megaphone },
    { id: 'social', label: 'Redes Sociais', icon: Share2 },
    { id: 'conteudo', label: 'Gestão de Conteúdo', icon: FileText },
    { id: 'eventos', label: 'Eventos', icon: Calendar },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">MÓDULO COMUNICAÇÃO E MARKETING</h1>
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
        {activeTab === 'campanhas' && <CampaignManager />}
        {activeTab === 'social' && <SocialMediaManager />}
        {activeTab === 'conteudo' && <ContentManager />}
        {activeTab === 'eventos' && <EventManager />}
        {activeTab === 'relatorios' && <MarketingReports />}
      </div>
    </div>
  );
};

export default Marketing;
