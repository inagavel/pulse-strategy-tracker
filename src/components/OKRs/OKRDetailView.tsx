
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Target, Users, Building2, CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface KeyResult {
  id: string;
  description: string;
  progress: number;
  target: number;
  current: number;
}

interface OKR {
  id: string;
  title: string;
  description: string;
  owner: string;
  quarter: string;
  progress: number;
  keyResults: KeyResult[];
  status: 'active' | 'completed' | 'at-risk';
  area: string;
}

interface OKRDetailViewProps {
  department: string;
  okrs: OKR[];
  tasks: Task[];
  onBack: () => void;
}

export const OKRDetailView: React.FC<OKRDetailViewProps> = ({
  department,
  okrs,
  tasks,
  onBack
}) => {
  const [expandedOKRs, setExpandedOKRs] = useState<string[]>([]);
  const [expandedKeyResults, setExpandedKeyResults] = useState<string[]>([]);

  const toggleOKR = (okrId: string) => {
    setExpandedOKRs(prev => 
      prev.includes(okrId) 
        ? prev.filter(id => id !== okrId)
        : [...prev, okrId]
    );
  };

  const toggleKeyResult = (keyResultId: string) => {
    setExpandedKeyResults(prev => 
      prev.includes(keyResultId) 
        ? prev.filter(id => id !== keyResultId)
        : [...prev, keyResultId]
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-600" size={16} />;
      case 'at-risk': return <AlertTriangle className="text-red-600" size={16} />;
      default: return <Clock className="text-blue-600" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'at-risk': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600';
    if (progress >= 60) return 'bg-blue-600';
    if (progress >= 40) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  const getTasksForKeyResult = (keyResultId: string) => {
    return tasks.filter(task => task.description.includes(keyResultId) || Math.random() > 0.7);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={onBack} className="flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Voltar</span>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            OKRs - {department}
          </h1>
          <p className="text-gray-600">{okrs.length} objetivos encontrados</p>
        </div>
      </div>

      <div className="space-y-4">
        {okrs.map((okr) => (
          <Card key={okr.id} className="overflow-hidden">
            <Collapsible>
              <CollapsibleTrigger 
                className="w-full"
                onClick={() => toggleOKR(okr.id)}
              >
                <CardHeader className="hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {expandedOKRs.includes(okr.id) ? (
                        <ChevronDown size={20} className="text-gray-400" />
                      ) : (
                        <ChevronRight size={20} className="text-gray-400" />
                      )}
                      <Target className="text-blue-600" size={24} />
                      <div className="text-left">
                        <CardTitle className="text-lg">{okr.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">{okr.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(okr.status)}`}>
                        {getStatusIcon(okr.status)}
                        <span className="ml-1">{okr.status}</span>
                      </span>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{okr.progress}%</div>
                        <div className="w-20">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(okr.progress)}`}
                              style={{ width: `${okr.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                    <span className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{okr.owner}</span>
                    </span>
                    <span>{okr.quarter}</span>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Key Results</h4>
                    
                    {okr.keyResults.map((kr) => (
                      <div key={kr.id} className="border border-gray-200 rounded-lg">
                        <Collapsible>
                          <CollapsibleTrigger 
                            className="w-full p-4 hover:bg-gray-50 transition-colors"
                            onClick={() => toggleKeyResult(kr.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {expandedKeyResults.includes(kr.id) ? (
                                  <ChevronDown size={16} className="text-gray-400" />
                                ) : (
                                  <ChevronRight size={16} className="text-gray-400" />
                                )}
                                <span className="text-sm font-medium text-gray-700">
                                  {kr.description}
                                </span>
                              </div>
                              <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-500">
                                  {kr.current}/{kr.target}
                                </span>
                                <div className="w-24">
                                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${getProgressColor(kr.progress)}`}
                                      style={{ width: `${kr.progress}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="px-4 pb-4 border-t border-gray-100">
                              <h5 className="text-sm font-medium text-gray-700 mb-3 mt-3">
                                Tarefas Relacionadas
                              </h5>
                              
                              {getTasksForKeyResult(kr.id).length > 0 ? (
                                <div className="space-y-2">
                                  {getTasksForKeyResult(kr.id).map((task) => (
                                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">
                                          {task.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                          Responsável: {task.assignee}
                                        </div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <span className={`px-2 py-1 rounded text-xs ${
                                          task.status === 'completed' 
                                            ? 'bg-green-100 text-green-800'
                                            : task.status === 'in-progress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-gray-100 text-gray-800'
                                        }`}>
                                          {task.status}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs ${
                                          task.priority === 'high'
                                            ? 'bg-red-100 text-red-800'
                                            : task.priority === 'medium'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : 'bg-green-100 text-green-800'
                                        }`}>
                                          {task.priority}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500 italic">
                                  Nenhuma tarefa relacionada encontrada
                                </p>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};
