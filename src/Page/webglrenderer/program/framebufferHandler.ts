import { USingleData } from "../uniform";

export class FrameBufferHandler {
  private index = 0;
  private renderTargets: WebGLTexture[];
  private fb: WebGLFramebuffer;
  constructor(private gl: WebGL2RenderingContext, private size: USingleData<number[]>) {
    this.fb = gl.createFramebuffer() as WebGLFramebuffer; // todo need delete or not
    this.renderTargets = new Array(2).fill(0).map(() => gl.createTexture()).flatMap(texture => texture ? [texture] : []);
  }
  private updateTexture = () => {
    const [width, height] = this.size.data;
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.renderTargets[this.index]);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, width, height, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
  }
  public update = (draw: () => void) => {
    this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.fb);
    this.index = (this.index + 1) % 2;
    this.updateTexture();
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.renderTargets[this.index], 0);
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