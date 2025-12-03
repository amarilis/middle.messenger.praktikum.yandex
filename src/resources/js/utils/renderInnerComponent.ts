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
 * @returns HTML строка
 */
export default function renderInnerComponent({ block, props, template }: RenderInnerComponentParams): string {
  const context: Record<string, any> = { ...props };
  
  // Преобразуем все компоненты Block в HTML строки
  Object.keys(context).forEach((key: string) => {
    if (context[key] && context[key] instanceof Block) {
      context[key] = new Handlebars.SafeString(context[key].render());
    }
  });
  
  return block.compile(template, context);
}
