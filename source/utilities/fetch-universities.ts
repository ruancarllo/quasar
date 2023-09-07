import apiEntrypoints from "./api-entrypoints.ts";
import uniteHyperlinks from './unite-hyperlinks.ts';

async function fetchUniversities(): Promise<University[]> {
  const universities: University[] = new Array();

  const entrypoint = `${apiEntrypoints.cursoObjetivo}/vestibular/resolucao_comentada.aspx`;
  const request = await fetch(entrypoint);
  const html = await request.text();

  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');

  const universityAnchors = document.querySelectorAll('a[title^="Resolução Comentada"]');
  
  universityAnchors.forEach((anchor: HTMLAnchorElement) => {
    universities.push({
      nonStandardizedName: anchor.textContent,
      url: uniteHyperlinks(entrypoint, anchor.getAttribute('href'))
    })
  });

  return universities;
}

interface University {
  nonStandardizedName: string,
  url: string
}

export default fetchUniversities;