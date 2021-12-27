import { Mesh } from "./mesh";
import { SphereGenerator } from "./generator/sphere";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { SphereProp } from "../../..";

export class Sphere extends Mesh {
  private static id = 0;
  protected _parameters: StructureObserver;
  constructor(props: SphereProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    const { position, radius, color, emissive, roughness, specular } = props;
    this._parameters = new StructureObserver(`spheres[${Sphere.id}]`, 'Sphere', new UStructData(
      new StructureObserver('geometry', 'SphereGeometry', new UStructData(
        new SingleObserver('position', 'vec3', new USingleData(position)),
        new SingleObserver('radius', 'float', new USingleData(radius)),
      )),
      new StructureObserver('material', 'Material', new UStructData(
        new SingleObserver('color', 'vec3', new USingleData(color)),
        new SingleObserver('emissive', 'vec3', new USingleData(emissive)),
        new SingleObserver('roughness', 'float', new USingleData(roughness)),
        new SingleObserver('specular', 'float', new USingleData(specular)),
      )),
    ));
    this.generator = new SphereGenerator(Sphere.id);
    Sphere.id++;
  }
  public get position(){
    return this._parameters;
  }
}