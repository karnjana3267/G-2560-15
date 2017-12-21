/**
 * Menu state.
 */
function Menu() {
	Phaser.State.call(this);
}

/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Menu.prototype = proto;

Menu.prototype.preload = function() {
	this.load.pack("start", "assets/assets-pack.json");
};

Menu.prototype.create = function() {
	
	this.bg = this.game.add.sprite(0, 0, "bg1");
	
	var cx=this.world.centerX;
	var mname = this.add.sprite(cx,250,"mname");
	var mstart = this.add.sprite(cx,400,"mstart");
	var mstory = this.add.sprite(cx,500,"mstory");
	var how = this.add.sprite(cx,600,"How");
	var mteam = this.add.sprite(cx,700,"mteam");
	
	mname.scale.set(1.5);
	mstart.scale.set(1.5);
	mstory.scale.set(1.5);
	mteam.scale.set(1.5);
	how.scale.set(1.5);
	
	mname.anchor.set(0.5, 0.5);
	mstart.anchor.set(0.5, 0.5);
	mstory.anchor.set(0.5, 0.5);
	mteam.anchor.set(0.5, 0.5);
	how.anchor.set(0.5, 0.5);
	
	mname.inputEnabled = true;
	mstart.inputEnabled = true;
	mstory.inputEnabled = true;
	mteam.inputEnabled = true;
	how.inputEnabled = true;
	
	mstart.events.onInputDown.add(this.startLevel, this);
    mstory.events.onInputDown.add(this.startStory, this);
    mteam.events.onInputDown.add(this.startTeam, this);    
    how.events.onInputDown.add(this.startHow, this);  
};
Menu.prototype.startLevel = function(){
	this.game.state.start("Level");
};
Menu.prototype.startStory = function(){
	this.game.state.start("Story");
};
Menu.prototype.startHow = function(){
	this.game.state.start("HowTo");
};
Menu.prototype.startTeam = function(){
	this.game.state.start("Team");
};