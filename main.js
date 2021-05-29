class Game {
    constructor(numPlayers, maxGridSize, turns) {
        this.numPlayers = numPlayers || 1; //Single Player Game
        this.maxGridSize = maxGridSize || 100; // Default board size 100
        this.diceFace = 6;
        this.maxPlayers = 2;
        this.diceRoll = 0;
        this.snakes = new Map();
        this.ladders = new Map();
        this.setSnakesPositions();
        this.setLaddersPositions();
        this.turns = turns || 1;
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

    startGame() {
        console.log("Lets start the game. Start Rolling Dice.");
    }

    rollDice() {
        this.diceRoll = Math.floor(Math.random() * 6) + 1
        let string = "You rolled: " + this.diceRoll;
        if (this.diceRoll == this.diceFace) {
            string = "Woohoo .. " + string;
        }
        console.log(string);
        return this.diceRoll;
    }

    welcomeMessage() {
        let message = `<============= Welcome to Snake and Ladder Game ===============>
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

    welcomeMessage() {
        let message = "Welcome " + this.name + " to the Snakes and Ladder Game";
        console.log(message);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Initiate Game
 * @type {Game}
 */

async function main() {
    let game = new Game();
    game.welcomeMessage();

    await sleep(1000);

    let p1 = new Player();

    const prompt = require("prompt-sync")({sigint: true});

    let name = prompt("Please enter your name: ");
    let color = prompt("Please choose your color: ");
    p1.setPlayerData(name, color);
    p1.welcomeMessage();

    await sleep(1000);

    game.startGame();

    await sleep(1000);

    while (game.turns > 0) {
        let enter = prompt("Please enter to Roll the dice: ");
        console.log("\n");
        console.log("Rolling the dice: =========> ");

        await sleep(2000);

        console.log("\n");

        let moves = game.rollDice();
        game.turns--;
    }
}

main();







