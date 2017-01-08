function AbacusBead(x,y,blockcol,abacus,column,i,value){
	this.bead = null;
	this.originaly = null;
	this.index = i;
	this.updateY = function(y){
		this.bead.y = y;
	}
	this.drawBead = function(){
		this.bead = new createjs.Shape();
		this.bead.graphics.beginStroke("#000000");
		this.bead.graphics.setStrokeStyle(abacus.blockWidth/25);
		this.bead.graphics.beginFill(blockcol).drawRoundRect(-1*abacus.blockWidth/2,0,abacus.blockWidth,abacus.blockHeight,abacus.blockHeight/2);
		this.bead.x = x;
		this.bead.y = y;
		abacus.stage.addChild(this.bead);
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

	this.init = function(){
		this.drawBead();
		this.addClickListeners();
	}
}