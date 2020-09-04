//--------------------- SPLASH SCREENS LOGIC -------------------------------

//--------------------- GAME LOGIC STARTS HERE -------------------------

const nameSplash = document.querySelector(".crew-member-names");
const endSplash = document.querySelector(".end-game-screen");
const startFirstGameButton = document.getElementById("start-game-button");
const startSecondGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
var playerNameArray = [];

pushData = function() {
    var inputText = document.getElementById("crew-member-name").value;
    playerNameArray.push(inputText);
    console.log(playerNameArray);
    document.getElementById("crew-member-name").value = '';
}

removeLastSplash = function() {
    nameSplash.classList.toggle('removeSplash');
}

removeEndSplash = function() {
    endSplash.classList.toggle('addSplash');
}

startFirstGameButton.addEventListener('click', () => {
  removeLastSplash();
  gameStart();
  gameLoop();
});

restartGameButton.addEventListener('click', () => {
  removeEndSplash();
  gameStart();
  gameLoop();
});


//Variable list
let card = document.querySelector(".drinking-card");
const cardfront = document.querySelector(".front-face");
const cardback = document.querySelector(".back-face");
const crewScore_span = document.getElementById("crew-score"); //Använd dessa för att uppdatera score i html
const captScore_span = document.getElementById("capt-score");


//selectNumberFromArray = function() {
//  const arrayNumber = Math.floor(Math.random()*5) //Antalet kort är 5
//  return arrayNumber;
//}


addCrewScore = function() {
  this.crewScore += 5000;
  crewScore_span.innerHTML = this.crewScore;
  console.log(this.crewScore);
  return this.crewScore;
}

addCaptScore = function() {
this.captScore += 5000;
captScore_span.innerHTML = this.captScore;
console.log(this.captScore);
return this.captScore;
}


newCard = function() {
  setTimeout(function(){card.classList.toggle('newCard');}, 2000);
  //setTimeout(selectNumberFromArray, 2000);
}

flipCardIfFront = function() {
  card.classList.toggle('newCard');
  card.classList.toggle('flip');
}

discardCardIfBack = function() {
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);
  newCard();
  addCrewScore(crewScore);
  addCaptScore(captScore);
  console.log(crewScore + captScore);
  if (crewScore > 10000) {
    gameEnd();
  }
}

gameStart = function(){
  crewScore_span.innerHTML = 0;
  captScore_span.innerHTML = 0;
  this.isMutinyRound = false;
  this.crewScore = 0;
  this.captScore = 0;
  this.scoreToWin = 10000;
  this.playerNameArray = ['Asta', 'Markus', 'Saida'];
}

gameEnd = function(){
  setTimeout(function(){endSplash.classList.toggle('addSplash');}, 1500);
  card.classList.toggle('newCard');
}

gameLoop = function() {  //Game loop
          newCard();
          cardfront.addEventListener('click', flipCardIfFront);
          cardback.addEventListener('click', discardCardIfBack);
}
