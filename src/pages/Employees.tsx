
import React, { useState } from 'react';
import { Plus, Users, Mail, Phone, MapPin, Target, TrendingUp } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  performance: number;
  tasksCompleted: number;
  activeTasks: number;
  okrsAssigned: number;
  joinDate: string;
}

const Employees = () => {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      name: 'João Silva',
      position: 'Gerente de Vendas',
      department: 'Vendas',
      email: 'joao.silva@empresa.com',
      phone: '+351 912 345 678',
      location: 'Lisboa, Portugal',
      avatar: 'JS',
      performance: 92,
      tasksCompleted: 24,
      activeTasks: 5,
      okrsAssigned: 3,
      joinDate: '2023-01-15'
    },
    {
      id: '2',
      name: 'Maria Santos',
      position: 'Especialista em Marketing',
      department: 'Marketing',
      email: 'maria.santos@empresa.com',
      phone: '+351 913 456 789',
      location: 'Porto, Portugal',
      avatar: 'MS',
      performance: 88,
      tasksCompleted: 18,
      activeTasks: 3,
      okrsAssigned: 2,
      joinDate: '2023-03-20'
    },
    {
      id: '3',
      name: 'Pedro Oliveira',
      position: 'Desenvolvedor Senior',
      department: 'Tecnologia',
      email: 'pedro.oliveira@empresa.com',
      phone: '+351 914 567 890',
      location: 'Braga, Portugal',
      avatar: 'PO',
      performance: 95,
      tasksCompleted: 32,
      activeTasks: 7,
      okrsAssigned: 4,
      joinDate: '2022-11-10'
    },
    {
      id: '4',
      name: 'Ana Costa',
      position: 'Analista de RH',
      department: 'Recursos Humanos',
      email: 'ana.costa@empresa.com',
      phone: '+351 915 678 901',
      location: 'Coimbra, Portugal',
      avatar: 'AC',
      performance: 85,
      tasksCompleted: 16,
      activeTasks: 4,
      okrsAssigned: 1,
      joinDate: '2023-07-05'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const filteredEmployees = selectedDepartment === 'all' 
    ? employees 
    : employees.filter(emp => emp.department === selectedDepartment);

  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 bg-green-100';
    if (performance >= 80) return 'text-blue-600 bg-blue-100';
    if (performance >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Colaboradores</h1>
          <p className="text-gray-600 mt-1">Gerencie a equipe e acompanhe o desempenho</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus size={20} />
          <span>Novo Colaborador</span>
        </button>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total de Colaboradores</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Performance Média</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length)}%
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tarefas Ativas</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.reduce((acc, emp) => acc + emp.activeTasks, 0)}
              </p>
            </div>
            <Target className="w-8 h-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Departamentos</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
            <Users className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-700">Departamento:</span>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os Departamentos</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de Colaboradores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {employee.avatar}
              </div>
              
              {/* Informações principais */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-600">{employee.position}</p>
                    <p className="text-sm text-blue-600 font-medium">{employee.department}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceColor(employee.performance)}`}>
                    {employee.performance}% Performance
                  </div>
                </div>

                {/* Informações de contato */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone size={14} />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin size={14} />
                    <span>{employee.location}</span>
                  </div>
                </div>

                {/* Estatísticas */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{employee.tasksCompleted}</p>
                    <p className="text-xs text-gray-600">Tarefas Concluídas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{employee.activeTasks}</p>
                    <p className="text-xs text-gray-600">Tarefas Ativas</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">{employee.okrsAssigned}</p>
                    <p className="text-xs text-gray-600">OKRs Atribuídos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Employees;
