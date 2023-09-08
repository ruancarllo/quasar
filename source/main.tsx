import * as Preact from 'preact';

import HomePage from './pages/home-page.tsx';
import QuestionsPage from './pages/questions-page.tsx';

class Application extends Preact.Component {
  render() {
    switch (window.location.pathname) {
      case '/questions': return <QuestionsPage/>
      default: return <HomePage/>;
    }
  }
}

Preact.render(<Application/>, document.body);