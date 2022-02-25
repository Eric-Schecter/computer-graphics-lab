//input: from react
//ouput: to shader for create, to uniform updater for update

import { World } from "../../webglrenderer";
import { UniformData } from "../../webglrenderer/uniform";
import { DefaultValueHandler } from "../defaultvaluehandler";
import { Comparator } from "./comparator";
import { EventsHandler } from "./eventsHandler";

export abstract class Instance {
  private static comparator = new Comparator();
  private eventHandler: EventsHandler;
  protected _parameters: UniformData;
  protected _intersection: string;
  protected defaultValueHandler:DefaultValueHandler;
  constructor(protected _props: object, canvas: HTMLCanvasElement, protected _world: World) {
    this.eventHandler = new EventsHandler(_props, canvas);
  }
  public compare = (oldProps: object, newProps: object, result: object) => {
    return Instance.comparator.judgeChangedProps(oldProps, newProps, result);
  }
  public update = (props: object) => {
    for (const [key, data] of Object.entries(props)) {
      this._parameters.setData(data, key);
    }
    this._world.reset();
  }
  public dispose = () => {
    this.eventHandler.removeEvents();
  }
  public get intersection() {
    return this._intersection;
  };
  public get parameters() {
    return this._parameters;
  }
  public get props() {
    return this._props;
  }
}
