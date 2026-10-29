document.addEventListener("DOMContentLoaded", function () {
  const botoes = document.querySelectorAll("[data-filtro]");
  const cartoes = document.querySelectorAll(".linha-cartoes .cartao");
  const contador = document.getElementById("contador-cartoes");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const filtro = botao.dataset.filtro;
      let visiveis = 0;

      cartoes.forEach(function (cartao) {
        const mostrar = filtro === "todos" || cartao.dataset.tipo === filtro;
        cartao.style.display = mostrar ? "" : "none";
        if (mostrar) {
          visiveis++;
        }
      });

      botoes.forEach(function (b) {
        b.setAttribute("aria-pressed", b === botao);
      });
      contador.textContent = visiveis + " planeta(s) exibido(s)";
    });
  });
});
