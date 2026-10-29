document.addEventListener("DOMContentLoaded", function () {
  const figuras = document.querySelectorAll(".galeria figure");
  const visualizador = document.getElementById("visualizador");
  const imagemGrande = document.getElementById("imagem-grande");
  const legendaGrande = document.getElementById("legenda-grande");
  const botaoFechar = document.getElementById("fechar-visualizador");
  const botaoAnterior = document.getElementById("anterior");
  const botaoProximo = document.getElementById("proximo");
  let indiceAtual = 0;

  function mostrar(indice) {
    indiceAtual = (indice + figuras.length) % figuras.length;
    const figura = figuras[indiceAtual];
    imagemGrande.src = figura.querySelector("img").src;
    imagemGrande.alt = figura.querySelector("img").alt;
    legendaGrande.textContent = figura.dataset.descricao;
    visualizador.classList.add("aberto");
    botaoFechar.focus();
  }

  function fechar() {
    visualizador.classList.remove("aberto");
  }

  figuras.forEach(function (figura, indice) {
    figura.tabIndex = 0;
    figura.addEventListener("click", function () {
      mostrar(indice);
    });
    figura.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        mostrar(indice);
      }
    });
  });

  botaoFechar.addEventListener("click", fechar);
  botaoAnterior.addEventListener("click", function () {
    mostrar(indiceAtual - 1);
  });
  botaoProximo.addEventListener("click", function () {
    mostrar(indiceAtual + 1);
  });

  visualizador.addEventListener("click", function (evento) {
    if (evento.target === visualizador) {
      fechar();
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (!visualizador.classList.contains("aberto")) {
      return;
    }
    if (evento.key === "Escape") {
      fechar();
    } else if (evento.key === "ArrowRight") {
      mostrar(indiceAtual + 1);
    } else if (evento.key === "ArrowLeft") {
      mostrar(indiceAtual - 1);
    }
  });
});
