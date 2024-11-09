"use client";

import { AuthFormLayout } from "../ui/auth-form-layout";
import { AuthFields } from "../ui/fields";
import { SubmitButton } from "../ui/submit-button";

import { BottomLink } from "../ui/link";
import { ErrorMessage } from "../ui/submit-button copy";
import { useActionState } from "@/shared/lib/react";
import { SignUnFormState, signUpAction } from "../actions/sign-up";
import { routes } from "@/kernel/routes";

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpAction,
    {} as SignUnFormState,
  );

  return (
    <AuthFormLayout
      title="Sign Up"
      description="Create your account to get started"
      action={action}
      fields={<AuthFields {...formState} />}
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      error={<ErrorMessage error={formState.errors?._errors} />}
      link={
        <BottomLink
          text="Already have an account?"
          linkText="Sign in"
          url={routes.signIn()}
        />
      }
    />
  );
}
