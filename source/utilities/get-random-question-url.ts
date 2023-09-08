import getArrayRandomItem from './get-array-random-item.ts';
import uniteHyperlinks from './unite-hyperlinks.ts';

async function getRandomQuestionUrl(universityUrl: string): Promise<string> {
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
  const randomQuestionUrl = randomQuestionAnchor.getAttribute('data-url');

  return randomQuestionUrl;
}

export default getRandomQuestionUrl;

globalThis.getrandom = getRandomQuestionUrl