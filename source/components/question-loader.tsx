import * as Preact from 'preact';

import QuestionCard from './question-card';

import getRenderedComponent from '../helpers/get-rendered-component';

import './question-loader.scss';

class QuestionLoader extends Preact.Component<Properties> {
  reference: Preact.RefObject<HTMLDivElement>;

  constructor(properties: Properties) {
    super(properties);
    this.reference = Preact.createRef();
  }

  render() {
    return (
      <div ref={this.reference} class="question-loader">
        <div class="spinner"></div>
      </div>
    )
  }

  async componentDidMount() {
    const intersectionHandler: IntersectionObserverCallback = (entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          const questionCard = getRenderedComponent(<QuestionCard universityUrl={this.props.universityUrl}/>);
          document.querySelector('.questions-container').append(questionCard);
        }
      }
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.75
    }

    const observer = new IntersectionObserver(intersectionHandler, observerOptions)
    observer.observe(this.reference.current);
  }
}

interface Properties {
  universityUrl: string
}

export default QuestionLoader;