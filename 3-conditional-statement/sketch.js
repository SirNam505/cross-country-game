function setup(){
	createCanvas(1000,1000)
}

function draw(){
	background("red")
	ellipse(100,100,100,100)
}
workout = [
	["race","1600m Time Trial"]
	["Recovery Run",30]
	["Recovery Run",30]
	["race","Lake Merced Race"]
	["Recovery Run",40]
	["Long Run",80]
	["REST"]
	["ANT",15]
	["REST"]
	["Recovery Run",30]
	["race","Lake Merced Race",25]
	["Recovery Run"30]
	["Long Run"80]
	[""]



]
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
