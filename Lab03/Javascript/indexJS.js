let quiz_taken = localStorage.getItem("quiz_taken");

if (quiz_taken == null) {
    quiz_taken = 0;
}

document.querySelector("#quiz_taken").textContent = `Total Times Quiz Taken: ${quiz_taken}`;

CheckboxQuestions();

function CheckboxQuestions() {
    let questions = ["Tien", "Goku", "Toppo", "Trunks", "Krillin"];

    questions = Shuffle(questions);

    for (let checkbox of questions) {
        let input = document.createElement("input");

        input.type = "checkbox";
        input.id = "_" + checkbox.toLowerCase();
        input.name = "check_" + checkbox.toLowerCase();
        input.value = checkbox.toLowerCase();

        let label = document.createElement("label");

        label.htmlFor = input.id;
        label.textContent = checkbox;

        document.querySelector("#checkbox_questions").append(input);
        document.querySelector("#checkbox_questions").append(label);
    }
}

function Shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

let current_score = 0;

document.querySelector("#submit_button").addEventListener("click", GradeQuiz);

function GradeQuiz() {
    quiz_taken++;
    
    localStorage.setItem("quiz_taken", quiz_taken);
    
    document.querySelector("#quiz_taken").textContent = `Total Times Quiz Taken: ${quiz_taken}`;

    current_score = 0;
    
    let text_answer = document.querySelector("#text_input").value;

    if (text_answer == "Quiz" || text_answer == "quiz") {
        current_score += 20;

        let image_correct = document.querySelector("#question1_image");

        image_correct.src = "Images/Image_Correct.png";
        image_correct.width = 15;
        image_correct.height = 15;

        document.querySelector("#question1_feedback").textContent = "Correct!";
        document.querySelector("#question1_feedback").style.color = "Green";
    } else {
        let image_incorrect = document.querySelector("#question1_image");

        image_incorrect.src = "Images/Image_Incorrect.webp";
        image_incorrect.width = 15;
        image_incorrect.height = 15;

        document.querySelector("#question1_feedback").textContent = "Incorrect: The name of this definition is 'Quiz'";
        document.querySelector("#question1_feedback").style.color = "Red";
    }

    let number_answer = document.querySelector("#number_input").value;

    if (number_answer == 2006) {
        current_score += 20;

        let image_correct = document.querySelector("#question2_image");

        image_correct.src = "Images/Image_Correct.png";
        image_correct.width = 15;
        image_correct.height = 15;

        document.querySelector("#question2_feedback").textContent = "Correct!";
        document.querySelector("#question2_feedback").style.color = "Green";
    } else {
        let image_incorrect = document.querySelector("#question2_image");

        image_incorrect.src = "Images/Image_Incorrect.webp";
        image_incorrect.width = 15;
        image_incorrect.height = 15;

        document.querySelector("#question2_feedback").textContent = "Incorrect: It released on May 15, 2006";
        document.querySelector("#question2_feedback").style.color = "Red";
    }

    let select_answer = document.querySelector("#select_input").value;

    if (select_answer == "los_santos") {
        current_score += 20;

        let image_correct = document.querySelector("#question3_image");

        image_correct.src = "Images/Image_Correct.png";
        image_correct.width = 15;
        image_correct.height = 15;

        document.querySelector("#question3_feedback").textContent = "Correct!";
        document.querySelector("#question3_feedback").style.color = "Green";
    } else {
        let image_incorrect = document.querySelector("#question3_image");

        image_incorrect.src = "Images/Image_Incorrect.webp";
        image_incorrect.width = 15;
        image_incorrect.height = 15;

        document.querySelector("#question3_feedback").textContent = "Incorrect: It takes place in Los Santos";
        document.querySelector("#question3_feedback").style.color = "Red";
    }

    let tien_checked = document.querySelector("#_tien").checked;
    let goku_checked = document.querySelector("#_goku").checked;
    let toppo_checked = document.querySelector("#_toppo").checked;
    let trunks_checked = document.querySelector("#_trunks").checked;
    let krillin_checked = document.querySelector("#_krillin").checked;
    let correct_checked_answer = !tien_checked && goku_checked && toppo_checked && trunks_checked && !krillin_checked;

    if (correct_checked_answer) {
        current_score += 20;

        let image_correct = document.querySelector("#question4_image");

        image_correct.src = "Images/Image_Correct.png";
        image_correct.width = 15;
        image_correct.height = 15;

        document.querySelector("#question4_feedback").textContent = "Correct!";
        document.querySelector("#question4_feedback").style.color = "Green";
    } else {
        let image_incorrect = document.querySelector("#question4_image");

        image_incorrect.src = "Images/Image_Incorrect.webp";
        image_incorrect.width = 15;
        image_incorrect.height = 15;

        document.querySelector("#question4_feedback").textContent = "Incorrect: The answer is Goku, Toppo, and Trunks";
        document.querySelector("#question4_feedback").style.color = "Red";
    }

    let radio_checked = document.querySelector("input[name=yes_no]:checked");
    let radio_answer = "";

    if (radio_checked) {
        radio_answer = radio_checked.value;
    }

    if (radio_answer == "true") {
        current_score += 20;

        let image_incorrect = document.querySelector("#question5_image");

        image_incorrect.src = "Images/Image_Correct.png";
        image_incorrect.width = 15;
        image_incorrect.height = 15;

        document.querySelector("#question5_feedback").textContent = "Correct!";
        document.querySelector("#question5_feedback").style.color = "Green";
    } else {
        let image_incorrect = document.querySelector("#question5_image");

        image_incorrect.src = "Images/Image_Incorrect.webp";
        image_incorrect.width = 15;
        image_incorrect.height = 15;

        document.querySelector("#question5_feedback").textContent = "Incorrect: Your options are literally True or False";
        document.querySelector("#question5_feedback").style.color = "Red";
    }

    if (current_score >= 80) {
        document.querySelector("#quiz_passed").textContent = `YOU PASSED! YOU SCORED ${current_score}/100`;
    } else {
        document.querySelector("#quiz_passed").textContent = `YOU FAILED! YOU SCORED ${current_score}/100`;
    }
}