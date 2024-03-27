"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface signInForm {
  email: String;
  password: String;
}
export default function SignIn() {
  const api = "http://localhost:3000/api/user/signIn";

  const [signInForm, setsignInForm] = useState<signInForm>({
    email: "",
    password: "",
  });

  const { push } = useRouter();

  const submit = async () => {
    const res = await fetch(api, {
      method: "POST",
      body: JSON.stringify(signInForm),
    });

    const json = await res.json();
    const token = json.token;

    if (token) {
      localStorage.setItem("token", token);
      push("/");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form className="w-1/3 h-1/2 flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={(e) =>
            setsignInForm((prev) => ({ ...prev, email: e.target.value }))
          }
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          onChange={(e) =>
            setsignInForm((prev) => ({ ...prev, password: e.target.value }))
          }
        ></input>

        <button
          type="button"
          onClick={() => {
            submit();
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
