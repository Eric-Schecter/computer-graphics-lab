import { Parameters } from "./parameters";

export class Camera extends Parameters {
  protected type = 'uCamera';
  private keywords = new Set<string>(['position']);
  constructor() {
    super();
    this.keywords.add('lookat');
    this.keywords.add('rotation');
    this.keywords.add('fov');
  }
  public getUniform = (key: string) => {
    if (this.keywords.has(key)) {
      return `${this.type}.${key}`;
    }
    return '';
  }
}