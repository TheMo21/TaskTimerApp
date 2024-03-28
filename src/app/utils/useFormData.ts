import { Dispatch, SetStateAction, useState } from "react";
import Task from "../types/Task";

export default function useFormData(): [Task, Dispatch<SetStateAction<Task>>] {
  const [formData, setFormData] = useState<Task>({
    userId: "",
    title: "",
    group: "",
  });
  return [formData, setFormData];
}
