function Game(stage,xocolor,Fraction,doc,abacuspalette){
	this.palette = null;
	this.abacusrunning = null;

	function Decimal(stage,xocolor){
		this.abacustype = 0;
		this.abacus = null;
		this.init = function(){
			this.abacus = new OneColumnAbacus(stage,15,10,10,xocolor);
			this.abacus.init();
		}
	}
	function Soroban(stage,xocolor){
		this.abacustype = 1;
		this.abacus = null;
		this.init = function(){
			this.abacus = new StandardAbacus(stage,15,1,5,4,10,xocolor,8);
			this.abacus.init();
		}
	}
	function Suanpan(stage,xocolor){
		this.abacustype = 2;
		this.abacus = null;
		this.init = function(){
			this.abacus = new StandardAbacus(stage,15,2,5,5,10,xocolor);
			this.abacus.init();
		}
	}
	function Nephohualtzintzin(stage,xocolor){
		this.abacustype = 3;
		this.abacus = null;
		this.init = function(){
			this.abacus = new StandardAbacus(stage,13,3,5,4,20,xocolor);
			this.abacus.init();
		}
	}
	function Hexadecimal(stage,xocolor){
		this.abacustype = 4;
		this.abacus = null;
		this.init = function(){
			this.abacus = new StandardAbacus(stage,15,1,8,7,16,xocolor);
			this.abacus.init();
		}
	}
	function Binary(stage,xocolor){
		this.abacustype = 5;
		this.abacus = null;
		this.init = function(){
			this.abacus = new OneColumnAbacus(stage,15,1,2,xocolor);
			this.abacus.init();
		}
	}
	function Schety(stage,xocolor){
		this.abacustype = 6;
		this.abacus = null;
		this.init = function(){
			this.abacus = new OneColumnAbacus(stage,15,10,10,xocolor,null,true);
			this.abacus.init();
		}
	}

	this.initAbacus = function(abacus){
		stage.removeAllChildren();
		switch(abacus) {
			case 0:
				this.abacusrunning = new Decimal(stage,xocolor);
				this.abacusrunning.init();
				break;
			case 1:
				this.abacusrunning = new Soroban(stage,xocolor);
				this.abacusrunning.init();
				break;
			case 2:
				this.abacusrunning = new Suanpan(stage,xocolor);
				this.abacusrunning.init();
				break;
			case 3:
				this.abacusrunning = new Nephohualtzintzin(stage,xocolor);
				this.abacusrunning.init();
				break;
			case 4:
				this.abacusrunning = new Hexadecimal(stage,xocolor);
				this.abacusrunning.init();
				break;
			case 5:
				this.abacusrunning = new Binary(stage,xocolor);
				this.abacusrunning.init();
				break;
			case 6:
				this.abacusrunning = new Schety(stage,xocolor);
				this.abacusrunning.init();
				break;
		}
	}

	this.init = function(){
		window.Fraction = Fraction;
		this.palette = new abacuspalette.AbacusPalette(this,doc.getElementById('abacus-button'),undefined);
		//var a = new StandardAbacus(stage,15,2,5,5,10,xocolor);
		this.abacusrunning = new Soroban(stage,xocolor);
		this.abacusrunning.init();
	}
}