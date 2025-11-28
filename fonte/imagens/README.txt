Coloque aqui sua imagem de fundo com o nome: fundo.jpg

Requisitos sugeridos:
- Dimensão recomendada: 1920x1080 ou maior (16:9)
- Tamanho de arquivo: preferencialmente < 1.5 MB para melhor desempenho
- Posição: a imagem é centralizada e cobre toda a tela

Se preferir outro nome/caminho, ajuste em fonte/estilos/principal.css:
body::before { background-image: var(--bg-imagem, url('../imagens/fundo.jpg')); }

Ou defina via HTML (no <head>):
<style>:root { --bg-imagem: url('fonte/imagens/seu-arquivo.jpg'); }</style>
