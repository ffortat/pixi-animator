function updateFrame(frame, force) {
	if ((currentFrame !== frame || force)) {
		currentFrame = frame;

		if (checkCurrentAnimatorElement()) {
			UpdateAnimatorProperties();
		} else if (checkCurrentEmitterElement()) {
			UpdateParticlesProperties();
		}

		compositor.goToFrame(currentFrame);
	}
}

function updateCompositor() {
	refreshCompositor();

	addIndicator(currentElement, currentFrame);
	updateFrame(currentFrame, true);
}

function UseTexture(event) {
	if (checkSetCurrentAnimatorElement()) {
		UseAnimatorTexture(event);
	} else if (checkCurrentEmitterElement()) {
		UseParticlesTexture(event);
	}
}

function NewCompositor() {
	compositorData.elements.forEach(function (element) {
		timeline.listing.removeChild(elementsData[element.name].html);
	});

	RemoveSpritesheets();

	spritesheetLists.save = [];
	spritesheetLists.export = [];
	compositorName = 'Untitled';
	compositorData = {
		fps : 30,
		loop : true,
		length : 60,
		spritesheets : spritesheetLists.save,
		elements : []
	};
	elementsData = {};

	cursorGrabbed = false;
	currentFrame = 0;
	currentElement = null;
	spriteIndex = 0;
	spriteGrabbed = null;

	refreshCompositor();
}

function LoadCompositor() {
	var keyPress = function (keyCode) {
		if (keys.escape === keyCode) {
			closeFunction();
		}
	}

	var closeFunction = function () {
		key.off('press', keyPress);

		timeline.popin.style.display = 'none';
		timeline.popin.classList.remove('load');

		timeline.popin.innerHTML = '';
	}

	var openCompositor = function (event) {
		NewCompositor();

		LoadEditor(event.target.id.substr(5));

		closeFunction();
	}

	var list = document.createElement('ul');
	var name;

	for (var item in localStorage) {
		if (item.indexOf('comp-') === 0) {
			name = item.substr(5);

			var listitem = document.createElement('li');
			listitem.appendChild(document.createTextNode(name))
			listitem.id = item;

			listitem.addEventListener('click', openCompositor);

			list.appendChild(listitem);
		}
	}

	timeline.popin.appendChild(list);

	key.on('press', keyPress);

	timeline.popin.style.display = 'block';
	timeline.popin.classList.add('load');
}

function SaveCompositor() {
	var name;

	if (compositorName === 'Untitled') {
		name = prompt('Name the composition');

		if (!name) {
			return;
		}
	} else {
		name = compositorName;
	}

	if (localStorage.getItem('comp-Untitled')) {
		localStorage.removeItem('comp-Untitled');
	}

	compositorName = name;
	localStorage.setItem('comp-' + compositorName, JSON.stringify({
		data : compositorData
	}));

	localStorage.setItem('defaultComp', compositorName);
}

function ExportCompositor() {
	SaveCompositor();

	var exportCompositor = {
		fps : compositorData.fps,
		loop : compositorData.loop,
		length : compositorData.length,
		spritesheets : spritesheetLists.export,
		elements : compositorData.elements
	};

	var link = 'data:application/octet-stream;base64,' + btoa(JSON.stringify(exportCompositor));

	var p = document.createElement('p');
	var a = document.createElement('a');
	p.appendChild(a);

	a.href = link;
	a.download = compositorName + '.json';
	a.appendChild(document.createTextNode('Click to download export'));

	a.addEventListener('click', function (event) {
		timeline.popin.removeChild(p);
		timeline.popin.style.display = 'none';
		timeline.popin.classList.remove('export');
	});

	timeline.popin.appendChild(p);
	timeline.popin.style.display = 'block';
	timeline.popin.classList.add('export');
}

function CreateLeftPanel() {
	properties = document.getElementById('properties');
	properties.name = properties.getElementsByClassName('name')[0];
	
	compProperties = document.getElementById('comp-properties');
	compProperties.framerate = document.getElementById('framerate');
	compProperties.loop = document.getElementById('loop');
	compProperties.length = document.getElementById('length');

	compProperties.framerate.addEventListener('blur', function (event) {
		compositorData.fps = parseInt(compProperties.framerate.value);
		refreshCompositor();
	});
	compProperties.loop.addEventListener('change', function (event) {
		compositorData.loop = compProperties.loop.checked;
		refreshCompositor();
	});
	compProperties.length.addEventListener('blur', function (event) {
		compositorData.length = parseInt(compProperties.length.value);
		UpdateFramebars(timeline.zoomSlider.value);
		refreshCompositor();
	});

	fileButtons = document.getElementById('fileButtons');
	fileButtons.newButton = fileButtons.getElementsByClassName('new')[0];
	fileButtons.loadButton = fileButtons.getElementsByClassName('load')[0];
	fileButtons.saveButton = fileButtons.getElementsByClassName('save')[0];
	fileButtons.exportButton = fileButtons.getElementsByClassName('export')[0];

	fileButtons.newButton.addEventListener('click', NewCompositor);
	fileButtons.loadButton.addEventListener('click', LoadCompositor);
	fileButtons.saveButton.addEventListener('click', SaveCompositor);
	fileButtons.exportButton.addEventListener('click', ExportCompositor);

	CreateAnimatorProperties();
	CreateParticlesProperties();
}