function grabsprite(event) {
	var name;

	compositor.elements.forEach(function (element, index) {
		if (element.getBounds().contains(event.offsetX, event.offsetY)) {
			if (!compositorData.elements[index].timeline[currentFrame]) {
				compositorData.elements[index].timeline[currentFrame] = {};
			}

			if (!compositorData.elements[index].timeline[currentFrame].position) {
				compositorData.elements[index].timeline[currentFrame].position = {
					x : element.x,
					y : element.y
				};
			}

			spriteGrabbed = {
				element : element,
				frame : compositorData.elements[index].timeline[currentFrame]
			}
			
			name = compositorData.elements[index].name;
		}
	});

	if (name) {
		SelectElement(name);
	}
}

function movesprite(event) {
	if (spriteGrabbed) {
		spriteGrabbed.element.x += event.movementX;
		spriteGrabbed.element.y += event.movementY;
	}
}

function releasesprite(event) {
	if (spriteGrabbed) {
		SetPosition(new PIXI.Point(spriteGrabbed.element.x - parseFloat(properties.pivot.x.value), spriteGrabbed.element.y - parseFloat(properties.pivot.y.value)));
		
		spriteGrabbed = null;
	}
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
		pivot.drawCircle(data.pivot.x, data.pivot.y, 5);
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