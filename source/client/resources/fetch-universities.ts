/// <reference lib="dom"/>

import uniteHyperlinks from '@resources/unite-hyperlinks';

export async function fetchUniversitiesAsync(): Promise<University[]> {
  const universities: University[] = new Array();

  const entrypoint = `/curso-objetivo/vestibular/resolucao_comentada.aspx`;
  const request = await fetch(entrypoint);
  const html = await request.text();

  const parser = new DOMParser();
  const document = parser.parseFromString(html, 'text/html');

  const universityAnchors = document.querySelectorAll('a[title^="Resolução Comentada"]');
  
  universityAnchors.forEach((anchor: HTMLAnchorElement) => {
    const href = anchor.getAttribute('href');
    if (!href) return;

    const nonStandardizedName = anchor.textContent;
    const url = uniteHyperlinks(entrypoint, href);

    if (!nonStandardizedName || !url) return;

    universities.push({nonStandardizedName, url});
  });

  return universities;
}

export function fetchUniversitiesSync(): University[] {
  const universities: University[] = [{"nonStandardizedName":"ALBERT EINSTEIN","url":"/curso-objetivo/vestibular/resolucao_comentada/alberteinstein.asp"},{"nonStandardizedName":"ENEM","url":"/curso-objetivo/vestibular/resolucao_comentada/enem.asp"},{"nonStandardizedName":"FAMEMA","url":"/curso-objetivo/vestibular/resolucao_comentada/famema.asp"},{"nonStandardizedName":"FAMERP","url":"/curso-objetivo/vestibular/resolucao_comentada/famerp.asp"},{"nonStandardizedName":"FATEC","url":"/curso-objetivo/vestibular/resolucao_comentada/fatec.asp"},{"nonStandardizedName":"FGV-SP","url":"/curso-objetivo/vestibular/resolucao_comentada/fgvsp.asp"},{"nonStandardizedName":"FMABC","url":"/curso-objetivo/vestibular/resolucao_comentada/fmabc.asp"},{"nonStandardizedName":"FUVEST","url":"/curso-objetivo/vestibular/resolucao_comentada/fuvest.asp"},{"nonStandardizedName":"IME","url":"/curso-objetivo/vestibular/resolucao_comentada/ime.asp"},{"nonStandardizedName":"INSPER","url":"/curso-objetivo/vestibular/resolucao_comentada/insper.asp"},{"nonStandardizedName":"ITA","url":"/curso-objetivo/vestibular/resolucao_comentada/ita.asp"},{"nonStandardizedName":"MACKENZIE","url":"/curso-objetivo/vestibular/resolucao_comentada/mackenzie.asp"},{"nonStandardizedName":"PASUSP","url":"/curso-objetivo/vestibular/resolucao_comentada/pasusp.asp"},{"nonStandardizedName":"PUC-SP","url":"/curso-objetivo/vestibular/resolucao_comentada/pucsp.asp"},{"nonStandardizedName":"SANTA CASA","url":"/curso-objetivo/vestibular/resolucao_comentada/santacasa.asp"},{"nonStandardizedName":"UFABC","url":"/curso-objetivo/vestibular/resolucao_comentada/ufabc.asp"},{"nonStandardizedName":"UFSCAR","url":"/curso-objetivo/vestibular/resolucao_comentada/ufscar.asp"},{"nonStandardizedName":"UNB","url":"/curso-objetivo/vestibular/resolucao_comentada/unb.asp"},{"nonStandardizedName":"UNESP","url":"/curso-objetivo/vestibular/resolucao_comentada/unesp.asp"},{"nonStandardizedName":"UNICAMP","url":"/curso-objetivo/vestibular/resolucao_comentada/unicamp.asp"},{"nonStandardizedName":"UNIFESP","url":"/curso-objetivo/vestibular/resolucao_comentada/unifesp.asp"},{"nonStandardizedName":"UNIP","url":"/curso-objetivo/vestibular/resolucao_comentada/unip.asp"}];

  const entrypoint = `/curso-objetivo/vestibular/resolucao_comentada.aspx`;
  fetch(entrypoint).catch(() => alert("Serviço indisponível no momento!"));

  return universities;
}

interface University {
  nonStandardizedName: string,
  url: string
}