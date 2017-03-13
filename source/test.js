var width = document.body.offsetWidth;
var height = document.body.offsetHeight;
var renderer = new PIXI.autoDetectRenderer(width - 2 * 250, height - 200);
// renderer.autoResize = true;
renderer.backgroundColor = 0x333333;
renderer.roundPixels = true;
document.body.appendChild(renderer.view);


var compositor;
var container = new PIXI.Container();
// container.position = new PIXI.Point(renderer.width / 2, renderer.height / 2);

load.json('compositions/test.json', function (data) {
	compositor = new Compositor(data);
	container.addChild(compositor);

	compositor.play();
});


PIXI.ticker.shared.add(function () {
	renderer.render(container);
});