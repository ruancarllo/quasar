import * as Preact from 'preact';

import networkPathes from '../resources/network-pathes';

class UniversityCard extends Preact.Component<Properties> {
  constructor(properties: Properties) {
    super(properties);
  }

  render() {
    return (
      <div style={Styles.UniversityCard} onClick={() => this.goToQuestionsPage(this.props.url)} class="university-card">
        <a style={Styles.UniversityName} class="university-name">{this.props.name}</a>
      </div>
    )
  }

  goToQuestionsPage(universityUrl: string) {
    window.location.href = `${networkPathes.base}/questions?universityUrl=${universityUrl}`
  }
}

class Styles {
  static UniversityCard: Preact.JSX.CSSProperties = {
    width: '85vw',
    height: '20vw',

    borderRadius: '5vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0.5vw 0.5vw 2vw 0.5vw #b197fc',
    backgroundColor: '#d0bfff'
  }

  static UniversityName: Preact.JSX.CSSProperties = {
    fontFamily: 'Roboto Slab',
    fontWeight: 'bold',
    fontSize: '7.5vw',
    color: '#2a1b55'
  }
}

interface Properties {
  name: string,
  url: string
}

export default UniversityCard;