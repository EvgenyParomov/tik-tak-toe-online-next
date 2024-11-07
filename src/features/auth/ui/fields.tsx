import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import React, { useId } from "react";

export function AuthFields({
  login,
  onChangeLogin,
  onChangePassword,
  password,
}: {
  login: string;
  password: string;
  onChangeLogin: (login: string) => void;
  onChangePassword: (password: string) => void;
}) {
  const loginId = useId();
  const passwordId = useId();
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type="login"
          placeholder="Enter your login"
          value={login}
          onChange={(e) => onChangeLogin(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          required
        />
      </div>
    </>
  );
}
