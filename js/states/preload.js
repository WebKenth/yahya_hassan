var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 
        this.game.load.image('bg', 'assets/images/background.jpg');
	    // this.game.load.image('ground', 'assets/images/platform.png');
	    this.game.load.image('invisible_wall', 'assets/images/invisible_wall.png')
	    // this.game.load.image('star', 'assets/images/star.png');
	    this.game.load.image('talking_yahya', 'assets/images/yahya_talking.png');
	    this.game.load.image('talk_box','assets/images/talkingbox.png');
	    this.game.load.spritesheet('yahya', 'assets/spritesheets/yahya_hassan.png',19,40);
	    this.game.load.spritesheet('black_army','assets/spritesheets/black_army_guy.png',19,40);
	    this.game.load.spritesheet('sword','assets/spritesheets/sword.png',32,40);

	    this.game.load.audio('bg_music','assets/audio/bg_music.mp3');
	},

	create: function(){
		this.game.state.start("Main");
	}
}