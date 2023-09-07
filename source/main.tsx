import * as Preact from 'preact';
import './components/university-card.tsx'

class Application extends Preact.Component {
  render() {
    return <div class="application"></div>
  }
}

async function fetchUniversities() {
  const entrypoint = 'https://www.curso-objetivo.br/vestibular/resolucao_comentada.aspx';
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

Preact.render(<Application/>, document.body);

globalThis.fetchUniversities = fetchUniversities