"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { todos } from "@/lib/types";

type FormInputs = {
  title: string;
  priority: number;
  due_date: string;
  category: string;
  completed: boolean;
};

interface EditTodoFormProps {
  todo: todos;
  onClose: () => void;
}

const EditTodoForm = ({ todo, onClose }: EditTodoFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: todo.title,
      priority: todo.priority || 5,
      due_date: todo.due_date ? todo.due_date.split('T')[0] : "",
      category: todo.category || "",
      completed: todo.completed,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    let apiUrl: string;
    if (typeof window !== "undefined" && window.location.hostname === "localhost") {
      apiUrl = "http://localhost:8000";
    } else {
      apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    }
    try {
      setLoading(true);
      await axios.put(`${apiUrl}/api/todos/${todo.id}`, {
        id: todo.id,
        title: data.title,
        completed: data.completed,
        priority: data.priority || 5,
        due_date: data.due_date || null,
        category: data.category || null,
      });
      router.refresh();
      toast.success("Todo updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString: string | null) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Edit Todo</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-gray-100"
          >
            <X size={20} />
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className={`w-full p-2 border rounded focus:outline-none disabled:opacity-60 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your todo..."
              disabled={loading}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Completed Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="completed"
              {...register("completed")}
              className="cursor-pointer"
              disabled={loading}
            />
            <label htmlFor="completed" className="text-sm font-medium cursor-pointer">
              Mark as completed
            </label>
          </div>

          {/* Priority, Due Date, Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="priority" className="block text-sm font-medium mb-1">
                Priority (1-10)
              </label>
              <input
                type="number"
                id="priority"
                {...register("priority", {
                  min: 1,
                  max: 10,
                  valueAsNumber: true,
                  required: false,
                })}
                min={1}
                max={10}
                className="w-full p-2 border rounded focus:outline-none disabled:opacity-60 border-gray-300"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="due_date" className="block text-sm font-medium mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="due_date"
                {...register("due_date", { required: false })}
                className="w-full p-2 border rounded focus:outline-none disabled:opacity-60 border-gray-300"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <input
                type="text"
                id="category"
                {...register("category", { required: false })}
                className="w-full p-2 border rounded focus:outline-none disabled:opacity-60 border-gray-300"
                placeholder="e.g., Work, Personal"
                disabled={loading}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="disabled:opacity-60"
            >
              <Save className="mr-2" size={16} />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoForm;
