var monkey, monkey_running, ground, backGroup, backGroudImg, banana, bananaImg, bananaGroup, obstacle, obstacleImg, score, obstacleGroup, cameraMove = "yes";

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backGroundImg = loadImage("jungle.jpg");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);

  score = 0;
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  backGround = createSprite(400, 30, 10, 10);
  backGround.addImage("Jungle",backGroundImg);
  backGround.scale = 1.19;
  
  ground = createSprite(300, 270, 800, 10);
  
  monkey = createSprite(45, 220, 10, 10);
  monkey.addAnimation("Moankey Running",monkey_running);
  monkey.scale = 0.13;
}


function draw(){
  background(255); 

  monkey.x = camera.position.x - 255;

  console.log(camera.position.x);

  if(camera.position.x < 700 || camera.position.x < -110){
    if(cameraMove === "yes"){
      camera.position.x += 10;
    }
  }  else{
    camera.position.x = 110;
  }

  ground.visible = false;
  
  bananaSpawn();
  stoneSpawn();
  
  // backGround.velocityX = -10;
  if(backGround.x < 0){
    backGround.x = backGround.width/2; 
  }
  
  if(keyDown("space")){
    monkey.velocityY = -15;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  if(bananaGroup.isTouching(monkey)){
     score = score + 2;
  }
  if(monkey.isTouching(obstacleGroup)){
    cameraMove = "no";
  }
  if(cameraMove === "no"){
    if(keyDown("space")){
      score = 0;
      camera.position.x = 300;
      cameraMove = "yes";
    }
  }

  switch(score){
      case 10 : monkey.scale = 0.15;
              break;
      case 20 : monkey.scale = 0.17;
              break;
      case 30 : monkey.scale = 0.19;
              break;
      case 40 : monkey.scale = 0.21;
              break;              
  }
  
  drawSprites();

  if(cameraMove === "no"){
    textSize(34);
    fill("black");
    text("Press Space to Continue", camera.position.x - 200, camera.position.y);
  }
  
  stroke("white");
  fill("white");
  textSize(20);
  text("Score: " + score, camera.position.x + 200, 50);
}
function bananaSpawn(){
  if(frameCount % 100 === 0){
    banana = createSprite(camera.position.x + 300, 260, 1, 1);
    banana.y = random(130, 250);
    if(cameraMove === "yes"){
      banana.velocityX = -10;
    }
    banana.addImage("Banana",bananaImg);
    console.log(frameCount);
    banana.scale = 0.07;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }
}
function stoneSpawn(){
  if(frameCount % 120 === 0){
    obstacle = createSprite(camera.position.x + 300, 250, 10, 10);
    if(cameraMove === "yes"){
      obstacle.addImage("Obstacle",obstacleImg);
    }
    obstacle.velocityX = -10;
    obstacle.scale = 0.2;
    obstacle.lifetime = 100;
    obstacleGroup.add(obstacle);
  }
}