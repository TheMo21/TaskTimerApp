import Task from "./Task";

export default interface EventFormData {
  title: string;
  deadline: string;
  tasks: Task[];
}
