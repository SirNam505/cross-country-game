let unicorn;
let uImg;
let tImg;
const trains = [];

const spacing = 80;
let timer = spacing;
let r = 1;

let timerP;


function preload() { 
  uImg = loadImage('unicorn.png');
  tImg = loadImage('train.png');
 }


function setup() {
  createCanvas(800, 450);
  unicorn = new Unicorn();
}

function gotCommand(error, results) {
  if (error) {
    //console.error(error);
  }
  //console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up' && checked) {
    unicorn.jump();
  }
}

function keyPressed() {
  //const checked = useSuond.value();
  if (key == ' '/* && !checked*/) {
    unicorn.jump();
  }
}

function draw() {
  background("white")
  timer--;
  if (timer <= 0) {
    timer = 0;
    r = random(1);
    if (r < 0.015) {
      trains.push(new Train());
      timer = spacing;
    }
  }
  
  for (let t of trains) {
    t.move();
    t.show();
    if (unicorn.hits(t)) {
      console.log('game over');
      noLoop();
    }
  }

  unicorn.show();
  unicorn.move();
}