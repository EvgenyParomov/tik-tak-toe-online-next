import { Button } from "@/shared/ui/button";
import React from "react";

export function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <Button type="submit" className="w-full">
      {children}
    </Button>
  );
}
