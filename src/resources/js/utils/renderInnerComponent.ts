import { Block } from './Block';
import * as Handlebars from 'handlebars';

interface RenderInnerComponentParams {
  block: Block;
  props: Record<string, any>;
  template: string;
}

/**
 * Рендерит компонент с внутренними компонентами Block
 * @param params - параметры для рендеринга
 * @returns DocumentFragment с готовым DOM
 */
export default function renderInnerComponent({ block, props, template }: RenderInnerComponentParams): DocumentFragment {
  const context: Record<string, any> = { ...props };
  
  // Преобразуем все компоненты Block в HTML строки
  Object.keys(context).forEach((key: string) => {
    if (context[key] && context[key] instanceof Block) {
      const rendered = context[key].render();
      // Если render() вернул DocumentFragment, преобразуем в строку
      const htmlString = typeof rendered === 'string' 
        ? rendered 
        : rendered.textContent || '';
      context[key] = new Handlebars.SafeString(htmlString);
    }
  });
  
  return block.compile(template, context);
}
