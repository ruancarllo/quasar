window.addEventListener('DOMContentLoaded', function() {
  const universityCards = document.querySelectorAll('.university-card');

  for (const card of universityCards) {
    card.addEventListener('click', function() {
      card.animate([
        {transform: 'scale(1)'},
        {transform: 'scale(1.075)'},
        {transform: 'scale(1)'}
      ], {
        duration: 750,
        easing: 'ease-out'
      });

      window.open(`/quasar/questions?universityName=${card.textContent}`, '_self');
    });
  }
});