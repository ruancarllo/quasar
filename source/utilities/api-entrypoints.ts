const isInLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const apiEntrypoints = {
  cursoObjetivo: isInLocalHost ? '/curso-objetivo' : 'https://www.curso-objetivo.br'
}

export default apiEntrypoints;