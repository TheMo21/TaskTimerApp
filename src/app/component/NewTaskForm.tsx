import { FormEventHandler, MouseEventHandler } from "react";

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
    <div className={`bg-slate-300 ${className} transition-all`}>
      <form
        id="form"
        className={`flex flex-col`}
        onSubmit={(e) => {
          handleSubmit(e);
          clearForm();
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="group">Group</label>
        <input
          name="group"
          id="group"
          type="text"
          required
          onChange={handleChange}
        />
        <button>submit</button>
        <button
          type="button"
          onClick={(e) => {
            handleClose(e);
            clearForm();
          }}
        >
          close
        </button>
      </form>
    </div>
  );
}
