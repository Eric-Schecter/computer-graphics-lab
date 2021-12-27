export class EventsHandler {
  private events = new Map();
  constructor(props: object, private canvas: HTMLCanvasElement) {
    const eventKeywords = /^on(Mouse)/;
    Object.entries(props)
      .filter(([key]) => eventKeywords.test(key))
      .forEach(([key, value]) => this.events.set(key.slice(2).toLowerCase(), value))
    this.addEvents();
  }
  private addEvents = () => {
    for (const [key, value] of this.events.entries()) {
      this.canvas.addEventListener(key, value);
    }
  }
  public removeEvents = () => {
    for (const [key, value] of this.events.entries()) {
      this.canvas.removeEventListener(key, value);
    }
  }
}