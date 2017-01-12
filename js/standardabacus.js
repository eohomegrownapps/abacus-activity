function StandardAbacus(stage,rods,topnumber,factor,bottomnumber,base,colours,startvalue=rods){
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

	this.stage = stage;
	this.topcolumns = [];
	this.bottomcolumns = [];
	this.rodtext = [];
	this.answertext = null;

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
		var val;
		for (var item = 0; item<rods; item++){
			if (item%2==0){
				colinuse = black;
				xocolinuse = fill;
			} else {
				colinuse = grey;
				xocolinuse = stroke;
			}
			if (startvalue-item-1<0){
				var div = new window.Fraction(1);
				val = new window.Fraction(Math.pow(base,Math.abs(startvalue-item-1)));
				val = div.div(val).mul(factor);
			} else {
				val = new window.Fraction(Math.pow(base,startvalue-item-1)).mul(factor);
			}

			var c = new StandardAbacusColumn(startx,starty,endy,topnumber,0,topnumber+this.extraBeads,xocolinuse,colinuse,this,val,true);
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
			if (startvalue-item-1<0){
				var div = new window.Fraction(1);
				val = new window.Fraction(Math.pow(base,Math.abs(startvalue-item-1)));
				val = div.div(val);
			} else {
				val = new window.Fraction(Math.pow(base,startvalue-item-1));
			}

			var c = new StandardAbacusColumn(startx,starty,endy,0,bottomnumber,bottomnumber+this.extraBeads,xocolinuse,colinuse,this,val,false);
			c.init();
			this.bottomcolumns.push(c);
			startx+=incr;
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
		text.y = stage.canvas.height/40;
		stage.addChild(text);
		this.answertext = text;
	}

	this.updateTextItems = function(){
		if (this.bottomcolumns.length==rods){
			var sumarr = [];
			var total = new window.Fraction(0,1);
			for (var i = 0; i<rods; i++){
				this.topcolumns[i].updateAges();
				this.bottomcolumns[i].updateAges();
				var topuse = this.topcolumns[i].howManyInUse();
				var bottomuse = this.bottomcolumns[i].howManyInUse();
				var sum = factor*topuse.length;
				sum += bottomuse.length;
				if (sum!=0){
					this.rodtext[i].text=sum.toString();
				} else {
					this.rodtext[i].text="";
				}
				var tempsum = new window.Fraction(0,1);
				var tmp = this.topcolumns[i].value;
				tmp = tmp.mul(topuse.length);
				tempsum = tempsum.add(tmp);
				tmp = this.bottomcolumns[i].value;
				tmp = tmp.mul(bottomuse.length);
				tempsum = tempsum.add(tmp);
				var zero = new window.Fraction(0);
				if (!tempsum.equals(zero)){
					sumarr.push(tempsum.toFraction(true));
					total = total.add(tempsum);
				}
			}
			var zero = new window.Fraction(0);
			console.log(sumarr);
			if (sumarr.length==1){
				var str = total.toFraction(true);
				this.answertext.text = str;
			} else if (!total.equals(zero)){
				var str = "";
				for (var i = 0; i<sumarr.length-1; i++){
					str += sumarr[i]+" + ";
				}
				str += sumarr[sumarr.length-1]+" = "+total.toFraction(true);
				this.answertext.text = str;
			} else {
				this.answertext.text = "";
			}
		}
	}

	this.init = function(){
		this.initValues();
		this.initRectangle();
		this.initDivider();
		this.initColumns();
		this.initTextItems();
	}
}