define(function(){

	var GameClient = Class.extend({

		init: function(host, port) {
			this.connection = null;
			this.host = host;
			this.port = port;
		},

		connect : function(username){
			var self = this;
			
			this.connection = new io();

			this.connection.on('connect', function(){
				self.connection.emit('credentialis', {
					username : username,
					password : 'none'
				});
			});

			this.connection.on('action', function(data){
				self.receiveAction(data);
			});
		},

		receiveAction : function(action){
			console.log(action);
			if(typeof this['on'+action.action] === 'function'){
				this['receive'+action.action](action.data);
			}
		},

		// player connected
		onConnected : function(callback){
			this.connected_callback = callback;
		},

		// player disconnected
		onDisconnected : function(callback){
			this.disconnected_callback = callback;
		},

		// on other player connected
		onPlayerConnected : function(callback){
			this.player_connected_callback = callback;
		},

		// on other player disconnected
		onPlayerDisconnected : function(callback){
			this.player_disconnected_callback = callback;
		},

		onEntityList : function(callback){
			this.entitylist_callback = callback;
		},

		receivePlayerDisconnected : function(player){
			this.player_disconnected_callback(player);
		},

		receivePlayerConnected : function(player){
			this.player_connected_callback(player);
		},

		receiveConnected : function(data){
			this.connected_callback(data);
		},

		receiveEntityList : function(playersList){
			this.entitylist_callback(playersList);
		},

		receiveDisconnected : function(data){
			this.disconnected_callback(data);
		}

		// on connect
		// on disconnect
		// on welcome
		// on spawn
		// on entity move
		// on player change health
		// on chat message
		// (...)

		// receive message
		// receive action
		// receive move
		// receive loot
		// receive attack
		// receive respawn
		// receive chat
		// receive teleport
		// receive damage
		// receive population
		// receive kill
		// receive hitpoints
		// 
		// send message

	});

	return GameClient;

});