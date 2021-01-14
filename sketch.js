var path, boy, cash, diamond, jewelry, sword;
var pathImg, boyImg, cashImg, diamondImg, jewelryImg, swordImg, endImg;
var treasureCollection = 0;
var cashG, diamondG, jewelryG, swordG;

var play = 1;
var end = 0;
var gamestate = play;

function preload() {
  pathImg = loadImage("Road.png");
  boyImg = loadImage("Runner-1.png", "Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondImg = loadImage("diamonds.png");
  jewelryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  path = createSprite(width / 2, 200);
  path.addImage(pathImg);
  path.velocityY = 8;

  boy = createSprite(width / 2, height - 20, 20, 20);
  boy.addAnimation("running",boyImg);
  boy.scale = 0.08;

  cashG = new Group();
  diamondG = new Group();
  jewelryG = new Group();
  swordG = new Group();
}

function draw() {

  if (gamestate === play) {
    background(0);
    boy.x = World.mouseX;

    edges = createEdgeSprites();
    boy.collide(edges);

    if (path.y > height) {
      path.y = height / 2;
    }
    createCash();
    createDiamonds();
    createJewelry();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection + 50;
    } else if (diamondG.isTouching(boy)) {
      diamondG.destroyEach();
      treasureCollection = treasureCollection + 100;

    } else if (jewelryG.isTouching(boy)) {
      jewelryG.destroyEach();
      treasureCollection = treasureCollection + 150;

    } else 
      if (swordG.isTouching(boy)) {
        gamestate = end;
      }
    
    if(gamestate===end){
      boy.addAnimation("running",endImg);
      boy.x = width / 2;
      boy.y = height / 2;
      boy.scale = 0.6;
      
      path.velocityY=0;
      
      cashG.destroyEach();
      diamondG.destroyEach();
      jewelryG.destroyEach();
      swordG.destroyEach();
  
      cashG.setVelocityYEach(0);
      diamondG.setVelocityYEach(0);
      jewelryG.setVelocityYEach(0);
      swordG.setVelocityYEach(0);
    }
      
     drawSprites();
    
      textSize(20);
  fill("white");
  text("Treasure: "+ treasureCollection,width-150,30);
    }
  }

function createCash() {
  if (World.frameCount % 75 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 10;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 50 == 0) {
  var diamond = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamond.addImage(diamondImg);
  diamond.scale=0.03;
  diamond.velocityY = 15;
  diamond.lifetime = 180;
  diamondG.add(diamond);
}
}

function createJewelry() {
  if (World.frameCount % 100 == 0) {
  var jewelry = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jewelry.addImage(jewelryImg);
  jewelry.scale=0.13;
  jewelry.velocityY = 20;
  jewelry.lifetime = 180;
  jewelryG.add(jewelry);
  }
}

function createSword(){
  if (World.frameCount % 200 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 25;
  sword.lifetime = 180;
  swordG.add(sword);
  }
}