import { Generator } from "./generator";

export class BoxGenerator extends Generator {
  constructor(private id:number) {
    super();
    this.generateMaterialStr();
    this.generateGeometryStr();
  }
  protected generateGeometryStr = () => {
    const name = `boxes[${this.id}].geometry.`;
    this._geometry = `boxIntersection(ray,${name}position,${name}size)`;
  }
  protected generateMaterialStr = () =>{
    const name = `boxes[${this.id}].material.`;
    this._material = `Material(${name}color,${name}emissive,${name}roughness,${name}specular)`;
  }
}