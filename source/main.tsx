import * as Preact from 'preact';

import networkPathes from './resources/network-pathes.ts';

import HomePage from './pages/home-page.tsx';
import QuestionsPage from './pages/questions-page.tsx';

class Application extends Preact.Component {
  render() {
    switch (window.location.pathname.replace(networkPathes.base, '')) {
      case '/questions': return <QuestionsPage/>
      default: return <HomePage/>;
    }
  }
}

Preact.render(<Application/>, document.body);