/// <reference lib="dom"/>

import React from 'react';

import getRandomQuestionUrl from '@resources/get-random-question-url';
import beautifyQuestionImage from '@resources/beautify-question-image';

import addNode from '@helpers/add-node';

class QuestionCard extends React.Component<Properties> {
  reference: React.RefObject<HTMLImageElement>;
  index: number;

  constructor(properties: Properties) {
    super(properties);

    if (!globalThis.renderedQuestionCard) {
      globalThis.renderedQuestionCard = true;
      globalThis.questionCardCount = 0;
      globalThis.questionCardPromises = new Array();
      globalThis.questionCardPromiseResolvers = new Array();
    }

    this.reference = React.createRef();
    this.index = globalThis.questionCardCount++;

    globalThis.questionCardPromises[this.index] = new Promise((resolve) => {
      globalThis.questionCardPromiseResolvers[this.index] = resolve;
    });
  }

  render() {
    return (
      <img ref={this.reference} style={Styles.QuestionCard} id={this.index.toString()}/>
    );
  }

  async componentDidMount() {
    if (!this.reference.current) return;
    
    this.reference.current.onload = () => {
      globalThis.questionCardPromiseResolvers[this.index]();
      globalThis.questionCardPromiseResolvers[this.index] = undefined;
    }

    try {
      const randomQuestionUrl = await getRandomQuestionUrl(this.props.universityUrl);
      if (!randomQuestionUrl) return;

      const beautifiedQuestionImage = await beautifyQuestionImage(randomQuestionUrl);
      if (!beautifiedQuestionImage) return;

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
            addNode('#questions-container', <QuestionCard universityUrl={this.props.universityUrl}/>);
          }
        }
      }
  
      const observerOptions: IntersectionObserverInit = {
        threshold: 0.5
      }
  
      const observer = new IntersectionObserver(intersectionHandler, observerOptions);
      observer.observe(this.reference.current);
    }
  }
}

class Styles {
  static QuestionCard: React.CSSProperties = {
    width: '90vw',
  }
}

interface Properties {
  universityUrl: string
}

export default QuestionCard;