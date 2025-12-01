(function(){
  // Calcula o prefixo relativo (raiz vs pasta paginas/)
  function prefixo() {
    const caminho = window.location.pathname;
    return caminho.includes('/paginas/') ? '../' : '';
  }

  // Carrega e injeta um componente HTML (cabecalho/rodape) no seletor informado
  async function incluir(tipo, seletor) {
    const dests = document.querySelectorAll(seletor);
    if (!dests.length) return;
    const pre = prefixo();
    const url = new URL(pre + 'componentes/' + tipo + '.html', window.location.href).toString();
    let html = '';
    try {
      // Tenta buscar o componente; evita cache para refletir mudanças
      const resp = await fetch(url, { cache: 'no-cache' });
      if (!resp.ok) throw new Error('HTTP ' + resp.status);
      html = await resp.text();
    } catch (e) {
      // Fallback mínimo caso o fetch falhe (ex.: teste via file://)
      console.warn('Falha ao carregar include', tipo, 'em', url, e);
      if (tipo === 'cabecalho') {
        html = '<div class="container">\n  <div class="marca">Portfólio</div>\n  <button class="menu-toggle" aria-label="Abrir menu de navegação" aria-expanded="false">\n    <span></span>\n    <span></span>\n    <span></span>\n  </button>\n  <nav class="navegacao">\n    <a data-caminho="index.html">Sobre Mim</a>\n    <a data-caminho="paginas/formacao.html">Formação</a>\n    <a data-caminho="paginas/portfolio.html">Portfólio</a>\n    <a data-caminho="paginas/contato.html">Contato</a>\n    <a data-caminho="paginas/livro-de-visitas.html">Livro de Visitas</a>\n  </nav>\n</div>';
      } else if (tipo === 'rodape') {
        html = '<div class="container">\n  <small>© <span id="ano"></span> Eudemar Tonatto</small>\n</div>';
      }
    }
    // Injeta o HTML carregado
    dests.forEach(el => { el.innerHTML = html; });
    // Ajustar links do menu (href) conforme o contexto
    document.querySelectorAll('.navegacao a[data-caminho]').forEach(a => {
      const caminho = a.getAttribute('data-caminho') || '';
      const href = pre + caminho;
      a.setAttribute('href', href);
      a.removeAttribute('data-caminho');
    });
  }
  // Inicializa os includes e notifica para marcação do link ativo
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
