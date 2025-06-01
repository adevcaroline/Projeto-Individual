document.addEventListener("DOMContentLoaded", () => {
  const questionText = document.getElementById("question-text");
  const optionList = document.getElementById("option-list");
  const nextBtn = document.getElementById("next-btn");
  const quizBox = document.querySelector(".quiz_box");
  const resultadoDiv = document.getElementById("resultadoQuiz");
  const nomeCasaSpan = document.getElementById("nomeCasa");
  const descricaoCasaP = document.getElementById("descricaoCasa");
  const points = { grifinoria: 0, sonserina: 0, corvinal: 0, lufalufa: 0 };
  let current = 0;
  let selected = false;

  const reiniciarQuiz = () => {
    current = 0;
    selected = false;
    for (let casa in points) points[casa] = 0;
    iniciarQuiz();
  };

  const btnReiniciar = document.getElementById("reiniciarQuiz");
  btnReiniciar.addEventListener("click", reiniciarQuiz);
  
  const images = {
    grifinoria: "assets/grifinoria.png",
    sonserina: "assets/sonserina.png",
    corvinal: "assets/corvinal.png",
    lufalufa: "assets/lufa-removebg-preview.png"
  };

  const showQuestion = () => {
    const q = questions[current];
    questionText.textContent = q.question;
    optionList.innerHTML = "";
    selected = false;

    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.textContent = opt.text;
      div.classList.add("option");
      div.onclick = () => {
        if (selected) return;
        selected = true;
        points[opt.house]++;
        div.classList.add("selected");
        [...optionList.children].forEach(c => c.classList.add("disabled"));
      };
      optionList.appendChild(div);
    });
  };

  const showResult = () => {
    quizBox.style.display = "none";
    resultadoDiv.style.display = "block";

    const topHouse = Object.entries(points).sort((a, b) => b[1] - a[1])[0][0];
    const name = topHouse.charAt(0).toUpperCase() + topHouse.slice(1);

    nomeCasaSpan.textContent = name;

    const descricoes = {
      grifinoria: "Você é corajoso, destemido e leal.",
      sonserina: "Você é ambicioso, astuto e determinado.",
      corvinal: "Você é inteligente, criativo e sábio.",
      lufalufa: "Você é justo, trabalhador e amigável."
    };
    descricaoCasaP.textContent = descricoes[topHouse] || "";
  };

  const finalizarQuiz = () => {
    const topHouse = Object.entries(points).sort((a, b) => b[1] - a[1])[0][0];
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
    }).then(res => {
      if (!res.ok) {
        console.error("Erro ao registrar a casa no banco de dados.");
      }
      showResult();
    }).catch(err => {
      console.error("Erro ao registrar a casa:", err);
      showResult();
    });
  };

  const iniciarQuiz = () => {
    quizBox.style.display = "block";
    resultadoDiv.style.display = "none";
    showQuestion();

    nextBtn.onclick = () => {
      if (!selected) return;
      current++;
      current < questions.length ? showQuestion() : finalizarQuiz();
    };
  };

  const usuario = JSON.parse(sessionStorage.getItem("usuario"));
  if (!usuario || !usuario.idusuario) {
    alert("Você precisa estar logado para acessar o quiz!");
    window.location.href = "./login.html";
    return;
  }

  fetch(`http://localhost:3333/usuarios/casa/${usuario.idusuario}`)
    .then(res => {
      if (res.status === 204) {
        iniciarQuiz();
        return null;
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        quizBox.style.display = "none";
        resultadoDiv.style.display = "block";
        nomeCasaSpan.textContent = data.nomeCasa || "";
        descricaoCasaP.textContent = data.descricao || "";
      }
    })
    .catch(err => {
      console.error("Erro ao buscar casa do usuário:", err);
      iniciarQuiz();
    });
});
