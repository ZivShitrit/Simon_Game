
var level = 0;
var started = false;

$(document).keypress(function(){
    if(!started){
        nextSequence();
        started = true;
    }
});

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

function nextSequence(){
    userClickedPattern = [];
    clicked = 0;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
}

var userClickedPattern = [];
var clicked = 0;

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(clicked);
  clicked++;
});

function playSound(name){
    var a = new Audio("./sounds/" + name + ".mp3");
    a.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {$("#"+currentColour).removeClass("pressed")}, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(currentLevel == level-1){
            setTimeout( function() { nextSequence(); }, 1000);
        }
    } 
    else{ 
        var a = new Audio("./sounds/wrong.mp3");
        a.play();
        $("body").addClass("game-over");
        setTimeout(function () {$("body").removeClass("game-over")}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}