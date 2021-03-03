var END =0;
var PLAY =1;
var gameState = PLAY;

var path,mainRacer, yellow, red;
var pathImg, mainRacerImg, yellowImg, redImg;
var distance=0;
var gameOver;
function preload(){
  pathImg = loadImage("images/Road.jpg");
  mainRacerImg = loadImage("images/mainRacer.png");
  yellowImg = loadImage("images/yellow.png");
  redImg = loadImage("images/blue.png");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(650,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy racing
mainRacer  = createSprite(70,150);
mainRacer.addImage(mainRacerImg);
mainRacer.scale=0.2;
mainRacer.setCollider("rectangle", 0, 0, 700, 200);
  
gameOver = createSprite(320, 150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.7;
gameOver.visible = false;
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill("purple");
  text("Distance: "+ distance,480,30);
  
  if(gameState===PLAY){
  
   mainRacer.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainRacer.collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if(World.frameCount % 150 == 0){
    if(select_oppPlayer == 1){
      redRacer();
    }else if(select_oppPlayer == 2){
      yellowRacer();
    }
  }  
  
   distance = distance+Math.round(getFrameRate()/50);

    path.velocityX = -(6+ 2*distance/100);
    
    
  if(yellowCG.isTouching(mainRacer)){
     gameState = END;
     yellowC.velocityX = 0;
    }
    
  if(redCG.isTouching(mainRacer)){
     gameState = END;
     redC.velocityX = 0;
     carCrashSound.play();
    }
  }

  if(gameState === END){
    gameOver.visible = true;
    song.stop();
    textSize(20);
    fill("turquoise");
    text("Press Up Arrow to Restart the game!", 160, 250);
    
    path.velocityX = 0;
    mainRacer.velocityY = 0;
   
    yellowCG.setVelocityXEach = (0);
    redCG.setVelocityXEach = (0);
    
    yellowCG.setLifetimeEach(-1);
    redCG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")){
      reset();
    }
  }
} 
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance = 0;
}
 
function yellowRacer(){
  yellowC = createSprite(1100, Math.round(random(50, 250)));
  yellowC.scale = 0.4;
  yellowC.setCollider("rectangle", 0, 10, 400, 100);
  yellowC.addImage(yellowImg);
  yellowC.velocityX = -(6 + 2*distance/150);
  yellowC.setLifetime = 170;
  yellowCG.add(yellowC);
}
function redRacer(){
  redC = createSprite(1100, Math.round(random(50, 250)));
  redC.scale = 0.5;
  redC.addImage(redImg);
  redC.velocityX = -(6 + 2*distance/150);
  redC.setLifetime = 170;
  redCG.add(redC);
}