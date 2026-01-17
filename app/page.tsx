import Todos from "@/components/todos";
import DraggableTodos from "@/components/draggable-todos";
import TodoControls from "@/components/todo-controls";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { todos } from "@/lib/types";
import { Suspense } from "react";

export const revalidate = 0;

const Home = async ({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) => {
  // For Server Components, we need absolute URLs
  let apiUrl: string;
  
  if (process.env.NODE_ENV === "development") {
    // In development, connect directly to FastAPI backend
    apiUrl = "http://127.0.0.1:8000";
  } else {
    // In production, use the environment variable (must be set)
    // This should point to your deployed FastAPI backend (Railway, Render, etc.)
    apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    
    if (!apiUrl) {
      console.error("ERROR: NEXT_PUBLIC_API_URL is not set in production!");
      console.error("Please set NEXT_PUBLIC_API_URL in Vercel environment variables");
      console.error("This should point to your deployed FastAPI backend URL");
    }
  }

  // Build query string from searchParams
  const queryParams = new URLSearchParams();
  if (searchParams?.search) queryParams.append("search", searchParams.search as string);
  if (searchParams?.status && searchParams.status !== "all") queryParams.append("status", searchParams.status as string);
  if (searchParams?.sort_by) queryParams.append("sort_by", searchParams.sort_by as string);
  if (searchParams?.category) queryParams.append("category", searchParams.category as string);

  const queryString = queryParams.toString();
  
  let todos: todos[] = [];
  let apiError: string | null = null;
  
  try {
    const apiRequest = await fetch(`${apiUrl}/api/todos${queryString ? `?${queryString}` : ""}`, {
      cache: "no-store", // Disable caching to always fetch fresh data
    });
    
    if (!apiRequest.ok) {
      apiError = `API returned ${apiRequest.status}: ${apiRequest.statusText}`;
      console.error(apiError);
      todos = [];
    } else {
      const data: any = await apiRequest.json();
      // Ensure data is an array and transform id from number to string
      todos = Array.isArray(data) 
        ? data.map((todo: any) => {
            // Safely convert id to string
            let id = String(todo.id || '');
            
            // Safely handle due_date
            let due_date: string | null = null;
            if (todo.due_date) {
              try {
                if (typeof todo.due_date === 'string') {
                  due_date = todo.due_date;
                } else if (todo.due_date instanceof Date) {
                  due_date = todo.due_date.toISOString().split('T')[0];
                } else {
                  // Try to parse as date string
                  const dateStr = String(todo.due_date);
                  due_date = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
                }
              } catch (e) {
                console.warn('Error parsing due_date:', e);
                due_date = null;
              }
            }
            
            return {
              id,
              title: String(todo.title || ''),
              completed: Boolean(todo.completed),
              priority: Number(todo.priority) || 5,
              due_date,
              category: todo.category ? String(todo.category) : null,
            };
          })
        : [];
    }
    console.log("Fetched todos count:", todos.length);
  } catch (error: any) {
    apiError = error.message || "Failed to connect to backend";
    console.error("Failed to fetch todos:", error);
    todos = [];
    if (process.env.NODE_ENV === 'development') {
      console.error("API URL was:", apiUrl);
      console.error("Error details:", error.message);
    }
  }
  
  // Filter todos based on status if needed (for display purposes)
  const statusFilter = (searchParams?.status as string) || "all";
  let filteredTodos = todos;
  if (statusFilter === "done") {
    filteredTodos = todos.filter((todo) => todo.completed);
  } else if (statusFilter === "undone") {
    filteredTodos = todos.filter((todo) => !todo.completed);
  }

  return (
    <div>
      <div className="mt-3 mb-5 flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center my-3">
            <Logo size={80} />
          </div>
          <h2 className="text-3xl font-bold my-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TaskFlow
          </h2>
          <p className="my-3 text-muted-foreground text-sm">
            Be Productive by managing tasks efficiently.
          </p>
        </div>
        <div>
          <Button className="text-gray-200 bg-black" asChild>
            <Link href="/new">
              Add New <PlusCircle className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
      
      {apiError && (
        <div className="mx-auto max-w-4xl px-4 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            <strong>Warning:</strong> {apiError}. Make sure the backend is running on {apiUrl}
          </p>
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <Suspense fallback={<div>Loading controls...</div>}>
            <TodoControls />
          </Suspense>
        </div>
      </div>

      {statusFilter === "all" ? (
        // Show drag-and-drop zones when viewing all tasks
        <DraggableTodos
          pendingTodos={todos.filter((todo) => !todo.completed)}
          completedTodos={todos.filter((todo) => todo.completed)}
        />
      ) : (
        // Show single list when filtering
        <div className="flex items-center justify-center">
          <div className="lg:w-4/5 md:w-[90%] w-[95%] p-6 overflow-scroll no-scrollbar border min-h-[25rem] max-h-[30rem]">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              {statusFilter === "done" ? "Completed Tasks" : "Pending Tasks"}
            </h3>
            <Todos todos={filteredTodos} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
