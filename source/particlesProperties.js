function checkCurrentEmitterElement() {
	return (currentElement && currentElement.element.type === "emitter");
}

function UseParticlesTexture(event) {
	// TODO add UI and adapt for particle emitters
	var id = parseInt(event.target.id.substr(event.target.id.indexOf('-') + 1));

	if (checkCurrentAnimatorElement()) {
		currentElement.element.timeline[currentFrame].texture = id;

		if (currentElement.element.textures.indexOf(id) === -1) {
			currentElement.element.textures.push(id);
		}

		updateCompositor();
	}
}

function SetParticlesAlpha(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.alpha = {
			start : parseFloat(properties.particles.alpha.start.value),
			end : parseFloat(properties.particles.alpha.end.value)
		};

		updateCompositor();
	}
}

function SetParticlesScale(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.scale = {
			start : parseFloat(properties.particles.scale.start.value),
			end : parseFloat(properties.particles.scale.end.value),
			minimumScaleMultiplier : parseFloat(properties.particles.scalemult.value)
		};

		updateCompositor();
	}
}

function SetParticlesColor(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.color = {
			start : '#' + properties.particles.color.start.value,
			end : '#' + properties.particles.color.end.value
		};

		updateCompositor();
	}
}

function SetParticlesSpeed(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.speed = {
			start : parseFloat(properties.particles.speed.start.value),
			end : parseFloat(properties.particles.speed.end.value),
			minimumSpeedMultiplier : parseFloat(properties.particles.speedmult.value)
		};

		updateCompositor();
	}
}

function SetParticlesAcceleration(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.acceleration = {
			x : parseFloat(properties.particles.acceleration.x.value),
			y : parseFloat(properties.particles.acceleration.y.value)
		};

		updateCompositor();
	}
}

function SetParticlesSpeedmax(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.maxSpeed = parseFloat(properties.particles.speedmax.value);

		updateCompositor();
	}
}

function SetParticlesStartrotation(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.startRotation = {
			min : parseFloat(properties.particles.startrotation.min.value),
			max : parseFloat(properties.particles.startrotation.max.value)
		};

		updateCompositor();
	}
}

function SetParticlesNorotation(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.noRotation = properties.particles.norotation.checked;

		updateCompositor();
	}
}

function SetParticlesRotationspeed(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.rotationSpeed = {
			min : parseFloat(properties.particles.rotationspeed.min.value),
			max : parseFloat(properties.particles.rotationspeed.max.value)
		};

		updateCompositor();
	}
}

function SetParticlesParticlelifetime(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.lifetime = {
			min : parseFloat(properties.particles.particlelifetime.min.value),
			max : parseFloat(properties.particles.particlelifetime.max.value)
		};

		updateCompositor();
	}
}

function SetParticlesBlendmode(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.blendMode = properties.particles.blendmode.value.toLowerCase();

		updateCompositor();
	}
}

function SetParticlesSpawn(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.frequency = parseFloat(properties.particles.spawn.value);

		updateCompositor();
	}
}

function SetParticlesEmitterlifetime(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.emitterLifetime = parseFloat(properties.particles.emitterlifetime.value);

		updateCompositor();
	}
}

function SetParticlesMaxparticles(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.maxParticles = parseFloat(properties.particles.maxparticles.value);

		updateCompositor();
	}
}

function SetParticlesSpawntype(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.spawnType = properties.particles.spawntype.value.toLowerCase();

		updateCompositor();
	}
}

function SetParticlesPosition(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.position = {
			x : parseFloat(properties.particles.position.x.value),
			y : parseFloat(properties.particles.position.y.value)
		};

		updateCompositor();
	}
}

function SetParticlesQueue(event) {
	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.addAtBack = properties.particles.queue.checked;

		updateCompositor();
	}
}

function ResetParticlesValue(event) {
	if (currentElement) {
		switch (event.target) {
			case properties.particles.alpha.start.reset:
				break;
			case properties.particles.alpha.end.reset:
				break;
			case properties.particles.scale.reset:
				break;
			case properties.particles.scalemult.reset:
				break;
			case properties.particles.color.reset:
				break;
			case properties.particles.speed.reset:
				break;
			case properties.particles.speedmult.reset:
				break;
			case properties.particles.acceleration.reset:
				break;
			case properties.particles.speedmax.reset:
				break;
			case properties.particles.startrotation.reset:
				break;
			case properties.particles.norotation.reset:
				break;
			case properties.particles.rotationspeed.reset:
				break;
			case properties.particles.particlelifetime.reset:
				break;
			case properties.particles.blendmode.reset:
				break;
			case properties.particles.spawn.reset:
				break;
			case properties.particles.emitterlifetime.reset:
				break;
			case properties.particles.maxparticles.reset:
				break;
			case properties.particles.spawntype.reset:
				break;
			case properties.particles.position.reset:
				break;
			case properties.particles.queue.reset:
				break;
			default:
		}

	}
}

function CreateParticlesProperties() {
	properties.particles = document.getElementById('particlesProperties');

	properties.particles.alpha = {};
	properties.particles.alpha.start = document.getElementById('alpha-start');
	properties.particles.alpha.start.reset = properties.particles.alpha.start.previousElementSibling;
	properties.particles.alpha.end = document.getElementById('alpha-end');
	properties.particles.alpha.end.reset = properties.particles.alpha.end.previousElementSibling;

	properties.particles.scale = {};
	properties.particles.scale.start = document.getElementById('scale-start');
	properties.particles.scale.end = document.getElementById('scale-end');
	properties.particles.scale.reset = properties.particles.scale.start.previousElementSibling;

	properties.particles.scalemult = document.getElementById('scale-mult');
	properties.particles.scalemult.reset = properties.particles.scalemult.previousElementSibling;

	properties.particles.color = {};
	properties.particles.color.start = document.getElementById('color-start');
	properties.particles.color.end = document.getElementById('color-end');
	properties.particles.color.reset = properties.particles.color.start.previousElementSibling;

	properties.particles.speed = {};
	properties.particles.speed.start = document.getElementById('speed-start');
	properties.particles.speed.end = document.getElementById('speed-end');
	properties.particles.speed.reset = properties.particles.speed.start.previousElementSibling;

	properties.particles.speedmult = document.getElementById('speed-mult');
	properties.particles.speedmult.reset = properties.particles.speedmult.previousElementSibling;

	properties.particles.acceleration = {};
	properties.particles.acceleration.x = document.getElementById('acceleration-x');
	properties.particles.acceleration.y = document.getElementById('acceleration-y');
	properties.particles.acceleration.reset = properties.particles.acceleration.x.previousElementSibling;

	properties.particles.speedmax = document.getElementById('max-speed');
	properties.particles.speedmax.reset = properties.particles.speedmax.previousElementSibling;

	properties.particles.startrotation = {};
	properties.particles.startrotation.min = document.getElementById('start-rotation-min');
	properties.particles.startrotation.max = document.getElementById('start-rotation-max');
	properties.particles.startrotation.reset = properties.particles.startrotation.min.previousElementSibling;

	properties.particles.norotation = document.getElementById('no-rotation');
	properties.particles.norotation.reset = properties.particles.norotation.previousElementSibling;

	properties.particles.rotationspeed = {};
	properties.particles.rotationspeed.min = document.getElementById('rotation-speed-min');
	properties.particles.rotationspeed.max = document.getElementById('rotation-speed-max');
	properties.particles.rotationspeed.reset = properties.particles.rotationspeed.min.previousElementSibling;

	properties.particles.particlelifetime = {};
	properties.particles.particlelifetime.min = document.getElementById('lifetime-min');
	properties.particles.particlelifetime.max = document.getElementById('lifetime-max');
	properties.particles.particlelifetime.reset = properties.particles.particlelifetime.min.previousElementSibling;

	properties.particles.blendmode = document.getElementById('blend-mode-particle');
	properties.particles.blendmode.reset = properties.particles.blendmode.previousElementSibling;

	properties.particles.spawn = document.getElementById('spawn');
	properties.particles.spawn.reset = properties.particles.spawn.previousElementSibling;

	properties.particles.emitterlifetime = document.getElementById('emitter-lifetime');
	properties.particles.emitterlifetime.reset = properties.particles.emitterlifetime.previousElementSibling;

	properties.particles.maxparticles = document.getElementById('max-particles');
	properties.particles.maxparticles.reset = properties.particles.maxparticles.previousElementSibling;

	properties.particles.spawntype = document.getElementById('spawn-type');
	properties.particles.spawntype.reset = properties.particles.spawntype.previousElementSibling;

	properties.particles.position = {};
	properties.particles.position.x = document.getElementById('emitter-position-x');
	properties.particles.position.y = document.getElementById('emitter-position-y');
	properties.particles.position.reset = properties.particles.position.x.previousElementSibling;

	properties.particles.queue = document.getElementById('queue');
	properties.particles.queue.reset = properties.particles.queue.previousElementSibling;

	for (var mode in PIXI.BLEND_MODES) {
		var option = document.createElement('option');
		option.value = mode;
		option.appendChild(document.createTextNode(mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()));

		properties.particles.blendmode.appendChild(option);
	}

	properties.particles.alpha.start.addEventListener('input', SetParticlesAlpha);
	properties.particles.alpha.end.addEventListener('input', SetParticlesAlpha);
	properties.particles.scale.start.addEventListener('input', SetParticlesScale);
	properties.particles.scale.end.addEventListener('input', SetParticlesScale);
	properties.particles.scalemult.addEventListener('input', SetParticlesScale);
	properties.particles.color.start.addEventListener('input', SetParticlesColor);
	properties.particles.color.end.addEventListener('input', SetParticlesColor);
	properties.particles.speed.start.addEventListener('input', SetParticlesSpeed);
	properties.particles.speed.end.addEventListener('input', SetParticlesSpeed);
	properties.particles.speedmult.addEventListener('input', SetParticlesSpeed);
	properties.particles.acceleration.x.addEventListener('input', SetParticlesAcceleration);
	properties.particles.acceleration.y.addEventListener('input', SetParticlesAcceleration);
	properties.particles.speedmax.addEventListener('input', SetParticlesSpeedmax);
	properties.particles.startrotation.min.addEventListener('input', SetParticlesStartrotation);
	properties.particles.startrotation.max.addEventListener('input', SetParticlesStartrotation);
	properties.particles.norotation.addEventListener('change', SetParticlesNorotation);
	properties.particles.rotationspeed.min.addEventListener('input', SetParticlesRotationspeed);
	properties.particles.rotationspeed.max.addEventListener('input', SetParticlesRotationspeed);
	properties.particles.particlelifetime.min.addEventListener('input', SetParticlesParticlelifetime);
	properties.particles.particlelifetime.max.addEventListener('input', SetParticlesParticlelifetime);
	properties.particles.blendmode.addEventListener('input', SetParticlesBlendmode);
	properties.particles.spawn.addEventListener('input', SetParticlesSpawn);
	properties.particles.emitterlifetime.addEventListener('input', SetParticlesEmitterlifetime);
	properties.particles.maxparticles.addEventListener('input', SetParticlesMaxparticles);
	properties.particles.spawntype.addEventListener('input', SetParticlesSpawntype);
	properties.particles.position.x.addEventListener('input', SetParticlesPosition);
	properties.particles.position.y.addEventListener('input', SetParticlesPosition);
	properties.particles.queue.addEventListener('change', SetParticlesQueue);

	properties.particles.alpha.start.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.alpha.end.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.scale.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.scalemult.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.color.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.speed.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.speedmult.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.acceleration.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.speedmax.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.startrotation.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.norotation.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.rotationspeed.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.particlelifetime.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.blendmode.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawn.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.emitterlifetime.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.maxparticles.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawntype.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.position.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.queue.reset.addEventListener('click', ResetParticlesValue);
}