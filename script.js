// MUTINY DRINKING GAME JS

//Variable list
const card = document.querySelector(".drinking-card");
const cardfront = document.querySelector(".front-face");
const cardback = document.querySelector(".back-face");
var randomcard = document.getElementById("random-card");
//var captain_score = 0;
//var crew_total_score = 0;


function selectRandomCard() {
    const cardList = ['SKIP CARD !<br/>Player gets to skip their turn when used.',
                      'MUTINY !</br>The player that gets this card will.. TBD',
                      'WATERFALL !<br/></br>Everybody finishes their drink one at a time. Deducts points from random players.',
                      'COUNTER CARD !</br>Player gets to counter a captain\'s card.',
                      'The crew member takes 3 sips.'];
    const arrayNumber = [Math.floor(Math.random()*cardList.length)]
    randomcard.innerHTML = cardList[arrayNumber];
    console.log(arrayNumber);
}







function newCard() {
  setTimeout(function(){
    card.classList.toggle('newCard');
  }, 1500);
  setTimeout(selectRandomCard, 1500);
}

function flipCardIfFront() {
  card.classList.toggle('newCard');
  card.classList.toggle('flip');
}

function discardCardIfBack() {
  card.classList.toggle('flip');
  card.classList.toggle('discard');
  newCard();
  //card.classList.toggle('discard');
}


function main() {   // Game loop
        newCard();
        cardfront.addEventListener('click', flipCardIfFront);
        cardback.addEventListener('click', discardCardIfBack);
}

main();
