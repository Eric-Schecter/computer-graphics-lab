import { Mesh } from "./mesh";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { BoxProp } from "../../..";
import intersection from '../../webglrenderer/shader/intersection/box.glsl';

export class Box extends Mesh {
  public static id = 0;
  constructor(props: BoxProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    const { position, size, color, emissive, roughness, specular } = props;
    this._parameters = new StructureObserver(`boxes[${Box.id}]`, 'Box', new UStructData(
      new StructureObserver('geometry', 'BoxGeometry', new UStructData(
        new SingleObserver('position', 'vec3', new USingleData(position)),
        new SingleObserver('size', 'vec3', new USingleData(size)),
      )),
      new StructureObserver('material', 'Material', new UStructData(
        new SingleObserver('color', 'vec3', new USingleData(color)),
        new SingleObserver('emissive', 'vec3', new USingleData(emissive)),
        new SingleObserver('roughness', 'float', new USingleData(roughness)),
        new SingleObserver('specular', 'float', new USingleData(specular)),
      )),
    ))
    this._geometry = this.generateGeometryShader(Box.id, 'geometry');
    this._material = this.generateMaterialShader(Box.id, 'material', 'boxes');
    Box.id++;
  }
  protected generateGeometryShader = (id: number, type: string) => {
    const name = `boxes[${id}].${type}.`;
    return `boxIntersection(ray,${name}position,${name}size)`;
  }
  public get uniform(){
    return `uniform Box boxes[${Box.id}];`;
  }
  public get intersection() {
    return intersection;
  }
}