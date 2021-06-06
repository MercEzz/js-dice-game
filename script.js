'use strict';

// Selecting elements 
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;


const init = function () {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    dice.classList.add('hidden');
}
init();

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

//Rolling dice functionality
btnRoll.addEventListener('click', function() {
    if(playing) {
    // Generating a random number.
    const dicenum = Math.trunc(Math.random() * 6) + 1;
    console.log(dicenum);
    // Display dice
    dice.classList.remove('hidden');
    dice.src = `dice-${dicenum}.png`;

    // Check for rolled if !, switch to next player
    if(dicenum !== 1) {
        //Add dice to the current score
        currentScore += dicenum;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next plaayer
        switchPlayer();
    }
}
});

btnHold.addEventListener('click', function () {
    if(playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    // Check if player's score is >= 100
    if(scores[activePlayer] >= 100) {
        dice.classList.add('hidden');
        //Finish the game
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
        //Switch to the next player
        switchPlayer();
    }
}
});

btnNew.addEventListener('click', init);