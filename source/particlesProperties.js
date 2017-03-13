function SetParticlesAlpha(event) {

}

function SetParticlesScale(event) {

}

function SetParticlesScalemult(event) {

}

function SetParticlesColor(event) {

}

function SetParticlesSpeed(event) {

}

function SetParticlesSpeedmult(event) {

}

function SetParticlesAcceleration(event) {

}

function SetParticlesSpeedmax(event) {

}

function SetParticlesStartrotation(event) {

}

function SetParticlesNorotation(event) {

}

function SetParticlesRotationspeed(event) {

}

function SetParticlesParticlelifetime(event) {

}

function SetParticlesBlendmode(event) {

}

function SetParticlesSpawn(event) {

}

function SetParticlesEmitterlifetime(event) {

}

function SetParticlesMaxparticles(event) {

}

function SetParticlesSpawntype(event) {

}

function SetParticlesPosition(event) {

}

function SetParticlesNorotation(event) {

}


function ResetParticlesValue() {

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
	properties.particles.scalemult.addEventListener('input', SetParticlesScalemult);
	properties.particles.color.start.addEventListener('input', SetParticlesColor);
	properties.particles.color.end.addEventListener('input', SetParticlesColor);
	properties.particles.speed.start.addEventListener('input', SetParticlesSpeed);
	properties.particles.speed.end.addEventListener('input', SetParticlesSpeed);
	properties.particles.speedmult.addEventListener('input', SetParticlesSpeedmult);
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
	properties.particles.norotation.addEventListener('change', SetParticlesNorotation);

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
	properties.particles.norotation.reset.addEventListener('click', ResetParticlesValue);
}