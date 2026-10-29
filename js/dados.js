document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.getElementById("tabela-planetas");
  const corpo = tabela.tBodies[0];
  const campoBusca = document.getElementById("busca");
  const filtroTipo = document.getElementById("filtro-tipo");
  const resultado = document.getElementById("resultado-busca");
  const cabecalhos = tabela.querySelectorAll("th");
  let ordemAscendente = true;

  function filtrar() {
    const termo = campoBusca.value.trim().toLowerCase();
    const tipo = filtroTipo.value;
    let visiveis = 0;

    for (const linha of corpo.rows) {
      const textoLinha = linha.textContent.toLowerCase();
      const combinaTexto = textoLinha.includes(termo);
      const combinaTipo = tipo === "todos" || linha.dataset.tipo === tipo;
      const mostrar = combinaTexto && combinaTipo;
      linha.hidden = !mostrar;
      if (mostrar) {
        visiveis++;
      }
    }

    resultado.textContent = visiveis === 0 ? "Nenhum planeta encontrado." : visiveis + " de " + corpo.rows.length + " planetas exibidos.";
  }

  function ordenar(indice) {
    const linhas = Array.from(corpo.rows);

    linhas.sort(function (a, b) {
      const celA = a.cells[indice];
      const celB = b.cells[indice];
      const valA = celA.dataset.valor !== undefined ? Number(celA.dataset.valor) : celA.textContent;
      const valB = celB.dataset.valor !== undefined ? Number(celB.dataset.valor) : celB.textContent;
      let comparacao;

      if (typeof valA === "number") {
        comparacao = valA - valB;
      } else {
        comparacao = valA.localeCompare(valB, "pt-BR");
      }
      return ordemAscendente ? comparacao : -comparacao;
    });

    linhas.forEach(function (linha) {
      corpo.appendChild(linha);
    });
    ordemAscendente = !ordemAscendente;
  }

  cabecalhos.forEach(function (cabecalho, indice) {
    cabecalho.addEventListener("click", function () {
      ordenar(indice);
    });
  });

  campoBusca.addEventListener("input", filtrar);
  filtroTipo.addEventListener("change", filtrar);
  filtrar();
});
