import { MeshParameters } from "./mesh";

export class Box extends MeshParameters {
  protected type = 'boxes';
  constructor() {
    super();
    this.geometryKeywords.add('size');
  }
}