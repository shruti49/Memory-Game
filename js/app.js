// Create a list that holds all of your cards
let cards = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-anchor",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-diamond",
  "fa fa-bomb",
  "fa fa-leaf",
  "fa fa-bomb",
  "fa fa-bolt",
  "fa fa-bicycle",
  "fa fa-paper-plane-o",
  "fa fa-cube"
];

//creating an array to check the opneing of cards
let opened = [];

let counter = 0;

let moves = 0;

let stars = document.getElementsByClassName("fa fa-star");

let rating = 3;

let shuffledCards;

let hasTheTimerStarted = false;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Creation of cards dyanamically
function createCards() {
  //Storing the function in a var
  let shuffledCards = shuffle(cards);

  /*Accessing each card using for each loop $ item is the array element i.e its the classname*/
  shuffledCards.forEach(function (item) {
    /*Here we are creating li element and appending it to the ul and assiging the card name as a class name to the icon tag*/
    $("ul.deck").append(`<li class='card'><i class="${item}"></i></li>`);
  });
}

//Calling creating cards fuction will create cards dyanamically
createCards();

//Selecting every ele with card class nd binding a click event to each card
$(".card").click(function () {
  //Selcting current ele being clicked
  openCards($(this));
});

// Creating a function to open cards
function openCards(card) {
  /*checking if any card is opened or not if nothing is opened*/
  if (opened.length === 0) {
    //push a card into array
    opened.push(card);

    //open the card
    card.toggleClass("open show animated headShake");

    //Calling timer
     if (!hasTheTimerStarted){
       timer();
      hasTheTimerStarted = true;
    }
   

  } else if (opened.length === 1) {
    //if one card has already been pushed
    //open that card
    card.toggleClass("open show animated headShake");

    //push that card in array
    opened.push(card);

    //a card will open
    timeOut = setTimeout(checkMatch, 500);
  }
}

/*creating a function to check whether the cards matched or not
when we have two opened cards in an array
*/
function checkMatch() {
  //an array to keep the track of opened cards
  let open = opened;

  moveCounter();

  /*will check the matching of cards using same class name
  open[0][0]means first opned card at index 0
  open[1][0]means second opned card at index 0 
  we are seleting classname of icon tag
  */
  if (
    open[0][0].firstChild.className === open[1][0].firstChild.className &&
    open[0][0] !== open[1][0]
  ) {
    //matching cards
    open[0].toggleClass("match tada");
    open[1].toggleClass("match tada");

    //to stop click event on the opened cards
    open[0].css("pointer-events", "none");
    open[1].css("pointer-events", "none");

    //clear the array for next two cards
    opened = [];
    timeOut2 = setTimeout(matchCounter, 1000);
  } else {
    open[0].toggleClass("notMatch");
    open[1].toggleClass("notMatch");
    opened = [];
    setTimeout(function () {
      open[0].toggleClass("open show animated notMatch headShake");
      open[1].toggleClass("open show animated notMatch headShake");
    }, 300);
  }
}

/*creating a counter to check all for all the opened cards
if all the 8 pair matches then create an alert  
*/
function matchCounter() {
  counter++;
  console.log(counter);
  if (counter === 8) {
    shouldTimerTick = false;
    openWinModal();
  }
}

//counting the no of moves
function moveCounter() {
  moves++;

  //accessing moves from span ele n changing the content means counting the moves
  $(".moves").html(moves);
  checkStars();
}

function checkStars() {
  if (moves > 10 && moves < 16) {
    stars[2].style.display = "none";
    rating = 2;
  } else if (moves >= 20) {
    stars[1].style.display = "none";
    rating = 1;
  }
}

function openWinModal() {
  $("#myModal").modal("show");
}

function reset() {
  $(".deck").html("");
  opened = [];
  counter = 0;
  moves = -1;
  rating = 3;
  moveCounter();
  shuffledCards = [];
  createCards();
  $(".card").click(function () {
    openCards($(this));
  });
  stars[1].style.display = "block";
  stars[2].style.display = "block";
  $("#myModal").css("display", "none");
}

$(".restart").click(function () {
  reset();
  hasTheTimerStarted = false;
  shouldTimerTick = false;
  t.textContent = "00:00";
  seconds = 0;
  minutes = 0;
});

//Timer
let shouldTimerTick;
let t = document.getElementById("timer") , seconds = 0 , minutes = 0;


function timer() {
  let time;
  shouldTimerTick = true;

  time = setInterval(function () {
    if (shouldTimerTick) {

      (function add() {
        seconds++;
        if (seconds >= 60) {
          seconds = 0;
          minutes++;
        }

        t.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

      })();
    }
    else{
      clearInterval(time);
    }
  },1000)
}