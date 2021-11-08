import { Instance } from "../../types";
import { Generator } from "./generator";
import { GeometryGenerator } from "./geometry";
import { MaterialGenerator } from "./material";
import * as opUnion from '../shader/opUnion.glsl';
import { SDFGenerator } from "./sdf";
import { BuilderGenerator,Parameters } from "./prop";

export class MeshGenerator implements Generator {
  private base = opUnion;
  private sdfs = new SDFGenerator();
  private material = new MaterialGenerator();
  private geometry = new GeometryGenerator();
  private builder = new BuilderGenerator();
  public generate = (data: Set<Instance>) => {
    // const sphereCallee = new SphereCallee();
    const handledData = new Set<Parameters>();
    for (const d of data) {
      handledData.add(this.builder.generate(d))
    }

    return `
    ${this.base}
    ${this.sdfs.generate(handledData)}
    ${this.material.generate(handledData)}
    ${this.geometry.generate(handledData)}
    `
  }
}