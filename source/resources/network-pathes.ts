const ipRegularExpression = /\d+\.\d+\.\d+\.\d+/g;

const isInLocalHost = window.location.hostname === 'localhost';
const isInLocalIP = ipRegularExpression.test(window.location.hostname);
const isInRepl = window.location.hostname.endsWith('.repl.co');

const isInServer = isInLocalHost || isInLocalIP || isInRepl;

const networkPathes = {
  base: isInServer ? '/quasar' : '',
  cursoObjetivo: isInServer ? '/curso-objetivo' : 'https://www.curso-objetivo.br',
}

export default networkPathes;