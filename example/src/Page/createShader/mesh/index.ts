import { Instance } from "../../types";
import { Generator } from "./generator";
import { GeometryGenerator } from "./geometry";
import { MaterialGenerator } from "./material";

export class MeshGenerator implements Generator {
  private base = `
  vec2 opUnion(vec2 s1,vec2 s2){
    return s1.x<s2.x ? s1 : s2;
  }`
  private material = new MaterialGenerator();
  private geometry = new GeometryGenerator();
  public generate = (data: Set<Instance>) => {
    return `
    ${this.base}
    ${this.material.generate(data)}
    ${this.geometry.generate(data)}
    `
  }
}