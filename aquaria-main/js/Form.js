class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton('Reset');
    this.foodCount = createElement('h3');
    this.rules=createButton('Rules');
    this.playername =  createElement('h3');
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }
  showSuccess(){
    this.foodCount.html("Food Consumed: "+ player.foodCount);
    this.foodCount.position(displayWidth-450,30);


    player.name = this.input.value();

    this.playername.html("Name: "+ player.name);
    this.playername.position(displayWidth-450,5);



  }
 


  display(){
    this.title.html("ᗩᑫᑌᗩᖇIᗩ GᗩᗰE");
    this.title.position(displayWidth/2 - 50, 30);

    this.input.position(displayWidth/2 - 40 , displayHeight/2 - 140);
    this.button.position(displayWidth/2 + 20, displayHeight/2-40);
    this.reset.position(displayWidth-100,20);
    this.rules.position(50,20);
    swal("Rules of the Game", " 1. Player needs to collect atleast 20 items of Food\n"+
    "2. If player touches obstacle, the player will loose the game. \n"+
      "3. The player, who'll collect the food items first, will be the first winner. \n"
      );

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 70, displayHeight/4);
    
    });
    this.rules.mousePressed(()=>{
      swal("Rules of the Game", " 1. Player needs to collect atleast 20 items of Food\n"+
      "2. If player touches obstacle, the player will loose the game. \n"+
        "3. The player, who'll collect the food items first, will be the first winner. \n"
        );
    });
    

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
      database.ref('players').remove();
    });

  }
}
