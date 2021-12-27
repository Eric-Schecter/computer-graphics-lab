import { Instance } from "../../../instance";

export class UniformGenerator  {
  public generate = (data: Set<Instance>) => {
    return [
      `uniform Sphere spheres[${data.size}];`,
      `uniform Box boxes[${data.size}];`,
    ];
    //todo set corrent size
    // const result = new Set<string>();
    // data.forEach(({uniform})=>result.add(uniform));
    // return Array.from(result);
  }
}