import React, { useState, useEffect } from 'react';
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
  pipelineStage: string;
  type: string;
}

interface SortableItemProps {
  item: Item;
  key?: React.Key;
}

function SortableItem({ item }: SortableItemProps) {
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
      className="bg-white p-3 rounded shadow cursor-grab mb-2 border border-gray-200"
    >
      <div className="font-semibold text-sm text-navy-900">{item.title}</div>
      <div className="text-xs text-gray-500 mt-1">{item.type}</div>
    </div>
  );
}

export function KanbanBoard() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const res = await fetch('/api/contents');
      if (res.ok) {
        const data = await res.json();
        setItems(data.map((c: any) => ({
          id: c.id,
          title: c.title,
          pipelineStage: c.pipelineStage || 'Ideia',
          type: c.type
        })));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    
    const activeId = active.id as string;
    const overItem = items.find(i => i.id === over.id);
    const newStage = overItem ? overItem.pipelineStage : over.id as string;

    if (activeId !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === activeId);
        const itemToUpdate = prevItems[oldIndex];
        
        if (itemToUpdate.pipelineStage !== newStage) {
           updateItemStage(activeId, newStage);
           const newItems = [...prevItems];
           newItems[oldIndex] = { ...itemToUpdate, pipelineStage: newStage };
           return newItems;
        }

        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  const updateItemStage = async (id: string, stage: string) => {
    try {
      await fetch(`/api/contents/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pipelineStage: stage })
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-4">Carregando pipeline...</div>;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto p-4 h-full">
        {COLUMNS.map((col) => (
          <div key={col} id={col} className="bg-gray-50 rounded-lg p-4 w-72 shrink-0 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center justify-between">
              {col}
              <span className="text-xs font-normal text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                {items.filter(item => item.pipelineStage === col).length}
              </span>
            </h3>
            <div className="min-h-[200px]">
              <SortableContext 
                items={items.filter(item => item.pipelineStage === col).map(i => i.id)}
                strategy={verticalListSortingStrategy}
              >
                {items
                  .filter((item) => item.pipelineStage === col)
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
