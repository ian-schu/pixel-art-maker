// Var declarations
let theCanvas = document.getElementById('canvas');
let thePalette = document.getElementById('palette');
let saveButton = document.getElementById('save');
let loadButton = document.getElementById('load');
let saveArray = [];

let firstPixel = document.querySelector('.pixel');
let pixelStyle = getComputedStyle(firstPixel);
let canvasWidth = theCanvas.clientWidth;
let canvasHeight = theCanvas.clientHeight;
let totalPixels = calculatePixels();

let currentColor = 'black';
let firstColor = document.getElementsByClassName('color')[0];

let allPixels = document.getElementsByClassName('pixel');
let allColors = [
	'gainsboro',
	'silver',
	'darkgray',
	'gray',
	'dimgray',
	'black',
	'whitesmoke',
	'lightgray',
	'lightcoral',
	'rosybrown',
	'indianred',
	'red',
	'maroon',
	'snow',
	'mistyrose',
	'salmon',
	'orangered',
	'chocolate',
	'brown',
	'darkred',
	'seashell',
	'peachpuff',
	'tomato',
	'darkorange',
	'peru',
	'firebrick',
	'olive',
	'linen',
	'bisque',
	'darksalmon',
	'orange',
	'goldenrod',
	'sienna',
	'darkolivegreen',
	'oldlace',
	'antiquewhite',
	'coral',
	'gold',
	'limegreen',
	'saddlebrown',
	'darkgreen',
	'floralwhite',
	'navajowhite',
	'lightsalmon',
	'darkkhaki',
	'lime',
	'darkgoldenrod',
	'green',
	'cornsilk',
	'blanchedalmond',
	'sandybrown',
	'yellow',
	'mediumseagreen',
	'olivedrab',
	'forestgreen',
	'ivory',
	'papayawhip',
	'burlywood',
	'yellowgreen',
	'springgreen',
	'seagreen',
	'darkslategray',
	'beige',
	'moccasin',
	'tan',
	'chartreuse',
	'mediumspringgreen',
	'lightseagreen',
	'teal',
	'lightyellow',
	'wheat',
	'khaki',
	'lawngreen',
	'aqua',
	'darkturquoise',
	'darkcyan',
	'lightgoldenrodyellow',
	'lemonchiffon',
	'greenyellow',
	'darkseagreen',
	'cyan',
	'deepskyblue',
	'midnightblue',
	'honeydew',
	'palegoldenrod',
	'lightgreen',
	'mediumaquamarine',
	'cadetblue',
	'steelblue',
	'navy',
	'mintcream',
	'palegreen',
	'skyblue',
	'turquoise',
	'dodgerblue',
	'blue',
	'darkblue',
	'azure',
	'aquamarine',
	'lightskyblue',
	'mediumturquoise',
	'lightslategray',
	'blueviolet',
	'mediumblue',
	'lightcyan',
	'paleturquoise',
	'lightsteelblue',
	'cornflowerblue',
	'slategray',
	'darkorchid',
	'darkslateblue',
	'aliceblue',
	'powderblue',
	'thistle',
	'mediumslateblue',
	'royalblue',
	'fuchsia',
	'indigo',
	'ghostwhite',
	'lightblue',
	'plum',
	'mediumpurple',
	'slateblue',
	'magenta',
	'darkviolet',
	'lavender',
	'pink',
	'violet',
	'orchid',
	'mediumorchid',
	'mediumvioletred',
	'purple',
	'lavenderblush',
	'lightpink',
	'hotpink',
	'palevioletred',
	'deeppink',
	'crimson',
	'darkmagenta'
];

// Call functions
initialize();

// Listeners
theCanvas.addEventListener('mouseover', ev => {
	if (ev.target.className === 'pixel' && ev.buttons === 1) {
		colorPixel(ev.target);
	}
});

thePalette.addEventListener('click', ev => {
	if (ev.target.className === 'color') {
		selectColor(ev.target);
	}
});

saveButton.addEventListener('click', () => {
	saveArray = readCanvas();
	saveDrawing(saveArray);
});

loadButton.addEventListener('click', () => {
	writeCanvas(loadDrawing());
});

// Function declarations
function initialize() {
	generateCanvas(totalPixels);
	generatePalette();
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
		theCanvas.appendChild(firstPixel.cloneNode());
	}
}

function generatePalette() {
	let genericColor = firstColor.cloneNode();
	genericColor.classList.remove('color--selected');
	for (let i = 1; i < allColors.length; i++) {
		let newColor = genericColor.cloneNode();
		newColor.style.background = allColors[i];
		thePalette.appendChild(newColor);
	}
}

function colorPixel(el) {
	el.style.background = currentColor;
}

function selectColor(el) {
	currentColor = el.style.background;
	let oldColor = document.querySelector('.color--selected');
	oldColor.classList.remove('color--selected');
	el.classList.toggle('color--selected');
}

function readCanvas() {
	let result = [];
	for (let pix of allPixels) {
		result.push(pix.style.background);
	}
	return result;
}

function writeCanvas(arr) {
	for (let i = 0; i < arr.length; i++) {
		allPixels[i].style.background = arr[i];
	}
}

function saveDrawing(arr) {
	localStorage.setItem('pixel-drawing', JSON.stringify(arr));
}

function loadDrawing() {
	if (localStorage.getItem('pixel-drawing')) {
		let result = JSON.parse(localStorage.getItem('pixel-drawing'));
		return result;
	} else {
		alert("It doesn't look like you've saved anything here");
	}
}
