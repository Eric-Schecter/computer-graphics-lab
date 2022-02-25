import { SingleData, StructureData, Updater } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { Instance } from "..";
import { CameraProp, UniformDataType, Vec3 } from "../../..";
import { Matrix3, Matrix4, Vector3 } from "../../math";

class ViewMatrix extends Matrix3 {
  constructor(private _position = [0, 0, 0], private _lookat = [0, 0, 0]) {
    super();
  }
  public update = () => {
    const rotation = 0;
    const forward = new Vector3().subVectors(this._lookat, this._position).normalize();
    const orientation = new Vector3(Math.sin(rotation), Math.cos(rotation), 0);
    const left = new Vector3().crossVectors(forward, orientation).normalize();
    const up = new Vector3().crossVectors(left, forward).normalize();

    this._data = [
      left.x, left.y, left.z,
      up.x, up.y, up.z,
      forward.x, forward.y, forward.z,
    ];
    return this;
  }
  public setPosition(vec3: Vec3) {
    this._position = vec3;
    return this;
  }
  public setLookat(vec3: Vec3) {
    this._lookat = vec3;
    return this;
  }
}

class UCameraPos extends Updater<Vec3> {
  constructor(data: Vec3, private viewMatrix: ViewMatrix) {
    super(data)
  }
  public update = (): UniformDataType => {
    this.viewMatrix.setPosition(this._data).update();
    return this._data;
  }
}

class UCameraLookat extends Updater<Vec3> {
  constructor(data: Vec3, private viewMatrix: ViewMatrix) {
    super(data)
  }
  public update = (): UniformDataType => {
    this.viewMatrix.setLookat(this._data).update();
    return this._data;
  }
}

class UCameraRot extends Updater<number> {
  constructor(data: number, private viewMatrix: ViewMatrix) {
    super(data)
  }
  public update = (): UniformDataType => {
    // this.viewMatrix.setLookat(this._data).update();
    return this._data;
  }
}

class UCameraFov extends Updater<number> {
  constructor(data: number, private viewMatrix: ViewMatrix) {
    super(data)
  }
  public update = (): UniformDataType => {
    // this.viewMatrix.setFov(this._data).update();
    return this._data;
  }
}


class UViewMatrixData extends Updater<Vec3> {
  constructor(private viewMatrix: ViewMatrix) {
    super(viewMatrix.data)
  }
  public update = (): UniformDataType => {
    return this.viewMatrix.data;
  }
}

export class Camera extends Instance {
  constructor(props: CameraProp, world: World) {
    super(props, world);
    const { position, lookat, rotation, fov } = props;
    const viewMatrix = new ViewMatrix(position, lookat).update();
    
    this._parameters = new StructureData('uCamera', 'Camera', [
      new SingleData('position', 'vec3', new UCameraPos(position, viewMatrix)),
      new SingleData('lookat', 'vec3', new UCameraLookat(lookat, viewMatrix)),
      new SingleData('rotation', 'float', new UCameraRot(rotation, viewMatrix)),
      new SingleData('fov', 'float', new UCameraFov(fov, viewMatrix)),
      new SingleData('viewMatrix', 'mat3', new UViewMatrixData(viewMatrix)),
    ]);
  }
}