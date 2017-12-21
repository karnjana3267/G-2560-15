/**
 * Gameover state.
 */
function Gameover () {
	Phaser.State.call(this);
}

var proto = Object.create(Phaser.State);
Gameover.prototype = proto;

Gameover.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};
Gameover.prototype.create = function() {
	this.stage.backgroundColor = '#696969';
	
	this.music = this.add.sound("end") ;
	this.music.allowMultiple=true ;
	this.music.play() ;
	
	var sprite = this.add.sprite(580,260,"gameo");
	sprite.anchor.set(0.5, 0.5);
	sprite.scale.set(1.5);
	
	var playagain = this.add.sprite(590,560,"playagain");
	playagain.anchor.set(0.5, 0.5);
	playagain.scale.set(0.5);
	
	
	playagain.inputEnabled = true;
	
	playagain.events.onInputDown.add(this.startLevel, this);
	
};	
Gameover.prototype.startLevel = function(){
	this.game.sound.stopAll();
	this.game.state.start("Level");
};


