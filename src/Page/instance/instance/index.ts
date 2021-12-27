//input: from react
//ouput: to shader for create, to uniform updater for update

import { World } from "../../world";
import { Observer } from "../../world/uniform";
import { Comparator } from "./comparator";
import { EventsHandler } from "./eventsHandler";

export abstract class Instance {
  private static comparator = new Comparator();
  private eventHandler: EventsHandler;
  protected _parameters: Observer;
  constructor(private props: object, canvas: HTMLCanvasElement, protected _world: World) {
    this.eventHandler = new EventsHandler(props, canvas);
  }
  public compare = (oldProps: object, newProps: object, result: object) => {
    return Instance.comparator.judgeChangedProps(oldProps, newProps, result);
  }
  public update = (props: object) => {
    for (const [key, data] of Object.entries(props)) {
      this._parameters.setData(data, key);
      this._world.reset();
    }
  }
  public init = () => {
    this.update(this.props);
  }
  public dispose = () => {
    this.eventHandler.removeEvents();
  }
  public get parameters() {
    return this._parameters;
  }
}
