const gamemode = document.getElementById("gamemode");
const pOne = document.getElementById("player-one");
const pTwo = document.getElementById("player-two");
const pOneChoices = document.querySelector("#player-one tbody")
const pTwoChoices = document.querySelector("#player-two tbody")
const pOneScore = document.getElementById("score-player-one");
const pTwoScore = document.getElementById("score-player-two");
const pOneChoice = document.getElementById("choice-player-one");
const pTwoChoice = document.getElementById("choice-player-two");
const playerOneName = document.getElementById("player-one-name");
const playerTwoName = document.getElementById("player-two-name");
const result = document.getElementById("result");

const choicesArr = ["pOne", "pTwo"];
let pOneCurrentScore = 0;
let pTwoCurrentScore = 0;
let currentGamemode;
let playerTwo;
let playerOne;

const imgSrcObj = {
    rock: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296854_640.png",
    paper: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296855_1280.png", 
    scissor: "https://cdn.pixabay.com/photo/2014/03/25/15/26/rock-paper-scissors-296853_1280.png"
}

//Game Functions
const startGame = () => {
    currentGamemode = gamemode.value;
    if(currentGamemode === "computer"){
        playerTwo = "Computer";
        playerOne = "You"
    } else {
        playerTwo = "Player 2"
        playerOne = "Player 1"
    }
    playerTwoName.innerText = playerTwo;
    playerOneName.innerText = playerOne;
    playerTurn(pOne);
};

const playerTurn = (player) => {
    gamemode.value = currentGamemode;
    player.style.border = "1px solid darkslateblue";
    if(player === pOne) {
        pOneChoices.classList.remove("hidden");
    } else {
        pTwoChoices.classList.remove("hidden");
    }
};

const pOneChooseOption = (el) => {
    choicesArr[0] = el;
    const choice = imgSrcObj[el];
    pOneChoice.innerHTML = `<img src="${choice}">`;
    pOneChoices.classList.add("hidden");
    pOne.style.border = "none";
    
    if (currentGamemode === "two-players") {
        playerTurn(pTwo);
    } else {
        computersChoice();
    }
}

const pTwoChooseOption = (el) => {
    choicesArr[1] = el;
    const choice = imgSrcObj[el];
    pTwoChoice.innerHTML = `<img src="${choice}">`;
    pTwoChoices.classList.add("hidden");
    pTwo.style.border = "none";
    checkGame();
}

const computersChoice = () => {
    setTimeout(() => {
    const choiceArr = ["rock", "paper", "scissor"];
    const el = choiceArr[(Math.floor(Math.random()*3))];
    choicesArr[1] = el;
    const choice = imgSrcObj[el];
    pTwoChoice.innerHTML = `<img src="${choice}">`;
    checkGame();}, 500)
};

const checkGame = () => {
    pTwoChoice.classList.remove("hidden");
    pOneChoice.classList.remove("hidden");

    let message;
    const choicesString = choicesArr.slice().toString();

    if(choicesArr[0] === choicesArr[1]) {
       message = "It's a draw!";
    } else if (["paper,rock", "rock,scissor", "scissor,paper"].includes(choicesString)) {
        message = `<strong>${choicesArr[0]} beats ${choicesArr[1]}!</strong><br> ${playerOne} wins this round.`;
        pOneCurrentScore++;
    } else {
        message = `<strong>${choicesArr[1]} beats ${choicesArr[0]}!</strong><br> ${playerTwo} wins this round.`;
        pTwoCurrentScore++;
    }

    setTimeout(() => {result.classList.remove("hidden")}, 2000);
    result.firstChild.innerHTML = message;
    displayScore();

    if(pOneCurrentScore === 3) {
        thereIsAWinner(playerOne);
        return
    } else if (pTwoCurrentScore === 3) {
        thereIsAWinner(playerTwo);
        return
    }
    result.lastChild.addEventListener("click", nextRound)
}

const displayScore = () => {
    pOneScore.innerHTML = pOneCurrentScore;
    pTwoScore.innerHTML = pTwoCurrentScore;
}

const thereIsAWinner = (winner) => {
    setTimeout(() => {
        result.firstChild.innerHTML = `<strong>${winner} wins the game !</strong>`;
        result.lastChild.innerText = "Reset Game";
        result.lastChild.addEventListener("click", () => {
            resetGame();
            result.lastChild.innerText = "Next Round"})
    }, 3000);
};

const nextRound = () => {
    result.classList.add("hidden"); 
    pTwoChoice.classList.add("hidden");
    pOneChoice.classList.add("hidden");
    playerTurn(pOne);
    pOne.style.border = "1px solid darkslateblue";
};

const resetGame = () => {
    pOneCurrentScore = 0;
    pTwoCurrentScore = 0;
    displayScore();
    pOneChoice.innerHTML = "";
    pTwoChoice.innerHTML = "";
    pOne.style.border = "none";
    pTwo.style.border = "none";
    pOneChoices.classList.add("hidden");
    pTwoChoices.classList.add("hidden");
    result.classList.add("hidden");
    playerTwoName.innerText = "Player 2";
    playerOneName.innerText = "Player 1";

}

document.querySelector("h2").addEventListener("click", () => {
    document.querySelector("div").classList.toggle("hidden");
})
