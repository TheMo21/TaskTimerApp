class Task {
  description: string;
  completed: boolean;

  constructor(description: string) {
    this.description = description;
    this.completed = false;
  }

  //Mark task as complete
  //MODIFIES:this
  complete(): void {
    this.completed = true;
  }
}

export default Task;
