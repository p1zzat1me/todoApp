"use client";

import TodoItem from "@/components/todo-item";
import { todos } from "@/lib/types";

// Dynamically import dnd-kit to handle cases where it's not installed
let DndContext: any;
let SortableContext: any;
let useSortable: any;
let closestCenter: any;
let KeyboardSensor: any;
let PointerSensor: any;
let useSensor: any;
let useSensors: any;
let arrayMove: any;
let sortableKeyboardCoordinates: any;
let verticalListSortingStrategy: any;
let CSS: any;

try {
  const dndCore = require("@dnd-kit/core");
  const dndSortable = require("@dnd-kit/sortable");
  const dndUtils = require("@dnd-kit/utilities");
  
  DndContext = dndCore.DndContext;
  closestCenter = dndCore.closestCenter;
  KeyboardSensor = dndCore.KeyboardSensor;
  PointerSensor = dndCore.PointerSensor;
  useSensor = dndCore.useSensor;
  useSensors = dndCore.useSensors;
  
  arrayMove = dndSortable.arrayMove;
  SortableContext = dndSortable.SortableContext;
  sortableKeyboardCoordinates = dndSortable.sortableKeyboardCoordinates;
  useSortable = dndSortable.useSortable;
  verticalListSortingStrategy = dndSortable.verticalListSortingStrategy;
  
  CSS = dndUtils.CSS;
} catch (e) {
  console.warn("@dnd-kit packages not installed. Drag-and-drop disabled.");
}

import { GripVertical } from "lucide-react";

interface SortableTodoItemProps {
  todo: todos;
}

function SortableTodoItem({ todo }: SortableTodoItemProps) {
  if (!useSortable) {
    // Fallback if dnd-kit is not installed
    return <TodoItem {...todo} />;
  }

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
  // Fallback if dnd-kit is not installed
  if (!DndContext || !SortableContext) {
    return (
      <main className="my-8">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))
        ) : (
          <p className="my-8 text-lg text-muted-foreground text-center">
            No Tasks
          </p>
        )}
      </main>
    );
  }

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
