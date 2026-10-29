const curiosidades = [
  { id: 1, titulo: "Luz do Sol", texto: "A luz do Sol leva cerca de 8 minutos e 20 segundos para chegar até a Terra." },
  { id: 2, titulo: "Dia maior que o ano", texto: "Em Vênus, um dia (cerca de 243 dias terrestres) dura mais que um ano (cerca de 225 dias terrestres)." },
  { id: 3, titulo: "Saturno flutuaria", texto: "A densidade média de Saturno é menor que a da água: em uma piscina gigante, ele boiaria." },
  { id: 4, titulo: "Pôr do sol azul", texto: "Em Marte, o céu é avermelhado durante o dia, mas o pôr do sol tem tons azulados ao redor do Sol." },
  { id: 5, titulo: "Tempestade antiga", texto: "A Grande Mancha Vermelha de Júpiter é uma tempestade observada há mais de 150 anos e vem encolhendo." },
  { id: 6, titulo: "Um ano em Netuno", texto: "Netuno leva cerca de 165 anos terrestres para dar uma volta completa ao redor do Sol." },
  { id: 7, titulo: "Sol gigante", texto: "Mais de 1 milhão de Terras caberiam dentro do volume do Sol." },
  { id: 8, titulo: "Voyager 1", texto: "Lançada em 1977, a sonda Voyager 1 está no espaço interestelar desde 2012." },
  { id: 9, titulo: "Pegadas na Lua", texto: "Sem vento nem chuva, as pegadas deixadas pelos astronautas na Lua podem durar milhões de anos." },
  { id: 10, titulo: "Dia em Mercúrio", texto: "Mercúrio dá a volta no Sol em 88 dias, mas um dia solar por lá dura cerca de 176 dias terrestres." }
];

document.addEventListener("DOMContentLoaded", function () {
  const caixaTitulo = document.getElementById("curio-titulo");
  const caixaTexto = document.getElementById("curio-texto");
  const botaoSortear = document.getElementById("sortear");
  const botaoFavoritar = document.getElementById("favoritar");
  const listaFavoritos = document.getElementById("lista-favoritos");
  const listaGeral = document.getElementById("lista-curiosidades");
  let atual = null;

  function lerFavoritos() {
    return JSON.parse(localStorage.getItem("cosmos_favoritos") || "[]");
  }

  function salvarFavoritos(lista) {
    localStorage.setItem("cosmos_favoritos", JSON.stringify(lista));
  }

  function desenharFavoritos() {
    const favoritos = lerFavoritos();
    listaFavoritos.innerHTML = "";

    if (favoritos.length === 0) {
      listaFavoritos.innerHTML = '<li class="list-group-item text-muted">Nenhuma curiosidade favoritada ainda.</li>';
      return;
    }

    favoritos.forEach(function (id) {
      const item = curiosidades.find(function (c) {
        return c.id === id;
      });
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-start gap-2";
      li.innerHTML = "<span><strong>" + item.titulo + "</strong><br>" + item.texto + "</span>";
      const remover = document.createElement("button");
      remover.className = "btn btn-sm btn-outline-danger";
      remover.textContent = "Remover";
      remover.addEventListener("click", function () {
        salvarFavoritos(lerFavoritos().filter(function (f) {
          return f !== id;
        }));
        desenharFavoritos();
      });
      li.appendChild(remover);
      listaFavoritos.appendChild(li);
    });
  }

  function sortear() {
    let novo;
    do {
      novo = curiosidades[Math.floor(Math.random() * curiosidades.length)];
    } while (atual && novo.id === atual.id);

    atual = novo;
    caixaTitulo.textContent = novo.titulo;
    caixaTexto.textContent = novo.texto;
  }

  botaoSortear.addEventListener("click", sortear);

  botaoFavoritar.addEventListener("click", function () {
    const favoritos = lerFavoritos();
    if (!favoritos.includes(atual.id)) {
      favoritos.push(atual.id);
      salvarFavoritos(favoritos);
    }
    desenharFavoritos();
  });

  curiosidades.forEach(function (c) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.innerHTML = "<strong>" + c.titulo + ":</strong> " + c.texto;
    listaGeral.appendChild(li);
  });

  sortear();
  desenharFavoritos();
});
