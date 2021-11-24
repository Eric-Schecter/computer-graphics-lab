import * as vertexShader from './Shaders/default.vert';
import * as fragmentShader from './Shaders/default.frag';
import * as renderFragmentShader from './Shaders/render.frag';
import { Instance } from '../types';
import { ShaderCreator } from './shaderCreator';
import { ComputeProgram, Program } from './program';
import { Observer } from './program/uniformObserverable';
import { UFrameUpdater, UTimeUpdater, UPixelUpdater, UResolution } from './updater';
import { UPixelData } from './updater/uPixel';
import { UCamera } from './updater/uCamera';

export class World {
  private timer = 0;
  private gl: WebGL2RenderingContext | null = null;
  private shaderCreator = new ShaderCreator();
  private renderProgram: Program;
  private computeProgram: ComputeProgram;
  constructor(canvas: HTMLCanvasElement) {
    // init webgl
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      console.log('create webgl failed');
      return;
    }
    const { width, height } = canvas;
    this.renderProgram = new Program(this.gl, width, height, vertexShader, renderFragmentShader);
    this.computeProgram = new ComputeProgram(this.gl, width, height, vertexShader, fragmentShader);
    this.renderProgram.addParameter(new Observer('uPixel', 'vec2', new UPixelUpdater(this.computeProgram)));
    this.computeProgram.addParameter(new Observer('uTime', 'float', new UTimeUpdater()));
    this.computeProgram.addParameter(new Observer('uFrame', 'int', new UFrameUpdater()));
    this.computeProgram.addParameter(new Observer('uPixel', 'sampler2D', new UPixelData(this.computeProgram)));
    this.computeProgram.addParameter(new Observer('uCameraPos', 'vec3', new UCamera()));
    this.computeProgram.addParameter(new Observer('uResolution', 'vec2', new UResolution(width, height)));

    this.draw();
  }
  public stop = () => {
    cancelAnimationFrame(this.timer);
  }
  public destory = () => {
    this.stop();
    if (this.gl) {
      this.computeProgram.destory();
      this.renderProgram.destory();
    }
  }
  private draw = () => {
    this.renderProgram.update();
    this.timer = requestAnimationFrame(this.draw);
  }

  public updateShader = (data: Set<Instance>) => {
    if (!this.gl) { return }
    this.computeProgram.updateShader(data, this.shaderCreator);
  }
  public updateParameters = ({ name, data }: any) => {
    this.computeProgram.updateParameters(name, data);
  }
}