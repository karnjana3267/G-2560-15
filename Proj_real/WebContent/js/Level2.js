/**
 * Level2 state.
 */
function Level2() {
	Phaser.State.call(this);
}


/** @type Phaser.State */
var proto = Object.create(Phaser.State);
Level2.prototype = proto;
Level2.prototype.create = function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.arcade.gravity.y = 1000;
	
	this.bg = this.game.add.sprite(0, 0, "bg2");
	this.bg.fixedToCamera = true;
	this.bg.width = this.game.width;
	this.bg.height = this.game.height;
	
	this.map = this.game.add.tilemap("level2");
	this.map.addTilesetImage('tile_set');
	this.maplayer = this.map.createLayer("Tile Layer 2");
	this.maplayer.resizeWorld();
	this.map.setCollisionBetween(0,9999,true,this.maplayer);
	
	this.music = this.add.sound("music2",1,true);
	this.music.play();
	this.boom = this.add.sound("boom",0.5);
	this.shoot = this.add.sound("shoot",0.5);
	this.enemies = this.add.group();
	this.goal = this.add.group();
	this.heart = this.add.group();
	
	for (x in this.map.objects.Object) {
		var obj = this.map.objects.Object[x];
		if (obj.type == "player") {
			console.log(this.player);
			this.player = this.addPlayer(obj.x, obj.y);
			this.game.camera.follow(this.player,
					Phaser.Camera.FOLLOW_PLATFORMER);
			this.player.play("Idle");
			this.player.body.collideWorldBounds = true;
		} else if (obj.type == "enemy1") {
			var r = this.addRobot(obj.x, obj.y);
			this.enemies.add(r);
		} else if (obj.type == "heart") {
			var h = this.addHeart(obj.x, obj.y);
			this.heart.add(h);
		} else if (obj.type == "goal") {
			var g = this.addIce(obj.x, obj.y);
			this.enemies.add(g);
		}
	}
	
	this.hptext = this.add.text(20,15, 'HP : ', { fill: 'red' });
	this.hptext.fixedToCamera = true;
	
	this.heart.count = 0;
	this.player.hp = 3;
	
	this.hp = [];
	for(var i=0;i<this.player.hp;i++){
		this.hp[i] = this.add.sprite(95+(30)*i,28,"hp");
		this.hp[i].anchor.set(0.5);
		this.hp[i].scale.set(1.5);
		this.hp[i].animations.add("all").play(12,true);	
		this.hp[i].fixedToCamera = true;
		this.hp[i].scale.set(1.0);
	} 

	
	this.createWeapon();
	this.player.maxHealth = 3;
	this.player.setHealth(3);
	this.player.events.onKilled.addOnce(this.onPlayerKilled,this);
	this.player.canhit = true;
	this.physics.enable(this.player, Phaser.Physics.ARCADE);
	
	this.heart.enableBody = true;
	
	this.cursors = this.input.keyboard.createCursorKeys();
	this.player.inputEnabled = true;
	this.player.events.onInputDown.add(this.fireWeapon, this); 
	
};

Level2.prototype.onPlayerCollide = function(player,enamies){
	player.damage(1);
	enamies.kill();
	player.canhit = false;
	player.alpha = 0.1;
	
	if(enamies.kill()!=false){
		this.player.hp--;
		if(this.player.hp<0){
			this.player.hp=0;
			this.hp[this.player.hp].visible = false;
		}else if(this.player.hp<3){
			this.hp[this.player.hp].visible = false;
		}	
	
	if(this.player.hp<=0){
		this.player.visible = false;
		}
	}
	
    var tw = this.add.tween(player);
	tw.to({alpha:1},200, "Linear",true,0,5);
	tw.onComplete.addOnce(function(){this.alpha=1;this.canhit=true;}, player);
	return true;
};

Level2.prototype.onPlayerKilled = function(){
	this.music.stop();
	this.game.state.start("Gameover");
		
};

Level2.prototype.collectHeart  = function (player, heart) {
	this.pick = this.add.sound("pick") ;
	this.pick.allowMultiple=true ;
    this.pick.play() ;
	heart.destroy();
	this.heart.count++;
	this.scap =[];
	for(var i=0;i<=this.heart.count;i++){
		if(i==0){
			this.scap[i] = this.add.sprite(20,60, "Heart");
		}else{
		this.scap[i] = this.add.sprite(30*i,60, "Heart");
		this.scap[i].scale.set(0.5);
		this.scap[i].fixedToCamera = true;
		}
	} 
	
	if(this.heart.count==5){
		this.Next();
	}
  };
  
Level2.prototype.update = function() {
	if(this.gameover) return;
	if(this.player == null){
		return;
	}
	this.game.physics.arcade.collide(this.player, this.maplayer);
	this.game.physics.arcade.collide(this.enemies, this.maplayer);
	this.game.physics.arcade.collide(this.goal, this.maplayer);
	this.game.physics.arcade.collide(this.heart, this.maplayer);
	this.physics.arcade.collide(this.player,this.enemies,this.onPlayerCollide,null,this);
	this.physics.arcade.collide(this.player,this.enemies,this.onPlayerKilled,null,this);
	this.physics.arcade.collide(this.player,this.goal,this.Next,null,this);
	this.game.physics.arcade.overlap(this.player, this.heart, this.collectHeart, null, this);
	// ควบคุมการเคลื่อนที่ของ play โดยการกดที่หน้าจอ
	// อ่าน activePointer คือจุดที่ก าลังกด
	if (this.cursors.left.isDown) {
		
		this.player.body.acceleration.x = -200;
		this.player.play("Walk");
		this.player.scale.x = -1;
		this.player.scale.set(0.8);
		this.player.doNothing = false;
	} else if (this.cursors.right.isDown) {
		
		this.player.body.velocity.x = 200;
		this.player.play("Walk");
		this.player.scale.x = 1;
		this.player.scale.set(0.8);
		this.player.doNothing = false;
				
	}else{
		
		this.player.body.velocity.x = 0;
		this.player.play("Idle");
		this.player.scale.set(0.8);
		this.player.doNothing = false;
	}
	this.player.doNothing = false;
	if (this.cursors.up.isDown) {
		if(this.player.body.onFloor()){
			this.player.body.velocity.y = -560;
			this.player.play("Jump");
			this.player.scale.set(0.8);
			this.player.doNothing = false;
			this.jump = this.add.sound("jump");
			this.jump.allowMultiple=true;
			this.jump.play(); 
		}
	}
	if(this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
		this.player.play("Attack");
		this.fireWeapon();
		this.shoot.play();
	}
	this.enemies.forEachAlive(function(a){
		if(a.y > this.world.height) a.y = -Math.random() * 300;},this);
		
	this.physics.arcade.collide(this.enemies,this.weapon.bullets,this.onCollide,null,this);
	
	if(this.player.canhit){
		 this.physics.arcade.collide(this.enemies,this.player,this.onPlayerCollide,null,this);	 
	
	}
	//
	Level2.prototype.onCollide = function(enemies,bullet){
		enemies.kill();
		bullet.kill();
		exp = this.add.sprite(enemies.x, enemies.y-60,"exp");
		exp.anchor.set(0.5); 
		exp.scale.set(2.5);
		exp.animations.add("all",null,50,false).play().killOnComplete=true;
		this.boom.play();
	}
	

};

Level2.prototype.addHeart = function(x, y) {
	h = this.add.sprite(x, y, "Heart");
	h.anchor.set(0,1);
	h.smoothed = false;
	this.game.physics.enable(h);
	return h;
};


Level2.prototype.addPlayer = function(x, y) {
	p = this.add.sprite(x, y, "hero");
	p.animations.add("Idle", aframe("Idle", 10), 10, true);
	p.animations.add("Jump", aframe("Jump", 10), 10, true);
	p.animations.add("Walk", aframe("Walk", 10), 10, true);
	p.animations.add("Attack", aframe("Attack", 10), 10, true);
	this.game.physics.enable(p);
	p.anchor.set(0,1);
	p.play("Idle");
	p.body.collideWorldBounds = true;
	return p;
};

Level2.prototype.addRobot = function(x, y) {
	r = this.add.sprite(x, y, "robot");
	r.animations.add("idle", aframe("Idle", 3), 2, true);
	r.animations.add("jump", aframe("Jump", 4), 12, true);
	r.animations.add("run", aframe("Run", 6), 12, true);
	r.animations.add("hurt", aframe("Hurt", 4), 12, true);
	r.animations.add("walk", aframe("Walk", 6), 12, true);
	r.scale.set(0.3);
	r.anchor.set(0, 1);
	r.play("idle");
	this.game.physics.enable(r);
	r.body.collideWorldBounds = true;
	return r;
};

Level2.prototype.addIce = function(x, y) {
	g = this.add.sprite(x, y, "Ice");
	g.animations.add("idle", aframe("Idle", 5), 12, true);
	g.animations.add("walk", aframe("Walk", 5), 12, true);
	g.scale.set(0.9);
	g.play("idle");
	g.anchor.set(0, 0.9);
	this.game.physics.enable(g);
	
	return g;
};

function aframe(key, n) {
	f = [];
	for (var i = 1; i < n; i++) {
		f.push(key  + i );
	}
	return f;
}
Level2.prototype.createWeapon = function() {
	this.weapon = this.add.weapon(1,"bullet",0);
	this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
	this.weapon.trackSprite(this.player,40,-40);
	this.weapon.bulletSpeed = 1600;
	this.weapon.fireAngle = -2;
	this.weapon.rate = 600;

};
Level2.prototype.fireWeapon = function(){
	this.weapon.fire();
};

Level2.prototype.Next  = function () {
	 this.game.sound.stopAll();
	 this.game.state.start("EndStory");
};

Level2.prototype.quitGame = function() {
	this.game.sound.stopAll();
	this.game.state.start("Menu");
};

	
	

	
	