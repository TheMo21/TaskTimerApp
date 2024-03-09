import { Dispatch, SetStateAction, useState } from "react";
import EventFormData from "../../../types/EventFormData";

export default function useFormData(): [
  EventFormData,
  Dispatch<SetStateAction<EventFormData>>
] {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    deadline: "",
    tasks: [],
  });
  return [formData, setFormData];
}
