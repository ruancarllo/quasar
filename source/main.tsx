import * as Preact from 'preact';

import HomePage from './components/home-page.tsx';
import QuestionsPage from './components/questions-page.tsx';

Preact.render(<QuestionsPage universityUrl="/curso-objetivo/vestibular/resolucao_comentada/enem.asp"/>, document.body);