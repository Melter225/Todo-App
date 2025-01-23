"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Check, Trash2, Lock } from "lucide-react";
import AddTodoForm from "./AddTodoForm";
import PasswordProtection from "./PasswordProtection";
import { useStore } from "../utils/store";

interface TodoListProps {
  spaceId: string;
  onClose: () => void;
}

export default function TodoList({ spaceId, onClose }: TodoListProps) {
  const { getTodosBySpaceId, toggleTodoCompletion, deleteTodo, getSpaceById } =
    useStore();
  const todos = getTodosBySpaceId(spaceId);
  const space = getSpaceById(spaceId);

  return (
    <Card className="mt-8 bg-white dark:bg-gray-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold">
          {space?.name} Todos
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <AddTodoForm spaceId={spaceId} />
        <ScrollArea className="h-[400px] mt-4">
          <ul className="space-y-2">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodoCompletion}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    isPasswordProtected: boolean;
    password?: string;
  };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isUnlocked, setIsUnlocked] = useState(!todo.isPasswordProtected);

  return (
    <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-md">
      {isUnlocked ? (
        <>
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="border-gray-400"
          />
          <span
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
          <Button variant="ghost" size="sm" onClick={() => onDelete(todo.id)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </>
      ) : (
        <div className="flex items-center space-x-2 w-full">
          <Lock className="h-4 w-4 text-gray-500" />
          <span className="flex-grow blur-sm select-none">{todo.text}</span>
          <PasswordProtection
            onUnlock={() => setIsUnlocked(true)}
            password={todo.password || ""}
          ></PasswordProtection>
        </div>
      )}
    </div>
  );
}
