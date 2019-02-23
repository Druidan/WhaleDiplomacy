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
    let qTime = 20;
    let aTime = 10;

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
            question: "Let's start out with an easy question to see if your tiny human brain can handle it. Which type of whale, amongst our mighty kind, is the biggest?",
            answer: "The Blue Whale",
            selection : {
                1: "The Blue Whale",
                2: "The Killer Whale",
                3: "The Sperm Whale",
                4: "The North Atlantic Right Whale",},
            unansweredText: "You didn't answer the question. Why? Are you too stunned by our titanic sizes?",
            correctText: "Correct. You have pleased Gilebrand, whome you see below. You know he is pleased because he has not crushed you beneath his fins yet.",
            incorrectText: "Ha! Incorrect, human! Look at Charles laughing at your pathetic intelligence down there!",
            correctImg: "swimming_whale.gif",
            incorrectImg: "mouthOpenWhale.jpg",
            correctImgClass: "cImg1",
            incorrectImgClass: "icImg1",},
        2: {
            question: "Let us continue, human. There are two types of whales. Which of these pairs are the correct names for these two types?",
            answer: "Baleen Whales and Toothed Whales",
            selection : {
                1: "Baleen Whales and Toothed Whales",
                2: "Baleen Whales and Humped Whales",
                3: "Arctic Whales and Tropical Whales",
                4: "Breeching Whales and Toothed Whales",},
            unansweredText: "Again, you remain silent. Are you taking this seriously, human?",
            correctText: "Correct, human! You have made Jeremy happy enough to anime sparkle! Would you look at that!",
            incorrectText: "Wrong, human! You make Jeremy down there laugh. He is a Toothed Whale, you know. Can you imagine what he wants to use those teeth for?",
            correctImg: "sparkleWhale.gif",
            incorrectImg: "killerWhaleLaughing.gif",
            correctImgClass: "cImg2",
            incorrectImgClass: "icImg2"},
        3: {
            question: "Speaking of Toothed Whales, did you know that we have a superior sense that allows us to find obstacles and prey, such as yourself, in the water using sound waves? What is that ability called?",
            answer: "Echolocation",
            selection : {
                1: "Echolocation",
                2: "The Doppler Effect",
                3: "Sonar",
                4: "Reverberative Hearing",},
            unansweredText: "I see you remain silent out of fear for our superior senses!",
            correctText: "Correct! It seems that your meger intelligence has interested Meagan, our top-ranking beluga.",
            incorrectText: "Wrong, human! Meagan, the beluga, will echolocate all of your children, and she will feast!",
            correctImg: "interested_beluga.gif",
            incorrectImg: "whaleEatChild.gif",
            correctImgClass: "cImg3",
            incorrectImgClass: "icImg3",},
        4: {
            question: "Some of us have been planning for this war for long before we even evolved higher intelligence, human. What is the name of the whale with the horn weapon on its head?",
            answer: "The Narwhal",
            selection : {
                1: "The Narwhal",
                2: "The Orca",
                3: "The Minke",
                4: "The Bowhead",},
            unansweredText: "You remain silent yet again. Perhaps you will make sounds when our Narwhal army comes.",
            correctText: "Correct, human! Our Narwhals have become quite skilled with their horns. Watch Melissa juggle the hoop.",
            incorrectText: "Incorrect, human! You will know their name when our armies of Narwhal come for you!",
            correctImg: "narwhal_dribbble.gif",
            incorrectImg: "narwhalArmy.gif",
            correctImgClass: "cImg4",
            incorrectImgClass: "icImg4",},
        5: {
            question: "You look dazed, human. Perhaps I will give you an easy question so that you do not faint before we can finish the game. When one of your foul whale murderers yells 'Thar she blows!,' what part of our anatomy is that murderer referencing?",
            answer: "The Blowhole",
            selection : {
                1: "The Blowhole",
                2: "The Dorsal Fin",
                3: "The Tail",
                4: "The Head ",},
            unansweredText: "Your continued silence bores me human.",
            correctText: "Correct! As a reward, you may now praise us.",
            incorrectText: "Wrong! Human, you have failed on such an easy question. We sneer at your paltry intelligence!",
            correctImg: "praiseWhale.gif",
            incorrectImg: "sneering_whale.gif",
            correctImgClass: "cImg5",
            incorrectImgClass: "icImg5",},
        6: {
            question: "What is the common name given to the two wings on a whale’s tail fin?",
            answer: "Flukes",
            selection : {
                1: "Flukes",
                2: "Sails",
                3: "Vestigial Flaps",
                4: "Gliders",},
            unansweredText: "Perhaps your presence here is just as much a fluke as our tail fins are?",
            correctText: "Correct! Perhaps your presence here is not a fluke after all? As a reward, here is our prototype flying whale. Even your planes will be no match for us!",
            incorrectText: "Incorrect, human! Perhaps your presence here was a fluke after all?",
            correctImg: "flyingWhale.gif",
            incorrectImg: "nopeWhales.gif",
            correctImgClass: "cImg6",
            incorrectImgClass: "icImg6",},
        7: {
            question: "The wisest among you often come to watch us and bathe in our glory, but you often give our actions strange names. What is the behavior called when we slap the water with our tails?",
            answer: "Lobtailing",
            selection : {
                1: "Lobtailing",
                2: "Dovetailing",
                3: "Breaching",
                4: "A Breach Slap",},
            unansweredText: "My fellow whales, I believe they have sent us either a mute or an idiot. Perhaps both?",
            correctText: "Yes, human. Such a boring name. I would have prefered 'breach slap' myself. It is a much better name.",
            incorrectText: "Incorrect, human! And it should be called a breach slap! I breach slap you, human!",
            correctImg: "orca-yes.gif",
            incorrectImg: "breachslap.gif",
            correctImgClass: "cImg7",
            incorrectImgClass: "icImg7",},
        8: {
            question: "It is said that when one of your kind truly loves another that they would walk 1,000 miles to see them. THAT IS NOTHING. Our Gray Whales travel the farthest of all mammals on earth just because they like it! What is the longest distance they will travel when they migrate?",
            answer: "10,000 Miles",
            selection : {
                1: "3,000 Miles",
                2: "8,000 Miles",
                3: "10,000 Miles",
                4: "6,000 Miles",},
            unansweredText: "If you are too stunned to speak by such a great distance, then I imagine you will faint when you see that we have developed bionic legs! You are not safe on land, human!",
            correctText: "Correct, human! Are not whales the greatest species on earth? Watch Ferdinand dance below and tell me we are not the most beautiful of all creatures!",
            incorrectText: "Wrong, human! And if you think that distance is great, what will you think when you realize the land is no longer a barrier to us? Behold! We have developed bionic legs!",
            correctImg: "beautifulWhale.gif",
            incorrectImg: "leggedWhale2.gif",
            correctImgClass: "cImg8",
            incorrectImgClass: "icImg8",},
        9: {
            question: "As you can imagine, creatures of our impressive size can eat quite a bit! How much of the tiny shrimp like krill can an average blue whale consume during the summer feeding season?",
            answer: "Over 10,000 Pounds",
            selection : {
                1: "Over 14,000 Pounds",
                2: "Over 7,000 Pounds",
                3: "Over 2,000 Pounds",
                4: "Over 10,000 Pounds",},
            unansweredText: "The quiz is almost done, human, and if you continue to remain silent, so shall your kind be.",
            correctText: "Exactly! And we all agree that we love to eat!",
            incorrectText: "Wrong, human! I wonder how many humans that amount translates to. Barbara, let's test it on one of this one's party. Well, there they go.",
            correctImg: "Whales_Agree.gif",
            incorrectImg: "attackingWhale.gif",
            correctImgClass: "cImg9",
            incorrectImgClass: "icImg9",},
        10: {
            question: "You may believe your kind is past its barbaric history, and that you are no longer the same as those who hunted us in centuries past. Bah! Do you know how many whales were killed in the 20th Century?",
            answer: "Over 3 Million",
            selection : {
                1: "Over 1 Million",
                2: "Over 100,000",
                3: "Over 3 Million",
                4: "Over 10,000",},
            unansweredText: "Your silence is deafening, human.",
            correctText: "Too true, human. This is what your kind has wrought. This is why our coming war is just. This is why you must perish. Let this marvelous sight be your last.",
            incorrectText: "No! No, human! So many more! My anger is boiling over!",
            correctImg: "breaching whale.gif",
            incorrectImg: "whalePacing.gif",
            correctImgClass: "cImg10",
            incorrectImgClass: "icImg10",},
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
            $(".end-screen-row").addClass("buryIt");
        //Then this function displays the QA screen
        $(".QA-screen-row").removeClass("buryIt");
        //then this function calls the question to be displayed.
        gameFunctions.nextQuestion();
    },
    //A function that grabs the information from the current question object and displays it.
    nextQuestion : function() {
        //If the question screen elements are hidden, reveal them.
        if ($(".question-screen-row").hasClass("buryIt")){
            $(".question-screen-row").removeClass("buryIt");
            $(".answers-row").removeClass("buryIt");
        }
        //Declare that the question screen is up.
        questionScreenUp = true;
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
        //Then it hides the answer buttons.
        $(".answers-row").addClass("buryIt");
        //Then, if the answer row elements are hidden it reveals the Answer Screen Elements.
        if ($(".answer-screen-row").hasClass("buryIt")){
            $(".answer-screen-row").removeClass("buryIt");
        }
        if ($(".nextQ-timer-row").hasClass("buryIt")){
            $(".nextQ-timer-row").removeClass("buryIt");
        }
        if ($(".answer-image").hasClass("buryIt")){
            $(".answer-image").removeClass("buryIt");
        }
        //display the timer
        $(".nextQTime").text(aTime);
        //Reveal the answer image area.
        $("answer-image").removeClass("buryIt");
        let cImage = questions[currentQuestion].correctImg
        let icImage = questions[currentQuestion].incorrectImg
        console.log(icImage);
        //Then it determines if the answer was correct or incorrect by checking the currentAnswer state.
        if(isUnanswered === true) { //If it was unanswered...
            $(".incorrectORcorrect-text").text(questions[currentQuestion].unansweredText); //Display text for an unanswered question.
            $(".real-answer-text").text("The answer you DIDN'T GUESS is:" + questions[currentQuestion].answer); //Displays the correct answer.
            $(".answer-image").append("<img class='currentImg " + questions[currentQuestion].incorrectImgClass + "' src='https://druidan.github.io/TriviaGame/assets/images/" + icImage + "'>"); //Add an image tag with image classes, and the image source
        } else{
            if (currentAnswer === true) { //If it's correct...
                $(".incorrectORcorrect-text").text(questions[currentQuestion].correctText); //Display text for a correct answer.
                $(".real-answer-text").text("The answer was:" + questions[currentQuestion].answer); //Displays the correct answer.
                $(".answer-image").append("<img class='currentImg " + questions[currentQuestion].correctImgClass + "' src='https://druidan.github.io/TriviaGame/assets/images/" + cImage + "'>"); //Add an image tag with image classes, and the image source
            } else{ //If it's wrong
                $(".incorrectORcorrect-text").text(questions[currentQuestion].incorrectText);  //Display text for an incorrect answer.
                $(".real-answer-text").text("The real answer is:" + questions[currentQuestion].answer); //Displays the correct answer.
                $(".answer-image").append("<img class='currentImg " + questions[currentQuestion].incorrectImgClass + "' src='https://druidan.github.io/TriviaGame/assets/images/" + icImage + "'>"); //Add an image tag with image classes, and the image source
            }
        }
        //Then it reveals the next question timer and calls the function that starts it counting down.
        gameFunctions.nextQuestionTime();
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
        qTime = 20;
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
        aTime = 10;
        $(".currentImg").remove();
        $(".answer-screen-row").addClass("buryIt");
        $(".answer-image").addClass("buryIt");
        $(".nextQ-timer-row").addClass("buryIt");
        answerScreenUp = false;
        isUnanswered = false;
    },
}

//Global Event Captures



//My JS Ends beyond this point.
});


//rough draft area




