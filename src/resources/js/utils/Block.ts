import { EventBus } from "./EventBus";
import * as Handlebars from "handlebars";
import { v4 as makeUUID } from "uuid";

// Тип для событий компонента
export type BlockEvents = Record<string, (e: Event) => void>;

// Тип для настроек компонента
export type BlockSettings = {
  withInternalID?: boolean;
};

// Базовый тип для свойств компонента
export interface BlockProps {
  events?: BlockEvents;
  settings?: BlockSettings;
  [key: string]: any;
}

// Тип для метаданных компонента
type BlockMeta = {
  props: Record<string, any>;
  tagName?: string;
};

// Тип для результата разделения props и children
type ChildrenResult = {
  children: Record<string, Block>;
  props: Record<string, any>;
  lists: Record<string, Block[]>;
};

// Базовый класс компонента с управлением состоянием, событиями и рендерингом
class Block {
  // Константы имён событий жизненного цикла компонента
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  } as const;

  protected _children: Record<string, Block>; // Дочерние компоненты
  protected _lists: Record<string, Block[]>; // Списки компонентов
  protected _id: string; // id компонента
  protected _element: HTMLElement | null; // Корневой DOM-элемент компонента
  protected _meta: BlockMeta; // Метаданные (например, исходные props)
  protected _eventBus: EventBus; // Экземпляр шины событий
  protected _setUpdate: boolean = false; // Флаг, указывающий на необходимость принудительного обновления
  public props: BlockProps & { __id: string }; // Публичные свойства компонента

  /**
   * Создаёт компонент, подготавливает children/props/lists и запускает init.
   * @param propsAndChildren - объект со свойствами и дочерними компонентами
   */
  constructor(propsAndChildren: BlockProps = {}) {
    const { children, props, lists } = this._getChildren(propsAndChildren);
    this._id = makeUUID(); // Генерируем уникальный идентификатор компонента
    this._children = this._makePropsProxy(children); // Проксируем children для отслеживания изменений
    this._lists = this._makePropsProxy(lists); // Проксируем lists для отслеживания изменений
    this._eventBus = new EventBus(); // Инициализируем шину событий
    this.props = this._makePropsProxy({ ...props, __id: this._id }); // Проксируем props и добавляем служебный id
    this._element = null; // Инициализируем ссылку на DOM-элемент
    this._meta = { props }; // Сохраняем метаданные
    this._registerEvents(this._eventBus); // Регистрируем обработчики событий жизненного цикла
    this._eventBus.emit(Block.EVENTS.INIT); // Запускаем инициализацию компонента
  }

  /**
   * Обновляет свойства компонента.
   * например, когда подгрузились данные с сервера
   * @param nextProps - новые свойства
   */
  setProps = (nextProps: Partial<BlockProps>): void => {
    if (!nextProps) {
      return;
    }

    // Объединяем новые свойства с текущими и запускаем FLOW_CDU
    Object.assign(this.props, nextProps);
  };

  /**
   * Возвращает корневой DOM-элемент.
   * @returns корневой DOM-элемент или null
   */
  get element(): HTMLElement | null {
    return this._element;
  }

  /**
   * Возвращает DOM-контент компонента.
   * @returns корневой DOM-элемент или null
   */
  getContent(): HTMLElement | null {
    return this.element;
  }

  // Делает элемент видимым
  show(): void {
    if (this._element) {
      this._element.style.display = "block";
    }
  }

  // Скрывает элемент
  hide(): void {
    if (this._element) {
      this._element.style.display = "none";
    }
  }

  /**
   * Форсирует вызов жизненного цикла componentDidMount
   */
  dispatchComponentDidMount(): void {
    this._eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  /**
   * Инициализация: создаёт корневой элемент и запускает рендер
   */
  init(): void {
    // Создаём DOM-элемент по тегу из метаданных
    this._element = this._createDocumentElement(this._meta?.tagName);

    // Запускаем рендер
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  // Хук: вызывается после монтирования (может быть переопределён)
  componentDidMount(): void {}

  /**
   * Хук: вызывается при обновлении свойств.
   * @param _oldProps - предыдущее состояние свойств
   * @param _newProps - новое состояние свойств
   * @returns нужно ли выполнять повторный рендер
   */
  componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps): boolean {
    return true;
  }

  /**
   * Рендерит HTML/DOM компонента.
   * @returns строка шаблона или DocumentFragment
   */
  render(): string | DocumentFragment {
    return "";
  }

  /**
   * Регистрирует обработчики событий жизненного цикла.
   * @param eventBus - шина событий
   */
  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  // Внутренний обработчик монтирования
  _componentDidMount(): void {
    // Вызываем пользовательский хук
    this.componentDidMount();

    // Пробрасываем монтирование всем дочерним компонентам
    Object.keys(this._children).forEach((key: string) => {
      this._children[key].dispatchComponentDidMount();
    });
  }

  /**
   * Внутренний обработчик обновления.
   * @param _oldProps - старые свойства
   * @param _newProps - новые свойства
   */
  _componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps): void {
    // Получаем ответ от пользовательского хука
    const response = this.componentDidUpdate(_oldProps, _newProps);
    if (!response) {
      return;
    }
    // Если обновление разрешено — перерендериваем
    this._render();
  }

  // Внутренний рендерер компонента
  _render(): void {
    // Результат пользовательского рендера (строка или DocumentFragment)
    const block = this.render();

    // Снимаем ранее привязанные события
    this._removeEvents();

    // Проверяем, является ли результат фрагментом с одним корневым элементом
    const singleRootElement =
      block instanceof DocumentFragment && this._getSingleRootElement(block);

    if (singleRootElement) {
      // Сохраняем старый элемент для возможной замены
      const oldElement = this._element;
      // Обновляем ссылку на корневой элемент
      this._element = singleRootElement as HTMLElement;

      if (this.props.settings?.withInternalID && this._element) {
        // Проставляем data-id для внутренней идентификации
        this._element.setAttribute("data-id", this._id);
      }

      if (oldElement && oldElement !== this._element) {
        // Заменяем старый DOM-элемент новым
        oldElement.replaceWith(this._element);
      }
    } else {
      // Очищаем и вставляем фрагмент в корневой элемент
      if (this._element) {
        this._element.innerHTML = "";
        if (typeof block === "string") {
          this._element.innerHTML = block;
        } else {
          this._element.appendChild(block);
        }
      }
    }

    // Навешиваем события после рендера
    this._addEvents();
  }

  /**
   * Компилирует шаблон и подставляет дочерние компоненты и списки.
   * @param template - строка шаблона Handlebars
   * @param props - свойства для шаблона
   * @returns DocumentFragment с готовым DOM
   */
  compile(template: string, props: Record<string, any>): DocumentFragment {
    // Копируем props и добавляем заглушки для children/lists
    const propsAndStubs = { ...props };

    // Добавляем заглушки для дочерних компонентов
    Object.keys(this._children).forEach((key: string) => {
      const child = this._children[key];
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    // Добавляем заглушки для списков
    Object.keys(this._lists).forEach((key: string) => {
      propsAndStubs[key] = `<div data-id="__lists_${key}"></div>`;
    });

    // Создаём template-элемент для безопасной вставки HTML
    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;

    // Компилируем шаблон с подставленными данными
    if (fragment) {
      fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
    }

    // Заменяем заглушки дочерних компонентов на их контент
    Object.keys(this._children).forEach((key: string) => {
      const child = this._children[key];
      // Находим заглушку по data-id
      const stub = fragment.content?.querySelector(`[data-id="${child._id}"]`);
      if (stub) {
        // Подменяем заглушку реальным контентом компонента
        const content = child.getContent();
        if (content) {
          stub.replaceWith(content);
        }
      }
    });

    // Обрабатываем списки (массивы) и подставляем их в шаблон
    Object.keys(this._lists).forEach((key: string) => {
      const list = this._lists[key];
      // Находим заглушку списка по ключу
      const stub = fragment.content?.querySelector(`[data-id="__lists_${key}"]`);

      if (!stub) return;

      // Создаём временный container для элементов списка
      const listContent = this._createDocumentElement("template") as HTMLTemplateElement;

      // Перебираем элементы списка и добавляем их контент
      list.forEach((item: Block) => {
        if (item instanceof Block) {
          // Если это компонент — добавляем его DOM
          const itemContent = item.getContent();
          if (itemContent && listContent.content) {
            listContent.content.appendChild(itemContent);
          }
        } else {
          // Иначе добавляем как строку/текст
          if (listContent.content) {
            listContent.content.appendChild(document.createTextNode(String(item)));
          }
        }
      });

      // Заменяем заглушку списка на собранный контент
      if (listContent.content) {
        stub.replaceWith(listContent.content);
      }
    });

    // Возвращаем готовый фрагмент
    return fragment.content || document.createDocumentFragment();
  }

  /**
   * Разделяет входные данные на children, props и lists.
   * @param propsAndChilds - входной объект с данными
   * @returns объект с разделёнными children, props и lists
   */
  _getChildren(propsAndChilds: BlockProps): ChildrenResult {
    // Контейнеры для результата разбиения
    const children: Record<string, Block> = {};
    const props: Record<string, any> = {};
    const lists: Record<string, Block[]> = {};

    // Разбираем ключи и распределяем их по типам
    Object.keys(propsAndChilds).forEach((key: string) => {
      const value = propsAndChilds[key];
      if (value instanceof Block) {
        // Дочерний компонент
        children[key] = value;
      } else if (Array.isArray(value)) {
        // Список
        lists[key] = value as Block[];
      } else {
        // Обычное свойство
        props[key] = value;
      }
    });
    // Возвращаем разбиение
    return { children, props, lists };
  }

  /**
   * Создаёт Proxy для отслеживания изменений свойств.
   * @param props - объект свойств
   * @returns Proxy объект для отслеживания изменений
   */
  _makePropsProxy<T extends Record<string, any>>(props: T): T {
    // Сохраняем ссылку на экземпляр для доступа из ловушек Proxy
    const self = this;

    // Оборачиваем props в Proxy
    return new Proxy(props, {
      // Перехватываем чтение свойств
      get(target: T, prop: string | symbol) {
        // Получаем значение свойства
        if (typeof prop === "string") {
          const value = target[prop];

          // Привязываем функции к target, остальные значения возвращаем как есть
          return typeof value === "function" ? value.bind(target) : value;
        }
        return undefined;
      },
      // Перехватываем запись свойств
      set(target: T, prop: string | symbol, value: any): boolean {
        // Копируем старые свойства для сравнения
        if (typeof prop === "string") {
          const oldProps = { ...target };
          // Обновляем значение свойства
          target[prop as keyof T] = value;
          // Сообщаем о необходимости обновления
          self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, target);
        }
        return true;
      },
      // Запрещаем удаление свойств
      deleteProperty(): boolean {
        throw new Error("Нет доступа");
      },
    });
  }

  /**
   * Возвращает единственный корневой элемент из фрагмента, если он валиден.
   * @param fragment - результат рендера
   * @returns единственный корневой элемент или null
   */
  _getSingleRootElement(fragment: DocumentFragment): Element | null {
    if (fragment.childElementCount !== 1) {
      return null;
    }

    // Проверяем наличие значимых узлов помимо единственного элемента
    const hasNonWhitespaceNodes = Array.from(fragment.childNodes).some(
      (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return (node.textContent || "").trim() !== "";
        }
        return node.nodeType !== Node.ELEMENT_NODE;
      }
    );

    if (hasNonWhitespaceNodes) {
      return null;
    }

    return fragment.firstElementChild;
  }

  /**
   * Создаёт DOM-элемент по тегу и при необходимости выставляет data-id.
   * @param tagName - имя тега
   * @returns созданный DOM-элемент
   */
  _createDocumentElement(tagName: string = "div"): HTMLElement {
    // Создаём DOM-элемент
    const element = document.createElement(tagName);

    if (this.props.settings?.withInternalID) {
      // Добавляем внутренний идентификатор в атрибуты
      element.setAttribute("data-id", this._id);
    }

    return element;
  }

  // Добавляет обработчики DOM-событий из props.events
  _addEvents(): void {
    // Достаем словарь обработчиков событий
    const { events = {} } = this.props;

    if (!this._element || !events) {
      return;
    }

    // Навешиваем обработчики на корневой элемент
    Object.keys(events).forEach((eventName: string) => {
      if (this._element && events[eventName]) {
        this._element.addEventListener(eventName, events[eventName]);
      }
    });
  }

  // Удаляет обработчики DOM-событий из props.events
  _removeEvents(): void {
    // Достаем словарь обработчиков событий
    const { events = {} } = this.props;

    if (!this._element || !events) {
      return;
    }

    // Снимаем обработчики с корневого элемента
    Object.keys(events).forEach((eventName: string) => {
      if (this._element && events[eventName]) {
        this._element.removeEventListener(eventName, events[eventName]);
      }
    });
  }
}

export { Block };
export default Block;
