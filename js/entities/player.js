var Player = function(game){
};


Player.prototype = {
	createPlayer: function(){
		var me = this;

		me.player = game.add.sprite(30, 400, 'yahya');
	    me.player.scale.setTo(2,2);
	    me.player.anchor.setTo(0.5, 0.5);
	    
	    game.physics.arcade.enable(me.player);
	    me.player.body.collideWorldBounds = true;
	    me.player.body.setSize(10, 5, 0, 30);

	    me.player.animations.add('up',[1],true);
	    me.player.animations.add('down',[0],true);
	    me.player.animations.add('left',[2],true);
	    me.player.animations.add('right',[3],true);

	    me.player.Health = 100;
	    me.player.speed = 250;
	    me.player.Damage = 10;

	    me.player.last_direction = 'right';

		game.camera.follow(me.player, Phaser.Camera.FOLLOW_TOPDOWN);
		return me.player;
	},
	checkAction: function(){
		var me = this;
		if (cursors.up.isDown && cursors.right.isDown)
	    {
	        //  Move up_right
	        me.move('up_right',me.player.speed);
	    }
	    else if(cursors.up.isDown && cursors.left.isDown)
	    {
	    	// Move up_left
	        me.move('up_left',me.player.speed);
	    }
	    else if(cursors.down.isDown && cursors.right.isDown)
	    {
	    	// Move down_right
	        me.move('down_right',me.player.speed);
	    }
	    else if(cursors.down.isDown && cursors.left.isDown)
	    {
	    	// Move down_left
	        me.move('down_left',me.player.speed);
	    }
	    else if (cursors.up.isDown)
	    {
	        //  Move up
	        me.move('up',me.player.speed);
	    }
	    else if(cursors.down.isDown)
	    {
	    	// Move down
	        me.move('down',me.player.speed);
	    }
	    else if(cursors.left.isDown)
	    {
	    	// Move left
	        me.move('left',me.player.speed);
	    }
	    else if(cursors.right.isDown)
	    {
	        //  Move right
	        me.move('right',me.player.speed);
	    }
	    else
	    {
	        //  Stand still
	        me.move('stop',0);
	    }
	},
	flipSword: function(){
		sword.scale.x *= -1;
	},
	swordResize: function(direction){
		switch(direction){
			case 'up_left':
			case 'left':
			case 'down_left':
    			sword.anchor.setTo(-1,0.5);
    			sword.body.setSize(50,100,-100,10);
			break;
			case 'up_right':
			case 'right':
			case 'down_right':
    			sword.anchor.setTo(0.8,0.5);
    			sword.body.setSize(50,100,45,10);
			break;
		}
	},
	move: function(direction,speed){
		var me = this;
		if(direction != 'stop'){
			me.player.last_direction = direction;
		}

    	if(direction.indexOf('left') > -1 && sword.direction != 'left')
    	{
    		this.flipSword();
    		sword.direction = 'left';
    	}
    	if(direction.indexOf('right') > -1 && sword.direction != 'right')
    	{
    		this.flipSword();
    		sword.direction = 'right';
    	}

    	this.swordResize(direction);

		switch(direction){
			case 'up':
				me.player.body.velocity.y = -speed;
			    me.player.body.velocity.x = 0;
			    me.player.animations.play('up');
			break;
			case 'up_left':
				me.player.body.velocity.y = -speed;
		        me.player.body.velocity.x = -speed;
		        me.player.animations.play('left');
    			sword.body.setSize(50,100,-55,10);
			break;
			case 'left':
			    me.player.body.velocity.y = 0;
		        me.player.body.velocity.x = -speed;
		        me.player.animations.play('left');
    			sword.body.setSize(50,100,-55,10);
			break;
			case 'down_left':
			    me.player.body.velocity.y = speed;
		        me.player.body.velocity.x = -speed;
		        me.player.animations.play('left');
    			sword.body.setSize(50,100,-55,10);
			break;
			case 'down':
			    me.player.body.velocity.y = speed;
		        me.player.body.velocity.x = 0;
		        me.player.animations.play('down');
			break;
			case 'down_right':
				me.player.body.velocity.y = speed;
		        me.player.body.velocity.x = speed;
		        me.player.animations.play('right');
			break;
			case 'right':
		        me.player.body.velocity.y = 0;
			    me.player.body.velocity.x = speed;
			    me.player.animations.play('right');
			break;
			case 'up_right':
		        me.player.body.velocity.y = -speed;
			    me.player.body.velocity.x = speed;
			    me.player.animations.play('right');
			break;
			case 'stop':
				me.player.animations.stop();
				me.player.body.velocity.y = speed;
				me.player.body.velocity.x = speed;
		        me.player.frame = 4;
		        if(me.player.last_direction.indexOf('left') > -1)
		        {
    				sword.body.setSize(50,100,0,10);
		        }
	        break;
		}
    	me.player.direction = direction;
	}

}