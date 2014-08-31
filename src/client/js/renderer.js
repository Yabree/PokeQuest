define(function(){ // camera, character, player

	var Renderer = Class.extend({
		init : function(game, canvas, background, foreground){
			this.game = game;
			this.context 	= ( canvas && canvas.getContext ) ? canvas.getContext("2d") : null;
			this.background = ( background && background.getContext ) ? background.getContext("2d") : null;
			this.foreground = ( foreground && foreground.getContext ) ? foreground.getContext("2d") : null;

			this.canvas = canvas;
			this.backcanvas = background;
			this.forecanvas = foreground;

			this.tilesize = 20;

			console.log('Renderer > init()');
		},


		// static rendering !
		// only once per view ?
		drawTerrain : function(){

		},

		clearScreen : function(ctx){
			ctx.clearRect(0, 0, 2000, 2000);
		},

		renderFrame : function(){


			// clear screen
			this.clearScreen(this.context);
			// context.save

			// draw terrain

			// draw animated tilsets

			// draw entities
			this.drawEntities();

			// draw hight tilsets

			// context restore

			// draw cursor

		},

		drawEntities : function(){
			var self = this;
			var count = 0;
			this.game.forEachEntity(function(){
				count++;
				self.context.beginPath();
				self.context.arc(50, 50, 10, 0, 2 * Math.PI, true);
				self.context.fillStyle = 'green';
				self.context.fill();
				self.context.lineWidth = 0;
			});
		}
	});

	return Renderer;

});