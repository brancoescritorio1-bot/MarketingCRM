import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const COLUMNS = [
  'Ideia', 'Briefing', 'Planejamento', 'Legenda', 'Design', 
  'Revisão', 'Aguardando Aprovação', 'Correção', 'Agendado', 'Publicado', 'Finalizado'
];

interface Item {
  id: string;
  title: string;
  status: string;
}

function SortableItem({ item, ...props }: { item: Item; [key: string]: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white p-3 rounded shadow cursor-grab"
    >
      {item.title}
    </div>
  );
}

export function KanbanBoard() {
  const [items, setItems] = useState<Item[]>([
    { id: '1', title: 'Post Instagram', status: 'Ideia' },
    { id: '2', title: 'Reels Campanha', status: 'Design' },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId !== overId) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);
        
        // This is a simplified move; in a real Kanban, we'd update the status.
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto p-4 h-full">
        {COLUMNS.map((col) => (
          <div key={col} className="bg-gray-100 rounded-lg p-4 w-64 shrink-0">
            <h3 className="font-bold text-gray-700 mb-4">{col}</h3>
            <div className="space-y-2">
              <SortableContext 
                items={items.filter(item => item.status === col).map(i => i.id)}
                strategy={verticalListSortingStrategy}
              >
                {items
                  .filter((item) => item.status === col)
                  .map((item) => (
                    <SortableItem key={item.id} item={item} />
                  ))}
              </SortableContext>
            </div>
          </div>
        ))}
      </div>
    </DndContext>
  );
}
