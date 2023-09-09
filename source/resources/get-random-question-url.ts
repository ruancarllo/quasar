import getArrayRandomItem from './get-array-random-item.ts';
import uniteHyperlinks from './unite-hyperlinks.ts';
import networkPathes from './network-pathes.ts';

async function getRandomQuestionUrl(universityUrl: string, tries = 0): Promise<string> {
  try {
    const examsRequest = await fetch(universityUrl);
    const examsHtml = await examsRequest.text();

    const examsParser = new DOMParser();
    const examsDocument = examsParser.parseFromString(examsHtml, 'text/html');

    const examAnchors = examsDocument.querySelectorAll('a[title*="Resolução Comentada"]');

    const randomExamAnchor = getArrayRandomItem(Array.from(examAnchors));
    const randomExamUrl = uniteHyperlinks(universityUrl, randomExamAnchor.getAttribute('href'));

    const questionsRequest = await fetch(randomExamUrl);
    const questonsHtml = await questionsRequest.text();

    const questionsParser = new DOMParser();
    const questionsDocument = questionsParser.parseFromString(questonsHtml, 'text/html');

    const questionAnchors = questionsDocument.querySelectorAll('.questao-gabarito')
    
    const randomQuestionAnchor = getArrayRandomItem(Array.from(questionAnchors));
    const randomQuestionFullUrl = randomQuestionAnchor.getAttribute('data-url');

    const hostRegularExpression = /^https?:\/\/([A-Za-z0-9.-]+)/g;

    const randomQuestionUrl = randomQuestionFullUrl.replace(hostRegularExpression, networkPathes.cursoObjetivo);

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