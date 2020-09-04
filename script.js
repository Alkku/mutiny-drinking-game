// MUTINY DRINKING GAME JS

//Variable list
const crewScore = 0;
const captScore = 0;
const card = document.querySelector(".drinking-card");
const cardfront = document.querySelector(".front-face");
const cardback = document.querySelector(".back-face");
var randomcard = document.getElementById("random-card");
const crewScore_span = document.getElementById("crew-score"); //Använd dessa för att uppdatera score i html
const captScore_span = document.getElementById("capt-score");
const cardList = ['QUESTION CARD !<br/>Player gets a random pirate-related question.',
                  'MUTINY !</br>There is a mutiny on board the ship. For the entire next round the captain is countered with every card.',
                  'WATERFALL !<br/></br>Everybody finishes their drink one at a time starting from the captain. Deducts points from random players that were near drowning. YIKES!',
                  'COUNTER CARD !</br>Player gets to counter a captain\'s card.',
                  'DRINK CARD !</br>Player rolls two dice. The crew member takes X sips depending on the outcome.'];


function selectNumberFromArray() {
  const arrayNumber = Math.floor(Math.random()*5) //Antalet kort är 5
  return arrayNumber;
}

function selectCardUsingArray() {

    randomcard.innerHTML = cardList[selectNumberFromArray()];
}


function crewGetScore() {
    crewScore++;
  }


function captGetScore() {
  captScore++;
}




function newCard() {
  setTimeout(function(){
    card.classList.toggle('newCard');
  }, 1500);
  setTimeout(selectCardUsingArray, 1500);

}

function flipCardIfFront() {
  card.classList.toggle('newCard');
  card.classList.toggle('flip');
}

function discardCardIfBack() {
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  newCard();
  setTimeout(function(){
    card.classList.toggle('discard');
  }, 500);
}


function main() {   // Game loop
        newCard();
        cardfront.addEventListener('click', flipCardIfFront);
        cardback.addEventListener('click', discardCardIfBack);
}

main();
