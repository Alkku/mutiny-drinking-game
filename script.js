//--------------------- SPLASH SCREENS LOGIC -------------------------------

//--------------------- GAME LOGIC STARTS HERE -------------------------

//Variable list
const card = document.querySelector(".drinking-card");
const cardfront = document.querySelector(".front-face");
const cardback = document.querySelector(".back-face");
const crewScore_span = document.getElementById("crew-score"); //Använd dessa för att uppdatera score i html
const captScore_span = document.getElementById("capt-score");



selectNumberFromArray = function() {
  const arrayNumber = Math.floor(Math.random()*5) //Antalet kort är 5
  return arrayNumber;
}

addCrewScore = function() {
  this.crewScore += 5000;
  crewScore_span.innerHTML = this.crewScore;
  return this.crewScore;
}

addCaptScore = function() {}

newCard = function() {
  setTimeout(function(){card.classList.toggle('newCard');}, 2000);
  setTimeout(selectNumberFromArray, 2000);
}

flipCardIfFront = function() {
  card.classList.toggle('newCard');
  card.classList.toggle('flip');
  return addCrewScore();
}

discardCardIfBack = function() {
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);
  newCard();
}

gameStart = function(){
  this.isMutinyRound = false;
  this.crewScore = 0;
  this.captScore = 0;
  this.scoreToWin = 10000;
  this.playerNameArray = ['Asta', 'Markus', 'Saida'];
}

gameLoop = function() {  //Game loop
  gameStart();
        if (this.crewScore < this.scoreToWin){
          newCard();
          cardfront.addEventListener('click', flipCardIfFront);
          cardback.addEventListener('click', discardCardIfBack);
          console.log(this.crewScore);
        }
}


gameLoop();
