import { Generator } from "./generator";
import { Parameters } from "./prop";

export class UniformGenerator implements Generator {
  public generate = (data: Set<Parameters>) => {
    return `
    uniform Sphere spheres[${data.size+1}];
    `;
    return `
    uniform Material materials[${data.size+1}];
    uniform Geometry geometries[${data.size+1}];
    `;
  }
}