var PLAY = 1;
var END = 0;
//var SERVE;
var gameState = PLAY;
var cloud,cloudImg,bird,birdImage,button,buttonImg,trex,trexImg,getready,getreadyimage,gameover,gameOverImg,bg,backImg
var birdsGroup,cloudsGroup ;
var Score=0;


function preload() {
    birdImage = loadImage("enemybird.png");
    buttonImg = loadImage("utton.png");
    cloudImg = loadImage("angrycloud.png");
    trexImg = loadImage("trex1.png");
    getreadyimage = loadImage("image.png");
    backImg = loadImage("background.png");
    gameOverImg = loadImage("gameOver.png");
}

function setup(){
    createCanvas(1200,400);
    bg = createSprite(300,0,1200,700);
    bg.addImage(backImg);
    
    
    trex = createSprite(50,180,20,50);
    trex.addImage(trexImg);
    
    bird  =createSprite(1205,130,10,10);
    bird.addImage(birdImage);
    bird.scale=0.5
    
    cloud = createSprite(950,150,30,50);
    cloud.addImage(cloudImg);
    cloud.scale=0.8
    
    restart = createSprite(1205,300,1,1);
    restart.addImage(buttonImg);
    restart.scale=0.2
    restart.visible=false;

    getready = createSprite(200,200);
    getready.addImage(getreadyimage);
    getready.visible=true;

    gameover = createSprite(200,200);
    gameover.addImage(gameOverImg);
    gameover.visible = false;

    birdsGroup = new Group();
    cloudsGroup = new Group();

}

function draw(){
  background("black")
    // if(gameState === PLAY)
    // {
    //   getreadyimage.visible = true;
    //   //gameOverImg.visible = false;
    // }
    if(keyDown(UP_ARROW))
    {
      gameState = PLAY;
      //trex.visible = true;
      getready.visible = false;
      //gameOverImg.visible = false;
    }
    text("Score: "+ Score, 500,50);
  
  if (gameState===PLAY){
    bg.velocityX = -3;
    if(bg.x<0){
      bg.x = 600;
    }
  //gameOverImg.visible = false;
    if(keyDown("space")) {
      trex.velocityY = -12;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    spawnClouds();
    spawnBirds();
  
    if(birdsGroup.isTouching(trex)||cloudsGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
   bg.velocityX = 0;
   gameover.visible = true;

    restart.visible = true;
    
    //set velcity of each game object to 0
   
    trex.velocityY = 0;
    birdsGroup.destroyEach();
    cloudsGroup.destroyEach();
   
    birdsGroup.setLifetimeEach(0);
    cloudsGroup.setLifetimeEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }

    


  }
  drawSprites();
}

function reset(){
  gameState = PLAY;
 Score = 0;
 getready.visible = true;
 gameover.visible = false;
  restart.visible = false;
  
  birdsGroup.destroyEach();
  cloudsGroup.destroyEach();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImg);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}



function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var bird = createSprite(600,120,40,10);
    bird.y = Math.round(random(80,120));
    bird.addImage(birdImage);
    bird.scale = 0.5;
    bird.velocityX = -3;
    
     //assign lifetime to the variable
    bird.lifetime = 200;
    
    //adjust the depth
    bird.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    birdsGroup.add(bird);
  }
}


