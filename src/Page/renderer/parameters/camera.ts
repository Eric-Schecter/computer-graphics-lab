import { Parameters } from ".";

export class Camera extends Parameters {
  protected type = 'camera';
  constructor(protected id: number) {
    super(id);
    this.geometryKeywords.add('lookat');
    this.geometryKeywords.add('rotation');
  }
}