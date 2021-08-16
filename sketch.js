const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var wall1 , wall2 , ground ;
var stones = [];
var jointpoint ;
var zombie , zombie1 , zombie2 , zombie3 , zombie4 ;
var backImg , breakButton  ;

function preload(){
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  backImg = loadImage("./assets/background.png")
}

function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(width/2,height-10,width,15);
  wall1 = new Base(100,height/2-100,225,100);                       
  wall2 = new Base(width-100,height/2-100,225,100);                 
  jointpoint = new Base(width-225, height/2-100, 40, 20);          

  bridge = new Bridge(17,{ x: 115, y: height / 2 -100}); 
  
  zombie = createSprite(width/2,height-110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.scale = 0.1;
  zombie.velocityX = 10;

  breakButton = createButton("")
  breakButton.position(width-100,height/2);
  breakButton.class("breakButton");
  breakButton.mousePressed(handleButtonPress)

  for(var i = 0; i <= 8; i++ ){
    var x = random(width/2 -200,width/2 + 300);
    var y = random(-10,140);
    var stone = new Stone(x,y,80,80);
    stones.push(stone);
  }

  Composite.add(bridge.body,jointpoint);
  jointlink = new Link (bridge,jointpoint)

}

function draw() {
  background(51);
  imageMode(CENTER)
  image(backImg,width/2,height/2,1200,690);

  Engine.update(engine);

  ground.display();
  wall1.display();
  wall2.display();
  bridge.show();
  jointpoint.display();

  drawSprites();
  

  for (var stone of stones) { 
    stone.display(); 
  }
 
}

function handleButtonPress(){
  jointlink.detach();
  setTimeout(() => {
    bridge.break(); }
    ,1500)
}
