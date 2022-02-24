import { Mesh } from "./mesh";
import { SingleObserver, StructureObserver, USingleData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { BoxProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/box.glsl';
import { BoxDefaultValueHandler } from "../defaultvaluehandler";

export class Box extends Mesh {
  constructor(props: BoxProp, canvas: HTMLCanvasElement, world: World, id: number) {
    super(props, canvas, world);
    this._name = 'box';
    this.defaultValueHandler = new BoxDefaultValueHandler();
    const { position, size, color, emissive, roughness, metallic, specTrans, specular, specColor, clearcoat, clearcoatGloss } = this.defaultValueHandler.process(props);
    this._intersection = intersection;
    this._parameters = new StructureObserver(`box[${id}]`, 'Box', [
      new StructureObserver('geometry', 'BoxGeometry', [
        new SingleObserver('position', 'vec3', new USingleData(position)),
        new SingleObserver('size', 'vec3', new USingleData(size)),
      ]),
      new StructureObserver('material', 'Material', [
        new SingleObserver('color', 'vec3', new USingleData(color)),
        new SingleObserver('emissive', 'vec3', new USingleData(emissive)),
        new SingleObserver('roughness', 'float', new USingleData(roughness)),
        new SingleObserver('metallic', 'float', new USingleData(metallic)),
        new SingleObserver('specTrans', 'float', new USingleData(specTrans)),
        new SingleObserver('specColor', 'vec3', new USingleData(specColor)),
        new SingleObserver('clearcoat', 'float', new USingleData(clearcoat)),
        new SingleObserver('clearcoatGloss', 'float', new USingleData(clearcoatGloss)),
        new SingleObserver('specular', 'float', new USingleData(specular)),
      ]),
    ])
    this._geometry = this.generateGeometryShader(id);
    this._material = this.generateMaterialShader(id, 'material');
  }
  protected generateGeometryShader = (id: number) => {
    const name = `${this._name}[${id}].geometry.`;
    return `boxIntersection(ray,${name}position,${name}size)`;
  }
}