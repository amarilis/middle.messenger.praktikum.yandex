import { Block } from './Block';

/**
 * Рендерит компонент Block в DOM элемент
 * @param query - селектор DOM элемента
 * @param block - экземпляр компонента Block
 * @returns найденный DOM элемент
 */
export function renderDOM(query: string, block: Block): HTMLElement {
  const root: HTMLElement | null = document.querySelector(query);
  if (!root) {
    throw new Error(`Элемент с селектором "${query}" не найден`);
  }
  root.innerHTML = '';
  const content = block.getContent();
  if (content) {
    root.appendChild(content);
  }
  return root;
}

