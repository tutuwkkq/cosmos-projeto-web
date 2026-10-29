const perguntas = [
  { enunciado: "Qual é o planeta mais próximo do Sol?", opcoes: ["Vênus", "Mercúrio", "Marte", "Terra"], correta: 1 },
  { enunciado: "Qual planeta é conhecido como Planeta Vermelho?", opcoes: ["Marte", "Júpiter", "Netuno", "Mercúrio"], correta: 0 },
  { enunciado: "Qual é o maior planeta do Sistema Solar?", opcoes: ["Saturno", "Urano", "Júpiter", "Terra"], correta: 2 },
  { enunciado: "Qual planeta é famoso por seus anéis brilhantes?", opcoes: ["Netuno", "Saturno", "Marte", "Vênus"], correta: 1 },
  { enunciado: "Quantos planetas existem no Sistema Solar?", opcoes: ["7", "9", "8", "10"], correta: 2 },
  { enunciado: "Qual é o planeta mais quente do Sistema Solar?", opcoes: ["Mercúrio", "Vênus", "Júpiter", "Marte"], correta: 1 },
  { enunciado: "Qual planeta gira praticamente \"deitado\" sobre sua órbita?", opcoes: ["Urano", "Terra", "Mercúrio", "Saturno"], correta: 0 },
  { enunciado: "Aproximadamente quanto tempo a luz do Sol leva para chegar à Terra?", opcoes: ["8 segundos", "8 minutos", "8 horas", "8 dias"], correta: 1 }
];

document.addEventListener("DOMContentLoaded", function () {
  const areaPergunta = document.getElementById("area-pergunta");
  const areaResultado = document.getElementById("area-resultado");
  const textoPergunta = document.getElementById("texto-pergunta");
  const listaOpcoes = document.getElementById("opcoes");
  const numeroPergunta = document.getElementById("numero-pergunta");
  const barra = document.getElementById("barra-progresso");
  const botaoProxima = document.getElementById("proxima");
  const textoPlacar = document.getElementById("texto-placar");
  const textoRecorde = document.getElementById("texto-recorde");
  const botaoReiniciar = document.getElementById("reiniciar");
  let indice = 0;
  let acertos = 0;

  function mostrarRecorde() {
    const recorde = localStorage.getItem("cosmos_recorde");
    textoRecorde.textContent = recorde === null ? "Nenhum recorde salvo ainda." : "Seu recorde: " + recorde + " de " + perguntas.length;
  }

  function carregarPergunta() {
    const atual = perguntas[indice];
    textoPergunta.textContent = atual.enunciado;
    numeroPergunta.textContent = "Pergunta " + (indice + 1) + " de " + perguntas.length;
    barra.style.width = (indice / perguntas.length) * 100 + "%";
    listaOpcoes.innerHTML = "";
    botaoProxima.disabled = true;

    atual.opcoes.forEach(function (texto, posicao) {
      const botao = document.createElement("button");
      botao.className = "opcao";
      botao.textContent = texto;
      botao.addEventListener("click", function () {
        responder(posicao);
      });
      listaOpcoes.appendChild(botao);
    });
  }

  function responder(escolhida) {
    const correta = perguntas[indice].correta;
    const botoes = listaOpcoes.querySelectorAll(".opcao");

    botoes.forEach(function (botao, posicao) {
      botao.disabled = true;
      if (posicao === correta) {
        botao.classList.add("certa");
      } else if (posicao === escolhida) {
        botao.classList.add("errada");
      }
    });

    if (escolhida === correta) {
      acertos++;
    }
    botaoProxima.textContent = indice === perguntas.length - 1 ? "Ver resultado" : "Próxima";
    botaoProxima.disabled = false;
  }

  function finalizar() {
    areaPergunta.hidden = true;
    areaResultado.hidden = false;
    barra.style.width = "100%";

    let mensagem;
    if (acertos === perguntas.length) {
      mensagem = "Incrível! Você é um verdadeiro astrônomo!";
    } else if (acertos >= perguntas.length / 2) {
      mensagem = "Muito bem! Você conhece bastante do Sistema Solar.";
    } else {
      mensagem = "Continue explorando o site e tente novamente!";
    }
    textoPlacar.textContent = "Você acertou " + acertos + " de " + perguntas.length + ". " + mensagem;

    const recorde = Number(localStorage.getItem("cosmos_recorde") || -1);
    if (acertos > recorde) {
      localStorage.setItem("cosmos_recorde", acertos);
    }
    mostrarRecorde();
  }

  botaoProxima.addEventListener("click", function () {
    indice++;
    if (indice < perguntas.length) {
      carregarPergunta();
    } else {
      finalizar();
    }
  });

  botaoReiniciar.addEventListener("click", function () {
    indice = 0;
    acertos = 0;
    areaResultado.hidden = true;
    areaPergunta.hidden = false;
    carregarPergunta();
  });

  mostrarRecorde();
  carregarPergunta();
});
