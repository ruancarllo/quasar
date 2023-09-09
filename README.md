# Quasar — learn by absorbing

Quasar is an educational Progressive Web Application ([PWA](https://en.wikipedia.org/wiki/Progressive_web_app)) designed for Brazilian students to study for the country's main entrance exams based on the commented resolution of previous tests.

Therefore, Quasar generates a randomized test with such resolutions — which are provided by [Curso Objetivo](https://www.curso-objetivo.br). The interesting thing is that this is arranged on the screen in a similar way to the functioning of social networks in general, so used by young people: the [infinite scroll](https://en.wiktionary.org/wiki/infinite_scroll).

<p align="center">
  <img src="./theme/quasar-logo.png" alt="Quasar Logomark" width="250">
</p>

## Installation

To install Quasar on your cell phone, you can go to its [official website](https://server.carllotech.repl.co/quasar), hosted on [Replit](https://replit.com), and add the site opens to its home screen. This will generate a functional application on your system launcher, be it **Android** or **iOS**.

## Serving

You can also serve a server of this project on your local machine from its source code written in [TypeScript](https://www.typescriptlang.org). To do this, your computer must have the latest version of [NodeJS](https://nodejs.org) and [NPM](https://www.npmjs.com) installed. It is recommended to use [Git](https://git-scm.com) for project version control, although this is not mandatory.

With that ready, follow the following steps:

1. **Obtaining the source code:** Download source code from this repository and open this folder with your machine's terminal, using the following commands:

```sh
git clone "https://github.com/ruancarllo/quasar.git" quasar
cd quasar
```

2. **Installing dependencies:** Install the package dependencies with the command:

```sh
npm install
```

3. **Running the server:** Expose the server on your local network, from:


```sh
npm run serve
```

## Building

Although not recommended, you can build this application by generating a static website using:

```sh
npm run build
```

However, be aware that this application operates under a strict Cross-Origin Resource Sharing policy ([CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)), making it essential to use a [proxy]( https://en.wikipedia.org/wiki/Proxy_server) suitable for the requests made by the program.

## Preview

Once this is all done properly, you can enjoy this software to increase your academic productivity in your studies.

<p align="center">
  <img src="./theme/quasar-mockup.png" alt="Quasar Application Mockups">
</p>

## License

If it is for the general good of the nation, tell the people that I license this project under the terms of the [BSD-3-Clause](./LICENSE.md) license.