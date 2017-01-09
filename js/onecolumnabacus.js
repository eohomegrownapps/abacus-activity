function OneColumnAbacus(stage,rods,number,base,colours,startvalue=rods,schety=false){
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
	this.rods = rods;

	this.blockHeight = 0;
	this.blockWidth = 0;
	this.abacusHeight = 0;
	this.abacusWidth = 0;
	this.upperBlockHeight = 0;
	this.lowerBlockHeight = 0;
	this.colHeight = 0;

	this.stage = stage;
	this.columns = [];
	this.rodtext = [];
	this.answertext = null;

	this.schetyColumns = [1000000000,100000000,10000000,1000000,100000,10000,1000,100,10,1,0.25,0.1,0.01,0.001,0.0001];

	this.blockGivenWidth = function(width){
		var blockwidth = width/((2*this.leftRightBarScale)+rods+this.horizontalMargin*rods);
		return blockwidth;
	}

	this.blockGivenHeight = function(height){
		var blockheight = height/((2*this.topBottomBarScale)+(number+this.extraBeads)+this.verticalMargin*(number+this.extraBeads));
		return blockheight;
	}

	this.heightGivenBlockWidth = function(blockwidth){
		var blockheight = this.blockScaleYFromX*blockwidth;
		var h = blockheight*((2*this.topBottomBarScale)+(number+this.extraBeads)+this.verticalMargin*(number+this.extraBeads));
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
		this.colHeight = this.blockHeight*((number+this.extraBeads)+this.verticalMargin*(number+this.extraBeads));
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

	this.initColumns = function(){
		var startx = ((stage.canvas.width-this.abacusWidth)/2)+(this.leftRightBarScale*this.blockWidth)+((this.horizontalMargin*this.blockWidth)/2)+(this.blockWidth/2);
		var incr = ((this.horizontalMargin*this.blockWidth))+this.blockWidth;
		//console.log("======");
		//console.log(startx);
		//console.log(incr);
		var starty = stage.canvas.height/10+(this.leftRightBarScale*this.blockWidth);
		var endy = starty+this.colHeight;
		var grey = ["#A0A0A0","#6B6B6B"];
		var black = ["#000000","#000000"];
		var colinuse;
		console.log(colours);
		var fill = colours.fill;
		var stroke = colours.stroke;
		var xocolinuse;
		var val;
		if (schety==false){
			for (var item = 0; item<rods; item++){
				if (item%2==0){
					colinuse = black;
					xocolinuse = fill;
				} else {
					colinuse = grey;
					xocolinuse = stroke;
				}
				val = Math.pow(base,startvalue-item-1);
				var c = new StandardAbacusColumn(startx,starty,endy,0,number,number+this.extraBeads,xocolinuse,colinuse,this,val,false);
				c.init();
				this.columns.push(c);
				startx+=incr;
			}
		} else {
			var heightcol = number+this.extraBeads;
			var theight;
			for (var item = 0; item<rods; item++){
				if (item%2==0){
					colinuse = black;
					xocolinuse = fill;
				} else {
					colinuse = grey;
					xocolinuse = stroke;
				}
				val = this.schetyColumns[item];
				if(item==10){
					theight=4;
				} else {
					theight=number;
				}
				var c = new StandardAbacusColumn(startx,starty,endy,0,theight,heightcol,xocolinuse,colinuse,this,val,false,false,true);
				c.init();
				this.columns.push(c);
				startx+=incr;
			}
		}
	}

	this.initTextItems = function(){
		var startx = ((stage.canvas.width-this.abacusWidth)/2)+(this.leftRightBarScale*this.blockWidth)+((this.horizontalMargin*this.blockWidth)/2)+(this.blockWidth/2);
		var incr = ((this.horizontalMargin*this.blockWidth))+this.blockWidth;
		for (var i = 0; i<rods; i++){
			var text = new createjs.Text("",(stage.canvas.width/70).toString()+"px Arial", "#FFF");
			text.set({
			    textAlign: 'center'
			});
			text.x = startx;
			text.y = stage.canvas.height/10+this.abacusHeight-(this.leftRightBarScale*this.blockWidth)/2;
			stage.addChild(text);
			this.rodtext.push(text);
			startx += incr;
		}
		var text = new createjs.Text("",(this.blockWidth).toString()+"px Arial", "#000");
		text.set({
		    textAlign: 'center'
		});
		text.x = stage.canvas.width/2;
		text.y = stage.canvas.height/35;
		stage.addChild(text);
		this.answertext = text;
	}

	this.updateTextItems = function(){
		if (this.columns.length==rods){
			var sumarr = [];
			var total = 0;
			for (var i = 0; i<rods; i++){
				this.columns[i].updateAges();
				var use = this.columns[i].howManyInUse();
				var sum = use.length;
				if (sum!=0){
					this.rodtext[i].text=sum.toString();
				} else {
					this.rodtext[i].text="";
				}
				var tempsum = this.columns[i].value*use.length;
				if (tempsum!=0){
					sumarr.push(tempsum);
					total+=tempsum;
				}
			}
			if (sumarr.length==1){
				var str = total.toString();
				this.answertext.text = str;
			} else if (total!=0){
				var str = "";
				for (var i = 0; i<sumarr.length-1; i++){
					str += sumarr[i].toString()+" + ";
				}
				str += sumarr[sumarr.length-1].toString()+" = "+total.toString();
				this.answertext.text = str;
			} else {
				this.answertext.text = "";
			}
		}
	}

	this.init = function(){
		this.initValues();
		this.initRectangle();
		this.initColumns();
		this.initTextItems();
	}
}