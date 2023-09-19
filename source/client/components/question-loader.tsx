/// <reference lib="dom"/>

import React from 'react';
import QuestionCard from '@components/question-card';

import addNode from '@helpers/add-node';

class QuestionLoader extends React.Component<Properties> {
  questionLoaderReference: React.RefObject<HTMLDivElement>;
  spinnerReference: React.RefObject<HTMLDivElement>;

  constructor(properties: Properties) {
    super(properties);

    this.questionLoaderReference = React.createRef();
    this.spinnerReference = React.createRef();
  }

  render() {
    return (
      <div ref={this.questionLoaderReference} style={Styles.QuestionLoader} id="question-loader">
        <div ref={this.spinnerReference} style={Styles.Spinner} id="spinner"></div>
      </div>
    )
  }

  async componentDidMount() {
    if (!this.spinnerReference.current) return;
    if (!this.questionLoaderReference.current) return;

    this.spinnerReference.current.animate([
      {transform: 'rotate(0deg)'},
      {transform: 'rotate(360deg)'},
    ], {
      duration: 1000,
      iterations: Infinity
    });

    const intersectionHandler: IntersectionObserverCallback = (entries) => {
      for (let entry of entries) {
        if (entry.isIntersecting) {
          addNode('#questions-container', <QuestionCard universityName={this.props.universityUrl}/>);
        }
      }
    }

    const observerOptions: IntersectionObserverInit = {
      threshold: 0.75
    }

    const observer = new IntersectionObserver(intersectionHandler, observerOptions)
    observer.observe(this.questionLoaderReference.current);
  }
}

class Styles {
  static QuestionLoader: React.CSSProperties = {
    width: '100%',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }

  static Spinner: React.CSSProperties = {
    width: '8vw',
    height: '8vw',

    border: '1vw solid #5f3dc4',
    borderTop: '1vw solid transparent',
    borderRadius: '100vmax'
  }
}

interface Properties {
  universityUrl: string
}

export default QuestionLoader;