// Var declarations
let theCanvas = document.getElementById('canvas');
let aPixel = document.querySelector('.pixel');
let pixelStyle = getComputedStyle(aPixel);
let canvasWidth = theCanvas.clientWidth;
let canvasHeight = theCanvas.clientHeight;
let totalPixels = calculatePixels();
let currentColor = 'black';

// Function calls
initialize();

// Add listeners
theCanvas.addEventListener('mouseover', ev => {
	if (ev.target.className === 'pixel' && ev.buttons === 1) {
		colorPixel(ev.target);
	}
});

// Function declarations
function initialize() {
	generateCanvas(totalPixels);
}

function calculatePixels() {
	let pixAcross = Math.floor(
		(canvasWidth - 20) /
			(Number.parseInt(pixelStyle.width) +
				2 * Number.parseInt(pixelStyle.margin))
	);
	let pixHigh = Math.floor(
		(canvasHeight - 20) /
			(Number.parseInt(pixelStyle.height) +
				2 * Number.parseInt(pixelStyle.margin))
	);
	return pixAcross * pixHigh;
}

function generateCanvas(num) {
	for (let i = 1; i < num; i++) {
		theCanvas.appendChild(aPixel.cloneNode());
	}
}

function colorPixel(div) {
	div.style.background = currentColor;
}
