export class FrameBufferHandler {
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
      throw new Error(`framebuffer is incomplete: ${status.toString()}`);
    }
    draw();
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
  }
  public get current() {
    return this.renderTargets[this.index];
  }
  public get pre() {
    return this.renderTargets[(this.index + 1) % 2];
  }
}