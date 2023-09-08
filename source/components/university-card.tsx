import * as Preact from 'preact';

import './university-card.scss';

class UniversityCard extends Preact.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div class="university-card">
        <a class="name">{this.props.name}</a>
      </div>
    )
  }
}

interface Props {
  name: string,
  url: string
}

export default UniversityCard;