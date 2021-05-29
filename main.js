class Game{
    constructor(numPlayers, maxGridSize) {
        this.numPlayers = numPlayers || 1; //Single Player Game
        this.maxGridSize = maxGridSize || 100; // Default board size 100
        this.diceFace = 6;
        this.maxPlayers = 4;
        this.snakes = new Map();
        this.ladders = new Map();
        this.setSnakesPositions();
        this.setLaddersPositions();
        this.welcomeMessage();
    }

    setSnakesPositions() {
        this.snakes.set(14, 7);
        this.snakes.set(18, 1);
        this.snakes.set(54, 36);
        this.snakes.set(85, 59);
    }

    setLaddersPositions() {
        this.ladders.set(4, 20);
        this.ladders.set(15, 34);
        this.ladders.set(72, 86);
        this.ladders.set(88, 92);
    }

    welcomeMessage() {
        let message = `             Welcome to Snake and Ladder Game.
             Rules:
                1. Players will start with position 0;
                2. Roll the Dice
                3. Move forward the number of grids shown on the dice.
                4. If you encounter with a ladder, you can move up to the top of the ladder.
                5. If you encounters with the head of a snake, you will slide down to the bottom of the snake.
                6. The first player to get to the FINAL position is the winner.`

        console.log(message);
    }
}

class Player {
    constructor(name, color) {
        this.currPos = 0;
        this.prevPos = 0;
        if (name && color)
            this.setPlayerData(name, color);
    }
    setPlayerData(name, color) {
        this.name = name;
        this.color = color;
    }
}

/**
 * Initiate Game
 * @type {Game}
 */

let game = new Game();
let p1 = new Player("Aman", "blue");






