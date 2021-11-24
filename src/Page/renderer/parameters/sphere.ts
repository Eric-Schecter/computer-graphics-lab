import { Parameters } from ".";

export class Sphere extends Parameters {
  protected type = 'spheres';
  constructor(protected id: number) {
    super(id);
    this.geometryKeywords.add('radius');
  }
}