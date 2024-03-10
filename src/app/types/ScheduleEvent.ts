import Task from "./Task";

class ScheduleEvent {
  id: string;
  title: string;
  deadline: string;
  tasks: Task[];

  constructor(id: string, title: string, deadline: string, tasks: Task[]) {
    this.id = id;
    this.title = title;
    this.deadline = deadline;
    this.tasks = tasks;
  }

  //add task to tasks, and return tasks
  //MODIFIES:this
  public addTask(task: Task): Task[] {
    this.tasks.push(task);
    return this.tasks;
  }
}

export default ScheduleEvent;
