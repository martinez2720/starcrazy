  
var fundoImg, fundo;
var fogueteImg, foguete;
var estrelaImg, estrela, estrelasGroup;
var meteoro, meteoroImg, meteorosGroup;
var raio, raioImg;
var restart, restartImg;
var gameOver, gameOverImg;
var score;
var gameState = "play"


function preload(){
  fundoImg = loadImage("fundo.jpg");
  fogueteImg = loadImage("foguete.webp");
  estrelaImg = loadImage("estrela.wepb");
  meteoroImg = loadImage("meteoro.png");
  raioImg= loadImage("raio.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
}

function setup() {
  createCanvas(600,600);
  fundo = createSprite(300,300);
  fundo.addImage("fundo",fundoImg);
  fundo.velocityY = 1;
  
  meteorosGroup = new Group();
  estrelasGroup = new Group();

  foguete = createSprite(200,200,20,20);
  foguete.scale = 0.1;
  foguete.addImage("foguete", fogueteImg);

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  score= 0;
}


function draw() {
  background(255);
  fundo.scale=2;
  text("Pontuação:"+score,100,10);

 if(fundo.y > 600 ){
      fundo.y = 50
    } 
  
  if (gameState === "play") {
    
    if(keyDown("left_arrow")){
        foguete.x = foguete.x - 3;
    }
    if(keyDown("right_arrow")){
  
      foguete.x = foguete.x + 3;

    }
    if(keyDown("up_arrow")){
  
      foguete.x = foguete.x + 3;

    }
    if(keyDown("space")){

  raio = createSprite(200,200,20,20);
  raio.scale = 0.1;
  raio.addImage("ray", raioImg);
  raio.velocityY= foguete.y-10;
  raio.lifetime=100

    }

    if(raio.isTouching(meteoro)){
      meteoro.destroy();
      score+=1;
     }
  
    foguete.velocityY = foguete.velocityY + 0.8;
  
   if(estrelasGroup.isTouching(foguete)){
    score+=1;
    
   }
      spawnMeteoros();

     if(meteorosGroup.isTouching(foguete)|| foguete.y > 600){

      gameState = "end"
    }
   
    for (var i = 0; i < foguete.length; i++) {
      showRays(i, foguete);
    }
  
    if (gameState === "end"){
      gameOver.visible = true;
      restart.visible = true;
   
      meteorossGroup.setLifetimeEach(-1);
      estrelasGroup.setLifetimeEach(-1);
        
     meteorossGroup.setVelocityXEach(0);
     estrelassGroup.setVelocityXEach(0); 
   
     fundo.velocityY=0;
     foguete.velocityY=0;
     }
   
     if(mousePressedOver(restart)) {
       reset();
     }
   }

  spawnMeteoros()
  drawSprites();
}
  


function spawnMeteoros()
 {
  
  if (frameCount % 240 === 0) {
    var meteoro = createSprite(200, -50);
    var estrela = createSprite(400,10);

  
    meteoro.addImage(meteoroImg);
    estrela.addImage(estrelaImg);
    
    estrela.scale=0.09;
    meteoro.scale=0.2;
    
    meteoro.y=Math.round(random(10,100));
    estrela.y=Math.round(random(10,100))

    meteoro.velocityY = 1;
    estrela.velocityY = 1;
   
    
    meteoro.lifetime = 800;
    estrela.lifetime = 800;
    
   
    
     meteorosGroup.add(meteoro);
     estrelasGroup.add(estrela);
   
  }
}

function reset(){
  gameState= "play";
  restart.visible=false;
  gameOver.visible=false;
  meteorosGroup.destroyEach();
  estrelasGroup.destroyEach();

}


