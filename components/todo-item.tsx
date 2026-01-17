"use client";
import { useState } from "react";
import { Trash, Calendar, Tag, AlertCircle, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { todos } from "@/lib/types";
import axios from "axios";
import EditTodoForm from "@/components/edit-todo-form";

const TodoItem = ({ id, title, completed, priority, due_date, category }: todos) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id: any) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    try {
      await axios.delete(`${apiUrl}/api/todos/${id}`);
      router.refresh();
      toast.success("Todo deleted successfully.");
    } catch {
      toast.error("Something went wrong.");
    }
  };
  
  async function toggleTodo(id: string, completed: boolean) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    try {
      await axios.put(`${apiUrl}/api/todos/${id}`, {
        id,
        title,
        completed,
        priority: priority || 5,
        due_date: due_date || null,
        category: category || null,
      });
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 8) return "text-red-600 bg-red-100";
    if (priority >= 5) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const isOverdue = due_date && new Date(due_date) < new Date() && !completed;

  return (
    <div className="flex items-start justify-between gap-4 p-4 my-2 border rounded-lg hover:bg-gray-50 transition-colors">
      <section className="flex-1">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 cursor-pointer"
            defaultChecked={completed}
            id={id}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <div className="flex-1">
            <label
              htmlFor={id}
              className={`cursor-pointer text-sm lg:text-base ${
                completed ? "line-through text-slate-500" : "text-gray-900"
              }`}
            >
              {title}
            </label>
            
            {/* Metadata */}
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-600">
              {/* Priority */}
              <span className={`px-2 py-1 rounded-full font-medium ${getPriorityColor(priority || 5)}`}>
                <AlertCircle className="inline mr-1" size={12} />
                Priority {priority || 5}
              </span>
              
              {/* Due Date */}
              {due_date && (
                <span className={`flex items-center gap-1 ${isOverdue ? "text-red-600 font-semibold" : ""}`}>
                  <Calendar size={12} />
                  {formatDate(due_date)}
                  {isOverdue && " (Overdue)"}
                </span>
              )}
              
              {/* Category */}
              {category && (
                <span className="flex items-center gap-1 text-blue-600">
                  <Tag size={12} />
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditing(true)}
        >
          <Edit size={16} />
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDelete(id)}
        >
          <Trash size={16} />
        </Button>
      </section>
      
      {isEditing && (
        <EditTodoForm
          todo={{ id, title, completed, priority, due_date, category }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default TodoItem;
