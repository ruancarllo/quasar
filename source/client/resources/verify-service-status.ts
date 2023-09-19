function verifyServiceStatus() {
  fetch('/curso-objetivo').then((response) => {
    if (response.status !== 200) {
      alert('Serviço indisponível no momento!');
    }
  });
}

export default verifyServiceStatus;