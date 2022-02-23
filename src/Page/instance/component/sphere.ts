import { Mesh } from "./mesh";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { SphereProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/sphere.glsl';
import { SphereDefaultValueHandler } from "../defaultvaluehandler";

export class Sphere extends Mesh {
  constructor(props: SphereProp, canvas: HTMLCanvasElement, world: World, id: number) {
    super(props, canvas, world);
    this._name = 'sphere';
    this.defaultValueHandler = new SphereDefaultValueHandler();
    const { position, radius, color, emissive, roughness, metallic, specTrans, specular, specColor, clearcoat, clearcoatGloss } = this.defaultValueHandler.process(props);
    this._intersection = intersection;
    this._parameters = new StructureObserver(`sphere[${id}]`, 'Sphere', new UStructData(
      new StructureObserver('geometry', 'SphereGeometry', new UStructData(
        new SingleObserver('position', 'vec3', new USingleData(position)),
        new SingleObserver('radius', 'float', new USingleData(radius)),
      )),
      new StructureObserver('material', 'Material', new UStructData(
        new SingleObserver('color', 'vec3', new USingleData(color)),
        new SingleObserver('emissive', 'vec3', new USingleData(emissive)),
        new SingleObserver('roughness', 'float', new USingleData(roughness)),
        new SingleObserver('metallic', 'float', new USingleData(metallic)),
        new SingleObserver('specTrans', 'float', new USingleData(specTrans)),
        new SingleObserver('specColor', 'vec3', new USingleData(specColor)),
        new SingleObserver('clearcoat', 'float', new USingleData(clearcoat)),
        new SingleObserver('clearcoatGloss', 'float', new USingleData(clearcoatGloss)),
        new SingleObserver('specular', 'float', new USingleData(specular)),
      )),
    ));
    this._geometry = this.generateGeometryShader(id);
    this._material = this.generateMaterialShader(id, 'material');
  }
  private generateGeometryShader = (id: number) => {
    const name = `${this._name}[${id}].geometry.`;
    return `sphIntersection(ray,${name}position,${name}radius)`;
  }
}