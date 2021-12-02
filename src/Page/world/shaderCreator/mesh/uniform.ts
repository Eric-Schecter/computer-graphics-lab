import { Object3D } from "../../component";

export class UniformGenerator  {
  public generate = (data: Set<Object3D>) => {
    return [
      `uniform Sphere spheres[${data.size + 1 + 1}];`,
      `uniform Box boxes[${data.size + 1 + 1}];`,
    ];
    //todo set corrent size
    // const result = new Set<string>();
    // data.forEach(({uniform})=>result.add(uniform));
    // return Array.from(result);
  }
}