export class Clock {
  private pre: number;
  private _now: number;
  constructor() {
    this.pre = performance.now();
    this._now = this.pre;
  }
  public update = () => {
    this.pre = this._now;
    this._now = performance.now();
  }
  public get delta() {
    return this._now - this.pre;
  }
  public get now() {
    return this._now;
  }
}