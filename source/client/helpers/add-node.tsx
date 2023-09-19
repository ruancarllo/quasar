/// <reference lib="dom"/>

import React from 'react';
import ReactDOM from 'react-dom/client';

function addNode(parentElementSelector: string, node: React.ReactNode) {
  const parentElement = document.querySelector(parentElementSelector);
  if (!parentElement) return;

  const container = document.createElement('span');
  const containerRoot = ReactDOM.createRoot(container);

  containerRoot.render(node);
  parentElement.append(container);
}

export default addNode;