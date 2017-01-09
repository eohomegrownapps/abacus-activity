function Game(stage,xocolor){
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
	this.init = function(){
		//var a = new StandardAbacus(stage,15,2,5,5,10,xocolor);
		var a = new Soroban(stage,xocolor);
		a.init();
	}
}