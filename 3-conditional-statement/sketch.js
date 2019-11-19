function clearButtons(){
	var buttons = document.getElementsByTagName('button');
	console.log(buttons)
	if (buttons) {
	  var num = buttons.length
	  for (var i = 0; i < num; i++) {
		console.log(buttons[0])
		buttons[0].remove()
	}
	}
}
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
		this.milePace = 8-this.fitness*this.speed
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

		this.dateNum = this.dayNum + 9
		if (this.dateNum < 31){
			this.month = "June"
			this.date = this.dateNum
		}else if (this.dateNum >= 31 && this.dateNum < 62){
			this.month = "July"
			this.date = this.dateNum - 30
		}else if (this.dateNum >=62 && this.dateNum <93){
			this.month = "August"
			this.date = this.dateNum - 61
		}else if (this.dateNum >=93 && this.dateNum <123){
			this.month = "September"
			this.date = this.dateNum - 92
		}else if (this.dateNum >=123 && this.dateNum <154){
			this.month = "October"
			this.date = this.dateNum - 122
		}else if (this.dateNum >=154 && this.dateNum <184){
			this.month = "October"
			this.date = this.dateNum - 153
		}
		this.injured = false
		this.summer = true
		if(this.dayNum>63){
			this.summer = false
		}
	}

	workout(){
		if (this.summer == true){
			textSize(20)
			text("Fitness: " + this.fitness + "  Speed: " + this.speed + "  Injury: " + this.injury + "  Motivation: " + this.motivation,10,20)
		}
	}

	race(){}

	summary(type,length){
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)

		if (type == "RecoveryRun"){
			document.getElementById("RecoveryRun30").remove()
			document.getElementById("RecoveryRun40").remove()
			document.getElementById("RecoveryRun50").remove()
			document.getElementById("RecoveryRun60").remove()
			textSize(width/50)
			text("You ran a " + length + " minute recovery run.",width/3,height/2.5)
		}
		if (type == "LongRun"){}
		if (type == "AnT"){}
		if (type == "AT"){}
		if (type == "200m"){}
		if (type == "400m"){}
		if (type == "800m"){}
		if (type == "1600m"){}
		if (type == "300mHills"){}
	}

	AnTre(){
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		textSize(width/50)
		text("Choose the length of your AnT workout:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		let back = createButton('back');
		back.id("back")
		back.position(width-width/3,height/4 + 20)
		back.mousePressed(function() {
			clearButtons()
			me.newDay()
		})

		let AnT12 = createButton('12 minutes');
		AnT12.id("12AnT")
		AnT12.position(width/2.9,height/2.2)

		let AnT15 = createButton('15 minutes');
		AnT15.id("15AnT")
		AnT15.position(width/2.9,height/2.2 + height*0.05)

		let AnT18 = createButton('18 minutes');
		AnT18.id("18AnT")
		AnT18.position(width/2.9,height/2.2 +height*0.1)
	}

	

	RecoveryRunre(){
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		textSize(width/50)
		text("Choose the length of your recovery run:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		let back = createButton('back');
		back.id("back")
		back.position(width-width/3,height/4 + 20)
		back.mousePressed(function() {
			clearButtons()
			me.newDay()
		})

		let RecoveryRun30 = createButton('30 minutes');
		RecoveryRun30.id("RecoveryRun30")
		RecoveryRun30.position(width/2.9,height/2.2)
		RecoveryRun30.mousePressed(function() {me.summary("RecoveryRun",30)})

		let RecoveryRun40 = createButton('40 minutes');
		RecoveryRun40.id("RecoveryRun40")
		RecoveryRun40.position(width/2.9,height/2.2 + height*0.05)

		let RecoveryRun50 = createButton('50 minutes');
		RecoveryRun50.id("RecoveryRun50")
		RecoveryRun50.position(width/2.9,height/2.2 +height*0.1)

		let RecoveryRun60 = createButton('60 minutes');
		RecoveryRun60.id("RecoveryRun60")
		RecoveryRun60.position(width/2.9,height/2.2 +height*0.15)
	}

	LongRunre(){
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		textSize(width/50)
		text("Choose the length of your long run:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		let back = createButton('back');
		back.id("back")
		back.position(width-width/3,height/4 + 20)
		back.mousePressed(function() {
			clearButtons()
			me.newDay()
		})

		let LongRun50 = createButton('50 minutes');
		LongRun50.id("LongRun50")
		LongRun50.position(width/2.9,height/2.2)

		let LongRun60 = createButton('60 minutes');
		LongRun60.id("LongRun60")
		LongRun60.position(width/2.9,height/2.2 + height*0.05)

		let LongRun70 = createButton('70 minutes');
		LongRun70.id("LongRun70")
		LongRun70.position(width/2.9,height/2.2 +height*0.1)

		let LongRun80 = createButton('80 minutes');
		LongRun80.id("LongRun80")
		LongRun80.position(width/2.9,height/2.2 +height*0.15)
	}
	ATre(){
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		textSize(width/50)
		text("Choose the length of your AT workout:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		let back = createButton('back');
		back.id("back")
		back.position(width-width/3,height/4 + 20)
		back.mousePressed(function() {
			clearButtons()
			me.newDay()
		})
		

		let AT20 = createButton('20 minutes');
		AT20.id("AT20")
		AT20.position(width/2.9,height/2.2)

		let AT25 = createButton('25 minutes');
		AT25.id("AT25")
		AT25.position(width/2.9,height/2.2 + height*0.05)

		let AT30 = createButton('30 minutes');
		AT30.id("AT30")
		AT30.position(width/2.9,height/2.2 +height*0.1)
	}

	Intervalre(){
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		textSize(width/50)
		text("Choose what type of interval workout:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		let back = createButton('back');
		back.id("back")
		back.position(width-width/3,height/4 + 20)
		back.mousePressed(function() {
			clearButtons()
			me.newDay()
		})
		let Interval200 = createButton('200m repeats');
		Interval200.id("Interval200")
		Interval200.position(width/2.9,height/2.2)

		let Interval400 = createButton('400m repeats');
		Interval400.id("Interval400")
		Interval400.position(width/2.9,height/2.2 + height*0.05)

		let Interval800 = createButton('800m repeats');
		Interval800.id("Interval800")
		Interval800.position(width/2.9,height/2.2 +height*0.1)

		let Interval1600 = createButton('1600m repeats');
		Interval1600.id("Interval1600")
		Interval1600.position(width/2.9,height/2.2 +height*0.15)

		let Interval300Hills = createButton('300m hill repeats');
		Interval300Hills.id("Interval300Hills")
		Interval300Hills.position(width/2.9,height/2.2 +height*0.2)
	}

	newDay(){
		if(this.injured == false){
			
			rect(width/2-width/4,height/2-height/4,width/2,height/2)
			textSize(width/50)
			text("Choose your type of workout:",width/3,height/2.5)
			textSize(width/25)
			text("Day #" + me.dayNum, width/2,height/3.3)
			textSize(width/60)
			text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
			this.RecoveryRun = createButton('Recovery Run');
			this.RecoveryRun.id("RecoveryRun")
			this.RecoveryRun.position(width/2.9,height/2.2)
			this.RecoveryRun.mousePressed(this.RecoveryRunre)

			this.LongRun = createButton('Long Run');
			this.LongRun.id("LongRun")
			this.LongRun.position(width/2.9,height/2.2 + height*0.05)
			this.LongRun.mousePressed(this.LongRunre)

			this.AnT = createButton('AnT');
			this.AnT.id("AnT")
			this.AnT.position(width/2.9,height/2.2 + height*0.1)
			this.AnT.mousePressed(this.AnTre)

			this.AT = createButton('AT');
			this.AT.id("AT")
			this.AT.position(width/2.9,height/2.2 + height*0.15)
			this.AT.mousePressed(this.ATre)

			this.Interval = createButton('Interval');
			this.Interval.id("Interval")
			this.Interval.position(width/2.9,height/2.2 + height*0.2)
			this.Interval.mousePressed(this.Intervalre)

			// this.AnT.mousePressed(this.AT.remove)
			// this.AnT.mousePressed(this.Interval.remove)
			// this.AnT.mousePressed(this.LongRun.remove)
			// this.AnT.mousePressed(this.AnTre)
		}
		if(this.injured == true){

		}
	}

	daySummary(){}
}

function setup(){
	createCanvas(1000,800)
	background("teal")
	me = new Runner(0,0,0,0,1)
	me.workout()
	me.newDay()
}
pace()
	let pace = document.getElementById("pace")
	pace.value -= 10;
	}

function draw(){
<<<<<<< HEAD
	background("teal")
	// ellipse(100,100,100,100)
	me.workout()
	me.newDay()
}
=======

}
>>>>>>> 90ccf11cef001cf1c2df0a9106aef8de631c88fd
