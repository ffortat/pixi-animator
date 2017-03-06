function updateFrame(frame, force) {
	if ((currentFrame !== frame || force)) {
		currentFrame = frame;

		var propertiesData;

		properties.texture.label.style.fontWeight = '';
		properties.blendmode.label.style.fontWeight = '';
		properties.pivot.label.style.fontWeight = '';
		properties.position.label.style.fontWeight = '';
		properties.rotation.label.style.fontWeight = '';
		properties.scale.label.style.fontWeight = '';
		properties.alpha.label.style.fontWeight = '';

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
								properties.texture.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.blendmode === null) {
						set = false;
						if (frameData.blendmode !== undefined) {
							propertiesData.blendmode = frameData.blendmode;

							if (i === currentFrame) {
								properties.blendmode.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.pivot === null) {
						set = false;
						if (frameData.pivot !== undefined) {
							propertiesData.pivot = {x : frameData.pivot.x, y : frameData.pivot.y};

							if (i === currentFrame) {
								properties.pivot.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.position === null) {
						set = false;
						if (frameData.position !== undefined) {
							propertiesData.position = {x : frameData.position.x, y : frameData.position.y};

							if (i === currentFrame) {
								properties.position.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.rotation === null) {
						set = false;
						if (frameData.rotation !== undefined) {
							propertiesData.rotation = frameData.rotation;

							if (i === currentFrame) {
								properties.rotation.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.scale === null) {
						set = false;
						if (frameData.scale !== undefined) {
							propertiesData.scale = {x : frameData.scale.x, y : frameData.scale.y};

							if (i === currentFrame) {
								properties.scale.label.style.fontWeight = 'bold';
							}
						}
					}

					if (propertiesData.alpha === null) {
						set = false;
						if (frameData.alpha !== undefined) {
							propertiesData.alpha = frameData.alpha;

							if (i === currentFrame) {
								properties.alpha.label.style.fontWeight = 'bold';
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

function SetProperties(data) {
	properties.name.innerText = data.name;
	properties.texture.value = data.texture;
	properties.blendmode.value = data.blendmode;

	if (document.activeElement !== properties.pivot.x) {
		properties.pivot.x.value = data.pivot.x;
	}
	if (document.activeElement !== properties.pivot.y) {
		properties.pivot.y.value = data.pivot.y;
	}
	if (document.activeElement !== properties.position.x) {
		properties.position.x.value = data.position.x;
	}
	if (document.activeElement !== properties.position.y) {
		properties.position.y.value = data.position.y;
	}
	if (document.activeElement !== properties.rotation) {
		properties.rotation.value = data.rotation;
	}
	if (document.activeElement !== properties.scale.x) {
		properties.scale.x.value = data.scale.x;
	}
	if (document.activeElement !== properties.scale.x) {
		properties.scale.y.value = data.scale.y;
	}
	if (document.activeElement !== properties.alpha) {
		properties.alpha.value = data.alpha;
	}
}

function UseTexture(event) {
	var id = parseInt(event.target.id.substr(event.target.id.indexOf('-') + 1));

	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].texture = id;

		if (currentElement.element.textures.indexOf(id) === -1) {
			currentElement.element.textures.push(id);
		}

		refreshCompositor();
	
		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function SetBlendMode(event) {
	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].blendmode = properties.blendmode.value;

		refreshCompositor();
	
		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function SetPivot(point) {
	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].pivot = {
			x : point.x,
			y : point.y
		};

		refreshCompositor();

		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function SetPosition(point) {
	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].position = {
			x : point.x,
			y : point.y
		};

		refreshCompositor();

		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function SetRotation(event) {
	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].rotation = parseFloat(properties.rotation.value);

		refreshCompositor();
	
		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function SetScale(point) {
	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].scale = {
			x : point.x,
			y : point.y
		};

		refreshCompositor();

		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function SetAlpha(event) {
	if (currentElement) {
		if (!currentElement.element.timeline[currentFrame]) {
			currentElement.element.timeline[currentFrame] = {};
		}

		currentElement.element.timeline[currentFrame].alpha = parseFloat(properties.alpha.value);

		refreshCompositor();
	
		addIndicator(currentElement, currentFrame);
		updateFrame(currentFrame, true);
	}
}

function ResetValue(event) {
	if (currentElement) {
		var frame = currentElement.element.timeline[currentFrame];
		var changed = false;

		if (frame) {
			switch (event.target) {
				case properties.texture.label :
					if (frame.texture !== undefined) {
						delete frame.texture;
						changed = true;
					}
					break;
				case properties.blendmode.label :
					if (frame.blendmode !== undefined) {
						delete frame.blendmode;
						changed = true;
					}
					break;
				case properties.pivot.label :
					if (frame.pivot !== undefined) {
						delete frame.pivot;
						changed = true;
					}
					break;
				case properties.position.label :
					if (frame.position !== undefined) {
						delete frame.position;
						changed = true;
					}
					break;
				case properties.rotation.label :
					if (frame.rotation !== undefined) {
						delete frame.rotation;
						changed = true;
					}
					break;
				case properties.scale.label :
					if (frame.scale !== undefined) {
						delete frame.scale;
						changed = true;
					}
					break;
				case properties.alpha.label :
					if (frame.alpha !== undefined) {
						delete frame.alpha;
						changed = true;
					}
					break;
			}

			if (changed) {
				refreshCompositor();

				if (frame.texture === undefined && frame.blendmode === undefined && 
					frame.pivot === undefined && frame.position === undefined && 
					frame.rotation === undefined && frame.scale === undefined && 
					frame.alpha === undefined) {

					removeIndicator(currentElement, currentFrame);
					currentElement.element.timeline[currentFrame] = undefined;

					// TODO check remanent last value in given frame
				}

				updateFrame(currentFrame, true);
			}
		}
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
		spritesheets : [],
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
	properties.texture = document.getElementById('texture-id');
	properties.texture.label = properties.getElementsByClassName('texture')[0];
	properties.blendmode = document.getElementById('blend_mode');
	properties.blendmode.label = properties.getElementsByClassName('blend_mode')[0];
	properties.pivot = {};
	properties.pivot.x = document.getElementById('pivot-x');
	properties.pivot.y = document.getElementById('pivot-y');
	properties.pivot.label = properties.getElementsByClassName('pivot')[0];
	properties.position = {};
	properties.position.x = document.getElementById('position-x');
	properties.position.y = document.getElementById('position-y');
	properties.position.label = properties.getElementsByClassName('position')[0];
	properties.rotation = document.getElementById('rotation');
	properties.rotation.label = properties.getElementsByClassName('rotation')[0];
	properties.scale = {};
	properties.scale.x = document.getElementById('scale-x');
	properties.scale.y = document.getElementById('scale-y');
	properties.scale.label = properties.getElementsByClassName('scale')[0];
	properties.alpha = document.getElementById('alpha');
	properties.alpha.label = properties.getElementsByClassName('alpha')[0];

	for (var mode in PIXI.BLEND_MODES) {
		var option = document.createElement('option');
		option.value = mode;
		option.appendChild(document.createTextNode(mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()));

		properties.blendmode.appendChild(option);
	}

	properties.blendmode.addEventListener('input', SetBlendMode);

	properties.pivot.x.addEventListener('input', function (event) {
		SetPivot({x : parseFloat(properties.pivot.x.value), y : parseFloat(properties.pivot.y.value)});
	});
	properties.pivot.y.addEventListener('input', function (event) {
		SetPivot({x : parseFloat(properties.pivot.x.value), y : parseFloat(properties.pivot.y.value)});
	});

	properties.position.x.addEventListener('input', function (event) {
		SetPosition({x : parseFloat(properties.position.x.value), y : parseFloat(properties.position.y.value)});
	});
	properties.position.y.addEventListener('input', function (event) {
		SetPosition({x : parseFloat(properties.position.x.value), y : parseFloat(properties.position.y.value)});
	});

	properties.rotation.addEventListener('input', SetRotation);

	properties.scale.x.addEventListener('input', function (event) {
		SetScale({x : parseFloat(properties.scale.x.value), y : parseFloat(properties.scale.y.value)});
	});
	properties.scale.y.addEventListener('input', function (event) {
		SetScale({x : parseFloat(properties.scale.x.value), y : parseFloat(properties.scale.y.value)});
	});

	properties.alpha.addEventListener('input', SetAlpha);

	properties.texture.label.addEventListener('click', ResetValue);
	properties.blendmode.label.addEventListener('click', ResetValue);
	properties.pivot.label.addEventListener('click', ResetValue);
	properties.position.label.addEventListener('click', ResetValue);
	properties.rotation.label.addEventListener('click', ResetValue);
	properties.scale.label.addEventListener('click', ResetValue);
	properties.alpha.label.addEventListener('click', ResetValue);

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
}