import { Dispatch, SetStateAction, useState } from "react";
import EventFormData from "../types/EventFormData";

export default function useEventData(): [
  EventFormData,
  Dispatch<SetStateAction<EventFormData>>
] {
  const [eventData, setEventData] = useState<EventFormData>({
    title: "",
    deadline: "",
    tasks: [],
  });
  return [eventData, setEventData];
}
