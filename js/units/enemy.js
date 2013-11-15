// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'utility'
], function(Unit,Stage,Utility)
{
	console.log("enemy.js loaded");

	// TODO: rename it back to Typhoon when Earthquake is created
	function Enemy(startX,startY,spriteSrc){
		//call super constructor.
		Unit.call(this,startX,startY,spriteSrc);
		this.direction 	= 	0 ;
		this.speed 		=	0 ;
		this.force 		= 	{dir:0,mag:0} ;
		this.max_hp 	= 	300;
		this.hp 		= 	this.max_hp;
		Stage.addChild(this,'typhoons');
	}

	//subclass extends superclass
	Enemy.prototype = Object.create(Unit.prototype);
	Enemy.prototype.constructor = Enemy;

	// tick event handler
	Enemy.prototype.tick = function(){	// override
		this.updatePosition();
	};
	Enemy.prototype.updatePosition = function(){
		// force -> velocity
		if(this.force.mag!=0){
			this.addMotion(this.force.dir,this.force.mag);
		}
		// velocity -> displacement
		var addX = Math.cos(this.direction/180*Math.PI) * this.speed;
		var addY = Math.sin(this.direction/180*Math.PI) * this.speed;
		this.x += addX;
		this.y += addY;
	};
	/**
	 * get the current motion of the typhoon
	 * @return {object{dir,sp}} a force object containing direction and speed of the typhoon
	 */
	Enemy.prototype.getMotion = function(){
		return {
			dir:this.direction,
			sp:this.speed
		};
	};
	/**
	 * Sets the motion of the typhoon, ignoring  previous values
	 * @param {number} dir Direction of typhoon
	 * @param {number} sp  Speed of typhoon
	 */
	Enemy.prototype.setMotion = function(dir,sp){
		this.direction = dir;
		this.speed = sp;
	};
	/**
	 * alters the motion by a little bit
	 * @param {number} force_dir       direction of force applied
	 * @param {number} force_magnitude magnitude of force applied
	 */
	Enemy.prototype.addMotion = function(force_dir,force_magnitude){
			newVelo = Utility.vectorSum({dir:this.direction,mag:this.speed},
										{dir:force_dir,mag:force_magnitude});
			this.direction  = newVelo.dir;
			this.speed 		= newVelo.mag;
	};
	/**
	 *	getForce()
	 *
	 *	returns an object {dir,mag} containing the direction and magnitude of the force
	 */
	Enemy.prototype.getForce = function(){
		return this.force;
	};
	/**
	 * sets the motion of the typhoon, ignoring previous values
	 * @param {object{dir,mag}} force direction, magnitude of force applied
	 */
	Enemy.prototype.setForce = function(force){
		this.force = force;
	};
	/**
	 * Modifies the current force object
	 * @param {object{dir,mag}} force: direction, magnitude of force applied
	 */
	Enemy.prototype.addForce = function(force){
			this.force = Utility.vectorSum(this.force,force);
	};
	// </position functions>
	
	/**
	 * applies damage to itself, and be killed if it has no hp
	 * @param  {int/float} dmg amount of damage to apply
	 * @return {void}
	 */
	Enemy.prototype.damage = function(dmg){
		this.hp-=dmg;
		if(hp<=max_hp){
			this.kill();
		}
	};
	Enemy.prototype.kill = function(){

	};
	return Enemy;
})