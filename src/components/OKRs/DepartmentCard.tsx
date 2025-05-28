
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Building2, Target, TrendingUp } from 'lucide-react';

interface OKR {
  id: string;
  title: string;
  description: string;
  owner: string;
  quarter: string;
  progress: number;
  keyResults: any[];
  status: 'active' | 'completed' | 'at-risk';
  area: string;
}

interface DepartmentCardProps {
  department: string;
  okrs: OKR[];
  onClick: (department: string) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  okrs,
  onClick
}) => {
  const averageProgress = okrs.length > 0 
    ? Math.round(okrs.reduce((sum, okr) => sum + okr.progress, 0) / okrs.length)
    : 0;

  const completedOKRs = okrs.filter(okr => okr.status === 'completed').length;
  const atRiskOKRs = okrs.filter(okr => okr.status === 'at-risk').length;
  const activeOKRs = okrs.filter(okr => okr.status === 'active').length;

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
      onClick={() => onClick(department)}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Building2 className="text-blue-600" size={20} />
          <span>{department}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Progresso Médio</span>
          <span className={`text-lg font-bold ${getProgressColor(averageProgress)}`}>
            {averageProgress}%
          </span>
        </div>
        
        <Progress value={averageProgress} className="h-2" />
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-gray-50 rounded">
            <div className="text-sm text-gray-600">Total</div>
            <div className="font-semibold text-gray-900">{okrs.length}</div>
          </div>
          <div className="p-2 bg-green-50 rounded">
            <div className="text-sm text-green-600">Concluídos</div>
            <div className="font-semibold text-green-700">{completedOKRs}</div>
          </div>
          <div className="p-2 bg-red-50 rounded">
            <div className="text-sm text-red-600">Em Risco</div>
            <div className="font-semibold text-red-700">{atRiskOKRs}</div>
          </div>
        </div>
        
        <div className="flex items-center justify-center text-sm text-gray-500 mt-3">
          <TrendingUp size={16} className="mr-1" />
          Clique para ver detalhes
        </div>
      </CardContent>
    </Card>
  );
};
