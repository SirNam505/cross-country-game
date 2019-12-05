

class Runner{
	constructor(fitness,speed,injury,name){
		this.fitness = fitness
		this.speed = speed
		this.injury = injury
		this.dayNum = 1
		this.milePace = 7-(this.fitness*this.speed)**(0.45)/19
		this.injured = false
		this.summer = true
		this.previous = 0
		this.injuryDays = 0
		this.miles = 0
		this.name = name
		this.improvement = float((1.1 - (this.speed+this.fitness)/100).toFixed(2))
		firebase.database().ref("users").once('value',this.getName)

		// this.newDay()
	}

	getName(snapshot){
		var same = false
		snapshot.forEach(userSnapshot => {
			var name = userSnapshot.val().username
			console.log(me.name)
			console.log(name)
			if(me.name == name){
				same = true
			}
		})
		console.log(same)
		if (same){
			me.fitness = snapshot.child(me.name).val().fitness
			me.dayNum = snapshot.child(me.name).val().dayNum
			me.injured = snapshot.child(me.name).val().injured
			me.injury = snapshot.child(me.name).val().injury
			me.injuryDays = snapshot.child(me.name).val().injuryDays
			me.milePace = snapshot.child(me.name).val().milePace
			me.miles = snapshot.child(me.name).val().miles
			me.previous = snapshot.child(me.name).val().previous
			me.speed = snapshot.child(me.name).val().speed
			me.summer = snapshot.child(me.name).val().summer
			me.improvement = snapshot.child(me.name).val().improvement

		}else{
			firebase.database().ref('users/' + this.name).set({
				username: this.name,
				miles: this.miles,
				"fitness": this.fitness,
				"speed": this.speed,
				"injury": this.injury,
				dayNum: this.dayNum,
				milePace: this.milePace,
				injured: this.injured,
				summer: this.summer,
				previous: this.previous,
				injuryDays: this.injuryDays,
				miles: this.miles,
				improvement: this.improvement
			  });
		}
		wait = true
	}

	setPaces(){
		this.milePace = this.milePace = 7-(this.fitness*this.speed)**(0.45)/19
		var fiveK = (this.milePace*3.5).toFixed(3)
		var fiveKminutes = floor(fiveK)
		var fiveKseconds = ((fiveK - fiveKminutes)*60).toFixed(2)
		if (fiveKseconds<10){fiveKseconds = "0" + String(fiveKseconds)}
		this.fiveKtime = fiveKminutes + ':' + fiveKseconds
		if (this.dayNum > 63){this.summer = false}
		console.log(this.miles)
		firebase.database().ref('users/' + this.name).set({
			username: this.name,
			miles: this.miles,
			"fitness": this.fitness,
			"speed": this.speed,
			"injury": this.injury,
			dayNum: this.dayNum,
			milePace: this.milePace,
			injured: this.injured,
			summer: this.summer,
			previous: this.previous,
			injuryDays: this.injuryDays,
			miles: this.miles,
			improvement: this.improvement
		  });
	}
	setDates(){
		if (this.dayNum % 7 == 1){
			this.day = "Monday"
		}else if (this.dayNum % 7 == 2){
			this.day = "Tuesday"
		}else if (this.dayNum % 7 == 3){
			this.day = "Wednesday"
		}else if (this.dayNum % 7 == 4){
			this.day = "Thursday"
		}else if (this.dayNum % 7 == 5){
			this.day = "Friday"
		}else if (this.dayNum % 7 == 6){
			this.day = "Saturday"
		}else if (this.dayNum % 7 == 0){
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
			this.month = "November"
			this.date = this.dateNum - 153
		}
	}


	race(){}

	summary(type,length){
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)

		if (type == "RecoveryRun"){
			me.previous = 0
			clearButtons()
			let pace = me.milePace + 1.75
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let miles = float((length/pace).toFixed(2))
			textSize(width/50)
			text("You ran " + miles + " miles at " + minutes + ":" +seconds + " per mile pace.",width/3,height/2.5)
			text("Fitness + " + (miles*me.improvement/10).toFixed(3),width/3,height/2)
			me.fitness = float((me.fitness+miles*me.improvement/10).toFixed(3))
			let injury = (1-abs(miles/10 - 0.5)).toFixed(2)
			text("Injury - " + injury,width/3,height/1.8)
			me.injury = float((me.injury-injury).toFixed(2))
			me.miles = float((me.miles+miles).toFixed(3))
			if (workout[me.dayNum-1][0] == "Recovery Run"){
				text("Correct choice for Day #" + me.dayNum + "! Injury - 0.3",width/3,height/1.65)
				me.injury = float((me.injury-0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})

		}
		if (type == "LongRun"){
			me.previous = 0
			clearButtons()
			let pace = me.milePace + random(2,2.1)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(2)
			if (seconds<10){seconds = "0" + String(seconds)}
			let miles = float((length/pace).toFixed(2))
			textSize(width/50)
			text("You ran " + miles + " miles at " + minutes + ":" +seconds + " per mile pace.",width/3,height/2.5)
			text("Fitness + " + (miles*me.improvement/10).toFixed(3),width/3,height/2)
			let injury = (0.5-abs(miles/10 - 0.7)).toFixed(2)
			text("Injury - " + injury,width/3,height/1.8)
			me.injury = float((me.injury-injury).toFixed(2))
			me.fitness = float((me.fitness+miles*me.improvement/10).toFixed(3))
			me.miles = float((me.miles+miles).toFixed(3))
			if (workout[me.dayNum-1][0] == "Long Run"){
				text("Correct choice for Day #" + me.dayNum + "! Fitness + 0.3",width/3,height/1.65)
				me.fitness = float((me.fitness+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}

		if (type == "AnT"){
			me.previous += 1
			clearButtons()
			this.previous
			let pace = me.milePace + random(0.9,1)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let miles = float((length/pace).toFixed(2))
			textSize(width/50)
			text("You ran " + miles + " miles at " + minutes + ":" +seconds + " per mile pace.",width/3,height/2.5)
			text("Fitness + " + (miles*me.improvement/10).toFixed(3),width/3,height/2)
			text("Improvement + " + 0.02,width/3,height/1.85)
			me.improvement = float((me.improvement + 0.02).toFixed(3))
			me.fitness = float((me.fitness+miles*me.improvement/10).toFixed(3))
			let injury = float((miles/5).toFixed(2))
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			me.miles = float((me.miles+(miles+2)).toFixed(3))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.54)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "ANT"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.62)
				me.speed = float((me.speed-0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}

		if (type == "AT"){
			me.previous += 1
			clearButtons()
			let pace = me.milePace + random(1.3,1.5)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let miles = float((length/pace).toFixed(2))
			textSize(width/50)
			text("You ran " + miles + " miles at " + minutes + ":" +seconds + " per mile pace.",width/3,height/2.5)
			text("Fitness + " + (miles*me.improvement/10).toFixed(3),width/3,height/2)
			text("Improvement + " + 0.02,width/3,height/1.85)
			me.fitness = float((me.fitness+miles*me.improvement/10).toFixed(3))
			me.improvement = float((me.improvement + 0.02).toFixed(3))
			let injury = float((miles/10).toFixed(2))
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			me.miles = float((me.miles+(miles+2)).toFixed(3))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.6)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "AT"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.62)
				me.speed = float((me.speed+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}
		if (type == "200m"){
			me.previous += 1
			clearButtons()
			let pace = me.milePace - random(0.2,0.4)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let per200m = float((pace/8).toFixed(2))
			let per200mminutes = floor(per200m)
			let per200mseconds = ((per200m-per200mminutes)*60).toFixed(1)
			if (per200mseconds<10){per200mseconds = "0" + String(per200mseconds)}
			textSize(width/50)
			text("You ran 20x200m repeats at " + minutes + ":" +seconds + " per mile pace.",width/3.5,height/2.5)
			text(per200mminutes + ":" + per200mseconds + " per 200m",width/3.5,height/2.2)
			text("Speed + " + (1.05*me.improvement).toFixed(3),width/3,height/1.85)
			me.speed = float((me.speed+1.05*me.improvement).toFixed(3))
			let injury = 1.5
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			me.miles = float((me.miles+7).toFixed(3))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.6)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "200m"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.65)
				me.speed = float((me.speed+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}
		if (type == "400m"){
			me.previous += 1
			clearButtons()
			let pace = me.milePace + random(0.2,0.4)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let per400m = float((pace/4).toFixed(2))
			let per400mminutes = floor(per400m)
			let per400mseconds = ((per400m-per400mminutes)*60).toFixed(1)
			if (per400mseconds<10){per400mseconds = "0" + String(per400mseconds)}
			textSize(width/50)
			text("You ran 12x400m repeats at " + minutes + ":" +seconds + " per mile pace.",width/3.5,height/2.5)
			text(per400mminutes + ":" + per400mseconds + " per 400m",width/3.5,height/2.2)
			text("Speed + " + (1*me.improvement).toFixed(3),width/3,height/1.85)
			me.speed = float((me.speed+1*me.improvement).toFixed(3))
			let injury = 1.3
			me.miles = float((me.miles+6).toFixed(3))
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.6)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "400m"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.65)
				me.speed = float((me.speed+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}
		if (type == "800m"){
			me.previous += 1
			clearButtons()
			let pace = me.milePace + random(0.6,0.8)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let per800m = float((pace/2).toFixed(2))
			let per800mminutes = floor(per800m)
			let per800mseconds = ((per800m-per800mminutes)*60).toFixed(1)
			if (per800mseconds<10){per800mseconds = "0" + String(per800mseconds)}
			textSize(width/50)
			text("You ran 6x800m repeats at " + minutes + ":" +seconds + " per mile pace.",width/3.5,height/2.5)
			text(per800mminutes + ":" + per800mseconds + " per 800m",width/3.5,height/2.2)
			text("Fitness + " + (0.1*me.improvement).toFixed(3),width/3,height/2)
			text("Speed + " + (0.9*me.improvement).toFixed(3),width/3,height/1.85)
			me.fitness = float((me.fitness+0.1*me.improvement).toFixed(3))
			me.speed = float((me.speed+0.9*me.improvement).toFixed(3))
			let injury = 0.8
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			me.miles = float((me.miles+6.5).toFixed(3))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.6)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "800m"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.65)
				me.speed = float((me.speed+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}
		if (type == "1600m"){
			me.previous += 1
			clearButtons()
			let pace = me.milePace + random(0.6,0.7)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let per1600m = float((pace).toFixed(2))
			let per1600mminutes = floor(per1600m)
			let per1600mseconds = ((per1600m-per1600mminutes)*60).toFixed(1)
			if (per1600mseconds<10){per1600mseconds = "0" + String(per1600mseconds)}
			textSize(width/50)
			text("You ran 3x1600m repeats at " + minutes + ":" +seconds + " per mile pace.",width/3.5,height/2.5)
			text(minutes + ":" + seconds + " per 1600m",width/3.5,height/2.2)
			text("Fitness + " + (0.2*me.improvement).toFixed(3),width/3,height/2)
			text("Speed + " +(0.8*me.improvement).toFixed(3),width/3,height/1.85)
			me.fitness = float((me.fitness+0.2*me.improvement).toFixed(3))
			me.speed = float((me.speed+0.8*me.improvement).toFixed(3))
			let injury = 1
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			me.miles = float((me.miles+6).toFixed(3))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.6)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "800m"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.65)
				me.speeds = float((me.speed+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}
		if (type == "300mHills"){
			me.previous += 1
			clearButtons()
			let pace = me.milePace+random(0.9,1.1)
			let minutes = floor(pace)
			let seconds = ((pace-minutes)*60).toFixed(1)
			if (seconds<10){seconds = "0" + String(seconds)}
			let per300m = float((pace*(3/16)).toFixed(2))
			let per300mminutes = floor(per300m)
			let per300mseconds = ((per300m-per300mminutes)*60).toFixed(1)
			if (per300mseconds<10){per300mseconds = "0" + String(per300mseconds)}
			textSize(width/50)
			text("You ran 10x300m hill repeats at " + minutes + ":" +seconds + " per mile pace.",width/3.8,height/2.5)
			text(per300mminutes + ":" + per300mseconds + " per hill repeat",width/3.8,height/2.2)
			text("Fitness + " + (0.1*me.improvement).toFixed(3),width/3,height/2)
			text("Speed + " +(1*me.improvement).toFixed(3),width/3,height/1.85)
			me.fitness = float((float(me.fitness)+0.1*me.improvement).toFixed(3))
			me.speed = float(float(me.speed+1*me.improvement).toFixed(3))
			let injury = 1.5
			text("Injury + " + injury,width/3,height/1.72)
			me.injury = float((me.injury+injury).toFixed(2))
			me.miles = float((me.miles+6).toFixed(3))
			if (me.previous>=2){
				text("Injury + 1, don't run two workouts in a row",width/3,height/1.6)
				me.injury = float((me.injury+1).toFixed(2))
			}

			if (workout[me.dayNum-1][0] == "Hill Repeats"){
				text("Correct choice for Day #" + me.dayNum + "! Speed + 0.3",width/3,height/1.65)
				me.speed = float((me.speed+0.3).toFixed(2))
			}

			let next = createButton('Next >>');
			next.id("next")
			next.position(width/2.9,height/1.5)
			next.mousePressed(function() {
				me.dayNum+=1
				me.newDay()
			})
		}
	}

	AnTre(){
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(width/50)
		text("Choose the length of your AnT workout:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
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
		AnT12.mousePressed(function() {
			me.summary("AnT",12)
		})

		let AnT15 = createButton('15 minutes');
		AnT15.id("15AnT")
		AnT15.position(width/2.9,height/2.2 + height*0.05)
		AnT15.mousePressed(function() {
			me.summary("AnT",15)
		})

		let AnT18 = createButton('18 minutes');
		AnT18.id("18AnT")
		AnT18.position(width/2.9,height/2.2 +height*0.1)
		AnT18.mousePressed(function() {
			me.summary("AnT",18)
		})
	}



	RecoveryRunre(){
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(width/50)
		text("Choose the length of your recovery run:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
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
		RecoveryRun40.mousePressed(function() {me.summary("RecoveryRun",40)})


		let RecoveryRun50 = createButton('50 minutes');
		RecoveryRun50.id("RecoveryRun50")
		RecoveryRun50.position(width/2.9,height/2.2 +height*0.1)
		RecoveryRun50.mousePressed(function() {me.summary("RecoveryRun",50)})


		let RecoveryRun60 = createButton('60 minutes');
		RecoveryRun60.id("RecoveryRun60")
		RecoveryRun60.position(width/2.9,height/2.2 +height*0.15)
		RecoveryRun60.mousePressed(function() {me.summary("RecoveryRun",60)})

	}

	LongRunre(){
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(width/50)
		text("Choose the length of your long run:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
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
		LongRun50.mousePressed(function() {me.summary("LongRun",50)})

		let LongRun60 = createButton('60 minutes');
		LongRun60.id("LongRun60")
		LongRun60.position(width/2.9,height/2.2 + height*0.05)
		LongRun60.mousePressed(function() {me.summary("LongRun",60)})

		let LongRun70 = createButton('70 minutes');
		LongRun70.id("LongRun70")
		LongRun70.position(width/2.9,height/2.2 +height*0.1)
		LongRun70.mousePressed(function() {me.summary("LongRun",70)})

		let LongRun80 = createButton('80 minutes');
		LongRun80.id("LongRun80")
		LongRun80.position(width/2.9,height/2.2 +height*0.15)
		LongRun80.mousePressed(function() {me.summary("LongRun",80)})

	}
	ATre(){
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(width/50)
		text("Choose the length of your AT workout:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
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
		AT20.mousePressed(function() {me.summary("AT",20)})

		let AT25 = createButton('25 minutes');
		AT25.id("AT25")
		AT25.position(width/2.9,height/2.2 + height*0.05)
		AT25.mousePressed(function() {me.summary("AT",25)})


		let AT30 = createButton('30 minutes');
		AT30.id("AT30")
		AT30.position(width/2.9,height/2.2 +height*0.1)
		AT30.mousePressed(function() {me.summary("AT",30)})

	}

	Intervalre(){
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(width/50)
		text("Choose what type of interval workout:",width/3,height/2.5)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
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
		Interval200.mousePressed(function() {me.summary("200m",20)})

		let Interval400 = createButton('400m repeats');
		Interval400.id("Interval400")
		Interval400.position(width/2.9,height/2.2 + height*0.05)
		Interval400.mousePressed(function() {me.summary("400m",12)})


		let Interval800 = createButton('800m repeats');
		Interval800.id("Interval800")
		Interval800.position(width/2.9,height/2.2 +height*0.1)
		Interval800.mousePressed(function() {me.summary("800m",6)})

		let Interval1600 = createButton('1600m repeats');
		Interval1600.id("Interval1600")
		Interval1600.position(width/2.9,height/2.2 +height*0.15)
		Interval1600.mousePressed(function() {me.summary("1600m",3)})

		let Interval300Hills = createButton('300m hill repeats');
		Interval300Hills.id("Interval300Hills")
		Interval300Hills.position(width/2.9,height/2.2 +height*0.2)
		Interval300Hills.mousePressed(function() {me.summary("300mHills",10)})

	}

	CrossTrainre(){
		background("red")
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(20)
		text("Fitness: " + me.fitness + "  Speed: " + me.speed + "  Injury: " + me.injury + "  Miles: " + me.miles,10,20)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		textSize(width/50)
		text("You did the elliptical for 30 minutes",width/3.8,height/2.5)
		text("Fitness + " + 0.4,width/3,height/2)
		me.fitness = float((me.fitness+0.4).toFixed(3))
		let injury = 0.5
		text("Injury - " + injury,width/3,height/1.7)
		me.injury = float((me.injury-injury).toFixed(2))
		let next = createButton('Next >>');
		next.id("next")
		next.position(width/2.9,height/1.5)
		next.mousePressed(function() {
			me.dayNum+=1
			me.newDay()
		})
		fill("white")
	}

	RestDayre(){
		me.previous=0
		background("cyan")
		fill("white")
		rect(width/2-width/4,height/2-height/4,width/2,height/2)
		fill("black")
		textSize(20)
		text("Fitness: " + me.fitness + "  Speed: " + me.speed + "  Injury: " + me.injury + "  Miles: " + me.miles,10,20)
		textSize(width/25)
		text("Day #" + me.dayNum, width/2,height/3.3)
		textSize(width/60)
		if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
		text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
		clearButtons()
		textSize(width/50)
		text("Enjoy your rest!",width/3.8,height/2.5)
		text("Fitness - 0.2",width/3,height/2.3)
		me.fitness = float((me.fitness-0.2).toFixed(3))
		text("Speed - 0.2",width/3,height/2)
		me.speed = float((me.speed-0.2).toFixed(3))
		let injury = 1.2
		text("Injury - " + injury,width/3,height/1.8)
		me.injury = float((me.injury-injury).toFixed(2))
		let next = createButton('Next >>');
		next.id("next")
		next.position(width/2.9,height/1.5)

		if (workout[me.dayNum-1][0] == "REST"){
			text("Correct choice for Day #" + me.dayNum + "! Injury - 0.3",width/3,height/1.65)
			me.injury = float((me.injury-0.3).toFixed(2))
		}

		fill("white")
		next.mousePressed(function() {
			me.dayNum+=1
			me.newDay()
		})
		}
	raceRe(){
		unicorn = new Unicorn();
		let i = 1
		while(i<10){
		i+=1
		game()
		}
		me.dayNum+=1
		me.newDay()
	}

	injuryTest(){
		let randomNum = random(1,100)
		if (this.injuryDays == -1){
			this.injuryDays = 0
			this.injured = false
		}
		if (randomNum<this.injury){
			this.injured = true
			if (this.injuryDays == 0){
				this.injuryDays = float(random(3,14).toFixed(0))
			}
		}
	}
	newDay(){
		fill("white")
		this.injuryTest()
		if (workout[me.dayNum-1][0] == "race"){
			background("cyan")

			clearButtons()
			this.setDates()
			this.setPaces()
			textSize(20)
			rect(width/2-width/4,height/2-height/4,width/2,height/2)
			fill("black")
			text("Fitness: " + this.fitness + "  Speed: " + this.speed + "  Injury: " + this.injury + "  Miles: " + me.miles + "  Improvement Rate: " + this.improvement + "  Name: " + this.name,10,20)
			textSize(width/50)
			text("RACE: " + workout[me.dayNum-1][1],width/3,height/2.5)
			textSize(width/25)
			text("Day #" + me.dayNum, width/2,height/3.3)
			textSize(width/60)
			if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
			text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
			text(this.fiveKtime,width/1.5 + 5,height/2-height/4+20)
			fill("white")
			this.race = createButton('RACE');
			this.race.id("race")
			this.race.position(width/2.9,height/2.2)
			this.race.mousePressed(this.raceRe)
			
			
		}else{
			if(this.injured == false){
				background("cyan")

				clearButtons()
				this.setDates()
				this.setPaces()
				textSize(20)
				rect(width/2-width/4,height/2-height/4,width/2,height/2)
				fill("black")
				text("Fitness: " + this.fitness + "  Speed: " + this.speed + "  Injury: " + this.injury + "  Miles: " + me.miles + "  Improvement Rate: " + this.improvement + "  Name: " + this.name,10,20)
				textSize(width/50)
				text("Choose your type of workout:",width/3,height/2.5)
				textSize(width/25)
				text("Day #" + me.dayNum, width/2,height/3.3)
				textSize(width/60)
				if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
				text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
				text(this.fiveKtime,width/1.5 + 5,height/2-height/4+20)
				fill("white")
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

				this.RestDay = createButton('Rest Day');
				this.RestDay.id("RestDay")
				this.RestDay.position(width/2.9,height/2.2 + height*0.25)
				this.RestDay.mousePressed(this.RestDayre)			// this.AnT.mousePressed(this.AT.remove)
				// this.AnT.mousePressed(this.Interval.remove)
				// this.AnT.mousePressed(this.LongRun.remove)
				// this.AnT.mousePressed(this.AnTre)
			}
			if(this.injured == true){
				background("red")
				clearButtons()
				this.setDates()
				this.setPaces()
				this.CrossTrain = createButton('Cross Train');
				this.CrossTrain.id("CrossTrain")
				this.CrossTrain.position(width/2.9,height/2.2 + height*0.2)
				this.CrossTrain.mousePressed(this.CrossTrainre)
				textSize(20)
				rect(width/2-width/4,height/2-height/4,width/2,height/2)
				fill("black")
				text("Fitness: " + this.fitness + "  Speed: " + this.speed + "  Injury: " + this.injury + "  Miles: " + me.miless + "  Improvement Rate: " + this.improvement + "  Name: " + this.name,10,20)
				textSize(width/50)
				text("INJURED!",width/3,height/2.5)
				textSize(width/25)
				text("Day #" + me.dayNum, width/2,height/3.3)
				textSize(width/60)
				if (me.summer){text("Summer",width/2-width/4+5,height/2-height/4+50)}else{text("Season",width/2-width/4+5,height/2-height/4+50)}
				text("Date: " + me.day + ", " + me.month + " " + me.date, width/2-width/4+5,height/2-height/4+20)
				text("Injured days left: " + this.injuryDays,width/3,height/2.2)
				this.speed = float((this.speed-0.2).toFixed(3))
				this.injuryDays = float((this.injuryDays-1).toFixed(0))
				text("Injury days - 1",width/3,height/1.84)
				text("Speed - 0.2",width/3,height/2.02)

			}
		}
	}
}
