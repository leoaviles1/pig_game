var scores, roundScore, activePlayer, gamePlaying, winScore, min, max, lastWinner;
//grab min & max from input attributes and clear the board
min = document.querySelector(".win-score").getAttribute("min");
max = document.querySelector(".win-score").getAttribute("max");
lastWinner = 0; //this var keeps track of the last winner
clearBoard();

//Event Listener for new button
document.querySelector(".btn-new").addEventListener("click", newGame);

//Event Listener for roll button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1st step: Generate two random dice numbers
    var dice0 = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    //2nd step: Display result
    document.querySelector(".dice0").style.display = "block";
    document.querySelector(".dice1").style.display = "block";
    document.querySelector(".dice0").src = "dice-" + dice0 + ".png";
    document.querySelector(".dice1").src = "dice-" + dice1 + ".png";

    //3rd step: Update round score if the rolled number was not 1
    if (dice0 !== 1 && dice1 !== 1) {
      //Player looses his ENTIRE GLOBAL score when he rolls two 6 in a row
      if (dice0 == 6 && dice1 == 6) {
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
        return;
      }

      //Add the dice total to CURRENT score
      roundScore += dice0 + dice1;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      //If player rolled a 1, it is the other player's turn
      nextPlayer();
    }
  }
});

//Event Listener for hold button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //if game is still on, add player CURRENT score to ROUND score
    scores[activePlayer] += roundScore;

    //Update this player's ROUND score in the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    if (scores[activePlayer] >= winScore) {
      document.getElementById("name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice0").style.display = "none";
      document.querySelector(".dice1").style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.toggle("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
      lastWinner = activePlayer;
    } else {
      //If not, switch players
      nextPlayer();
    }
  }
});

//Event Listener for Click here button
document.querySelector(".btn-here").addEventListener("click", function() {
  document.querySelector(".instructions").style.display = "block";
});

//Event Listener for Close button
document.querySelector(".btn-close").addEventListener("click", function() {
  document.querySelector(".instructions").style.display = "none";
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice0").style.display = "none";
  document.querySelector(".dice1").style.display = "none";
}

function newGame() {
  winScore = document.querySelector(".win-score").value;

  if (parseFloat(winScore) >= parseFloat(min) && parseFloat(winScore) <= parseFloat(max)) {
    clearBoard();
    scores = [0, 0];
    roundScore = 0;
    activePlayer = lastWinner;
    gamePlaying = true;

    if (lastWinner == 0) {
      document.querySelector(".player-0-panel").classList.add("active");
    } else {
      document.querySelector(".player-1-panel").classList.add("active");
    }
  } else {
    alert("Number it not between " + min + " or " + max);
  }
}

function clearBoard() {
  document.querySelector(".dice0").style.display = "none";
  document.querySelector(".dice1").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
}
