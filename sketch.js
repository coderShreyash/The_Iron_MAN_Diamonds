
function preload(){

 bg=loadImage("bg.jpg");
 IronManImg=loadImage("Iron.png");
 stoneI=loadImage("stone.png");
 diamondI=loadImage("diamond.png");
}

function setup(){

    createCanvas(1200,600);

    back=createSprite(600,300,1200,600);
    back.addImage(bg);
    
    IronMan=createSprite(random(300,700),450,80,200);
    IronMan.addImage(IronManImg);
    IronMan.scale=0.25;
    IronMan.setCollider("rectangle",20,0,250,850);

    stoneGroup=new Group();
    diamonds=new Group();

    edges=createEdgeSprites();

    Score=0;

}

function draw(){

if(back.y>1000){
    back.y=700;
}
background(0);
drawSprites();

textSize(40);
strokeWeight(2.5);
stroke("crimson") 
fill("whitesmoke")
text("Diamonds 💎💎💎: "+Score,700,60); 

back.velocityY=5+(0.005*frameCount);

if(keyDown("up")){
    IronMan.velocityY=-10;
}

if(keyDown("left")){
    IronMan.velocityX=-6;
    IronMan.velocityY=0;
}
if(keyDown("right")){
    IronMan.velocityX=6;
    IronMan.velocityY=0;
}

IronMan.bounceOff(edges)
IronMan.velocityY+=0.275;


for(var s=0;s<stoneGroup.length;s++){
    currentStone=stoneGroup[s];
    currentStone.collide(IronMan);
    
}
for(var d=0;d<diamonds.length;d++){
    currentDiamond=diamonds[d];
    if(IronMan.isTouching(currentDiamond)){
    Score+=Math.round(random(50,100));
    currentDiamond.destroy();
    }
    
}

if(frameCount%45==0){
    stone=createSprite(random(100,1100),random(50,300),150,30);
    stone.addImage(stoneI);
    stone.lifetime=400;
    stone.scale=0.1;
   
    stone.velocityY=back.velocityY;
    stoneGroup.add(stone);
}
if(frameCount%45==0){
    diamond=createSprite(random(250,800),random(0,400),50,50);
    diamond.addImage(diamondI);
    diamond.lifetime=400;
    diamond.scale=0.25;
    diamond.velocityY=back.velocityY;
    diamonds.add(diamond);
}

}