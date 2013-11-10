define([], function() {
	"use strict";
	
	var stage;
	var ctx;

	var bgImg;

	function UI(stage) {
		this.stage = stage;
		this.ctx = this.stage.getContext();
	}

	UI.prototype = {
		constructor: UI,
		init: function() {
			this.prepareBgImg();
		},
		prepareBgImg: function() {
			var that = this;
			this.bgImg = new Image();
			this.bgImg.src = "img/map.png";
			this.bgImg.onload = function() {
				that.render();
			}
		},
		render: function() {
			this.ctx.drawImage(this.bgImg, 0, 0);
		}
	};

	return UI;
});