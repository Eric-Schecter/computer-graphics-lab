import { World } from "./webglrenderer";

type CallBack = (world: World) => void;

export class InputSystem {
  private table = new Map<string, CallBack[]>();
  constructor(private world: World) { }
  public update = () => {
    for (const cbs of this.table.values()) {
      cbs.forEach(cb => cb(this.world));
    }
  }
  public add = (key: string, cb: CallBack) => {
    if (this.table.has(key)) {
      const members = this.table.get(key) as CallBack[];
      members.push(cb);
    } else {
      this.table.set(key, [cb])
    }
  }
  public remvoe = (key: string) => {
    this.table.delete(key)
  }
}