import * as Preact from 'preact';

import './university-card.scss';

class UniversityCard extends Preact.Component<Properties> {
  render(properties: Properties) {
    return (
      <div class="university-card">
        <a class="name">{properties.name}</a>
      </div>
    )
  }
}

interface Properties {
  name: string,
  url: string
}

export default UniversityCard;