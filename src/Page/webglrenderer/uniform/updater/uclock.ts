import { USingleData } from ".";
import { Clock } from "../../clock";

export class UClock extends USingleData<Clock>{
  constructor(private clock:Clock) {
    super(clock);
  }
  public update = () => {
    return this.clock.now;
  }
}