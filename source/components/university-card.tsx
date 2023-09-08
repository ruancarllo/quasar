import * as Preact from 'preact';

import './university-card.scss';

import networkPathes from '../resources/network-pathes';

class UniversityCard extends Preact.Component<Properties> {
  constructor(properties: Properties) {
    super(properties);
  }

  render() {
    return (
      <div class="university-card" onClick={() => this.goToQuestionsPage(this.props.url)}>
        <a class="name">{this.props.name}</a>
      </div>
    )
  }

  goToQuestionsPage(universityUrl: string) {
    window.location.href = `${networkPathes.base}/questions?universityUrl=${universityUrl}`
  }
}

interface Properties {
  name: string,
  url: string
}

export default UniversityCard;