import { Mesh } from "./mesh";
import { SingleData, StructureData, Updater } from "../../webglrenderer/uniform";
import { BoxProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/box.glsl';
import { BoxDefaultValueHandler } from "../defaultvaluehandler";
import { Store } from "../../reactrenderer/store";

export class Box extends Mesh {
  constructor(props: BoxProp,store:Store, private id: number) {
    super(props,store);
    this._name = 'box';
    this.defaultValueHandler = new BoxDefaultValueHandler();
    const { position, size, color, emissive, roughness, metallic, specTrans, specular, specColor, clearcoat, clearcoatGloss } = this.defaultValueHandler.process(props);
    this._intersection = intersection;
    this._parameters = new StructureData(`box[${id}]`, 'Box', [
      new StructureData('geometry', 'BoxGeometry', [
        new SingleData('position', 'vec3', new Updater(position)),
        new SingleData('size', 'vec3', new Updater(size)),
      ]),
      new StructureData('material', 'Material', [
        new SingleData('color', 'vec3', new Updater(color)),
        new SingleData('emissive', 'vec3', new Updater(emissive)),
        new SingleData('roughness', 'float', new Updater(roughness)),
        new SingleData('metallic', 'float', new Updater(metallic)),
        new SingleData('specTrans', 'float', new Updater(specTrans)),
        new SingleData('specColor', 'vec3', new Updater(specColor)),
        new SingleData('clearcoat', 'float', new Updater(clearcoat)),
        new SingleData('clearcoatGloss', 'float', new Updater(clearcoatGloss)),
        new SingleData('specular', 'float', new Updater(specular)),
      ]),
    ])
  }
  public get hitInfo() {
    const name = `${this._name}[${this.id}].geometry.`;
    return `oInfo.x++;boxIntersection(ray,${name}position,${name}size,gInfo,oInfo,${this.id});`;
  }
}