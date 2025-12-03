import { EventBus } from './EventBus';
import * as Handlebars from 'handlebars';

export type BlockProps = Record<string, any> & {
  events?: Record<string, (e: Event) => void>;
};

export class Block {
  protected eventBus: EventBus;
  public props: BlockProps;
  //private _meta: { props: BlockProps };
  private _element: HTMLElement | null = null;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  constructor(props: BlockProps = {}) {
    this.eventBus = new EventBus();
    this.props = this._makePropsProxy(props);
    // this._meta = {
    //   props,
    // };
    this._element = null;
    this._registerEvents(this.eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    //eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(): void {}

  // private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
  //   const response = this.componentDidUpdate(oldProps, newProps);
  //   if (response) {
  //     this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  //   }
  // }

  // componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
  //   return true;
  // }

  setProps = (nextProps: BlockProps): void => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  private _render(): void {
    const template: string = this.render();
    const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = template;
    const newElement: HTMLElement | null = fragment.content.firstElementChild as HTMLElement | null;
    
    if (!newElement) {
      return;
    }

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  private _makePropsProxy(props: BlockProps): BlockProps {
    const self = this;
    return new Proxy(props, {
      get(target: BlockProps, prop: string | symbol): any {
        const value = target[prop as string];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: BlockProps, prop: string | symbol, value: any): boolean {
        const oldProps: BlockProps = { ...target };
        target[prop as string] = value;
        self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        return true;
      },
      deleteProperty(): never {
        throw new Error('Нет доступа');
      },
    });
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  private _addEvents(): void {
    const { events = {} } = this.props;

    if (!this._element || !events) {
      return;
    }

    Object.keys(events).forEach((eventName: string) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  // private _removeEvents(): void {
  //   const { events = {} } = this.props;

  //   if (!this._element || !events) {
  //     return;
  //   }

  //   Object.keys(events).forEach((eventName: string) => {
  //     this._element!.removeEventListener(eventName, events[eventName]);
  //   });
  // }

  show(): void {
    if (this._element) {
      this._element.style.display = 'block';
    }
  }

  hide(): void {
    if (this._element) {
      this._element.style.display = 'none';
    }
  }

  compile(template: string, context: Record<string, any>): string {
    const templateFunction = Handlebars.compile(template);
    return templateFunction(context);
  }
}

