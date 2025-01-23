"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Trash2, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import TodoList from "./TodoList";
import PasswordProtection from "./PasswordProtection";
import { useStore } from "../utils/store";

export default function SpaceList() {
  const { spaces, addSpace, deleteSpace } = useStore();
  const [newSpaceName, setNewSpaceName] = useState("");
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [password, setPassword] = useState("");

  const handleAddSpace = () => {
    if (newSpaceName.trim()) {
      addSpace(newSpaceName.trim(), isPasswordProtected ? password : undefined);
      setNewSpaceName("");
      setIsPasswordProtected(false);
      setPassword("");
    }
  };

  const handleDeleteSpace = (spaceId: string) => {
    deleteSpace(spaceId);
    if (selectedSpace === spaceId) {
      setSelectedSpace(null);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      <Card className="bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Create a New Space</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                placeholder="Enter space name"
                className="flex-grow"
              />
              <Button onClick={handleAddSpace} className="whitespace-nowrap">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Space
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isSpacePasswordProtected"
                checked={isPasswordProtected}
                onCheckedChange={(checked) =>
                  setIsPasswordProtected(checked as boolean)
                }
              />
              <Label
                htmlFor="isSpacePasswordProtected"
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card
            key={space.id}
            className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>{space.name}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteSpace(space.id)}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </CardHeader>
            <CardContent>
              {space.isPasswordProtected ? (
                <PasswordProtection
                  onUnlock={() => setSelectedSpace(space.id)}
                  password={space.password}
                />
              ) : (
                <Button
                  onClick={() => setSelectedSpace(space.id)}
                  className="w-full"
                >
                  View Todos
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSpace && (
        <TodoList
          spaceId={selectedSpace}
          onClose={() => setSelectedSpace(null)}
        />
      )}
    </div>
  );
}
