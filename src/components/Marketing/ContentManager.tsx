
import React, { useState } from 'react';
import { Plus, FileText, Image, Video, Download, Eye, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ContentManager = () => {
  const [contents, setContents] = useState([
    {
      id: 1,
      title: 'Guia Completo de Marketing Digital',
      type: 'Blog Post',
      category: 'Educacional',
      status: 'Publicado',
      author: 'Maria Silva',
      createdDate: '2024-01-15',
      views: 1250,
      downloads: 0
    },
    {
      id: 2,
      title: 'Infográfico - Tendências 2024',
      type: 'Infográfico',
      category: 'Visual',
      status: 'Em Revisão',
      author: 'João Santos',
      createdDate: '2024-01-18',
      views: 0,
      downloads: 85
    },
    {
      id: 3,
      title: 'Vídeo Institucional',
      type: 'Vídeo',
      category: 'Institucional',
      status: 'Rascunho',
      author: 'Ana Costa',
      createdDate: '2024-01-20',
      views: 0,
      downloads: 0
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const contentTypes = ['Blog Post', 'E-book', 'Infográfico', 'Vídeo', 'Podcast', 'Case Study'];
  const categories = ['Educacional', 'Visual', 'Institucional', 'Promocional', 'Técnico'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Publicado': return 'bg-green-100 text-green-800';
      case 'Em Revisão': return 'bg-yellow-100 text-yellow-800';
      case 'Rascunho': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Blog Post': return <FileText size={16} />;
      case 'Infográfico': return <Image size={16} />;
      case 'Vídeo': return <Video size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Gestão de Conteúdo</h2>
        <Button onClick={() => setShowForm(!showForm)} className="bg-red-900 hover:bg-red-800">
          <Plus size={16} className="mr-2" />
          Novo Conteúdo
        </Button>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Buscar conteúdo..." 
              className="pl-10"
            />
          </div>
        </div>
        <select className="border border-gray-300 rounded-md px-3 py-2">
          <option value="">Todos os tipos</option>
          {contentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select className="border border-gray-300 rounded-md px-3 py-2">
          <option value="">Todas as categorias</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <Button variant="outline">
          <Filter size={16} className="mr-2" />
          Filtros
        </Button>
      </div>

      {/* Formulário Novo Conteúdo */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Novo Conteúdo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <Input placeholder="Ex: Guia de Marketing Digital" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Conteúdo</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {contentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Autor</label>
                <Input placeholder="Nome do autor" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea 
                className="w-full border border-gray-300 rounded-md px-3 py-2 min-h-24"
                placeholder="Descrição do conteúdo..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arquivo</label>
              <input 
                type="file" 
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button variant="outline">Salvar como Rascunho</Button>
              <Button className="bg-red-900 hover:bg-red-800">Criar Conteúdo</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Conteúdos */}
      <div className="grid gap-4">
        {contents.map((content) => (
          <Card key={content.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTypeIcon(content.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{content.title}</h3>
                    <p className="text-sm text-gray-500">{content.type} • {content.category}</p>
                    <p className="text-sm text-gray-500">Por {content.author} • {content.createdDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(content.status)}>
                    {content.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Visualizações</p>
                  <p className="text-lg font-medium">{content.views.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Downloads</p>
                  <p className="text-lg font-medium">{content.downloads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentManager;
