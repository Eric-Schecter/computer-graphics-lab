export class EventsHandler {
  private events = new Map();
  constructor(private canvas: HTMLCanvasElement) { }
  private isEvent = (key: string) => /^on(Mouse|Pointer|Click|DoubleClick|ContextMenu|Wheel|Key)/.test(key);
  private isKeyEvent = (key: string) => /^key/.test(key);
  public addEvents = (props: object) => {
    Object.entries(props)
      .filter(([key]) => this.isEvent(key))
      .forEach(([key, value]) => this.events.set(key.slice(2).toLowerCase(), value))
    for (const [key, value] of this.events.entries()) {
      if (this.isKeyEvent(key)) {
        window.addEventListener(key, value);
      } else {
        this.canvas.addEventListener(key, value);
      }
    }
  }
  public removeEvents = () => {
    for (const [key, value] of this.events.entries()) {
      if (this.isKeyEvent(key)) {
        window.removeEventListener(key, value);
      } else {
        this.canvas.removeEventListener(key, value);
      }
    }
  }
  public updateEvents = () =>{

  }
}