export class TaskHandler {
  private tasks = new Set<Function>();
  public update = (delta: number,time:number) => {
    for (const task of this.tasks) {
      task(delta,time);
    }
  }
  public register = (task: Function) => {
    this.tasks.add(task);
  }
  public unregister = (task: Function) => {
    this.tasks.delete(task);
  }
}