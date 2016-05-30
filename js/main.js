var Main = function(game){
	var tween;
	var last_direction = false;
};

Main.prototype = {
	create: function() {
		this.createWorld();
		this.createHUD();

		music = game.add.audio('bg_music');

    	music.play();

	    enemy1 = Enemy.prototype.createEnemy(1200,300);
	    enemy1.id = 1;
	    enemy2 = Enemy.prototype.createEnemy(1250,350);
	    enemy1.id = 2;
	    enemy3 = Enemy.prototype.createEnemy(1200,400);
	    enemy3.id = 3;
	    enemy4 = Enemy.prototype.createEnemy(1250,450);
	    enemy4.id = 4;
	    enemy5 = Enemy.prototype.createEnemy(1200,500);
	    enemy5.id = 5;
		
		enemyList = [];
	    enemyList.push(enemy1);
	    enemyList.push(enemy2);
	    enemyList.push(enemy3);
	    enemyList.push(enemy4);
	    enemyList.push(enemy5);
	    
	    for (var i = 6; i <= 50; i++) {
	    	var test_enemy = Enemy.prototype.createEnemy(1200,400);
	    	test_enemy.id = i;
	    	enemyList.push(test_enemy);
	    }

	    // Create Player
	    player = Player.prototype.createPlayer();

	    sword = game.add.sprite(20,0,'sword');
	    game.physics.arcade.enable(sword);
	    sword.immovable = true;
	    sword.moves = false;
	    sword.animations.add('attack', [2,1,0], true);
		sword.anchor.setTo(0.8,0.5);
	    sword.scale.setTo(0.7,0.7);
		sword.direction = 'right';
	    
	    // hitbox = game.add.group();
	    // hitbox.enableBody = true;

	    // sword_hitbox = hitbox.create(0,0,null);
	    // sword_hitbox.body.setSize(50,50,0,0);

    	player.addChild(sword);
    	// player.addChild(hitbox);

		
	    
	    timer = game.time.create(false);
	    timer.loop(500, this.moveEnemy,this);
	    timer.start();

	    sprite_z_index = game.add.group();
	    sprite_z_index.addChild(player);
	    for (var i = enemyList.length - 1; i >= 0; i--) 
	    {
	    	sprite_z_index.addChild(enemyList[i]);
	    }
	    sprite_z_index.sort();

    	cursors = game.input.keyboard.createCursorKeys();
		spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


	},
	update: function() {
		sword.body.reset(player.x,player.y);
		if(spaceKey.isDown){
			for (var i = enemyList.length - 1; i >= 0; i--) {
				game.physics.arcade.overlap(sword,enemyList[i],this.attackEnemy,false,this);
			}
	    	sword.animations.play('attack',20,true);
		}else{
			sword.animations.stop();
			sword.frame = 2;
		}
		// Check for PlayerMovement
		Player.prototype.checkAction();
		
		// Collision detection
		this.game.physics.arcade.collide(player, invisible_walls);
		var c = 0;
		for (var i = enemyList.length - 1; i >= 0; i--) 
		{
			game.physics.arcade.collide(player,enemyList[i],this.enemyCollision,false,this);
			game.physics.arcade.collide(enemyList[i],enemyList[c]);
			game.physics.arcade.collide(enemyList[i], invisible_walls);
			c++;
		}

		// Sort Spirte z_index
		sprite_z_index.sort('y', Phaser.Group.SORT_ASCENDING);

	},
	render: function() {
		// game.debug.bodyInfo(sprite, 16, 24);
		// game.debug.body(sprite);
		// game.debug.bodyInfo(sword_hitbox, 16, 24);
		// game.debug.body(sword);
		// game.debug.body(player);
		// for (var i = enemyList.length - 1; i >= 0; i--) {
			// game.debug.body(enemyList[i]);
		// }
	},
	attackEnemy: function(sword,enemy){
		enemy.Health -= player.Damage / 2;
		if(enemy.Health < 0){
			// var black_army_guy = enemyList.find(enemy);
			for (var i = enemyList.length - 1; i >= 0; i--) {
				if(enemyList[i].id == enemy.id){
					enemyList.splice(i,1);
				}
			}
			enemy.body.velocity.x = 0;
			enemy.body.velocity.y = 0;
			enemy.animations.play('death',10,false);
		}
	},
	moveEnemy: function(){
		for (var i = enemyList.length - 1; i >= 0; i--) {
			random1 = Math.random() * (50 - 0);
			random2 = Math.random() * (50 - 0);
			random_int = random1 - random2;
			game.physics.arcade.moveToXY(
				enemyList[i], 
				(player.x + random_int), 
				(player.y + random_int),
				100
			);	
		}
	},
	enemyCollision: function(player,enemy){
		// Trigger damage on player?
	},
	moveEnemyAgain: function(enemy){
		enemy.isNotCollidingWithPlayer = true;
	},
	gameOver: function(){
		game.state.start('GameOver');
	},
	createWorld: function(){
		var me = this;
		// Initialize Game Physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// Set World Bounds
	    game.world.setBounds(0, 0, 2000, 768);
		// Set World Background
	    background = game.add.sprite(0, 0, 'bg');
	    // World Bounds
		invisible_walls = game.add.group();
	    invisible_walls.enableBody = true;

	    top_wall = invisible_walls.create(0,310,'invisible_wall');
	    top_wall.scale.setTo(3,1);
	    top_wall.alpha = 0;
	    top_wall.body.immovable = true;
	    
	    bottom_wall = invisible_walls.create(0,530,'invisible_wall');
	    bottom_wall.scale.setTo(3,1);
	    bottom_wall.alpha = 0;
	    bottom_wall.body.immovable = true;
	},
	createHUD: function(){
		//Created a Sprite with fixedToCamera = true
	    var sprite = game.add.sprite(0,0);
	    sprite.fixedToCamera = true;
	    //addChild of my text at x:0, y:0
	    var text = game.add.text(0,0,"Health: ", {fill: '#ffffff'});
	    sprite.addChild(text);
	    //position the cameraOffset of my Sprite
	    sprite.cameraOffset.x = 15;
	    sprite.cameraOffset.y = 585;
	},

};