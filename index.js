/* Deal 26 Cards to each Player from a Deck of 52 cards.
Iterate through the turns where each Player plays a Card.
The Player who played the higher card is awarded a point.
Ties result in zero points for both Players.
After all cards have been played, display the score and declare the winner.

Write a Unit Test using Mocha and Chai for at least one of the functions you write. */




// The code represents several classes. The first is a card class with properties "cardSuit" and "cardRank".
class Card {
    constructor(cardSuit, cardRank) {
      this.cardSuit = cardSuit;
      this.cardRank = cardRank;
    }
  }
  
  // The player class has properties "name", "hand", and "points".
  class Player {
    constructor(name, hand, points) {
      this.name = name;
      this.hand = [];
      this.points = 0;
    }
  }
  
  // The deck class represents a deck of cards with methods. The "getCards" 
  // creates a deck of cards with suits and ranks. The "shuffeCards" shuffles the deck randomly.
  // And the "getDeck" generates a shuffled deck of cards. 
  class Deck {
    constructor() {
      this.deck = [];
      this.ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    }
    getCards() {
      const { suits, ranks } = this;
      for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
          let card = new Card(suits[i], ranks[j]);
          this.deck.push(card);
        }
      }
    }
    shuffleCards() {
      const { deck } = this;
      for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
      }
    }
    getDeck() {
      this.getCards();
      this.shuffleCards();
      return this.deck;
    }
  }
  
// The game class manages the game, which covers initializing players, dealing cards, playing rounds and 
// determining the winner. This class provides the methods: "dealCards", which deals the cards to
// players from the deck. The "playRound" comparing players' cards and gives the points. The "playGame" manages 
// the whole game until a player runs out of cards and declaring a winner. 
  class Game {
    constructor() {
      this.deck = new Deck();
      this.deck.getDeck();
      this.player1 = new Player("Player 1");
      this.player2 = new Player("Player 2");
      this.numPlayers = 2;
      this.numCardsPerPlayer = Math.floor(this.deck.deck.length / this.numPlayers);
      this.players = [this.player1, this.player2];
      this.round = 1;
    }
    dealCards() {
      for (const player of this.players) {
        player.hand = this.deck.deck.splice(0, this.numCardsPerPlayer);
      }
    }
    playRound() {
      const card1 = this.player1.hand.shift();
      const card2 = this.player2.hand.shift();
      console.log(`=============Round ${this.round} Start=============`);
      console.log(`${this.player1.name} plays: ${card1.cardRank} of ${card1.cardSuit}`);
      console.log(`${this.player2.name} plays: ${card2.cardRank} of ${card2.cardSuit}`);
      if (this.deck.ranks.indexOf(card1.cardRank) > this.deck.ranks.indexOf(card2.cardRank)) {
        console.log(`${this.player1.name} wins the round!`);
        this.player1.points++;
      } else if (this.deck.ranks.indexOf(card1.cardRank) < this.deck.ranks.indexOf(card2.cardRank)) {
        console.log(`${this.player2.name} wins the round!`);
        this.player2.points++;
      } else {
        console.log("It's a tie!");
      }
      console.log("=============Round End=============");
      this.round++;
    }
    playGame() {
      this.dealCards();
      while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
        this.playRound();
      }
      console.log("=============Results=============");
      if (this.player1.points > this.player2.points) {
        console.log(`${this.player1.name} wins the game with ${this.player1.points} points!`);
      } else if (this.player2.points > this.player1.points) {
        console.log(`${this.player2.name} wins the game with ${this.player2.points} points!`);
      } else {
        console.log("It's a tie game!");
      }
      console.log("=============Game End=============");
    }
  }
  
    const game = new Game();
    game.playGame();