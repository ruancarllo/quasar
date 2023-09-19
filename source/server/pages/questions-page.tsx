/// <reference lib="dom"/>

import React from 'react';
import Config from '@server/config';

class QuestionsPage extends React.Component {
  render(): React.ReactNode {
    return (
      <html>
        <head>
          <base href={Config.appPath + '/'}/>

          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#ffffff"/>

          <script defer type="text/javascript" src="client/scripts/questions.tsx"></script>
          
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Slab:normal,bold"/>
          <link rel="shortcut icon" href="client/static/quasar-icon-192.png" type="image/png"/>
        </head>
        <body style={Styles.Body}>
          <section style={Styles.QuestionsPage} id="questions-page">
            <div style={Styles.QuestionsContainer} id="questions-container"></div>
            <div style={Styles.LoaderContainer} id="loader-container"></div>
          </section>
        </body>
      </html>
    );
  }
}

class Styles {
  static Body: React.CSSProperties = {
    margin: '0px',
    border: '0px',
    padding: '0px'
  }

  static QuestionsPage: React.CSSProperties = {
    width: '100vw',
    minHeight: '100vh',

    boxSizing: 'border-box',

    padding: '5vw',
    gap: '5vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  static QuestionsContainer: React.CSSProperties = {
    width: '100%',

    display: 'inherit',
    flexDirection: 'inherit',
    alignItems: 'inherit',
  }

  static LoaderContainer: React.CSSProperties = {
    width: '100%',

    display: 'inherit',
    flexDirection: 'inherit',
    alignItems: 'inherit',
  }
}

export default QuestionsPage;