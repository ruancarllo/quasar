/// <reference lib="dom"/>

import React from 'react';

import UniversityCard from '@components/university-card';

import {fetchUniversitiesSync} from '@resources/fetch-universities';
import standardizeUniversityName from '@resources/standardize-university-name';
import verifyServiceStatus from '@resources/verify-service-status';

import addNode from '@helpers/add-node';

verifyServiceStatus();

for (let university of fetchUniversitiesSync()) {
  const standardizedName = standardizeUniversityName(university.nonStandardizedName);
  addNode('#university-cards', <UniversityCard name={standardizedName} url={university.url}/>);
}