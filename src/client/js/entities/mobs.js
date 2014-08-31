define(['mob', 'timer'], function(Mob, Timer) {

	
	var Mobs = {
		Rat: Mob.extend({
			init: function(id) {
				this._super(id, Types.Entities.RAT);
				this.moveSpeed = 350;
				this.idleSpeed = 700;
				this.shadowOffsetY = -2;
				this.isAggressive = false;
			}
		}),
		Skeleton: Mob.extend({
			init: function(id) {
				this._super(id, Types.Entities.SKELETON);
				this.moveSpeed = 350;
				this.atkSpeed = 100;
				this.idleSpeed = 800;
				this.shadowOffsetY = 1;
				this.setAttackRate(1300);
			}
		}),

});