var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
   if(!started){
     $("#level-title").text("LEVEL "+level);
  nextSequence();
  started=true;
  }
});


$(".btn").on("click",function(){

var userChosenColour=$(this).attr("id");
userClickPattern.push(userChosenColour);
animatePress(userChosenColour);
playSound(userChosenColour);
checkAnswer(userClickPattern.length-1);
});


function nextSequence(){
    userClickPattern=[];
  level++;
   $("#level-title").text("LEVEL "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}



function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}



function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel){
if(userClickPattern[currentLevel]===gamePattern[currentLevel]){
  if(userClickPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);

  }
}
else{
  var audiow=new Audio("sounds/wrong.mp3");
  audiow.play();
  $("body").addClass("game-over");
  setTimeout(function(){
      $("body").removeClass("game-over");

  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
   startOver();
  // console.log("wrong");
}

}


function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
