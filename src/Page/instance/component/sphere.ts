import { Mesh } from "./mesh";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { SphereProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/sphere.glsl';
import { SphereDefaultValueHandler } from "../defaultvaluehandler";

export class Sphere extends Mesh {
  constructor(props: SphereProp, canvas: HTMLCanvasElement, world: World, private table: { [prop: string]: number }) {
    super(props, canvas, world);
    this.defaultValueHandler = new SphereDefaultValueHandler();
    const { position, radius, color, emissive, roughness, metallic, specTrans, specular, specColor, clearcoat, clearcoatGloss } = this.defaultValueHandler.process(props);
    this._intersection = intersection;
    const id = table['sphere'];
    this._parameters = new StructureObserver(`spheres[${id}]`, 'Sphere', new UStructData(
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
    this._geometry = this.generateGeometryShader(id, 'geometry');
    this._material = this.generateMaterialShader(id, 'material', 'spheres');
  }
  private generateGeometryShader = (id: number, type: string) => {
    const name = `spheres[${id}].${type}.`;
    return `sphIntersection(ray,${name}position,${name}radius)`;
  }
  public get uniform() {
    return `uniform Sphere spheres[${this.table['sphere']+1}];`;
  }
}