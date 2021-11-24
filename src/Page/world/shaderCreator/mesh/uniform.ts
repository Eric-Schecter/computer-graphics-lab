import { Generator } from "./generator";
import { Parameters } from "./prop";

export class UniformGenerator implements Generator {
  public generate = (data: Set<Parameters>) => {
    return [
      `uniform Sphere spheres[${data.size + 1}];`,
      `uniform Box boxes[${data.size + 1}];`,
    ];
    //todo set corrent size
    // const result = new Set<string>();
    // data.forEach(({uniform})=>result.add(uniform));
    // return Array.from(result);
  }
}