"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "../component/FormInput";
import Button from "./Button";

interface signUpForm {
  username: string;
  email: string;
  password: string;
}

interface Props {
  api: string;
  handleSubmitError: (message: string) => void;
  goToSignUp: () => void;
}
export default function SignUp({ api, handleSubmitError, goToSignUp }: Props) {
  const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(false);

  const [signUpForm, setsignUpForm] = useState<signUpForm>({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    // Basic username validation (minimum length)
    if (signUpForm.username.length < 3) {
      return false; // Username too short
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpForm.email)) {
      return false; // Invalid email format
    }

    // Basic password validation (minimum length)
    if (signUpForm.password.length < 6) {
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
      body: JSON.stringify(signUpForm),
    });

    const json = await res.json();

    if (res.ok) {
      goToSignUp();
    } else {
      handleSubmitError(json.error);
    }
    setButtonIsLoading(false);
  };

  return (
    <form className="w-1/4 h-1/2 p-7 flex flex-col gap-4 items-center rounded-md bg-white">
      <h2 className="text-xl font-bold">Sign Up Now!</h2>
      <FormInput
        id="username"
        name="username"
        type="text"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setsignUpForm((prev) => ({ ...prev, username: target.value }));
        }}
      />
      <FormInput
        id="email"
        name="email"
        type="text"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setsignUpForm((prev) => ({ ...prev, email: target.value }));
        }}
      />

      <FormInput
        id="password"
        name="password"
        type="text"
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setsignUpForm((prev) => ({ ...prev, password: target.value }));
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
        {buttonIsLoading ? "" : "Sign Up"}
      </Button>
      <div className="w-2/3 h-10 flex justify-start">
        <Button
          type="button"
          className="p-2 bg-slate-50 rounded-sm"
          onClick={goToSignUp}
        >
          sign in
        </Button>
      </div>
    </form>
  );
}
