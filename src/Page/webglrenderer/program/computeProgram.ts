import { Program } from "./program";
import { ShaderCreator } from "../shadercreator";
import { Store } from "../../reactrenderer/store";
import { FrameBufferHandler } from "./framebufferHandler";
import { UpdaterKeep } from "../uniform";

export class ComputeProgram extends Program {
  private shaderCreator = new ShaderCreator();
  constructor(gl: WebGL2RenderingContext, private frameBufferHandler: FrameBufferHandler, vertex: string, fragment: string, size: UpdaterKeep) {
    super(gl, vertex, fragment,size);
  }
  public draw = () => {
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.uniformObserverable.update();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  public update = () => {
    const program = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
    this.frameBufferHandler.update(this.draw);
    this.gl.useProgram(program);
  }
  // public updateParameter = (name: string, data: UniformData) => {
  //   this.uniformHandler.update(name, data);
  // }
  public reset = () => {
    this.uniformObserverable.reset();
  }
  public updateShader = (store: Store) => {
    // this.reset();
    for (const instance of store.dataset.values()) {
      this.uniformObserverable.add(instance.parameters);
    }
    
    const shader = this.shaderCreator.create(store, store.settings, this.uniformObserverable.infos);
    this.gl.detachShader(this.program, this.fragmentShader);
    this.fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, shader);
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);
    this.uniformHandler.init(this.gl, this.program);
  }
  public get current() {
    return this.frameBufferHandler.current;
  }
  public get pre() {
    return this.frameBufferHandler.pre;
  }
}