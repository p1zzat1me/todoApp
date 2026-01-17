"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { SendHorizonal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type FormInputs = {
  todo: string;
  priority: number;
  due_date: string;
  category: string;
};

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // Build the correct API URL
    let apiUrl: string;
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
      // In development, use absolute URL to FastAPI
      apiUrl = "http://localhost:8000";
    } else {
      // In production, use relative path (rewrites to FastAPI)
      apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    }
    
    console.log("API URL", apiUrl);
    try {
      setLoading(true);
      console.log("Submitting todo to:", `${apiUrl}/api/todos/new`);
      console.log("Payload:", {
        title: data.todo,
        completed: false,
        priority: data.priority || 5,
        due_date: data.due_date || null,
        category: data.category || null,
      });
      
      // Add timeout to prevent hanging (10 seconds)
      const response = await axios.post(
        `${apiUrl}/api/todos/new`,
        {
          title: data.todo,
          completed: false,
          priority: data.priority || 5,
          due_date: data.due_date && data.due_date.trim() !== "" ? data.due_date : null,
          category: data.category && data.category.trim() !== "" ? data.category : null,
        },
        {
          timeout: 10000, // 10 second timeout
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log("Todo created successfully:", response.data);
      toast.success("Todo added successfully");
      
      // Reset form before navigation
      reset();
      setLoading(false);
      
      // Small delay before redirect to ensure toast shows
      setTimeout(() => {
        // Use full page reload to ensure fresh data from server
        window.location.href = "/";
      }, 500);
    } catch (error) {
      console.error("Error creating todo:", error);
      setLoading(false); // Make sure loading is set to false on error
      
      if (axios.isAxiosError(error)) {
        console.error("Response:", error.response?.data);
        console.error("Status:", error.response?.status);
        console.error("Error code:", error.code);
        
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          toast.error("Request timed out. The server may be slow or not responding. Check your backend.");
        } else if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
          toast.error("Cannot connect to server. Make sure the backend is running on http://localhost:8000");
        } else if (error.response) {
          // Server responded with error
          const errorDetail = error.response.data?.detail || error.response.data?.message || error.message;
          toast.error(`Error: ${errorDetail}`);
        } else {
          toast.error(`Network error: ${error.message || "Unknown error occurred"}`);
        }
      } else {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("Non-axios error:", errorMessage);
        toast.error(`Something went wrong: ${errorMessage}`);
      }
      
      // Don't reset form on error - let user see what they entered
      // reset();
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 px-4 py-8 border rounded shadow">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold my-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          TaskFlow
        </h2>
        <p className="my-3 text-muted-foreground text-sm">
          Be Productive by managing tasks efficiently.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-4">
          <input
            type="text"
            id="todoText"
            {...register("todo", { required: "Todo is required" })}
            className={`flex-1 p-2 border rounded focus:outline-none disabled:opacity-60 ${
              errors.todo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your todo..."
            disabled={loading}
          />
        </div>
        <p className="text-red-500 text-xs mt-1">
          {Boolean(errors.todo) && errors?.todo?.message}
        </p>

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
                required: false 
              })}
              defaultValue={5}
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

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Todo"} <SendHorizonal className="ml-2" size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
