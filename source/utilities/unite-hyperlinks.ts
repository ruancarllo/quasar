function uniteHyperlinks(previous: string, posterior: string): string {
  const previousPaths = previous.split('/');
  const posteriorPaths = posterior.split('/');

  if (previousPaths[previousPaths.length - 1].split('.')[0] === posteriorPaths[0]) {
    previousPaths.pop();
    return [...previousPaths, ...posteriorPaths].join('/');
  }
  
  else {
    return [previous, posterior].join('/');
  }
}

export default uniteHyperlinks;