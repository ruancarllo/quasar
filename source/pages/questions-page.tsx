import * as Preact from 'preact';

import QuestionCard from '../components/question-card.tsx';

import './questions-page.scss';

class QuestionsPage extends Preact.Component {
  render() {
    return (
      <div class="questions-page"></div>
    );
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const universityUrl = decodeURIComponent(urlSearchParams.get('universityUrl'));

    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');

    const questionCards: Preact.VNode<QuestionCard>[] = [];

    for (let count = 0; count < 5; count++) {
      questionCards.push(<QuestionCard universityUrl={universityUrl}/>);
    }

    Preact.render(questionCards, document.querySelector('.questions-page'));
  }
}

export default QuestionsPage;