import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, User, Shield, Database, Palette, Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [competencies, setCompetencies] = useState([
    'Liderança',
    'Comunicação',
    'Competência Técnica',
    'Trabalho em Equipe',
    'Inovação',
    'Adaptabilidade'
  ]);
  const [newCompetency, setNewCompetency] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState('');

  const tabs = [
    { id: 'general', name: 'Geral', icon: SettingsIcon },
    { id: 'notifications', name: 'Notificações', icon: Bell },
    { id: 'users', name: 'Utilizadores', icon: User },
    { id: 'competencies', name: 'Competências', icon: Shield },
    { id: 'security', name: 'Segurança', icon: Shield },
    { id: 'integrations', name: 'Integrações', icon: Database },
    { id: 'appearance', name: 'Aparência', icon: Palette },
  ];

  const addCompetency = () => {
    if (newCompetency.trim() && !competencies.includes(newCompetency.trim())) {
      setCompetencies([...competencies, newCompetency.trim()]);
      setNewCompetency('');
    }
  };

  const removeCompetency = (index: number) => {
    setCompetencies(competencies.filter((_, i) => i !== index));
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingValue(competencies[index]);
  };

  const saveEdit = () => {
    if (editingIndex !== null && editingValue.trim() && !competencies.includes(editingValue.trim())) {
      const newCompetencies = [...competencies];
      newCompetencies[editingIndex] = editingValue.trim();
      setCompetencies(newCompetencies);
      setEditingIndex(null);
      setEditingValue('');
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingValue('');
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">CONFIGURAÇÕES</h1>
      </div>

      <div className="px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar de navegação */}
          <div className="lg:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Conteúdo principal */}
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Configurações Gerais</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome da Empresa
                    </label>
                    <Input defaultValue="Minha Empresa Ltda" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fuso Horário
                    </label>
                    <Select defaultValue="lisbon">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lisbon">GMT+0 Lisboa</SelectItem>
                        <SelectItem value="madrid">GMT+1 Madrid</SelectItem>
                        <SelectItem value="saopaulo">GMT-3 São Paulo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Idioma
                    </label>
                    <Select defaultValue="pt">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt">Português</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button>
                  Guardar Alterações
                </Button>
              </div>
            )}

            {activeTab === 'competencies' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Configuração de Competências</h2>
                
                <div className="space-y-4">
                  <div className="flex space-x-3">
                    <Input
                      value={newCompetency}
                      onChange={(e) => setNewCompetency(e.target.value)}
                      placeholder="Digite nova competência..."
                      onKeyPress={(e) => e.key === 'Enter' && addCompetency()}
                    />
                    <Button onClick={addCompetency}>
                      <Plus size={16} />
                      <span>Adicionar</span>
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-700">Competências Configuradas:</h3>
                    <div className="space-y-2">
                      {competencies.map((competency, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          {editingIndex === index ? (
                            <div className="flex-1 flex items-center space-x-2">
                              <Input
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                              />
                              <Button onClick={saveEdit} size="sm">
                                Guardar
                              </Button>
                              <Button onClick={cancelEdit} variant="outline" size="sm">
                                Cancelar
                              </Button>
                            </div>
                          ) : (
                            <>
                              <span className="text-gray-700">{competency}</span>
                              <div className="flex items-center space-x-2">
                                <Button
                                  onClick={() => startEditing(index)}
                                  variant="outline"
                                  size="sm"
                                >
                                  <Edit size={16} />
                                </Button>
                                <Button
                                  onClick={() => removeCompetency(index)}
                                  variant="destructive"
                                  size="sm"
                                >
                                  <Trash2 size={16} />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Dica:</strong> As competências configuradas aqui serão utilizadas nas avaliações de desempenho dos funcionários.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Notificações</h2>
                
                <div className="space-y-4">
                  {[
                    { name: 'Notificações de OKRs', description: 'Receber alertas sobre progresso de OKRs' },
                    { name: 'Tarefas Atrasadas', description: 'Alertas para tarefas em atraso' },
                    { name: 'Relatórios Semanais', description: 'Resumo semanal por email' },
                    { name: 'Novos Colaboradores', description: 'Notificar quando novos usuários se juntam' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Gestão de Usuários</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Permitir auto-registro</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Domínio de email permitido
                    </label>
                    <Input
                      type="text"
                      placeholder="@empresa.com"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Função padrão para novos usuários
                    </label>
                    <Select defaultValue="colaborador">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="colaborador">Colaborador</SelectItem>
                        <SelectItem value="gestor">Gestor</SelectItem>
                        <SelectItem value="administrador">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Segurança</h2>
                
                <div className="space-y-4">
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-yellow-800 mb-2">Autenticação de Dois Fatores</h3>
                    <p className="text-sm text-yellow-700 mb-3">
                      Recomendamos ativar a autenticação de dois fatores para maior segurança.
                    </p>
                    <Button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                      Configurar 2FA
                    </Button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Política de senhas
                    </label>
                    <Select defaultValue="media">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simples">Simples (8 caracteres)</SelectItem>
                        <SelectItem value="media">Média (8 caracteres + números)</SelectItem>
                        <SelectItem value="forte">Forte (8 caracteres + números + símbolos)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiração de sessão (horas)
                    </label>
                    <Input
                      type="number"
                      defaultValue="24"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Integrações</h2>
                
                <div className="space-y-4">
                  {[
                    { name: 'Slack', description: 'Integração com Slack para notificações', connected: true },
                    { name: 'Microsoft Teams', description: 'Notificações e updates via Teams', connected: false },
                    { name: 'Google Calendar', description: 'Sincronização de prazos e reuniões', connected: true },
                    { name: 'Trello', description: 'Importar tarefas do Trello', connected: false },
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                      <button
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          integration.connected
                            ? 'bg-red-600 text-white hover:bg-red-700'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {integration.connected ? 'Desconectar' : 'Conectar'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Aparência</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tema
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {['Claro', 'Escuro', 'Auto'].map((theme) => (
                        <button
                          key={theme}
                          className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
                        >
                          <div className="text-center">
                            <div className={`w-full h-8 rounded mb-2 ${
                              theme === 'Claro' ? 'bg-white border' :
                              theme === 'Escuro' ? 'bg-gray-900' : 'bg-gradient-to-r from-white to-gray-900'
                            }`}></div>
                            <span className="text-sm font-medium">{theme}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cor de destaque
                    </label>
                    <div className="flex space-x-2">
                      {['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-600', 'bg-yellow-600'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${color} border-2 border-white shadow-md hover:scale-110 transition-transform`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
