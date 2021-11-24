export class Parameters {
  protected type = '';
  protected materialKeywords = new Set<string>(['color', 'emissive']);
  protected geometryKeywords = new Set<string>(['position']);
  constructor(protected id: number) { }
  public handleData = (key: string) => {
    if (this.materialKeywords.has(key)) {
      return `${this.type}[${this.id}].material.${key}`;
    }
    if (this.geometryKeywords.has(key)) {
      return `${this.type}[${this.id}].geometry.${key}`;
    }
    return '';
  }
}