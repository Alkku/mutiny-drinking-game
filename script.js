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
    console.log(pairedQuestionArray);
}

//--------------------- GAME LOGIC STARTS HERE --------------------------------
//Variable list OBS OM ENA ÄNDRAS (CARDLIST), SÅ MÅST OCKSÅ ANDRA ÄNDRAS!!!!!!!
var cardList = [["</br>QUESTION CARD</br>❓<br/>Player gets a random trivia question.", 7],
                ["MUTINY</br>⚔️<br/>There is a mutiny on-board the ship. Next round, the Captain is countered with every occuring drinking card, thus gaining the crew points.", 2],
                ["BIG WAVE</br>🌊</br>Big wave starts from the Captain and continues with highest scored crew member to lowest (every player must drink). Might deduct points from random players.", 1],
                ["</br>COUNTER CARD</br>❌<br/>Player gets to counter a Captain\'s drinking card.", 4],
                ["DRINK CARD", 7],
              ];

var cardListNotWeighed = ["</br>QUESTION CARD</br>❓<br/>Player gets a random trivia question.",
                          "MUTINY</br>⚔️<br/>There is a mutiny on-board the ship. Next round, the Captain is countered with every occuring drinking card, thus gaining the crew points.",
                          "BIG WAVE</br>🌊</br>Big wave starts from the Captain and continues with highest scored crew member to lowest (every player must drink). Might deduct points from random players that were near drowning. YIKES!",
                          "</br>COUNTER CARD</br>❌<br/>Player gets to counter a Captain\'s drinking card.",
                          "DRINK CARD",
                        ];

const welcomeSplash = document.querySelector(".welcome-splash");
const rulesSplash = document.querySelector(".rules-splash");
const welcomeSplashScreen = document.getElementById("welcome-splash");
const rulesSplashScreen = document.getElementById("rules-splash");
const questionSplash = document.querySelector(".question-card-splash");
const questionSplashTwo = document.querySelector(".question-card-splash-two");
const nameSplash = document.querySelector(".crew-member-names");
const endSplash = document.querySelector(".end-game-screen");
const startFirstGameButton = document.getElementById("start-game-button");
const startSecondGameButton = document.getElementById("start-game-button");
const restartGameButton = document.getElementById("restart-game-button");
let card = document.querySelector(".drinking-card");
const cardfront = document.querySelector(".front-face");
const cardback = document.querySelector(".back-face");
const crewScore_span = document.getElementById("crew-score");
const captScore_span = document.getElementById("capt-score");

var playerNameArray = [];
var crewNamesInArray = [];
var chosenQuestion = [];
var counterCardOwners = [];
var firstGame = true;

removeWelcomeSplash = function() {
welcomeSplash.classList.toggle("removeWelcome");
rulesSplash.classList.toggle("addRules");
}

removeRulesSplash = function() {
  rulesSplash.classList.toggle("addRules");
  nameSplash.classList.toggle('removeSplash');


}
//Functions below
inputNamesArray = function() { //This function takes the input of given names on splash screen
      var inputText = document.getElementById("crew-member-name").value;
      var trimmedInputText = inputText.trim();

      if (trimmedInputText === "") {
          document.getElementById("error-message").innerHTML = "Name cannot be space.";
          document.getElementById("crew-member-name").value = '';
      } else if (playerNameArray.indexOf(inputText) !== -1) {
          document.getElementById("error-message").innerHTML = "Name already exists.";
          document.getElementById("crew-member-name").value = '';
      } else if (playerNameArray.length === 0 || playerNameArray.indexOf(inputText) == -1){
        document.getElementById("error-message").innerHTML = "";
        playerNameArray.push(inputText);
        document.getElementById("crew-member-name").value = ''; //reset value to '' of input text field
        document.getElementById("all-players").innerHTML = playerNameArray.length;
        document.getElementById("total-players-splash").innerHTML = playerNameArray.length;
        var createPara = document.createElement('p');
        var insertInputText = document.createTextNode(inputText);
        createPara.setAttribute("id", playerNameArray.length);
        createPara.appendChild(insertInputText);
        document.getElementById("add-player-names").appendChild(createPara);
      }
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
  if (playerNameArray.length < 2) {
    document.getElementById("error-message").innerHTML = "Need at least 2 players.";
    document.getElementById("crew-member-name").value = '';
  } else {
    removeLastSplash();
    gameStart();
    gameLoop();
    window.firstGame = false;
  }
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
    var firstPart = "</br>🍻</br>Take ";
    var secondPart = " sips of your drink.</br>Cheers!"
    var oneSip = "</br>🍻</br>Take one sip of your drink.</br>Cheers!"

    if (pickedCardNumber == 4){ // gör span för drink card o random sip amount
          window.amountOfSips = Math.floor(Math.random() * 6)+1;
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
    var chooseQuestionFromArray = pairedQuestionArray[Math.floor(Math.random()*pairedQuestionArray.length)];
    var answerToQuestion = chooseQuestionFromArray[1];
    chosenQuestion.push(chooseQuestionFromArray);
    chosenQuestion.push(answerToQuestion);
    console.log(chosenQuestion);
    document.getElementById("question-from-api").innerHTML = chooseQuestionFromArray[0];

}

trueAnswer = function() {
  var answerPlayer = "True";
  var answerToQuestion = chosenQuestion[1];
  chosenQuestion = [];

  if (answerPlayer != answerToQuestion) {
      document.getElementById("answer-right-or-wrong").innerHTML = "The answer is incorrect! Take 3 sips of your drink.</br>Captain gets points.";
      let currentCaptScore = document.getElementById("capt-score").innerHTML;
      let newCaptScore = parseInt(currentCaptScore) + 300;
      document.getElementById("capt-score").innerHTML = newCaptScore;

      questionScreenSplashTwo();

  } else {
      document.getElementById("answer-right-or-wrong").innerHTML = "The answer is correct! You get 500 points.";
      let whoseTurnNow = document.getElementById("crew-members-turn").innerHTML;
      let currentScoreNow = document.getElementById(whoseTurnNow).innerHTML;

      let newCrewMemberScore = parseInt(currentScoreNow) + 500;
      document.getElementById(whoseTurnNow).innerHTML = newCrewMemberScore;
      let crewNewScore = parseInt(crewScore_span.innerHTML) + 500;
      crewScore_span.innerHTML = crewNewScore;

      questionScreenSplashTwo();
  }
}

falseAnswer = function() {
    var answerPlayer = "False";
    var answerToQuestion = chosenQuestion[1];
    chosenQuestion = [];

    if (answerPlayer != answerToQuestion) {
        document.getElementById("answer-right-or-wrong").innerHTML = "The answer is incorrect! Take 3 sips of your drink.</br>Captain gets points.";
        let currentCaptScore = document.getElementById("capt-score").innerHTML;
        let newCaptScore = parseInt(currentCaptScore) + 300;
        document.getElementById("capt-score").innerHTML = newCaptScore;

        questionScreenSplashTwo();
    } else {
        document.getElementById("answer-right-or-wrong").innerHTML = "The answer is correct! You get 500 points.";
        let whoseTurnNow = document.getElementById("crew-members-turn").innerHTML;
        let currentScoreNow = document.getElementById(whoseTurnNow).innerHTML;

        let newCrewMemberScore = parseInt(currentScoreNow) + 500;
        document.getElementById(whoseTurnNow).innerHTML = newCrewMemberScore;
        let crewNewScore = parseInt(crewScore_span.innerHTML) + 500;
        crewScore_span.innerHTML = crewNewScore;

        questionScreenSplashTwo();
    }
}

questionScreenSplashTwo = function() {
  questionSplash.classList.toggle('questionCardSplash');
  questionSplashTwo.classList.toggle('questionCardSplashTwo');
}
//ÄNDRA HÄR OCKSÅ FÖRE RELEASE POÄNG SETTINGS
questionScreenSplashThree = function() {
  questionSplashTwo.classList.toggle('questionCardSplashTwo');
  addScoreToTotal();
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);
  var finalCaptScore = parseInt(captScore_span.innerHTML);
  var finalCrewScore = parseInt(crewScore_span.innerHTML);

  if (finalCaptScore >= 5000  * crewNamesInArray.length) {
    var captainWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC A P T A I N&nbsp&nbsp&nbspW I N S ! 🦜";
    var crewLosesString = "Bottoms up, crew! Empty your drink."
    document.getElementById("winning-side").innerHTML = captainWinsString;
    document.getElementById("losing-side").innerHTML = crewLosesString;
    gameEnd();

  } else if (finalCrewScore >= 5000  * crewNamesInArray.length) {
    var crewWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC R E W&nbsp&nbsp&nbspW I N S ! 🏴‍☠️";
    var captainLosesString = "Bottoms up, Captain! Empty your drink.";
    document.getElementById("winning-side").innerHTML = crewWinsString;
    document.getElementById("losing-side").innerHTML = captainLosesString;
    gameEnd();
  }
  newCard();
}

questionCard = function() {
  questionScreenSplash();
}

mutinyCard = function() {
  var currentTurnNumber = document.getElementById("turns").innerHTML;
  var mutinyRoundEnds = parseInt(currentTurnNumber) + crewNamesInArray.length;
  document.getElementById("mutiny-round-ends").innerHTML = mutinyRoundEnds;
}

bigWaveCard = function() { //Pick random players
  console.log(crewNamesInArray);
    var randomPlayerAmount = Math.floor(Math.random()*crewNamesInArray.length);
    console.log(randomPlayerAmount);
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

acquireCounterCard = function() {
    if (!counterCardOwners.includes(document.getElementById("crew-members-turn").innerHTML)) {
        counterCardOwners.push(document.getElementById("crew-members-turn").innerHTML);
        console.log(counterCardOwners);
    }
}

useCounterCard = function() {
    document.querySelector(".counter-card-button-div").classList.toggle('makeVisible');
    const index = counterCardOwners.indexOf(document.getElementById("crew-members-turn").innerHTML);
    if (index > -1) {
      counterCardOwners.splice(index, 1)
    }
    console.log(counterCardOwners);
    let currentTurnNumberNew = document.getElementById("turns").innerHTML;
    let counterRoundEnds = parseInt(currentTurnNumberNew) + 2;
    document.getElementById("mutiny-round-ends").innerHTML = counterRoundEnds;

    var captainCounteredText = "</br>🍻</br>Captain is countered and takes ";
    var captainCounteredText2nd = " sips.</br> Crew gets points. Cheers!"
    let newSentenceCard = captainCounteredText + amountOfSips + captainCounteredText2nd;
    document.getElementById("card-content").setAttribute("style", "color:red");
    document.getElementById("card-content").innerHTML = newSentenceCard;
}

addScoreToTotal = function() { //KOLLA EHTONA, FÖR MUTINY CARD E INT ANVÄND!!
  console.log("Picked Card Number: " + pickedCardNumber);
    switch (pickedCardNumber) {
      case 1:
          mutinyCard();
          break;
      case 2:
          bigWaveCard(); //Done
          break;
      case 3:
          acquireCounterCard();
          break;
      case 4:
          if ((parseInt(document.getElementById("mutiny-round-ends").innerHTML) <
          parseInt(document.getElementById("turns").innerHTML))) {
            let currentCaptScore = document.getElementById("capt-score").innerHTML;
            let newCaptScore = parseInt(currentCaptScore) + (amountOfSips * 100);
            document.getElementById("capt-score").innerHTML = newCaptScore;


          } else {
            let whoseTurnNow = document.getElementById("crew-members-turn").innerHTML;
            console.log("Whose turn now: " + whoseTurnNow);
            let currentScoreNow = document.getElementById(whoseTurnNow).innerHTML;

            let newCrewMemberScore = parseInt(currentScoreNow) + (amountOfSips * 100);
            document.getElementById(whoseTurnNow).innerHTML = newCrewMemberScore;
            let crewNewScore = parseInt(crewScore_span.innerHTML) + (amountOfSips * 100);
            crewScore_span.innerHTML = crewNewScore;
          }
          break;
    }
}

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
    document.getElementById("span-color").setAttribute("style", "color:white");
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
    document.getElementById("card-content").setAttribute("style", "color:black");
    if (pickedCardNumber == 4 &&
      parseInt(document.getElementById("turns").innerHTML) <
      parseInt(document.getElementById("mutiny-round-ends").innerHTML))
      {
        document.getElementById("crew-members-turn").innerHTML = "Captain";
        document.getElementById("span-color").setAttribute("style", "color:red");
        card.classList.toggle('flip');
    } else if (pickedCardNumber == 4 && counterCardOwners.includes(document.getElementById("crew-members-turn").innerHTML)){
        document.querySelector(".counter-card-button-div").classList.toggle('makeVisible');
        card.classList.toggle('flip');
    } else {
        card.classList.toggle('flip');
    }
}

//ÄNDRA HÄR FÖRE RELEASE 10000 * GÅNGER SPElARMÄNGDEN
discardCardIfBack = function() {
  console.log("Counter card owners: " + counterCardOwners);
  if (pickedCardNumber == 4 &&
    parseInt(document.getElementById("turns").innerHTML) <=
    parseInt(document.getElementById("mutiny-round-ends").innerHTML))
    {
      var isPlayerTurns = totalTurns();
      playersTurn(isPlayerTurns);
    } else if ((pickedCardNumber == 4 && counterCardOwners.includes(document.getElementById("crew-members-turn").innerHTML))){
      document.querySelector(".counter-card-button-div").classList.toggle('makeVisible');
    }

  console.log("Testar: " + pickedCardNumber);
  var questionNotYetDone = true;
  if (pickedCardNumber == 0 && questionNotYetDone == true){
      questionCard();

  } else if (document.getElementById("crew-members-turn").innerHTML != "Captain"){
  addScoreToTotal();
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  setTimeout(function(){card.classList.toggle('discard');}, 2000);
  var finalCaptScore = parseInt(captScore_span.innerHTML);
  var finalCrewScore = parseInt(crewScore_span.innerHTML);

  if (finalCaptScore >= 5000 * crewNamesInArray.length) { //crewmemberarray.length * 10000
    var captainWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC A P T A I N&nbsp&nbsp&nbspW I N S ! 🦜";
    var crewLosesString = "Bottoms up, crew! Empty your drink."
    document.getElementById("winning-side").innerHTML = captainWinsString;
    document.getElementById("losing-side").innerHTML = crewLosesString;
    gameEnd();

  } else if (finalCrewScore >= 5000 * crewNamesInArray.length) {
    var crewWinsString = "Y A R R !&nbsp&nbsp&nbspT H E&nbsp&nbsp&nbspC R E W&nbsp&nbsp&nbspW I N S ! 🏴‍☠️";
    var captainLosesString = "Bottoms up, Captain! Empty your drink.";
    document.getElementById("winning-side").innerHTML = crewWinsString;
    document.getElementById("losing-side").innerHTML = captainLosesString;
    gameEnd();
  }

  newCard();
 }
}

//Game start/Game end/Game loop functions below
gameStart = function(){
    if (firstGame == true){
        chooseFirstCaptain();
        chooseCrewMembers();
    }
    document.getElementById("score-to-reach").innerHTML = 1000 * (playerNameArray.length-1);
    crewScore_span.innerHTML = 0;
    captScore_span.innerHTML = 0;
    turns.innerHTML = 0;
    this.turns = 0;
}

gameEnd = function(){
    card.classList.toggle('newCard');
    chooseCaptain();
    chooseCrewMembers();
    setTimeout(function(){endSplash.classList.toggle('addSplash');}, 1000);
    document.getElementById("mutiny-round-ends").innerHTML = "0";
    counterCardOwners = [];
}

gameLoop = function() {  //Game loop
          newCard();
          cardfront.addEventListener('click', flipCardIfFront);
          cardback.addEventListener('click', discardCardIfBack);
}
