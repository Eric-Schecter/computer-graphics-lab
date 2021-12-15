import { USingleData } from "./usingledata";

export class UTime extends USingleData<number> {
  public update = () => {
    return performance.now();
  }
}