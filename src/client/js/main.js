define(['jquery', 'app'], function($, App) {

	var app, game;

	var initApp = function(){

		$(document).ready(function() {

			app = new App();

			$('#btn-start').on('click', function(){
				var $name = $('#nameinput'),
					name = $name.val();
					
				app.tryStartingGame(name, function(){
					$name.blur();
				});
			});
		});

		initGame();
	};


	var initGame = function(){
		require(['game'], function(Game){
			var canvas = $('#canvas-container');

				game = new Game(app);
				game.setup(canvas);
				app.setGame(game);
		});
	};

	initApp();

});