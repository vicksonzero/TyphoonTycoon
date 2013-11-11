function Unit(coordinateX,coordinateY,imageSrc){
	var that = this;
	this.x = coordinateX;
	this.y = coordinateY;
	this.image = new Image();
	this.image.src = imageSrc;
	this.origin = {x:this.image.height/2, y:this.image.width/2};
	
	this.image.onload = function(){
		that.origin.x = that.image.height/2;
		that.origin.y = that.image.width/2;
		var atX = that.x - that.origin.x;
		var atY = that.y - that.origin.y;
		ctx.drawImage(that.image,atX,atY);
	};

	this.setOrigin = function(ori_object){
		this.origin = ori_object;
	}
}
