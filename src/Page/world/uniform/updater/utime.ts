import { USingleData } from "./usingledata";

export class UTime extends USingleData<number> {
  public get = () => {
    return performance.now();
  }
}