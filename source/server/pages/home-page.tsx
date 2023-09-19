/// <reference lib="dom"/>

import React from "react";
import Config from '@server/config';

class HomePage extends React.Component {
  render(): React.ReactNode {
    return (
      <html>
        <head>
          <meta charSet="utf-8"/>
          <meta name="theme-color" content="#7048e8"/>

          <base href={Config.appPath + '/'}/>

          <script defer type="text/javascript" src="client/scripts/home.tsx"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Slab:normal,bold"/>

          <link rel="manifest" href="client/static/manifest.json"/>
          <link rel="shortcut icon" href="client/static/quasar-icon-192.png" type="image/png"/>
        </head>
        <body style={Styles.Body}>
          <section style={Styles.HomePage} id="home-page">
            <div style={Styles.TitleBox} id="title-box">
              <h1 style={Styles.Title} id="title">Quasar</h1>
            </div>
            <div style={Styles.UniversityCards} id="university-cards"></div>
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

  static HomePage: React.CSSProperties = {
    width: '100vw',
    minHeight: '100vh',

    gap: '10vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    backgroundColor: '#e5dbff'
  }

  static TitleBox: React.CSSProperties = {
    width: '100vw',
    height: '30vw',

    boxSizing: 'border-box',

    padding: '10vw',
    borderRadius: '0vw 0vw 7.5vw 7.5vw',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0vw 0vw 2vw 0vw #5f3dc4',
    backgroundColor: '#7048e8'
  }

  static Title: React.CSSProperties = {
    margin: '0px',

    fontFamily: 'Roboto Slab',
    fontWeight: 'bold',
    fontSize: '10vw',
    color: '#f3f0ff'
  }

  static UniversityCards: React.CSSProperties = {
    boxSizing: 'border-box',

    padding: '0 0 7.5vw 0',
    gap: '7.5vw',

    display: 'flex',
    flexDirection: 'column'
  }
}

export default HomePage;