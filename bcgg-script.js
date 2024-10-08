/// Sample database of Bible characters and clues
const characters = [
    {
        name: "Moses",
        clue1: "This person led the Israelites out of Egypt.",
        clue2: "He received the Ten Commandments on Mount Sinai.",
        clue3: "He parted the Red Sea."
    },
    {
        name: "David",
        clue1: "This person was a shepherd boy who became king.",
        clue2: "He defeated Goliath with a sling and a stone.",
        clue3: "He wrote many of the Psalms."
    },
    {
        name: "Esther",
        clue1: "This queen saved her people by risking her life before the king.",
	clue2: "She was a Jewish queen in the Persian Empire.",
        clue3: "Her story is celebrated during the festival of Purim."
    },
    {
        name: "Abraham",
        clue1: "This person was called by God to leave his homeland.",
        clue2: "He is considered the father of many nations.",
        clue3: "He was willing to sacrifice his son Isaac."
    }
];

let currentCharacterIndex = 0;
let currentClueIndex = 0;
let score = 0;

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', restartGame);
document.getElementById('next-clue').addEventListener('click', nextClue);

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    resetGame();
    showClue(currentClueIndex);
    showChoices();
}

function resetGame() {
    currentCharacterIndex = 0;
    currentClueIndex = 0;
    score = 0;
    document.getElementById('quest-feedback').textContent = '';
    clearChoices();
    document.getElementById('quest-clue1').display = "block";
    document.getElementById('quest-clue2').display = "block";
    document.getElementById('quest-clue3').display = "block";

}

function showClue(n){
    switch(n) { 
       case 1: 
          document.getElementById('game-clue1').display = "none";
          break;
       case 2: 
          document.getElementById('game-clue2').display = "none";
          break;
       case 3: 
          document.getElementById('game-clue1').display = "none";
    }
}


function nextClue() {
    currentClueIndex++;
    if (currentClueIndex <= 3) {
        showClue(currentClueIndex);
    } else {
        currentClueIndex = 0;
        currentCharacterIndex++;
        if (currentCharacterIndex < characters.length) {
            resetGame();  // Proceed to the next character
        } else {
            endGame();  // End the game if no more characters
        }
    }
}


function showChoices() {
    const correctAnswer = characters[currentCharacterIndex].name;
    const allAnswers = getRandomChoices(correctAnswer);
    const choicesContainer = document.getElementById('quest-choices'); 
    
    clearChoices();

    allAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => submitGuess(answer));
        choicesContainer.appendChild(button);
    });
}


function getRandomChoices(correctAnswer) {
    const answers = characters.map(character => character.name);
    const randomChoices = [correctAnswer];

    document.getElementById('quest-clue1').textContent = character.clue1;
    document.getElementById('quest-clue2').textContent = character.clue2;
    document.getElementById('quest-clue3').textContent = character.clue3;
    while (randomChoices.length < 4) {
        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
        if (!randomChoices.includes(randomAnswer)) {
            randomChoices.push(randomAnswer);
        }
    }

    // Shuffle the array to randomize the choices
    return randomChoices.sort(() => Math.random() - 0.5);
}

function submitGuess(selectedAnswer) {
    const correctAnswer = characters[currentCharacterIndex].name;

    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById('quest-feedback').textContent = 'Correct!';
    } else {
        document.getElementById('quest-feedback').textContent = `Incorrect! The correct answer was ${correctAnswer}.`;
    }

    // Move to the next clue or character
    //currentClueIndex++;

    setTimeout(() => {
        if (currentClueIndex < 3) {  // There are 3 clues
            showClue(currentClueIndex);
        } else {
            currentCharacterIndex++;
            currentClueIndex = 0;
            if (currentCharacterIndex < characters.length) {
                resetGame();
            } else {
                endGame();
            }
        }
    }, 1000);
}

function clearChoices() {
    const choicesContainer = document.getElementById('quest-choices');
    choicesContainer.innerHTML = '';
}

function endGame() {
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Your score: ${score}`;
}

function restartGame() {
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}
