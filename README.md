# Whale Diplomacy
The Whale Wars are upon us, and only your trivia skills give us any hope of averting the coming calamity! 

## Overview and Goals
Whale Wars is a silly timed trivia game that, aside from being a fun way to pass some free time, is also meant to be a way to display my knowledge and use of jQuery, and using window object methods like setInterval.

## Deployment 
This game will be deployed at the following page via GitHub Pages - [Whale Wars](https://druidan.github.io/WhaleDiplomacy/).  

## MVP
* The basic game mechanics have to be fully functional and implemented:
    * The user must be presented with a start screen and instructional test.
    * Once the user has clicked the start button, the game must progress through a multiple choice quiz with a timer on each question. 
    * Upon selecting an answer, or no answer, the game must progress to a screen with the correct answer for a short time before automatically continuing on to the next question.
    * The game must keep track of the user's score and statistics throughout.
    * After the final question has been dealt with, an end game screen displaying information such as their score and the results of the game's story must be displayed.
    * The game must present the user with the ability to play again to try for a different outcome.
* Each slide must have an appropriate image to the quiz's theme (whales, in this case).
* The app must use jQuery to interact with the HTML nodes, hiding and revealing them as nessesary.
* The app must have clear and appropriate CSS.

## Dependencies
_There are currently no dependancies._

## Active Bugs and Issues
_There are currently no bugs that I am aware of._

## Future Features / Icebox
* I plan on a full revision of the code with the following goals:
    * Maintain the use of jQuery to display my skills with it.
    * Modularize the code, seperating it up into discrete files that can be imported into a main file - especially the quiz questions object.
    * Bring in later improvements I made to my code, such as the class version of the sound object.
    * Make the code more efficient in terms of space and steps required to complete tasks.
    * Add specific and clear comments to the code.
* Make an alternate version of the game that ditches jQuery for vanilla JS or React, and uses a database for holding the quiz questions and assets.