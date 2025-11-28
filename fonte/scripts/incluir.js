(function(){
  function prefixo() {
    const caminho = window.location.pathname;
    return caminho.includes('/paginas/') ? '../' : '';
  }
  async function incluir(tipo, seletor) {
    const dests = document.querySelectorAll(seletor);
    if (!dests.length) return;
    const pre = prefixo();
    const url = new URL(pre + 'componentes/' + tipo + '.html', window.location.href).toString();
    let html = '';
    try {
      const resp = await fetch(url, { cache: 'no-cache' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      html = await resp.text();
    } catch (e) {
      console.warn('Falha ao carregar include', tipo, 'em', url, e);
      if (tipo === 'cabecalho') {
        html = '<div class="container">\n  <div class="marca">Portfólio</div>\n  <nav class="navegacao">\n    <a data-caminho="index.html">Sobre Mim</a>\n    <a data-caminho="paginas/formacao.html">Formação</a>\n    <a data-caminho="paginas/portfolio.html">Portfólio</a>\n    <a data-caminho="paginas/contato.html">Contato</a>\n    <a data-caminho="paginas/livro-de-visitas.html">Livro de Visitas</a>\n  </nav>\n</div>';
      } else if (tipo === 'rodape') {
        html = '<div class="container">\n  <small>© <span id="ano"></span> Eudemar Tonatto</small>\n</div>';
      }
    }
    dests.forEach(el => { el.innerHTML = html; });
    // Ajustar links do menu (href) conforme o contexto
    document.querySelectorAll('.navegacao a[data-caminho]').forEach(a => {
      const caminho = a.getAttribute('data-caminho') || '';
      const href = pre + caminho;
      a.setAttribute('href', href);
      a.removeAttribute('data-caminho');
    });
  }
  async function iniciar() {
    await incluir('cabecalho', 'header.cabecalho[data-incluir="cabecalho"]');
    await incluir('rodape', 'footer.rodape[data-incluir="rodape"]');
    window.dispatchEvent(new Event('navegacao-atualizada'));
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
})();
