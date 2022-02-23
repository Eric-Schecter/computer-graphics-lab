import { UniformData } from "../../.."
import { CLEARCOAT, CLEARCOATGLOSS, COLOR, EMISSIVE, SPECULAR, METALLIC, POSITION, ROUGHNESS, SPECCOLOR, SPECTRANS } from "../../../parameters";

export class DefaultValueHandler {
  protected defaultValue = new Map<string, UniformData>([
    ['position', POSITION],
    ['color', COLOR],
    ['emissive', EMISSIVE],
    ['roughness', ROUGHNESS],
    ['metallic', METALLIC],
    ['specTrans', SPECTRANS],
    ['specular', SPECULAR],
    ['specColor', SPECCOLOR],
    ['clearcoat', CLEARCOAT],
    ['clearcoatGloss', CLEARCOATGLOSS],
  ])
  public process = (props: { [key: string]: any }) => {
    const handledProps = {...props};
    for (const key of this.defaultValue.keys()) {
      const value = this.defaultValue.get(key);
      const isUndefined = props[key] === undefined && value !== undefined;
      handledProps[key] = isUndefined ? value : props[key];
    }
    return handledProps;
  }
}