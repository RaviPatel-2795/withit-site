// Shop Button Click Add Animation
export function shopButton() {

	const shopButtonSidebar = document.getElementById("sidebar-shop-btn-container");
	const shopButtonOverlay = document.getElementById("overlay-shop-container");
	const ticketImgSidebar = document.getElementById("ticket-img-right");
	const ticketImgOverlay = document.getElementById("overlay-ticket-img-right");

	function addRipAnimation(ticket) {

		ticket.classList.add("rip-animation");
		setTimeout(function() {
			ticket.classList.remove("rip-animation");
		}, 600);

	}

	function addRipClassSidebar() {
		addRipAnimation(ticketImgSidebar);
	}

	function addRipClassOverlay() {
		addRipAnimation(ticketImgOverlay);
	}

	shopButtonSidebar.addEventListener("click", addRipClassSidebar);
	// shopButtonOverlay.addEventListener("click", addRipClassOverlay);

}