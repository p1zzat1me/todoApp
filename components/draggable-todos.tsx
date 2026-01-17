"use client";

import { useState } from "react";
import TodoItem from "@/components/todo-item";
import { todos } from "@/lib/types";
import { GripVertical } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Dynamically import dnd-kit
let DndContextLib: any;
let SortableContextLib: any;
let useSortableLib: any;
let useDroppableLib: any;
let closestCenterLib: any;
let KeyboardSensorLib: any;
let PointerSensorLib: any;
let useSensorLib: any;
let useSensorsLib: any;
let DragOverlayLib: any;
let sortableKeyboardCoordinatesLib: any;
let verticalListSortingStrategyLib: any;
let CSSLib: any;

try {
  const dndCore = require("@dnd-kit/core");
  const dndSortable = require("@dnd-kit/sortable");
  const dndUtils = require("@dnd-kit/utilities");
  
  DndContextLib = dndCore.DndContext;
  closestCenterLib = dndCore.closestCenter;
  KeyboardSensorLib = dndCore.KeyboardSensor;
  PointerSensorLib = dndCore.PointerSensor;
  useSensorLib = dndCore.useSensor;
  useSensorsLib = dndCore.useSensors;
  DragOverlayLib = dndCore.DragOverlay;
  useDroppableLib = dndCore.useDroppable;
  
  SortableContextLib = dndSortable.SortableContext;
  sortableKeyboardCoordinatesLib = dndSortable.sortableKeyboardCoordinates;
  useSortableLib = dndSortable.useSortable;
  verticalListSortingStrategyLib = dndSortable.verticalListSortingStrategy;
  
  CSSLib = dndUtils.CSS;
} catch (e) {
  console.warn("@dnd-kit packages not installed. Drag-and-drop disabled.");
}

interface SortableTodoItemProps {
  todo: todos;
}

function SortableTodoItem({ todo }: SortableTodoItemProps) {
  if (!useSortableLib) {
    return <TodoItem {...todo} />;
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortableLib({ id: todo.id });

  const style = {
    transform: CSSLib.Transform.toString(transform),
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

interface DroppableZoneProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function DroppableZone({ id, children, className = "" }: DroppableZoneProps) {
  if (!useDroppableLib) {
    return <div className={className}>{children}</div>;
  }

  const { setNodeRef, isOver } = useDroppableLib({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${isOver ? "ring-2 ring-blue-500 ring-offset-2 bg-blue-50" : ""}`}
    >
      {children}
    </div>
  );
}

interface DraggableTodosProps {
  pendingTodos: todos[];
  completedTodos: todos[];
}

export default function DraggableTodos({ pendingTodos, completedTodos }: DraggableTodosProps) {
  const router = useRouter();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedTodo, setDraggedTodo] = useState<todos | null>(null);

  if (!DndContextLib || !SortableContextLib) {
    return (
      <div className="flex items-center justify-center gap-16 flex-wrap">
        <div className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border h-[25rem]">
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Pending Tasks
          </h3>
          <main className="my-8">
            {pendingTodos.length > 0 ? (
              pendingTodos.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
              ))
            ) : (
              <p className="my-8 text-lg text-muted-foreground text-center">
                No Tasks
              </p>
            )}
          </main>
        </div>
        <div className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border h-[25rem]">
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Completed Tasks
          </h3>
          <main className="my-8">
            {completedTodos.length > 0 ? (
              completedTodos.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
              ))
            ) : (
              <p className="my-8 text-lg text-muted-foreground text-center">
                No Tasks
              </p>
            )}
          </main>
        </div>
      </div>
    );
  }

  const sensors = useSensorsLib(
    useSensorLib(PointerSensorLib),
    useSensorLib(KeyboardSensorLib, {
      coordinateGetter: sortableKeyboardCoordinatesLib,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
    const allTodos = [...pendingTodos, ...completedTodos];
    const todo = allTodos.find((t) => t.id === event.active.id);
    setDraggedTodo(todo || null);
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);
    setDraggedTodo(null);

    if (!over) return;

    const allTodos = [...pendingTodos, ...completedTodos];
    const todo = allTodos.find((t) => t.id === active.id);
    
    if (!todo) return;

    const targetZone = over.id as string;
    const newCompleted = targetZone === "completed-zone";

    // Only update if status actually changed
    if (todo.completed !== newCompleted) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
      try {
        await axios.put(`${apiUrl}/api/todos/${todo.id}`, {
          id: todo.id,
          title: todo.title,
          completed: newCompleted,
          priority: todo.priority || 5,
          due_date: todo.due_date || null,
          category: todo.category || null,
        });
        router.refresh();
        toast.success(newCompleted ? "Task marked as done!" : "Task marked as pending!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update task");
      }
    }
  }

  return (
    <DndContextLib
      sensors={sensors}
      collisionDetection={closestCenterLib}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-center gap-16 flex-wrap">
        {/* Pending Tasks Zone */}
        <DroppableZone
          id="pending-zone"
          className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border min-h-[25rem] max-h-[30rem] rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Pending Tasks
          </h3>
          <SortableContextLib
            items={pendingTodos.map((t) => t.id)}
            strategy={verticalListSortingStrategyLib}
          >
            <main className="my-8">
              {pendingTodos.length > 0 ? (
                pendingTodos.map((todo) => (
                  <SortableTodoItem key={todo.id} todo={todo} />
                ))
              ) : (
                <p className="my-8 text-lg text-muted-foreground text-center">
                  Drag tasks here
                </p>
              )}
            </main>
          </SortableContextLib>
        </DroppableZone>

        {/* Completed Tasks Zone */}
        <DroppableZone
          id="completed-zone"
          className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border min-h-[25rem] max-h-[30rem] rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Completed Tasks
          </h3>
          <SortableContextLib
            items={completedTodos.map((t) => t.id)}
            strategy={verticalListSortingStrategyLib}
          >
            <main className="my-8">
              {completedTodos.length > 0 ? (
                completedTodos.map((todo) => (
                  <SortableTodoItem key={todo.id} todo={todo} />
                ))
              ) : (
                <p className="my-8 text-lg text-muted-foreground text-center">
                  Drag tasks here to mark as done
                </p>
              )}
            </main>
          </SortableContextLib>
        </DroppableZone>
      </div>

      <DragOverlayLib>
        {draggedTodo ? (
          <div className="opacity-50 bg-white border rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <GripVertical size={20} className="text-gray-400" />
              <span>{draggedTodo.title}</span>
            </div>
          </div>
        ) : null}
      </DragOverlayLib>
    </DndContextLib>
  );
}
