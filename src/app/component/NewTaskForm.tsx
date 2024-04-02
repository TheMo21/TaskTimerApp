import { FormEventHandler, MouseEventHandler } from "react";
import Button from "./Button";
import FormInput from "./FormInput";

interface Props {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleClose: MouseEventHandler;
  handleChange: any;
  className: string;
}

export default function NewTaskForm({
  handleSubmit,
  handleClose,
  handleChange,
  className,
}: Props) {
  const form = document.getElementById("form") as HTMLFormElement;
  const clearForm = () => {
    form.reset();
  };
  return (
    <div
      className={`w-full h-full pt-4 flex justify-center bg-slate-100 ${className} transition-all`}
    >
      <form
        id="form"
        className={`w-1/3 h-1/2 p-7 flex flex-col gap-4 items-center rounded-md bg-white`}
        onSubmit={(e) => {
          handleSubmit(e);
          clearForm();
        }}
      >
        <h2 className="text-xl font-bold">Enter Task</h2>
        <FormInput
          id={"title"}
          name={"title"}
          type={"text"}
          onChange={handleChange}
          className={"w-full"}
        />
        <FormInput
          id={"group"}
          name={"group"}
          type={"text"}
          onChange={handleChange}
          className={"w-full"}
        />
        <Button className="w-full bg-purple-500 rounded-sm " type={"button"}>
          <span className="font-bold text-white">Submit</span>
        </Button>
        <Button
          type="button"
          onClick={(e) => {
            handleClose(e);
            clearForm();
          }}
        >
          close
        </Button>
      </form>
    </div>
  );
}
