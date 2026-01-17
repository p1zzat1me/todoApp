export interface todos {
    id: string;
    title: string;
    completed: boolean;
    priority: number; // 1-10
    due_date: string | null; // ISO date string
    category: string | null;
}