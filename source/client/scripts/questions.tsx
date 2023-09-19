/// <reference lib="dom"/>

import React from 'react';

import QuestionCard from '@components/question-card';
import QuestionLoader from '@components/question-loader';

import verifyServiceStatus from '@resources/verify-service-status';

import addNode from '@helpers/add-node';

verifyServiceStatus();

const urlSearchParams = new URLSearchParams(window.location.search);
const universityURL = urlSearchParams.get('universityUrl');

if (universityURL) {
  const decodedUniversityURL = decodeURIComponent(universityURL);

  for (let count = 0; count < 5; count++) {
    addNode('#questions-container', <QuestionCard universityUrl={decodedUniversityURL}/>);
  }

  addNode('#loader-container', <QuestionLoader universityUrl={decodedUniversityURL}/>);
}