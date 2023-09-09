import * as Preact from 'preact';

import QuestionCard from '../components/question-card.tsx';
import QuestionLoader from '../components/question-loader.tsx';

import './questions-page.scss';

class QuestionsPage extends Preact.Component {
  questionsContainerReference: Preact.RefObject<HTMLDivElement>;
  laoderContainerReference: Preact.RefObject<HTMLDivElement>;

  constructor() {
    super();
    this.questionsContainerReference = Preact.createRef();
    this.laoderContainerReference = Preact.createRef();
  }

  render() {
    return (
      <section class="questions-page">
        <div ref={this.questionsContainerReference} class="questions-container"></div>
        <div ref={this.laoderContainerReference} class="loader-container"></div>
      </section>
    );
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const universityUrl = decodeURIComponent(urlSearchParams.get('universityUrl'));

    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#ffffff');

    const questionCards: Preact.VNode<QuestionCard>[] = [];

    for (let count = 0; count < 1; count++) {
      questionCards.push(<QuestionCard universityUrl={universityUrl}/>);
    }

    Preact.render(questionCards, this.questionsContainerReference.current);
    Preact.render(<QuestionLoader universityUrl={universityUrl}/>, this.laoderContainerReference.current);
  }
}

export default QuestionsPage;