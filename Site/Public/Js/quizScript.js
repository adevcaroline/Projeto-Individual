document.addEventListener("DOMContentLoaded", () => {
  const questionText = document.getElementById("question-text");
  const optionList = document.getElementById("option-list");
  const nextBtn = document.getElementById("next-btn");

  let currentQuestion = 0;
  let selected = false;
  let housePoints = {
    grifinoria: 0,
    sonserina: 0,
    corvinal: 0,
    lufalufa: 0
  };

  function showQuestion(index) {
    const q = questions[index];
    questionText.textContent = q.question;
    optionList.innerHTML = "";
    selected = false;

    q.options.forEach((opt, i) => {
      const div = document.createElement("div");
      div.textContent = opt.text;
      div.dataset.house = opt.house;
      div.addEventListener("click", () => {
        if (selected) return;
        selected = true;
        housePoints[opt.house]++;
        div.classList.add("selected");
        Array.from(optionList.children).forEach(child => child.classList.add("disabled"));
      });
      optionList.appendChild(div);
    });
  }

  nextBtn.addEventListener("click", () => {
    if (!selected) return;
    currentQuestion++;
    if (currentQuestion < questions.length) {
      showQuestion(currentQuestion);
    } else {
      showResult();
    }
  });

  function showResult() {
    const container = document.querySelector(".container");
    const quizBox = document.querySelector(".quiz_box");
    quizBox.innerHTML = "";

    const result = Object.entries(housePoints).sort((a, b) => b[1] - a[1])[0][0];
    const capitalized = result.charAt(0).toUpperCase() + result.slice(1);

     const houseImages = {
     grifinoria: "assets/grifinoria.png",
    sonserina: "assets/sonserina.png",
    corvinal: "assets/corvinal.png",
    lufalufa: "assets/lufa-removebg-preview.png"
};

    quizBox.innerHTML = `
      <h2>Parabéns!</h2>
      <p>Você foi selecionado para a <strong>${capitalized}</strong>!</p>
      <img src="${houseImages[result]}" alt="${capitalized}">
      <button class="restart-btn" onclick="location.reload()">Reiniciar Quiz</button>
    `;
  }

  showQuestion(currentQuestion);
});
