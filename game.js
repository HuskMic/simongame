var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Check for keypress to start game
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$("#level-start").click(function() {
  if (!started) {

    $("#level-start").hide();
    nextSequence();
    started = true;
  }
});

// add button click to click pattern
$(".btn").click(function(){

  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

//check clicked pattern against game pattern
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {


    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {


    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();


      $("body").addClass("game-over");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key To Restart");
      $("#level-start").show();
      
      startOver();

  }

}

//start new sequence
function nextSequence() {

  userClickedPattern = [];

  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);


}

//start game over
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

//flay audio
function playSound(name) {
  var audioClick = new Audio("sounds/" + name + ".mp3");
  audioClick.play();
}

// animate button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
