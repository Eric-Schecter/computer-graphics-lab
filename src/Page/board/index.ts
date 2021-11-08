import * as vertexShader from './vertexShader.vert';
import * as fragmentShader from './fragmentShader.frag';

export class Board {
  private timer: number = 0;
  private program: WebGLProgram | null = null;
  private gl: WebGL2RenderingContext | null = null;
  private vert: WebGLShader | null = null;
  private frag: WebGLShader | null = null;
  private needUpdate = true;
  constructor(canvas: HTMLCanvasElement) {
    const { width, height } = canvas;
    // init webgl
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      console.log('create webgl failed');
      return;
    }

    // init shader
    this.vert = this.createShader(this.gl, this.gl.VERTEX_SHADER, vertexShader);
    this.frag = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShader);
    if (!this.vert || !this.frag) {
      console.log('create shader failed');
      return;
    }

    // init program
    this.program = this.initProgram(this.gl, this.vert, this.frag);
    if (!this.program) {
      console.log('create program failed');
      return;
    }

    this.draw(this.gl, width, height);
  }
  public stop = () => {
    cancelAnimationFrame(this.timer);
    this.gl && this.destory(this.gl);
  }
  private update = (gl: WebGL2RenderingContext) => {
    if (!this.program) { return }
    const uTime = gl.getUniformLocation(this.program, 'uTime');
    const time = performance.now() / 1000;
    gl.uniform1f(uTime, time);
  }
  private draw = (gl: WebGL2RenderingContext, width: number, height: number) => {
    if (this.needUpdate) {
      this.initPosition(gl);
      this.initUniforms(gl, width, height);
      this.needUpdate = false;
    }
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    this.update(gl);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    this.timer = requestAnimationFrame(() => this.draw(gl, width, height));
  }
  private initUniforms = (gl: WebGL2RenderingContext, width: number, height: number) => {
    if (!this.program) { return }
    const uResolution = gl.getUniformLocation(this.program, 'uResolution');
    gl.uniform2f(uResolution, width, height);
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
  private initProgram = (gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) { return null; }
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Could not initialize shaders');
    }
    gl.useProgram(program);
    return program;
  }
  private addLineNumbers( string:string ) {
    const lines = string.split( '\n' );
    for ( let i = 0; i < lines.length; i ++ ) {
      lines[ i ] = ( i + 1 ) + ': ' + lines[ i ];
    }
    return lines.join( '\n' );
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
  private destory = (gl: WebGL2RenderingContext) => {
    if (!this.program || !this.vert || !this.frag) { return false; }
    gl.detachShader(this.program, this.vert);
    gl.detachShader(this.program, this.frag);
    gl.deleteShader(this.frag);
    gl.deleteProgram(this.program);
    this.program = null;
    return true;
  }
  public updateShader = (shader: string) => {
    if (!this.gl || !this.vert) { return }
    const result = this.destory(this.gl);
    if (!result) {
      console.log('destory webgl fail');
      return;
    }
    this.frag = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, shader);
    if (!this.frag) {
      console.log('create fragmenetShader failed');
      return;
    }
    this.program = this.initProgram(this.gl, this.vert, this.frag);
    this.needUpdate = true;
  }
}