import { render as preactRender, isValidElement, cloneElement } from 'preact';

const reactElement2VNode = el => {
  // Among other things, react VNodes (and all its children) need to have constructor: undefined attributes in order to be recognised, cloneElement (applied recursively) does the necessary conversion
  if (!(typeof el === 'object')) return el;
  const res = cloneElement(el);
  if (res.props) {
    res.props = { ...res.props };
    if (res?.props?.children) {
      res.props.children = Array.isArray(res.props.children)
        ? res.props.children.map(reactElement2VNode)
        : reactElement2VNode(res.props.children);
    }
  }
  return res;
}

export const isReactRenderable = o => isValidElement(cloneElement(o));

export const render = (jsx, domEl) => preactRender(reactElement2VNode(jsx), domEl);
