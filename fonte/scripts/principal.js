document.addEventListener('DOMContentLoaded', function () {
  const anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  const linksNavegacao = document.querySelectorAll('a[href^="#"]');
  linksNavegacao.forEach(link => {
    link.addEventListener('click', e => {
      const alvoId = link.getAttribute('href');
      const alvo = document.querySelector(alvoId);
      if (alvo) {
        e.preventDefault();
        alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', alvoId);
      }
    });
  });

  const formulario = document.querySelector('form.formulario');
  if (formulario) {
    formulario.addEventListener('submit', e => {
      e.preventDefault();
      alert('Mensagem enviada!');
      formulario.reset();
    });
  }
});
