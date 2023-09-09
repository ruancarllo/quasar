import * as Preact from 'preact';

import HomePage from './pages/home-page.tsx';
import QuestionsPage from './pages/questions-page.tsx';
import networkPathes from './resources/network-pathes.ts';

class Application extends Preact.Component {
  render() {
    switch (window.location.pathname.replace(networkPathes.base, '')) {
      case '/questions':
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');
        return <QuestionsPage/>;

      default:
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#7048e8');
        return <HomePage/>;
    }
  }
}

Preact.render(<Application/>, document.body);