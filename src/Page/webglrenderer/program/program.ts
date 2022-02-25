import { UniformHandler, UniformObserverable, UpdaterKeep, UniformData } from '../uniform';

export class Program {
  protected program: WebGLProgram;
  protected uniformHandler = new UniformHandler();
  protected uniformObserverable = new UniformObserverable(this.uniformHandler);
  protected vertexShader: WebGLShader;
  protected fragmentShader: WebGLShader;
  constructor(protected gl: WebGL2RenderingContext, vertex: string, fragment: string, private size: UpdaterKeep) {
    const vertexShader = this.createShader(this.gl, this.gl.VERTEX_SHADER, vertex);
    const fragmentShader = this.createShader(this.gl, this.gl.FRAGMENT_SHADER, fragment);

    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.program = this.createProgram();

    this.gl.attachShader(this.program, this.vertexShader);
    this.gl.attachShader(this.program, this.fragmentShader);

    this.gl.linkProgram(this.program);
    this.gl.useProgram(this.program);

    this.uniformHandler.init(gl, this.program);
    this.initPosition(this.gl);
  }
  private createProgram = () => {
    const program = this.gl.createProgram();
    if (!program) {
      throw new Error('create program fail');
    }
    return program;
  }
  public addParameter = (data: UniformData) => {
    this.uniformObserverable.add(data);
  }
  public remvoeParameter = () => {

  }
  private initPosition = (gl: WebGL2RenderingContext) => {
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
  protected createShader = (gl: WebGL2RenderingContext, type: number, shaderStr: string) => {
    const shader = gl.createShader(type);
    if (!shader) {
      throw new Error('create shader fail');
    }
    gl.shaderSource(shader, shaderStr);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader))
      console.log(this.addLineNumbers(shaderStr));
      throw new Error('compile shader fail');
    }
    return shader;
  }
  public update = () => {
    this.gl.useProgram(this.program);
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    const [width, height] = this.size.data as number[];
    this.gl.viewport(0, 0, width, height);
    this.uniformObserverable.update();
    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
  }
  public destory = () => {
    this.gl.detachShader(this.program, this.vertexShader);
    this.gl.detachShader(this.program, this.fragmentShader);
    this.gl.deleteShader(this.fragmentShader);
    this.gl.deleteProgram(this.program);
  }
}