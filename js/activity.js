define(["sugar-web/activity/activity",'easeljs','tweenjs','activity/game','activity/standardabacus','activity/standardabacuscolumn','activity/abacusbead','activity/onecolumnabacus'], function (act) {

	// Manipulate the DOM only when it is ready.
	require(['domReady!'], function (doc) {

		// Initialize the activity.
		require(["sugar-web/env","sugar-web/datastore","fraction"], function(env,datastore,fraction) {
			act.setup();
			act.getXOColor(function (error, colors) {
				runactivity(act,doc,colors,env,datastore,fraction);
			});
		});
	});

});

function runactivity(act,doc,colors,env,datastore,fraction){
	var canvas;
	var stage;
	var g;
	var e;

	function init(){
		canvas = document.getElementById('actualcanvas');
		canvas.width = window.innerWidth; 
		canvas.height = window.innerHeight-55;
		stage = new createjs.Stage(canvas);
		stage.update();
		stage.mouseEventsEnabled = true;

		createjs.Ticker.setFPS(30);
		createjs.Ticker.addEventListener("tick", handleTick);
		function handleTick() {
			stage.update();
		}
		var g = new Game(stage,colors,fraction);
		g.init();
	}
	init();
}