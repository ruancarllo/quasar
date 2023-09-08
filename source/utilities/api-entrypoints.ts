const ipRegularExpression = /\d+\.\d+\.\d+\.\d+/g;
const isInLocalHost = window.location.hostname === 'localhost' || ipRegularExpression.test(window.location.hostname);

const apiEntrypoints = {
  cursoObjetivo: isInLocalHost ? '/curso-objetivo' : 'https://www.curso-objetivo.br'
}

export default apiEntrypoints;