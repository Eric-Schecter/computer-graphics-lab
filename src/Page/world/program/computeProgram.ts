import { Program } from "./program";
import { UniformData, Vector3 } from "../../types";
import { ShaderCreator } from "../shaderCreator";
import { SingleObserver, UTime, UPixelPre, UFrame, USingleData, UStructData, StructureObserver } from "../uniform";
import { Scene } from "../scene";

class FrameBufferHandler {
  private index = 0;
  private renderTargets: WebGLTexture[];
  private fb: WebGLFramebuffer;
  constructor(private gl: WebGL2RenderingContext, width: number, height: number) {
    this.fb = gl.createFramebuffer() as WebGLFramebuffer; // todo need delete or not
    this.renderTargets = new Array(2).fill(0).map(() => gl.createTexture()).flatMap(texture => texture ? [texture] : []);
    this.renderTargets.forEach(renderTarget => {
      gl.bindTexture(gl.TEXTURE_2D, renderTarget);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    })
  }
  public update = (draw: () => void) => {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
    this.index = (this.index + 1) % 2;
    const renderTarget = this.renderTargets[this.index];
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, renderTarget, 0);
    const status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    if (status !== this.gl.FRAMEBUFFER_COMPLETE) {
      console.log(`framebuffer is incomplete: ${status.toString()}`);
    } else {
      draw();
    }

    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
  public get current() {
    return this.renderTargets[this.index];
  }
  public get pre() {
    return this.renderTargets[(this.index + 1) % 2];
  }
}

// class Camera {
//   constructor() {

//   }
//   public create = ({ pos, lookat, rotation, fov }: { pos: Vector3, lookat: Vector3, rotation: number, fov: number }) => {
//     return new StructureObserver('uCamera', 'Camera',
//       new UStructData(
//         new SingleObserver('pos', 'vec3', new USingleData(pos, false)),
//         new SingleObserver('lookat', 'vec3', new USingleData(lookat, false)),
//         new SingleObserver('rotation', 'float', new USingleData(rotation, false)),
//         new SingleObserver('fov', 'float', new USingleData(fov, false)),
//       ))
//   }
//   public update = ({ name: string, data: any }: any) => {

//   }
// }

// class Mesh {

// }

export class ComputeProgram extends Program {
  private shaderCreator = new ShaderCreator();
  private frameBufferHandler: FrameBufferHandler;
  constructor(gl: WebGL2RenderingContext, width: number, height: number, vertex: string, fragment: string) {
    super(gl, vertex, fragment);
    this.frameBufferHandler = new FrameBufferHandler(gl, width, height);
    this.addParameter(new SingleObserver('uTime', 'float', new UTime(0)));
    this.addParameter(new SingleObserver('uFrame', 'int', new UFrame(0)));
    this.addParameter(new SingleObserver('uPixel', 'sampler2D', new UPixelPre(this)));
    this.addParameter(new SingleObserver('uResolution', 'vec2', new USingleData([width, height])));
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
  public updateShader = (scene: Scene) => {
    const settings = {}; // todo get settings from data

    scene.register(this.uniformObserverable);

    const shader = this.shaderCreator.create(scene, settings, this.uniformObserverable.infos);
    const frag = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, shader);
    if (!frag) { return; }
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