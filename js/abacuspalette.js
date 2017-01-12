define(["sugar-web/graphics/palette"], function (palette) {

    'use strict';

    var abacuspalette = {};

    abacuspalette.AbacusPalette = function (game, invoker, primaryText, menuData) {
        console.log(game);
        console.log(invoker);
        palette.Palette.call(this, invoker, primaryText);

		var div = document.createElement('div');

		var decimalbutton = document.createElement('button');
		decimalbutton.className = 'toolbutton';
		decimalbutton.setAttribute('id','decimal-button');
		decimalbutton.setAttribute('title','Decimal');
		decimalbutton.onclick = function() {
			that.setAbacus(0);
		}
		var sorobanbutton = document.createElement('button');
		sorobanbutton.className = 'toolbutton';
		sorobanbutton.setAttribute('id','soroban-button');
		sorobanbutton.setAttribute('title','Soroban');
		sorobanbutton.onclick = function() {
			that.setAbacus(1);
		}
		var suanpanbutton = document.createElement('button');
		suanpanbutton.className = 'toolbutton';
		suanpanbutton.setAttribute('id','suanpan-button');
		suanpanbutton.setAttribute('title','Suanpan');
		suanpanbutton.onclick = function() {
			that.setAbacus(2);
		}
		var nepobutton = document.createElement('button');
		nepobutton.className = 'toolbutton';
		nepobutton.setAttribute('id','nepo-button');
		nepobutton.setAttribute('title','Nepohualtzintzin');
		nepobutton.onclick = function() {
			that.setAbacus(3);
		}
		var hexbutton = document.createElement('button');
		hexbutton.className = 'toolbutton';
		hexbutton.setAttribute('id','hex-button');
		hexbutton.setAttribute('title','Hexadecimal');
		hexbutton.onclick = function() {
			that.setAbacus(4);
		}
		var binarybutton = document.createElement('button');
		binarybutton.className = 'toolbutton';
		binarybutton.setAttribute('id','binary-button');
		binarybutton.setAttribute('title','Binary');
		binarybutton.onclick = function() {
			that.setAbacus(5);
		}
		var schetybutton = document.createElement('button');
		schetybutton.className = 'toolbutton';
		schetybutton.setAttribute('id','schety-button');
		schetybutton.setAttribute('title','Schety');
		schetybutton.onclick = function() {
			that.setAbacus(6);
		}

		this.setAbacus = function(state) {
			g.initAbacus(state);
		}
		
		div.appendChild(decimalbutton);
		div.appendChild(sorobanbutton);
		div.appendChild(suanpanbutton);
		div.appendChild(nepobutton);
		div.appendChild(hexbutton);
		div.appendChild(binarybutton);
		div.appendChild(schetybutton);
		
		this.setContent([div]);
		var that = this;
		var g = game;
    };

    var addEventListener = function (type, listener, useCapture) {
        return this.getPalette().addEventListener(type, listener, useCapture);
    };

    abacuspalette.AbacusPalette.prototype =
        Object.create(palette.Palette.prototype, {
            addEventListener: {
                value: addEventListener,
                enumerable: true,
                configurable: true,
                writable: true
            }
        });
	abacuspalette.AbacusPalette.prototype.setShared = function(state) {
		this.setShared(state);
	}

    return abacuspalette;
});
