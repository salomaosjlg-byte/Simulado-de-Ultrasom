const questions = [
  {
    category: 'Anatomia',
    text: 'Qual estrutura é melhor visualizada no ultrassom abdominal em corte longitudinal como uma estrutura anecoica tubular?',
    options: ['Aorta abdominal', 'Vesícula biliar', 'Rim direito', 'Intestino delgado'],
    correctIndex: 1,
    explanation: 'A vesícula biliar aparece como uma estrutura anecóica, arredondada e tubular em corte longitudinal, com conteúdo líquido claro.'
  },
  {
    category: 'Técnica',
    text: 'Em um exame obstétrico, qual janela é normalmente utilizada para melhor visualização do feto no primeiro trimestre?',
    options: ['Transvaginal', 'Transabdominal anterior', 'Transretal', 'Intercostal'],
    correctIndex: 0,
    explanation: 'A via transvaginal oferece melhor resolução na primeira gestação e é a escolha para avaliar embrião e saco gestacional precocemente.'
  },
  {
    category: 'Interpretação',
    text: 'Qual achado é mais compatível com cálculo vesicular na ultrassonografia?',
    options: ['Estrutura hiperecoica com sombra acústica posterior', 'Lesão hiperecogênica sem sombreamento', 'Estrutura anecóica sem reflexos', 'Massa homogênea com fluxos coloridos'],
    correctIndex: 0,
    explanation: 'O cálculo vesicular geralmente é hiperecoico e produz sombra acústica posterior, sendo um sinal clássico de litíase.'
  },
  {
    category: 'Vascular',
    text: 'Qual artéria é avaliada por Doppler para investigação de resistência vascular em gestação?',
    options: ['Artéria renal', 'Artéria uterina', 'Artéria tibial posterior', 'Artéria subclávia'],
    correctIndex: 1,
    explanation: 'A artéria uterina é frequentemente avaliada em obstetrícia para analisar resistência vascular e perfusão placentária.'
  },
  {
    category: 'Abdome',
    text: 'O exame de fígado por ultrassom geralmente mostra a veia porta como uma estrutura:',
    options: ['Hiperecoica com sombra acústica', 'Anecóica com fluxo em Doppler', 'Hipoecogênica com contornos irregulares', 'Calcificada de bordas nítidas'],
    correctIndex: 1,
    explanation: 'A veia porta é vista como estrutura anecóica, tubular e com fluxo detectável em Doppler, especialmente em corte longitudinal.'
  },
  {
    category: 'Tireoide',
    text: 'Qual sinal sugere nódulo tireoidiano suspeito em ultrassonografia?',
    options: ['Formato regular e bordas bem definidas', 'Cápsula fina e homogênea', 'Microcalcificações internas e bordas irregulares', 'Estrutura totalmente anecóica e uniforme'],
    correctIndex: 2,
    explanation: 'Microcalcificações internas, bordas irregulares e vascularização central são achados que elevam a suspeita de malignidade.'
  },
  {
    category: 'Músculo Esquelético',
    text: 'Ao avaliar tendão, o achado de imagem mais esperado em tendinopatia é:',
    options: ['Aumento da ecogenicidade homogênea', 'Dispersão de fibras com aumento de espessura e hipocogenicidade', 'Padrão anecóico tubular', 'Sombra acústica intensa'],
    correctIndex: 1,
    explanation: 'Tendinopatia pode produzir tendão espessado, heterogêneo e hipoecogênico, com alteração na arquitetura normal.'
  },
  {
    category: 'Pediatria',
    text: 'Qual estrutura é frequentemente avaliada em recém-nascidos para pesquisa de hidrocefalia?',
    options: ['Plexo coroide', 'Ventrículos cerebrais', 'Cavidade uterina', 'Pâncreas'],
    correctIndex: 1,
    explanation: 'A avaliação dos ventrículos cerebrais por ultrassom em recém-nascidos é útil para rastrear hidrocefalia e dilatação ventricular.'
  },
  {
    category: 'Mamas',
    text: 'Em ultrassonografia das mamas, a lesão sólida com contornos irregulares e vascularização central é mais sugestiva de:',
    options: ['Cisto simples', 'Fibroadenoma', 'Lesão maligna', 'Mastite'],
    correctIndex: 2,
    explanation: 'Lesões sólidas com bordas irregulares, vascularização central e ecogenicidade heterogênea têm maior suspeita para malignidade.'
  },
  {
    category: 'Geral',
    text: 'Qual é a principal vantagem do ultrassom em relação a outros exames de imagem?',
    options: ['Alta resolução de tecido ósseo', 'Ausência de radiação ionizante', 'Melhor para imagens de pulmão', 'Permite apenas avaliação anatômica'],
    correctIndex: 1,
    explanation: 'O ultrassom é uma modalidade segura e dinâmica, sem uso de radiação ionizante, sendo amplamente aplicado em exames de órgãos moles.'
  }
];

const state = {
  currentIndex: 0,
  score: 0,
  answers: [],
  timer: 30,
  timerId: null,
  totalQuestions: questions.length
};

const introPanel = document.getElementById('intro-panel');
const quizPanel = document.getElementById('quiz-panel');
const resultsPanel = document.getElementById('results-panel');
const questionCategory = document.getElementById('question-category');
const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers');
const timerEl = document.getElementById('timer');
const progressLabel = document.getElementById('progress-label');
const progressFill = document.getElementById('progress-fill');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const tryAgainBtn = document.getElementById('try-again-btn');
const resultBadge = document.getElementById('result-badge');
const resultTitle = document.getElementById('result-title');
const scoreValue = document.getElementById('score-value');
const correctCount = document.getElementById('correct-count');
const wrongCount = document.getElementById('wrong-count');
const totalQuestions = document.getElementById('total-questions');
const resultMessage = document.getElementById('result-message');

function startTimer() {
  clearInterval(state.timerId);
  state.timer = 30;
  timerEl.textContent = String(state.timer);

  state.timerId = setInterval(() => {
    state.timer -= 1;
    timerEl.textContent = String(state.timer);

    if (state.timer <= 0) {
      clearInterval(state.timerId);
      handleAnswer(-1, true);
    }
  }, 1000);
}

function updateProgress() {
  const progress = ((state.currentIndex + 1) / state.totalQuestions) * 100;
  progressFill.style.width = `${progress}%`;
  progressLabel.textContent = `Questão ${state.currentIndex + 1} de ${state.totalQuestions}`;
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  questionCategory.textContent = question.category;
  questionText.textContent = question.text;
  answersContainer.innerHTML = '';
  feedbackEl.classList.add('hidden');
  feedbackEl.innerHTML = '';
  nextBtn.classList.add('hidden');

  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => handleAnswer(index, false));
    answersContainer.appendChild(button);
  });

  updateProgress();
  startTimer();
}

function handleAnswer(selectedIndex, timedOut = false) {
  const question = questions[state.currentIndex];
  const buttons = [...answersContainer.querySelectorAll('.option-btn')];

  clearInterval(state.timerId);

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) {
      button.classList.add('correct');
    }
    if (index === selectedIndex && index !== question.correctIndex) {
      button.classList.add('wrong');
    }
  });

  const isCorrect = selectedIndex === question.correctIndex;
  if (isCorrect && !timedOut) {
    state.score += 1;
  }

  state.answers[state.currentIndex] = {
    correct: isCorrect,
    selectedIndex
  };

  const status = isCorrect ? 'Correto!' : timedOut ? 'Tempo esgotado!' : 'Incorreto.';
  feedbackEl.innerHTML = `<strong>${status}</strong> ${question.explanation}`;
  feedbackEl.classList.remove('hidden');

  if (state.currentIndex < state.totalQuestions - 1) {
    nextBtn.classList.remove('hidden');
  } else {
    nextBtn.textContent = 'Ver resultado';
    nextBtn.classList.remove('hidden');
  }
}

function goToNext() {
  if (state.currentIndex < state.totalQuestions - 1) {
    state.currentIndex += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  introPanel.classList.add('hidden');
  quizPanel.classList.add('hidden');
  resultsPanel.classList.remove('hidden');

  const correct = state.answers.filter((answer) => answer && answer.correct).length;
  const wrong = state.answers.filter((answer) => answer && !answer.correct).length;
  const percent = Math.round((correct / state.totalQuestions) * 100);

  scoreValue.textContent = `${percent}%`;
  correctCount.textContent = String(correct);
  wrongCount.textContent = String(wrong);
  totalQuestions.textContent = String(state.totalQuestions);
  resultBadge.textContent = percent >= 70 ? 'Excelente' : percent >= 50 ? 'Bom' : 'Estude mais';
  resultTitle.textContent = percent >= 70 ? 'Você está bem preparado!' : percent >= 50 ? 'Você está no caminho!' : 'Continue reforçando os conceitos';

  if (percent >= 80) {
    resultMessage.textContent = 'Ótimo desempenho. Você dominou a maioria dos temas essenciais de ultrassonografia.';
  } else if (percent >= 60) {
    resultMessage.textContent = 'Bom resultado. Revise os pontos mais difíceis e fortaleça sua interpretação dos exames.';
  } else {
    resultMessage.textContent = 'Há espaço para melhorar. Refaça o simulado e foque nos temas mais recorrentes.';
  }

  const ring = document.querySelector('.score-ring');
  ring.style.background = `conic-gradient(var(--primary) ${percent * 3.6}deg, rgba(255,255,255,0.06) 0deg)`;
}

function startQuiz() {
  state.currentIndex = 0;
  state.score = 0;
  state.answers = Array(state.totalQuestions).fill(null);
  nextBtn.textContent = 'Próxima';
  introPanel.classList.add('hidden');
  quizPanel.classList.remove('hidden');
  resultsPanel.classList.add('hidden');
  renderQuestion();
}

function restartQuiz() {
  clearInterval(state.timerId);
  introPanel.classList.remove('hidden');
  quizPanel.classList.add('hidden');
  resultsPanel.classList.add('hidden');
  nextBtn.classList.add('hidden');
  feedbackEl.classList.add('hidden');
  resultBadge.textContent = 'Resultado';
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', goToNext);
restartBtn.addEventListener('click', restartQuiz);
tryAgainBtn.addEventListener('click', startQuiz);
