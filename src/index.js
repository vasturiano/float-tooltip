import { select as d3Select, pointer as d3Pointer } from 'd3-selection';
import Kapsule from 'kapsule';

import { render as reactRender, isReactRenderable } from './jsx-render';

import './index.css';

export default Kapsule({
  props: {
    content: { default: false },
    offsetX: { triggerUpdate: false }, // null or number
    offsetY: { triggerUpdate: false }, // null or number
  },

  init: function(domNode, state, { style = {}} = {}) {
    const isD3Selection = !!domNode && typeof domNode === 'object' && !!domNode.node && typeof domNode.node === 'function';
    const el = d3Select(isD3Selection ? domNode.node() : domNode);

    // make sure container is positioned, to provide anchor for tooltip
    el.style('position') === 'static' && el.style('position', 'relative');

    state.tooltipEl = el.append('div')
      .attr('class', 'float-tooltip-kap');

    Object.entries(style).forEach(([k, v]) => state.tooltipEl.style(k, v));
    state.tooltipEl // start off-screen
      .style('left', '-10000px')
      .style('display', 'none');

    const evSuffix = `tooltip-${Math.round(Math.random() * 1e12)}`;
    state.mouseInside = false;
    el.on(`mousemove.${evSuffix}`, function(ev) {
      state.mouseInside = true;

      const mousePos = d3Pointer(ev);

      const domNode = el.node();
      const canvasWidth = domNode.offsetWidth;
      const canvasHeight = domNode.offsetHeight;

      const translate = [
        state.offsetX === null || state.offsetX === undefined
          // auto: adjust horizontal position to not exceed canvas boundaries
          ? `-${mousePos[0] / canvasWidth * 100}%`
          : typeof state.offsetX === number ? `calc(-50% + ${state.offsetX}px)` : state.offsetX,
        state.offsetY === null || state.offsetY === undefined
          // auto: flip to above if near bottom
          ? canvasHeight > 130 && (canvasHeight - mousePos[1] < 100) ? 'calc(-100% - 6px)' : '21px'
          : typeof state.offsetY === number
            ? state.offsetY < 0 ? `calc(-100% - ${Math.abs(state.offsetY)}px)` : `${state.offsetY}px`
            : state.offsetY
      ];

      state.tooltipEl
        .style('left', mousePos[0] + 'px')
        .style('top', mousePos[1] + 'px')
        .style('transform', `translate(${translate.join(',')})`);

      state.content && state.tooltipEl.style('display', 'inline');
    });

    el.on(`mouseover.${evSuffix}`, () => {
      state.mouseInside = true;
      state.content && state.tooltipEl.style('display', 'inline');
    });
    el.on(`mouseout.${evSuffix}`, () => {
      state.mouseInside = false;
      state.tooltipEl.style('display', 'none');
    });
  },

  update: function(state) {
    state.tooltipEl.style('display', !!state.content && state.mouseInside ? 'inline' : 'none');

    if (!state.content) {
      state.tooltipEl.text('');
    } else if (state.content instanceof HTMLElement) {
      state.tooltipEl.text(''); // empty it
      state.tooltipEl.append(() => state.content);
    } else if (typeof state.content === 'string') {
      state.tooltipEl.html(state.content);
    } else if (isReactRenderable(state.content)) {
      state.tooltipEl.text(''); // empty it
      reactRender(state.content, state.tooltipEl.node());
    } else {
      state.tooltipEl.style('display', 'none');
      console.warn('Tooltip content is invalid, skipping.', state.content, state.content.toString());
    }
  }
});