var dog, dogImage, happyDog;
var food;
var bedroom, garden, washroom;

var database, foodStock;

var hour, currentHour;

var feedDog, addFood;

var gameState;
var xyz;

function preload()
{
  
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");

}

function setup() {

  createCanvas(500, 500);

  dog = createSprite(250, 400, 20, 20);
  dog.addImage(dogImage);
  dog.scale = 0.1;
  
  database = firebase.database();

  food = new Food();

  fS = food.foodStock;

  feedDog = new Button("Feed Bobby");
  feedDog.button.position(650, 85);

  addFood = new Button("Add Food");
  addFood.button.position(750, 85);

  food.getFoodStock();

  gameState = database.ref('gameState');
  gameState.on("value", (data) => {
    gameState = data.val();
  })
  
}


function draw() {  

  background(46, 139, 87);

  food.display();

  feedDog.button.mousePressed(() => {
    food.deductFood();
    food.updateFoodStock();
    dog.addImage(happyDog);
    feedDog.button.hide();
    addFood.button.hide();
  })

  addFood.button.mousePressed(() => {
    if(fS < 20){
      fS += 1;
    }
    food.updateFoodStock();
  })

  food.getLastFed();
  xyz= food.getCurrentTime();
  console.log(xyz)
  /*if(currentHour === hour + 1 || (hour === 23 && currentHour === 00)){
    update("playing");
    food.garden();
  } else if(currentHour === hour + 2 || (hour === 22 && currentHour === 00) || (hour === 23 && currentHour === 01)){
    update("sleeping");
    food.bathroom();
  } else if(currentHour === hour + 3 || (hour === 21 && currentHour === 00) || (hour === 22 && currentHour === 01) ||
    (hour === 23 && currentHour === 02)){
    update("bathing");
    food.washroom();
  } else if(currentHour > hour + 3){
    update("hungry");
    feedDog.button.show();
    addFood.button.show();
  }*/


  if((xyz === hour + 1) || (hour === 23 && xyz === 00)){
    update("playing");
    food.garden();
    console.log("1")
  } else if((xyz === hour + 2) || (hour === 22 && xyz === 00) || (hour === 23 && xyz === 01)){
    update("sleeping");
    food.bathroom();
    console.log("2")
  } else if((xyz === hour + 3) || (hour === 21 && xyz === 00) || (hour === 22 && xyz === 01) ||
    (hour === 23 && xyz === 02)){
    update("bathing");
    console.log("3")
    food.washroom();
  } else if(xyz > hour + 3){
    update("hungry");
    console.log("4")
    feedDog.button.show();
    addFood.button.show();
  }

  drawSprites();

}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}