document.addEventListener("DOMContentLoaded", function () {
  const questionText = document.getElementById("question-text");
  const optionList = document.getElementById("option-list");
  const nextBtn = document.getElementById("next-btn");
  const quizBox = document.querySelector(".quiz_box");
  const resultadoDiv = document.getElementById("resultadoQuiz");
  const nomeCasaSpan = document.getElementById("nomeCasa");
  const descricaoCasaP = document.getElementById("descricaoCasa");

  const casas = ["grifinoria", "sonserina", "corvinal", "lufalufa"];
  const points = [0, 0, 0, 0]; 

  let current = 0;
  let selected = false;

  function reiniciarQuiz() {
    current = 0;
    selected = false;
    for (let i = 0; i < points.length; i++) {
      points[i] = 0;
    }
    iniciarQuiz();
  }

  const btnReiniciar = document.getElementById("reiniciarQuiz");
  btnReiniciar.addEventListener("click", reiniciarQuiz);

  function showQuestion() {
    const q = questions[current];
    questionText.textContent = q.question;
    optionList.innerHTML = "";
    selected = false;

    q.options.forEach(function (opt) {
      const div = document.createElement("div");
      div.textContent = opt.text;
      div.classList.add("option");
      div.onclick = function () {
        if (selected) {
          return;
        }

        selected = true;
        const index = casas.indexOf(opt.house);
        if (index !== -1) {
          points[index]++;
        }
        div.classList.add("selected");
        Array.from(optionList.children).forEach(function (c) {
          c.classList.add("disabled");
        });
      };
      optionList.appendChild(div);
    });
  }

  function showResult() {
    quizBox.style.display = "none";
    resultadoDiv.style.display = "block";

    const maxIndex = points.indexOf(Math.max(...points));
    const topHouse = casas[maxIndex];
    const name = topHouse.charAt(0).toUpperCase() + topHouse.slice(1);

    nomeCasaSpan.textContent = name;

    const descricoes = {
      grifinoria: "Você é corajoso, destemido e leal.",
      sonserina: "Você é ambicioso, astuto e determinado.",
      corvinal: "Você é inteligente, criativo e sábio.",
      lufalufa: "Você é justo, trabalhador e amigável."
    };
    descricaoCasaP.textContent = descricoes[topHouse] || "";
  }

  function finalizarQuiz() {
    const maxIndex = points.indexOf(Math.max(...points));
    const topHouse = casas[maxIndex];

    const casaMap = {
      grifinoria: 1,
      sonserina: 2,
      corvinal: 3,
      lufalufa: 4
    };

    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const idUsuario = usuario?.idusuario;
    const idCasa = casaMap[topHouse];

    fetch("/usuarios/registrar-casa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idUsuario, idCasa })
    }).then(function (res) {
      if (!res.ok) {
        console.error("Erro ao registrar a casa no banco de dados.");
      }
      showResult();
    }).catch(function (err) {
      console.error("Erro ao registrar a casa:", err);
      showResult();
    });
  }

  function iniciarQuiz() {
    quizBox.style.display = "block";
    resultadoDiv.style.display = "none";
    showQuestion();

    nextBtn.onclick = function () {
      if (!selected) {
        alert("Por favor, selecione uma opção antes de continuar.");
        return;
      }
      current++;
      if (current < questions.length) {
        showQuestion();
      } else {
        finalizarQuiz();
      }
    };
  }

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  if (!usuario || !usuario.idusuario) {
    alert("Você precisa estar logado para acessar o quiz!");
    window.location.href = "./login.html";
    return;
  }

  fetch("http://localhost:3333/usuarios/casa/" + usuario.idusuario)
    .then(function (res) {
      if (res.status === 204) {
        iniciarQuiz();
        return null;
      }
      return res.json();
    })
    .then(function (data) {
      if (data) {
        quizBox.style.display = "none";
        resultadoDiv.style.display = "block";
        nomeCasaSpan.textContent = data.nomeCasa || "";
        descricaoCasaP.textContent = data.descricao || "";
      }
    })
    .catch(function (err) {
      console.error("Erro ao buscar casa do usuário:", err);
      iniciarQuiz();
    });
});
