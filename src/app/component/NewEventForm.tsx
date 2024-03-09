import { format } from "date-fns";
import {
  ChangeEvent,
  FocusEvent,
  FormEventHandler,
  MouseEventHandler,
} from "react";

interface Props {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleClose: MouseEventHandler;
  handleChange: any;
}

export default function NewEventForm({
  handleSubmit,
  handleClose,
  handleChange,
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
        <input name="tasks" id="tasks" type="text" onBlur={handleChange} />
        <button>submit</button>
      </form>
      <button onClick={handleClose}>close</button>
    </>
  );
}
