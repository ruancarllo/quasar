import * as Preact from 'preact';

import UniversityCard from '../components/university-card.tsx';

import fetchUniversities from '../resources/fetch-universities.ts';
import standardizeUniversityName from '../resources/standardize-university-name.ts';

import './home-page.scss'

class HomePage extends Preact.Component {
  render() {
    return (
      <div class="home-page">
        <div class="title-box">
          <h1>Quasar</h1>
        </div>
        <div class="university-cards"></div>
      </div>
    );
  }

  async componentDidMount() {
    const universityCards: Preact.VNode<UniversityCard>[] = new Array();

    for (let university of await fetchUniversities()) {
      const standardizedName = standardizeUniversityName(university.nonStandardizedName);
      universityCards.push(<UniversityCard name={standardizedName} url={university.url}/>);
    }

    Preact.render(universityCards, document.querySelector('.university-cards'));
  }
}

export default HomePage;