import { Parameters } from "../parameters";

export abstract class MeshParameters extends Parameters{
  protected type = '';
  protected materialKeywords = new Set<string>(['color', 'emissive']);
  protected geometryKeywords = new Set<string>(['position']);
  public getUniform = (key: string,id:number) => {
    if (this.materialKeywords.has(key)) {
      return `${this.type}[${id}].material.${key}`;
    }
    if (this.geometryKeywords.has(key)) {
      return `${this.type}[${id}].geometry.${key}`;
    }
    return '';
  }
}