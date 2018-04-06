/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


/*
coding challenge 1 - player loses his entire score when ho rolls two 6's in a row .
coding challenge 2 - winingScore added to take input from the user to set a new WINNING SCORE
*/

var scores, roundScore, activePlayer, gamePlaying, winingScore, prevDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

    if (gamePlaying) {
        // 1. Random number

        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result

        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        // challenge 1 - if the user roles 2 consecutive 6's

        if (prevDice === 6 && dice === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }

        // 3. Update the score IF rolled number is NOT a 1
        else if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
        prevDice = dice;

    }

});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if the player won the game
        if (scores[activePlayer] >= winingScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
            // Next Player
            nextPlayer();
        }
    }

});


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    prevDice = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    winingScore = document.querySelector('.winningScore').value;
}

// coding challenge 2 - set winning score from user
document.querySelector('.btn-setScore').addEventListener('click', function() {
    winingScore = document.querySelector('.winningScore').value;
    if (winingScore) {
        document.querySelector('.winningScore').value = winingScore;
    } else {
        document.querySelector('.winningScore').value = 50;
    }
});