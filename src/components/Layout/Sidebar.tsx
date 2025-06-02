
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  CheckSquare, 
  Users, 
  FileText, 
  Settings,
  Home,
  UserCheck,
  MapPin,
  Calendar,
  ClipboardList
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'Assiduidade', path: '/attendance', icon: UserCheck },
  { name: 'Salários', path: '/salaries', icon: FileText },
  { name: 'Férias', path: '/holidays', icon: Calendar },
  { name: 'Utilizadores', path: '/users', icon: Users },
  { name: 'Colaboradores', path: '/employees', icon: Users },
  { name: 'Assiduidade', path: '/attendance-management', icon: ClipboardList },
  { name: 'Presenças', path: '/presences', icon: MapPin },
  { name: 'Aprovações', path: '/approvals', icon: CheckSquare },
  { name: 'Férias', path: '/vacation', icon: Calendar },
  { name: 'Calendário', path: '/calendar', icon: Calendar },
  { name: 'Aprovações', path: '/final-approvals', icon: CheckSquare },
  { name: 'Disponibilização', path: '/availability', icon: ClipboardList },
  { name: 'OKRs', path: '/okrs', icon: Target },
  { name: 'Análise SWOT', path: '/swot', icon: TrendingUp },
  { name: 'Avaliação de Desempenho', path: '/performance', icon: UserCheck },
  { name: 'Gestão de Tarefas', path: '/tasks', icon: CheckSquare },
  { name: 'Relatórios', path: '/reports', icon: BarChart3 },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Users size={16} className="text-gray-600" />
          </div>
          <div>
            <div className="font-medium text-sm text-gray-900">admin</div>
            <div className="text-xs text-gray-500">admin@ksolid.com</div>
          </div>
        </div>
      </div>
      
      <nav className="p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
