import * as Preact from 'preact';

import networkPathes from '../resources/network-pathes';

class UniversityCard extends Preact.Component<Properties> {
  reference: Preact.RefObject<HTMLDivElement>;

  constructor(properties: Properties) {
    super(properties);
    this.reference = Preact.createRef();
  }

  render() {
    return (
      <div ref={this.reference} style={Styles.UniversityCard} class="university-card">
        <a style={Styles.UniversityName} class="university-name">{this.props.name}</a>
      </div>
    )
  }

  componentDidMount() {
    this.reference.current.addEventListener('click', () => {
      const animationKeyframes: Keyframe[] = [
        {transform: 'scale(1)'},
        {transform: 'scale(1.075)'},
        {transform: 'scale(1)'}
      ]

      const animationOptions: KeyframeAnimationOptions = {
        duration: 750,
        easing: 'ease-out'
      }

      this.reference.current.animate(animationKeyframes, animationOptions);

      window.location.href = `${networkPathes.base}/questions?universityUrl=${this.props.url}`;
    });
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