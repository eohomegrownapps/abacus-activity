function Game(stage,xocolor,Fraction,doc,abacuspalette,custompalette){
	this.palette = null;
	this.custompalette = null;
	this.abacus = null;
	//rods top bottom factor base
	this.customarr = [15,1,4,5,10];

	this.updateCustom = function(rods,top,bottom,factor,base){
		this.customarr[0] = rods;
		this.customarr[1] = top;
		this.customarr[2] = bottom;
		this.customarr[3] = factor;
		this.customarr[4] = base;
	}

	this.Custom = function(stage,xocolor){
		this.abacustype = 10;
		var c = this.customarr;
		this.abacus = new StandardAbacus(stage,c[0],c[1],c[3],c[2],c[4],xocolor);
		this.abacus.init();
	}

	this.Decimal = function(stage,xocolor){
		this.abacustype = 0;
		this.abacus = new OneColumnAbacus(stage,15,10,10,xocolor);
		this.abacus.init();
	}
	this.Soroban = function(stage,xocolor){
		this.abacustype = 1;
		this.abacus = new StandardAbacus(stage,15,1,5,4,10,xocolor,8);
		this.abacus.init();
	}
	this.Suanpan = function(stage,xocolor){
		this.abacustype = 2;
		this.abacus = new StandardAbacus(stage,15,2,5,5,10,xocolor);
		this.abacus.init();
	}
	this.Nepohualtzintzin = function(stage,xocolor){
		this.abacustype = 3;
		this.abacus = new StandardAbacus(stage,13,3,5,4,20,xocolor);
		this.abacus.init();
	}
	this.Hexadecimal = function(stage,xocolor){
		this.abacustype = 4;
		this.abacus = new StandardAbacus(stage,15,1,8,7,16,xocolor);
		this.abacus.init();
	}
	this.Binary = function(stage,xocolor){
		this.abacustype = 5;
		this.abacus = new OneColumnAbacus(stage,15,1,2,xocolor);
		this.abacus.init();
	}
	this.Schety = function(stage,xocolor){
		this.abacustype = 6;
		this.abacus = new OneColumnAbacus(stage,15,10,10,xocolor,null,true);
		this.abacus.init();
	}

	this.initAbacus = function(abacus){
		stage.removeAllChildren();
		switch(abacus) {
			case 0:
				this.Decimal(stage,xocolor);
				break;
			case 1:
				this.Soroban(stage,xocolor);
				break;
			case 2:
				this.Suanpan(stage,xocolor);
				break;
			case 3:
				this.Nepohualtzintzin(stage,xocolor);
				break;
			case 4:
				this.Hexadecimal(stage,xocolor);
				break;
			case 5:
				this.Binary(stage,xocolor);
				break;
			case 6:
				this.Schety(stage,xocolor);
				break;
			case 10:
				this.Custom(stage,xocolor);
				break;
		}
	}

	this.init = function(){
		window.Fraction = Fraction;
		this.palette = new abacuspalette.AbacusPalette(this,doc.getElementById('abacus-button'),undefined);
		this.custompalette = new custompalette.CustomPalette(this,doc.getElementById('settings-button'),undefined);
		//var a = new StandardAbacus(stage,15,2,5,5,10,xocolor);
		this.Soroban(stage,xocolor);
	}
}