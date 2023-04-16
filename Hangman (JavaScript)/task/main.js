// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

const wordArray = ["python", "java", "swift", "javascript"];
let attempts = 8;
let numberWins = 0;
let numberLosts = 0;
let exit = false;

console.log("H A N G M A N");
application();

function application() {
    while (!exit) {
        let choice = input("Type \"play\" to play the game, \"results\" to show the scoreboard, and \"exit\" to quit: ");

        switch (choice) {
            case "play":
                game();
                break;
            case "results":
                showScore();
                break;
            case "exit":
                exit = true;
                break;
            default:
                break;
        }
    }
}

function game() {
    console.log();

    let index = Math.floor(Math.random() * wordArray.length);
    let word = wordArray[index];
    let hint = word.replace(/./gi, "-");
    let isOver = false;
    let triedLetters = "";

    while (!isOver) {
        console.log(hint);
        let letter = input("Input a letter: ");

        if (isInputValid(letter, triedLetters)) {
            if (word.includes(letter)) {
                hint = Array.from(hint);
                word = Array.from(word);
                let i;
                for (i = 0; i < word.length; i++) {
                    if (word[i] === letter) {
                        hint[i] = letter;
                    }
                }
                triedLetters += letter;
                word = word.join("");
                hint = hint.join("");
            } else {
                triedLetters += letter;
                console.log("That letter doesn't appear in the word.");
                attempts--;
            }
        }
        console.log();

        if (attempts === 0) {
            isOver = true;
            numberLosts++;
            console.log("You lost!");
        }

        if (!hint.includes("-")) {
            isOver = true;
            numberWins++;

            console.log(`You guessed the word ${word}!`);
            console.log("You survived!");
        }
    }
}

function showScore() {
    console.log(`You won: ${numberWins} times.\nYou lost: ${numberLosts} times.`)
}

function isInputValid(letter, triedLetters) {
    let isValid = false;

    if (letter.length !== 1) {
        console.log("Please, input a single letter.");
    } else if (!/[a-z]/.test(letter)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
    } else if (triedLetters.includes(letter)) {
        console.log("You've already guessed this letter.");
    } else {
        isValid = true;
    }

    return isValid;
}
