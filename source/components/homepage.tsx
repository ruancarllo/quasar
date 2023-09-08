import * as Preact from 'preact';

import './homepage.scss'

import UniversityCard from '../components/university-card.tsx';

import fetchUniversities from '../utilities/fetch-universities.ts';
import standardizeUniversityName from '../utilities/standardize-university-name.ts';

class Homepage extends Preact.Component {
  render() {
    return (
      <div class="homepage">
        <div class="title-box">
          <h1>Quasar</h1>
        </div>
        <div class="university-cards"></div>
      </div>
    );
  }

  async componentDidMount() {
    Preact.render(
      <>
        <UniversityCard name="Uni-Esquina" url="URL"/>
        <UniversityCard name="Uni-Esquina" url="URL"/>
        <UniversityCard name="Uni-Esquina" url="URL"/>
        <UniversityCard name="Uni-Esquina" url="URL"/>
      </>,
      document.querySelector('.university-cards')
    )

    return;

    const universityCards: Preact.VNode<UniversityCard>[] = new Array();

    for (let university of await fetchUniversities()) {
      const standardizedName = standardizeUniversityName(university.nonStandardizedName);
      universityCards.push(<UniversityCard name={standardizedName} url={university.url}/>);
    }

    Preact.render(universityCards, document.querySelector('.university-cards'));
  }
}

export default Homepage;