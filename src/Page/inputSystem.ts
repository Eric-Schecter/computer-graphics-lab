import { World } from "./webglrenderer";

type CallBack = () => void;

class KeyboardSystem {
  private set = new Set();
  public add = (key: string) => {
    this.set.add(key);
  }
  public remvoe = (key: string) => {
    this.set.delete(key);
  }
  public isActive = (key: string) => {
    return this.set.has(key);
  }
}

export class InputSystem {
  private static instance: InputSystem;
  public static getInstance = () => {
    if (!InputSystem.instance) {
      InputSystem.instance = new InputSystem();
    }
    return InputSystem.instance;
  }
  private table = new Map<string, Set<CallBack>>();
  private constructor() { }
  public update = () => {
    for (const cbs of this.table.values()) {
      cbs.forEach(cb => cb());
    }
  }
  public add = (key: string, cb: CallBack) => {
    if (this.table.has(key)) {
      const members = this.table.get(key);
      if (members) {
        members.add(cb);
      }
    } else {
      this.table.set(key, new Set([cb]));
    }
  }
  public remvoe = (key: string, cb: CallBack) => {
    const events = this.table.get(key);
    if (!events) { return }
    events.delete(cb);
    if (events.size === 0) {
      this.table.delete(key);
    }
  }
}