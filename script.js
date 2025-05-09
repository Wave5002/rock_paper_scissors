const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const choices = document.querySelectorAll('.choice-img');
const playerChoiceSpan = document.getElementById('player-choice');
const computerChoiceSpan = document.getElementById('computer-choice');
const winnerMessage = document.getElementById('winner-message');
const playerScoreSpan = document.getElementById('player-score');
const computerScoreSpan = document.getElementById('computer-score');
const finalMessage = document.getElementById('final-message');
const gameOverMessage = document.getElementById('game-over-message');

let playerScore = 0;
let computerScore = 0;
let gameOver = false;

startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

choices.forEach(img => {
    img.addEventListener('click', () => {
        if (gameOver) return; // stop if game is over

        const playerChoice = img.getAttribute('data-choice');
        const computerChoice = getComputerChoice();
        const result = getWinner(playerChoice, computerChoice);

        playerChoiceSpan.textContent = capitalize(playerChoice);
        computerChoiceSpan.textContent = capitalize(computerChoice);

        winnerMessage.textContent = result.message;
        winnerMessage.className = result.class;

        if (result.status === 'win') {
            playerScore++;
        } else if (result.status === 'lose') {
            computerScore++;
        }

        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;

        checkGameOver();
    });
});

restartBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    gameOver = false;
    playerScoreSpan.textContent = 0;
    computerScoreSpan.textContent = 0;
    winnerMessage.textContent = '';
    playerChoiceSpan.textContent = '-';
    computerChoiceSpan.textContent = '-';
    finalMessage.classList.add('hidden');
});

function getComputerChoice() {
    const options = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function getWinner(player, computer) {
    if (player === computer) {
        return { message: "It's a Draw!", class: 'draw', status: 'draw' };
    }
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return { message: 'You Win this Round! 🎉', class: 'win', status: 'win' };
    } else {
        return { message: 'You Lose this Round! 😢', class: 'lose', status: 'lose' };
    }
}

function checkGameOver() {
    if (playerScore === 5) {
        gameOver = true;
        gameOverMessage.textContent = '🎉 You WON the game!';
        finalMessage.classList.remove('hidden');
    } else if (computerScore === 5) {
        gameOver = true;
        gameOverMessage.textContent = '😢 You LOST the game!';
        finalMessage.classList.remove('hidden');
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
