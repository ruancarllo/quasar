import * as Preact from 'preact';

import fetchUniversities from './utilities/fetch-universities.ts';

class Application extends Preact.Component {
  render() {
    return <div class="application"></div>
  }
}

Preact.render(<Application/>, document.body);

globalThis.fetchuniversities = fetchUniversities