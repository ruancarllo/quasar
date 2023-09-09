import * as Preact from 'preact';

import QuestionCard from '../components/question-card.tsx';
import QuestionLoader from '../components/question-loader.tsx';

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
      <section style={Styles.QuestionsPage} class="questions-page">
        <div ref={this.questionsContainerReference} style={Styles.QuestionsContainer} class="questions-container"></div>
        <div ref={this.laoderContainerReference} style={Styles.LoaderContainer} class="loader-container"></div>
      </section>
    );
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const universityUrl = decodeURIComponent(urlSearchParams.get('universityUrl'));

    const questionCards: Preact.VNode<QuestionCard>[] = [];

    for (let count = 0; count < 1; count++) {
      questionCards.push(<QuestionCard universityUrl={universityUrl}/>);
    }

    Preact.render(questionCards, this.questionsContainerReference.current);
    Preact.render(<QuestionLoader universityUrl={universityUrl}/>, this.laoderContainerReference.current);
  }
}

class Styles {
  static QuestionsPage: Preact.JSX.CSSProperties = {
    width: '100vw',
    minHeight: '100vh',

    padding: '5vw',
    gap: '5vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  static QuestionsContainer: Preact.JSX.CSSProperties = {
    width: '100%',

    display: 'inherit',
    flexDirection: 'inherit',
    alignItems: 'inherit',
  }

  static LoaderContainer: Preact.JSX.CSSProperties = {
    width: '100%',

    display: 'inherit',
    flexDirection: 'inherit',
    alignItems: 'inherit',
  }
}

export default QuestionsPage;