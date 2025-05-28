
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
  PieChart,
  Calendar,
  UserCheck
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: Home },
  { name: 'OKRs', path: '/okrs', icon: Target },
  { name: 'Análise SWOT', path: '/swot', icon: TrendingUp },
  { name: 'Avaliação de Desempenho', path: '/performance', icon: UserCheck },
  { name: 'Gestão de Tarefas', path: '/tasks', icon: CheckSquare },
  { name: 'Colaboradores', path: '/employees', icon: Users },
  { name: 'Relatórios', path: '/reports', icon: BarChart3 },
  { name: 'Configurações', path: '/settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-center">Sistema de Gestão</h1>
        <p className="text-sm text-slate-400 text-center mt-1">Performance & OKRs</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-slate-800 ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-300'
                  }`}
                >
                  <Icon size={20} />
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
