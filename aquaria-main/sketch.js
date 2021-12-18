var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var obstacle, obstaclesGroup, food, foodsGroup;
var form, player, game;

var players, player1, player2,bground;

var bg, form_bg, fish1_img, fish2_img;

function preload(){
  bg = loadImage("../images/bg.jpg");
  form_bg = loadImage("../images/game_bg.jpg");

  fish1_img = loadImage("../images/fish1.png");
  fish2_img = loadImage("../images/fish2.png");
 
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-120);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  obstaclesGroup = new Group();
  foodsGroup = new Group();

}


function draw(){
  if(playerCount === 1){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    game.spawnObstacles();
    game.spawnFood();
    
    
  }
  if(gameState === 2){
    game.end();
  }
}
