import { Mesh } from "./mesh";
import { SingleData, StructureData, Updater } from "../../webglrenderer/uniform";
import { CylinderProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/cylinder.glsl';
import { CylinderDefaultValueHandler } from "../defaultvaluehandler";
import { Store } from "../../reactrenderer/store";

export class Cylinder extends Mesh {
  constructor(props: CylinderProp, store: Store, private id: number) {
    super(props, store);
    this._name = 'cylinder';
    this.defaultValueHandler = new CylinderDefaultValueHandler();
    const { top, bottom, radius, color, emissive, roughness, metallic, specTrans, specular, specColor, clearcoat, clearcoatGloss } = this.defaultValueHandler.process(props);
    this._intersection = intersection;
    this._parameters = new StructureData(`cylinder[${id}]`, 'Cylinder', [
      new StructureData('geometry', 'CylinderGeometry', [
        new SingleData('top', 'vec3', new Updater(top)),
        new SingleData('bottom', 'vec3', new Updater(bottom)),
        new SingleData('radius', 'float', new Updater(radius)),
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
    return `oInfo.x++;cylinderIntersection(ray,${name}top,${name}bottom,${name}radius,gInfo,oInfo,${this.id});`;
  }
}