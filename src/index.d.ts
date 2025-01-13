type ConfigOptions = {
  style: {};
}

declare class Tooltip {
  constructor(element: HTMLElement, configOptions?: ConfigOptions);

  content(): string | boolean;
  content(content: string | boolean): Tooltip;
}

export default Tooltip;
