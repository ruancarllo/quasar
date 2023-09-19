/// <reference lib="dom"/>

import getArrayRandomItem from '@resources/get-array-random-item';
import uniteHyperlinks from '@resources/unite-hyperlinks';

async function getRandomQuestionUrl(universityUrl: string, tries = 0): Promise<string | undefined> {
  try {
    const examsRequest = await fetch(universityUrl);
    const examsHtml = await examsRequest.text();

    const examsParser = new DOMParser();
    const examsDocument = examsParser.parseFromString(examsHtml, 'text/html');

    const examAnchors = examsDocument.querySelectorAll('a[title*="Resolução Comentada"]');

    const randomExamAnchor = getArrayRandomItem(Array.from(examAnchors));
    const randomExamAnchorHref = randomExamAnchor.getAttribute('href');

    if (!randomExamAnchorHref) return getRandomQuestionUrl(universityUrl, ++tries);

    const randomExamUrl = uniteHyperlinks(universityUrl, randomExamAnchorHref);

    const questionsRequest = await fetch(randomExamUrl);
    const questonsHtml = await questionsRequest.text();

    const questionsParser = new DOMParser();
    const questionsDocument = questionsParser.parseFromString(questonsHtml, 'text/html');

    const questionAnchors = questionsDocument.querySelectorAll('.questao-gabarito')
    
    const randomQuestionAnchor = getArrayRandomItem(Array.from(questionAnchors));
    const randomQuestionFullUrl = randomQuestionAnchor.getAttribute('data-url');

    if (!randomQuestionFullUrl) return getRandomQuestionUrl(universityUrl, ++tries);

    const hostRegularExpression = /^https?:\/\/([A-Za-z0-9.-]+)/g;

    const randomQuestionUrl = randomQuestionFullUrl.replace(hostRegularExpression, '/curso-objetivo');

    return randomQuestionUrl;
  }

  catch(exception) {
    if (tries <= TRIES_LIMIT) {
      return getRandomQuestionUrl(universityUrl, ++tries);
    }
  }
}

const TRIES_LIMIT = 3;

export default getRandomQuestionUrl;