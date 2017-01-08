function StandardAbacusColumn(x,starty,endy,blockstop,blocksbottom,blocksheight,colcols,blockcols,abacus,value,isupper){
	this.elements = [];
	this.colWidthScale = 8/33;
	this.blockcols = blockcols;
	this.value = value;
	this.drawColumn = function(){
		//grey: A0A0A0, stroke 6B6B6B
		var width = this.colWidthScale*abacus.blockWidth;
		var height = endy-starty;
		//console.log(width);
		//console.log(height);
		//console.log(x);
		//console.log(starty);
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

	this.updateY = function(){
		var bmargin = (abacus.verticalMargin*abacus.blockHeight);
		var start = starty+(bmargin/2);
		var incr = abacus.blockHeight+bmargin;
		for (var i = 0; i<blocksheight; i++){
			if (this.elements[i]!=null){
				this.elements[i].updateY(start);
				this.elements[i].updateIndex(i);
			}
			start+=incr;
		}
		console.log(this.howManyInUse());
		abacus.updateTextItems();
	}

	this.initElements = function(){
		this.elements = [];
		for (var i = 0; i<blocksheight; i++){
			if ((i<blockstop)||(i>=blocksheight-blocksbottom)){
				var b = new AbacusBead(x,starty,colcols,abacus,this,i,value);
				b.init();
				//console.log(b);
				this.elements.push(b);
			} else {
				this.elements.push(null);
			}
		}
	}

	this.shuntLeft = function(index){
		if (this.elements.lastIndexOf(null)<index){
			var placeindex = this.elements.indexOf(null);
			var startindex = this.elements.lastIndexOf(null)+1;
			var length = index-startindex+1;
			var movearray = this.elements.splice(startindex,length);
			var args = [placeindex, 0].concat(movearray);
			Array.prototype.splice.apply(this.elements, args);
			this.updateY();
		}
	}

	this.shuntRight = function(index){
		if (this.elements.indexOf(null)>index){
			//console.log(this.elements);
			var placeindex = this.elements.lastIndexOf(null)+1;
			var endindex = this.elements.indexOf(null)-1;
			var length = endindex-index+1;
			var movearray = this.elements.splice(index,length);
			var args = [placeindex, 0].concat(movearray);
			Array.prototype.splice.apply(this.elements, args);
			this.updateY();
			//console.log(this.elements);
		}
	}

	this.howManyInUse = function(){
		if (isupper==true){
			var index = this.elements.lastIndexOf(null);
			if (index!=this.elements.length-1){
				return this.elements.slice(index+1,this.elements.length);
			} else {
				return [];
			}
		} else {
			var index = this.elements.indexOf(null);
			if (index!=0){
				return this.elements.slice(0,index);
			} else {
				return [];
			}
		}
	}

	this.init = function(){
		this.drawColumn();
		this.initElements();
		this.updateY();
	}
}