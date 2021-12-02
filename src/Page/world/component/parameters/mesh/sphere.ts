import { MeshParameters } from "./mesh";

export class Sphere extends MeshParameters {
  protected type = 'spheres';
  constructor() {
    super();
    this.geometryKeywords.add('radius');
  }
}