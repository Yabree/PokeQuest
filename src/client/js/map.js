define(['jquery'], function($){

	var Map = Class.extend({
		init : function(game){
			this.game = game;
			this.data = [];
			this.isLoaded = false;
			this.tilsetsLoaded = false;
			this.mapLoaded = false;

			this._loadMap();
			this._initTilsets();
		},

		_loadMap : function(){
			var self = this;
				filepath = "../maps/location-interior-home.json";

				$.get(filepath, function (data) {
					self._initMap(data);
					//self._generateCollisionGrid();
					//self._generatePlateauGrid();
					self.mapLoaded = true;
					//self._checkReady();
				}, 'json');			
		},

		isReady : function(){
			return this.mapLoaded;
		},

		_initTilsets : function(){

		},

		_initMap : function(map){
			this.width = map.width;
			this.height = map.height;
			this.location = map.location;

			this.data = map.data;
			this.collisions = map.collisions;
			this.animated = map.animated;
			this.doors = map.doors;

			this.mapLoaded = true;
		}
	});

	return Map;

});