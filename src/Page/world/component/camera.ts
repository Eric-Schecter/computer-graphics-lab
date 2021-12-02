import { Camera as CameraParameters } from "./parameters";
import { SingleObserver, StructureObserver, USingleData, UStructData } from "../uniform";
import { Object3D } from "./object3D";

export class Camera extends Object3D {
  public type = 'camera';
  protected uniformHandler = new CameraParameters();
  constructor(id: number) {
    super(id);
  }
  public getParameters = () => {
    return new StructureObserver('uCamera', 'Camera', new UStructData(
      new SingleObserver('position', 'vec3', new USingleData([0, 0,0], false)),
      new SingleObserver('lookat', 'vec3', new USingleData([0, 0, 0], false)),
      new SingleObserver('rotation', 'float', new USingleData(0, false)),
      new SingleObserver('fov', 'float', new USingleData(0, false)),
    ))
  }
}