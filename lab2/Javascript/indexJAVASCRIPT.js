let target_number = Math.floor(Math.random() * 99) + 1;
console.log(target_number);

let max_attempts = 7;
let attempts = 0;

let wins = 0;
let losses = 0;

let guesses = [];
let player_guess;
document.querySelector("#win_count").textContent = `WINS: ${wins}`;
document.querySelector("#lose_count").textContent = `LOSSES: ${losses}`;

document.querySelector("#attempts").textContent = `REMAINING ATTEMPTS: ${max_attempts - attempts}`;

document.querySelector("#guess_button").addEventListener("click", Guesses);

function Guesses() {
    player_guess = document.querySelector("#text_input").value;

    if (ValidGuess()) {
        DisplayGuesses();
        GuessComparison();
    }

    CheckAttempts();
}

function ValidGuess() {
    if (player_guess < 1 || player_guess > 99 || !Number.isInteger(Number(player_guess))) {
        document.querySelector("#guess_hint_higher").style.display = "none";
        document.querySelector("#guess_hint_lower").style.display = "none";

        document.querySelector("#guess_error").style.display = "inline";

        return false;
    }

    document.querySelector("#guess_error").style.display = "none";

    return true;
}

function DisplayGuesses() {
    guesses.push(player_guess);

    document.querySelector("#guesses").textContent += player_guess + " ";
}

function GuessComparison() {
    attempts++;

    if (player_guess == target_number) {
        wins++;

        document.querySelector("#guess_hint_higher").style.display = "none";
        document.querySelector("#guess_hint_lower").style.display = "none";

        document.querySelector("#win_text").textContent = `YOU WON IN ${attempts} ATTEMPTS`;
        document.querySelector("#win_text").style.display = "block";

        document.querySelector("#win_count").textContent = `WINS: ${wins}`;

        document.querySelector("#guess_button").style.display = "none";
        document.querySelector("#play_again_button").style.display = "inline";
    }

    if (player_guess < target_number) {
        document.querySelector("#guess_hint_higher").style.display = "block";
        document.querySelector("#guess_hint_lower").style.display = "none";
    }
    else if (player_guess > target_number) {
        document.querySelector("#guess_hint_higher").style.display = "none";
        document.querySelector("#guess_hint_lower").style.display = "block";
    }
}

function CheckAttempts() {
    document.querySelector("#attempts").textContent = `REMAINING ATTEMPTS: ${max_attempts - attempts}`;

    if (attempts == 7) {
        if (player_guess != target_number) {
            losses++;

            document.querySelector("#guess_hint_higher").style.display = "none";
            document.querySelector("#guess_hint_lower").style.display = "none";

            document.querySelector("#lose_text").textContent = "YOU LOST";
            document.querySelector("#lose_text").style.display = "block";

            document.querySelector("#target_number").textContent = `TARGET: ${target_number}`;
            document.querySelector("#target_number").style.display = "block";

            document.querySelector("#lose_count").textContent = `LOSSES: ${losses}`;
        }

        document.querySelector("#guess_button").style.display = "none";
        document.querySelector("#play_again_button").style.display = "inline";
    }
}

document.querySelector("#play_again_button").addEventListener("click", PlayAgain);

function PlayAgain() {
    guesses = [];

    document.querySelector("#guesses").textContent = "GUESS(ES): ";

    attempts = 0;

    document.querySelector("#attempts").textContent = `REMAINING ATTEMPTS: ${max_attempts - attempts}`;

    target_number = Math.floor(Math.random() * 99 + 1);
    console.log(target_number);

    document.querySelector("#guess_hint_higher").style.display = "none";
    document.querySelector("#guess_hint_lower").style.display = "none";

    document.querySelector("#win_text").style.display = "none";

    document.querySelector("#lose_text").style.display = "none";
    document.querySelector("#target_number").style.display = "none";

    document.querySelector("#guess_button").style.display = "inline";
    document.querySelector("#play_again_button").style.display = "none";
}