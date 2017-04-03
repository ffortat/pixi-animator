function grabcursor(event) {
	if (event.button === 0) {
		if (event.target.classList.contains('indicator')) {
			event.preventDefault();

			indicatorGrabbed = {
				startIndex : parseInt(event.target.parentElement.id.substr(event.target.parentElement.id.indexOf('-') + 1)),
				currentIndex : parseInt(event.target.parentElement.id.substr(event.target.parentElement.id.indexOf('-') + 1)),
				element : event.target.className.split(' ')[1].substr(1),
				html : event.target
			};
		} else {
			cursorGrabbed = true;
			movecursor(event);
		}
	}
}

function movecursor(event) {
	var left = 0;
	var target = event.target;

	if (target.className === 'timeline') {
		left += target.scrollLeft;
	}

	while (target.className !== 'timeline') {
		left += target.offsetLeft;
		target = target.parentElement;
	}

	var index = Math.round((left + event.offsetX) / timeline.space);
	index = Math.max(1, Math.min(compositorData.length, index)) - 1;

	if (cursorGrabbed) {
		updateFrame(index);
	} else if (indicatorGrabbed) {
		indicatorGrabbed.currentIndex = index;
		indicatorGrabbed.html.parentElement.removeChild(indicatorGrabbed.html);
		document.getElementById('frame-' + index).appendChild(indicatorGrabbed.html);
	}

	if (event.target.classList.contains('indicator')) {
		document.body.style.cursor = '-webkit-grab';
	} else {
		document.body.style.cursor = 'auto';
	}
}

function releasecursor(event) {
	if (event.button === 0) {
		if (indicatorGrabbed && indicatorGrabbed.startIndex !== indicatorGrabbed.currentIndex) {
			var element = elementsData[indicatorGrabbed.element].element;

			if (element) {
				if (!element.timeline[indicatorGrabbed.currentIndex]) {
					element.timeline[indicatorGrabbed.currentIndex] = {};
				}

				for (var key in element.timeline[indicatorGrabbed.startIndex]) {
					element.timeline[indicatorGrabbed.currentIndex][key] = element.timeline[indicatorGrabbed.startIndex][key];
				}

				element.timeline[indicatorGrabbed.startIndex] = null;

				if (indicatorGrabbed.html.parentElement.getElementsByClassName(indicatorGrabbed.html.className.split(' ')[1]).length > 1) {
					indicatorGrabbed.html.parentElement.removeChild(indicatorGrabbed.html);
				}
				
				updateCompositor();
			} else {
				indicatorGrabbed.html.parentElement.removeChild(indicatorGrabbed.html);
				document.getElementById('frame-' + indicatorGrabbed.startIndex).appendChild(indicatorGrabbed.html);
			}
		}

		cursorGrabbed = false;
		indicatorGrabbed = null;
	}
}

function setCursorPosition(index) {
	timeline.cursor.style.left = ((index + 1) * timeline.space) + 'px';
}

function addIndicator(element, frame) {
	if (element) {
		var bar = timeline.framebars.getElementsByClassName('timeline-frame')[frame];

		if (bar.getElementsByClassName('i' + element.element.name).length === 0) {
			var div = document.createElement('div');
			div.classList.add('indicator');
			div.classList.add('i' + element.element.name);
			div.style.top = (element.html.offsetTop) + 'px';
			// div.style.left = (element.html.offsetWidth + (frame + 1) * timeline.space - 3) + 'px';
			div.appendChild(document.createTextNode('o'));

			bar.appendChild(div);
		}
	}
}

function removeIndicator(element, frame) {
	var bar = timeline.framebars.getElementsByClassName('timeline-frame')[frame];
	
	if (bar.getElementsByClassName('i' + element.element.name).length !== 0) {
		var indicator = bar.getElementsByClassName('i' + element.element.name)[0];
		bar.removeChild(indicator);
	}
}

function CreateItem(name, type) {
	var div = document.createElement('div');
	div.className = type;
	var namediv = document.createElement('div');
	namediv.className = 'name';
	namediv.appendChild(document.createTextNode(name));
	div.appendChild(namediv);

	namediv.addEventListener('click', function (event) {
		SelectElement(event.target.innerText);
	});

	timeline.listing.appendChild(div);

	return div;
}

function DeleteElement(name) {
	var i = -1;
	timeline.listing.removeChild(elementsData[name].html);
	
	compositorData.elements.some(function (element, index) {
		if (element.name === name) {
			i = index;
			return true;
		}
	});

	if (i >= 0) {
		compositorData.elements.splice(i, 1);
	}

	delete elementsData[name];
}

function SelectElement(name) {
	properties.animator.style.display = 'none';
	properties.particles.style.display = 'none';

	for (var element in elementsData) {
		elementsData[element].html.classList.remove('selected');
	}

	if (elementsData[name]) {
		currentElement = elementsData[name];

		currentElement.html.classList.add('selected');

		if (currentElement.element.type === 'animator') {
			properties.animator.style.display = 'block';
			resizeproperties();
		} else if (currentElement.element.type === 'emitter') {
			properties.particles.style.display = 'block';
			UpdateParticlesSpawntype(currentElement.element);
			resizeproperties();
		}
	} else {
		currentElement = null;
	}

	updateFrame(currentFrame, true);
}

function UpdateFramebars(zoom) {
	var frames = compositorData.length;
	var width = timeline.timeline.offsetWidth * zoom;
	var space = width / (frames + 1);
	var margin = 0;
	var div;

	var currentBars = timeline.framebars.childElementCount;

	timeline.space = space;

	if (frames > currentBars) {
		for (var i = currentBars; i < frames; i += 1) {
			div = document.createElement('div');
			div.className = 'timeline-frame';
			div.id = 'frame-' + i;

			timeline.framebars.appendChild(div);
		}
	} else if (frames < currentBars) {
		while (currentBars > frames) {
			timeline.framebars.removeChild(timeline.framebars.lastElementChild);

			currentBars = timeline.framebars.childElementCount;
		}
	}

	var bar = timeline.framebars.firstElementChild;

	while (bar) {
		margin += space;
		bar.style.left = margin + 'px';

		bar = bar.nextElementSibling;
	}

	timeline.cursor.style.left = (space + currentFrame * space) + 'px';
}

function CreateTimeline() {
	timeline = document.getElementById('timeline');
	timeline.listing = timeline.getElementsByClassName('listing')[0];
	timeline.addAnimatorButton = timeline.getElementsByClassName('addAnimator')[0];
	timeline.addEmitterButton = timeline.getElementsByClassName('addEmitter')[0];
	timeline.removeButton = timeline.getElementsByClassName('remove')[0];
	timeline.playButton = timeline.getElementsByClassName('play')[0];
	timeline.zoomSlider = timeline.getElementsByClassName('zoom')[0];
	timeline.timeline = timeline.getElementsByClassName('timeline')[0];
	timeline.framebars = timeline.getElementsByClassName('framebars')[0];
	timeline.cursor = timeline.getElementsByClassName('timeline-cursor')[0];
	timeline.space = 0;
	timeline.popin = document.getElementById('popin');

	UpdateFramebars(timeline.zoomSlider.value);

	timeline.timeline.addEventListener('mousedown', grabcursor);
	timeline.timeline.addEventListener('mousemove', movecursor);
	timeline.timeline.addEventListener('mouseup', releasecursor);

	timeline.addAnimatorButton.addEventListener('click', function () {
		var name = prompt('Add a new Animator');
		// TODO add name check
		if (name) {
			var item = CreateItem(name, "animator");

			elementsData[name] = {
				html : item,
				element : {
					name : name,
					type : "animator",
					textures : [],
					timeline : []
				}
			};

			compositorData.elements.push(elementsData[name].element);

			SelectElement(name);
		}
	});

	timeline.addEmitterButton.addEventListener('click', function () {
		var name = prompt('Add a new Emitter');
		// TODO add name check
		if (name) {
			var item = CreateItem(name, "emitter");

			elementsData[name] = {
				html : item,
				element : {
					name : name,
					type : "emitter",
					textures : [],
					properties : {
						alpha : {
							start : 1,
							end : 0
						}, 
						scale : {
							start : 0.1,
							end : 0.01,
							minimumScaleMultiplier : 1
						},
						color : {
							start : '#e4f9ff',
							end : '#3fcbff'
						},
						speed : {
							start : 200,
							end : 50,
							minimumSpeedMultiplier : 1
						},
						acceleration : {
							x : 0,
							y : 0
						},
						maxSpeed : 0,
						startRotation : {
							min : 0,
							max : 360
						},
						noRotation : false,
						rotationSpeed : {
							min : 0,
							max : 0
						},
						lifetime : {
							min : 0.2,
							max : 0.8
						},
						blendMode : "normal",
						frequency : 0.001,
						emitterLifetime : -1,
						maxParticles : 500,
						pos : {
							x : 0,
							y : 0
						},
						addAtBack : false,
						spawnType : 'point',
						textures : []
					},
					timeline : []
				}
			};

			compositorData.elements.push(elementsData[name].element);

			SelectElement(name);
		}
	});
	
	timeline.removeButton.addEventListener('click', function () {
		if (currentElement) {
			DeleteElement(currentElement.element.name);
			refreshCompositor();
			SelectElement();
		}
	});

	timeline.playButton.addEventListener('click', function () {
		if (compositor.playing) {
			compositor.stop();
			timeline.playButton.innerHTML = '&#9658;';
			updateFrame(currentFrame, true);
		} else {
			compositor.stop();
			compositor.play();
			timeline.playButton.innerHTML = '&#10074;&#10074;';
		}
	});

	timeline.zoomSlider.addEventListener('input', function () {
		// console.log(timeline.zoomSlider.value);
		UpdateFramebars(timeline.zoomSlider.value);
	});
}