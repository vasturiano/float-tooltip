import { select as d3Select, pointer as d3Pointer } from 'd3-selection';

import Kapsule from 'kapsule';

import './index.css';

export default Kapsule({
  props: {
    content: { default: false }
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

    state.mouseInside = false;
    el.on('mousemove.tooltip', function(ev) {
      state.mouseInside = true;

      const mousePos = d3Pointer(ev);

      const domNode = el.node();
      const canvasWidth = domNode.offsetWidth;
      const canvasHeight = domNode.offsetHeight;

      state.tooltipEl
        .style('left', mousePos[0] + 'px')
        .style('top', mousePos[1] + 'px')
        // adjust horizontal position to not exceed canvas boundaries
        .style('transform', `translate(-${mousePos[0] / canvasWidth * 100}%, ${
          // flip to above if near bottom
          canvasHeight > 130 && (canvasHeight - mousePos[1] < 100) ? 'calc(-100% - 6px)' : '21px'
        })`);
    });

    el.on('mouseover.tooltip', () => {
      state.mouseInside = true;
      state.content && state.tooltipEl.style('display', 'inline')
    });
    el.on('mouseout.tooltip', () => {
      state.mouseInside = false;
      state.tooltipEl.style('display', 'none')
    });
  },

  update: function(state) {
    state.tooltipEl.style('display', !!state.content && state.mouseInside ? 'inline' : 'none');

    if (state.content instanceof HTMLElement) {
      state.tooltipEl.text(''); // empty it
      state.tooltipEl.append(() => state.content);
    } else {
      state.tooltipEl.html(state.content || '');
    }
  }
});