import React from 'react';
import { KanbanBoard } from '@/components/pipeline/KanbanBoard';

export function PipelinePage() {
  return (
    <div className="p-8 h-screen flex flex-col">
      <h1 className="text-2xl font-bold text-navy-900 mb-6">Pipeline de Conteúdo</h1>
      <div className="flex-grow overflow-hidden">
        <KanbanBoard />
      </div>
    </div>
  );
}
