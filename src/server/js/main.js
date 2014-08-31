var fs 		= require("fs"),
	Server 	= require("./server"),
	logger 	= require('tracer').colorConsole();

function main(config){


	server = new Server.ExpressWebsocketServer(8080);


	/** 
	* Abstract JS pattern implementation
	*/
	server.onConnected(function(server){
		logger.info('New user connected');
	});

	server.onDisconnected(function(server, user_id){
		logger.info('user has disconnected');
		server._io.emit('action', {
			action : 'PlayerDisconnected',
			data: server.getPlayer(user_id)
		});
		server.removePlayer(user_id);
		server._io.emit('action', {
			action : 'EntityList',
			data : server.getPlayers()
		});
	});

	/**
	* When user connected & credentialis received 
	*/
	server.onCredentialis(function(server, credentialis, userid){
		server.addPlayer(credentialis.username, userid);
		server._io.emit('action', {
			action : 'PlayerConnected',
			data : server.getPlayer(userid)
		});
		server._io.emit('action', {
			action : 'EntityList',
			data : server.getPlayers()
		});
	});

	server.onPlayerJoined(function(server, username, userid){
		server._io.emit('action', {
			action : 'Connected', 
			data: server.getPlayers()
		});
	});




}


main();