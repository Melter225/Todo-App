"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Unlock } from "lucide-react";

interface PasswordProtectionProps {
  onUnlock: () => void;
  password: string;
  children?: React.ReactNode;
}

export default function PasswordProtection({
  onUnlock,
  password,
  children,
}: PasswordProtectionProps) {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState("");

  const handleUnlock = () => {
    if (inputPassword === password) {
      onUnlock();
    } else {
      setError("Incorrect password");
    }
  };

  // Reset error when input changes
  useEffect(() => {
    setError("");
  }, [inputPassword]);

  if (children) {
    return (
      <div className="space-y-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex items-center space-x-2">
          <Lock className="h-8 w-8 text-gray-500" />
          <Input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Enter password"
            className="flex-grow"
          />
          <Button onClick={handleUnlock} size="sm">
            <Unlock className="h-4 w-4 mr-2" /> Unlock
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex items-center space-x-2">
        <Lock className="h-8 w-8 text-gray-500" />
        <Input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Enter password"
          className="flex-grow"
        />
        <Button onClick={handleUnlock} size="sm">
          <Unlock className="h-4 w-4 mr-2" /> Unlock
        </Button>
      </div>
    </div>
  );
}
