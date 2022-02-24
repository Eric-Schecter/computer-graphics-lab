import { Updater } from "./updater";
import { Clock } from "../../clock";

export class UClock extends Updater<Clock>{
  constructor(private clock:Clock) {
    super(clock);
  }
  public update = () => {
    return this.clock.now;
  }
}