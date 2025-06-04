
import React, { useState } from 'react';
import { Plus, Target, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Budget {
  id: string;
  categoria: string;
  orcado: number;
  realizado: number;
  periodo: string;
  status: 'dentro' | 'atencao' | 'excedido';
}

const BudgetManager = () => {
  const [budgets] = useState<Budget[]>([
    {
      id: '1',
      categoria: 'Marketing',
      orcado: 10000,
      realizado: 7500,
      periodo: 'Janeiro 2024',
      status: 'dentro'
    },
    {
      id: '2',
      categoria: 'Vendas',
      orcado: 25000,
      realizado: 28000,
      periodo: 'Janeiro 2024',
      status: 'excedido'
    },
    {
      id: '3',
      categoria: 'Operações',
      orcado: 15000,
      realizado: 13500,
      periodo: 'Janeiro 2024',
      status: 'atencao'
    },
    {
      id: '4',
      categoria: 'RH',
      orcado: 20000,
      realizado: 18000,
      periodo: 'Janeiro 2024',
      status: 'dentro'
    }
  ]);

  const totalOrcado = budgets.reduce((sum, budget) => sum + budget.orcado, 0);
  const totalRealizado = budgets.reduce((sum, budget) => sum + budget.realizado, 0);
  const percentualGeral = (totalRealizado / totalOrcado) * 100;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'dentro': return 'text-green-600';
      case 'atencao': return 'text-yellow-600';
      case 'excedido': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getProgressColor = (percentual: number) => {
    if (percentual <= 75) return 'bg-green-500';
    if (percentual <= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orçado</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              Kz{totalOrcado.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Realizado</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Kz{totalRealizado.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalRealizado <= totalOrcado ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalRealizado <= totalOrcado ? '-' : '+'}Kz{Math.abs(totalRealizado - totalOrcado).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Execução</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getStatusColor(
              percentualGeral <= 100 ? 'dentro' : 'excedido'
            )}`}>
              {percentualGeral.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded px-3 py-2">
            <option value="janeiro">Janeiro 2024</option>
            <option value="fevereiro">Fevereiro 2024</option>
            <option value="marco">Março 2024</option>
          </select>
        </div>

        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Orçamento
        </Button>
      </div>

      {/* Lista de Orçamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {budgets.map((budget) => {
          const percentual = (budget.realizado / budget.orcado) * 100;
          return (
            <Card key={budget.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{budget.categoria}</CardTitle>
                  {budget.status === 'excedido' && (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Orçado: Kz{budget.orcado.toLocaleString()}</span>
                  <span className={getStatusColor(budget.status)}>
                    Realizado: Kz{budget.realizado.toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Execução</span>
                    <span className={getStatusColor(budget.status)}>
                      {percentual.toFixed(1)}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentual, 100)} 
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between text-xs text-gray-600">
                  <span>{budget.periodo}</span>
                  <span className={`px-2 py-1 rounded ${
                    budget.status === 'dentro' ? 'bg-green-100 text-green-800' :
                    budget.status === 'atencao' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {budget.status === 'dentro' ? 'Dentro do orçamento' :
                     budget.status === 'atencao' ? 'Atenção' : 'Orçamento excedido'}
                  </span>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between">
                    <span>Disponível:</span>
                    <span className={budget.orcado - budget.realizado >= 0 ? 'text-green-600' : 'text-red-600'}>
                      Kz{Math.abs(budget.orcado - budget.realizado).toLocaleString()}
                      {budget.orcado - budget.realizado < 0 && ' (excesso)'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo Geral */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Execução Orçamentária</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {budgets.filter(b => b.status === 'dentro').length}
                </div>
                <div className="text-sm text-gray-600">Dentro do orçamento</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {budgets.filter(b => b.status === 'atencao').length}
                </div>
                <div className="text-sm text-gray-600">Requer atenção</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {budgets.filter(b => b.status === 'excedido').length}
                </div>
                <div className="text-sm text-gray-600">Orçamento excedido</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetManager;
