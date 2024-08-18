// Grained.js

export function appGrain() {

	var grainOptionsLanding = {
		"animate": true,
		"patternWidth": 500,
		"patternHeight": 500,
		"grainOpacity": 0.1,
		"grainDensity": 1,
		"grainWidth": 1,
		"grainHeight": 1
	};

	// Render Grained
	grained("#static-bg", grainOptionsLanding);

}