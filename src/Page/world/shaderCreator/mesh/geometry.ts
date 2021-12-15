import { Mesh } from "../../../instance/component";

export class GeometryGenerator  {
  private start = [
    'HitInfo scene(Ray ray){',
    'HitInfo res = HitInfo(Geometry(1e10,vec3(0.)),defaultMaterial);'
  ]
  private end = [
    'return res;',
    '}'
  ]
  private getGeos = (data: Set<Mesh>) => {
    return Array.from(data.values())
      .map(({ geometry, material }) => `res=opUnion(res,HitInfo(${geometry},${material}));`)
  }
  public generate = (data: Set<Mesh>) => {
    return [
      ...this.start,
      ...this.getGeos(data),
      ...this.end
    ]
  }
}