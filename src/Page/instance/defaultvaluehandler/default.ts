import { UniformDataType } from "../../.."
import { POSITION,ROTATION } from "../../../parameters";

export class DefaultValueHandler {
  protected defaultValue = new Map<string, UniformDataType>([
    ['position', POSITION],
    ['rotation', ROTATION],
  ])
  public process = (props: { [key: string]: any }) => {
    const handledProps = { ...props };
    for (const key of this.defaultValue.keys()) {
      const value = this.defaultValue.get(key);
      const isUndefined = props[key] === undefined && value !== undefined;
      handledProps[key] = isUndefined ? value : props[key];
    }
    return handledProps;
  }
}