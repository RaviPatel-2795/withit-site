// Typed.js | https://github.com/mattboldt/typed.js
// Grained.js | http://sarathsaleem.github.io/grained/#2
import { tvFunc } from "/js/modules/tv-functions.js";

export function splashPageScripts(){

	new Typed('#splash-screen-text', {
		strings:["CLICK TO ENTER"],
		typeSpeed: 60,
		backSpeed: 60,
		loop: false
	});

	var grainOptionsSplash = {
		"animate": true,
		"patternWidth": 500,
		"patternHeight": 500,
		"grainOpacity": 0.25,
		"grainDensity": 4,
		"grainWidth": 4,
		"grainHeight": 1
	}

	grained("#splash-screen", grainOptionsSplash);

}

const mainLandingPage = document.querySelector("#main-landing-page");
const swupContainer = document.querySelector("#swup");
const target = document.querySelector("#target");
const staticBG = document.querySelector("#static-bg");
const splashScreen = document.querySelector("#splash-screen");
const splashScreenContainer = document.querySelector("#splash-screen-container");
const typedContainer = document.querySelector("#typed-container");
const loadingContainer = document.querySelector("#loading");
const tvRemoteContainer = document.querySelector("#tv-remote-container");


const splashExecute = () => {
	
	loadingContainer.classList.remove("inactive");
	splashScreen.classList.add("inactive-transition");
	tvRemoteContainer.classList.add("tvShown");

	setTimeout( () => {
		loadingContainer.classList.add("inactive-transition");

		mainLandingPage.classList.remove("inactive");
		swupContainer.classList.remove("inactive");
		target.classList.remove("inactive");
		staticBG.classList.remove("inactive");
		tvRemoteContainer.classList.remove("inactive");
		
		
		setTimeout( () => {
			loadingContainer.classList.add("inactive");
			tvFunc();
		}, 500);

	}, 2500);

	setTimeout( () => {
		splashScreen.classList.add("inactive");
	}, 500);

}


export function showSplash() {

	loadingContainer.classList.add("inactive");
	mainLandingPage.classList.add("inactive");
	swupContainer.classList.add("inactive");
	target.classList.add("inactive");
	staticBG.classList.add("inactive");
	tvRemoteContainer.classList.add("inactive");

	tvRemoteContainer.classList.remove("tvShown");
	
	typedContainer.addEventListener("click", splashExecute);

	splashScreenContainer.addEventListener("click", splashExecute);
	
}