$(document).ready(function(){
//My JS starts past this point.

//Global Variables and Objects
    //Game States
    let gameOn = false;
    let questionScreenUp = false;
    let answerScreenUp = false;
    let resultsScreenUp = false;
    let currentQuestion = 1;
    let currentAnswer;
    let isUnanswered;

    //Timer Variables
    let intervalId;
    let clockRunning = false;
    let qTime = 15;
    let aTime = 5;

    //Results Variables 
    let totalTime = 0;
    let correctAs = 0;
    let inCorrectAs = 0;
    let unAnsweredQs = 0;

    //HTML Object References
    const startButton = $(".start-button");
    const playAgainButton = $(".playAgainButton");
    const answerButtons = $(".answerButtons");
    //Endings Scenarios Reference
    const noInteractionWin = $(".noInteractionWin");
    const totalFail = $(".totalFail");
    const minorFail = $(".minorFail");
    const minorSuccess = $(".minorSuccess");
    const totalSuccess = $(".totalSuccess");

    //Question Object which acts as game information database.
    const questions = {
        1: {
            question: "place-holder 1",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        2: {
            question: "place-holder 2",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        3: {
            question: "place-holder 3",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        4: {
            question: "place-holder 4",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        5: {
            question: "place-holder 5",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        6: {
            question: "place-holder 6",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        7: {
            question: "place-holder 7",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        8: {
            question: "place-holder 8",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        9: {
            question: "place-holder 9",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
        10: {
            question: "place-holder 10",
            answer: "correct answer",
            selection : {
                1: "correct answer",
                2: "false answer1",
                3: "false answer2",
                4: "false answer3"},
            unansweredText: "Why didn't you answer?",
            correctText: "place-holder: you got it correct!",
            incorrectText: "place-holder: you got it wrong!"},
    }

//Constructors and Prototypes


//Event-Triggered Functions

startButton.click( function() {
    if (gameOn === true || questionScreenUp === true || answerScreenUp === true || resultsScreenUp === true) {
        return false;
    }
    gameFunctions.startGame()
});

playAgainButton.click( function() {
    if (gameOn === true || questionScreenUp === true || answerScreenUp === true) {
        return false;
    }
    //Resets the screen state.
    answerScreenUp = false;
    resultsScreenUp = false;
    //Reset question number.
    currentQuestion = 1;
    //Reset Results Variables 
    totalTime = 0;
    correctAs = 0;
    inCorrectAs = 0;
    unAnsweredQs = 0;
    gameFunctions.startGame();
});

answerButtons.click( function() {
    if (gameOn === false || questionScreenUp === false || answerScreenUp === true || resultsScreenUp === true) {
        return false;
    }
    //This Function first compares the clicked button to the correct answer to determine if it's true.
    if (this.textContent === questions[currentQuestion].answer) { //If the clicked button is correct...
        //Increase the number of correct guesses by 1.
        ++correctAs;
        currentAnswer = true;
        gameFunctions.stopQuestionTime();
    } else {     //If the clicked button is incorrect...
        //Increase the number of incorrect guesses by 1.
        ++inCorrectAs;
        currentAnswer = false;
        gameFunctions.stopQuestionTime();
    }
});

//Defined Functions

const gameFunctions ={
    //A function that starts the game.
    startGame : function() {
        //This function first changes the game state to "on"
        gameOn = true;
        //title text.
        $(".whale-diplomacy-title").text("Whale Diplomacy");
        //Then this function hides the start screen if it's not already hidden.
        if ($(".start-screen-row").hasClass("buryIt") !== true);
            $(".start-screen-row").addClass("buryIt");
        //Then this function hides the end screen if it's not already hidden.
        if ($(".end-screen-row").hasClass("buryIt") !== true);
            $(".start-screen-row").addClass("buryIt");
        //Then this function displays the QA screen
        $(".QA-screen-row").removeClass("buryIt");
        //then this function calls the question to be displayed.
        gameFunctions.nextQuestion();
    },
    //A function that grabs the information from the current question object and displays it.
    nextQuestion : function() {
        //If the question screen elements are hidden, reveal them.
        if ($(".question-screen-row").hasClass("buryIt")){
            $(".question-screen-row").removeClass("buryIt")
        }
        //Declare that the question screen is up.
        questionScreenUp = true;
        //if the answer buttons still have the correct or incorrect classes, remove them.
        for (var i = 1; i <= 4; i++) {
            let currentButton = ".aButton"+[i];
            let targetButton = $(currentButton);
            if (targetButton.hasClass("correctButton")) {
                targetButton.removeClass("correctButton");
            } else {
                if (targetButton.hasClass("incorrectButton")) {
                    targetButton.removeClass("incorrectButton");
                }
            }
        };
        //Then display the current question text.
        $(".question-text").text(questions[currentQuestion].question);
        //Establish an array that will represent the numbers of each answer button in the HTML.
        let unUsedButtons = [1, 2, 3, 4];
        //For four times, randomnly select a button and attach a selection text to it.
        for (var i = 1; i <= 4; i++) {
            //Determine which button number we are targeting randomly
            j = unUsedButtons[Math.floor(Math.random() * unUsedButtons.length)];
            console.log(unUsedButtons);
            //remove the button number so we don't use it twice.
            let jIndex = unUsedButtons.indexOf(j);
            if (jIndex > -1) {
                unUsedButtons.splice(jIndex, 1);
            }
            let currentButton = ".aButton"+[j];
            let targetButton = $(currentButton);
            let currentSelection = questions[currentQuestion].selection[i];
            targetButton.text(currentSelection);
        };
        //display the timer
        $(".questionTime").text(qTime);
        gameFunctions.questionTime(); //Then the timer countdown is called to begin
    },
    //A function that reveals the real answer.
    revealAnswer : function() {
        //First this function deactivates the question screen on state.
        questionScreenUp = false;
        //Second this function declares the answer is up.
        answerScreenUp = true;
        //Then it hides the Question Screen elements.
        $(".question-screen-row").addClass("buryIt");
        //Then, if the answer row elements are hidden it reveals the Answer Screen Elements.
        if ($(".answer-screen-row").hasClass("buryIt")){
            $(".answer-screen-row").removeClass("buryIt");
        }
        if ($(".nextQ-timer-row").hasClass("buryIt")){
            $(".nextQ-timer-row").removeClass("buryIt");
        }
        //display the timer
        $(".nextQTime").text(aTime);
        //Then it determines if the answer was correct or incorrect by checking the currentAnswer state.
        if(currentAnswer !== true && isUnanswered === true) { //If it was unanswered...
            $(".incorrectORcorrect-text").text(questions[currentQuestion].unansweredText);
            $(".real-answer-text").text("The answer you DIDN'T GUESS is:" + questions[currentQuestion].answer);
        } else{
            if (currentAnswer === true) { //If it's correct...
                $(".incorrectORcorrect-text").text(questions[currentQuestion].correctText);
                $(".real-answer-text").text("The answer was:" + questions[currentQuestion].answer);
            } else{
                $(".incorrectORcorrect-text").text(questions[currentQuestion].incorrectText);
                $(".real-answer-text").text("The real answer is:" + questions[currentQuestion].answer);
            }
        }
        //Then it runs another function that determines the correct answer button and gives it a style class.
        gameFunctions.isButtonCorrect();
        //Then it reveals the next question timer and calls the function that starts it counting down.
        gameFunctions.nextQuestionTime();
    },
    //A function that determines if a button contains a correct or incorrect answer and adds an appropriate class.
    isButtonCorrect : function() {
        //A for loop to go through all for answer buttons
        console.log(currentQuestion);
        for (var i = 1; i <= 4; i++) {
            let currentButton = ".aButton"+[i];
            let targetButton = $(currentButton);
            console.log(targetButton);
            console.log(targetButton.textContent);
            if (targetButton.textContent === questions[currentQuestion].answer) {
                targetButton.addClass("correctButton")
            } else {
                targetButton.addClass("incorrectButton")
                }
            }
    },
    //A function that reveals the results of the game.
    revealResults : function() {
        //First, turn the game off.
        gameOn = false;
        resultsScreenUp = true;
        //Second, hide the QA screen elements.
        $(".QA-screen-row").addClass("buryIt");
        //Reveal the end game screen.
        $(".end-screen-row").removeClass("buryIt");
        //Display the variables that contain the results of the questions and time.
        $(".timeResults-row").text(totalTime);
        $(".rightResults-row").text(correctAs);
        $(".wrongResults-row").text(inCorrectAs);
        $(".unansweredNum-row").text(unAnsweredQs);
        //Based off of the number of correct answers (or unanswered questions) display an end-game scenario.
        if (unAnsweredQs === 10) {
            noInteractionWin.removeClass("buryIt");
        } else {
            if (correctAs === 0) {
                totalFail.removeClass("buryIt");
            } else {
                if (correctAs <= 5) {
                    minorFail.removeClass("buryIt");
                } else {
                    if (correctAs < 10) {
                        minorSuccess.removeClass("buryIt");
                    } else {
                        totalSuccess.removeClass("buryIt");
                    }
                }
            }
            
        }
    },
    //Function that runs the question timer countdown.
    questionTime : function() {
        //If statement that setsthe game state to running, set's the second interval, triggering the countdown function.
        if (!clockRunning) {
            clockRunning = true;
            intervalId = setInterval(gameFunctions.questionCountDown, 1000);
        }
    },
    //Countdown function triggered every second.
    questionCountDown : function() {
            --qTime //reduce the timer
            ++totalTime //add to the total time it takes for the player to answer the questions.
            $(".questionTime").text(qTime); //display the time remaining
            if (qTime === 0) {
                ++unAnsweredQs
                isUnanswered = true;
                gameFunctions.stopQuestionTime(); //On 0 seconds remaining, trigger the stop timer function.
            };
    },      
    //Function that stops the timer, and calls the next action.
    stopQuestionTime : function() {
        if (clockRunning === true) {
            clockRunning = false;
        }
        clearInterval(intervalId);
        qTime = 15;
        gameFunctions.revealAnswer();
    },
    //Function that runs the next question timer countdown.
    nextQuestionTime : function() {
        //If statement that setsthe game state to running, set's the second interval, triggering the countdown function.
        if (!clockRunning) {
            clockRunning = true;
            intervalId = setInterval(gameFunctions.answerCountDown, 1000);
        }
    },
    //Countdown function triggered every second.
    answerCountDown : function() {
            --aTime //reduce the answer timer
            $(".nextQTime").text(aTime); //display the time remaining
            if (aTime === 0) {
                if (clockRunning === true) {
                    clockRunning = false;
                };
                gameFunctions.stopAnswerTime(); //On 0 seconds remaining, trigger the stop answer timer function.
                if (currentQuestion === 10) {
                    gameFunctions.revealResults();
                } else {
                    ++currentQuestion;
                    gameFunctions.nextQuestion(); //triggers the next question
                };
            };
    },      
    //Function that stops the timer, and hides the answer elements.
    stopAnswerTime : function() {
        if (clockRunning === true) {
            clockRunning = false;
        }
        clearInterval(intervalId);
        aTime = 5;
        $(".answer-screen-row").addClass("buryIt");
        $(".nextQ-timer-row").addClass("buryIt");
        answerScreenUp = false;
        isUnanswered = false;
    },
    //The idea and form of this function, while I understand it and wish I thought of it before searching for it, came originally from an answer on StackOverflow, by CoolAJ86 at "https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array".
    //This function is used to shuffle the allButtons array so that the buttons are populated with selections at random.
    shuffle : function (allButtons) {
        var currentIndex = allButtons.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = allButtons[currentIndex];
            allButtons[currentIndex] = allButtons[randomIndex];
            allButtons[randomIndex] = temporaryValue;
        }
        return allButtons;
    }
}


//Global Event Captures



//My JS Ends beyond this point.
});


//rough draft area




