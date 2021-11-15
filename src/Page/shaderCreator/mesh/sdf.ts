import { Generator } from "./generator";
import { Parameters } from "./prop";

export class SDFGenerator implements Generator {
  public generate = (data: Set<Parameters>) => {
    const sdfs = new Set();
    for (const { sdf } of data) {
      sdfs.add(sdf);
    }
    return Array.from(sdfs).join('\n');
  }
}