import { GUI } from 'dat.gui';
import { UniformData } from '@youyouzone/react-sdf';

export class GUIHelper {
  private gui: any;
  constructor(container: HTMLDivElement) {
    this.gui = new GUI();
    container.appendChild(this.gui.domElement);
    this.gui.domElement.style.position = 'absolute';
    this.gui.domElement.style.top = '0';
  }
  public init = (state: { [prop: string]: UniformData }, setState: any) => {
    const change = (key: string, value: UniformData) => setState((pre: any) => { return { ...pre, ...{ [key]: value } } });
    const addItem = (folder: any, itemName: string, down: number, up: number) => folder.add(state, itemName, down, up, (up - down) / 100).onChange((value: UniformData) => change(itemName, value));
    const addColorItem = (folder: any, itemName: string) => folder.addColor(state, itemName).onChange((value: number[]) => change(itemName, value));

    const geometry = this.gui.addFolder('Geometry');
    addItem(geometry, 'radius', 0, 100);
    geometry.open();

    const shading = this.gui.addFolder('Shading');
    addColorItem(shading, 'color');
    addItem(shading, 'roughness', 0, 1);
    addItem(shading, 'metallic', 0, 1);
    addItem(shading, 'specular', 0, 10);
    addItem(shading, 'specTrans', 0, 1);
    shading.open();

    const clearcoat = this.gui.addFolder('Clearcoat');
    addItem(clearcoat, 'clearcoat', 0, 1);
    addItem(clearcoat, 'clearcoatGloss', 0, 1);
    clearcoat.open();

    const reflection = this.gui.addFolder('Reflection');
    addColorItem(reflection, 'specColor');
    reflection.open();

    const emissive = this.gui.addFolder('Emissive');
    addColorItem(emissive, 'emissive');
    emissive.open();
  }
}