function setup(){
	createCanvas(1000,1000)
	me = new Runner(0,0,0,0,1)
}

function draw(){
	background("teal")
	// ellipse(100,100,100,100)
	me.workout()
	me.newDay()
}

workouts = [
	["ANT",15],
	["ABC",50],
	["Interval",8,800]
]

class Runner{
	constructor(fitness,speed,injury,motivation,day){
		this.fitness = fitness
		this.speed = speed
		this.injury = injury
		this.motivation = motivation
		this.dayNum = day
		this.day
		if (this.dayNum == 1){
			this.day = "Monday"
		}else if (this.dayNum == 2){
			this.day = "Tuesday"
		}else if (this.dayNum == 3){
			this.day = "Wednesday"
		}else if (this.dayNum == 4){
			this.day = "Thursday"
		}else if (this.dayNum == 5){
			this.day = "Friday"
		}else if (this.dayNum == 6){
			this.day = "Saturday"
		}else if (this.dayNum == 1){
			this.day = "Sunday"
		}
		this.injured = false
		this.summer = true
		if(this.dayNum>63){
			this.summer = false
		}
	}

	workout(){
		if (this.summer == true){
			text("Fitness: " + this.fitness + " Speed: " + this.speed + " Injury: " + this.injury + " Motivation: " + this.motivation,10,10)
		}
	}

	race(){}

	newDay(){
		if(this.injured == false){
			rect(200,200,500,400)
			text("Today is " + this.day + ", day " + this.dayNum,300,300)
			text("Today is " + this.day,300,300)
		}
		if(this.injured == true){
			
		}
	}

	daySummary(){}
}