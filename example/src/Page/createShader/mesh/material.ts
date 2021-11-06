import { Instance } from "../../types";
import { clamp, int2float } from "../functions";
import { Generator } from "./generator";

export class MaterialGenerator implements Generator {
  private count = 1;
  private start = (count: number) => `Material materials[${count}] = Material[](`;
  private end = ');'
  private materials: string[] = [];
  constructor() {
    this.init();
  }
  private add = (data: Set<Instance>) => {
    for (const { props: { color, diffuse, specular } } of data) {
      const c = Object.values(color).map(d => int2float(clamp(d, 0, 1)));
      this.materials.push(`Material(vec3(${c[0]},${c[1]},${c[2]}),${int2float(diffuse)},${int2float(specular)})`);
    }
    this.count = data.size + 1;
  }
  private init = () => {
    this.materials = [`Material(vec3(0.), 0., 0.)`];
  }
  public generate = (data: Set<Instance>) => {
    this.add(data);
    const materials = this.materials.join(',\n');
    const result = `
    ${this.start(this.count)}
    ${materials}
    ${this.end}
      `
    this.init();
    return result;
  }
}