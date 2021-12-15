import { Generator } from ".";

export class SphereGenerator extends Generator {
  constructor(private id:number) {
    super();
    this.generateMaterialStr();
    this.generateGeometryStr();
  }
  protected generateGeometryStr = () => {
    const name = `spheres[${this.id}].geometry.`;
    this._geometry = `sphIntersection(ray,${name}position,${name}radius)`;
  }
  protected generateMaterialStr = () =>{
    const name = `spheres[${this.id}].material.`;
    this._material = `Material(${name}color,${name}emissive,${name}roughness,${name}specular)`;
  }
}
