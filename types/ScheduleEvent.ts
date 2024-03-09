import Task from "./Task";

class ScheduleEvent {
  title: string;
  deadline: string;
  tasks: Task[];

  constructor(title: string, deadline: string, tasks: Task[]) {
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
