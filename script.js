//--------------------- API TO TRIVIA GAME HERE -------------------------------
window.onload = sendApiRequest
async function sendApiRequest() {
  let response = await fetch('https://opentdb.com/api.php?amount=50&type=boolean');
  console.log(response);
  let data = await response.json()
  console.log(data);
  useApiData(data);
}

useApiData = function(data){
    questionArray = [];
    pairedQuestionArray = [];
    for (i=0; i < 50; i++) {
        window.questionArray.push(data.results[i].question);
        window.questionArray.push(data.results[i].correct_answer);
        pairedQuestionArray.push(questionArray);
        questionArray = [];
    }
    console.log(pairedTestData);
}

//--------------------- GAME LOGIC STARTS HERE --------------------------------
//Variable list
var cardList = [["QUESTION CARD !</br>❓<br/>Player gets a random trivia question.", 6],
                ["MUTINY !</br>⚔️</br>There is a mutiny on-board the ship. For the remainder of this round, the captain is countered with every card.", 1],
                ["BIG WAVE !</br>🌊<br/></br>Waterfall (lägg ett frågetecken så man vet va de e) starts from the Captain and continues in order: (array of players). Deducts points from random players that were near drowning. YIKES!", 1],
                ["COUNTER CARD !</br>❌</br>Player gets to counter a captain\'s card.", 2],
                ["DRINK CARD !", 8]];

var cardListNotWeighed = ["QUESTION CARD !</br>❓<br/>Player gets a random trivia question.",
                          "MUTINY !</br>⚔️</br>There is a mutiny on-board the ship. For the remainder of this round, the captain is countered with every card.",,
                          "BIG WAVE !</br>🌊<br/></br>Waterfall (lägg ett frågetecken så man vet va de e) starts from the Captain and continues in order: (array of players). Deducts points from random players that were near drowning. YIKES!",
                          "COUNTER CARD !</br>❌</br>Player gets to counter a captain\'s card.",
                          "DRINK CARD !"];

var mutinyRound = ["QUESTION CARD !<br/>The Captain gets a random trivia question.",
                  "DRINK CARD !"];


//var questionCard = [];

const questionSplash = document.querySelector(".question-card-splash");
const questionSplashTwo = document.querySelector(".question-card-splash-two");
//const questionSplashThree = document.querySelector(".question-card-splash-three");
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


selectCardToShow = function() { // OBS!! ADDA MUTINY ROUND ACTIVE / COUNTER CARD ACTIVE IF-STATEMENT
    let out = [];
    for (let i = 0; i < cardList.length; ++i) {
        for (let j = 0; j < cardList[i][1]; ++j) {
            out.push(cardList[i][0]);
        }
    }

    var pickedCard = out[Math.floor(Math.random() * out.length)];
    console.log("Picked card: " + pickedCard);
    window.pickedCardNumber = cardListNotWeighed.indexOf(pickedCard);
    console.log("Picked card number: " + pickedCardNumber);
    var firstPart = "🍻</br>Take ";
    var secondPart = " sips of your drink."
    var oneSip = "🍻</br>Take one sip of your drink."

    if (pickedCardNumber == 5){ // gör span för drink card o random sip amount
          window.amountOfSips = Math.floor(Math.random() * 10)+1;
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


questionScreenSplash = function() {
    questionSplash.classList.toggle('questionCardSplash');
}

questionScreenSplashTwo = function() {
    questionSplash.classList.toggle('questionCardSplash');
    questionSplashTwo.classList.toggle('questionCardSplashTwo');
}

questionScreenSplashThree = function() {
  questionSplashTwo.classList.toggle('questionCardSplashTwo');
  addScoreToTotal();
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);
  newCard();

  if (captScore >= 1500) { //crewmemberarray.length * 10000
    var captainWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC A P T A I N&nbsp&nbsp&nbspW I N S ! 🦜";
    var crewLosesString = "Bottoms up, crew! Empty your drink."
    document.getElementById("winning-side").innerHTML = captainWinsString;
    document.getElementById("losing-side").innerHTML = crewLosesString;
    gameEnd();

  } else if (crewTotScore >= 1500) {
    var crewWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC R E W&nbsp&nbsp&nbspW I N S ! 🏴‍☠️";
    var captainLosesString = "Bottoms up, captain! Empty your drink.";
    document.getElementById("winning-side").innerHTML = crewWinsString;
    document.getElementById("losing-side").innerHTML = captainLosesString;
    gameEnd();
}
}

questionCard = function() {
}

mutinyCard = function() {

}


bigWaveCard = function() { //Pick random players
    var randomPlayerAmount = Math.floor(Math.random()*crewNamesInArray.length);
    var alreadyDeductedFrom = [];
    for (i=0; i < randomPlayerAmount; i++) {
      var playerToDeductFrom = crewNamesInArray[Math.floor(Math.random()*crewNamesInArray.length)];
          if (alreadyDeductedFrom.indexOf(playerToDeductFrom) == -1){
              alreadyDeductedFrom.push(playerToDeductFrom);
              document.getElementById(playerToDeductFrom).innerHTML -= 300;
              crewScore_span.innerHTML -= 300;
              console.log("randomPlayerAmount: " + randomPlayerAmount);
              console.log("playerToDeductFrom: " + playerToDeductFrom);
          } else {
            i -= 1;
          }
      }
}


counterCard = function() {
}


addScoreToTotal = function() {
    switch (pickedCardNumber) {
      case 1:
          break;
      case 2:
          mutinyCard();
          break;
      case 3:
          bigWaveCard(); //Done
          break;
      case 5:
          if (!mutinyRoundActive && !counterCardActive) {
            this.captScore += amountOfSips * 100;
            captScore_span.innerHTML = this.captScore;
          } else {
            document.getElementById(playerInTurn) += amountOfSips * 100;
            captScore_span.innerHTML = this.crewTotScore;
          }
          break;
    }
}

/*
addCrewMembScore = function(chosenCardNumber, sipAmount) {
  //console.log(chosenCardNumber);
  //console.log(sipAmount);
      //var whoseTurnNow = document.getElementById("crew-members-turn").innerHTML;
      //var currentScoreNow = document.getElementById(whoseTurnNow).innerHTML;

      if (chosenCardNumber == 5){
          sipsTimesScore = sipAmount * 100;
          var drinkCardScore = parseInt(currentScoreNow) + sipsTimesScore;
          document.getElementById(whoseTurnNow).innerHTML = drinkCardScore;
          this.crewTotScore += drinkCardScore; //Add points also to total crew newPoints
          crewScore_span.innerHTML = this.crewTotScore;
      }

      return this.crewTotScore;
}
*/

/*
addCaptScore = function() {
  if (chosenCardNumber == 5){
      sipsTimesScore = sipAmount * 100;
      var drinkCardScore = parseInt(currentScoreNow) + sipsTimesScore;
      document.getElementById(whoseTurnNow).innerHTML = drinkCardScore;
  //this.captScore += 1000;
  //captScore_span.innerHTML = this.captScore;
  //return this.captScore;
}
*/


//Turn-related functions below
totalTurns = function() {
    this.turns += 1;
    document.getElementById("turns").innerHTML = this.turns;
    return this.turns;
}


playersTurn = function(decidePlayerTurn) { //This function decides the player turn
    window.turnDecided = decidePlayerTurn % (playerNameArray.length-1);

    if (turnDecided == 0) {
        turnDecided = playerNameArray.length-1;
    }

    window.playerInTurn = crewNamesInArray[turnDecided-1];
    document.getElementById("crew-members-turn").innerHTML = playerInTurn;
}



//Game/card loop functions below
newCard = function() {
    var isPlayerTurns = totalTurns();
    playersTurn(isPlayerTurns);
    setTimeout(function(){card.classList.toggle('newCard');}, 2000);
}


flipCardIfFront = function() {
    card.classList.toggle('newCard');
    selectCardToShow();
    card.classList.toggle('flip');



    //setTimeout(questionCard, 1000);

}
  //addCrewTotalScore(crewTotScore);
  //addCaptScore(captScore);
  //Lägg här att använda COUNTER KORT funktionen

discardCardIfBack = function() {
  console.log("Testar: " + pickedCardNumber);
  var questionNotYetDone = true;
  if (pickedCardNumber == 0 && questionNotYetDone == true){
      questionCard();

  } else {
  addScoreToTotal();
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);
  newCard();

  if (captScore >= 1500) { //crewmemberarray.length * 10000
    var captainWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC A P T A I N&nbsp&nbsp&nbspW I N S ! 🦜";
    var crewLosesString = "Bottoms up, crew! Empty your drink."
    document.getElementById("winning-side").innerHTML = captainWinsString;
    document.getElementById("losing-side").innerHTML = crewLosesString;
    gameEnd();

  } else if (crewTotScore >= 1500) {
    var crewWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC R E W&nbsp&nbsp&nbspW I N S ! 🏴‍☠️";
    var captainLosesString = "Bottoms up, captain! Empty your drink.";
    document.getElementById("winning-side").innerHTML = crewWinsString;
    document.getElementById("losing-side").innerHTML = captainLosesString;
    gameEnd();
  }
 }
}


//Game start/Game end/Game loop functions below
gameStart = function(){
    if (firstGame == true){
        chooseFirstCaptain();
        chooseCrewMembers();
    }
    window.mutinyRoundActive = false;
    window.counterCardActive = false;

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
}


gameLoop = function() {  //Game loop

          newCard();
          cardfront.addEventListener('click', flipCardIfFront);
          cardback.addEventListener('click', discardCardIfBack);
}
