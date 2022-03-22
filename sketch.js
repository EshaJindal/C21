var PLAY = 1;
var END = 0;
var gameState = PLAY;

var jungle, jungleImg
var baseGroup, baseImage
var monkey,monkey_Image

var score
var gameOver, gameOverImg, restart, restartImg

function preload(){
  //loading images 
jungleImg= loadImage("jungle.jpg");
monkey_Image= loadImage("monkey.png");
baseImage= loadImage("base.png");
gameOverImg= loadImage("GAMEOVER.jpg");
restartImg= loadImage("restart.png")
}

function setup() {

  //creating canvas
    createCanvas(windowWidth,windowHeight);

    //creating jungle, giving it a velocity and adding Image
    jungle = createSprite(windowWidth/2,windowHeight/2,1400,800);
   jungle.addImage("jung", jungleImg);
   jungle.scale= 3.35;
   

    //creating monkey+ adding the image
    monkey = createSprite(150,160,20,50);
    monkey.addImage("monk",monkey_Image );
    monkey.scale=0.08;

    //creating groups
    baseGroup = createGroup();
    monkey.setCollider("rectangle",0,0,1100,1100);
  monkey.debug = false;

  //invisible ground
  invisibleGround = createSprite(700,525,1500,10);
  invisibleGround.visible = false;

  score=0;
}

function draw() {
//background color
background("white")

// DISPLAYING SCORE
textSize(20);
  fill("black")
text("Score: "+ score, 500,50);
//score.depth= jungle.depth+1

//gameState play
if(gameState === PLAY){

  jungle.velocityX = -(4 + 3* score/100)

    //scoring
    score = score + Math.round(getFrameRate()/60);
    score.depth= jungle.depth+1;
    
    //infinite background
    if (jungle.x < 270){
        jungle.x = 900;
      }
      jungle.velocityX=-2
      //when pressed space the monkey should jump
      if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    
    }

    //when pressed right monkey shoud move right
    if(keyWentDown("right")){
      monkey.velocityX= 2
    }

    //when pressed eft monkey should move left
    if(keyWentDown("left")){
      monkey.velocityX= -2
    }

    //GRAVITY
    monkey.velocityY = monkey.velocityY + 0.8

    //STOPPING MONKEY FROM FALLING DOWN
    monkey.collide(invisibleGround);

    //monkey can rest on the bases
    monkey.collide(baseGroup);

    //GROUPS
    spawnBase();

    //when gameState should be END
   if(monkey.y>475 ){
    gameState = END;
}
if(monkey.x<5){
  gameState = END;
}
}

else if (gameState === END) {
  //gameOverImage
  gameOver = createSprite(600,250);
    gameOver.addImage("over",gameOverImg );
    gameOver.scale= 0.3;

    //reset
    restart = createSprite(615,325);
    restart.addImage("reset",restartImg );
    restart.scale= 0.25;

 //no velocity to objects
 jungle.velocityX = 0;
  monkey.velocityY = 0
  
  //set lifetime of the game objects so that they are never destroyed
baseGroup.setLifetimeEach(-1);

 //0 velocity to the platform
 baseGroup.setVelocityXEach(0);    

 if(mousePressedOver(restart)) {
  reset();
  touches = []
}

}
  
drawSprites();
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  baseGroup.destroyEach();
  
  score = 0;
  

}
function spawnBase() {
  //write code here to spawn the bases
  if (frameCount % 150 === 0) {
    var base = createSprite(600,120,40,10);
    base.y = Math.round(random(120,400));
    base.addImage(baseImage);
    base.scale = 0.25;
    base.velocityX = -3;
    
     //assign lifetime to the variable
    base.lifetime = 200;
       
    //add each cloud to the group
    baseGroup.add(base);
  }
}