define(function(){


	var Entity = Class.extend({
		init: function(id, kind){
			var self = this;
			this.id = id;
			this.kind = kind;

			this.setGridPosition(0,0);
		},

		setName : function(name){
			this.name = name;
		},

		setPosition : function(x,y){
			this.x = x;
			this.y = y;
		},

		setGridPosition: function(x,y){
			this.gridX = x;
			this.gridY = y;
			this.setPosition(x * 20, y * 20);
		}
	});

	return Entity;
	 
});