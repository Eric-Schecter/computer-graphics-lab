import { DefaultValueHandler } from ".";
import { CLEARCOAT, CLEARCOATGLOSS, COLOR, EMISSIVE, SPECULAR, METALLIC, ROUGHNESS, SPECCOLOR, SPECTRANS } from "../../../parameters";

export class MeshValueHandler extends DefaultValueHandler{
  constructor(){
    super();
    this.defaultValue.set('color',COLOR);
    this.defaultValue.set('emissive',EMISSIVE);
    this.defaultValue.set('roughness',ROUGHNESS);
    this.defaultValue.set('metallic',METALLIC);
    this.defaultValue.set('specTrans',SPECTRANS);
    this.defaultValue.set('specular',SPECULAR);
    this.defaultValue.set('specColor',SPECCOLOR);
    this.defaultValue.set('clearcoat',CLEARCOAT);
    this.defaultValue.set('clearcoatGloss',CLEARCOATGLOSS);
  }
}