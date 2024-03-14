import { format } from "date-fns";
import {
  ChangeEvent,
  FocusEvent,
  FormEventHandler,
  MouseEventHandler,
  ReactNode,
} from "react";

interface Props {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleClose: MouseEventHandler;
  handleChange: any;
  children: ReactNode;
}

export default function NewEventForm({
  handleSubmit,
  handleClose,
  handleChange,
  children,
}: Props) {
  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          id="title"
          type="text"
          required
          onChange={handleChange}
        />
        <label htmlFor="deadline">Deadline</label>
        <input
          name="deadline"
          id="deadline"
          type="date"
          required
          min={format(new Date(), "yyyy-MM-dd")}
          onChange={handleChange}
        />
        <label htmlFor="tasks">Tasks</label>
        {children}
        <button>submit</button>
      </form>
      <button onClick={handleClose}>close</button>
    </>
  );
}
