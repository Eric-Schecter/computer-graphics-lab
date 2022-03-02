import { Mesh } from "./mesh";
import { SingleData, StructureData, Updater } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { GroupProp } from "../../..";
import { BoxDefaultValueHandler, DefaultValueHandler } from "../defaultvaluehandler";
import { Instance } from "..";
import { Store } from "../../reactrenderer/store";
import { Object3D } from "../object3D";

export class Group extends Object3D {
  constructor(props: GroupProp, store: Store) {
    super(props, store);
    this.defaultValueHandler = new DefaultValueHandler();
    const { position, rotation } = this.defaultValueHandler.process(props);

    
  }
}