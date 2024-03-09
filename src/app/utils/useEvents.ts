import { Dispatch, SetStateAction, useState } from "react";
import ScheduleEvent from "../../../types/ScheduleEvent";
import { format } from "date-fns";
import Task from "../../../types/Task";

export default function useEvents(): [
  ScheduleEvent[],
  Dispatch<SetStateAction<ScheduleEvent[]>>
] {
  // Set the current date and time
  const now = new Date();
  const formattedDate = format(now, "yyyy-MM-dd");

  const [events, setEvents] = useState<ScheduleEvent[]>([
    new ScheduleEvent("event 1", formattedDate, [
      new Task("task 1"),
      new Task("task 2"),
    ]),

    new ScheduleEvent("event 2", formattedDate, [
      new Task("task 1"),
      new Task("task 2"),
    ]),
    new ScheduleEvent("event 3", formattedDate, [
      new Task("task 1"),
      new Task("task 2"),
    ]),
    new ScheduleEvent("event 4", formattedDate, [
      new Task("task 1"),
      new Task("task 2"),
    ]),
  ]);

  return [events, setEvents];
}
