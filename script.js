// ==========================
// GK Question Bank
// ==========================
const questionBank = [
  {
    question: "What is the capital of Australia?",
    answers: ["Sydney", "Canberra", "Melbourne", "Perth"],
    correct: "Canberra"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Venus", "Jupiter"],
    correct: "Mars"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["Shakespeare", "Tolkien", "Dickens", "Homer"],
    correct: "Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "O2", "CO2", "HO"],
    correct: "H2O"
  },
  {
    question: "How many continents are there?",
    answers: ["5", "6", "7", "8"],
    correct: "7"
  },
  {
    question: "Which is the largest mammal?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    correct: "Blue Whale"
  },
  {
    question: "Which country invented tea?",
    answers: ["India", "China", "Japan", "England"],
    correct: "China"
  },
  {
    question: "Who discovered gravity?",
    answers: ["Newton", "Einstein", "Galileo", "Tesla"],
    correct: "Newton"
  },
  {
    question: "What is the tallest mountain?",
    answers: ["K2", "Everest", "Makalu", "Kanchenjunga"],
    correct: "Everest"
  },
  {
    question: "Which gas do plants absorb?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    correct: "Carbon Dioxide"
  }
];

// ==========================
// DOM Elements
// ==========================
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const questionCount = document.getElementById("question-count");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

// ==========================
// Quiz State Variables
// ==========================
let currentQuestionIndex = 0;
let score = 0;
let quizQuestions = []; // will hold random 5 questions
function startQuiz() {
  // Randomly pick 5 questions
  quizQuestions = questionBank.sort(() => 0.5 - Math.random()).slice(0, 5);
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.style.display = "none";
  restartBtn.style.display = "none";
  feedback.textContent = "";
  showQuestion();
}

function showQuestion() {
  resetState();

  const current = quizQuestions[currentQuestionIndex];
  questionElement.textContent = current.question;
  questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

  current.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer, current.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  feedback.textContent = "";
  answerButtons.innerHTML = "";
}

function selectAnswer(selected, correct) {
  const allButtons = document.querySelectorAll(".btn");

  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.style.backgroundColor = "#28a745"; // green for correct
    } else if (btn.textContent === selected) {
      btn.style.backgroundColor = "#dc3545"; // red for wrong
    }
  });

  if (selected === correct) {
    score++;
    feedback.textContent = "✅ Correct!";
  } else {
    feedback.textContent = "❌ Wrong!";
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionElement.textContent = `🎉 You scored ${score} out of ${quizQuestions.length}!`;
  questionCount.textContent = "";
  answerButtons.innerHTML = "";
  feedback.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", startQuiz);

// Auto start quiz on page load
startQuiz();
