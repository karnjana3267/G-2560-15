/**
 * HowTo state.
 */
function HowTo() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
HowTo.prototype = proto;

HowTo.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

HowTo.prototype.create = function() {
	this.sprite = this.add.sprite(600, 400,
			"HowTo");
	this.sprite.anchor.set(0.5, 0.5);
	this.sprite.scale.set(1.15);
	
	var backmenu = this.add.sprite(980,740,"backmenu");
	backmenu.anchor.set(0.5, 0.5);
	backmenu.scale.set(0.4);
	backmenu.inputEnabled = true;
	backmenu.events.onInputDown.add(this.startMenu, this);	

};

HowTo.prototype.startMenu = function(){
	this.game.state.start("Menu");
};

HowTo.prototype.startGame = function() {
	this.game.sound.stopAll();
	this.game.state.start("Menu");
};