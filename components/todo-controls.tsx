"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function TodoControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "");

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams("search", search);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    updateParams("status", newStatus);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    updateParams("sort_by", newSort);
  };

  return (
    <div className="space-y-4 mb-6 flex flex-col items-center">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-2xl">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <span className="text-sm font-medium">Status:</span>
          <div className="flex gap-2">
            {["all", "undone", "done"].map((s) => (
              <Button
                key={s}
                variant={status === s ? "default" : "outline"}
                size="sm"
                onClick={() => handleStatusChange(s)}
                className="capitalize"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown size={18} className="text-gray-600" />
          <span className="text-sm font-medium">Sort:</span>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "priority_asc" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortChange(sortBy === "priority_asc" ? "" : "priority_asc")}
            >
              Priority ↑
            </Button>
            <Button
              variant={sortBy === "priority_desc" ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortChange(sortBy === "priority_desc" ? "" : "priority_desc")}
            >
              Priority ↓
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
