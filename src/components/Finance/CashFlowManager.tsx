
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CashFlowItem {
  data: string;
  categoria: string;
  descricao: string;
  entrada: number;
  saida: number;
  saldo: number;
}

const CashFlowManager = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  
  const cashFlowData: CashFlowItem[] = [
    {
      data: '2024-01-01',
      categoria: 'Saldo Inicial',
      descricao: 'Saldo anterior',
      entrada: 0,
      saida: 0,
      saldo: 10000
    },
    {
      data: '2024-01-05',
      categoria: 'Vendas',
      descricao: 'Recebimento de clientes',
      entrada: 15000,
      saida: 0,
      saldo: 25000
    },
    {
      data: '2024-01-10',
      categoria: 'Fornecedores',
      descricao: 'Pagamento de materiais',
      entrada: 0,
      saida: 8000,
      saldo: 17000
    },
    {
      data: '2024-01-15',
      categoria: 'Salários',
      descricao: 'Folha de pagamento',
      entrada: 0,
      saida: 12000,
      saldo: 5000
    },
    {
      data: '2024-01-20',
      categoria: 'Vendas',
      descricao: 'Recebimento de clientes',
      entrada: 20000,
      saida: 0,
      saldo: 25000
    }
  ];

  const totalEntradas = cashFlowData.reduce((sum, item) => sum + item.entrada, 0);
  const totalSaidas = cashFlowData.reduce((sum, item) => sum + item.saida, 0);
  const saldoFinal = totalEntradas - totalSaidas + 10000; // saldo inicial

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entradas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              Kz{totalEntradas.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saídas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              Kz{totalSaidas.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Final</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoFinal >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Kz{saldoFinal.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Variação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(totalEntradas - totalSaidas) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {(totalEntradas - totalSaidas) >= 0 ? '+' : ''}Kz{(totalEntradas - totalSaidas).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="dia">Hoje</option>
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
            <option value="trimestre">Este Trimestre</option>
            <option value="ano">Este Ano</option>
          </select>
        </div>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Fluxo
        </Button>
      </div>

      {/* Fluxo de Caixa Detalhado */}
      <Card>
        <CardHeader>
          <CardTitle>Fluxo de Caixa - Janeiro 2024</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Categoria</th>
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-right py-2">Entradas (Kz)</th>
                  <th className="text-right py-2">Saídas (Kz)</th>
                  <th className="text-right py-2">Saldo (Kz)</th>
                </tr>
              </thead>
              <tbody>
                {cashFlowData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">{new Date(item.data).toLocaleDateString()}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.categoria === 'Vendas' ? 'bg-green-100 text-green-800' :
                        item.categoria === 'Fornecedores' ? 'bg-red-100 text-red-800' :
                        item.categoria === 'Salários' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.categoria}
                      </span>
                    </td>
                    <td className="py-2">{item.descricao}</td>
                    <td className="py-2 text-right text-green-600">
                      {item.entrada > 0 ? `Kz${item.entrada.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-2 text-right text-red-600">
                      {item.saida > 0 ? `Kz${item.saida.toLocaleString()}` : '-'}
                    </td>
                    <td className={`py-2 text-right font-medium ${
                      item.saldo >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      Kz{item.saldo.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Previsão de Fluxo */}
      <Card>
        <CardHeader>
          <CardTitle>Previsão de Fluxo de Caixa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Próximos 7 dias</h4>
              <div className="text-2xl font-bold text-blue-600">Kz32.000</div>
              <p className="text-sm text-gray-600">Saldo previsto</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Próximos 30 dias</h4>
              <div className="text-2xl font-bold text-green-600">Kz45.000</div>
              <p className="text-sm text-gray-600">Saldo previsto</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Próximos 90 dias</h4>
              <div className="text-2xl font-bold text-green-600">Kz78.000</div>
              <p className="text-sm text-gray-600">Saldo previsto</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowManager;
