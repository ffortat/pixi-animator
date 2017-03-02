function LoadSpritesheet(event) {
	if (uploadform.file.files.length) {
		var file = uploadform.file.files[0];
		var reader = new FileReader();

		if(!file.type.match(/image.*/)){
			console.log("the file isn't an image");
			return;
		}

		reader.addEventListener('load', function (event) {
			LoadSpritesheetData(file.name, event.target.result, parseInt(uploadform.dimensions.width.value), parseInt(uploadform.dimensions.height.value));
		});

		reader.readAsDataURL(file);
	}
}

function LoadSpritesheetData(name, data, spriteWidth, spriteHeight) {
	var image = new Image();
	image.src = data;

	var div;
	var width = Math.floor(image.width / spriteWidth);
	var height = Math.floor(image.height / spriteHeight);

	spritesheetLists.save.push({
		file : name,
		data : data,
		tilewidth : spriteWidth,
		tileheight : spriteHeight,
		imagewidth : image.width,
		imageheight : image.height,
		firstindex : spriteIndex
	});

	spritesheetLists.export.push({
		file : name,
		tilewidth : spriteWidth,
		tileheight : spriteHeight,
		imagewidth : image.width,
		imageheight : image.height,
		firstindex : spriteIndex
	});

	var ratio = spriteWidth > spriteHeight ? spriteWidth / editorProperties.textureSize : spriteHeight / editorProperties.textureSize;

	for (var y = 0; y < height; y += 1) {
		for (var x = 0; x < width; x += 1) {
			div = document.createElement('div');
			div.id = 'sprite-' + spriteIndex; 
			div.className = 'sprite';
			div.addEventListener('click', UseTexture);

			div.style.width = (spriteWidth / ratio) + 'px';
			div.style.height = (spriteHeight / ratio) + 'px';
			div.style.backgroundImage = 'url("' + data + '")';
			div.style.backgroundPositionX = '-' + ((x * spriteWidth) / ratio) + 'px';
			div.style.backgroundPositionY = '-' + ((y * spriteHeight) / ratio) + 'px';
			div.style.backgroundSize = (image.width / ratio) + 'px ' + (image.height / ratio) + 'px';

			spritesheets.appendChild(div);

			spriteIndex += 1;
		}
	}
}

function RemoveSpritesheets() {
	var element = spritesheets.firstElementChild;
	var nextElement;

	while (element) {
		nextElement = element.nextElementSibling;

		spritesheets.removeChild(element);

		element = nextElement;
	}
}

function CreateRightPanel() {
	spritesheets = document.getElementById('spritesheets');

	uploadform = document.getElementById('uploadform');
	uploadform.file = document.getElementById('spritesheet-file');
	uploadform.dimensions = {};
	uploadform.dimensions.width = document.getElementById('spritesheet-width');
	uploadform.dimensions.height = document.getElementById('spritesheet-height');
	uploadform.loadButton = document.getElementById('spritesheet-load');

	uploadform.loadButton.addEventListener('click', LoadSpritesheet);
}