function setup(){
	createCanvas(1000,1000)
}

function draw(){
	background("red")
	ellipse(100,100,100,100)
}

class Runner{
	constructor(fitness,speed,injury,motivation,day){
		this.fitness = fitness
		this.speed = speed
		this.injury = injury
		this.motivation = motivation
		this.dayNum = day
		this.day = (day+1)%7
		this.injured = false
		this.summer = true
		if(dayNum>63){
			this.summer = false
		}
	}

	workout(){
		if (this.summer == true){
			
		}
	}

	race(){}

	newDay(){
		if(this.injured == false){}
		if(this.injured == true){}
	}

	daySummary(){}
}