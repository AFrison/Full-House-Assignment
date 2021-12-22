var card1, card2, card3, card4, card5, card6, card7;

//Draw 7 cards from the deck
function shuffle(){

  finished = false;
  //Loops to ensure no 2 cards are the same
  while(!finished){
    card1 = Math.floor(Math.random() * 52) + 1;
    card2 = Math.floor(Math.random() * 52) + 1;

    //Card 2 cannot the same card as card 1, 
    //If it is reroll. Repeat for all other cards
    if(card2 == card1 || card2 == undefined){
      card2 = Math.floor(Math.random() * 52) + 1;
    }
    else{
      card3 = Math.floor(Math.random() * 52) + 1;
    }
    if(card3 == card1 || card3 == card2 || card3 == undefined){
      card3 = Math.floor(Math.random() * 52) + 1;
    }
    else{
      card4 = Math.floor(Math.random() * 52) + 1;
    }

    if(card4 == card1 || card4 == card2 || card4 == card3 || card4 == undefined){
      card4 = Math.floor(Math.random() * 52) + 1;
    }
    else{
      card5 = Math.floor(Math.random() * 52) + 1;
    }

    if(card5 == card1 || card5 == card2 || card5 == card3 || card5 == card4 || card5 == undefined){
      card5 = Math.floor(Math.random() * 52) + 1;
    }
    else{
      card6 = Math.floor(Math.random() * 52) + 1;
    }

    if(card6 == card1 || card6 == card2 || card6 == card3 || card6 == card4 || card6 == card5 || card6 == undefined){
      card6 = Math.floor(Math.random() * 52) + 1;
    }
    else{
      card7 = Math.floor(Math.random() * 52) + 1;
    }

    if(card7 == card1 || card7 == card2 || card7 == card3 || card7 == card4 || card7 == card5 || card7 == card6 || card7 == undefined){
      card7 = Math.floor(Math.random() * 52) + 1;
    }
    else{
      //All cards are different end the loop.
      finished = true;
    }
  }
}

function cardVal(card){
  var cardValue;

  //Using the suit value scale (Alphabetical)
  //Assign each number their suit
  if(card <= 13)
    cardValue = "of Clubs";
  else if(card <= 26)
    cardValue = "of Diamonds";
  else if(card <= 39)
    cardValue = "of Hearts";
  else if(card <= 52)
    cardValue = "of Spades";

  //Mod the given value with 13 to get card value
  //Create special cases to cover face values and aces
  if (card % 13 <= 1 || card % 13 > 10){
    if(card % 13 == 11){
      cardValue = "Jack " + cardValue;
    }else if(card % 13 == 12){
      cardValue = "Queen " + cardValue;
    }else if(card % 13 == 1){
      cardValue = "Ace " + cardValue;
    }
    else{
      cardValue = "King " + cardValue;
    }
  }else{
    cardValue = card % 13 + " " + cardValue;
  }

  //Return new value in string with the form "x of suit"
  return cardValue;
}


function fullHouse(){

  document.getElementById("result").innerHTML = "";

  document.getElementById("card1img").style.border = "transparent";
  document.getElementById("card2img").style.border = "transparent";
  document.getElementById("card3img").style.border = "transparent";
  document.getElementById("card4img").style.border = "transparent";
  document.getElementById("card5img").style.border = "transparent";
  document.getElementById("card6img").style.border = "transparent";
  document.getElementById("card7img").style.border = "transparent";
  //Creates array of all known card values modulated to 13
  const cards = [card1%13,card2%13,card3%13,card4%13,card5%13,card6%13,card7%13];
  
  //Create check variables to know when the full house
  //Conditions are met
  var pair = 14, threekind = 14;
  
  //First loop to go through all values
  for(let i = 0; i < cards.length; i++){

    //Checks for if the value has already appeared as a pair or
    //as a 3 of a kind, if so skip to next increment
    if(cards[i] != pair && cards[i] != threekind){

      //Counter to track how many extra times the value appears
      var count = 0;
      var counter = "";

      //While i is not the last value loop through all remianing
      //cards not yet checked
      if(i != (cards.length-1)){
        for(let j = (i + 1); j < cards.length; j++){

          //If the cards are the same increment extra count
          if(cards[i] == cards[j]){
            count++;
          }
        }
      }
      //Checks if there is extra cards of the same value
      //1 extra means we have a pair, 2 extra means we have 3 of a kind, 
      //3 extra means we have 4 of a kind. If there is nothing greater 
      //than a 3 of a kind then we don't look at pairs. Lastly if a first 3 of a kind 
      //or better has been found then put the next one into pairs
      if(count >= 2 && threekind == 14){
        threekind = cards[i];
      }
      if(count >= 1 && cards[i] != threekind)
        pair = cards[i];
    }
  }
  //As long as both values of 3 of a kind and pair have changed
  //We have a full house
  if(pair != 14 && threekind != 14){
    
    var cardlist = cardsOutput(pair, threekind);

    document.getElementById("result").innerHTML = "Congratulations! You have a full house!<br>Your cards are: " + cardlist;
    document.getElementById("result").style.color = "Gold";
    document.getElementById("result").style.backgroundColor = "red";
  }else{
    document.getElementById("result").innerHTML = "You did not successfully make a full house.";
    document.getElementById("result").style.color = "Black";
    document.getElementById("result").style.backgroundColor = "transparent";
  }
  
}

function makeFullHouse(){

  card4 = 14; //Ace of Diamonds
  card5 = 27; //Ace of Hearts
  card2 = 40; //Ace of Spades
  card6 = 39; //King of Hearts
  card3 = 52; //King of Spades
  //card6 = 26; //King of Diamonds
  card7 = 13; //King of Clubs
  //card7= 12; // Queen of Clubs
  card1 = 2; //2 of Clubs

  setElements();
  fullHouse();
}

function setElements(){

  //Transforming Values into recognized card values
  card1Name = cardVal(card1);
  card2Name = cardVal(card2);
  card3Name = cardVal(card3);
  card4Name = cardVal(card4);
  card5Name = cardVal(card5);
  card6Name = cardVal(card6);
  card7Name = cardVal(card7);

  /*//Set the values to HTML elements
  document.getElementById("card1").innerHTML = card1//card1Name;
  document.getElementById("card2").innerHTML = card2//card2Name;
  document.getElementById("card3").innerHTML = card3//card3Name;
  document.getElementById("card4").innerHTML = card4//card4Name;
  document.getElementById("card5").innerHTML = card5//card5Name;
  document.getElementById("card6").innerHTML = card6///card6Name;
  document.getElementById("card7").innerHTML = card7//card7Name;*/

  //Set imagaes
  document.getElementById("card1img").src = "cards/"+card1+".png";
  document.getElementById("card2img").src = "cards/"+card2+".png";
  document.getElementById("card3img").src = "cards/"+card3+".png";
  document.getElementById("card4img").src = "cards/"+card4+".png";
  document.getElementById("card5img").src = "cards/"+card5+".png";
  document.getElementById("card6img").src = "cards/"+card6+".png";
  document.getElementById("card7img").src = "cards/"+card7+".png";
}

function run(){
  shuffle();
  fullHouse();
  setElements();
}

function cardsOutput(pair, threekind){

  var cardlist = "";
  var firstcard = true;

  if((card1%13) == pair || (card1%13) == threekind){
    cardlist = cardlist + cardVal(card1);
    document.getElementById("card1img").style.border = "5px solid rgb(71, 252, 0)";
    firstcard = false;
  }
  if((card2%13) == pair || (card2%13) == threekind){
    if(firstcard){
    cardlist = cardlist + cardVal(card2);
    firstcard = false;
    }
    else
    cardlist = cardlist + ", " + cardVal(card2);
    document.getElementById("card2img").style.border = "5px solid rgb(71, 252, 0)";
  }
  if((card3%13) == pair || (card3%13) == threekind){
    if(firstcard)
    cardlist = cardlist + cardVal(card3);
    else
    cardlist = cardlist + ", " + cardVal(card3);
    document.getElementById("card3img").style.border = "5px solid rgb(71, 252, 0)";
  }
  if((card4%13) == pair || (card4%13) == threekind){
    cardlist = cardlist + ", " + cardVal(card4);
    document.getElementById("card4img").style.border = "5px solid rgb(71, 252, 0)";
  }
  if((card5%13) == pair || (card5%13) == threekind){
    cardlist = cardlist + ", " + cardVal(card5);
    document.getElementById("card5img").style.border = "5px solid rgb(71, 252, 0)";
  }
  if((card6%13) == pair || (card6%13) == threekind){
    cardlist = cardlist + ", " + cardVal(card6);
    document.getElementById("card6img").style.border = "5px solid rgb(71, 252, 0)";
  }
  if((card7%13) == pair || (card7%13) == threekind){
    cardlist = cardlist + ", " + cardVal(card7);
    document.getElementById("card7img").style.border = "5px solid rgb(71, 252, 0)";
  }

  return cardlist;
}