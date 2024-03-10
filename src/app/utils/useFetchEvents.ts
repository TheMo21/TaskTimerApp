import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ScheduleEvent from "../types/ScheduleEvent";
import { format } from "date-fns";
import Task from "../types/Task";

export default function useFetchEvents(): [
  ScheduleEvent[],
  () => Promise<void>
] {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);

  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/api/events", {
      method: "GET",
    });
    if (400 <= res.status && res.status <= 499) {
      throw new Error("failed to fetch events");
    }

    const json = await res.json();

    const fetchedEvents = json.map(
      (event: ScheduleEvent) =>
        new ScheduleEvent(event.id, event.title, event.deadline, event.tasks)
    ) as ScheduleEvent[];

    fetchedEvents.sort((a, b) => {
      const deadline1 = parseInt(a.deadline.split("-").join(""));
      const deadline2 = parseInt(b.deadline.split("-").join(""));

      return deadline1 - deadline2;
    });

    setEvents(fetchedEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return [events, fetchEvents];
}
