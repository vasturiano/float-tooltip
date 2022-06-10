import { select as d3Select, pointer as d3Pointer } from 'd3-selection';

import Kapsule from 'kapsule';

import './index.css';

export default Kapsule({
  props: {
    content: { default: false }
  },

  init: function(domNode, state) {
    const isD3Selection = !!domNode && typeof domNode === 'object' && !!domNode.node && typeof domNode.node === 'function';
    const el = d3Select(isD3Selection ? domNode.node() : domNode);

    state.tooltipEl = el.append('div')
      .attr('class', 'tooltip');

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
          canvasHeight - mousePos[1] < 100 ? 'calc(-100% - 6px)' : '21px'
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
    state.tooltipEl.html(state.content || '');
  }
});