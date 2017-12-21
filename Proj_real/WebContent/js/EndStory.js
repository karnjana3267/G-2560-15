/**
 * EndStory state.
 */
function EndStory() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
EndStory.prototype = proto;

EndStory.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

EndStory.prototype.create = function() {
	this.sprite = this.add.sprite(600, 400,
			"EndStory");
	this.music = this.add.sound("win") ;
	this.music.allowMultiple=true ;
	this.music.play() ;
	this.sprite.anchor.set(0.5, 0.5);
	
	var playagain = this.add.sprite(1050,170,"playagain");
	playagain.anchor.set(0.5, 0.5);
	playagain.scale.set(0.4);
	playagain.inputEnabled = true;
	playagain.events.onInputDown.add(this.startLevel, this);	

};

EndStory.prototype.startLevel = function(){
	this.game.sound.stopAll();
	this.game.state.start("Level");
};

EndStory.prototype.startGame = function() {
	this.game.sound.stopAll();
	this.game.state.start("Menu");
};