import { ReactHTMLElement } from 'react';

type ConfigOptions = {
  style: {};
}

declare class Tooltip {
  constructor(element: HTMLElement, configOptions?: ConfigOptions);

  content(): string | boolean;
  content(content: HTMLElement | ReactHTMLElement<HTMLElement> | string | boolean | null): Tooltip;
  offsetX(): number | null;
  offsetX(offset: number | null): Tooltip;
  offsetY(): number | null;
  offsetY(offset: number | null): Tooltip;
}

export default Tooltip;
