export interface TooltipGenericInstance<ChainableInstance> {
  (element: HTMLElement): ChainableInstance;

  content(): string | boolean;
  content(content: string | boolean): ChainableInstance;
}

export type TooltipInstance = TooltipGenericInstance<TooltipInstance>;

declare function Tooltip(): TooltipInstance;

export default Tooltip;
