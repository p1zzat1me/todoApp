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
    // In production, use the Vercel URL or environment variable
    apiUrl = process.env.NEXT_PUBLIC_API_URL || `https://${process.env.VERCEL_URL || "localhost:3000"}`;
  }

  // Build query string from searchParams
  const queryParams = new URLSearchParams();
  if (searchParams?.search) queryParams.append("search", searchParams.search as string);
  if (searchParams?.status && searchParams.status !== "all") queryParams.append("status", searchParams.status as string);
  if (searchParams?.sort_by) queryParams.append("sort_by", searchParams.sort_by as string);
  if (searchParams?.category) queryParams.append("category", searchParams.category as string);

  const queryString = queryParams.toString();
  
  let todos: todos[] = [];
  try {
    const apiRequest = await fetch(`${apiUrl}/api/todos${queryString ? `?${queryString}` : ""}`, {
      cache: "no-store",
    });
    if (!apiRequest.ok) throw new Error(`API error: ${apiRequest.status}`);
    const data: { todos: todos[] } = await apiRequest.json();
    todos = data.todos;
    console.log("Todos: ", todos);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    // Return with empty todos array if fetch fails
    todos = [];
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
