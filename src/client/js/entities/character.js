define(['entities/entity'], function(Entity){


	var Character = Entity.extend({

		init : function(id, kind){
			var self = this;
			this._super(id, kind);
			this.hitPoints = 100;
			this.maxHitPoints = 100;
			this.exp = 0;
		},

		setMaxHitPoints : function(){

		},

		setHitPoints : function(){

		},



	});

	return Character;

});