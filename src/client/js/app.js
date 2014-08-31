define(['jquery', 'storage'], function($, Storage){

	var App = Class.extend({

		init : function(){
			this.currentPage = 1;
			this.ready = false;
			this.storage = new Storage();

			console.log('App > init()');
		},

		setGame : function(game){
			this.game = game;
		},

		canStartGame : function(){
			return true;
		},

		tryStartingGame : function(username, starting_callback){
			var self = this;

			console.log('App > tryStartingGame()');

			if(username === '') return;

			var watchCanStart = setInterval(function(){
				if(self.canStartGame()){
					clearInterval(watchCanStart);
					self.startGame(username, starting_callback);
				}
			});
		},

		startGame : function(username, starting_callback){
			var self = this;

			console.log('App > startGame()');

			if(starting_callback){
				starting_callback();
			}

			this.hideIntro(function(){
				self.start(username);
			});
		},

		start : function(username){
			this.game.setServerOptions('localhost', '3000', username);
			this.game.run();
		},


		hideIntro : function(hidden_callback){
			$('body').find('#intro-container').remove();
			$('#game-container').show();
			hidden_callback();
		}

		// can start game
		// 

	});


	return App;

});