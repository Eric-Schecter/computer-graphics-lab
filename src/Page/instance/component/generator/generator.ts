export abstract class Generator {
  protected _geometry = '';
  protected _material = '';
  protected abstract generateGeometryStr: () => void;
  protected abstract generateMaterialStr: () => void;
  public get geometry() {
    return this._geometry;
  }
  public get material() {
    return this._material;
  }
}