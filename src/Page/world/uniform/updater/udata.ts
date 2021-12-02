export class UData {
  constructor(protected _needUpdate = true) { }
  public get needUpdate() {
    return this._needUpdate;
  }
}