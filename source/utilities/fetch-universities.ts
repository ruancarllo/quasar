import apiEntrypoints from "./api-entrypoints.ts";

async function fetchUniversities() {
  const entrypoint = `${apiEntrypoints.cursoObjetivo}/vestibular/resolucao_comentada.aspx`;
  const request = await fetch(entrypoint);
  const html = await request.text();

  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');

  console.log(document);
}

interface University {
  nonStandardizedName: string,
  url: string
}

export default fetchUniversities;