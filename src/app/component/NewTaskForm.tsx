import { FormEventHandler, MouseEventHandler, useRef } from "react";
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
  const formRef = useRef<HTMLFormElement>(null);
  const clearForm = () => {
    const form = formRef?.current;
    if (form) {
      const form = formRef?.current;
      form.reset();
    }
  };
  return (
    <div
      className={`w-full h-full pt-4 flex justify-center bg-slate-100 ${className} transition-all`}
    >
      <form
        ref={formRef}
        className={`w-full md:w-1/2 h-1/2 p-7 flex flex-col gap-4 items-center rounded-md bg-white`}
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
        <Button className="w-full bg-purple-500 rounded-sm " type={"submit"}>
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
