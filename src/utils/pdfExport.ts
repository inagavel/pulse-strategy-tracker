
import jsPDF from 'jspdf';

export const exportReportToPDF = (reportData: any, period: string) => {
  const doc = new jsPDF();
  
  // Configurações do documento
  doc.setFontSize(20);
  doc.text('Relatório de Performance e Métricas', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Período: ${period}`, 20, 35);
  doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 20, 45);
  
  // Resumo Executivo
  doc.setFontSize(16);
  doc.text('Resumo Executivo', 20, 65);
  
  doc.setFontSize(12);
  doc.text(`OKRs Concluídos: 85%`, 20, 80);
  doc.text(`Performance Média: 90%`, 20, 90);
  doc.text(`Tarefas Totais: ${reportData.taskStats.total}`, 20, 100);
  doc.text(`Departamentos: 4`, 20, 110);
  
  // Status das Tarefas
  doc.setFontSize(16);
  doc.text('Status das Tarefas', 20, 130);
  
  doc.setFontSize(12);
  doc.text(`Concluídas: ${reportData.taskStats.completed}`, 20, 145);
  doc.text(`Em Andamento: ${reportData.taskStats.inProgress}`, 20, 155);
  doc.text(`Atrasadas: ${reportData.taskStats.overdue}`, 20, 165);
  
  // Performance por Departamento
  doc.setFontSize(16);
  doc.text('Performance por Departamento', 20, 185);
  
  let yPosition = 200;
  reportData.departmentPerformance.forEach((dept: any) => {
    doc.setFontSize(12);
    doc.text(`${dept.name}: ${dept.performance}% (${dept.tasks} tarefas)`, 20, yPosition);
    yPosition += 10;
  });
  
  // Progresso de OKRs
  doc.setFontSize(16);
  doc.text('Progresso de OKRs', 20, yPosition + 20);
  
  yPosition += 35;
  reportData.okrCompletion.forEach((okr: any) => {
    doc.setFontSize(12);
    doc.text(`${okr.quarter}: ${okr.completed}%`, 20, yPosition);
    yPosition += 10;
  });
  
  // Salvar o PDF
  doc.save(`relatorio-${period}-${new Date().getTime()}.pdf`);
};
