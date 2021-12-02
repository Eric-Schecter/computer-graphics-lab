export abstract class Parameters {
  protected abstract type: string;
  public abstract getUniform(key: string,...props:any): string
}