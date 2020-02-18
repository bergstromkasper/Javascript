// Visar regler i modal när sidan laddas.
window.onload = function ruleMessage() {
  document.getElementById("headerModal").innerHTML = "Grisspelet";
  document.getElementById("ruleMessage").style.display = "block";
  toggleModal();
};

// Klass Player som håller vilken spelare, totalScore och currentScore
class Player {
  constructor(playerName, currentScore, totalScore) {
    this.playerName = playerName;
    this.totalScore = totalScore;
    this.currentScore = currentScore;
  }
}
// 2 spelare
const player0 = new Player(0, 0, 0);
const player1 = new Player(1, 0, 0);
//Sätter start spelare till 0.
var activePlayer = 0;
var winScore;
//
//
//        NYTT SPEL
//
//
//
// om "nytt spel" klickas.
document.getElementById("btn-new").addEventListener("click", game);
function game() {
  //Startar nytt spel, tar in poäng för att vinna, resettar scores
  winScore = document.getElementById("winScore").value;
  // RESET
  player0.currentScore = 0;
  player0.totalScore = 0;
  player1.currentScore = 0;
  player1.totalScore = 0;
  //winscore till default 100 (eller spelarsatta värdet)
  if (winScore == "" || winScore == 0) {
    winScore = 100;
  }
  document.getElementById("winScore").value = winScore;
  scoreDisplay();
  //Börjag med player0 vid nytt spel.
  document.getElementById("player0-panel").classList = "player-0-panel active";
  document.getElementById("player1-panel").classList = "player-1-panel";
  activePlayer = 0;
  // -----------------------------------------------
}
//
//
//            HTML
//
//
//
// Sätter CurrentScore och Totalscore i html till player värde
function scoreDisplay() {
  document.getElementById("score-0").innerHTML = player0.currentScore;
  document.getElementById("score-1").innerHTML = player1.currentScore;
  document.getElementById("current-0").innerHTML = player0.totalScore;
  document.getElementById("current-1").innerHTML = player1.totalScore;
}
//
//
//
//          SLÅ TÄRNING
//
//
// När spelaren klickar på "Slå tärning"
document.getElementById("rollDice").addEventListener("click", newRound);
function newRound() {
  rollDice(activePlayer);
}
// Variable som håller vad tärningen slog sist
var lastDice1 = 0;
var lastDice2 = 0;
function rollDice(player) {
  var currPlayer;
  var doc;
  var victoryMessageName;
  if (player == 0) {
    currPlayer = player0;
    doc = document.getElementById("score-0");
    victoryMessageName = "1";
  } else {
    currPlayer = player1;
    doc = document.getElementById("score-1");
    victoryMessageName = "2";
  }
  var dice1 = diceNumber();
  var dice2 = diceNumber();

  diceDisplay(dice1, dice2);
  function diceDisplay(d1, d2) {
    var dice1ID = document.getElementById("dice-1");
    var dice2ID = document.getElementById("dice-2");
    dice1ID.src = "img/dice-" + d1 + ".png";
    dice2ID.src = "img/dice-" + d2 + ".png";
  }
  // "Kastar" tärningarna
  function diceNumber() {
    return Math.floor(Math.random() * 6 + 1);
  }

  // Testar resultat av tärningslagen
  if (
    // Om någon av tärningarna slår 6 två gånger i rad.
    (lastDice1 == 6 && dice1 == 6) ||
    (lastDice1 == 6 && dice2 == 6) ||
    (lastDice2 == 6 && dice1 == 6) ||
    (lastDice2 == 6 && dice2 == 6)
  ) {
    // resetta score totalt
    currPlayer.currentScore = 0;
    currPlayer.totalScore = 0;
    endRound();
  } else if (dice1 == 1 || dice2 == 1) {
    // Annars om någon av tärninga slår 1 så resetta rundans poäng
    currPlayer.currentScore = 0;
    endRound();
  } else {
    // Lägger till dice poäng till currentScore
    //Sparar tärningskast i lastDice
    lastDice1 = dice1;
    lastDice2 = dice2;
    currPlayer.currentScore = currPlayer.currentScore + dice1 + dice2;
    doc.innerHTML = currPlayer.currentScore;

    // Om currentScore + totalScore är mer eller lika med vinst poäng vinner spelaren
    if (currPlayer.currentScore + currPlayer.totalScore >= winScore) {
      //Tar bort reglerna ur modalen
      document.getElementById("ruleMessage").style.display = "none";
      // 'togglar' modalen
      var modal = document.querySelector(".modal");
      modal.classList.toggle("show-modal");
      // ändrar medalandet till att visa vinnaren
      document.getElementById("headerModal").innerHTML = "Grattis!";
      document.getElementById("modalMessage").innerHTML =
        "Spelare " + victoryMessageName + " vann!";
      document.getElementById("modalCloseButton").innerHTML =
        "Tryck på 'x' för att spela igen.";
    }
  }
}
//
//
//
//
//
// MODAL FÖR ATT VINNA
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");
function toggleModal() {
  //Stänger modalen och startar nytt spel
  modal.classList.toggle("show-modal");
  game();
}
// kollar om "X" är tryckt på modalen.
function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);
//----------------------------------------------
//
//
//            HÅLL POÄNG
//
//
//
// Slutar en runda genom att räkna poäng och lägga till totalScore. Ändrar också active player
document.getElementById("endRound").addEventListener("click", endRound);
function endRound() {
  //Reset lastDice för nästa spelare
  lastDice1 = 0;
  lastDice2 = 0;

  if (activePlayer == 0) {
    player0.totalScore = player0.currentScore + player0.totalScore;
    player0.currentScore = 0;
    activePlayer = 1;
    document.getElementById("player1-panel").classList =
      "player-1-panel active";
    document.getElementById("player0-panel").classList = "player-0-panel";
    scoreDisplay();
  } else {
    player1.totalScore = player1.currentScore + player1.totalScore;
    player1.currentScore = 0;
    activePlayer = 0;
    document.getElementById("player0-panel").classList =
      "player-0-panel active";
    document.getElementById("player1-panel").classList = "player-1-panel";
    scoreDisplay();
  }
}
