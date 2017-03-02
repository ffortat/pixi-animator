function grabsprite(event) {
	var name;

	compositor.elements.forEach(function (animator, index) {
		if (animator.getBounds().contains(event.offsetX, event.offsetY)) {
			if (!compositorData.animators[index].timeline[currentFrame]) {
				compositorData.animators[index].timeline[currentFrame] = {};
			}

			if (!compositorData.animators[index].timeline[currentFrame].position) {
				compositorData.animators[index].timeline[currentFrame].position = {
					x : animator.x,
					y : animator.y
				};
			}

			spriteGrabbed = {
				animator : animator,
				frame : compositorData.animators[index].timeline[currentFrame]
			}
			
			name = compositorData.animators[index].name;
		}
	});

	if (name) {
		SelectElement(name);
	}
}

function movesprite(event) {
	if (spriteGrabbed) {
		spriteGrabbed.animator.x += event.movementX;
		spriteGrabbed.animator.y += event.movementY;
	}
}

function releasesprite(event) {
	SetPosition(new PIXI.Point(spriteGrabbed.animator.x - parseFloat(properties.pivot.x.value), spriteGrabbed.animator.y - parseFloat(properties.pivot.y.value)));
	
	spriteGrabbed = null;
}

function resizeviewport(event) {
	renderer.view.style.width = (window.innerWidth - 500) + 'px';
	renderer.view.style.height = (window.innerHeight - 200) + 'px';

	renderer.resize((window.innerWidth - 500), (window.innerHeight - 200));

	centerviewport();
}

function centerviewport() {
	container.position = new PIXI.Point(
		renderer.width / 2,
		renderer.height / 2
	);
}

function refreshCompositor() {
	container.removeChild(compositor);

	compositor = new Compositor(compositorData);

	container.addChild(compositor);
	container.swapChildren(compositor, pivot);
}

function updateViewport(data) {
	pivot.clear();

	if (typeof(data.pivot.x) === 'number') {
		pivot.lineStyle(2, 0x00FF00, 1);
		pivot.drawCircle(renderer.width / 2 + data.pivot.x, renderer.height / 2 + data.pivot.y, 5);
	}
}

function CreateViewport() {
	axis.beginFill(0xEEEEEE, 1);
	axis.lineStyle(1, 0xEEEEEE, 1);
	axis.moveTo(0, -renderer.height);
	axis.lineTo(0, renderer.height);
	axis.moveTo(-renderer.width, 0);
	axis.lineTo(renderer.width, 0);
	axis.endFill();

	container.addChild(axis);
	container.addChild(compositor);
	container.addChild(pivot);

	centerviewport();

	renderer.view.addEventListener('mousedown', grabsprite);
	renderer.view.addEventListener('mousemove', movesprite);
	renderer.view.addEventListener('mouseup', releasesprite);

	window.addEventListener('resize', resizeviewport);
}