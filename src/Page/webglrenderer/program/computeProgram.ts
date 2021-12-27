import { Program } from "./program";
import { UniformData } from "../../../types";
import { ShaderCreator } from "../shadercreator";
import { Store } from "../../reactrenderer/store";
import { FrameBufferHandler } from "./framebufferHandler";

export class ComputeProgram extends Program {
  private shaderCreator = new ShaderCreator();
  constructor(gl: WebGL2RenderingContext, private frameBufferHandler: FrameBufferHandler, vertex: string, fragment: string) {
    super(gl, vertex, fragment);
  }
  public draw = () => {
    this.gl.useProgram(this.program);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.uniformObserverable.update();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  public update = () => {
    const program = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
    this.frameBufferHandler.update(this.draw);
    this.gl.useProgram(program);
  }
  public updateParameter = (name: string, data: UniformData) => {
    this.uniformHandler.update(name, data);
  }
  public updateShader = (store: Store) => {
    const settings = {}; // todo get settings from data

    for (const instance of store.dataset.values()) {
      this.uniformObserverable.add(instance.parameters);
    }

    const shader = this.shaderCreator.create(store, settings, this.uniformObserverable.infos);
    const frag = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, shader);
    this.gl.detachShader(this.program, this.fragmentShader);
    this.fragmentShader = frag;
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