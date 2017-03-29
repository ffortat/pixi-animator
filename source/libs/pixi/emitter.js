function Emitter(emition, spritesheets) {
	PIXI.Container.call(this);

	this.type = emition.type;
	this.emitter;
	this.timeline = [];
	this.textures = [];
	this.properties = {};

	this.init(emition, spritesheets);
}

Emitter.prototype = Object.create(PIXI.Container.prototype);
Emitter.prototype.constructor = Emitter;

Emitter.prototype.init = function (data, spritesheets) {
	var textures = data.textures.slice();
	spritesheets.forEach(function (spritesheet) {
		var baseTexture = PIXI.BaseTexture.fromImage(spritesheet.data ? spritesheet.data : spritesheet.file);
		var indexWidth = (spritesheet.imagewidth / spritesheet.tilewidth);
		var indexHeight = (spritesheet.imageheight / spritesheet.tileheight);
		var maxIndex = spritesheet.firstindex + (indexWidth * indexHeight);
		var index = textures.shift();

		while (index !== undefined && index >= spritesheet.firstindex && index < maxIndex) {
			var localIndex = index - spritesheet.firstindex;

			var row = Math.floor(localIndex / indexWidth);
			var col = localIndex % indexWidth;

			var frame = new PIXI.Rectangle(col * spritesheet.tilewidth, row * spritesheet.tileheight, spritesheet.tilewidth, spritesheet.tileheight);

			this.textures[index] = new PIXI.Texture(baseTexture, frame);

			index = textures.shift();
		}

		if (index !== undefined) {
			textures.unshift(index);
		}
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

	this.interpolate('position');

	this.properties = data.properties;
	this.emitter = new PIXI.particles.Emitter(this, this.getTextureSet(data.properties.textures), data.properties);
}

Emitter.prototype.interpolate = function (property) {
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

Emitter.prototype.getTextureSet = function (textureList) {
	var textureSet = [];

	if (textureList) {
		textureList.forEach(function (textureId) {
			textureSet.push(this.textures[textureId]);
		}, this);
	} 

	return textureSet;
}

Emitter.prototype.reset = function () {
	// this.emitter = new PIXI.particles.Emitter(this, this.getTextureSet(this.properties.textures), this.properties);
	this.emitter.emit.false;
	this.tick(0);
}

Emitter.prototype.goToFrame = function (frame) {

}

Emitter.prototype.tick = function (frame) {
	frame = this.timeline[frame];

	if (frame) {
		if (frame.emit !== undefined) {
			this.emitter.emit = frame.emit;
		}

		// if (frame.texture !== undefined) {
		// 	if (this.textures[frame.texture]) {
		// 		this.texture = this.textures[frame.texture];
		// 	}
		// }

		// if (frame.blendmode) {
		// 	this.blendMode = PIXI.BLEND_MODES[frame.blendmode];
		// }

		// if (frame.pivot) {
		// 	this.pivot = new PIXI.Point(frame.pivot.x, frame.pivot.y);
		// }

		if (frame.position) {
			this.emitter.updateSpawnPos(this.pivot.x + frame.position.x, this.pivot.y + frame.position.y);
			// this.position = new PIXI.Point(this.pivot.x + frame.position.x, this.pivot.y + frame.position.y);
		}

		// if (frame.rotation !== undefined) {
		// 	this.rotation = frame.rotation;
		// }

		// if (frame.scale) {
		// 	this.scale = new PIXI.Point(frame.scale.x, frame.scale.y);
		// }

		// if (frame.alpha !== undefined) {
		// 	this.alpha = frame.alpha;
		// }
	}
}