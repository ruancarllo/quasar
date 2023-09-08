const ipRegularExpression = /\d+\.\d+\.\d+\.\d+/g;

const isInLocalHost = window.location.hostname === 'localhost';
const isInLocalIP = ipRegularExpression.test(window.location.hostname);
const isInRepl = window.location.hostname.endsWith('.repl.co');

const networkPathes = {
  cursoObjetivo: isInLocalHost || isInLocalIP || isInRepl ? '/curso-objetivo' : 'https://www.curso-objetivo.br',
  base: isInLocalHost || isInLocalIP || isInRepl ? '/quasar' : ''
}

export default networkPathes;