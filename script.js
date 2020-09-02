// MUTINY DRINKING GAME JS

//Variable list
var card_is_flipped = false; //initial state: kortet är inte flippat
const cards = document.querySelectorAll('.drinking-card');
var chosenCard = document.querySelector('p');

//Skapar lista på kortmöjligheter -> Hur ska vi gö de här? Varje string en mening? Eller kan man gö de här på annat sätt?
let cardList = ['SkipCard: Skippar din tur till nästa spelare asd asd as da asd asd',
                'CounterCard: Counterar kaptenens attack ipsum lorem ipsum lorem',
                'ScoreCard: Ta 5 Huikkan',
                'ScoreCard2: Ta 6 Huikkan ASD ASD ASD ASD ASDAS DAS D',
                'ScoreCard3: Ta 3 huikkan Test test etstsetset',
                'ScoreCard4: Ta en yoloswägger i bägger yolo bolo molo test test',
                'ScoreCard5: OTTO YOLO SWAG TESTAR ATT SKRIVA I KORTEN YOLO OMG.',
                'ScoreCard6',
                'ScoreCard7',
                'ScoreCard8']


function flipCard() {
  if (!card_is_flipped) { //If-statement för att hindra att man kan trycka två gånger efter varandra på kortet
      this.classList.toggle('flip');
      chosenCard.innerHTML=cardList[Math.floor(Math.random()*cardList.length)]; //Tar random värde från array cardList
      card_is_flipped = true; //VET DU OTTO HUR MAN FÅR DEN HÄR VARIABELN ATT BYTAS TILL TRUE UTANFÖR FUNKTIONEN?
  }
}


/* ALKKU JOBBAR PÅ DEN HÄR DELEN -> Om kortet är scorecard, så discardas den, annars sparas den */
function discardCard() {
  if (card_is_flipped) {
    this.classList.toggle('discard'); //Animation
    var card_is_flipped = false;
  }
}


cards.forEach(card => card.addEventListener('click', flipCard)); //Event listener för att clicka me musen på kortet
