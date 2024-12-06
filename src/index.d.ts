declare class Tooltip {
  constructor(element: HTMLElement);

  content(): string | boolean;
  content(content: string | boolean): Tooltip;
}

export default Tooltip;
