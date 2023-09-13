let game_pattern = [];
let user_pattern = [];
const colors = ["green", "yellow", "red", "blue"];

let game_started = false;
let game_level = 0;

$(document).keypress(function () {
  if (!game_started) {
    game_started = true;
    $(".level").text("Level " + game_level);
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
});

$(".box").click(function () {
  var user_input = $(this).attr("id");
  user_pattern.push(user_input);

  playAudio(user_input);
  animatePress(user_input);

  checkAnswer(user_pattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (game_pattern[currentLevel] === user_pattern[currentLevel]) {
    if (user_pattern.length === game_pattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playAudio("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $(".level").text("Game Over Press any Key to start");

    startOver();
  }
}

function startOver() {
  user_pattern = [];
  game_pattern = [];
  game_level = 0;
  game_started = false;
}

function nextSequence() {
  user_pattern = [];

  game_level++;
  $(".level").text(`Level  -  ${game_level}`);

  let random = Math.floor(Math.random() * 4);
  let random_color = colors[random];

  game_pattern.push(random_color);

  $(`#${random_color}`).fadeIn(100).fadeOut(100).fadeIn(100);

  playAudio(random_color);
}

function checkUserInput() {}

function animatePress(id) {
  $(`#${id}`).addClass("pressed");
  setTimeout(function () {
    $(`#${id}`).removeClass("pressed");
  }, 100);
}

function playAudio(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
