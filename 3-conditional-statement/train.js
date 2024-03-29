// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

class Train {

	constructor(speed) {
	  this.r = 75;
	  this.x = width;
	  this.y = height - this.r;
	  this.speed = speed
	}
  
	move() {
	  this.x -= this.speed;
	}
  
	show() {
	  image(tImg, this.x, this.y, this.r, this.r);
  
	  // fill(255, 50);
	  // ellipseMode(CORNER);
	  // ellipse(this.x, this.y, this.r, this.r);
	}
  
  }