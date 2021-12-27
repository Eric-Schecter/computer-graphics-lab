import { Instance } from "../";

export abstract class Mesh extends Instance {
  protected _geometry: string;
  protected _material: string;
  protected generateMaterialShader = (id: number, type: string, meshType: string) => {
    const name = `${meshType}[${id}].${type}.`;
    return `Material(${name}color,${name}emissive,${name}roughness,${name}specular)`;
  }
  public get geometry() {
    return this._geometry;
  }
  public get material() {
    return this._material;
  }
}