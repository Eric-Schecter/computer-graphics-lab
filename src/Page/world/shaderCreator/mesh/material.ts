import { Generator } from "./generator";
import { Parameters } from "./prop";

export class MaterialGenerator implements Generator {
  private start = 'void initMaterials(){';
  private end = '}';
  private getMats = (data: Set<Parameters>) => {
    const color = 'vec3(1.)';
    const diffuse = '0.';
    const specular = '0.';
    const materials = [`materials[0] = Material(${color}, ${diffuse},${specular});`];
    for (const instance of data) {
      materials.push(instance.material);
    }
    return materials;
  }
  public generate = (data: Set<Parameters>) => {
    return [
      this.start,
      ...this.getMats(data),
      this.end
    ];
  }
}