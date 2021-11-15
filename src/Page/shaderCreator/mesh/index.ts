import { Instance } from "../../types";
import { Generator } from "./generator";
import { GeometryGenerator } from "./geometry";
import { MaterialGenerator } from "./material";
import * as opUnion from '../shader/opUnion.glsl';
import { SDFGenerator } from "./sdf";
import { PropGenerator,Parameters } from "./prop";
import { UniformGenerator } from "./uniform";

export class MeshGenerator implements Generator {
  private base = opUnion;
  private sdfs = new SDFGenerator();
  // private material = new MaterialGenerator();
  private geometry = new GeometryGenerator();
  private prop = new PropGenerator();
  private uniform = new UniformGenerator();
  public generate = (data: Set<Instance>) => {
    const handledData = new Set<Parameters>();
    for (const d of data) {
      handledData.add(this.prop.generate(d))
    }
    
    return `
    ${this.uniform.generate(handledData)}
    ${this.base}
    ${this.sdfs.generate(handledData)}
    ${this.geometry.generate(handledData)}
    `
  }
}