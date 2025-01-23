"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../utils/store";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpcomingTodosModal() {
  const [upcomingTodos, setUpcomingTodos] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const { getUpcomingDeadlines } = useStore();

  useEffect(() => {
    const todos = getUpcomingDeadlines();
    setUpcomingTodos(todos);
  }, []);

  if (!isVisible || upcomingTodos.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-2xl relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Calendar className="mr-2 h-6 w-8 text-gray-800" />
          Upcoming Todos
        </h2>
        <ul className="space-y-2">
          {upcomingTodos.map((todo) => (
            <li
              key={todo.id}
              className="bg-yellow-50 dark:bg-yellow-900 p-3 rounded-md"
            >
              <div className="font-medium">{todo.text}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Deadline: {new Date(todo.deadline).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
