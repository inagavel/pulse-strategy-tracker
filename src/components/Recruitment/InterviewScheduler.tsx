
import React, { useState } from 'react';
import { Calendar, Clock, Video, MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Interview {
  id: string;
  candidateName: string;
  position: string;
  date: string;
  time: string;
  type: 'PRESENCIAL' | 'ONLINE' | 'TELEFONE';
  location: string;
  interviewer: string;
  status: 'AGENDADA' | 'CONCLUÍDA' | 'CANCELADA' | 'REAGENDAR';
  notes?: string;
}

const InterviewScheduler = () => {
  const [interviews] = useState<Interview[]>([
    {
      id: '1',
      candidateName: 'Miguel Santos',
      position: 'Gestor de Vendas Sénior',
      date: '2024-01-25',
      time: '14:00',
      type: 'PRESENCIAL',
      location: 'Escritório Central - Luanda',
      interviewer: 'João Silva',
      status: 'AGENDADA'
    },
    {
      id: '2',
      candidateName: 'Ana Fernandes',
      position: 'Especialista em Marketing Digital',
      date: '2024-01-26',
      time: '10:30',
      type: 'ONLINE',
      location: 'Google Meet',
      interviewer: 'Maria Santos',
      status: 'AGENDADA'
    },
    {
      id: '3',
      candidateName: 'Carlos Mendes',
      position: 'Gestor de Vendas Sénior',
      date: '2024-01-23',
      time: '16:00',
      type: 'PRESENCIAL',
      location: 'Escritório Central - Luanda',
      interviewer: 'Pedro Oliveira',
      status: 'CONCLUÍDA',
      notes: 'Candidato muito experiente, boa comunicação.'
    }
  ]);

  const getStatusBadge = (status: string) => {
    const styles = {
      'AGENDADA': 'bg-blue-100 text-blue-800',
      'CONCLUÍDA': 'bg-green-100 text-green-800',
      'CANCELADA': 'bg-red-100 text-red-800',
      'REAGENDAR': 'bg-yellow-100 text-yellow-800'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ONLINE':
        return <Video size={14} className="text-blue-600" />;
      case 'PRESENCIAL':
        return <MapPin size={14} className="text-green-600" />;
      case 'TELEFONE':
        return <Clock size={14} className="text-purple-600" />;
      default:
        return null;
    }
  };

  const sortedInterviews = interviews.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Agenda de Entrevistas</h2>
        <Button className="bg-red-900 hover:bg-red-800">
          <Plus size={16} />
          Agendar Entrevista
        </Button>
      </div>

      {/* Calendário de Entrevistas */}
      <div className="grid gap-4">
        {sortedInterviews.map((interview) => (
          <div key={interview.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{interview.candidateName}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(interview.status)}`}>
                    {interview.status}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">{interview.position}</span>
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <span>{interview.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{interview.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {getTypeIcon(interview.type)}
                    <span>{interview.type}</span>
                  </div>
                </div>

                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Local:</span> {interview.location}
                </div>

                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium">Entrevistador:</span> {interview.interviewer}
                </div>

                {interview.notes && (
                  <div className="bg-gray-50 rounded p-2 text-sm text-gray-700">
                    <span className="font-medium">Notas:</span> {interview.notes}
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                {interview.status === 'AGENDADA' && (
                  <>
                    <Button variant="outline" size="sm">
                      Reagendar
                    </Button>
                    <Button variant="outline" size="sm">
                      Cancelar
                    </Button>
                    <Button size="sm" className="bg-red-900 hover:bg-red-800">
                      Iniciar
                    </Button>
                  </>
                )}
                {interview.status === 'CONCLUÍDA' && (
                  <Button variant="outline" size="sm">
                    Ver Avaliação
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estatísticas */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            {interviews.filter(i => i.status === 'AGENDADA').length}
          </div>
          <div className="text-sm text-blue-600">Entrevistas Agendadas</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            {interviews.filter(i => i.status === 'CONCLUÍDA').length}
          </div>
          <div className="text-sm text-green-600">Entrevistas Concluídas</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {interviews.filter(i => i.type === 'ONLINE').length}
          </div>
          <div className="text-sm text-purple-600">Entrevistas Online</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {interviews.filter(i => i.status === 'REAGENDAR').length}
          </div>
          <div className="text-sm text-yellow-600">Para Reagendar</div>
        </div>
      </div>
    </div>
  );
};

export default InterviewScheduler;
