import * as Preact from 'preact';

import UniversityCard from '../components/university-card.tsx';
import {fetchUniversitiesSync} from '../resources/fetch-universities.ts';
import standardizeUniversityName from '../resources/standardize-university-name.ts';

class HomePage extends Preact.Component {
  render() {
    return (
      <section style={Styles.HomePage} class="home-page">
        <div style={Styles.TitleBox} class="title-box">
          <h1 style={Styles.Title} class="title">Quasar</h1>
        </div>
        <div style={Styles.UniversityCards} class="university-cards"></div>
      </section>
    );
  }

  async componentDidMount() {
    try {
      const universityCards: Preact.VNode<UniversityCard>[] = new Array();

      for (let university of fetchUniversitiesSync()) {
        const standardizedName = standardizeUniversityName(university.nonStandardizedName);
        universityCards.push(<UniversityCard name={standardizedName} url={university.url}/>);
      }

      Preact.render(universityCards, document.querySelector('.university-cards'));
    }

    catch(exception) {
      alert("Serviço indisponível no momento!");
    }
  }
}

class Styles {
  static HomePage: Preact.JSX.CSSProperties = {
    width: '100vw',
    minHeight: '100vh',

    gap: '10vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#e5dbff'
  }

  static TitleBox: Preact.JSX.CSSProperties = {
    width: '100vw',
    height: '30vw',

    padding: '10vw',
    borderRadius: '0vw 0vw 7.5vw 7.5vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0vw 0vw 2vw 0vw #5f3dc4',
    backgroundColor: '#7048e8'
  }

  static Title: Preact.JSX.CSSProperties = {
    fontFamily: 'Roboto Slab',
    fontWeight: 'bold',
    fontSize: '10vw',
    color: '#f3f0ff'
  }

  static UniversityCards: Preact.JSX.CSSProperties = {
    padding: '0 0 7.5vw 0',
    gap: '7.5vw',

    display: 'flex',
    flexDirection: 'column'
  }
}

export default HomePage;