let scroll
let unicorn;
let uImg;
let tImg;
let b;
let b2;
let homeScreen;
let gameIsPlaying = false;
let lakeMercedCourse;
let lakeMercedCourseRed
let trackCourse
let trackCourseRed
let homeCourse
let homeCourseRed
let statesCourse
let statesCourseRed
let vikingCourse
let vikingCourseRed
let NCSCourse
let NCSCourseRed
let Screen
const trains = [];

let spacing = 80;
let timer = spacing;
let r = 1;

let timerP = 0;
let pointsLost = 0;
let predictedTime = 0;

function raceCheck(){
	if (workout[me.dayNum-1][1] == "1600 Time Trial"){
		console.log(me.milePace)
		return [me.milePace, trackCourse, trackCourseRed]
	}
	if (workout[me.dayNum-1][1] == "Lake Merced Race"){
		return [me.fiveKpace*4.6, lakeMercedCourse, lakeMercedCourseRed]
	}
	if (workout[me.dayNum-1][1] == "Viking Opener Invitational"){
		return [me.fiveKpace*1.95, vikingCourse, vikingCourseRed]
	}
	if (workout[me.dayNum-1][1] == "Farmer's Invitational" || workout[me.dayNum-1][1] == "NCS Championship"){
		return [me.fiveKpace*2.98,NCSCourse, NCSCourseRed]
	}
	if (workout[me.dayNum-1][1] == "BCL 1"){
		return [me.fiveKpace*3.01,statesCourse, statesCourseRed]
	}
	if (workout[me.dayNum-1][1] == "Jim Tracy Challenge" || workout[me.dayNum-1][1] == "BCL West Championship"){
		return [me.fiveKpace*3.107,homeCourse, homeCourseRed]
	}
	if (workout[me.dayNum-1][1] == "Home Course Time Trial" || workout[me.dayNum-1][1] == "BCL 2"){
		return [me.fiveKpace*2.95,homeCourse, homeCourseRed]
	}
	if (workout[me.dayNum-1][1] == "State Championship"){
		return [me.fiveKpace*3.107,statesCourse, statesCourseRed]
	}
}

function preload() { 
  scroll = loadImage("scroll.png")
  uImg = loadImage('Runner-PNG-Image-File.png');
  tImg = loadImage('rock.png');
  b = loadImage("b.jpg") 
  b2 = loadImage("Adam Injured Final 2.png") 
  homeScreen = loadImage("CROSS COUNTRY SIMULATOR.jpg")
  Screen = loadImage("Adam Head Final.jpg")
  lakeMercedCourse = loadImage("Laker Merced Background.png")
  lakeMercedCourseRed = loadImage("Laker Merced Background Red.png")
  trackCourse = loadImage("Track Field Background.png")
  trackCourseRed = loadImage("Track Field Background Red.png")
  homeCourse = loadImage("Champs Course Background.png")
  homeCourseRed = loadImage("Champs Course Background Red.png")
  vikingCourse = loadImage("Viking Opener Background.png")
  vikingCourseRed = loadImage("Viking Opener Background Red.png")
  NCSCourse = loadImage("Hayward Background.png")
  NCSCourseRed = loadImage("Hayward Background Red.png")
  statesCourse = loadImage("BCL 1 Background.png")
  statesCourseRed = loadImage("BCL 1 Background Red.png")

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
	background(homeScreen)
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
		background(homeScreen)
		me = new Runner(float(random(1,20).toFixed(2)),float(random(1,20).toFixed(2)),1,NAME)
		setTimeout(function(){me.newDay()},2000)
    });
}

function setup(){
	textFont('Kalam');
	var NAME;
	createCanvas(1000,700)
	background("cyan")
	secondFunction()
}

function game(goalTime){	
	clearButtons()
	color("black")
	predictedTime = goalTime[0] + pointsLost/60
	let predictedTimeMinutes = floor(predictedTime)
	let predictedTimeSeconds = ((predictedTime-predictedTimeMinutes)*60).toFixed(0)
	let timerMinutes = floor(timerP*goalTime[0]/10000)
	let timerSeconds = ((timerP*goalTime[0]/10000-timerMinutes)*60).toFixed(0)
	if (timerSeconds<10){
		timerSeconds = "0" + timerSeconds
	}
	if (predictedTimeSeconds<10){
		predictedTimeSeconds = "0" + predictedTimeSeconds
	}
	spacing = 80 - timerP/80
	timerP+=5
	background(goalTime[1])
	for (let t of trains) {
		if (unicorn.hits(t)) {
			pointsLost+=0.013*goalTime[0]
			background(goalTime[2])
		}
	  t.move();
	  t.show();
	}
	timer--;
	if (timer <= 0) {
	  timer = 0;
	  r = random(0,1);
	  if (r < 0.05) {
		trains.push(new Train(7+timerP/700));
		timer = spacing;
	  }
	}
	

  
	unicorn.show();
	unicorn.move();
	text("Time elapsed: "+timerMinutes + ":" + timerSeconds,100,100)
	text("Points lost: " + round(pointsLost),100,120)
	text("Predicted Time " + predictedTimeMinutes + ":" + predictedTimeSeconds ,100,140)

	if (timerP*goalTime[0]/10000 > predictedTime){
		gameIsPlaying = false
		textSize(width/10)
		text("FINISH",width/3,height/3)
		setTimeout(function(){
			textSize(width/60)
			timerP = 0
			pointsLost = 0
			spacing =0
			me.raceTime = predictedTimeMinutes + ':' + predictedTimeSeconds
			me.raceSummary()
		},2000)
	}
}

function draw() {
	if (gameIsPlaying == true){
		game(raceCheck())
	}
	// uImgCreate.position(50,50)
}
  