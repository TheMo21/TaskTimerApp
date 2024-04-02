"use client";
import Button from "./Button";
import { useRouter } from "next/navigation";
interface Props {
  className: string;
}
export default function Nav({ className }: Props) {
  const { push } = useRouter();
  return (
    <>
      <div className={`${className} p-2 flex justify-between`}>
        <h1 className="text-xl font-bold">Task Timer</h1>
        <Button
          type={"button"}
          onClick={() => {
            localStorage.removeItem("token");
            push("/userAuth");
          }}
        >
          <span>Sign Out</span>
        </Button>
      </div>
    </>
  );
}
