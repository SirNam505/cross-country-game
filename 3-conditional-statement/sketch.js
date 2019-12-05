let unicorn;
let uImg;
let tImg;
let b;
let b2;
const trains = [];

let spacing = 80;
let timer = spacing;
let r = 1;

let timerP = 0;
let pointsLost = 0;


function preload() { 
  uImg = loadImage('Runner-PNG-Image-File.png');
  tImg = loadImage('rock.png');
  b = loadImage("b.jpg") 
  b2 = loadImage("b2.jpg") 
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

//----------------------------



var firebaseConfig = {
    apiKey: "AIzaSyAtyuxjjcp0J3d00vgWPeGWuIOWdp8ncXA",
    authDomain: "cross-country-5ff42.firebaseapp.com",
    databaseURL: "https://cross-country-5ff42.firebaseio.com",
    projectId: "cross-country-5ff42",
    storageBucket: "cross-country-5ff42.appspot.com",
    messagingSenderId: "428444593391",
    appId: "1:428444593391:web:6f71ad0ddf85d58a1c7f1a",
    measurementId: "G-8BKH9GSPCC"
  };
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

function clearButtons(){
	var buttons = document.getElementsByTagName('button');
	if (buttons) {
	  var num = buttons.length
	  for (var i = 0; i < num; i++) {
		buttons[0].remove()
	}
	}
}

var wait = false


function startScreen(_callback){
	background("tan")
	textSize(15)
	text("Username: ",width/2.4-80, height/2.5+15)
	input = createInput();
	input.id("input")
  	input.position(width/2.4, height/2.5);

  	submit = createButton('submit');
  	submit.position(width/2.4+140, height/2.5);
	submit.mousePressed(function() {
		NAME = input.value()
		_callback()
	})

}


function secondFunction(){
    // call first function and pass in a callback function which
    // first function runs when it has completed
    startScreen(function() {
		document.getElementById("input").remove()
		clearButtons()
		background("cyan")
		me = new Runner(float(random(1,20).toFixed(2)),float(random(1,20).toFixed(2)),1,NAME)
		setTimeout(function(){me.newDay()},2000)
    });
}

// function setup(){
// 	var NAME;
// 	createCanvas(1000,700)
// 	background("cyan")
// 	secondFunction()

// }

function setup() {
	createCanvas(800, 450);
	unicorn = new Unicorn();
  }
  
function game(){	
	clearButtons()
	color("black")
	let timerMinutes = floor(timerP/1000)
	let timerSeconds = ((timerP/1000-timerMinutes)*60).toFixed(0)
	spacing = 80 - timerP/200
	timerP+=5
	background(b)
	for (let t of trains) {
		if (unicorn.hits(t)) {
			console.log('game over');
			pointsLost+=0.2
			background(b2)
		}
	  t.move();
	  t.show();
	}
	timer--;
	if (timer <= 0) {
	  timer = 0;
	  r = random(1);
	  if (r < 0.05) {
		trains.push(new Train(7+timerP/3000));
		timer = spacing;
	  }
	}
	

  
	unicorn.show();
	unicorn.move();
	text("Time elapsed: "+timerMinutes + ":" + timerSeconds,100,100)
	text("Points lost: " + round(pointsLost),100,120)
}

function draw() {
	game()
}
  