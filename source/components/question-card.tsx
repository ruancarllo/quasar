import * as Preact from 'preact';

import getRandomQuestionUrl from '../resources/get-random-question-url';
import beautifyQuestionImage from '../resources/beautify-question-image';
import getRenderedComponent from '../helpers/get-rendered-component';

class QuestionCard extends Preact.Component<Properties> {
  reference: Preact.RefObject<HTMLImageElement>;
  index: number;

  constructor(properties: Properties) {
    super(properties);

    if (!globalThis.renderedQuestionCard) {
      globalThis.renderedQuestionCard = true;
      globalThis.questionCardCount = 0;
      globalThis.questionCardPromises = new Array();
      globalThis.questionCardPromiseResolvers = new Array();
    }

    this.reference = Preact.createRef();
    this.index = globalThis.questionCardCount++;

    let cardPromiseResolver: (value: unknown) => void;
    let cardPromise = new Promise((resolve) => cardPromiseResolver = resolve);

    globalThis.questionCardPromises[this.index] = cardPromise;
    globalThis.questionCardPromiseResolvers[this.index] = cardPromiseResolver;
  }

  render() {
    return (
      <img ref={this.reference} style={Styles.QuestionCard} class="question-card" id={this.index.toString()}/>
    );
  }

  async componentDidMount() {
    this.reference.current.onload = () => {
      globalThis.questionCardPromiseResolvers[this.index]();
      globalThis.questionCardPromiseResolvers[this.index] = undefined;
    }

    try {
      const randomQuestionUrl = await getRandomQuestionUrl(this.props.universityUrl);
      const beautifiedQuestionImage = await beautifyQuestionImage(randomQuestionUrl);

      for (let promiseCount = 0; promiseCount < this.index; promiseCount++) {
        await globalThis.questionCardPromises[promiseCount];
      }

      this.reference.current.src = beautifiedQuestionImage.src;
    }

    finally {
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
}

class Styles {
  static QuestionCard: Preact.JSX.CSSProperties = {
    width: '100%',
  }
}

interface Properties {
  universityUrl: string
}

export default QuestionCard;