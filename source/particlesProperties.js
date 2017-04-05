function checkCurrentEmitterElement() {
	return (currentElement && currentElement.element.type === "emitter");
}

function UpdateParticlesProperties() {
	properties.particles.alpha.start.reset.classList.remove('active');
	properties.particles.alpha.end.reset.classList.remove('active');
	properties.particles.scale.reset.classList.remove('active');
	properties.particles.scalemult.reset.classList.remove('active');
	properties.particles.color.reset.classList.remove('active');
	properties.particles.speed.reset.classList.remove('active');
	properties.particles.speedmult.reset.classList.remove('active');
	properties.particles.acceleration.reset.classList.remove('active');
	properties.particles.speedmax.reset.classList.remove('active');
	properties.particles.startrotation.reset.classList.remove('active');
	properties.particles.norotation.reset.classList.remove('active');
	properties.particles.rotationspeed.reset.classList.remove('active');
	properties.particles.particlelifetime.reset.classList.remove('active');
	properties.particles.blendmode.reset.classList.remove('active');
	properties.particles.spawn.reset.classList.remove('active');
	properties.particles.emitterlifetime.reset.classList.remove('active');
	properties.particles.maxparticles.reset.classList.remove('active');
	properties.particles.spawntype.reset.classList.remove('active');
	properties.particles.position.reset.classList.remove('active');
	properties.particles.queue.reset.classList.remove('active');

	var propertiesData = {
		name : currentElement.element.name
	};

	// TODO take into account framedata
	// for (var i = currentFrame; i >= 0; i -= 1) {
		// var frameData = currentElement.element.timeline[i];

		// if (frameData) {
			// var set = true;

			// if (propertiesData.texture === undefined) {
			// 	set = false;
			// 	if (frameData.texture !== undefined) {
			// 		propertiesData.texture = frameData.texture;

			// 		if (i === currentFrame) {
			// 			properties.animator.texture.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (propertiesData.blendmode === undefined) {
			// 	set = false;
			// 	if (frameData.blendmode !== undefined) {
			// 		propertiesData.blendmode = frameData.blendmode;

			// 		if (i === currentFrame) {
			// 			properties.animator.blendmode.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (propertiesData.pivot === undefined) {
			// 	set = false;
			// 	if (frameData.pivot !== undefined) {
			// 		propertiesData.pivot = {x : frameData.pivot.x, y : frameData.pivot.y};

			// 		if (i === currentFrame) {
			// 			properties.animator.pivot.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (propertiesData.position === undefined) {
			// 	set = false;
			// 	if (frameData.position !== undefined) {
			// 		propertiesData.position = {x : frameData.position.x, y : frameData.position.y};

			// 		if (i === currentFrame) {
			// 			properties.animator.position.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (propertiesData.rotation === undefined) {
			// 	set = false;
			// 	if (frameData.rotation !== undefined) {
			// 		propertiesData.rotation = frameData.rotation;

			// 		if (i === currentFrame) {
			// 			properties.animator.rotation.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (propertiesData.scale === undefined) {
			// 	set = false;
			// 	if (frameData.scale !== undefined) {
			// 		propertiesData.scale = {x : frameData.scale.x, y : frameData.scale.y};

			// 		if (i === currentFrame) {
			// 			properties.animator.scale.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (propertiesData.alpha === undefined) {
			// 	set = false;
			// 	if (frameData.alpha !== undefined) {
			// 		propertiesData.alpha = frameData.alpha;

			// 		if (i === currentFrame) {
			// 			properties.animator.alpha.reset.style.fontWeight = 'bold';
			// 		}
			// 	}
			// }

			// if (set) {
			// 	break;
			// }
		// }
	// }

	for (var property in currentElement.element.properties) {
		if (propertiesData[property] === undefined) {
			propertiesData[property] = currentElement.element.properties[property];
		}
	}
	
	SetParticlesProperties(propertiesData);
	// updateViewport(propertiesData);
}

function SetParticlesProperties(data) {
	properties.name.innerText = data.name;

	// TODO(later) display particles texture(s)
	// properties.animator.texture.value = data.texture;

	if (document.activeElement !== properties.particles.alpha.start) {
		properties.particles.alpha.start.value = data.alpha.start;
	}
	if (document.activeElement !== properties.particles.alpha.end) {
		properties.particles.alpha.end.value = data.alpha.end;
	}
	if (document.activeElement !== properties.particles.scale.start) {
		properties.particles.scale.start.value = data.scale.start;
	}
	if (document.activeElement !== properties.particles.scale.end) {
		properties.particles.scale.end.value = data.scale.end;
	}
	if (document.activeElement !== properties.particles.scalemult) {
		properties.particles.scalemult.value = data.scale.minimumScaleMultiplier;
	}
	if (document.activeElement !== properties.particles.color.start) {
		properties.particles.color.start.value = data.color.start;
	}
	if (document.activeElement !== properties.particles.color.end) {
		properties.particles.color.end.value = data.color.end;
	}
	if (document.activeElement !== properties.particles.speed.start) {
		properties.particles.speed.start.value = data.speed.start;
	}
	if (document.activeElement !== properties.particles.speed.end) {
		properties.particles.speed.end.value = data.speed.end;
	}
	if (document.activeElement !== properties.particles.speedmult) {
		properties.particles.speedmult.value = data.speed.minimumSpeedMultiplier;
	}
	if (document.activeElement !== properties.particles.acceleration.x) {
		properties.particles.acceleration.x.value = data.acceleration.x;
	}
	if (document.activeElement !== properties.particles.acceleration.y) {
		properties.particles.acceleration.y.value = data.acceleration.y;
	}
	if (document.activeElement !== properties.particles.speedmax) {
		properties.particles.speedmax.value = data.maxSpeed;
	}
	if (document.activeElement !== properties.particles.startrotation.min) {
		properties.particles.startrotation.min.value = data.startRotation.min;
	}
	if (document.activeElement !== properties.particles.startrotation.max) {
		properties.particles.startrotation.max.value = data.startRotation.max;
	}
	if (document.activeElement !== properties.particles.norotation) {
		properties.particles.norotation.value = data.noRotation;
	}
	if (document.activeElement !== properties.particles.rotationspeed.min) {
		properties.particles.rotationspeed.min.value = data.rotationSpeed.min;
	}
	if (document.activeElement !== properties.particles.rotationspeed.max) {
		properties.particles.rotationspeed.max.value = data.rotationSpeed.max;
	}
	if (document.activeElement !== properties.particles.particlelifetime.min) {
		properties.particles.particlelifetime.min.value = data.lifetime.min;
	}
	if (document.activeElement !== properties.particles.particlelifetime.max) {
		properties.particles.particlelifetime.max.value = data.lifetime.max;
	}
	if (document.activeElement !== properties.particles.blendmode) {
		properties.particles.blendmode.value = data.blendMode.toUpperCase();
	}
	if (document.activeElement !== properties.particles.spawn) {
		properties.particles.spawn.value = data.frequency;
	}
	if (document.activeElement !== properties.particles.emitterlifetime) {
		properties.particles.emitterlifetime.value = data.emitterLifetime;
	}
	if (document.activeElement !== properties.particles.maxparticles) {
		properties.particles.maxparticles.value = data.maxParticles;
	}
	if (document.activeElement !== properties.particles.spawntype) {
		properties.particles.spawntype.value = data.spawnType;
	}
	if (document.activeElement !== properties.particles.position.x) {
		properties.particles.position.x.value = data.pos.x;
	}
	if (document.activeElement !== properties.particles.position.y) {
		properties.particles.position.y.value = data.pos.y;
	}
	if (document.activeElement !== properties.particles.queue) {
		properties.particles.queue.value = data.addAtBack;
	}
}

function UseParticlesTexture(event) {
	// TODO add UI and adapt for particle emitters
	var id = parseInt(event.target.id.substr(event.target.id.indexOf('-') + 1));

	if (checkCurrentEmitterElement()) {
		currentElement.element.properties.textures = [id];

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
		if (currentElement.element.properties.spawnType !== properties.particles.spawntype.value.toLowerCase()) {
			currentElement.element.properties.spawnType = properties.particles.spawntype.value.toLowerCase();
			
			UpdateParticlesSpawntype(currentElement.element);
		}

		switch (currentElement.element.properties.spawnType) {
			case 'rect':
				currentElement.element.properties.spawnRect = {
					x : parseFloat(properties.particles.spawntype.properties.rect.x.value),
					y : parseFloat(properties.particles.spawntype.properties.rect.y.value),
					w : parseFloat(properties.particles.spawntype.properties.rect.width.value),
					h : parseFloat(properties.particles.spawntype.properties.rect.height.value)
				};
				break;
			case 'circle':
				currentElement.element.properties.spawnCircle = {
					x : parseFloat(properties.particles.spawntype.properties.circle.x.value),
					y : parseFloat(properties.particles.spawntype.properties.circle.y.value),
					r : parseFloat(properties.particles.spawntype.properties.circle.radius.value)
				};
				break;
			case 'ring':
				currentElement.element.properties.spawnCircle = {
					x : parseFloat(properties.particles.spawntype.properties.ring.x.value),
					y : parseFloat(properties.particles.spawntype.properties.ring.y.value),
					r : parseFloat(properties.particles.spawntype.properties.ring.min.value),
					minR : parseFloat(properties.particles.spawntype.properties.ring.max.value)
				};
				break;
			case 'burst':
				currentElement.element.properties.particlesPerWave = parseFloat(properties.particles.spawntype.properties.burst.particles.value);
				currentElement.element.properties.particleSpacing = parseFloat(properties.particles.spawntype.properties.burst.spacing.value);
				currentElement.element.properties.angleStart = parseFloat(properties.particles.spawntype.properties.burst.angle.value);
				break;
		}

		updateCompositor();
	}
}

function UpdateParticlesSpawntype(element) {
	for (var spawnType in properties.particles.spawntype.properties) {
		properties.particles.spawntype.properties[spawnType].style.display = 'none';
	}

	if (element.properties.spawnType !== 'point') {
		properties.particles.spawntype.properties[element.properties.spawnType].style.display = 'block';

		switch (element.properties.spawnType) {
			case 'rect':
				if (element.properties.spawnRect === undefined) {
					element.properties.spawnRect = {
						x : 0,
						y : 0,
						w : 0,
						h : 0
					};

					delete element.properties.spawnCircle;
					delete element.properties.particlesPerWave;
					delete element.properties.particleSpacing;
					delete element.properties.angleStart;
				}

				properties.particles.spawntype.properties.rect.x.value = element.properties.spawnRect.x;
				properties.particles.spawntype.properties.rect.y.value = element.properties.spawnRect.y;
				properties.particles.spawntype.properties.rect.width.value = element.properties.spawnRect.w;
				properties.particles.spawntype.properties.rect.height.value = element.properties.spawnRect.h;
				break;
			case 'circle':
				if (element.properties.spawnCircle === undefined) {
					element.properties.spawnCircle = {
						x : 0,
						y : 0,
						r : 0
					};

					delete element.properties.spawnRect;
					delete element.properties.particlesPerWave;
					delete element.properties.particleSpacing;
					delete element.properties.angleStart;
				}

				delete element.properties.spawnCircle.minR;
				
				properties.particles.spawntype.properties.circle.x.value = element.properties.spawnCircle.x;
				properties.particles.spawntype.properties.circle.y.value = element.properties.spawnCircle.y;
				properties.particles.spawntype.properties.circle.radius.value = element.properties.spawnCircle.r;
				break;
			case 'ring':
				if (element.properties.spawnCircle === undefined) {
					element.properties.spawnCircle = {
						x : 0,
						y : 0,
						r : 0,
						minR : 0
					};

					delete element.properties.spawnRect;
					delete element.properties.particlesPerWave;
					delete element.properties.particleSpacing;
					delete element.properties.angleStart;
				}

				if (element.properties.spawnCircle.minR === undefined) {
					element.properties.spawnCircle.minR = 0;
				}
				
				properties.particles.spawntype.properties.ring.x.value = element.properties.spawnCircle.x;
				properties.particles.spawntype.properties.ring.y.value = element.properties.spawnCircle.y;
				properties.particles.spawntype.properties.ring.min.value = element.properties.spawnCircle.r;
				properties.particles.spawntype.properties.ring.max.value = element.properties.spawnCircle.minR;
				break;
			case 'burst':
				if (element.properties.particlesPerWave === undefined ||
					element.properties.particleSpacing === undefined ||
					element.properties.angleStart === undefined) {
					
					element.properties.particlesPerWave = 1;
					element.properties.particleSpacing = 0;
					element.properties.angleStart = 0;

					delete element.properties.spawnRect;
					delete element.properties.spawnCircle;
				}
				
				properties.particles.spawntype.properties.burst.particles.value = element.properties.particlesPerWave;
				properties.particles.spawntype.properties.burst.spacing.value = element.properties.particleSpacing;
				properties.particles.spawntype.properties.burst.angle.value = element.properties.angleStart;
				break;
		}
	} else {
		delete element.properties.spawnRect;
		delete element.properties.spawnCircle;
		delete element.properties.particlesPerWave;
		delete element.properties.particleSpacing;
		delete element.properties.angleStart;
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

	properties.particles.spawntype.properties = {};
	properties.particles.spawntype.properties.rect = properties.particles.getElementsByClassName('emission-rectangle')[0];
	properties.particles.spawntype.properties.rect.x = document.getElementById('emission-rectangle-x');
	properties.particles.spawntype.properties.rect.y = document.getElementById('emission-rectangle-y');
	properties.particles.spawntype.properties.rect.width = document.getElementById('emission-rectangle-width');
	properties.particles.spawntype.properties.rect.height = document.getElementById('emission-rectangle-height');
	properties.particles.spawntype.properties.rect.reset = properties.particles.spawntype.properties.rect.x.previousElementSibling;
	properties.particles.spawntype.properties.circle = properties.particles.getElementsByClassName('emission-circle')[0];
	properties.particles.spawntype.properties.circle.x = document.getElementById('emission-circle-x');
	properties.particles.spawntype.properties.circle.y = document.getElementById('emission-circle-y');
	properties.particles.spawntype.properties.circle.radius = document.getElementById('emission-circle-radius');
	properties.particles.spawntype.properties.circle.reset = properties.particles.spawntype.properties.circle.x.previousElementSibling;
	properties.particles.spawntype.properties.ring = properties.particles.getElementsByClassName('emission-ring')[0];
	properties.particles.spawntype.properties.ring.x = document.getElementById('emission-ring-x');
	properties.particles.spawntype.properties.ring.y = document.getElementById('emission-ring-y');
	properties.particles.spawntype.properties.ring.min = document.getElementById('emission-ring-min');
	properties.particles.spawntype.properties.ring.max = document.getElementById('emission-ring-max');
	properties.particles.spawntype.properties.ring.reset = properties.particles.spawntype.properties.ring.x.previousElementSibling;
	properties.particles.spawntype.properties.burst = properties.particles.getElementsByClassName('emission-burst')[0];
	properties.particles.spawntype.properties.burst.particles = document.getElementById('burst-particles');
	properties.particles.spawntype.properties.burst.particles.reset = properties.particles.spawntype.properties.burst.particles.previousElementSibling;
	properties.particles.spawntype.properties.burst.spacing = document.getElementById('burst-spacing');
	properties.particles.spawntype.properties.burst.spacing.reset = properties.particles.spawntype.properties.burst.spacing.previousElementSibling;
	properties.particles.spawntype.properties.burst.angle = document.getElementById('burst-angle');
	properties.particles.spawntype.properties.burst.angle.reset = properties.particles.spawntype.properties.burst.angle.previousElementSibling;

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
	properties.particles.spawntype.properties.rect.x.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.rect.y.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.rect.width.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.rect.height.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.circle.x.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.circle.y.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.circle.radius.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.ring.x.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.ring.y.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.ring.min.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.ring.max.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.burst.particles.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.burst.spacing.addEventListener('input', SetParticlesSpawntype);
	properties.particles.spawntype.properties.burst.angle.addEventListener('input', SetParticlesSpawntype);
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
	properties.particles.spawntype.properties.rect.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawntype.properties.circle.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawntype.properties.ring.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawntype.properties.burst.particles.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawntype.properties.burst.spacing.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.spawntype.properties.burst.angle.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.position.reset.addEventListener('click', ResetParticlesValue);
	properties.particles.queue.reset.addEventListener('click', ResetParticlesValue);
}