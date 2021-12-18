var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var players, player1, player2;

var bg, form_bg, fish1_img, fish2_img;

function preload(){
  bg = loadImage("../images/bg.jpg");
  form_bg = loadImage("../images/fish_bg.jpeg");

  fish1_img = loadImage("../images/fish1.png");
  fish2_img = loadImage("../images/fish2.png");
 
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}
