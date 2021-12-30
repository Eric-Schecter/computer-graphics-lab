import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { Instance } from "..";
import { CameraProp, Vec3 } from "../../..";
import { Matrix3, Vector3 } from "../../math";

class ViewMatrix extends Matrix3 {
  private _up = [0, 1, 0];
  public up = (v: Vec3) => {
    this._up = v;
    return this;
  }
  public lookat = (position: Vec3, target: Vec3) => {
    const rotation = 0;
    const forward = new Vector3().subVectors(target, position).normalize();
    const orientation = new Vector3(Math.sin(rotation), Math.cos(rotation), 0);
    const left = new Vector3().crossVectors(forward, orientation).normalize();
    const up = new Vector3().crossVectors(left, forward).normalize();
    return [left.x,left.y,left.z,up.x,up.y,up.z,forward.x,forward.y,forward.z];
  }
  public rotate = (rotation: number) => {

    return this;
  }
}

export class Camera extends Instance {
  constructor(props: CameraProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    const { position, lookat, rotation, fov } = props;
    const viewMatrix = new ViewMatrix()
      .rotate(rotation)
      .lookat(position, lookat)

    this._parameters = new StructureObserver('uCamera', 'Camera', new UStructData(
      new SingleObserver('position', 'vec3', new USingleData(position)),
      new SingleObserver('lookat', 'vec3', new USingleData(lookat)),
      new SingleObserver('rotation', 'float', new USingleData(rotation)),
      new SingleObserver('fov', 'float', new USingleData(fov)),
      new SingleObserver('viewMatrix', 'mat3', new USingleData(viewMatrix)),
    ));
  }
}