/**
 * Story state.
 */
function Story() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Story.prototype = proto;

Story.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Story.prototype.create = function() {
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
			"P1");
	this.sprite.anchor.set(0.5, 0.5);
	this.music = this.add.sound("musicstory") ;
    this.music.allowMultiple=true ;
    this.music.play() ;
    
	var next = this.add.sprite(930,20,"next");
	next.scale.set(0.5);
	next.inputEnabled = true;
	next.events.onInputDown.add(this.showP2, this);
};
Story.prototype.showP2 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"P2");
    this.sprite.anchor.set(0.5, 0.5);
    
    var next = this.add.sprite(930,20,"next");
	next.scale.set(0.5);
	next.inputEnabled = true;
	next.events.onInputDown.add(this.showP3, this);
};

Story.prototype.showP3 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"P3");
    this.sprite.anchor.set(0.5, 0.5);	

    var next = this.add.sprite(930,20,"next");
	next.scale.set(0.5);
	next.inputEnabled = true;
	next.events.onInputDown.add(this.showP4, this);
};

Story.prototype.showP4 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"P4");
    this.sprite.anchor.set(0.5, 0.5);	

    var next = this.add.sprite(930,20,"next");
	next.scale.set(0.5);
	next.inputEnabled = true;
	next.events.onInputDown.add(this.showP5, this);
};

Story.prototype.showP5 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"P5");
    this.sprite.anchor.set(0.5, 0.5);	

    var next = this.add.sprite(930,20,"next");
	next.scale.set(0.5);
	next.inputEnabled = true;
	next.events.onInputDown.add(this.showP6, this);
};

Story.prototype.showP6 = function() {
	this.sprite.kill();
	this.sprite = this.add.sprite(this.world.centerX, this.world.centerY,
	"P6");
    this.sprite.anchor.set(0.5, 0.5);	

    var next = this.add.sprite(930,10,"backmenu");
	next.scale.set(0.45);
	next.inputEnabled = true;
	next.events.onInputDown.add(this.showMenu, this);
};

Story.prototype.showMenu = function() {
	this.game.sound.stopAll();
	this.game.state.start("Menu");
};

Story.prototype.startGame = function() {
	this.game.sound.stopAll();
	this.game.state.start("Menu");
};