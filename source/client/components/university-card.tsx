/// <reference lib="dom"/>

import React from 'react';

class UniversityCard extends React.Component<Properties> {
  reference: React.RefObject<HTMLDivElement>;

  constructor(properties: Properties) {
    super(properties);
    this.reference = React.createRef();
  }

  render() {
    return (
      <div ref={this.reference} style={Styles.UniversityCard} id="university-card">
        <a style={Styles.UniversityName} id="university-name">{this.props.name}</a>
      </div>
    )
  }

  componentDidMount() {
    if (!this.reference.current) return;

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

      this.reference.current?.animate(animationKeyframes, animationOptions);

      window.open(`questions?universityName=${encodeURIComponent(this.props.name)}`, '_self');
    });
  }
}

class Styles {
  static UniversityCard: React.CSSProperties = {
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

  static UniversityName: React.CSSProperties = {
    fontFamily: 'Roboto Slab',
    fontWeight: 'bold',
    fontSize: '7.5vw',
    color: '#2a1b55'
  }
}

interface Properties {
  name: string
}

export default UniversityCard;