"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";
import { right } from "@/shared/lib/either";
import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/submit-button copy";
import { signInAction } from "../actions/sing-in";
import { useActionState } from "@/shared/lib/react";

export function SignInForm() {
  const [formState, action, isPending] = useActionState(
    signInAction,
    right(undefined),
  );

  return (
    <AuthFormLayout
      title="Sign In"
      description="Welcome back! Please sign in to your account"
      action={action}
      fields={<AuthFields />}
      actions={<SubmitButton isPending={isPending}> Sign In</SubmitButton>}
      error={<ErrorMessage error={formState} />}
      link={
        <BottomLink
          text="Don't have an account?"
          linkText="Sign up"
          url="/sign-up"
        />
      }
    />
  );
}
