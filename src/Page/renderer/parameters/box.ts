import { Parameters } from ".";

export class Box extends Parameters {
  protected type = 'boxes';
  constructor(protected id: number) {
    super(id);
    this.geometryKeywords.add('size');
  }
}