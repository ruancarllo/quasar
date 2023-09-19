/// <reference lib="dom"/>

import React from 'react';
import QuestionCard from '@components/question-card';
import QuestionLoader from '@components/question-loader';

import addNode from '@helpers/add-node';

const urlSearchParams = new URLSearchParams(window.location.search);
const universityName = urlSearchParams.get('universityName');

if (universityName) {
  const decodedUniversityName = decodeURIComponent(universityName);

  for (let count = 0; count < 5; count++) {
    addNode('#questions-container', <QuestionCard universityName={decodedUniversityName}/>);
  }

  addNode('#loader-container', <QuestionLoader universityUrl={decodedUniversityName}/>);
}