"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../component/FormInput";
import Button from "./Button";

interface signInForm {
  email: string;
  password: string;
}

interface Props {
  api: string;
  className: string;
  handleSubmitError: (message: string) => void;
  goToSignIn: () => void;
}
export default function SignIn({
  api,
  className,
  handleSubmitError,
  goToSignIn,
}: Props) {
  const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false);

  const [signInForm, setsignInForm] = useState<signInForm>({
    email: "",
    password: "",
  });

  const validateForm = () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signInForm.email)) {
      return false; // Invalid email format
    }

    // Basic password validation (minimum length)
    if (signInForm.password.length < 6) {
      return false; // Password too short
    }

    return true; // Form is valid
  };

  const { push } = useRouter();

  const submit = async () => {
    setTimeout(() => {
      setButtonIsLoading(false);
    }, 1000);

    if (!validateForm()) {
      handleSubmitError("Invalid inputs for email or password");
      return;
    }
    const res = await fetch(api, {
      method: "POST",
      body: JSON.stringify(signInForm),
    });

    const json = await res.json();

    if (!res.ok) {
      handleSubmitError(json.error);
      return;
    }

    const token = json.token;

    if (token) {
      localStorage.setItem("token", token);
      push("/");
    }
  };

  return (
    <form
      className={`${className} flex flex-col gap-4 items-center rounded-md bg-white`}
    >
      <h2 className="text-xl font-bold">Welcome Back!</h2>
      <FormInput
        id="email"
        name="email"
        type="text"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setsignInForm((prev) => ({ ...prev, email: target.value }));
        }}
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setsignInForm((prev) => ({ ...prev, password: target.value }));
        }}
      />

      <Button
        type="button"
        className="w-2/3 h-10 rounded-sm font-bold text-white bg-purple-500 shadow-lg loading-button"
        onClick={() => {
          submit();
          setButtonIsLoading(true);
        }}
        disabled={buttonIsLoading}
      >
        {buttonIsLoading ? "" : "Sign In"}
      </Button>
      <div className="w-2/3 h-10">
        <Button
          type="button"
          className="p-2 bg-slate-50 rounded-sm"
          onClick={goToSignIn}
        >
          sign up
        </Button>
      </div>
    </form>
  );
}
