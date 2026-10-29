document.addEventListener("DOMContentLoaded", function () {
  const formulario = document.getElementById("form-contato");
  const alerta = document.getElementById("alerta-envio");
  const lista = document.getElementById("lista-mensagens");
  const botaoLimpar = document.getElementById("limpar-mensagens");
  const contadorTexto = document.getElementById("contador-caracteres");
  const campoMensagem = document.getElementById("mensagem");

  function lerMensagens() {
    return JSON.parse(localStorage.getItem("cosmos_mensagens") || "[]");
  }

  function gravarMensagens(mensagens) {
    localStorage.setItem("cosmos_mensagens", JSON.stringify(mensagens));
  }

  function desenhar() {
    const mensagens = lerMensagens();
    lista.innerHTML = "";

    if (mensagens.length === 0) {
      lista.innerHTML = '<p class="text-muted">Nenhuma mensagem enviada neste navegador.</p>';
      botaoLimpar.hidden = true;
      return;
    }

    botaoLimpar.hidden = false;
    mensagens.forEach(function (msg, posicao) {
      const cartao = document.createElement("div");
      cartao.className = "mensagem-salva";
      cartao.innerHTML = "<strong>" + msg.nome + "</strong> (" + msg.assunto + ")<br><small>" + msg.data + "</small><p class=\"mb-0 mt-1\"></p>";
      cartao.querySelector("p").textContent = msg.texto;
      const remover = document.createElement("button");
      remover.type = "button";
      remover.textContent = "Excluir";
      remover.addEventListener("click", function () {
        const restantes = lerMensagens();
        restantes.splice(posicao, 1);
        gravarMensagens(restantes);
        desenhar();
      });
      cartao.prepend(remover);
      lista.appendChild(cartao);
    });
  }

  campoMensagem.addEventListener("input", function () {
    contadorTexto.textContent = campoMensagem.value.length + " caracteres";
  });

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const mensagens = lerMensagens();
    mensagens.push({
      nome: formulario.nome.value.trim(),
      email: formulario.email.value.trim(),
      assunto: formulario.assunto.value,
      texto: formulario.mensagem.value.trim(),
      data: new Date().toLocaleString("pt-BR")
    });
    gravarMensagens(mensagens);

    alerta.textContent = "Mensagem enviada com sucesso, " + formulario.nome.value.trim() + "! Ela ficou salva neste navegador.";
    alerta.classList.remove("d-none");
    formulario.reset();
    contadorTexto.textContent = "0 caracteres";
    desenhar();
  });

  botaoLimpar.addEventListener("click", function () {
    if (confirm("Deseja apagar todas as mensagens salvas?")) {
      localStorage.removeItem("cosmos_mensagens");
      desenhar();
    }
  });

  desenhar();
});
