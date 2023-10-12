const ruleModal = document.querySelector(".rule-modal");
const RuleBtn = document.querySelector(".rules");
const body = document.querySelector("body");
const RestartBtn = document.querySelector(".restart");
const System = document.querySelector(".system");
const Score = document.querySelector(".score");
const Comment = document.querySelector(".comment");
const Result = document.querySelector(".result");
const MyChoice = document.querySelector(".my-choice");
const GameContainer = document.querySelector(".game-container");
const Step1 = document.querySelector(".step1");
const Step2 = document.querySelector(".step2");
const input = document.querySelectorAll(".checker-box");
const Rock = document.querySelector("#rock");
const Paper = document.querySelector("#paper");
const Scissors = document.querySelector("#scissors");
const CancelRule = document.querySelector(".cancel");

RuleBtn.addEventListener("click", () => {
  ruleModal.classList.add("display");
  body.classList.add("over-lay");
});

CancelRule.addEventListener("click", () => {
  ruleModal.classList.remove("display");
  body.classList.remove("over-lay");
});

Paper.addEventListener("click", (e) => {
  ChoiceMade(e.target);
});
Rock.addEventListener("click", (e) => {
  ChoiceMade(e.target);
});
Scissors.addEventListener("click", (e) => {
  ChoiceMade(e.target);
});

function ChoiceMade(checkered) {
  uncheck();
  if (!Paper.checked && !Rock.checked && !Scissors.checked) {
    return;
  }
  if (Rock === checkered) {
    Rock.checked = true;
    Paper.checked = false;
    Scissors.checked = false;
  }

  if (Paper === checkered) {
    Rock.checked = false;
    Paper.checked = true;
    Scissors.checked = false;
  }

  if (Scissors === checkered) {
    Rock.checked = false;
    Paper.checked = false;
    Scissors.checked = true;
  }

  setTimeout(() => LoadNext(), 1000);
}

function LoadNext() {
  Step1.classList.add("alive");
  Step2.classList.remove("alive");
  GameContainer.classList.add("step2height");
  GenerateChoice();
}

const ArrSystem = [
  {
    src: "images/icon-rock.svg",
    alt: "Rock",
  },
  {
    src: "images/icon-paper.svg",
    alt: "Paper",
  },
  {
    src: "images/icon-scissors.svg",
    alt: "Scissors",
  },
];

function GenerateChoice() {
  MyChoice.innerHTML = ``;
  if (Scissors.checked) {
    MyChoice.classList.add("scissors");

    MyChoice.innerHTML = `
 <div class="whited">
  <img src="${ArrSystem[2].src}" alt="${ArrSystem[2].alt}">
</div>
    `;
  }
  if (Paper.checked) {
    MyChoice.classList.add("paper");
    MyChoice.innerHTML = `
  <div class="whited">
  <img src="${ArrSystem[1].src}" alt="${ArrSystem[1].alt}">
</div>
    
    `;
  }
  if (Rock.checked) {
    MyChoice.classList.add("rock");
    MyChoice.innerHTML = `
        <div class="whited">
  <img src="${ArrSystem[0].src}" alt="${ArrSystem[0].alt}">
</div>
    
    `;
  }
  setTimeout(() => GenerateRandom(), 5000);
}

function GenerateRandom() {
  System.innerHTML = ``;
  System.classList.remove("rock");
  System.classList.remove("paper");
  System.classList.remove("scissors");
  const X = Math.floor(Math.random() * (4 - 1) + 1);
  if (X === 1) {
    System.innerHTML = `
 <div class="whited">
  <img src="${ArrSystem[X - 1].src}" alt="${ArrSystem[X - 1].alt}">
</div>
    `;
    System.classList.add("rock");
  }
  if (X === 2) {
    System.innerHTML = `
 <div class="whited">
  <img src="${ArrSystem[X - 1].src}" alt="${ArrSystem[X - 1].alt}">
</div>
    `;
    System.classList.add("paper");
  }
  if (X === 3) {
    System.innerHTML = `
 <div class="whited">
  <img src="${ArrSystem[X - 1].src}" alt="${ArrSystem[X - 1].alt}">
</div>
    `;
    System.classList.add("scissors");
  }
  setTimeout(() => IncreaseScore(), 10);
}
let CurrentScore = 0;

function IncreaseScore() {
  //Draws

  if (System.classList.contains("paper") && Paper.checked) {
    Result.classList.add("loser");
    Comment.innerText = `It's a draw`;
  }

  if (System.classList.contains("scissors") && Scissors.checked) {
    Result.classList.add("loser");
    Comment.innerText = `It's a draw`;
  }

  if (System.classList.contains("rock") && Rock.checked) {
    Result.classList.add("loser");
    Comment.innerText = `It's a draw`;
  }

  //lOSER'S SITE

  if (
    System.classList.contains("paper") &&
    !Paper.checked &&
    !Scissors.checked &&
    Rock.checked
  ) {
    Result.classList.add("loser");
    Comment.innerText = `You lose`;
  }

  if (
    System.classList.contains("scissors") &&
    !Rock.checked &&
    !Scissors.checked &&
    Paper.checked
  ) {
    Result.classList.add("loser");
    Comment.innerText = `You lose`;
  }
  if (
    System.classList.contains("rock") &&
    !Paper.checked &&
    !Rock.checked &&
    Scissors.checked
  ) {
    Result.classList.add("loser");
    Comment.innerText = `You lose`;
  }

  //winners site
  // if(Winners() < parseInt(Score.innerText)) console.log('less')
  Score.innerText = Winners();
  // console.log(Winners());
}

function Winners() {
  if (
    System.classList.contains("rock") &&
    !Rock.checked &&
    !Scissors.checked &&
    Paper.checked
  ) {
    Result.classList.add("loser");
    Comment.innerText = `You Win`;
    CurrentScore++;
    RestartBtn.style.color = '#14942e'
  }
  if (
    System.classList.contains("paper") &&
    !Paper.checked &&
    !Rock.checked &&
    Scissors.checked
  ) {
    Result.classList.add("loser");
    Comment.innerText = `You Win`;
    CurrentScore++;
    RestartBtn.style.color = '#14942e'
  }

  if (
    System.classList.contains("scissors") &&
    !Scissors.checked &&
    !Paper.checked &&
    Rock.checked
  ) {
    Result.classList.add("loser");
    Comment.innerText = `You Win`;
    CurrentScore++;
    RestartBtn.style.color = '#14942e'
  }
  return CurrentScore;
}

RestartBtn.addEventListener("click", () => Restart());

function Restart() {
  Step1.classList.remove("alive");
  Step2.classList.add("alive");
  GameContainer.classList.remove("step2height");
  Result.classList.remove("loser");

  RemoveChoice();
  RemoveRandom();
  input.forEach((inputed, indx) =>
    input[indx].removeEventListener("click", (e) => ChoiceMade(e.target))
  );
}
function uncheck() {
  input.forEach((input) => (input.checked = false));
}
input.forEach((input) =>
  input.addEventListener("dblclick", (e) => {
    return;
  })
);

function RemoveChoice() {
  if (Scissors.checked) {
    MyChoice.classList.remove("scissors");

    MyChoice.innerHTML = ``;
  }
  if (Paper.checked) {
    MyChoice.classList.remove("paper");
    MyChoice.innerHTML = ``;
  }
  if (Rock.checked) {
    MyChoice.classList.remove("rock");
    MyChoice.innerHTML = ``;
  }
}

function RemoveRandom() {
  System.innerHTML = ``;

  System.classList.remove("rock");
  System.classList.remove("paper");
  System.classList.remove("scissors");
}
