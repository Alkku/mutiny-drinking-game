//--------------------- SPLASH SCREENS LOGIC -------------------------------

//--------------------- GAME LOGIC STARTS HERE -----------------------------
//Variable list
var cardList = [["QUESTION CARD !<br/>Player gets a random pirate-related question.", 2],
                ["MUTINY !</br>There is a mutiny on board the ship. For the entire remainder of the round, the captain is countered with every card.", 1],
                ["WATERFALL !<br/></br>Everybody finishes their drink one at a time starting from the captain. Deducts points from random players that were near drowning. YIKES!", 1],
                ["COUNTER CARD !</br>Player gets to counter a captain\'s card.", 2],
                ["DRINK CARD !", 4]];

var mutinyRound = ["QUESTION CARD !<br/>Player gets a random pirate-related question.",
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
    console.log(randomNumber);
    document.getElementById("display-captain").innerHTML = document.getElementById(randomNumber).innerHTML;
}


chooseCaptain = function() { //This function chooses the captain for rest of the rounds based on crew member with lowest score
//Måst uppdateras baserat på filteredArray i chooseCrewMembers
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
  var firstPart = "Take ";
  var secondPart = " sips of your drink."
  var oneSip = "Take one sip of your drink."

  if (pickedCard == "DRINK CARD !"){ // gör span för drink card o random sip amount
    var img = document.createElement('img');
    img.setAttribute('src', "images/pirate_swords.png");
    document.getElementById("card-content").appendChild(img);

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
  //document.getElementById("card-content").innerHTML = generateCard;

  //om drink card => gör en string där du ändrar den. o sen random number av 12


//questionCard = function() {
//  const arrayNumber = Math.floor(Math.random()*5) //Antalet kort är 5
//  return arrayNumber;
//} KAN DEN RETURNA VÄRDE? Vilket kort som ges?

counterCard = function() {
}

//Kan man ha scoring rakt inne i kortet? Typ kalla via

//kan man kalla på korten rakt inne i selectCardToShow?


//Behövs desssa om scoring sker via kortens funktioner rakt?
addCrewScore = function() {
  this.crewScore += 1000;
  crewScore_span.innerHTML = this.crewScore;
  console.log(this.crewScore);
  return this.crewScore;
}

addCaptScore = function() {
  this.captScore += 1000;
  captScore_span.innerHTML = this.captScore;
  console.log(this.captScore);
  return this.captScore;
}





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




newCard = function() {
  var isPlayerTurns = totalTurns();
  playersTurn(isPlayerTurns);
  setTimeout(selectCardToShow, 2000);

  setTimeout(function(){card.classList.toggle('newCard');}, 2000);

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
  if (crewScore > 10000 || captScore > 10000) {
    gameEnd();
  }
}

//Losing team downs rest of drink


gameStart = function(){
  //if firstRound = then first captain
  chooseFirstCaptain();
  chooseCrewMembers();
  //this.isMutinyRound = false;
  crewScore_span.innerHTML = 0;
  captScore_span.innerHTML = 0;
  turns.innerHTML = 0;
  this.crewScore = 0;
  this.captScore = 0;
  this.turns = 0;
}

gameEnd = function(){
  setTimeout(function(){endSplash.classList.toggle('addSplash');}, 1500);
  card.classList.toggle('newCard');
  var crewNamesInArray = [];
}

gameLoop = function() {  //Game loop
          newCard();
          cardfront.addEventListener('click', flipCardIfFront);
          cardback.addEventListener('click', discardCardIfBack);
}
