import * as Preact from 'preact';

import UniversityCard from './components/university-card.tsx';
import fetchUniversities from './utilities/fetch-universities.ts';

class Application extends Preact.Component {
  render() {
    return (
      <div class="application">
        <h1>Questium</h1>
        <div class="university-cards"></div>
      </div>
    );
  }
}

async function main() {
  Preact.render(<Application/>, document.body);

  const universityCards: Preact.VNode<UniversityCard>[] = new Array();

  for (let university of await fetchUniversities()) {
    universityCards.push(<UniversityCard nonStandardizedName={university.nonStandardizedName} url={university.url}/>);
  }

  Preact.render(universityCards, document.querySelector('.university-cards'));
}

main();