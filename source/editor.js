var width = document.body.offsetWidth;
var height = document.body.offsetHeight;
var renderer = new PIXI.autoDetectRenderer(width - 2 * 250, height - 200);
// renderer.autoResize = true;
renderer.backgroundColor = 0x333333;
renderer.roundPixels = true;
document.body.appendChild(renderer.view);

var timeline;
var properties;
var compProperties;
var fileButtons;
var spritesheets;
var uploadform;

var spritesheetLists = {
	save : [],
	export : []
};
var compositorName = 'Untitled';
var compositorData = {
	fps : 30,
	loop : true,
	length : 60,
	spritesheets : [],
	elements : []
};
var elementsData = {};
var compositor = new Compositor(compositorData);
var container = new PIXI.Container();
var axis = new PIXI.Graphics();
var pivot = new PIXI.Graphics();

var editorProperties = {
	textureSize : 32
}

var cursorGrabbed = false;
var currentFrame = 0;
var currentElement = null;
var spriteIndex = 0;
var spriteGrabbed = null;

function LoadEditor(name) {
	if (name === undefined) {
		name = localStorage.getItem('defaultComp');
	}

	if (name) {
		var save = localStorage.getItem('comp-' + name);
		
		if (save) {
			save = JSON.parse(save);
			compositorName = name;
			compositorData = save.data;

			UpdateFramebars(timeline.zoomSlider.value);

			compositorData.spritesheets.forEach(function (spritesheet) {
				LoadSpritesheetData(spritesheet.file, spritesheet.data, spritesheet.tilewidth, spritesheet.tileheight);
			});

			compositorData.elements.forEach(function (element, index) {
				var item = CreateItem(element.name, element.type);
				
				elementsData[element.name] = {
					html : item,
					element : element
				};

				element.timeline.forEach(function (data, frame) {
					if (data) {
						addIndicator(elementsData[element.name], frame);
					}
				});
			});

			refreshCompositor();
		}
	}

	compProperties.framerate.value = compositorData.fps;
	compProperties.loop.checked = compositorData.loop;
	compProperties.length.value = compositorData.length;
}

CreateViewport();
CreateTimeline();
CreateLeftPanel();
CreateRightPanel();
LoadEditor();

PIXI.ticker.shared.add(function () {
	renderer.render(container);
});