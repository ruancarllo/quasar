import * as Preact from 'preact';

import './university-card.scss';

class UniversityCard extends Preact.Component<Properties> {
  render(properties: Properties) {
    return (
      <div class="university-card">
        <a>{properties.standardizedName}</a>
      </div>
    )
  }
}

interface Properties {
  standardizedName: string,
  url: string
}

export default UniversityCard;