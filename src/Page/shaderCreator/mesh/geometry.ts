import { Generator } from "./generator";
import { Parameters } from "./prop";

export class GeometryGenerator implements Generator {
  private start = `
  HitInfo scene(Ray ray){
    HitInfo res = HitInfo(Geometry(1e10,vec3(0.)),defaultMaterial);
  `
  private end = `
    return res;
  }
  `
  private getGeos = (data: Set<Parameters>) => {
    return Array.from(data.values())
      .map(({ geometry, material }) => `res=opUnion(res,HitInfo(${geometry},${material}));`)
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