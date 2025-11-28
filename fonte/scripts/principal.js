// Script global: ano automático, marcação de link ativo e rolagem suave
document.addEventListener('DOMContentLoaded', function () {
  // Atualiza o ano no rodapé
  const anoEl = document.getElementById('ano');
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  // Marca o link do menu correspondente à página atual
  function marcarAtivo() {
    try {
      const atual = new URL(window.location.href);
      const caminhoAtual = atual.pathname.replace(/\\+/g, '/');
      const linksMenu = document.querySelectorAll('.navegacao a');
      linksMenu.forEach(a => {
        const hrefAbs = new URL(a.getAttribute('href') || '', window.location.href);
        const caminhoLink = hrefAbs.pathname.replace(/\\+/g, '/');
        const eIndexLink = caminhoLink.endsWith('/index.html');
        const eIndexPagina = caminhoAtual.endsWith('/index.html') || caminhoAtual.endsWith('/') || caminhoAtual === '';
        const corresponde = eIndexLink ? eIndexPagina : (caminhoAtual.endsWith(caminhoLink));
        if (corresponde) a.classList.add('ativo'); else a.classList.remove('ativo');
      });
    } catch (_) {}
  }
  marcarAtivo();
  // Reexecuta após os includes injetarem o cabeçalho
  window.addEventListener('navegacao-atualizada', marcarAtivo);

  // Rolagem suave para âncoras internas
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

  // Mock simples do formulário (quando existir)
  const formulario = document.querySelector('form.formulario');
  if (formulario) {
    formulario.addEventListener('submit', e => {
      e.preventDefault();
      alert('Mensagem enviada!');
      formulario.reset();
    });
  }

  // Estado "ativo" persistente para links de contato
  const linksContato = document.querySelectorAll('.dados-contato a');
  if (linksContato.length) {
    linksContato.forEach(link => {
      link.addEventListener('click', () => {
        linksContato.forEach(l => l.classList.remove('ativo-contato'));
        link.classList.add('ativo-contato');
      });
    });
  }
});
