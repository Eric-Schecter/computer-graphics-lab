import * as vertexShader from './shader/template/default.vert';
import * as fragmentShader from './shader/template/default.frag';
import * as renderFragmentShader from './shader/template/render.frag';
import { ComputeProgram, RenderProgram, FrameBufferHandler } from './program';
import { Store } from '../reactrenderer/store';
import { TaskHandler } from './taskHandler';
import { SingleData, UFrame, UPixelCurrent, UPixelPre, UpdaterKeep } from './uniform';
import { Clock } from './clock';
import { InputSystem } from '../inputSystem';

export class World {
  private timer = 0;
  private gl: WebGL2RenderingContext | null = null;
  private renderProgram: RenderProgram;
  private computeProgram: ComputeProgram;
  private clock = new Clock();
  private frame = new UFrame(0, this);
  private size: UpdaterKeep;
  private isStart = false;
  public isMoving = false;
  private static instance: World;
  private ispaused = false;
  public static getInstance = (canvas: HTMLCanvasElement, taskHandler: TaskHandler, inputStstem: InputSystem) => {
    if (!World.instance) {
      World.instance = new World(canvas, taskHandler, inputStstem);
    }
    return World.instance;
  }
  constructor(private canvas: HTMLCanvasElement, private taskHandler: TaskHandler, private inputStstem: InputSystem) {
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      throw new Error('create webgl failed');
    }
    const { width, height } = canvas;
    this.size = new UpdaterKeep([width, height]);
    const framebufferHandler = new FrameBufferHandler(this.gl, this.size);
    this.createComputeProgram(this.gl, framebufferHandler);
    this.createRenderProgram(this.gl);

    // window.addEventListener('keydown', (e: any) => {
    //   if (e.key === 'p') {
    //     this.ispaused = !this.ispaused;
    //   }
    // })
  }
  private createComputeProgram = (gl: WebGL2RenderingContext, framebufferHandler: FrameBufferHandler) => {
    this.computeProgram = new ComputeProgram(gl, framebufferHandler, vertexShader, fragmentShader, this.size);
    // this.computeProgram.addParameter(new SingleObserver('uTime', 'float', new UClock(this.clock)));
    this.computeProgram.addParameter(new SingleData('uFrame', 'int', this.frame));
    this.computeProgram.addParameter(new SingleData('uPixel', 'sampler2D', new UPixelPre(this.computeProgram)));
    this.computeProgram.addParameter(new SingleData('uResolution', 'vec2', this.size));
  }
  private createRenderProgram = (gl: WebGL2RenderingContext) => {
    this.renderProgram = new RenderProgram(gl, vertexShader, renderFragmentShader, this.size);
    this.renderProgram.addParameter(new SingleData('uPixel', 'sampler2D', new UPixelCurrent(this.computeProgram)));
    this.renderProgram.addParameter(new SingleData('uResolution', 'vec2', this.size));
  }
  public destory = () => {
    cancelAnimationFrame(this.timer);
    this.computeProgram.destory();
    this.renderProgram.destory();
  }
  private resize = () => {
    const { clientWidth, clientHeight, width, height } = this.canvas;
    if (clientWidth === width && clientHeight === height) {
      return;
    }
    this.canvas.width = clientWidth;
    this.canvas.height = clientHeight;
    this.size.data = [clientWidth, clientHeight];
    this.isMoving = true;
  }
  private draw = () => {
    if (!this.ispaused) {
      this.clock.update();
      this.inputStstem.update();
      this.taskHandler.update(this.clock.delta, this.clock.now);
      this.resize();
      this.renderProgram.update();
    }
    this.timer = requestAnimationFrame(this.draw);
  }
  public start = () => {
    if (!this.isStart) {
      this.isStart = true;
      this.draw();
    }
  }
  public updateShader = (store: Store) => {
    this.computeProgram.updateShader(store);
  }
  // public updateParameter = (name: string, data: UniformData) => {
  //   this.computeProgram.updateParameter(name, data);
  // }
  public get context() {
    return this.gl;
  }
}