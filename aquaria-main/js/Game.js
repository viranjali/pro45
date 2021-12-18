class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    image(form_bg, 0,0,displayWidth, displayHeight-150);

  
    bground = createSprite(displayWidth/2,displayHeight/2-200,displayWidth, displayHeight-50)
    player1 = createSprite(100,150);
    player1.addImage("player1",fish1_img);
   // player1.velocityY = 12;
 
//   player1.debug = true
   player1.setCollider("rectangle", 0 , 0, 120,100)
   // player2 = createSprite(100,400);
   // player2.addImage("player2",fish2_img);
    //player2.velocityY = 12;

    players = [player1];
   
  }

  play(){

    form.hide();
    form.showSuccess();
    
    Player.getPlayerInfo();
    
    bground.addImage(bg);
    bground.scale = 1.9;
    bground.velocityX = -2;
    if(bground.x <= displayWidth/2-50){
      bground.x = displayWidth/2;
    }

    //image(bg, 0,0,displayWidth, displayHeight-150);

    
    if(allPlayers !== undefined){
     
     // image(bg, 0,0,displayWidth, displayHeight-150);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x =100 ;
      var y = 150;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
         x = x ;
        //use data form the database to display the cars in y direction
        y = allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
        //  stroke(10);
        //  fill("red");
       //   ellipse(x,y,60,60);
        //  players[index - 1].shapeColor = "red";
        //  camera.position.x = displayWidth/2;
        //  camera.position.y = players[index-1].y;
        }
        if(players[index-1].isTouching(obstaclesGroup)){
          gameState = 2;
 
        }
        if(players[index-1].isTouching(foodsGroup)){
          foodsGroup.destroyEach();
          player.foodCount = player.foodCount+1;
          player.update();
 
        }

       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      console.log("Pressing Up Key")
      player.distance = player.distance-10;   
        player.update();
   }

 
   if(keyIsDown(DOWN_ARROW) && player.index !== null){
     player.distance = player.distance+10;   
     player.update();
 
   }

    if(player.distance > 560 || player.distance < 38){
      gameState = 2;
      console.log("game over")
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
  }
  spawnObstacles(){
    if(frameCount%50===0){
    obstacle = createSprite(displayWidth+10,Math.round(random(30,displayHeight-50)));
    //obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.3;
    obstaclesGroup.add(obstacle);
    }
  }
  spawnFood(){
    if(frameCount%60===0){
    food = createSprite(displayWidth+10,Math.round(random(30,displayHeight-50)));
    food.shapeColor = "red"
    //food.addImage(foodImage);

    food.velocityX = -6;
    food.scale = 0.3;
    foodsGroup.add(food)
    }
  }
}
