function viewportKeydown(keyCode) {
	currentOperation = 'none';

	switch (keyCode) {
		case keys.ctrl:
			currentOperation = 'move';
			document.body.style.cursor = '-webkit-grab';
			break;
		case keys.alt:
			currentOperation = 'rotate';
			document.body.style.cursor = 'not-allowed';
			break;
		case keys.shift:
			currentOperation = 'scale';
			document.body.style.cursor = 'move';
			break;
		case keys.x:
			if (currentFrame > 0) {
				updateFrame(currentFrame - 1);
			}
			break;
		case keys.c:
			if (currentFrame < compositorData.length - 1) {
				updateFrame(currentFrame + 1);
			}
			break;
	}
}

function viewportKeyup(keyCode) {
	currentOperation = 'none';
	document.body.style.cursor = 'auto';
}

function grabsprite(event) {
	var name;

	if (key.down[keys.space]) {
		if (event.button === 0) {
			currentOperation = 'moveView';
		}
	} else {
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

				if (event.button === 1) {
					currentOperation = 'pivot';
					document.body.style.cursor = 'crosshair';
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
}

function movesprite(event) {
	switch (currentOperation) {
		case 'move':
			if (spriteGrabbed) {
				spriteGrabbed.element.x += event.movementX;
				spriteGrabbed.element.y += event.movementY;

				properties.animator.position.x.value = spriteGrabbed.element.x - parseFloat(properties.animator.pivot.x.value);
				properties.animator.position.y.value = spriteGrabbed.element.y - parseFloat(properties.animator.pivot.y.value);
			}
			document.body.style.cursor = '-webkit-grab';
			break;
		case 'rotate':
			if (spriteGrabbed) {
				spriteGrabbed.element.rotation += event.movementX / 100;
				properties.animator.rotation.value = spriteGrabbed.element.rotation;
			}
			break;
			document.body.style.cursor = 'not-allowed';
		case 'scale':
			if (spriteGrabbed) {
				spriteGrabbed.element.scale.x += event.movementX / 100;
				spriteGrabbed.element.scale.y += event.movementY / 100;

				properties.animator.scale.x.value = spriteGrabbed.element.scale.x;
				properties.animator.scale.y.value = spriteGrabbed.element.scale.y;
			}
			document.body.style.cursor = 'move';
			break;
		case 'pivot':
			pivot.x += event.movementX;
			pivot.y += event.movementY;

			properties.animator.pivot.x.value = parseFloat(properties.animator.pivot.x.value) + event.movementX;
			properties.animator.pivot.y.value = parseFloat(properties.animator.pivot.y.value) + event.movementY;
			break;
		case 'moveView':
			container.x += event.movementX;
			container.y += event.movementY;
			break;
	}

}

function releasesprite(event) {
	if (spriteGrabbed) {
		switch (currentOperation) {
			case 'move':
				SetPosition(new PIXI.Point(spriteGrabbed.element.x - parseFloat(properties.animator.pivot.x.value), spriteGrabbed.element.y - parseFloat(properties.animator.pivot.y.value)));
				break;
			case 'rotate':
				SetRotation();
				break;
			case 'scale':
				SetScale(spriteGrabbed.element.scale);
				break;
			case 'pivot':
				SetPivot(new PIXI.Point(parseFloat(properties.animator.pivot.x.value), parseFloat(properties.animator.pivot.y.value)));
				pivot.x = 0;
				pivot.y = 0;
				break;
		}

		spriteGrabbed = null;
	}

	currentOperation = 'none';
	document.body.style.cursor = 'auto';
}

function scroll(event) {
	var zoomFactor = 1.2;

	if (event.deltaY < 0) {
		subContainer.scale.x *= zoomFactor;
		subContainer.scale.y *= zoomFactor;
	} else {
		subContainer.scale.x /= zoomFactor;
		subContainer.scale.y /= zoomFactor;
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
	subContainer.removeChild(compositor);

	compositor = new Compositor(compositorData);

	subContainer.addChild(compositor);
	subContainer.swapChildren(compositor, pivot);
}

function updateViewport(data) {
	pivot.clear();

	if (typeof(data.pivot.x) === 'number' && typeof(data.position.x) === 'number') {
		pivot.lineStyle(2, 0x00FF00, 1);
		pivot.drawCircle(data.pivot.x + data.position.x, data.pivot.y + data.position.y, 5);
	}
}

function CreateViewport() {
	axis.beginFill(0xEEEEEE, 1);
	axis.lineStyle(1, 0xEEEEEE, 1);
	axis.moveTo(0, -renderer.height * 5);
	axis.lineTo(0, renderer.height * 5);
	axis.moveTo(-renderer.width * 5, 0);
	axis.lineTo(renderer.width * 5, 0);
	axis.endFill();

	container.addChild(axis);
	container.addChild(subContainer);
	subContainer.addChild(compositor);
	subContainer.addChild(pivot);

	centerviewport();

	key.on('down', viewportKeydown);
	key.on('up', viewportKeyup);
	renderer.view.addEventListener('mousedown', grabsprite);
	renderer.view.addEventListener('mousemove', movesprite);
	renderer.view.addEventListener('mouseup', releasesprite);
	renderer.view.addEventListener('mousewheel', scroll);

	window.addEventListener('resize', resizeviewport);
}