/// <reference lib="dom"/>

import React from 'react';
import UniversityCard from '@components/university-card';

import addNode from '@helpers/add-node';

addNode('#university-cards', <UniversityCard name={'Albert Einstein'}/>);
addNode('#university-cards', <UniversityCard name={'Enem'}/>);
addNode('#university-cards', <UniversityCard name={'Famema'}/>);
addNode('#university-cards', <UniversityCard name={'Famerp'}/>);
addNode('#university-cards', <UniversityCard name={'Fatec'}/>);
addNode('#university-cards', <UniversityCard name={'FGV-SP'}/>);