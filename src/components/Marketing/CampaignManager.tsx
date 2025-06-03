
import React, { useState } from 'react';
import { Plus, Search, Filter, Play, Pause, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Campanha Verão 2024',
      type: 'Email Marketing',
      status: 'Ativa',
      budget: 5000,
      spent: 3200,
      impressions: 45000,
      clicks: 1200,
      conversions: 85,
      startDate: '2024-01-15',
      endDate: '2024-03-15'
    },
    {
      id: 2,
      name: 'Promoção Black Friday',
      type: 'Google Ads',
      status: 'Pausada',
      budget: 8000,
      spent: 4500,
      impressions: 120000,
      clicks: 3500,
      conversions: 280,
      startDate: '2024-02-01',
      endDate: '2024-02-28'
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativa': return 'bg-green-100 text-green-800';
      case 'Pausada': return 'bg-yellow-100 text-yellow-800';
      case 'Finalizada': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Campanhas</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Nova Campanha
        </Button>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Buscar campanhas..." 
              className="pl-10"
            />
          </div>
        </div>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filtros
        </Button>
      </div>

      {/* Formulário Nova Campanha */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Nova Campanha</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Campanha</label>
                <Input placeholder="Ex: Campanha Primavera 2024" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Campanha</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  <option>Email Marketing</option>
                  <option>Google Ads</option>
                  <option>Facebook Ads</option>
                  <option>Instagram Ads</option>
                  <option>LinkedIn Ads</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Orçamento</label>
                <Input type="number" placeholder="0.00" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button className="bg-red-900 hover:bg-red-800">Criar Campanha</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Campanhas */}
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">{campaign.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(campaign.status)}>
                    {campaign.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    {campaign.status === 'Ativa' ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Orçamento</p>
                  <p className="text-lg font-medium">€{campaign.budget.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gasto</p>
                  <p className="text-lg font-medium">€{campaign.spent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Impressões</p>
                  <p className="text-lg font-medium">{campaign.impressions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Conversões</p>
                  <p className="text-lg font-medium">{campaign.conversions}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Orçamento utilizado</span>
                  <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                </div>
                <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignManager;
