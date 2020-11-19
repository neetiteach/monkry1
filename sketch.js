//Variable declaration
var monkey , monkey_run,monimg;
var bananaImg,obsImg;
var foodgrp, obtgrp,ground;
var score=0;
var gstate=0;
var iground;

//loading images n animations
function preload(){
  
  
  monkey_run =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monimg=loadAnimation("sprite_0.png");
  bananaImg = loadImage("banana.png");
  obsImg = loadImage("obstacle.png");
  
}

/*creating monkey,ground as spriteobject n adding       obtgrp n foodgrp*/ 

function setup() {
  createCanvas(600,400);
  
  monkey=createSprite(90,320,20,20);
  monkey.addAnimation("running",monkey_run);
  monkey.addAnimation("stop",monimg);
  monkey.scale=0.1;
  
  ground=createSprite(300,387,600,5);
  
  iground=createSprite(300,390,600,5);
  iground.visible=false;
  
  
  foodgrp=createGroup();
  obtgrp=createGroup();
  
}


function draw() {
  background("skyblue");
   
   if (gstate===0){
    score+=Math.round(frameCount/60);
    ground.velocityX=-7;
    if(ground.x<0){
      ground.x=ground.width/2;
    }
  
    if(keyDown("space")){
      monkey.velocityY=-12;
    }
      monkey.velocityY+=0.8;
      monkey.collide(iground);
       
     sfood();
     sopt();
     
    if(monkey.isTouching(foodgrp)){
        foodgrp.destroyEach(); 
    }
   
    if(monkey.isTouching(obtgrp)){                          gstate=1;
     }
   }else
    {
       ground.velocityX = 0;
        monkey.velocityY = 0;
        obtgrp.setVelocityXEach(0);
        foodgrp.setVelocityXEach(0);
        obtgrp.setLifetimeEach(-1);
        foodgrp.setLifetimeEach(-1);
        monkey.changeAnimation("stop",monimg);   
    }
   drawSprites();
   textSize(30);
   fill("red");
   text("Survival Time-"+score,200,100);
}

//function create food
function sfood(){
  
  if(frameCount%80===0){
     var food=createSprite(600,50,40,30);
     food.addImage(bananaImg);
     food.scale=0.1;
     food.velocityX=-6;
     food.y=Math.round(random(120,180));
     food.lifetime=100;
     food.depth=monkey.depth;
     monkey.depth++;
     foodgrp.add(food);
  }
  
}

//function to create obstacles
function sopt(){
  if(frameCount%300===0){
     var obt=createSprite(600,360,40,30);
     obt.addImage(obsImg);
     obt.scale=0.15;
     obt.velocityX=-6;
     obt.lifetime=150; 
     obtgrp.add(obt);
    
  }
  
}
