
import React, { useState } from 'react';
import { Download, FileText, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FinancialReports = () => {
  const [selectedReport, setSelectedReport] = useState('dre');

  const reports = [
    { id: 'dre', name: 'DRE - Demonstração de Resultado', icon: BarChart3 },
    { id: 'balanco', name: 'Balanço Patrimonial', icon: PieChart },
    { id: 'fluxo', name: 'Demonstração de Fluxo de Caixa', icon: TrendingUp },
    { id: 'lucros', name: 'Demonstração de Lucros Acumulados', icon: FileText }
  ];

  const dreData = {
    receitasBrutas: 150000,
    deducoes: 15000,
    receitasLiquidas: 135000,
    custoProdutos: 60000,
    lucroBruto: 75000,
    despesasOperacionais: 45000,
    lucroOperacional: 30000,
    receitasFinanceiras: 2000,
    despesasFinanceiras: 5000,
    lucroAntesIR: 27000,
    impostoRenda: 8100,
    lucroLiquido: 18900
  };

  const balancoData = {
    ativo: {
      circulante: {
        caixa: 25000,
        contasReceber: 35000,
        estoques: 20000,
        total: 80000
      },
      naoCirculante: {
        imobilizado: 150000,
        intangivel: 25000,
        total: 175000
      },
      total: 255000
    },
    passivo: {
      circulante: {
        fornecedores: 30000,
        contasPagar: 15000,
        impostos: 8000,
        total: 53000
      },
      naoCirculante: {
        emprestimos: 75000,
        financiamentos: 50000,
        total: 125000
      },
      total: 178000
    },
    patrimonioLiquido: {
      capital: 100000,
      reservas: 15000,
      lucrosAcumulados: -38000,
      total: 77000
    }
  };

  return (
    <div className="space-y-6">
      {/* Seletor de Relatórios */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Card 
              key={report.id}
              className={`cursor-pointer transition-colors ${
                selectedReport === report.id ? 'border-red-900 bg-red-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedReport(report.id)}
            >
              <CardContent className="p-4 text-center">
                <Icon className={`h-8 w-8 mx-auto mb-2 ${
                  selectedReport === report.id ? 'text-red-900' : 'text-gray-600'
                }`} />
                <h3 className="font-medium text-sm">{report.name}</h3>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-2">
          <select className="border rounded px-3 py-2">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option value="anual">Anual</option>
            <option value="trimestral">Trimestral</option>
            <option value="mensal">Mensal</option>
          </select>
        </div>

        <Button>
          <Download className="h-4 w-4 mr-2" />
          Exportar PDF
        </Button>
      </div>

      {/* DRE - Demonstração de Resultado */}
      {selectedReport === 'dre' && (
        <Card>
          <CardHeader>
            <CardTitle>Demonstração de Resultado do Exercício - 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="font-medium">Receitas Brutas</span>
                <span className="text-right">€{dreData.receitasBrutas.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="ml-4">(-) Deduções</span>
                <span className="text-right text-red-600">€{dreData.deducoes.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b font-medium">
                <span>Receitas Líquidas</span>
                <span className="text-right">€{dreData.receitasLiquidas.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="ml-4">(-) Custo dos Produtos</span>
                <span className="text-right text-red-600">€{dreData.custoProdutos.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b font-medium">
                <span>Lucro Bruto</span>
                <span className="text-right text-green-600">€{dreData.lucroBruto.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="ml-4">(-) Despesas Operacionais</span>
                <span className="text-right text-red-600">€{dreData.despesasOperacionais.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b font-medium">
                <span>Lucro Operacional</span>
                <span className="text-right text-green-600">€{dreData.lucroOperacional.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="ml-4">(+) Receitas Financeiras</span>
                <span className="text-right text-green-600">€{dreData.receitasFinanceiras.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="ml-4">(-) Despesas Financeiras</span>
                <span className="text-right text-red-600">€{dreData.despesasFinanceiras.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b font-medium">
                <span>Lucro Antes do IR</span>
                <span className="text-right">€{dreData.lucroAntesIR.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-b">
                <span className="ml-4">(-) Imposto de Renda</span>
                <span className="text-right text-red-600">€{dreData.impostoRenda.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 py-2 border-t-2 border-gray-300 font-bold text-lg">
                <span>Lucro Líquido</span>
                <span className="text-right text-green-600">€{dreData.lucroLiquido.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Balanço Patrimonial */}
      {selectedReport === 'balanco' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>ATIVO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Ativo Circulante</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Caixa e Equivalentes</span>
                      <span>€{balancoData.ativo.circulante.caixa.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Contas a Receber</span>
                      <span>€{balancoData.ativo.circulante.contasReceber.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Estoques</span>
                      <span>€{balancoData.ativo.circulante.estoques.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Circulante</span>
                      <span>€{balancoData.ativo.circulante.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Ativo Não Circulante</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Imobilizado</span>
                      <span>€{balancoData.ativo.naoCirculante.imobilizado.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Intangível</span>
                      <span>€{balancoData.ativo.naoCirculante.intangivel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Não Circulante</span>
                      <span>€{balancoData.ativo.naoCirculante.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg border-t-2 border-gray-300 pt-2">
                  <span>TOTAL DO ATIVO</span>
                  <span>€{balancoData.ativo.total.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>PASSIVO E PATRIMÔNIO LÍQUIDO</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Passivo Circulante</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Fornecedores</span>
                      <span>€{balancoData.passivo.circulante.fornecedores.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Contas a Pagar</span>
                      <span>€{balancoData.passivo.circulante.contasPagar.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impostos a Pagar</span>
                      <span>€{balancoData.passivo.circulante.impostos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Circulante</span>
                      <span>€{balancoData.passivo.circulante.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Passivo Não Circulante</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Empréstimos</span>
                      <span>€{balancoData.passivo.naoCirculante.emprestimos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Financiamentos</span>
                      <span>€{balancoData.passivo.naoCirculante.financiamentos.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Não Circulante</span>
                      <span>€{balancoData.passivo.naoCirculante.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Patrimônio Líquido</h4>
                  <div className="ml-4 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Capital Social</span>
                      <span>€{balancoData.patrimonioLiquido.capital.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Reservas</span>
                      <span>€{balancoData.patrimonioLiquido.reservas.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Lucros Acumulados</span>
                      <span className="text-red-600">€{balancoData.patrimonioLiquido.lucrosAcumulados.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-1">
                      <span>Total Patrimônio Líquido</span>
                      <span>€{balancoData.patrimonioLiquido.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-lg border-t-2 border-gray-300 pt-2">
                  <span>TOTAL PASSIVO + PL</span>
                  <span>€{(balancoData.passivo.total + balancoData.patrimonioLiquido.total).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Outros relatórios podem ser implementados similarmente */}
      {selectedReport === 'fluxo' && (
        <Card>
          <CardHeader>
            <CardTitle>Demonstração de Fluxo de Caixa - Em desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Este relatório será implementado em breve.</p>
          </CardContent>
        </Card>
      )}

      {selectedReport === 'lucros' && (
        <Card>
          <CardHeader>
            <CardTitle>Demonstração de Lucros Acumulados - Em desenvolvimento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">Este relatório será implementado em breve.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FinancialReports;
