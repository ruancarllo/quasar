import * as Preact from 'preact';

function getRenderedComponent(component: Preact.VNode): Element {
  const renderer = document.createElement('div');
  Preact.render(component, renderer);
  
  return renderer.querySelector('*');
}

export default getRenderedComponent;