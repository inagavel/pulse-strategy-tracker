
import React, { useState } from 'react';
import { Plus, Search, FileText, Calculator, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface AccountingEntry {
  id: string;
  data: string;
  conta: string;
  descricao: string;
  debito: number;
  credito: number;
  referencia: string;
}

const AccountingManager = () => {
  const [entries, setEntries] = useState<AccountingEntry[]>([
    {
      id: '1',
      data: '2024-01-15',
      conta: 'Caixa',
      descricao: 'Recebimento de venda',
      debito: 5000,
      credito: 0,
      referencia: 'VND001'
    },
    {
      id: '2',
      data: '2024-01-15',
      conta: 'Receitas de Vendas',
      descricao: 'Venda de produtos',
      debito: 0,
      credito: 5000,
      referencia: 'VND001'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = entries.filter(entry =>
    entry.conta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.descricao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebito = entries.reduce((sum, entry) => sum + entry.debito, 0);
  const totalCredito = entries.reduce((sum, entry) => sum + entry.credito, 0);

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Débito</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              €{totalDebito.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Crédito</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{totalCredito.toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balanceamento</CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              totalDebito === totalCredito ? 'text-green-600' : 'text-red-600'
            }`}>
              {totalDebito === totalCredito ? 'Balanceado' : 'Desbalanceado'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cabeçalho e Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar lançamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-80"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Livro
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Lançamento
          </Button>
        </div>
      </div>

      {/* Livro Diário */}
      <Card>
        <CardHeader>
          <CardTitle>Livro Diário</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Data</th>
                  <th className="text-left py-2">Conta</th>
                  <th className="text-left py-2">Descrição</th>
                  <th className="text-right py-2">Débito (€)</th>
                  <th className="text-right py-2">Crédito (€)</th>
                  <th className="text-left py-2">Referência</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="py-2">{new Date(entry.data).toLocaleDateString()}</td>
                    <td className="py-2 font-medium">{entry.conta}</td>
                    <td className="py-2">{entry.descricao}</td>
                    <td className="py-2 text-right text-red-600">
                      {entry.debito > 0 ? `€${entry.debito.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-2 text-right text-green-600">
                      {entry.credito > 0 ? `€${entry.credito.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-2">{entry.referencia}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 font-bold">
                  <td colSpan={3} className="py-2 text-right">Totais:</td>
                  <td className="py-2 text-right text-red-600">€{totalDebito.toLocaleString()}</td>
                  <td className="py-2 text-right text-green-600">€{totalCredito.toLocaleString()}</td>
                  <td className="py-2"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Plano de Contas */}
      <Card>
        <CardHeader>
          <CardTitle>Plano de Contas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Ativo</h4>
              <ul className="text-sm space-y-1">
                <li>• Caixa</li>
                <li>• Bancos</li>
                <li>• Contas a Receber</li>
                <li>• Estoque</li>
                <li>• Imobilizado</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-red-700 mb-2">Passivo</h4>
              <ul className="text-sm space-y-1">
                <li>• Fornecedores</li>
                <li>• Contas a Pagar</li>
                <li>• Empréstimos</li>
                <li>• Impostos a Pagar</li>
                <li>• Salários a Pagar</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">Patrimônio Líquido</h4>
              <ul className="text-sm space-y-1">
                <li>• Capital Social</li>
                <li>• Reservas</li>
                <li>• Lucros Acumulados</li>
                <li>• Resultado do Exercício</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountingManager;
