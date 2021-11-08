import { Generator } from "./generator";
import { Parameters } from "./prop";

export class MaterialGenerator implements Generator {
  private count = 1;
  private start = (count: number) => `Material materials[${count}] = Material[](`;
  private end = ');'
  private getMats = (data: Set<Parameters>) => {
    const materials = [`Material(vec3(0.), 0., 0.)`];
    for (const instance of data) {
      materials.push(instance.material);
    }
    return materials.join(',\n');
  }
  public generate = (data: Set<Parameters>) => {
    this.count = data.size + 1;
    return `
    ${this.start(this.count)}
    ${this.getMats(data)}
    ${this.end}
    `
  }
}