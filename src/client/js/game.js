define(['entities/player', 'gameclient','map','renderer'], function(Player, GameClient,Map, Renderer){



	var Game = Class.extend({

		init : function(app){

			this.app = app;

			this.renderer = null;

			this.player = new Player("player", "");

			this.entities = {};
		},

		width: function() {
			return this.map_grid.width * this.gridSize;
		},

		height: function() {
			return this.map_grid.height * this.gridSize;
		},

		setup : function(canvas){
			this.canvas = canvas;
		},

		setupGame : function(){
			this.gridSize = 16;
			this.map_grid = {
				width: this.canvas.width()/16,
				height: this.canvas.height()/16,
			}
		},

		setServerOptions: function(host, port, username) {
			this.host = host;
			this.port = port;
			this.username = username;
		},

		run : function(){
			this.connect();
		},

		connect : function(){
			var self = this;
			this.client = new GameClient();
			
			this.client.onConnected(function(data){

			});

			this.client.onDisconnected(function(data){

			});

			this.client.onPlayerConnected(function(player){
				self.player.id = player.id;
				self.player.name = player.name;
				self.addEntity(player);
			});

			this.client.onPlayerDisconnected(function(player){
				var $list = $('section.playerconsole').find('ul');
				var row = $('<li>'+player.name+' disconnected</li>');
				$list.append(row);
			});

			this.client.onEntityList(function(playersList){
				var $list = $('section.playerlist').find('ul');
				$list.html('');
				$.each(playersList, function(index, data){
					var row = $('<li></li>');
					row.html(data.name);
					$list.append(row);
				});
			});

			this.client.connect(this.username);
			this.startGame();
		},

		restart : function(){

		},


		startGame: function() {

			this.setupGame();

			// init crafty
			this.crafty = Crafty.init(
				this.width(), 
				this.height(), 
				this.canvas[0]);

			this.crafty.background('whitesmoke');

			for (var x = 0; x < this.map_grid.width; x++) {
				for (var y = 0; y < this.map_grid.height; y++) {

					var at_edge = x == 0 || x == this.map_grid.width - 1 || y == 0 || y == this.map_grid.height - 1;

					if (at_edge) {
						Crafty.e('2D, Canvas, Color')
						.attr({
						x: x * this.gridSize,
						y: y * this.gridSize,
						w: this.gridSize,
						h: this.gridSize
						})
						.color('rgb(20, 125, 40)');
					}
				}
			}

			// set elements
			this.crafty.e('Floor, 2D, Canvas, Color')
			  .attr({x: 0, y: this.canvas.height()-20, w: this.canvas.width(), h: 10})
			  .color('green');


			this.crafty.e('2D, Canvas, Color, Fourway, Gravity')
			  .attr({x: 0, y: 0, w: 50, h: 50})
			  .color('#F00')
			  .fourway(6)
			  .gravity('Floor');
			//this.tick();
		},

		addEntity : function(entity){
			var self = this;

			if(this.entities[entity.id] !== "undefined"){
				console.log('entity already exists!');
			}

			this.entities[entity.id] = entity;
		},

		forEachEntity : function(callback){
			console.log(this.entities);
			_.each(this.entities, function(entity){
				callback(entity);
			});
		},


/*		tick: function() {
			console.log('tick');
			this.currentTime = new Date().getTime();
			if(this.started) {
				//this.updateCursorLogic();
				//this.updater.update();
				this.renderer.renderFrame();
			}
			if(!this.isStopped) {
				requestAnimFrame(this.tick.bind(this));
			}
		},
*/
	});


	return Game;

});