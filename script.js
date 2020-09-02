// MUTINY DRINKING GAME JS

//Variable list
const cards = document.querySelectorAll('.drinking-card');
let card_is_flipped = false; //initial state: kortet är inte flippat


function flipCard() {
  if (card_is_flipped == false) { //If-statement för att hindra att man kan trycka två gånger efter varandra på kortet
    this.classList.toggle('flip');
    card_is_flipped = true; //Card is flipped är sant
  }
}


cards.forEach(card => card.addEventListener('click', flipCard));
