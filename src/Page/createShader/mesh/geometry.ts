import { Instance } from "../../types";
import { int2float } from "../functions";
import { Generator } from "./generator";

export class GeometryGenerator implements Generator {
  private start = `
  vec2 scene(vec3 p){
    vec2 res=vec2(1e10,0.);
  `
  private end = `
    return res;
  }
  `
  private geometries: string[] = [];
  private add = (data: Set<Instance>) => {
    for (const { type, props: { position, radius } } of data) {
      if (type === 'sphere') {
        const x = int2float(position.x);
        const y = int2float(position.y);
        const z = int2float(position.z);
        const r = int2float(radius);
        this.geometries.push(`sdSphere(p-vec3(${x},${y},${z}),${r})`);
      }
    }

    // this.geometries.push('sdPlane(p-vec3(0.,0.001,0.))');
  }
  public generate = (data: Set<Instance>) => {
    this.add(data);
    const geometries = this.geometries.map((d, i) => `res=opUnion(res,vec2(${d},${i + 1}.));\n`);
    const result = `
    ${this.start}
    ${geometries.join('\n')}
    ${this.end}
    `
    this.geometries = [];
    return result;
  }
}