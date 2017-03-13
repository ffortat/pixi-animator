function updateFrame(frame, force) {
	if ((currentFrame !== frame || force)) {
		currentFrame = frame;

		var propertiesData;

		properties.animator.texture.label.style.fontWeight = '';
		properties.animator.blendmode.label.style.fontWeight = '';
		properties.animator.pivot.label.style.fontWeight = '';
		properties.animator.position.label.style.fontWeight = '';
		properties.animator.rotation.label.style.fontWeight = '';
		properties.animator.scale.label.style.fontWeight = '';
		properties.animator.alpha.label.style.fontWeight = '';

		if (currentElement) {
			propertiesData = {
				name : currentElement.element.name,
				texture : null,
				blendmode : null,
				pivot : null,
				position : null,
				rotation : null,
				scale : null,
				alpha : null
			};

			for (var i = currentFrame; i >= 0; i -= 1) {
				var frameData = currentElement.element.timeline[i];

				if (frameData) {
					var set = true;

					if (propertiesData.texture === null) {
						set = false;
						if (frameData.texture !== undefined) {
							propertiesData.texture = frameData.texture;

							if (i === currentFrame) {
								properties.animator.texture.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.blendmode === null) {
						set = false;
						if (frameData.blendmode !== undefined) {
							propertiesData.blendmode = frameData.blendmode;

							if (i === currentFrame) {
								properties.animator.blendmode.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.pivot === null) {
						set = false;
						if (frameData.pivot !== undefined) {
							propertiesData.pivot = {x : frameData.pivot.x, y : frameData.pivot.y};

							if (i === currentFrame) {
								properties.animator.pivot.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.position === null) {
						set = false;
						if (frameData.position !== undefined) {
							propertiesData.position = {x : frameData.position.x, y : frameData.position.y};

							if (i === currentFrame) {
								properties.animator.position.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.rotation === null) {
						set = false;
						if (frameData.rotation !== undefined) {
							propertiesData.rotation = frameData.rotation;

							if (i === currentFrame) {
								properties.animator.rotation.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.scale === null) {
						set = false;
						if (frameData.scale !== undefined) {
							propertiesData.scale = {x : frameData.scale.x, y : frameData.scale.y};

							if (i === currentFrame) {
								properties.animator.scale.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.alpha === null) {
						set = false;
						if (frameData.alpha !== undefined) {
							propertiesData.alpha = frameData.alpha;

							if (i === currentFrame) {
								properties.animator.alpha.label.style.fontWeight = 'bold';
							}
						}
					}

					if (set) {
						break;
					}
				}
			}

			if (propertiesData.texture === null) {
				propertiesData.texture = 'none';
			}

			if (propertiesData.blendmode === null) {
				propertiesData.blendmode = 'NORMAL';
			}

			if (propertiesData.pivot === null) {
				propertiesData.pivot = {x : 0, y : 0};
			}

			if (propertiesData.position === null) {
				propertiesData.position = {x : 0, y : 0};
			}

			if (propertiesData.rotation === null) {
				propertiesData.rotation = 0;
			}

			if (propertiesData.scale === null) {
				propertiesData.scale = {x : 1, y : 1};
			}

			if (propertiesData.alpha === null) {
				propertiesData.alpha = 1;
			}
		} else {
			propertiesData = {
				name : '',
				texture : '',
				blendmode : '',
				pivot : {x : '', y : ''},
				position : {x : '', y : ''},
				rotation : '',
				scale : {x : '', y : ''},
				alpha : ''
			};
		}

		SetProperties(propertiesData);

		updateViewport(propertiesData);
		compositor.goToFrame(currentFrame);
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