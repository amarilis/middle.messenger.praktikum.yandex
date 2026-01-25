type Listener = (...args: any[]) => void;

export class EventBus {
  private listeners: Record<string, Listener[]> = {};

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event] = this.listeners[event].filter(
      (listener: Listener) => listener !== callback
    );
  }

  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach((callback: Listener) => {
      callback(...args);
    });
  }
}

