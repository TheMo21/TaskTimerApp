import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Task from "../types/Task";

export default function useFormData(): [
  Task,
  Dispatch<SetStateAction<Task>>,
  (e: ChangeEvent<HTMLInputElement>) => void,
  () => void
] {
  const [formData, setFormData] = useState<Task>({
    userId: "",
    title: "",
    group: "",
  });

  const handleFormInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    console.log(formData);
  };

  const clearFormData = () => {
    setFormData((prev) => ({ ...prev, title: "", group: "" }));
  };
  return [formData, setFormData, handleFormInputChange, clearFormData];
}
