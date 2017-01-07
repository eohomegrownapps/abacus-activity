function StandardAbacus(stage,rods,topnumber,factor,bottomnumber,base,colours){
	//top bar: 8/5*blockh
	//middle bar: blockh
	//bottom bar: 8/5*blockh
	//margin between blocks: blockw/3
	//margin between blocks on line: blockh/20
	//block 25,33
	//top margin: screen height/10
	//blockheight given screen: 9*screen height/10
	this.blockScaleYFromX = 25/33;
	this.topBottomBarScale = 8/5;
	this.leftRightBarScale = 8/5*this.blockScaleYFromX;
	this.middleBarScale = 1;
	this.horizontalMargin = 1/3;
	this.verticalMargin = 1/20;
	this.extraBeads = 2;

	this.blockHeight = 0;
	this.blockWidth = 0;
	this.abacusHeight = 0;
	this.abacusWidth = 0;
	this.upperBlockHeight = 0;
	this.lowerBlockHeight = 0;

	this.stage = stage;
	this.topcolumns = [];
	this.bottomcolumns = [];

	this.blockGivenWidth = function(width){
		var blockwidth = width/((2*this.leftRightBarScale)+rods+this.horizontalMargin*rods);
		return blockwidth;
	}

	this.blockGivenHeight = function(height){
		var blockheight = height/((2*this.topBottomBarScale)+(topnumber+this.extraBeads)+this.verticalMargin*(topnumber+this.extraBeads)+this.middleBarScale+(bottomnumber+this.extraBeads)+this.verticalMargin*(bottomnumber+this.extraBeads));
		return blockheight;
	}

	this.heightGivenBlockWidth = function(blockwidth){
		var blockheight = this.blockScaleYFromX*blockwidth;
		var h = blockheight*((2*this.topBottomBarScale)+(topnumber+this.extraBeads)+this.verticalMargin*(topnumber+this.extraBeads)+this.middleBarScale+(bottomnumber+this.extraBeads)+this.verticalMargin*(bottomnumber+this.extraBeads));
		return h;
	}

	this.widthGivenBlockWidth = function(blockwidth){
		var w = blockwidth*((2*this.leftRightBarScale)+rods+this.horizontalMargin*rods);
		return w;
	}

	this.initValues = function(){
		var height = (9/10-1/20)*stage.canvas.height;
		var width = 9/10*stage.canvas.width;
		var w = this.blockGivenWidth(width);
		var h = this.blockScaleYFromX*w;
		if (this.heightGivenBlockWidth(w)>height){
			h = this.blockGivenHeight(height);
			w = h/this.blockScaleYFromX;
			console.log("Using height");
		}
		this.blockHeight = h;
		this.blockWidth = w;
		this.abacusHeight = this.heightGivenBlockWidth(this.blockWidth);
		this.abacusWidth = this.widthGivenBlockWidth(this.blockWidth);
		this.upperBlockHeight = this.blockHeight*((topnumber+this.extraBeads)+this.verticalMargin*(topnumber+this.extraBeads));
		this.lowerBlockHeight = this.blockHeight*((bottomnumber+this.extraBeads)+this.verticalMargin*(bottomnumber+this.extraBeads));
		console.log(this.blockHeight);
		console.log(this.blockWidth);
		console.log(this.abacusHeight);
		console.log(this.abacusWidth);

	}

	this.initRectangle = function(){
		var rect = new createjs.Shape();
		rect.graphics.beginStroke("#000000");
		rect.graphics.setStrokeStyle(this.leftRightBarScale*this.blockWidth);
		rect.graphics.beginFill("#C0C0C0").drawRoundRect((this.leftRightBarScale*this.blockWidth)/2,(this.leftRightBarScale*this.blockWidth)/2,this.abacusWidth-(this.leftRightBarScale*this.blockWidth),this.abacusHeight-(this.leftRightBarScale*this.blockWidth),2/3*this.blockWidth);
		rect.x = (stage.canvas.width-this.abacusWidth)/2;
		rect.y = stage.canvas.height/10;
		stage.addChild(rect);
	}

	this.initDivider = function(){
		var rect = new createjs.Shape();
		rect.graphics.beginFill("#000000").drawRect(0,0,this.abacusWidth-2*(this.leftRightBarScale*this.blockWidth),this.middleBarScale*this.blockHeight);
		rect.x = (stage.canvas.width-this.abacusWidth)/2+(this.leftRightBarScale*this.blockWidth);
		rect.y = stage.canvas.height/10+(this.leftRightBarScale*this.blockWidth)+this.upperBlockHeight;
		stage.addChild(rect);
		console.log(rect);
	}

	this.initColumns = function(){
		var startx = ((stage.canvas.width-this.abacusWidth)/2)+(this.leftRightBarScale*this.blockWidth)+((this.horizontalMargin*this.blockWidth)/2)+(this.blockWidth/2);
		var incr = ((this.horizontalMargin*this.blockWidth))+this.blockWidth;
		//console.log("======");
		//console.log(startx);
		//console.log(incr);
		var starty = stage.canvas.height/10+(this.leftRightBarScale*this.blockWidth);
		var endy = starty+this.upperBlockHeight;
		var grey = ["#A0A0A0","#6B6B6B"];
		var black = ["#000000","#000000"];
		var colinuse;
		console.log(colours);
		var fill = colours.fill;
		var stroke = colours.stroke;
		var xocolinuse;
		for (var item = 0; item<rods; item++){
			if (item%2==0){
				colinuse = black;
				xocolinuse = fill;
			} else {
				colinuse = grey;
				xocolinuse = stroke;
			}
			var c = new StandardAbacusColumn(startx,starty,endy,topnumber,0,topnumber+this.extraBeads,xocolinuse,colinuse,this);
			c.init();
			this.topcolumns.push(c);
			startx+=incr;
		}
		starty = endy+this.middleBarScale*this.blockHeight;
		endy = starty+this.lowerBlockHeight;
		startx = ((stage.canvas.width-this.abacusWidth)/2)+(this.leftRightBarScale*this.blockWidth)+((this.horizontalMargin*this.blockWidth)/2)+(this.blockWidth/2);
		for (var item = 0; item<rods; item++){
			if (item%2==0){
				colinuse = black;
				xocolinuse = fill;
			} else {
				colinuse = grey;
				xocolinuse = stroke;
			}
			var c = new StandardAbacusColumn(startx,starty,endy,0,bottomnumber,bottomnumber+this.extraBeads,xocolinuse,colinuse,this);
			c.init();
			this.bottomcolumns.push(c);
			startx+=incr;
		}
	}

	this.init = function(){
		this.initValues();
		this.initRectangle();
		this.initDivider();
		this.initColumns();
	}
}