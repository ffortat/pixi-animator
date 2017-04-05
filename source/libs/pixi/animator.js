function Animator(animation, spritesheets) {
	PIXI.Sprite.call(this);

	this.type = animation.type;
	this.textures = [];
	this.timeline = [];

	this.canvas = new PIXI.Graphics();

	this.displayBounds = false;

	this.init(animation, spritesheets);
}

Animator.prototype = Object.create(PIXI.Sprite.prototype);
Animator.prototype.constructor = Animator;

Animator.prototype.init = function (data, spritesheets) {
	var textures = data.textures.slice();
	spritesheets.forEach(function (spritesheet) {
		var baseTexture = PIXI.BaseTexture.fromImage(spritesheet.data ? spritesheet.data : spritesheet.file);
		var indexWidth = (spritesheet.imagewidth / spritesheet.tilewidth);
		var indexHeight = (spritesheet.imageheight / spritesheet.tileheight);
		var maxIndex = spritesheet.firstindex + (indexWidth * indexHeight);
		var index = textures.shift();

		// TODO don't load all the textures but do a smart selection in the editor when adding / removing a texture with previous frame having interpolation
		for (var i = spritesheet.firstindex; i < maxIndex; i += 1) {
			var localIndex = i - spritesheet.firstindex;

			var row = Math.floor(localIndex / indexWidth);
			var col = localIndex % indexWidth;

			var frame = new PIXI.Rectangle(col * spritesheet.tilewidth, row * spritesheet.tileheight, spritesheet.tilewidth, spritesheet.tileheight);

			this.textures[i] = new PIXI.Texture(baseTexture, frame);
		}

		// while (index !== undefined && index >= spritesheet.firstindex && index < maxIndex) {
		// 	var localIndex = index - spritesheet.firstindex;

		// 	var row = Math.floor(localIndex / indexWidth);
		// 	var col = localIndex % indexWidth;

		// 	var frame = new PIXI.Rectangle(col * spritesheet.tilewidth, row * spritesheet.tileheight, spritesheet.tilewidth, spritesheet.tileheight);

		// 	this.textures[index] = new PIXI.Texture(baseTexture, frame);

		// 	index = textures.shift();
		// }

		// if (index !== undefined) {
		// 	textures.unshift(index);
		// }
	}, this);

	data.timeline.forEach(function (frame, index) {
		if (frame) {
			var object = {};

			for (var key in frame) {
				object[key] = frame[key];
			}

			this.timeline[index] = object;
		}
	}, this);

	this.interpolateInteger('texture');
	this.interpolate('position');
	this.interpolate('rotation');
	this.interpolate('scale');
	this.interpolate('alpha');

	this.addChild(this.canvas);
}

Animator.prototype.interpolate = function (property) {
	var frame;
	
	for (var index = 0; index < this.timeline.length; index += 1) {
		frame = this.timeline[index];

		if (frame && frame[property] !== undefined) {
			var i = index + 1;
			var target = null

			while (i < this.timeline.length && target === null) {
				if (this.timeline[i] && this.timeline[i][property] !== undefined) {
					target = this.timeline[i][property];
				} else {
					i += 1;
				}
			}

			var delta;
			if (target !== null && i > index + 1) {
				if (target.x !== undefined && target.y !== undefined) {
					delta = {
						x : (target.x - frame[property].x) / (i - index),
						y : (target.y - frame[property].y) / (i - index)
					};
				} else {
					delta = (target - frame[property]) / (i - index);
				}
			} else {
				if (frame[property].x !== undefined && frame[property].y !== undefined) {
					delta = {x : 0, y : 0};
				} else {
					delta = 0;
				}
			}
			
			for (var j = index + 1; j < i; j += 1) {
				if (!this.timeline[j]) {
					this.timeline[j] = {};
				}

				if (delta.x !== undefined && delta.y !== undefined) {
					this.timeline[j][property] = {
						x : frame[property].x + delta.x * (j - index),
						y : frame[property].y + delta.y * (j - index)
					};
				} else {
					this.timeline[j][property] = frame[property] + delta * (j - index);
				}
			}

			index = i - 1;
		}
	};
}

Animator.prototype.interpolateInteger = function (property) {
	var frame;
	
	for (var index = 0; index < this.timeline.length; index += 1) {
		frame = this.timeline[index];

		console.log(property, frame);

		if (frame && frame[property] !== undefined && frame[property + 'Interpolate']) {
			console.log(frame[property], frame[property + 'Interpolate']);
			var i = index + 1;
			var target = null

			while (i < this.timeline.length && target === null) {
				if (this.timeline[i] && this.timeline[i][property] !== undefined) {
					target = this.timeline[i][property];
				} else {
					i += 1;
				}
			}

			if (target !== null && i > index + 1) {
				var delta = (target - frame[property]) / (i - index);
				var previousValue = frame[property];
				var value = previousValue;
				

				for (var j = index + 1; j < i; j += 1) {
					value = Math.floor(frame[property] + delta * (j - index));

					console.log(target, j, i, delta, value);

					if (value !== previousValue) {
						if (!this.timeline[j]) {
							this.timeline[j] = {};
						}

						this.timeline[j][property] = value;
						previousValue = value;

						console.log(this.timeline[j][property]);
					}
				}
			}
			
			index = i - 1;
		}
	};
}

Animator.prototype.reset = function () {
	this.tick(0);
}

Animator.prototype.goToFrame = function (frame) {
	var currentFrame;
	var texture;
	var pivot;
	var position;
	var rotation;
	var scale;
	var alpha;

	// TODO reset state to initial

	for (var i = 0; i <= frame; i += 1) {
		currentFrame = this.timeline[i];

		if (currentFrame) {
			if (currentFrame.texture !== undefined) {
				if (this.textures[currentFrame.texture]) {
					texture = this.textures[currentFrame.texture];
				}
			}

			if (currentFrame.blendmode) {
				this.blendMode = PIXI.BLEND_MODES[currentFrame.blendmode];
			}

			if (currentFrame.pivot) {
				pivot = currentFrame.pivot;
			}

			if (currentFrame.position) {
				position = currentFrame.position;
			}

			if (currentFrame.rotation !== undefined) {
				rotation = currentFrame.rotation;
			}

			if (currentFrame.scale) {
				scale = currentFrame.scale;
			}

			if (currentFrame.alpha !== undefined) {
				alpha = currentFrame.alpha;
			}
		}
	}

	if (texture !== undefined) {
		this.texture = texture;
	}

	if (pivot) {
		this.pivot = new PIXI.Point(pivot.x, pivot.y);
	}

	if (position) {
		this.position = new PIXI.Point(this.pivot.x + position.x, this.pivot.y + position.y);
	}

	if (rotation !== undefined) {
		this.rotation = rotation;
	}

	if (scale) {
		this.scale = new PIXI.Point(scale.x, scale.y);
		this.canvas.scale = new PIXI.Point(1 / Math.abs(this.scale.x), 1 / Math.abs(this.scale.y));
	}

	if (alpha !== undefined) {
		this.alpha = alpha;
	}

	if (this.displayBounds) {
		this.canvas.clear();

		this.canvas.lineStyle(1, 0xFF0000, 1);
		this.canvas.drawRect(0, 0, this.width, this.height);
	}
}

Animator.prototype.tick = function (frame) {
	frame = this.timeline[frame];

	if (frame) {
		if (frame.texture !== undefined) {
			if (this.textures[frame.texture]) {
				this.texture = this.textures[frame.texture];
			}
		}

		if (frame.blendmode) {
			this.blendMode = PIXI.BLEND_MODES[frame.blendmode];
		}

		if (frame.pivot) {
			this.pivot = new PIXI.Point(frame.pivot.x, frame.pivot.y);
		}

		if (frame.position) {
			this.position = new PIXI.Point(this.pivot.x + frame.position.x, this.pivot.y + frame.position.y);
		}

		if (frame.rotation !== undefined) {
			this.rotation = frame.rotation;
		}

		if (frame.scale) {
			this.scale = new PIXI.Point(frame.scale.x, frame.scale.y);
			this.canvas.scale = new PIXI.Point(1 / Math.abs(this.scale.x), 1 / Math.abs(this.scale.y));
		}

		if (frame.alpha !== undefined) {
			this.alpha = frame.alpha;
		}

		if (this.displayBounds) {
			this.canvas.clear();

			this.canvas.lineStyle(1, 0xFF0000, 1);
			this.canvas.drawRect(0, 0, this.width, this.height);
		}
	}
}