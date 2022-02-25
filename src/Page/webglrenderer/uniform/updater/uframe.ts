import { World } from "../..";
import { Updater } from "./updater";

export class UFrame extends Updater<number>{
  constructor(data: number, private world: World) {
    super(data);
  }
  public update = () => {
    if (this.world.isMoving) {
      this._data = 0;
      this.world.isMoving = false;
    } else {
      this._data++;
    }
    return this._data;
  }
}