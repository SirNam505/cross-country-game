
workout = [
	["race","1600m Time Trial"],
	["Recovery Run",30],
	["Recovery Run",30],
	["race","Lake Merced Race"],
	["Recovery Run",40],
	["Long Run",80],
	["REST"],
	["ANT",15],
	["REST"],
	["Recovery Run",30],
	["race","Lake Merced Race",25],
	["Recovery Run",30],
	["Long Run",80],
	["REST"],
	["ANT",15],
	["REST"],
	["Recovery Run",30],
	["race","Lake Merced Race",25],
	["Recovery Run",30],
	["Long Run",80],
	["REST"],
	["Hill Repeats",10],
	["Recovery Run",50],
	["Recovery Run",40],
	["race","Lake Merced Race",25],
	["Recovery Run",50],
	["Long Run",75],
	["REST"],
	["race","1600 Time Trial",10],
	["Recovery Run",50],
	["Recovery Run",40],
	["race","Lake Merced Race",25],
	["Recovery Run",50],
	["Long Run",75],
	["REST"],
	["ANT",10],
	["Recovery Run",50],
	["Recovery Run",40],
	["race","Lake Merced Race",25],
	["Recovery Run",50],
	["Long Run",75],
	["REST"],
	["Hill Repeats",10],
	["Recovery Run",50],
	["Recovery Run",40],
	["race","Lake Merced Race",25],
	["Recovery Run",50],
	["Long Run",75],
	["REST"],
	["Speed Workout",10],
	["Recovery Run",50],
	["Recovery Run",40],
	["race","Lake Merced Race",25],
	["Recovery Run",50],
	["Long Run",90],
	["REST"],
	["race","1600 Time Trial",10],
	["Recovery Run",50],
	["Recovery Run",40],
	["race","Lake Merced Race",25],
	["Recovery Run",50],
	["Long Run",75],

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

	AnT(){
		rect(200,200,500,400)
		// let RecoveryRun = createButton('15 minutes');
		// RecoveryRun.position(450,350)
		// RecoveryRun.mousePressed(this.RecoveryRun)

		// let LongRun = createButton('18 minutes');
		// LongRun.position(450,380)
		// LongRun.mousePressed(this.LongRun)
	}

	RecoveryRun(){

	}
	LongRun(){}
	AT(){}
	Interval(){}
	newDay(){
		if(this.injured == false){
			rect(200,200,500,400)
			text("Choose your type of workout:",300,300)

			let RecoveryRun = createButton('Recovery Run');
			RecoveryRun.position(450,350)
			RecoveryRun.mousePressed(this.RecoveryRun)

			let LongRun = createButton('Long Run');
			LongRun.position(450,380)
			LongRun.mousePressed(this.LongRun)

			let AnT = createButton('AnT');
			AnT.position(450,410)
			AnT.mousePressed(this.AnT)

			let AT = createButton('AT');
			AT.position(450,440)
			AT.mousePressed(this.AT)

			let Interval = createButton('Interval');
			Interval.position(450,440)
			Interval.mousePressed(this.Interval)
		}
		if(this.injured == true){

		}
	}

	daySummary(){}
}

function setup(){
	createCanvas(1000,1000)
	background("teal")
	me = new Runner(0,0,0,0,1)
	me.workout()
	me.newDay()
}

function draw(){

}