function StandardAbacusColumn(x,starty,endy,blockstop,blocksbottom,blocksheight,colcols,blockcols,abacus){
	this.elements = [];
	this.colWidthScale = 8/33;
	this.blockcols = blockcols;
	this.drawColumn = function(){
		//grey: A0A0A0, stroke 6B6B6B
		var width = this.colWidthScale*abacus.blockWidth;
		var height = endy-starty;
		console.log(width);
		console.log(height);
		console.log(x);
		console.log(starty);
		var rect = new createjs.Shape();
		rect.graphics.beginFill(this.blockcols[0]).drawRect(-1*(width/2),0,width,height);
		rect.graphics.beginStroke(this.blockcols[1]);
		rect.graphics.setStrokeStyle(width/8);
		rect.graphics.moveTo(-1*(width/2),0);
		rect.graphics.lineTo(-1*(width/2),height);
		rect.graphics.moveTo((width/2),0);
		rect.graphics.lineTo((width/2),height);
		rect.x = x;
		rect.y = starty;
		abacus.stage.addChild(rect);
	}

	this.init = function(){
		this.drawColumn();
	}
}