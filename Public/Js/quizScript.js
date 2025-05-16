document.addEventListener("DOMContentLoaded", () => {
  const questionText = document.getElementById("question-text");
  const optionList = document.getElementById("option-list");
  const nextBtn = document.getElementById("next-btn");

  let current = 0;
  let selected = false;
  const points = { grifinoria: 0, sonserina: 0, corvinal: 0, lufalufa: 0 };

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
    const quizBox = document.querySelector(".quiz_box");
    quizBox.innerHTML = "";

    const topHouse = Object.entries(points).sort((a, b) => b[1] - a[1])[0][0];
    const name = topHouse.charAt(0).toUpperCase() + topHouse.slice(1);

    quizBox.innerHTML = `
      <h2>Parabéns!</h2>
      <p>Você foi selecionado para a <strong>${name}</strong>!</p>
      <img src="${images[topHouse]}" alt="${name}">
      <button class="restart-btn" onclick="location.reload()">Reiniciar Quiz</button>
    `;
  };

  nextBtn.onclick = () => {
    if (!selected) return;
    current++;
    current < questions.length ? showQuestion() : showResult();
  };

  showQuestion();
});