"use client";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import TodoItem from "@/components/todo-item";
import { todos } from "@/lib/types";

interface SortableTodoItemProps {
  todo: todos;
}

function SortableTodoItem({ todo }: SortableTodoItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 z-10"
      >
        <GripVertical size={20} />
      </div>
      <div className="pl-8">
        <TodoItem {...todo} />
      </div>
    </div>
  );
}

interface SortableTodosProps {
  todos: todos[];
  onReorder?: (todos: todos[]) => void;
}

export default function SortableTodos({ todos, onReorder }: SortableTodosProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((todo) => todo.id === active.id);
      const newIndex = todos.findIndex((todo) => todo.id === over.id);

      const newTodos = arrayMove(todos, oldIndex, newIndex);
      if (onReorder) {
        onReorder(newTodos);
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <main className="my-8">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <SortableTodoItem key={todo.id} todo={todo} />
            ))
          ) : (
            <p className="my-8 text-lg text-muted-foreground text-center">
              No Tasks
            </p>
          )}
        </main>
      </SortableContext>
    </DndContext>
  );
}
