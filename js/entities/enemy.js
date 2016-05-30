var Enemy = function(game){
};


Enemy.prototype ={
	createEnemy: function(x,y){
		var me = this;
	    me.black_army = game.add.sprite(x,y,'black_army');
	    me.black_army.scale.setTo(2,2);
	    me.black_army.anchor.setTo(0.5,0.5);

	    game.physics.arcade.enable(me.black_army);
	    me.black_army.body.setSize(15, 15, 0, 30);

	    me.black_army.animations.add('up',[1],true);
	    me.black_army.animations.add('right',[3],true);
	    me.black_army.animations.add('left',[2],true);
	    me.black_army.animations.add('down',[0],true);
	    me.death_animation = me.black_army.animations.add('death',[0,4,5,6]);
	    me.death_animation.killOnComplete = true;

	    me.black_army.body.immovable = false;
	    me.black_army.body.moves = true;
	    me.black_army.body.allowRotation = false;

	    me.black_army.name = "Black Army Guy";
	    me.black_army.Health = 100;
	    me.black_army.Damage = 15;
	    return me.black_army
	}
}