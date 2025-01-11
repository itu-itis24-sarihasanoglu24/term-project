const word = "ADIEU"; 
let score = 0;
let lives = 3;

const cardsContainer = document.getElementById('cards');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const heartsContainer = document.getElementById('hearts');
const guessInput = document.getElementById('guess');
const submitGuessButton = document.getElementById('submitGuess');
const resetGameButton = document.getElementById('resetGame');

// Oyunu başlat
function initializeGame() {
    score = 0;
    lives = 3;
    scoreDisplay.textContent = score;
    livesDisplay.textContent = lives;

    updateHearts();

    cardsContainer.innerHTML = '';
    for (const letter of word) {
        const card = document.createElement('div');
        card.className = 'card hidden';
        card.dataset.letter = letter;

        const svgImg = document.createElement('img');
        svgImg.src = `${letter}.svg`; 
        svgImg.alt = letter;

        card.appendChild(svgImg);
        cardsContainer.appendChild(card);
    }
}


function updateHearts() {
    heartsContainer.innerHTML = '';
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.textContent = '❤️'; 
        heartsContainer.appendChild(heart);
    }
}

function submitGuess() {
    const guess = guessInput.value.toUpperCase();
    guessInput.value = '';

    if (guess.length === 1) {
        // Harf tahmini
        let correct = false;
        document.querySelectorAll('.card').forEach(card => {
            if (card.dataset.letter === guess) {
                card.querySelector('img').style.display = 'block'; 
                card.classList.remove('hidden');
                correct = true;
            }
        });

        if (correct) {
            score += 20;
            scoreDisplay.textContent = score;
            checkWin();
        } else {
            loseLife();
        }
    } else if (guess === word) {
        score += 100;
        scoreDisplay.textContent = score;
        alert('You won!');
        resetGame();
    } else {
        alert('Wrong guess! You lost!');
        resetGame();
    }
}

function loseLife() {
    lives--;
    livesDisplay.textContent = lives;
    updateHearts();
    if (lives === 0) {
        alert('You lost!');
        resetGame();
    }
}

function checkWin() {
    const revealedCards = document.querySelectorAll('.card:not(.hidden)').length;
    if (revealedCards === word.length) {
        alert('You won!');
        resetGame();
    }
}

function resetGame() {
    initializeGame();
}


submitGuessButton.addEventListener('click', submitGuess);
resetGameButton.addEventListener('click', resetGame);


initializeGame();
