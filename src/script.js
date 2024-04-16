let jogadorAtual = "X";
let jogoAtivo = true;
let nomeJogador1 = "Jogador 1";
let nomeJogador2 = "Jogador 2";

const combinacoesVitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

window.onload = function () {
  document.getElementById("modalNomes").style.display = "block";
};

function fecharModal() {
  document.getElementById("modalNomes").style.display = "none";
}

function iniciarJogo() {
  nomeJogador1 = document.getElementById("nomeJogador1").value || "Jogador 1";
  nomeJogador2 = document.getElementById("nomeJogador2").value || "Jogador 2";

  if (nomeJogador1.toLowerCase() === nomeJogador2.toLowerCase()) {
    alert(
      "Os nomes dos jogadores não podem ser iguais. Por favor, escolha nomes diferentes."
    );
    return;
  }

  document.getElementById(
    "jogador1"
  ).innerHTML = `${nomeJogador1} <span class="x">(X)</span>`;
  document.getElementById(
    "jogador2"
  ).innerHTML = `${nomeJogador2} <span class="o">(O)</span>`;

  jogadorAtual = "X";
  document.getElementById("modalNomes").style.display = "none";
  jogoAtivo = true;
  atualizarVez();
}

function trocaJogador() {
  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
  atualizarVez();
}

function atualizarVez() {
  const vezDe = jogadorAtual === "X" ? nomeJogador1 : nomeJogador2;
  document.getElementById("vez").innerText = `Vez de: ${vezDe}`;
}

function clicouCelula(celula, index) {
  if (celula.innerText === "" && jogoAtivo) {
    celula.innerText = jogadorAtual;
    celula.classList.add(jogadorAtual.toLowerCase());
    verificaVitoriaOuEmpate();
  }
}

function verificaVitoriaOuEmpate() {
  if (verificaVitoria()) {
    finalizaJogo(true);
  } else if (verificaEmpate()) {
    finalizaJogo(false);
  } else {
    trocaJogador();
  }
}

function verificaVitoria() {
  for (let i = 0; i < combinacoesVitoria.length; i++) {
    const [a, b, c] = combinacoesVitoria[i];
    const celulaA = document.getElementsByClassName("celula")[a].innerText;
    const celulaB = document.getElementsByClassName("celula")[b].innerText;
    const celulaC = document.getElementsByClassName("celula")[c].innerText;

    if (celulaA && celulaA === celulaB && celulaB === celulaC) {
      return true;
    }
  }
  return false;
}

function verificaEmpate() {
  for (const celula of document.getElementsByClassName("celula")) {
    if (celula.innerText === "") {
      return false;
    }
  }
  return true;
}

function trocaJogador() {
  jogadorAtual = jogadorAtual === "X" ? "O" : "X";
  atualizarVez();
}

function finalizaJogo(venceu) {
  let mensagem = venceu
    ? `Jogador ${jogadorAtual === "X" ? nomeJogador1 : nomeJogador2} venceu!`
    : "Deu VELHA!";
  document.getElementById("textoVitoria").innerText = mensagem;
  document.getElementById("mensagemVitoria").style.display = "flex";
  jogoAtivo = false;
}

function reiniciaJogo() {
  jogoAtivo = true;
  jogadorAtual = "X";
  for (const celula of document.getElementsByClassName("celula")) {
    celula.innerText = "";
    celula.classList.remove("x", "o");
  }
  document.getElementById("mensagemVitoria").style.display = "none";
  atualizarVez();
}

window.onclick = function (event) {
  if (event.target == document.getElementById("modalNomes")) {
    fecharModal();
  }
};
