var cls 		= require('./lib/class'),
	_ 			= require('underscore'),
	express 	= require("express"),
	io 			= require("socket.io"),
	http		= require('http'),
	logger 		= require('tracer').colorConsole(),
	ES			= {};

module.exports = ES;

var Server = cls.Class.extend({

	init : function(){

	},

	onConnected : function(callback){
		this.connected_callback = callback;
	},

	onDisconnected : function(callback){
		this.disconnected_callback = callback;
	},

	onCredentialis : function(callback){
		this.credentialis_callback = callback;
	},

	onPlayerJoined : function(callback){
		this.player_joined_callback = callback;
	},

	onEntityList : function(callback){
		this.entity_list_callback = callback;
	},


	onError : function(callback){
		this.error_callback = callback;
	},

	broadcast : function(){
		// not implemented
	},

	forEachConnection : function(){
		//_.each(this.connections, callback);
	}

});
     
/**
* Express Websocket Server
* Main server execution
*/
ES.ExpressWebsocketServer = Server.extend({
	init : function(port){
		var self = this;

		this.port = process.env.PORT || 3000;

		this.connections = 0;

		this.players = {};

		this.server();

		this.sockets();
	},

	// start the http server
	server : function(callback){
		var self = this,
			app = express(),
			//dir = 'D:/www/poke/src/client';
			dir = './src/client';

		app.use(express.static(dir + ''));
		app.use(function(err, req, res, next){
			logger.error(err.stack);
		});

		this._httpServer = http.Server(app);
		this._httpServer.listen(this.port, function(){
			logger.info('Server is listening on port ' + self.port);
		});
	},

	addPlayer : function(name, id){
		this.players[id] = {
			name : name,
			id : id
		};
	},

	removePlayer : function(id){
		delete this.players[id];
	},

	getPlayer : function(id){
		return this.players[id];
	},

	getPlayers : function(){
		return this.players;
	},

	// start the socket IO
	sockets : function(callback){
		var self = this;

		this._io = io(this._httpServer);

		this._io.on('connection', function(connection, data){

			// connection WITHOUT credentialis,
			// nothing important yet, cuz we dont have username
			if(self.connection_callback)
			self.connection_callback(self);

			connection.on('credentialis', function(credentialis){
				if(self.credentialis_callback)
					self.credentialis_callback(self, credentialis, connection.id);
			});

			connection.on('disconnect', function(){
				if(self.disconnected_callback)
					self.disconnected_callback(self, connection.id);
			});

			connection.on('playerJoined', function(username){
				if(self.player_joined_callback)
					self.player_joined_callback(self, username, connection.id);
			});
		});

	}


});





/**
logger.trace('hello', 'world');
logger.debug('hello %s',  'world', 123);
logger.info('hello %s %d',  'world', 123, {foo:'bar'});
logger.warn('hello %s %d %j', 'world', 123, {foo:'bar'});
logger.error('hello %s %d %j', 'world', 123, {foo:'bar'}, [1, 2, 3, 4], Object);
*/
