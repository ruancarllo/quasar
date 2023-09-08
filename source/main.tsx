import * as Preact from 'preact';
import Router from 'preact-router';

import HomePage from './pages/home-page.tsx';
import QuestionsPage from './pages/questions-page.tsx';

class Application extends Preact.Component {
  render() {
    return (
      <Router>
        <HomePage path="/"/>
        <QuestionsPage path="/questions"/>
      </Router>
    );
  }
}

Preact.render(<Application/>, document.body);