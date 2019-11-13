

var buttonColours = ["pig", "villager", "chicken", "cat"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
        
        $("level-description").removeClass("blink");
        $("#level-title").text("Level " + level);
        $("#level-description").text("");
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
} else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    
    $("#level-title").text("Minecraft Memory");
    $("#level-description").text("Game over, press any key to restart");

    startOver();


}

}


$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});




function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);



}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}   

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


$('.blink').each(function() {
    var elem = $(this);
    setInterval(function() {
        if (elem.css('visibility') == 'hidden') {
            elem.css('visibility', 'visible');
        } else {
            elem.css('visibility', 'hidden');
        }    
    }, 500);
});