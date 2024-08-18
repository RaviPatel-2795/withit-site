// Hamburger Nav & Overlay

export function navOverlay() {

	var hamburger = document.querySelector("#hamburger");
	var	mainOverlay = document.querySelector("#main-overlay");
	var	overlayNav = document.querySelector("#overlay-nav");
	var	overlayNavChild = document.querySelectorAll(".overlay-nav-child");
	var	logoBtn = document.querySelector("#logo-btn");

	function disableOverlay() {
		hamburger.classList.remove("is-active");
		mainOverlay.classList.remove("active");
		// logoBtn.classList.remove("active");
		overlayNav.classList.remove("active");	
	}

	hamburger.addEventListener("click", function() {
		
		hamburger.classList.toggle("is-active");
		mainOverlay.classList.toggle("active");
		//logoBtn.classList.toggle("active");
		overlayNav.classList.toggle("active");

		overlayNav.style.display = "block";

		// if (overlayNav.style.display === "block") {
		// 	overlayNav.style.display = "none";
		// } else {
		// 	
		// }
	});

	const checkOverlay = () => {
		if (window.outerWidth > 850) {
			disableOverlay()
		}
	}

	window.addEventListener('resize', checkOverlay);
	
	overlayNavChild.forEach((child) => {
		child.addEventListener('click', (e)=>{
			disableOverlay();
		});
	});

}