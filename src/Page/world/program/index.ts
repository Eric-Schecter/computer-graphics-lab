import { Instance, UniformData } from '../../types';
import { ShaderCreator } from '../shaderCreator';
import { UniformHandler } from './uniformHandler';
import { Observer, UniformObserverable } from './uniformObserverable';

export class Program {
  protected program: WebGLProgram;
  private uniformHandler = new UniformHandler();
  protected uniformObserverable = new UniformObserverable(this.uniformHandler);
  private vertexShader: WebGLShader;
  private fragmentShader: WebGLShader;
  constructor(protected gl: WebGL2RenderingContext, protected width: number, protected height: number, vertex: string, fragment: string) {
    const vertexShader = this.createShader(this.gl, this.gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragment);
    if (!vertexShader || !fragmentShader) {
      console.log('create shader failed');
      return;
    }

    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    const program = this.gl.createProgram();
    if (!program) {
      console.log('create program fail');
      return;
    }

    this.program = program;

    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.initUniforms(this.gl);
    this.initPosition(this.gl);
  }
  public addParameter = (oberver: Observer) => {
    this.uniformObserverable.add(oberver);
  }
  private initUniforms = (gl: WebGL2RenderingContext) => {
    if (!this.program) { return }
    this.uniformHandler.init(gl, this.program);
    this.uniformHandler.update('uResolution', [this.width, this.height]);
  }
  private initPosition = (gl: WebGL2RenderingContext) => {
    if (!this.program) { return }
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
      -1, -1,
      -1, 1,
      1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(this.program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  }
  private addLineNumbers(string: string) {
    const lines = string.split('\n');
    for (let i = 0; i < lines.length; i++) {
      lines[i] = (i + 1) + ': ' + lines[i];
    }
    return lines.join('\n');
  }
  private createShader = (gl: WebGL2RenderingContext, type: number, shaderStr: string) => {
    const shader = gl.createShader(type);
    if (!shader) {
      console.log('create shader fail')
      return null;
    }
    gl.shaderSource(shader, shaderStr);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader))
      console.log(this.addLineNumbers(shaderStr));
      return null;
    }
    return shader;
  }
  public update = () => {
    this.gl.useProgram(this.program);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.uniformObserverable.update();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  public updateParameters = (name: string, data: UniformData) => {
    this.uniformHandler.update(name, data);
  }
  public updateShader = (data: Set<Instance>, shaderCreator: ShaderCreator) => {
    const settings = {}; // todo get settings from data
    const shader = shaderCreator.create(data, settings, this.uniformObserverable.infos);
    const frag = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, shader);
    if (!frag) { return; }
    this.gl.detachShader(this.program, this.fragmentShader);
    this.fragmentShader = frag;
    this.gl.attachShader(this.program, this.fragmentShader);
    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);
    this.initUniforms(this.gl);
  }
  public destory = () => {
    if (!this.program || !this.vertexShader || !this.fragmentShader) { return false; }
    this.gl.detachShader(this.program, this.vertexShader);
    this.gl.detachShader(this.program, this.fragmentShader);
    this.gl.deleteShader(this.fragmentShader);
    this.gl.deleteProgram(this.program);
    return true;
  }
}

class RenderProgram extends Program {
  public update = () => {
    this.gl.useProgram(this.program);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.uniformObserverable.update();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
}

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
  public update = (program: ComputeProgram, width: number, height: number) => {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
    this.index = (this.index + 1) % 2;
    const renderTarget = this.renderTargets[this.index];
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, renderTarget, 0);

    const status = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    if (status !== this.gl.FRAMEBUFFER_COMPLETE) {
      console.log(`framebuffer is incomplete: ${status.toString()}`);
    } else {
      program.draw();
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

export class ComputeProgram extends Program {
  private frameBufferHandler = new FrameBufferHandler(this.gl, this.width, this.height);
  public draw = () => {
    this.gl.useProgram(this.program);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    this.uniformObserverable.update();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  public update = () => {
    const program = this.gl.getParameter(this.gl.CURRENT_PROGRAM);
    this.frameBufferHandler.update(this, this.width, this.height);
    this.gl.useProgram(program);
  }
  public get current() {
    return this.frameBufferHandler.current;
  }
  public get pre() {
    return this.frameBufferHandler.pre;
  }
}

// export class Programs {
//   private computationPrograms:Program[] = [];
//   private renderPrograms: Program[] = []; // scene(framebuffer) -> render(canvas)

//   public add = (program: Program,type:'compute' | 'render') => {
//     if(type==='compute'){
//       this.computationPrograms.push(program);
//     }else{
//       this.renderPrograms.push(program);
//     }
//   }
//   public update = () => {
//     // if (this.programs.length <= 1) {
//     //   return;
//     // }
//     this.computationPrograms.forEach(program=>program.update());
//     this.renderPrograms.forEach(program => program.update());
//   }
//   public updateParameters = (name: string, data: UniformData) => {
//     this.computationPrograms.forEach(program => program.updateParameters(name, data));
//   }
//   public updateShader = (shader: string) => {
//     this.computationPrograms.forEach(program=>program.updateShader(shader));
//   }
//   public destory = () => {
//     this.computationPrograms.forEach(program => program.destory());
//     this.computationPrograms = [];
//     this.renderPrograms.forEach(program => program.destory());
//     this.renderPrograms = [];
//   }
// }