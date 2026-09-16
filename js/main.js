/* =========================================================
   main.js — comportamento da página
   Carregado com "defer" no index.html, então o HTML já existe
   quando este código roda. Duas funcionalidades só:
     1. revelar as seções conforme a pessoa rola a página
     2. botão que copia o e-mail para a área de transferência
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. Revelar seções ao rolar
     IntersectionObserver avisa quando um elemento entra na tela.
     É bem mais leve que ficar escutando o evento de scroll.
     --------------------------------------------------------- */
  function ativarRevelacao() {
    var secoes = document.querySelectorAll(".reveal");

    // Se a pessoa pediu menos animação no sistema, ou o navegador é
    // antigo demais, mostramos tudo de uma vez. Acessibilidade primeiro.
    var preferMenosMovimento =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (preferMenosMovimento || !("IntersectionObserver" in window)) {
      secoes.forEach(function (el) {
        el.classList.add("on");
      });
      return;
    }

    var observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("on");
          // Já revelou: para de observar, para não gastar processamento à toa.
          observador.unobserve(entrada.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    secoes.forEach(function (el) {
      observador.observe(el);
    });
  }

  /* ---------------------------------------------------------
     2. Botão "copiar meu e-mail"
     O e-mail vem do atributo data-email no HTML — assim o texto
     fica em um lugar só e o JavaScript não precisa saber qual é.
     --------------------------------------------------------- */
  function ativarBotaoCopiar() {
    var botao = document.getElementById("copiar");
    if (!botao) return; // o botão pode não existir: não quebre a página por isso

    var email = botao.getAttribute("data-email");
    var rotulo = botao.lastElementChild;
    var textoOriginal = rotulo.textContent;

    function confirmar() {
      rotulo.textContent = "E-mail copiado";
      setTimeout(function () {
        rotulo.textContent = textoOriginal;
      }, 1800);
    }

    function mostrarEmail() {
      // Plano B: se não deu para copiar, ao menos deixe o e-mail à vista.
      rotulo.textContent = email;
    }

    botao.addEventListener("click", function () {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(confirmar, mostrarEmail);
      } else {
        mostrarEmail();
      }
    });
  }

  /* ---------------------------------------------------------
     3. Fotos que ainda não existem
     Enquanto os arquivos não estiverem em assets/, o navegador
     mostraria o ícone de imagem quebrada. Em vez disso,
     escondemos a figura inteira — a seção continua legível.
     --------------------------------------------------------- */
  function ativarGaleria() {
    var fotos = document.querySelectorAll(".gallery img");

    fotos.forEach(function (img) {
      var esconder = function () {
        var figura = img.closest("figure");
        if (figura) figura.hidden = true;
      };

      // O erro pode acontecer antes deste código rodar: por isso
      // checamos também o estado atual da imagem.
      img.addEventListener("error", esconder);
      if (img.complete && img.naturalWidth === 0) esconder();
    });
  }

  ativarRevelacao();
  ativarBotaoCopiar();
  ativarGaleria();
})();
