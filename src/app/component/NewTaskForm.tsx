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
  return (
    <div className={`bg-slate-300 ${className} transition-all`}>
      <form className={`flex flex-col`} onSubmit={handleSubmit}>
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
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </div>
  );
}
