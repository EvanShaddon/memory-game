const gameContainer = document.getElementById("game");
let counter1 = 0;
let noClick = false;
let cardA = null;
let cardB = null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);


function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", e.target);
  if(noClick) return;
  if(e.target.classList.contains('flipped')) return;

  let choice = e.target;
  choice.style.backgroundColor = choice.classList[0];

  if(!cardA || !cardB){
    choice.classList.add('flipped');
    cardA = cardA || choice;
    cardB = choice === cardA ? null : choice;
  }

  if(cardA && cardB){
    noClick = true;
    let gifA = cardA.className;
    let gifB = cardB.className;

    if(gifA === gifB){
      counter1 += 2;
      cardA.removeEventListener('click', handleCardClick);
      cardB.removeEventListener('click', handleCardClick);
      cardA = null;
      cardB = null;
      noClick = false;
      console.log('They Match!');
      console.log(counter1);
    }
    else{
      setTimeout(function(){
        cardA.style.backgroundColor = 'white';
        cardB.style.backgroundColor = 'white';
        cardA.classList.remove('flipped');
        cardB.classList.remove('flipped');
        cardA = null;
        cardB = null;
        noClick = false;
        console.log('Try again.');
      }, 1000);
      console.log(counter1);
    };
  };
  if(counter1 === COLORS.length){
    alert('Game Over, You WIN!');
  };
}