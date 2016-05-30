
var width = 1024;
// width = 2048;
var height = 768;
// height = 500;
var game = new Phaser.Game(width, height, Phaser.AUTO, 'phaser-div', {preload: preload, create: create, update: update,render:render});

function preload() {
    game.load.image('bg', 'assets/images/background.jpg');
    game.load.image('ground', 'assets/images/platform.png');
    game.load.image('invisible_wall', 'assets/images/invisible_wall.png')
    game.load.image('star', 'assets/images/star.png');
    game.load.image('talking_yahya', 'assets/images/yahya_talking.png');
    game.load.image('talk_box','assets/images/talkingbox.png');
    game.load.spritesheet('yahya', 'assets/spritesheets/yahya_hassan.png',19,40);
    game.load.spritesheet('black_army','assets/spritesheets/black_army_guy.png',19,40);
    game.load.spritesheet('sword','assets/spritesheets/sword.png',32,40);
}
var player;
var move = false;
var x_speed = 350;
var y_speed = 350;
var platforms;
var cursors;
var keyboard;
var spaceKey;

var stars;
var score = 0;
var scoreText;
function create(){
	// select physics engine
	game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 2000, 768);
	//create a background
    background = game.add.sprite(0, 0, 'bg');
    // background.scale.setTo(2,2);
    
	/************
	  Talk_Box
    *************/

    yahya_talking = game.add.sprite(15,15,'talking_yahya');
    yahya_talking.scale.setTo(0.2,0.2);

    talk_box = game.add.sprite(180,15,'talk_box');
    talk_box.scale.setTo(2.5,3.45);

    yahya_text = game.add.text(210,75,"");

    talk_group = game.add.group();
    talk_group.addChild(talk_box);
    talk_group.addChild(yahya_talking);
    talk_group.addChild(yahya_text);
    talk_group.alpha = 0;
    talk_group.fixedToCamera = true;

    /************
	 World Bounds
    *************/
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

    /************
	Weapons & Armor
    *************/
    sword = game.add.sprite(20,0,'sword');
    sword.animations.add('attack', [2,1,0], true);
    sword.anchor.setTo(0.5,0.5);

    /************
	  black_army
    *************/
    black_army = game.add.sprite(400,400,'black_army');
    black_army.scale.setTo(2,2);
    black_army.anchor.setTo(0.5,0.5);

    game.physics.arcade.enable(black_army);
    black_army.body.setSize(19, 10, 0, 30);

    black_army.animations.add('up',[1],true);
    black_army.animations.add('right',[3],true);
    black_army.animations.add('left',[2],true);
    black_army.animations.add('down',[0],true);

    black_army.Health = 100;
    black_army.Damage = 15;

    /************
	   Player
    *************/
    
    player = game.add.sprite(30, 400, 'yahya');
    player.scale.setTo(2,2);
    player.anchor.setTo(0.5, 0.5);
    
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.setSize(19, 10, 0, 30);

    player.animations.add('up',[1],true);
    player.animations.add('down',[0],true);
    player.animations.add('left',[2],true);
    player.animations.add('right',[3],true);

    player.Health = 100;
    player.addChild(sword);

	game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);


	// /************
	//   Hitboxes_weapons
 //    *************/
 //    hitboxes = game.add.group();
 //    // create a group for all the player's hitboxes
 //    // give all the hitboxes a physics body (I'm using arcade physics btw)     
 //    hitboxes.enableBody = true;     
 //    // make the hitboxes children of the player. They will now move with the player     
 //    player.addChild(hitboxes);     
 //    // create a "hitbox" (really just an empty sprite with a physics body)     
 //    var sword_hitbox = hitboxes.create(0,0,null);     
 //    // set the size of the hitbox, and its position relative to the player     
 //    sword_hitbox.body.setSize(50, 50, player.width, player.height / 2);     
 //    // add some properties to the hitbox. These can be accessed later for use in calculations     
 //    sword_hitbox.name = "sword";     
 //    sword_hitbox.damage = 50;
    

    /************
	     HUD
    *************/
    //Created a Sprite with fixedToCamera = true
    var sprite = game.add.sprite(0,0);
    sprite.fixedToCamera = true;
    //addChild of my text at x:0, y:0
    var text = game.add.text(0,0,"Health: "+player.Health, {fill: '#ffffff'});
    sprite.addChild(text);
    //position the cameraOffset of my Sprite
    sprite.cameraOffset.x = 15;
    sprite.cameraOffset.y = 585;

    cursors = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update(){
	game.physics.arcade.collide(player, invisible_walls);
	game.physics.arcade.collide(black_army, invisible_walls);
	game.physics.arcade.collide(player, black_army);

	player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    black_army.body.velocity.x = 0;
    black_army.body.velocity.y = 0;

	if(spaceKey.isDown){
    	sword.animations.play('attack',20,true);
    	attack();
	}else{
		sword.animations.stop();
		sword.frame = 2;
		deactivate_talk_box();
	}

    if (cursors.up.isDown && cursors.right.isDown)
    {
        //  Move up_right
        player.body.velocity.y = -y_speed;
        player.body.velocity.x = x_speed;
        player.animations.play('right');
    }
    else if(cursors.up.isDown && cursors.left.isDown)
    {
    	// Move up_left
        player.body.velocity.y = -y_speed;
        player.body.velocity.x = -x_speed;
        player.animations.play('left');
    }
    else if(cursors.down.isDown && cursors.right.isDown)
    {
    	// Move down_right
        player.body.velocity.y = y_speed;
        player.body.velocity.x = x_speed;
        player.animations.play('right');
    }
    else if(cursors.down.isDown && cursors.left.isDown)
    {
    	// Move down_left
        player.body.velocity.y = y_speed;
        player.body.velocity.x = -x_speed;
        player.animations.play('left');
    }
    else if (cursors.up.isDown)
    {
        //  Move up
        player.body.velocity.y = -y_speed;
        player.body.velocity.x = 0;
        player.animations.play('up');
    }
    else if(cursors.down.isDown)
    {
    	// Move down
        player.body.velocity.y = y_speed;
        player.body.velocity.x = 0;
        player.animations.play('down');
    }
    else if(cursors.left.isDown)
    {
    	// Move left
        player.body.velocity.y = 0;
        player.body.velocity.x = -x_speed;
        player.animations.play('left');
    }
    else if(cursors.right.isDown)
    {
        //  Move right
        player.body.velocity.y = 0;
        player.body.velocity.x = x_speed;
        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();
        player.frame = 4;
    }
}

function activate_talk_box(text){
	talk_group.alpha = 1;
	yahya_text.setText(text);
}
function deactivate_talk_box(){
	talk_group.alpha = 0;
}
function attack(){
	// enableHitbox('sword');
	activate_talk_box('Random Yahya Hassan Replik');
}

// activate a hitbox by namefunction 
// function enableHitbox(hitboxName) {     
// 	// search all the hitboxes     
// 	for(var i = 0; i < hitboxes.children.length; i++)
// 	{ 
// 		// if we find the hitbox with the "name" specified   
// 		if(hitboxes.children[i].name === hitboxName)
// 		{
// 			// reset it
// 			hitboxes.children[i].reset(0,0); 
// 		}     
// 	}
// }
// // disable all active hitboxesfunction 
// function disableAllHitboxes() 
// {     
// 	hitboxes.forEachExists(function(hitbox) 
// 	{
// 		hitbox.kill();     
// 	});
// }
function render() {

    game.debug.bodyInfo(player, 32, 32);

    game.debug.body(black_army);
    game.debug.body(player);


}