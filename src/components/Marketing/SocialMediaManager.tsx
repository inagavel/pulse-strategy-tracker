
import React, { useState } from 'react';
import { Plus, Calendar, TrendingUp, Users, Heart, MessageCircle, Share, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

const SocialMediaManager = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      platform: 'Facebook',
      content: 'Conheça nossa nova linha de produtos! #novidade #qualidade',
      scheduledDate: '2024-01-20 14:00',
      status: 'Agendado',
      likes: 0,
      comments: 0,
      shares: 0,
      reach: 0
    },
    {
      id: 2,
      platform: 'Instagram',
      content: 'Behind the scenes do nosso escritório 📸 #trabalho #equipe',
      scheduledDate: '2024-01-19 10:30',
      status: 'Publicado',
      likes: 245,
      comments: 18,
      shares: 12,
      reach: 1850
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const platforms = ['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicado': return 'bg-green-100 text-green-800';
      case 'Agendado': return 'bg-blue-100 text-blue-800';
      case 'Rascunho': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Facebook': return 'bg-blue-600';
      case 'Instagram': return 'bg-pink-600';
      case 'LinkedIn': return 'bg-blue-800';
      case 'Twitter': return 'bg-sky-500';
      case 'YouTube': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Redes Sociais</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Novo Post
        </Button>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Seguidores</p>
                <p className="text-2xl font-bold">12.5K</p>
              </div>
              <Users className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Engagement Rate</p>
                <p className="text-2xl font-bold">4.2%</p>
              </div>
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Posts este mês</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Calendar className="text-purple-600" size={24} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Alcance Total</p>
                <p className="text-2xl font-bold">45.2K</p>
              </div>
              <Eye className="text-orange-600" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Formulário Novo Post */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data e Hora</label>
                <input 
                  type="datetime-local" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
              <Textarea 
                placeholder="O que você quer compartilhar?"
                className="min-h-24"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Imagem/Vídeo</label>
              <input 
                type="file" 
                accept="image/*,video/*"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button variant="outline">Salvar como Rascunho</Button>
              <Button className="bg-red-900 hover:bg-red-800">Agendar Post</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Posts */}
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getPlatformColor(post.platform)}`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.platform}</h3>
                    <p className="text-sm text-gray-500">{post.scheduledDate}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(post.status)}>
                  {post.status}
                </Badge>
              </div>

              <div className="mb-4">
                <p className="text-gray-700">{post.content}</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-1">
                  <Heart size={16} className="text-red-500" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageCircle size={16} className="text-blue-500" />
                  <span className="text-sm">{post.comments}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Share size={16} className="text-green-500" />
                  <span className="text-sm">{post.shares}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye size={16} className="text-purple-500" />
                  <span className="text-sm">{post.reach}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaManager;
