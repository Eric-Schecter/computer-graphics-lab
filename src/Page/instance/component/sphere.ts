import { Mesh } from "./mesh";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { SphereProp, Vec3 } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/sphere.glsl';

export class Sphere extends Mesh {
  public static id = 0;
  private _position: USingleData<Vec3>;
  constructor(props: SphereProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    const { position, radius, color, emissive, roughness, specular, metallic } = props;
    this._position = new USingleData(position);
    this._parameters = new StructureObserver(`spheres[${Sphere.id}]`, 'Sphere', new UStructData(
      new StructureObserver('geometry', 'SphereGeometry', new UStructData(
        new SingleObserver('position', 'vec3', this._position),
        new SingleObserver('radius', 'float', new USingleData(radius)),
      )),
      new StructureObserver('material', 'Material', new UStructData(
        new SingleObserver('color', 'vec3', new USingleData(color)),
        new SingleObserver('emissive', 'vec3', new USingleData(emissive)),
        new SingleObserver('roughness', 'float', new USingleData(roughness)),
        new SingleObserver('specular', 'float', new USingleData(specular)),
        new SingleObserver('metallic', 'float', new USingleData(metallic)),
      )),
    ));
    this._geometry = this.generateGeometryShader(Sphere.id, 'geometry');
    this._material = this.generateMaterialShader(Sphere.id, 'material', 'spheres');
    Sphere.id++;
  }
  private generateGeometryShader = (id: number, type: string) => {
    const name = `spheres[${id}].${type}.`;
    return `sphIntersection(ray,${name}position,${name}radius)`;
  }
  public get position() {
    return this._position.data;
  }
  public get uniform() {
    return `uniform Sphere spheres[${Sphere.id}];`;
  }
  public get intersection() {
    return intersection;
  }
}