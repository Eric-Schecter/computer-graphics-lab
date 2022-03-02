
import { POSITION, RADIUS } from "../../../parameters";
import { MeshValueHandler } from "./mesh";

export class CylinderDefaultValueHandler extends MeshValueHandler {
  constructor() {
    super();
    this.defaultValue.set('top', POSITION);
    this.defaultValue.set('bottom', POSITION);
    this.defaultValue.set('radius', RADIUS);
  }
}