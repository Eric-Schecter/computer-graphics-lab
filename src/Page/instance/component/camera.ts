import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { Instance } from "..";
import { CameraProp } from "../../..";

export class Camera extends Instance {
  constructor(props: CameraProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    const { position, lookat, rotation, fov, } = props;
    const viewMatrix = [
      0,0,0,0,
      0,0,0,0,
      0,0,0,0,
      0,0,0,0
    ]
    this._parameters = new StructureObserver('uCamera', 'Camera', new UStructData(
      new SingleObserver('position', 'vec3', new USingleData(position)),
      new SingleObserver('lookat', 'vec3', new USingleData(lookat)),
      new SingleObserver('rotation', 'float', new USingleData(rotation)),
      new SingleObserver('fov', 'float', new USingleData(fov)),
      new SingleObserver('viewMatrix','mat4', new USingleData(viewMatrix)),
    ));
  }
}