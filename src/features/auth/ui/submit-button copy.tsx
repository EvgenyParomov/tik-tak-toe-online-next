import { Either, matchEither } from "@/shared/lib/either";
import { Alert, AlertDescription } from "@/shared/ui/alert";
import React from "react";

export function ErrorMessage({ error }: { error: Either<string, unknown> }) {
  return matchEither(error, {
    left: (error) => (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    ),
    right: () => null,
  });
}
