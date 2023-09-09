import * as Preact from 'preact';

import getRandomQuestionUrl from '../resources/get-random-question-url';
import beautifyQuestionImage from '../resources/beautify-question-image';
import getRenderedComponent from '../helpers/get-rendered-component';

import './question-card.scss';

class QuestionCard extends Preact.Component<Properties> {
  reference: Preact.RefObject<HTMLImageElement>;

  constructor(properties: Properties) {
    super(properties);

    this.reference = Preact.createRef();
  }

  render() {
    return (
      <img ref={this.reference} class="question-card"/>
    );
  }

  async componentDidMount() {
    const randomQuestionUrl = await getRandomQuestionUrl(this.props.universityUrl);
    const beautifiedQuestionImage = await beautifyQuestionImage(randomQuestionUrl);

    this.reference.current.src = beautifiedQuestionImage.src;

    return;

    const intersectionHandler: IntersectionObserverCallback = (entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          observer.disconnect();

          const questionCard = getRenderedComponent(<QuestionCard universityUrl={this.props.universityUrl}/>);
          document.querySelector('.questions-container').append(questionCard);
        }
      }
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.5
    }

    const observer = new IntersectionObserver(intersectionHandler, observerOptions)
    observer.observe(this.reference.current);
  }
}

interface Properties {
  universityUrl: string
}

export default QuestionCard;