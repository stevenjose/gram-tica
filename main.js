// ==========================================
// CONTROL DE VERSIÓN (v1.1)
// ==========================================
const APP_VERSION = "1.1";

document.getElementById("page-title").textContent =
  `Grammar Lab v${APP_VERSION} - Guía It is vs They are`;
document.getElementById("version-badge-text").textContent = `v${APP_VERSION}`;

// ==========================================
// BANCO DE PREGUNTAS (4 OPCIONES)
// ==========================================
const questionBank = [
  {
    q: "A monkey is funny. ___ a long tail.",
    options: ["It is", "It has got", "They are", "They have got"],
    correct: 1,
    hint: "Hablamos de un solo mono ('A monkey') y de lo que tiene ('a long tail'). Usamos 'It has got'.",
  },
  {
    q: "Crocodiles live in rivers. ___ dangerous and big.",
    options: ["It is", "They are", "It has got", "They have got"],
    correct: 1,
    hint: "'Crocodiles' es plural y describe cómo son (adjetivos). Corresponde 'They are'.",
  },
  {
    q: "Snakes are long animals. They ___ got legs.",
    options: ["hasn't", "haven't", "isn't", "aren't"],
    correct: 1,
    hint: "Sujeto 'They' (plural) con 'got' requiere la negación 'haven't'.",
  },
  {
    q: "An elephant is huge. ___ big ears.",
    options: ["They have got", "It has got", "It is", "They are"],
    correct: 1,
    hint: "'An elephant' es singular y tiene orejas grandes: 'It has got'.",
  },
  {
    q: "Tigers are very fast. ___ orange and black.",
    options: ["They are", "It is", "They have got", "It has got"],
    correct: 0,
    hint: "'Tigers' es plural y los colores son adjetivos descriptivos: 'They are'.",
  },
  {
    q: "Monkeys are agile. ___ can climb tall trees.",
    options: ["They", "It", "They are", "It is"],
    correct: 0,
    hint: "Delante del verbo 'can' solo ponemos el pronombre 'They', nunca 'They are can'.",
  },
  {
    q: "A crocodile swims well, but it ___ got wings.",
    options: ["isn't", "hasn't", "haven't", "can't"],
    correct: 1,
    hint: "Para 'it' con 'got' (no tener), usamos 'hasn't'.",
  },
  {
    q: "A frog lives in ponds. ___ small and green.",
    options: ["It is", "They are", "It has got", "They have got"],
    correct: 0,
    hint: "'A frog' es singular y describe su tamaño y color: 'It is'.",
  },
  {
    q: "Parrots are beautiful birds. ___ can fly and talk.",
    options: ["It", "They are", "They", "It is"],
    correct: 2,
    hint: "'Parrots' es plural; delante de la acción 'can fly' usamos solo 'They'.",
  },
  {
    q: "Elephants are heavy. They ___ got wings.",
    options: ["hasn't", "haven't", "can't", "isn't"],
    correct: 1,
    hint: "'They' en plural con 'got' utiliza la negación 'haven't'.",
  },
  {
    q: "Sharks are strong swimmers. ___ sharp teeth.",
    options: ["They have got", "It has got", "They are", "It is"],
    correct: 0,
    hint: "'Sharks' es plural y habla de lo que tienen (dientes): 'They have got'.",
  },
  {
    q: "A snake hasn't got legs, but ___ very fast.",
    options: ["they are", "it is", "it has got", "they have got"],
    correct: 1,
    hint: "Hablamos de 'A snake' (singular) describiendo cómo es: 'it is'.",
  },
];

let labScore = 0;
let currentPool = [];

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function loadRandomChallenge() {
  if (currentPool.length === 0) {
    currentPool = shuffleArray([...questionBank]);
  }

  const ch = currentPool.pop();
  document.getElementById("challenge-text").textContent = ch.q;
  document.getElementById("lab-feedback").textContent = "";

  const grid = document.getElementById("options-container");
  grid.innerHTML = "";

  ch.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "opt-btn";
    btn.textContent = opt;
    btn.onclick = () => checkLabAnswer(idx, ch.correct, ch.hint);
    grid.appendChild(btn);
  });
}

function checkLabAnswer(selected, correct, hint) {
  const fb = document.getElementById("lab-feedback");
  if (selected === correct) {
    labScore += 10;
    document.getElementById("lab-score").textContent = labScore;
    fb.style.color = "#4ade80";
    fb.textContent = "🎉 ¡Correcto! Cargando siguiente reto...";

    document.querySelectorAll(".opt-btn").forEach((b) => (b.disabled = true));

    setTimeout(() => {
      loadRandomChallenge();
    }, 1400);
  } else {
    fb.style.color = "#f87171";
    fb.textContent = `❌ Revisa bien: ${hint}`;
  }
}

// Iniciar mini-examen
loadRandomChallenge();
