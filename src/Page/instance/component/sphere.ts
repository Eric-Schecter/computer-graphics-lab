import { Mesh } from "./mesh";
import { SingleData, StructureData, Updater } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { SphereProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/sphere.glsl';
import { SphereDefaultValueHandler } from "../defaultvaluehandler";

export class Sphere extends Mesh {
  constructor(props: SphereProp, world: World, private id: number) {
    super(props, world);
    this._name = 'sphere';
    this.defaultValueHandler = new SphereDefaultValueHandler();
    const { position, radius, color, emissive, roughness, metallic, specTrans, specular, specColor, clearcoat, clearcoatGloss } = this.defaultValueHandler.process(props);
    this._intersection = intersection;
    this._parameters = new StructureData(`sphere[${id}]`, 'Sphere', [
      new StructureData('geometry', 'SphereGeometry', [
        new SingleData('position', 'vec3', new Updater(position)),
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
    ]);
  }
  public get hitInfo() {
    const name = `${this._name}[${this.id}].geometry.`;
    return `oInfo.x++;sphIntersection(ray,${name}position,${name}radius,gInfo,oInfo,${this.id});`;
  }
}