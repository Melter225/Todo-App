"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Trash2, Lock, Calendar } from "lucide-react";
import AddTodoForm from "./AddTodoForm";
import PasswordProtection from "./PasswordProtection";
import { useStore } from "../utils/store";
import { Todo } from "../utils/store";

interface TodoListProps {
  spaceId: string;
  onClose: () => void;
}

export default function TodoList({ spaceId, onClose }: TodoListProps) {
  const { getTodosBySpaceId, toggleTodoCompletion, deleteTodo, getSpaceById } =
    useStore();

  const todos = getTodosBySpaceId(spaceId);
  const space = getSpaceById(spaceId);
  const [upcomingDeadlines] = useState<Todo[]>([]);

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

      {upcomingDeadlines.length > 0 && (
        <CardContent>
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-md mb-4">
            <h3 className="font-bold mb-2 flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-yellow-600" />
              Upcoming Deadlines
            </h3>
            {upcomingDeadlines.map((todo) => (
              <div
                key={todo.id}
                className="text-sm text-yellow-800 dark:text-yellow-200"
              >
                • {todo.text} (Deadline:{" "}
                {todo.deadline ? (
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(todo.deadline).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })}
                  </div>
                ) : null}
                )
              </div>
            ))}
          </div>
        </CardContent>
      )}

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
    deadline?: string;
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
          <div className="flex-grow flex items-center justify-between">
            <span
              className={`${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
            {todo.deadline && (
              <div className="text-sm text-gray-500 flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(todo.deadline).toLocaleDateString("en-US", {
                  timeZone: "UTC",
                })}
              </div>
            )}
          </div>
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
