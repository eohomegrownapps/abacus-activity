function AbacusBead(x,y,blockcol,abacus,column,i,value){
	this.bead = null;
	this.originaly = null;
	this.index = i;
	this.value = value;
	this.text = null;
	this.containerbead = null;
	this.updateY = function(y){
		this.containerbead.y = y;
	}
	this.drawBead = function(){
		this.bead = new createjs.Shape();
		this.bead.graphics.beginStroke("#000000");
		this.bead.graphics.setStrokeStyle(abacus.blockWidth/25);
		this.bead.graphics.beginFill(blockcol).drawRoundRect(-1*abacus.blockWidth/2,0,abacus.blockWidth,abacus.blockHeight,abacus.blockHeight/2);
		this.bead.x = 0;
		this.bead.y = 0;
		this.containerbead = new createjs.Container();
		this.containerbead.addChild(this.bead);
		this.containerbead.x = x;
		this.containerbead.y = y;
		abacus.stage.addChild(this.containerbead);
	}

	this.updateIndex = function(i){
		this.index = i;
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
		if (on==true&&this.value.toString().length<=4){
			this.text.text = this.value.toString();
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
		var text = new createjs.Text("1000",(abacus.blockWidth/3).toString()+"px Arial", usecol);
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