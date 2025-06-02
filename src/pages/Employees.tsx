import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import EmployeeForm from '../components/Performance/EmployeeForm';

interface Employee {
  id: string;
  codigo: string;
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
  gender: string;
  status: string;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      codigo: 'EMP001',
      name: 'João Silva',
      position: 'Gestor de Vendas',
      department: 'Vendas',
      email: 'joao.silva@empresa.com',
      phone: '+244 923 456 789',
      location: 'Luanda, Angola',
      avatar: 'JS',
      performance: 92,
      tasksCompleted: 24,
      activeTasks: 5,
      okrsAssigned: 3,
      joinDate: '2023-01-15',
      gender: 'Masculino',
      status: 'ACTIVADO'
    },
    {
      id: '2',
      codigo: 'EMP002',
      name: 'Maria Santos',
      position: 'Especialista em Marketing',
      department: 'Marketing',
      email: 'maria.santos@empresa.com',
      phone: '+244 934 567 890',
      location: 'Benguela, Angola',
      avatar: 'MS',
      performance: 88,
      tasksCompleted: 18,
      activeTasks: 3,
      okrsAssigned: 2,
      joinDate: '2023-03-20',
      gender: 'Feminino',
      status: 'ACTIVADO'
    },
    {
      id: '3',
      codigo: 'EMP003',
      name: 'Pedro Oliveira',
      position: 'Programador Sénior',
      department: 'Tecnologia',
      email: 'pedro.oliveira@empresa.com',
      phone: '+244 945 678 901',
      location: 'Huambo, Angola',
      avatar: 'PO',
      performance: 95,
      tasksCompleted: 32,
      activeTasks: 7,
      okrsAssigned: 4,
      joinDate: '2022-11-10',
      gender: 'Masculino',
      status: 'ACTIVADO'
    },
    {
      id: '4',
      codigo: 'EMP004',
      name: 'Ana Costa',
      position: 'Analista de RH',
      department: 'Recursos Humanos',
      email: 'ana.costa@empresa.com',
      phone: '+244 956 789 012',
      location: 'Lobito, Angola',
      avatar: 'AC',
      performance: 85,
      tasksCompleted: 16,
      activeTasks: 4,
      okrsAssigned: 1,
      joinDate: '2023-07-05',
      gender: 'Feminino',
      status: 'ACTIVADO'
    }
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ACTIVADO');
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);

  const filteredEmployees = employees.filter(emp => {
    const matchesDepartment = !selectedDepartment || emp.department === selectedDepartment;
    const matchesStatus = !selectedStatus || emp.status === selectedStatus;
    return matchesDepartment && matchesStatus;
  });

  const departments = Array.from(new Set(employees.map(emp => emp.department)));

  const handleNewEmployee = (newEmployeeData: any) => {
    // Generate avatar initials from name
    const nameParts = newEmployeeData.name.split(' ');
    const avatar = nameParts.length >= 2 
      ? nameParts[0][0] + nameParts[1][0] 
      : nameParts[0][0] + (nameParts[0][1] || '');

    const newEmployee: Employee = {
      id: Date.now().toString(),
      codigo: newEmployeeData.codigo,
      name: newEmployeeData.name,
      position: newEmployeeData.position,
      department: newEmployeeData.department,
      email: newEmployeeData.email,
      phone: newEmployeeData.phone || '',
      location: newEmployeeData.location || '',
      avatar: avatar.toUpperCase(),
      performance: Math.floor(Math.random() * 20) + 80,
      tasksCompleted: Math.floor(Math.random() * 20) + 5,
      activeTasks: Math.floor(Math.random() * 8) + 2,
      okrsAssigned: Math.floor(Math.random() * 3) + 1,
      joinDate: newEmployeeData.startDate,
      gender: newEmployeeData.gender,
      status: newEmployeeData.status
    };

    setEmployees([...employees, newEmployee]);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-xl font-medium text-blue-600 uppercase tracking-wide">LISTA DE COLABORADORES</h1>
      </div>

      <div className="px-6 py-4">
        <button 
          onClick={() => setShowEmployeeForm(true)}
          className="bg-red-900 text-white px-4 py-2 rounded text-sm hover:bg-red-800 transition-colors flex items-center space-x-2 mb-6"
        >
          <Plus size={16} />
          <span>Adicionar Colaborador</span>
        </button>

        {/* Filtros */}
        <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
          <h3 className="font-medium text-gray-700 mb-3 uppercase">FILTROS</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Vínculos</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ACTIVADO">ACTIVADO</option>
                <option value="DESACTIVADO">DESACTIVADO</option>
                <option value="">Todos</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Departamentos</label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Todos os Departamentos</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="bg-red-900 text-white px-4 py-2 rounded text-sm hover:bg-red-800 transition-colors flex items-center space-x-2">
                <Search size={16} />
                <span>Pesquisar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">CÓDIGO</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">NOME</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">TELEFONE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">EMAIL</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">GÉNERO</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase">ACÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Nenhum colaborador encontrado
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.codigo}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.phone}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{employee.gender}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Paginação */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-500">
            {filteredEmployees.length} de {employees.length}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Itens por página:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm">
              <option>5</option>
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>

      <EmployeeForm
        isOpen={showEmployeeForm}
        onClose={() => setShowEmployeeForm(false)}
        onSubmit={handleNewEmployee}
      />
    </div>
  );
};

export default Employees;
