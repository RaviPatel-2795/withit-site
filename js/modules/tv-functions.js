export function tvFunc() {

	//TV Variables

	var video = document.getElementById("screen");
	var	container = document.getElementById("container");
	var	channelOverlay = document.getElementById("channel-overlay");
	var	mutedOverlay = document.getElementById("muted-overlay");

	var films = ["media/videos/launch_trailer.mp4", "media/videos/model_shoot.mp4", "media/videos/promo_vid.mp4"]; //Add all "channels" here
	var channelIndicator = ["WI-1", "WI-2", "WI-3"]; //Add all "channels indicators" here

	//Button Variables

	var onOffButton = document.getElementById("onOff-btn");
	var channelUpButton = document.getElementById("chnlUp-btn");
	var channelDownButton = document.getElementById("chnlDown-btn");
	var toggleMuteButton = document.getElementById("toggleMute-btn");
	var toggleMuteButtonIcon = document.getElementById("toggleMute-btn-icon");

	//Init Buttons

	var onOffBool = false;
	var channelCount = 0;

	//The Brains

	function tvOnOff() {

		if (onOffBool === false) {
			onOffBool = true;
			video.muted = false;
			video.src = films[channelCount];
			video.classList.remove("screeneffectoff");
			video.classList.add("screeneffecton");
			container.classList.add("flicker");
			channelOverlay.classList.add("overlayon");
			channelOverlay.innerHTML = channelIndicator[channelCount];
			// console.log("TV is on by main button");
		}
		else {
			onOffBool = false;
			video.muted = true;
			video.classList.add("screeneffectoff");
			video.classList.remove("screeneffecton");
			container.classList.remove("flicker");
			channelOverlay.classList.remove("overlayon");
			// console.log("TV is off by main button");
		}
	};

	function tvOn() {
		
		if (onOffBool === false) {
			onOffBool = true;
			video.volume = 0.4;
			video.src = films[channelCount];
			video.classList.remove("screeneffectoff");
			video.classList.add("screeneffecton");
			container.classList.add("flicker");
			channelOverlay.classList.add("overlayon");
			channelOverlay.innerHTML = channelIndicator[channelCount];

			if (video.muted === true) {
				mutedOverlay.classList.add("muted-overlay-active");
				toggleMuteButtonIcon.classList.remove("fa-volume-high");
				toggleMuteButtonIcon.classList.add("fa-volume-mute");
			}

			// console.log("Tv is on");
		}
	};

	function channelChange(direction) {

		if (onOffBool === true) {
			if (direction === 'up') {
				channelCount = (channelCount + 1) % films.length;
				// console.log("channelCount = " + channelCount);
			}

			if (direction === 'down') {
				if (channelCount === 0) {
					channelCount = (films.length - 1) % films.length;
					// console.log("channelCount = " + channelCount);
				}	
				else {
					channelCount = (channelCount - 1) % films.length;
					// console.log("channelCount = " + channelCount);
				}
			}

			video.src = films[channelCount];
			channelOverlay.innerHTML = channelIndicator[channelCount];

			if (channelOverlay.classList.contains("overlayon")) {
				channelOverlay.classList.remove("overlayon");
				setTimeout(function(){ channelOverlay.classList.add("overlayon"); }, 10);
			}
		}
	};

	tvOn();

	onOffButton.addEventListener("click", function() {
		onOffButton.classList.remove("on-off-highlight");
		tvOnOff();
	});

	channelUpButton.addEventListener("click", function() {
		channelChange('up')
	});

	channelDownButton.addEventListener("click", function() {
		channelChange('down')
	});

	toggleMuteButton.addEventListener("click", function() {
		video.muted = !video.muted;
		mutedOverlay.classList.toggle("muted-overlay-active")

		if (video.muted === true) {
			mutedOverlay.classList.add("muted-overlay-active");
			toggleMuteButtonIcon.classList.remove("fa-volume-high");
			toggleMuteButtonIcon.classList.add("fa-volume-mute");
		}

		if (video.muted === false) {
			toggleMuteButtonIcon.classList.remove("fa-volume-mute");
			toggleMuteButtonIcon.classList.add("fa-volume-high");
		}
	});

}