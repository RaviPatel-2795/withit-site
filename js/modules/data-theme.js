import kampos from 'https://cdn.skypack.dev/pin/kampos@v0.5.1-oLViaZfcvmyPBuEcPTB3/mode=imports,min/optimized/kampos.js';

export function dataTheme() {

	const darkMode = 'dark';
	const lightMode = 'light';
	const defaultMode = lightMode;

	const themeToggle = document.getElementById("themeModeCheck");

	const mapTarget = document.querySelector('#target');
	// let MAP_WIDTH = 100;
	// let MAP_HEIGHT = 100;

	const DYNAMIC = true;
	const TYPE = 'SMOKE';
	const ANIMATIONS = {
		SMOKE: {
			octaves: 8,
			edge: 0.7,
			cellFactor: 4
		},
		LIQUID: {
			octaves: 1,
			edge: 0.03,
			cellFactor: 2
		}
	}

	mapTarget.width = window.innerWidth;
	mapTarget.height = window.innerHeight;

	window.addEventListener('resize', function() {
		resizeCanvas();
	})

	function resizeCanvas() {
		mapTarget.width = window.innerWidth;
		mapTarget.height = window.innerHeight;
	}

	let imageFromSrc = document.querySelector('#source-from').src;
	let imageToSrc = document.querySelector('#source-to').dataset.src;

	// Set storage to default Theme mode

	function themeInit() {
		let storedDataTheme = sessionStorage.getItem('dataTheme');
		if (!storedDataTheme) {
			storedDataTheme = defaultMode;
			sessionStorage.setItem('dataTheme', defaultMode);
		}
		setMode(storedDataTheme);
	};

	themeInit();

	// Definition of different scenarios based on mode

	function setMode(mode = defaultMode) {
		if (mode === darkMode) {
			document.documentElement.setAttribute('data-theme', darkMode);
			imageFromSrc = document.querySelector('#source-to').dataset.src;
			imageToSrc = document.querySelector('#source-from').src;
			themeToggle.checked = true;

		} else if (mode === lightMode) {
			document.documentElement.setAttribute('data-theme', lightMode);
			imageFromSrc = document.querySelector('#source-from').src;
			imageToSrc = document.querySelector('#source-to').dataset.src;
			themeToggle.checked = false;
		}
	};

	// Change sessionStorage for dataTheme on click

	themeToggle.addEventListener('click', function () {
		let mode = sessionStorage.getItem('dataTheme');
		if (mode) {
			let newMode = mode == darkMode ? lightMode : darkMode;
			setMode(newMode);
			sessionStorage.setItem('dataTheme', newMode);
		}
	});

	// Load images

	function loadImage (src) {
		return new Promise(resolve => {
			const img = new Image();
			img.crossOrigin = 'anonymous';
	
			img.onload = function () {
				resolve(this);
			};
	
			img.src = src;
		});
	}

	/* this factor controls the size of the blobs in the noise - increase for smaller blobs */

	//const AMPLITUDE = ANIMATIONS[TYPE].cellFactor / MAP_WIDTH;

	let AMPLITUDE_X = ANIMATIONS[TYPE].cellFactor / 1000;
	let AMPLITUDE_Y = ANIMATIONS[TYPE].cellFactor / 1000;

	const frequency = {x: AMPLITUDE_X, y: AMPLITUDE_Y};

	/* increase number on range (1, 8) to go from water-like effect into clouds-like one */
	const octaves = ANIMATIONS[TYPE].octaves;

	/* change to false (or comment out) if you want to see the turbulence noise variant */
	const isFractal = true;

	/* create the turbulence effect we need for the map texture */
	const turbulence = kampos.effects.turbulence({
		noise: kampos.noise.simplex,
		octaves,
		frequency,
		isFractal
	});

	const dissolveMap = new kampos.Kampos({ target: mapTarget, effects: [turbulence], noSource: true });

	/* create the dissolve map by generating a single noise frame */
	dissolveMap.draw();

	/* you can play with this value on the range of (0.0, 1.0) to go from hard clipping to a smooth smoke-like mask */
	const high = ANIMATIONS[TYPE].edge;

	/* create the effects/transitions we need */
	const dissolve = kampos.transitions.dissolve({ high });
	dissolve.map = mapTarget;

	/* init kampos */
	const instance = new kampos.Kampos({target, effects:[dissolve]});

	/* make sure videos are loaded and playing*/
	Promise.all([
		loadImage(imageFromSrc),
		loadImage(imageToSrc),
	])
		.then((images) => {
			let width = mapTarget.width;
			let height = mapTarget.height;

			window.addEventListener('resize', function() {
				getCanvasSize();
			});

			function getCanvasSize() {
				width = mapTarget.width;
				height = mapTarget.height;
			};

			let index = 0;

			if (DYNAMIC) {
				dissolve.textures[1].update = true;
			}

			/* paint initial scene */
			instance.setSource({media: images[0], width, height});
			dissolve.to = images[1];
			instance.draw();

			function easeOutCubic(x) {
				return 1 - Math.pow(1 - x, 3);
			}

			function changeImage(prevImage, nextImage) {
				
				/* set media source */
				instance.setSource({media: prevImage, width, height});

				/* set media to transition into */
				dissolve.to = nextImage;

				const start = performance.now();

				/* start kampos */
				instance.play(function draw () {
					const time = performance.now() - start;

					/* this is invoked once in every animation frame */
					if (DYNAMIC) {
						turbulence.time = time * 2;
						dissolveMap.draw();
					}

					/* you can reduce time factor for slower transition, or increase for faster */
					const progress = easeOutCubic(time * (DYNAMIC ? 2e-4 : 4e-4) * 4);
					dissolve.progress = progress;

					if (progress * 100 >= 99.9) {
						instance.stop();
						instance.setSource({media: prevImage, width, height});

						// bind the event again
						bindClick();
					}
				});
			}

			function next() {
				const from = images[index];

				// next...
				index = (index + 1) % images.length;

				const to = images[index];

				changeImage(from, to);
			}

			function prev() {
				const from = images[index];

				// prev...
				index = (index - 1 + images.length) % images.length;

				const to = images[index];

				changeImage(from, to);
			}

			function click(event) {
				const {offsetX} = event;

				themeToggle.disabled = true;

				if (offsetX > width / 2) {
					next();
				} else {
					prev();
				}
			}

			function bindClick() {
				themeToggle.disabled = false;
				themeToggle.addEventListener('click', click, {once: true});
			}

			bindClick();
		});

}

	// https://www.wix.engineering/post/introducing-kampos-a-tiny-and-fast-effects-compositor

    // https://github.com/wix/kampos/

	// https://wix.github.io/kampos/demo/

	// https://wix.github.io/kampos/docs/

    // https://css-tricks.com/nailing-that-cool-dissolve-transition/ 