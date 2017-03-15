function checkCurrentAnimatorElement() {
	if (currentElement && currentElement.element.type === "animator") {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		return true;
	} else {
		return false;
	}
}

function SetAnimatorProperties(data) {
	properties.name.innerText = data.name;
	properties.animator.texture.value = data.texture;
	properties.animator.blendmode.value = data.blendmode;

	if (document.activeElement !== properties.animator.pivot.x) {
		properties.animator.pivot.x.value = data.pivot.x;
	}
	if (document.activeElement !== properties.animator.pivot.y) {
		properties.animator.pivot.y.value = data.pivot.y;
	}
	if (document.activeElement !== properties.animator.position.x) {
		properties.animator.position.x.value = data.position.x;
	}
	if (document.activeElement !== properties.animator.position.y) {
		properties.animator.position.y.value = data.position.y;
	}
	if (document.activeElement !== properties.animator.rotation) {
		properties.animator.rotation.value = data.rotation;
	}
	if (document.activeElement !== properties.animator.scale.x) {
		properties.animator.scale.x.value = data.scale.x;
	}
	if (document.activeElement !== properties.animator.scale.x) {
		properties.animator.scale.y.value = data.scale.y;
	}
	if (document.activeElement !== properties.animator.alpha) {
		properties.animator.alpha.value = data.alpha;
	}
}

function UseTexture(event) {
	var id = parseInt(event.target.id.substr(event.target.id.indexOf('-') + 1));

	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].texture = id;

		if (currentElement.element.textures.indexOf(id) === -1) {
			currentElement.element.textures.push(id);
		}

		updateCompositor();
	}
}

function SetBlendMode(event) {
	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].blendmode = properties.animator.blendmode.value;

		updateCompositor();
	}
}

function SetPivot(point) {
	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].pivot = {
			x : point.x,
			y : point.y
		};

		updateCompositor();
	}
}

function SetPosition(point) {
	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].position = {
			x : point.x,
			y : point.y
		};

		updateCompositor();
	}
}

function SetRotation(event) {
	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].rotation = parseFloat(properties.animator.rotation.value);

		updateCompositor();
	}
}

function SetScale(point) {
	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].scale = {
			x : point.x,
			y : point.y
		};

		updateCompositor();
	}
}

function SetAlpha(event) {
	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].alpha = parseFloat(properties.animator.alpha.value);

		updateCompositor();
	}
}

function ResetAnimatorValue(event) {
	if (currentElement) {
		var frame = currentElement.element.timeline[currentFrame];
		var changed = false;

		if (frame) {
			switch (event.target) {
				case properties.animator.texture.reset :
					if (frame.texture !== undefined) {
						delete frame.texture;
						changed = true;
					}
					break;
				case properties.animator.blendmode.reset :
					if (frame.blendmode !== undefined) {
						delete frame.blendmode;
						changed = true;
					}
					break;
				case properties.animator.pivot.reset :
					if (frame.pivot !== undefined) {
						delete frame.pivot;
						changed = true;
					}
					break;
				case properties.animator.position.reset :
					if (frame.position !== undefined) {
						delete frame.position;
						changed = true;
					}
					break;
				case properties.animator.rotation.reset :
					if (frame.rotation !== undefined) {
						delete frame.rotation;
						changed = true;
					}
					break;
				case properties.animator.scale.reset :
					if (frame.scale !== undefined) {
						delete frame.scale;
						changed = true;
					}
					break;
				case properties.animator.alpha.reset :
					if (frame.alpha !== undefined) {
						delete frame.alpha;
						changed = true;
					}
					break;
			}

			if (changed) {
				refreshCompositor();

				if (frame.texture === undefined && frame.blendmode === undefined && 
					frame.pivot === undefined && frame.position === undefined && 
					frame.rotation === undefined && frame.scale === undefined && 
					frame.alpha === undefined) {

					removeIndicator(currentElement, currentFrame);
					currentElement.element.timeline[currentFrame] = undefined;

					// TODO check remanent last value in given frame
				}

				updateFrame(currentFrame, true);
			}
		}
	}
}

function CreateAnimatorProperties() {
	// TODO change label to reset button
	properties.animator = document.getElementById('animatorProperties');

	properties.animator.texture = document.getElementById('texture-id');
	// properties.animator.texture.reset = properties.animator.texture.peviousElementSibling;

	properties.animator.blendmode = document.getElementById('blend-mode');
	properties.animator.blendmode.reset = properties.animator.blendmode.previousElementSibling;

	properties.animator.pivot = {};
	properties.animator.pivot.x = document.getElementById('pivot-x');
	properties.animator.pivot.y = document.getElementById('pivot-y');
	properties.animator.pivot.reset = properties.animator.pivot.x.previousElementSibling;

	properties.animator.position = {};
	properties.animator.position.x = document.getElementById('position-x');
	properties.animator.position.y = document.getElementById('position-y');
	properties.animator.position.reset = properties.animator.position.x.previousElementSibling;

	properties.animator.rotation = document.getElementById('rotation');
	properties.animator.rotation.reset = properties.animator.rotation.previousElementSibling;

	properties.animator.scale = {};
	properties.animator.scale.x = document.getElementById('scale-x');
	properties.animator.scale.y = document.getElementById('scale-y');
	properties.animator.scale.reset = properties.animator.scale.x.previousElementSibling;

	properties.animator.alpha = document.getElementById('alpha');
	properties.animator.alpha.reset = properties.animator.alpha.previousElementSibling;

	for (var mode in PIXI.BLEND_MODES) {
		var option = document.createElement('option');
		option.value = mode;
		option.appendChild(document.createTextNode(mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()));

		properties.animator.blendmode.appendChild(option);
	}

	properties.animator.blendmode.addEventListener('input', SetBlendMode);

	properties.animator.pivot.x.addEventListener('input', function (event) {
		SetPivot({x : parseFloat(properties.animator.pivot.x.value), y : parseFloat(properties.animator.pivot.y.value)});
	});
	properties.animator.pivot.y.addEventListener('input', function (event) {
		SetPivot({x : parseFloat(properties.animator.pivot.x.value), y : parseFloat(properties.animator.pivot.y.value)});
	});

	properties.animator.position.x.addEventListener('input', function (event) {
		SetPosition({x : parseFloat(properties.animator.position.x.value), y : parseFloat(properties.animator.position.y.value)});
	});
	properties.animator.position.y.addEventListener('input', function (event) {
		SetPosition({x : parseFloat(properties.animator.position.x.value), y : parseFloat(properties.animator.position.y.value)});
	});

	properties.animator.rotation.addEventListener('input', SetRotation);

	properties.animator.scale.x.addEventListener('input', function (event) {
		SetScale({x : parseFloat(properties.animator.scale.x.value), y : parseFloat(properties.animator.scale.y.value)});
	});
	properties.animator.scale.y.addEventListener('input', function (event) {
		SetScale({x : parseFloat(properties.animator.scale.x.value), y : parseFloat(properties.animator.scale.y.value)});
	});

	properties.animator.alpha.addEventListener('input', SetAlpha);

	// properties.animator.texture.reset.addEventListener('click', ResetAnimatorValue);
	properties.animator.blendmode.reset.addEventListener('click', ResetAnimatorValue);
	properties.animator.pivot.reset.addEventListener('click', ResetAnimatorValue);
	properties.animator.position.reset.addEventListener('click', ResetAnimatorValue);
	properties.animator.rotation.reset.addEventListener('click', ResetAnimatorValue);
	properties.animator.scale.reset.addEventListener('click', ResetAnimatorValue);
	properties.animator.alpha.reset.addEventListener('click', ResetAnimatorValue);
}