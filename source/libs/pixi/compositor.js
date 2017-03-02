function Compositor(composition) {
	PIXI.Container.call(this);

	this.elements = [];
	this.framerate = 60;
	this.framelength = 1000 / this.framerate;
	this.loop = true;
	this.length = 0;

	this.currentFrame = 0;
	this.timer = 0;

	this.playing = false;

	this.init(composition);
}

Compositor.prototype = Object.create(PIXI.Container.prototype);
Compositor.prototype.constructor = Compositor;

Compositor.prototype.init = function (data) {
	this.framerate = data.fps;
	this.framelength = 1000 / this.framerate;
	this.loop = data.loop;
	this.length = data.length;

	data.animators.forEach(function (animator) {
		animator = new Animator(animator);
		this.addElement(animator);

		if (animator.timeline.length > this.length) {
			this.length = animator.timeline.length;
		}
	}, this);

	this.stop();

	this.timer += this.framelength;
}

Compositor.prototype.addElement = function (element) {
	this.elements.push(element);
	this.addChild(element);
}

Compositor.prototype.removeElement = function (element) {
	var index = this.elements.indexOf(element);

	if (index > -1) {
		this.elements.splice(index, 1);
		this.removeChild(element);
	}
}

Compositor.prototype.play = function () {
	if (!this.playing) {
    	PIXI.ticker.shared.add(this.tick, this);
		this.playing = true;
	}
}

Compositor.prototype.pause = function () {
	if (this.playing) {
	    PIXI.ticker.shared.remove(this.tick, this);
	    this.playing = false;
	}
}

Compositor.prototype.stop = function () {
	this.pause();

	this.elements.forEach(function (element) {
		element.reset();
	}, this);
}

Compositor.prototype.goToFrame = function (frame) {
	this.elements.forEach(function (element) {
		element.goToFrame(frame);
	}, this);
}

Compositor.prototype.tick = function (length) {
	if (this.length) {
		length = PIXI.ticker.shared.elapsedMS;
		this.timer -= length;

		if (this.timer <= 0) {
			while (this.timer <= 0) {
				this.timer += this.framelength;
				this.currentFrame += 1;
				// TODO tick for the skip frames too
			}

			while (this.loop && this.currentFrame >= this.length) {
				this.currentFrame -= this.length;
			}
			
			if (this.currentFrame < this.length) {
				this.elements.forEach(function (element) {
					element.tick(this.currentFrame);
				}, this);
			}
		}
	}
}