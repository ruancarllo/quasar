/// <reference lib="dom"/>

async function getRandomQuestion(universityName: string): Promise<string> {
  const request = await fetch(`/random-question?universityName=${encodeURIComponent(universityName)}`);
  const blob = await request.blob();
  const url = URL.createObjectURL(blob);

  return url;
} 

export default getRandomQuestion;