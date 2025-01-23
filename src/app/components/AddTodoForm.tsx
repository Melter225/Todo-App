"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PlusCircle, Lock, Calendar } from "lucide-react";
import { useStore } from "../utils/store";

interface AddTodoFormProps {
  spaceId: string;
}

export default function AddTodoForm({ spaceId }: AddTodoFormProps) {
  const { addTodo } = useStore();
  const [todoText, setTodoText] = useState("");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");
  const [deadline, setDeadline] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todoText.trim()) {
      addTodo(
        spaceId,
        todoText.trim(),
        isPasswordProtected ? password : undefined,
        deadline || undefined
      );
      setTodoText("");
      setIsPasswordProtected(false);
      setPassword("");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          placeholder="What needs to be done?"
          className="flex-grow"
        />
        <Button type="submit" className="whitespace-nowrap">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <Input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="flex-grow"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="isPasswordProtected"
          checked={isPasswordProtected}
          onCheckedChange={(checked) =>
            setIsPasswordProtected(checked as boolean)
          }
        />
        <Label
          htmlFor="isPasswordProtected"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Password protect
        </Label>
      </div>

      {isPasswordProtected && (
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-gray-500" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="flex-grow"
          />
        </div>
      )}
    </form>
  );
}
