"use strict";

const Assert = require('assert');
let Game = require('./main').Game;
let Player = require('./main').Player;

let game = new Game();
let testPlayer = new Player('Aman', 'Blue');

function validateData(initialPosition, finalPosition, diceRollValue) {
    /**
     * Dice ROll Value = 4
     */
    Assert.equal(initialPosition, testPlayer.prevPos);
    switch (initialPosition) {
        case 0:
            Assert.equal(finalPosition, 20);
            console.log("Passed case")
            break;
        case 10:
            Assert.equal(finalPosition, 7);
            console.log("Passed case")
            break;
        case 15:
            Assert.equal(finalPosition, 19);
            break;
        case 97:
            Assert.equal(finalPosition, 97);
            break;
        case 98:
            Assert.notEqual(finalPosition, 102);
            break;
    }
}

/**
 * Unit Test case 1
 * when initial position is 0
 * @type {number}
 */
let diceRollValue = 4;
let initialPosition = testPlayer.getPosition();
let finalPosition = testPlayer.finalPosition(diceRollValue, game);

try {

    console.log("Test Case 1 =======> Initial: 0, Final: 4");
    validateData(initialPosition, finalPosition, diceRollValue);
    console.log("Passed")

    initialPosition = testPlayer.setPosition(10);
    finalPosition = testPlayer.finalPosition(diceRollValue, game);

    console.log("Test Case 2 =======> Initial: 10, Final: 7");
    validateData(initialPosition, finalPosition, diceRollValue);
    console.log("Passed")

    initialPosition = testPlayer.setPosition(15);
    finalPosition = testPlayer.finalPosition(diceRollValue, game);

    console.log("Test Case 3 =======> Initial: 15, Final: 19");
    validateData(initialPosition, finalPosition, diceRollValue);
    console.log("Passed")


    initialPosition = testPlayer.setPosition(97);
    finalPosition = testPlayer.finalPosition(diceRollValue, game);

    console.log("Test Case 3 =======> Initial: 97, Final: 97");
    validateData(initialPosition, finalPosition, diceRollValue);
    console.log("Passed")

} catch (err) {
    console.log("Failed Unit test: " + err);
}




