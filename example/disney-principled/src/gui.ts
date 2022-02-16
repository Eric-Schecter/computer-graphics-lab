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
    const shading = this.gui.addFolder('Shading');
    shading.add(state, 'radius', 0, 100, 1).onChange((value: UniformData) => setState((pre: any) => { return { ...pre, ...{ radius: value } } }));
    shading.add(state, 'roughness', 0, 1, 0.01).onChange((value: UniformData) => setState((pre: any) => { return { ...pre, ...{ roughness: value } } }));
    shading.add(state, 'metallic', 0, 1, 0.01).onChange((value: UniformData) => setState((pre: any) => { return { ...pre, ...{ metallic: value } } }));
    shading.add(state, 'specular', 0, 10, 0.1).onChange((value: UniformData) => setState((pre: any) => { return { ...pre, ...{ specular: value } } }));
    shading.add(state, 'specTrans', 0, 1, 0.01).onChange((value: UniformData) => setState((pre: any) => { return { ...pre, ...{ specTrans: value } } }));
    shading.open();
  }
}