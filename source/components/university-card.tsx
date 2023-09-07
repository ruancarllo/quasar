import * as Preact from 'preact';
import './university-card.scss';

class UniversityCard extends Preact.Component<Properties> {
  render(properties: Properties) {
    const name = standardizeUniversityName(properties.nonStandardizedName);

    return (
      <div class="university-card">
        <a>{name}</a>
      </div>
    )
  }
}

function standardizeUniversityName(nonStandardizedName: string): string {
  const characters = [...nonStandardizedName];

  for (let count = 0; count < characters.length; count++) {
    if (count === 0) {
      characters[count] = characters[count].toUpperCase();
    }

    else if (characters[count] === ' ' || characters[count] === '-') {
      characters[count + 1] = characters[count + 1].toUpperCase();
      count++;
    }

    else {
      characters[count] = characters[count].toLowerCase();
    }
  }

  return characters.join('');
}

interface Properties {
  nonStandardizedName: string,
  url: string
}

export default UniversityCard;

globalThis.standarize = standardizeUniversityName