import { Instance } from "../";

export abstract class Mesh extends Instance {
  protected _geometry: string;
  protected _material: string;
  protected generateMaterialShader = (id: number, type: string, meshType: string) => {
    const name = `${meshType}[${id}].${type}.`;
    return `Material(${name}color,${name}emissive,${name}roughness,${name}specular)`;
  }
  public get hitInfo(){
    return `res=opUnion(res,HitInfo(${this._geometry},${this._material}));`
  }
  public abstract get uniform():string;
  public abstract get intersection():string;
}