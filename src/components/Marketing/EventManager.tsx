
import React, { useState } from 'react';
import { Plus, Calendar, MapPin, Users, Clock, Edit, Trash2, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EventManager = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Workshop de Marketing Digital',
      type: 'Workshop',
      date: '2024-02-15',
      time: '14:00',
      location: 'Auditório Principal',
      capacity: 50,
      registered: 32,
      status: 'Confirmado',
      description: 'Workshop sobre as últimas tendências em marketing digital'
    },
    {
      id: 2,
      title: 'Webinar: Estratégias de Conteúdo',
      type: 'Webinar',
      date: '2024-02-20',
      time: '16:00',
      location: 'Online',
      capacity: 100,
      registered: 78,
      status: 'Em Breve',
      description: 'Como criar conteúdo que engaja e converte'
    },
    {
      id: 3,
      title: 'Feira de Negócios 2024',
      type: 'Feira',
      date: '2024-03-10',
      time: '09:00',
      location: 'Centro de Convenções',
      capacity: 200,
      registered: 145,
      status: 'Confirmado',
      description: 'A maior feira de negócios da região'
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const eventTypes = ['Workshop', 'Webinar', 'Seminário', 'Feira', 'Conferência', 'Networking'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmado': return 'bg-green-100 text-green-800';
      case 'Em Breve': return 'bg-blue-100 text-blue-800';
      case 'Cancelado': return 'bg-red-100 text-red-800';
      case 'Concluído': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Eventos</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Métricas de Eventos */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Eventos este mês</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Calendar className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Participantes</p>
                <p className="text-2xl font-bold">255</p>
              </div>
              <Users className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Taxa de Ocupação</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <MapPin className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Próximos Eventos</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Clock className="text-orange-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário Novo Evento */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Evento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título do Evento</label>
                <Input placeholder="Ex: Workshop de Marketing Digital" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Evento</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {eventTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <Input type="date" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                <Input type="time" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Local</label>
                <Input placeholder="Ex: Auditório Principal" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Capacidade</label>
                <Input type="number" placeholder="50" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-24"
                placeholder="Descrição do evento..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button className="bg-red-900 hover:bg-red-800">Criar Evento</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Eventos */}
      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.type}</p>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Data</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Horário</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Local</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Inscritos</p>
                    <p className="font-medium">{event.registered}/{event.capacity}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventManager;
