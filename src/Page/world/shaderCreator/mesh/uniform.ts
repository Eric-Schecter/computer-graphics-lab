import { Generator } from "./generator";
import { Parameters } from "./prop";

export class UniformGenerator implements Generator {
  public generate = (data: Set<Parameters>) => {
    return [
      `uniform Sphere spheres[${data.size+1}];`,
    ];
  }
}