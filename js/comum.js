document.addEventListener("DOMContentLoaded", function () {
  const anoRodape = document.getElementById("ano-atual");
  if (anoRodape) {
    anoRodape.textContent = new Date().getFullYear();
  }

  const arquivoAtual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu-link").forEach(function (link) {
    if (link.getAttribute("href") === arquivoAtual) {
      link.classList.add("ativo");
      link.setAttribute("aria-current", "page");
    }
  });

  const botaoMenu = document.getElementById("botao-menu");
  const menuPuro = document.getElementById("menu-puro");
  if (botaoMenu && menuPuro) {
    botaoMenu.addEventListener("click", function () {
      const aberto = menuPuro.classList.toggle("aberto");
      botaoMenu.setAttribute("aria-expanded", aberto);
    });
  }
});
