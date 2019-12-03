
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
		me = new Runner(float(random(1,10).toFixed(2)),float(random(1,10).toFixed(2)),1,NAME,float(random(0.8,1.2).toFixed(2)))
		setTimeout(function(){me.newDay()},2000)
    });
}

function setup(){
	var NAME;
	createCanvas(1000,700)
	background("cyan")
	secondFunction()

}

function draw(){
}
