define(['entities/character'], function(Character){
	var Player = Character.extend({

		init : function(id, name, kind){
			this._super(id, kind);
			this.name = name;
			this.id = id;

		}
	});

	return Player;
});