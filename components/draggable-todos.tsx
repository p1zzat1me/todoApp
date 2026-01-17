"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
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
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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

interface DroppableZoneProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

function DroppableZone({ id, children, className = "" }: DroppableZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${className} ${isOver ? "bg-blue-50 border-blue-300" : ""}`}
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

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
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

    if (!over) {
      console.log("No drop target");
      return;
    }

    const allTodos = [...pendingTodos, ...completedTodos];
    const todo = allTodos.find((t) => t.id === active.id);
    
    if (!todo) {
      console.log("Todo not found:", active.id);
      return;
    }

    // Check if dropped on a zone or on another todo
    let targetZone: string;
    
    // If dropped on a zone (pending-zone or completed-zone)
    if (over.id === "pending-zone" || over.id === "completed-zone") {
      targetZone = over.id as string;
    } else {
      // If dropped on another todo, find which zone that todo belongs to
      const targetTodo = allTodos.find((t) => t.id === over.id);
      if (targetTodo) {
        targetZone = targetTodo.completed ? "completed-zone" : "pending-zone";
      } else {
        console.log("Could not determine target zone");
        return;
      }
    }

    console.log("Target zone:", targetZone);
    const newCompleted = targetZone === "completed-zone";

    // Only update if status actually changed
    if (todo.completed !== newCompleted) {
      let apiUrl: string;
      if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        apiUrl = "http://localhost:8000";
      } else {
        // In production, use environment variable
        apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
        if (!apiUrl) {
          toast.error("Backend API URL not configured. Please set NEXT_PUBLIC_API_URL.");
          return;
        }
      }
      
      console.log(`Updating todo ${todo.id} to completed=${newCompleted}`);
      
      try {
        const response = await axios.put(
          `${apiUrl}/api/todos/${todo.id}`,
          {
            id: todo.id,
            title: todo.title,
            completed: newCompleted,
            priority: todo.priority || 5,
            due_date: todo.due_date || null,
            category: todo.category || null,
          },
          {
            timeout: 10000, // 10 second timeout
          }
        );
        
        console.log("Update successful:", response.data);
        
        // Force a full page refresh to get fresh data
        window.location.reload();
        
        toast.success(newCompleted ? "Task marked as done!" : "Task marked as pending!");
      } catch (error) {
        console.error("Error updating todo:", error);
        if (axios.isAxiosError(error)) {
          const errorMsg = error.response?.data?.detail || error.message;
          toast.error(`Failed to update task: ${errorMsg}`);
        } else {
          toast.error("Failed to update task");
        }
      }
    } else {
      console.log("Status unchanged, no update needed");
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
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
          <SortableContext
            items={pendingTodos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
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
          </SortableContext>
        </DroppableZone>

        {/* Completed Tasks Zone */}
        <DroppableZone
          id="completed-zone"
          className="lg:w-1/3 md:w-2/5 w-[95%] p-6 overflow-scroll no-scrollbar border min-h-[25rem] max-h-[30rem] rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
            Completed Tasks
          </h3>
          <SortableContext
            items={completedTodos.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
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
          </SortableContext>
        </DroppableZone>
      </div>

      <DragOverlay>
        {draggedTodo ? (
          <div className="opacity-50 bg-white border rounded-lg p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <GripVertical size={20} className="text-gray-400" />
              <span>{draggedTodo.title}</span>
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
