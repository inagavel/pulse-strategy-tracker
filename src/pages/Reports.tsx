
import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Calendar, FileText } from 'lucide-react';
import { exportReportToPDF } from '../utils/pdfExport';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const reportData = {
    okrCompletion: [
      { quarter: 'T1 2024', completed: 85, total: 100 },
      { quarter: 'T4 2023', completed: 78, total: 100 },
      { quarter: 'T3 2023', completed: 92, total: 100 },
    ],
    taskStats: {
      completed: 89,
      inProgress: 12,
      overdue: 5,
      total: 106
    },
    departmentPerformance: [
      { name: 'Vendas', performance: 92, tasks: 34 },
      { name: 'Marketing', performance: 88, tasks: 28 },
      { name: 'Tecnologia', performance: 95, tasks: 42 },
      { name: 'RH', performance: 85, tasks: 16 },
    ],
    employeeMetrics: {
      totalEmployees: 47,
      avgPerformance: 90,
      topPerformers: 8,
      needsImprovement: 3
    }
  };

  const handleExportPDF = () => {
    exportReportToPDF(reportData, selectedPeriod);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600 mt-1">Análise de desempenho e métricas da empresa</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">Esta Semana</option>
            <option value="month">Este Mês</option>
            <option value="quarter">Este Trimestre</option>
            <option value="year">Este Ano</option>
          </select>
          <button 
            onClick={handleExportPDF}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <FileText size={20} />
            <span>Exportar PDF</span>
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Download size={20} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Resumo Executivo */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="text-blue-600" size={24} />
          <span>Resumo Executivo</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">85%</div>
            <div className="text-sm text-gray-600">OKRs Concluídos</div>
            <div className="text-xs text-green-600 mt-1">+7% vs período anterior</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">90%</div>
            <div className="text-sm text-gray-600">Performance Média</div>
            <div className="text-xs text-blue-600 mt-1">+3% vs período anterior</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">106</div>
            <div className="text-sm text-gray-600">Tarefas Totais</div>
            <div className="text-xs text-purple-600 mt-1">84% concluídas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-1">4</div>
            <div className="text-sm text-gray-600">Departamentos</div>
            <div className="text-xs text-orange-600 mt-1">47 funcionários</div>
          </div>
        </div>
      </div>

      {/* Gráficos e Análises */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progresso de OKRs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="text-blue-600" size={24} />
            <span>Progresso de OKRs por Trimestre</span>
          </h3>
          
          <div className="space-y-4">
            {reportData.okrCompletion.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{item.quarter}</span>
                  <span className="text-sm text-gray-500">{item.completed}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${item.completed}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estado das Tarefas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <PieChart className="text-blue-600" size={24} />
            <span>Estado das Tarefas</span>
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Concluídas</span>
              </div>
              <span className="text-sm font-medium">{reportData.taskStats.completed}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Em Andamento</span>
              </div>
              <span className="text-sm font-medium">{reportData.taskStats.inProgress}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Atrasadas</span>
              </div>
              <span className="text-sm font-medium">{reportData.taskStats.overdue}</span>
            </div>
            
            <div className="pt-3 border-t border-gray-100">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-sm text-gray-700">Total</span>
                <span className="text-sm">{reportData.taskStats.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance por Departamento */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance por Departamento</h3>
        
        <div className="space-y-4">
          {reportData.departmentPerformance.map((dept, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{dept.name}</span>
                  <span className="text-sm text-gray-500">{dept.performance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${dept.performance}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{dept.tasks} tarefas activas</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas de Funcionários */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Funcionários</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 mb-1">{reportData.employeeMetrics.totalEmployees}</div>
            <div className="text-sm text-gray-600">Total de Funcionários</div>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-1">{reportData.employeeMetrics.avgPerformance}%</div>
            <div className="text-sm text-gray-600">Performance Média</div>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-1">{reportData.employeeMetrics.topPerformers}</div>
            <div className="text-sm text-gray-600">Top Performers</div>
          </div>
          <div className="text-center p-4 border border-gray-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600 mb-1">{reportData.employeeMetrics.needsImprovement}</div>
            <div className="text-sm text-gray-600">Precisam Melhorar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
