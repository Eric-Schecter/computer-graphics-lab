import { SingleObserver, StructureObserver, USingleData, UStructData } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { Instance } from "..";
import { CameraProp, UniformData, Vec3 } from "../../..";
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

class UCameraPos extends USingleData<Vec3> {
  constructor(data:Vec3,private viewMatrix:ViewMatrix){
    super(data)
  }
  public update = (): UniformData => { 
    this.viewMatrix.setPosition(this._data).update();
    return this._data;
  }
}

class UCameraLookat extends USingleData<Vec3> {
  constructor(data:Vec3,private viewMatrix:ViewMatrix){
    super(data)
  }
  public update = (): UniformData => { 
    this.viewMatrix.setLookat(this._data).update();
    return this._data;
  }
}

class UCameraRot extends USingleData<number> {
  constructor(data:number,private viewMatrix:ViewMatrix){
    super(data)
  }
  public update = (): UniformData => { 
    // this.viewMatrix.setLookat(this._data).update();
    return this._data;
  }
}

class UCameraFov extends USingleData<number> {
  constructor(data:number,private viewMatrix:ViewMatrix){
    super(data)
  }
  public update = (): UniformData => { 
    // this.viewMatrix.setFov(this._data).update();
    return this._data;
  }
}


class UViewMatrixData extends USingleData<Vec3> {
  constructor(private viewMatrix:ViewMatrix){
    super(viewMatrix.data)
  }
  public update = (): UniformData => { 
    return this.viewMatrix.data;
  }
}

export class Camera extends Instance {
  constructor(props: CameraProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    const { position, lookat, rotation, fov } = props;
    const viewMatrix = new ViewMatrix(position, lookat).update();
    
    this._parameters = new StructureObserver('uCamera', 'Camera', new UStructData(
      new SingleObserver('position', 'vec3', new UCameraPos(position,viewMatrix)),
      new SingleObserver('lookat', 'vec3', new UCameraLookat(lookat,viewMatrix)),
      new SingleObserver('rotation', 'float', new UCameraRot(rotation,viewMatrix)),
      new SingleObserver('fov', 'float', new UCameraFov(fov,viewMatrix)),
      new SingleObserver('viewMatrix', 'mat3', new UViewMatrixData(viewMatrix)),
    ));
  }
}