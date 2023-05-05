var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


document.addEventListener("keydown", function() {
    if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    }
});

function checkAnswer(currentLevel) {
    var currentLevel = userClickedPattern.length - 1;
// if statement
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        "success"

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
            "wrong"

        playSound("wrong");

        $("body").addClass(".game-over");
        setTimeout(function () {
            $("body").removeClass(".game-over"); 
        }, 2000);  

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
        }
    };   

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
};
   


//below: loop to get the buttons id to add the sound
for (let i = 0; i < buttonColours.length; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function(e){
       
       var userChosenColour = e.target.id;
       //below: to put in the end of the array and store the chosen color by the user.
       userClickedPattern.push(userChosenColour);

       playSound(userChosenColour);
       animatePress(userChosenColour);
       checkAnswer();
    }) 
};



function nextSequence() {
    userClickedPattern = [];
    level++
    $("#level-title").text("Level " + level);

    var randonNumber = Math.floor(Math.random() * 4);

    //below: random color chosen by PC, who is been stored in the end of the array "gamePattern".
    var randonChosenColour = buttonColours[randonNumber];
    gamePattern.push(randonChosenColour);

    //below: JQuery to flash the buttons.
    $("#" + randonChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

//below: A function to add the buttons sound.
function playSound(colour) {
    
    var audio = new Audio("/sounds/" + colour + ".mp3");
    audio.play();   
};

//below: to add an animation to the button whenever it is pressed.
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed"); setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    },100);
};