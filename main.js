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
        this.turns = turns || 5;
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

    rollCrookedDice() {
        this.diceRoll = Math.floor( ((Math.random() * 5) + 2) / 2 ) * 2;
        let string = "You rolled crooked Dice: " + this.diceRoll;
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
                6. The first player to get to the FINAL position is the winner.
                <===================================================================>`
        console.log(message);
    }

    endGame(name, winner) {
        console.log("We are ending the game here.");
        if (winner) {
            console.log("Winner is: " + name);
        }
        process.exit(1);
    }
}

class Player {
    constructor(name, color) {
        this.currPos = 0;
        this.prevPos = 0;
        this.g = new Game();
        if (name && color)
            this.setPlayerData(name, color);
    }

    setPlayerData(name, color) {
        this.name = name;
        this.color = color;
    }

    welcomeMessage() {
        let message = "Welcome " + this.name + " to the Snakes and Ladder Game. Your chosen color is: " + this.color;
        console.log(message);
    }

    getPosition() {
        console.log("Current Position is: " + this.currPos + " Old Position was: " + this.prevPos);
        return this.currPos;
    }

    finalPosition(moves) {
        this.prevPos = this.currPos;
        this.currPos = this.currPos + parseInt(moves);

        /**
         * If running given moves take Player ahead from Maximum Grid
         */
        if (this.currPos > this.g.maxGridSize) {
            console.log("You need " + (this.g.maxGridSize - this.currPos) + " to win this game. Try again in next turn." );
            this.currPos = this.prevPos;
        }

        /**
         * If running given moves finds a Ladder
         */
        else if (this.g.ladders.get(this.currPos)) {
            this.currPos = this.g.ladders.get(this.currPos);
            console.log("Wooaah, You jumped to position: " + this.currPos + " through Ladder.");
        }

        /**
         * If running given moves finds a Snake head
         */
        else if (this.g.snakes.get(this.currPos)) {
            this.currPos = this.g.snakes.get(this.currPos);
            console.log("Oh ho, Snake bites! You will slide down to position: " + this.currPos);
        }
        console.log("Your current position is: " + this.currPos);
        return this.currPos;
    }

    checkWin() {
        if (this.currPos === this.g.maxGridSize) {
            console.log("Wooahh !! COngratulations .... " + this.name + " You won");
            console.log("Thank You for Playing Game!!");
            this.g.endGame(this.name);
            return;
        }
        console.log("You haven't won yet. Keep Playing");
        return;
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

    console.log("This game has Player: " + game.numPlayers + "\n" + "")

    await sleep(1000);

    let iter = 5;

    console.log("Please tell us. Which type of Dice you want to use: Normal Dice or Crooked Dice.")

    function getDiceType() {
        let diceType = prompt("`C` for Crooked and `N` for Normal Dice:   ");

        if (['c', 'n'].indexOf(diceType.toLowerCase()) == -1) {
            console.log("Invalid Dice type. Retry (C/N):  ")
            iter--;
            if (!iter) {
                console.log("Maximum Invalid Attempts.");
                game.endGame()
            }
            getDiceType();
        }

        return diceType;
    }

    let diceType = getDiceType();

    await sleep(1000);

    game.startGame();

    await sleep(1000);

    let count = 1;

    while (game.turns > 0) {
        console.log("\n");
        console.log("Turn:   ========>> " + count);
        prompt("Please hit Enter to Roll the dice:    ");
        console.log("\n");
        console.log("Rolling the dice: =========> ");

        await sleep(2000);

        console.log("\n");
        let moves;

        if (diceType.toLowerCase() == "c") {
            moves = game.rollCrookedDice();
        } else {
            moves = game.rollDice();
        }

        await sleep(2000);

        p1.finalPosition(moves);

        p1.checkWin();

        await sleep(1000);

        game.turns--;
        count++;
    }
    await sleep(1000);
    console.log("All turns are executed. Thanks for Playing Game. :)")
    process.exit(1);
}

main();







