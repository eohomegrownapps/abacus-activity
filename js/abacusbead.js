function AbacusBead(x,y,blockcol,abacus,column,i,value){
	var Color = net.brehaut.Color;

	this.bead = null;
	this.originaly = null;
	this.index = i;
	this.value = value;
	this.text = null;
	this.containerbead = null;
	this.age = 4;
	this.y = y;
	this.updateY = function(y){
		this.containerbead.y = y;
		this.y = y;
	}

	this.resetAge = function(){
		this.age = -1;
	}

	this.forceAge = function(age){
		this.age = age-1;
		console.log(this.age);
		this.updateAge();
	}

	this.updateAge = function(){
		this.age+=1;
		if (this.age==0){
			this.redraw("#FFF");
		} else if (this.age<3){
			var col = Color(blockcol);
			col = col.setSaturation(col.getSaturation()/3);
			col.s = col.s/2;
			console.log(col.toRGB());
			this.redraw(col.toRGB());
		} else if (this.age==3){
			this.redraw(blockcol);
		}
	}

	this.redraw = function(colour){
		this.bead.graphics.clear().beginStroke("#000000").setStrokeStyle(abacus.blockWidth/25).beginFill(colour).drawRoundRect(-1*abacus.blockWidth/2,0,abacus.blockWidth,abacus.blockHeight,abacus.blockHeight/2);
	}

	this.drawBead = function(colour=blockcol){
		this.bead = new createjs.Shape();
		this.bead.graphics.beginStroke("#000000");
		this.bead.graphics.setStrokeStyle(abacus.blockWidth/25);
		this.bead.graphics.beginFill(colour).drawRoundRect(-1*abacus.blockWidth/2,0,abacus.blockWidth,abacus.blockHeight,abacus.blockHeight/2);
		this.bead.x = 0;
		this.bead.y = 0;
		this.containerbead = new createjs.Container();
		this.containerbead.addChild(this.bead);
		this.containerbead.x = x;
		this.containerbead.y = this.y;
		abacus.stage.addChild(this.containerbead);
	}

	this.updateIndex = function(i){
		var oldi = this.index;
		this.index = i;
		if (this.index!=oldi){
			this.resetAge();
		}
	}

	this.addClickListeners = function(){
		var th = this;
		var col = column;
		this.bead.on("mousedown", function(evt) {
		    th.originaly = evt.stageY;
		});

		this.bead.on("pressup", function(evt) {
		    if (th.originaly<evt.stageY){
		    	//moved down
		    	console.log("down");
		    	col.shuntRight(th.index);
		    } else if (th.originaly>evt.stageY){
		    	console.log("up");
		    	col.shuntLeft(th.index);
		    }
		});
	}

	this.updateValue = function(on){
		if (on==true&&this.value.toFraction(true).length<=4){
			this.text.text = this.value.toFraction(true);
		} else {
			this.text.text = "";
		}
	}

	this.drawText = function(){
		var usecol;
		if (blockcol=="#000"||blockcol=="#000000"){
			usecol = "#FFF";
		} else {
			usecol = "#000";
		}
		var text = new createjs.Text("",(abacus.blockWidth/3).toString()+"px Arial", usecol);
		text.set({
		    textAlign: 'center'
		});
		text.x = 0;
		text.y = abacus.blockHeight/3;
		this.containerbead.addChild(text);
		this.text = text;
	}

	this.init = function(){
		this.drawBead();
		this.addClickListeners();
		this.drawText();
	}
}