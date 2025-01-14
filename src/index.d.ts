type ConfigOptions = {
  style: {};
}

declare class Tooltip {
  constructor(element: HTMLElement, configOptions?: ConfigOptions);

  content(): string | boolean;
  content(content: HTMLElement | string | boolean | null): Tooltip;
}

export default Tooltip;
