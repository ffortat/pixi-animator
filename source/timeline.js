function grabcursor(event) {
	if (event.button === 0) {
		cursorGrabbed = true;
		movecursor(event);
	}
}

function movecursor(event) {
	if (cursorGrabbed) {
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
		index = Math.max(1, Math.min(compositorData.length, index));

		timeline.cursor.style.left = (index * timeline.space) + 'px';

		updateFrame(index - 1);
	}
}

function releasecursor(event) {
	if (event.button === 0) {
		cursorGrabbed = false;
	}
}

function addIndicator(element, frame) {
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
	for (var element in elementsData) {
		elementsData[element].html.classList.remove('selected');
	}

	if (elementsData[name]) {
		currentElement = elementsData[name];

		currentElement.html.classList.add('selected');
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
					properties : {},
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