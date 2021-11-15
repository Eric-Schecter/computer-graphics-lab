import { Generator } from "./generator";
import { Parameters } from "./prop";

export class GeometryGenerator implements Generator {
  private start = `
  vec2 scene(vec3 p){
    vec2 res=vec2(1e10,0.);
  `
  private end = `
    return res;
  }
  `
  private getGeos = (data: Set<Parameters>) => {
    return Array.from(data.values())
      .map(d => d.geometry)
      .map((d, i) => `res=opUnion(res,vec2(${d},${i + 1}.));`)
      .join('\n');
  }
  public generate = (data: Set<Parameters>) => {
    return `
    ${this.start}
    ${this.getGeos(data)}
    ${this.end}
    `
  }
}