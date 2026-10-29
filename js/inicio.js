document.addEventListener("DOMContentLoaded", function () {
  const hora = new Date().getHours();
  let saudacao;

  if (hora < 12) {
    saudacao = "Bom dia";
  } else if (hora < 18) {
    saudacao = "Boa tarde";
  } else {
    saudacao = "Boa noite";
  }

  const visitas = Number(localStorage.getItem("cosmos_visitas") || 0) + 1;
  localStorage.setItem("cosmos_visitas", visitas);

  const nome = localStorage.getItem("cosmos_nome");
  const campoSaudacao = document.getElementById("saudacao");
  campoSaudacao.textContent = nome ? saudacao + ", " + nome + "!" : saudacao + ", explorador!";

  document.getElementById("contador-visitas").textContent = visitas;

  const formNome = document.getElementById("form-nome");
  const campoNome = document.getElementById("campo-nome");
  const caixaAviso = document.getElementById("aviso-nome");

  formNome.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const valor = campoNome.value.trim();
    localStorage.setItem("cosmos_nome", valor);
    campoSaudacao.textContent = saudacao + ", " + valor + "!";
    caixaAviso.classList.remove("d-none");
    campoNome.value = "";
  });

  const dadosSistema = [
    { rotulo: "Planetas", valor: 8 },
    { rotulo: "Estrela central", valor: 1 },
    { rotulo: "Idade (bilhões de anos)", valor: 4.6 }
  ];

  const painel = document.getElementById("painel-numeros");
  dadosSistema.forEach(function (item) {
    const coluna = document.createElement("div");
    coluna.className = "col-4";
    coluna.innerHTML = '<div class="destaque-numero">' + item.valor + '</div><small>' + item.rotulo + '</small>';
    painel.appendChild(coluna);
  });
});
