//--------------------- API TO TRIVIA GAME HERE -------------------------------

//--------------------- GAME LOGIC STARTS HERE --------------------------------
//Variable list
var cardList = [["QUESTION CARD !</br>❓<br/>Player gets a random trivia question.", 6],
                ["MUTINY !</br>⚔️</br>There is a mutiny on-board the ship. For the remainder of this round, the captain is countered with every card.", 1],
                ["BIG WAVE !</br>🌊<br/></br>Waterfall (lägg ett frågetecken så man vet va de e) starts from the Captain and continues in order: (array of players). Deducts points from random players that were near drowning. YIKES!", 1],
                ["COUNTER CARD !</br>❌</br>Player gets to counter a captain\'s card.", 2],
                ["DRINK CARD !", 8]];

var mutinyRound = ["QUESTION CARD !<br/>The Captain gets a random trivia question.",
                  "DRINK CARD !"];

var questionCard = [];

const nameSplash = document.querySelector(".crew-member-names");
const endSplash = document.querySelector(".end-game-screen");
const startFirstGameButton = document.getElementById("start-game-button");
const startSecondGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
let card = document.querySelector(".drinking-card");
const cardfront = document.querySelector(".front-face");
const cardback = document.querySelector(".back-face");
const crewScore_span = document.getElementById("crew-score"); //Använd dessa för att uppdatera score i html
const captScore_span = document.getElementById("capt-score");
var playerNameArray = [];
var crewNamesInArray = [];
var firstGame = true;

//Functions below
inputNamesArray = function() { //This function takes the input of given names on splash screen
    var inputText = document.getElementById("crew-member-name").value;
    playerNameArray.push(inputText); //Antalet spelare enligt hur mycke läggs in i arrayen
    document.getElementById("crew-member-name").value = ''; //reset value to '' of input text field
    document.getElementById("all-players").innerHTML = playerNameArray.length;
    //Gör ännu conditions här med if-statements för när ska accepteras med röd färg o annan font: inte tom, inte dubblett, måste vara minst 2 spelare -> de här måst kodas annanstans.
    var createPara = document.createElement('p');
    var insertInputText = document.createTextNode(inputText);
    createPara.setAttribute("id", playerNameArray.length);
    createPara.appendChild(insertInputText);
    document.getElementById("add-player-names").appendChild(createPara);
}


chooseFirstCaptain = function() { //This function chooses the first captain for first round
    var randomNumber = Math.floor(Math.random() * playerNameArray.length+1);
    var captainInArrayNumber = randomNumber;
    document.getElementById("display-captain").innerHTML = document.getElementById(randomNumber).innerHTML;
}


chooseCaptain = function() { //This function chooses the captain for rest of the rounds based on crew member with lowest score
    var previousCaptain = document.getElementById("display-captain").innerHTML;
    var possibleCaptains = [];

    for (i=0; i < crewNamesInArray.length; i++) {
      var fetchName = crewNamesInArray[i];
      var idsScore = document.getElementById(fetchName).innerHTML;
      var twoElementArray = [parseInt(idsScore), fetchName];
      possibleCaptains.push(twoElementArray);
    }

    var sortedPossibleCaptains = possibleCaptains.sort();
    var newCaptain = sortedPossibleCaptains[0];

    document.getElementById("display-captain").innerHTML = newCaptain[1];
    document.getElementById("display-next-captain").innerHTML = newCaptain[1];
    crewNamesInArray.filter(function(e) { return e !== document.getElementById("display-captain").innerHTML });
    document.getElementById("display-crew-members").innerHTML = "";
}


chooseCrewMembers = function() { //This function chooses crew members based on players list
    var crewNameArray = playerNameArray;
    crewNamesInArray = crewNameArray.filter(function(e) { return e !== document.getElementById("display-captain").innerHTML })
    crewNamesInArray.push();

    for (i=0; i < crewNamesInArray.length; i++) {
        var createParaForCM = document.createElement('p');
        var insertFromArray = document.createTextNode(crewNamesInArray[i]);
        createParaForCM.setAttribute("id", i+1);
        createParaForCM.appendChild(insertFromArray);
        document.getElementById("display-crew-members").appendChild(createParaForCM);

        var createSpanForCM = document.createElement('span');
        var setScoreToZero = document.createTextNode("0");
        createSpanForCM.setAttribute("id", crewNamesInArray[i]);
        createSpanForCM.appendChild(setScoreToZero);
        document.getElementById("display-crew-members").appendChild(createSpanForCM);
    }
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
  window.firstGame = false;
});

restartGameButton.addEventListener('click', () => {
  removeEndSplash();
  gameStart();
  gameLoop();
});



selectCardToShow = function() {
  let out = [];
  for (let i = 0; i < cardList.length; ++i) {
      for (let j = 0; j < cardList[i][1]; ++j) {
          out.push(cardList[i][0]);
      }
  }

  var pickedCard = out[Math.floor(Math.random() * out.length)];
  var firstPart = "🍻</br>Take ";
  var secondPart = " sips of your drink."
  var oneSip = "🍻</br>Take one sip of your drink."

  if (pickedCard == "DRINK CARD !"){ // gör span för drink card o random sip amount
    amountOfSips = Math.floor(Math.random() * 10)+1;
    var newSentence = firstPart + amountOfSips + secondPart;

    if (amountOfSips == 1){
      document.getElementById("card-content").innerHTML = oneSip;
    } else {
      document.getElementById("card-content").innerHTML = newSentence;
    }

  } else {
    document.getElementById("card-content").innerHTML = pickedCard;
  }
}

//questionCard = function() {
//  const arrayNumber = Math.floor(Math.random()*5) //Antalet kort är 5
//  return arrayNumber;
//} KAN DEN RETURNA VÄRDE? Vilket kort som ges?

counterCard = function() {
}

//Kan man ha scoring rakt inne i kortet? Typ kalla via

//kan man kalla på korten rakt inne i selectCardToShow?


//Behövs desssa om scoring sker via kortens funktioner rakt?/

//All player score functions below

addCrewTotalScore = function() {
  var whoseTurn = document.getElementById("crew-members-turn").innerHTML;
  var currentScore = document.getElementById(whoseTurn).innerHTML;
  var newPoints = 500;
  var newCurrentScore = parseInt(currentScore) + newPoints; //lägg att kommer ur funktion
  document.getElementById(whoseTurn).innerHTML = newCurrentScore;

  this.crewTotScore += newPoints;
  crewScore_span.innerHTML = this.crewTotScore;

  return this.crewTotScore;
}

addCaptScore = function() {
  this.captScore += 1000;
  captScore_span.innerHTML = this.captScore;

  return this.captScore;
}

//addCrewMemberScore


//Turn-related functions below
totalTurns = function() {
  this.turns += 1;
  document.getElementById("turns").innerHTML = this.turns;
  return this.turns;
}

playersTurn = function(decidePlayerTurn) { //This function decides the player turn
  turnDecided = decidePlayerTurn % (playerNameArray.length-1);

  if (turnDecided == 0) {
    turnDecided = playerNameArray.length-1;
  }

  playerInTurn = crewNamesInArray[turnDecided-1];
  document.getElementById("crew-members-turn").innerHTML = playerInTurn;
}



//Game/card loop functions below
newCard = function() {
  var isPlayerTurns = totalTurns();
  playersTurn(isPlayerTurns);
  setTimeout(selectCardToShow, 2000);

  setTimeout(function(){card.classList.toggle('newCard');}, 2000);

}

flipCardIfFront = function() {
  card.classList.toggle('newCard');
  card.classList.toggle('flip');
  addCrewTotalScore(crewTotScore);
  addCaptScore(captScore);
  //Lägg här att använda COUNTER KORT funktionen

}

discardCardIfBack = function() {
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);

  newCard();


  if (captScore >= 1500) {
    var captainWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC A P T A I N&nbsp&nbsp&nbspW I N S ! 🦜";
    var crewLosesString = "Everyone in the crew must finish up the drinks they are holding."
    document.getElementById("winning-side").innerHTML = captainWinsString;
    document.getElementById("losing-side").innerHTML = crewLosesString;
    gameEnd();

  } else if (crewTotScore >= 1500) {
    var crewWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC R E W&nbsp&nbsp&nbspW I N S ! 🏴‍☠️";
    var captainLosesString = "The captain has to finish up the drink he/she is holding.";
    document.getElementById("winning-side").innerHTML = crewWinsString;
    document.getElementById("losing-side").innerHTML = captainLosesString;
    gameEnd();
  }
}


//Game start/Game end/Game loop functions below
gameStart = function(){
  console.log(firstGame);
  if (firstGame == true){
    chooseFirstCaptain();
    chooseCrewMembers();
}
  //this.isMutinyRound = false;
  crewScore_span.innerHTML = 0;
  captScore_span.innerHTML = 0;

  turns.innerHTML = 0;
  this.crewTotScore = 0;
  this.captScore = 0;
  this.turns = 0;
}

gameEnd = function(){

  card.classList.toggle('newCard');
  chooseCaptain();
  chooseCrewMembers();
  setTimeout(function(){endSplash.classList.toggle('addSplash');}, 1000);
  //var crewNamesInArray = [];
}

gameLoop = function() {  //Game loop
          newCard();
          cardfront.addEventListener('click', flipCardIfFront);
          cardback.addEventListener('click', discardCardIfBack);
}
