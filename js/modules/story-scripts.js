// https://interactjs.io/

import 'https://cdn.interactjs.io/v1.9.20/auto-start/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/drag/index.js'
import 'https://cdn.interactjs.io/v1.9.20/actions/resize/index.js'
import 'https://cdn.interactjs.io/v1.9.20/modifiers/index.js'
import 'https://cdn.interactjs.io/v1.9.20/dev-tools/index.js'
import interact from 'https://cdn.interactjs.io/v1.9.20/interactjs/index.js'

export function loadBackgroundImage() {

	const newDiv = document.createElement("div");
		newDiv.id = "story-photo-bg";

	const currentDiv = document.getElementById("target");
		document.body.insertBefore(newDiv, currentDiv);
	
	const img1 = document.createElement("img");
		img1.src = "/media/images/story_images/without_empathy_we_are_nothing.webp";
		img1.alt = "without_empathy_we_are_nothing";
		img1.classList.add("draggable");

	const img2 = document.createElement("img");
		img2.src = "/media/images/story_images/fake_it_til_you_make_it.webp";
		img2.alt = "fake_it_til_you_make_it";
		img2.classList.add("draggable");


	const img3 = document.createElement("img");
		img3.src = "/media/images/story_images/where_it_all_started.webp";
		img3.alt = "where_it_all_started";
		img3.classList.add("draggable");


	const img4 = document.createElement("img");
		img4.src = "/media/images/story_images/you_never_forget_your_first.webp";
		img4.alt = "you_never_forget_your_first";
		img4.classList.add("draggable");


	const img5 = document.createElement("img");
		img5.src = "/media/images/story_images/family_over_everything.webp";
		img5.alt = "family_over_everything";
		img5.classList.add("draggable");


	const img6 = document.createElement("img");
		img6.src = "/media/images/story_images/the_team.webp";
		img6.alt = "the_team";
		img6.classList.add("draggable");

		let getParentContainerWidth = document.getElementById("story-photo-bg").clientWidth - 200;
		let getParentContainerHeight = document.getElementById("story-photo-bg").clientHeight - 200;

		function randomSpawnX(containerWidth) {
			return ((Math.floor(Math.random() * containerWidth)) * -1) + 100;
		}

		function randomSpawnY(containerHeight) {
			return ((Math.floor(Math.random() * containerHeight)) * -1) + 100;
		}

		let img1_x = randomSpawnX(getParentContainerWidth);
		let img1_y = randomSpawnY(getParentContainerHeight);

		let img2_x = randomSpawnX(getParentContainerWidth);
		let img2_y = randomSpawnY(getParentContainerHeight);

		let img3_x = randomSpawnX(getParentContainerWidth);
		let img3_y = randomSpawnY(getParentContainerHeight);

		let img4_x = randomSpawnX(getParentContainerWidth);
		let img4_y = randomSpawnY(getParentContainerHeight);

		let img5_x = randomSpawnX(getParentContainerWidth);
		let img5_y = randomSpawnY(getParentContainerHeight);

		let img6_x = randomSpawnX(getParentContainerWidth);
		let img6_y = randomSpawnY(getParentContainerHeight);


		img1.style.transform = `translate(${img1_x}px, ${img1_y}px)`;
		img1.setAttribute("data-x" , `${img1_x}px`);
		img1.setAttribute("data-y" , `${img1_y}px`);
		img1.style.zIndex = "2";

		img2.style.transform = `translate(${img2_x}px, ${img2_y}px)`;
		img2.setAttribute("data-x" , `${img2_x}px`);
		img2.setAttribute("data-y" , `${img2_y}px`);
		img2.style.zIndex = "5";
		
		img3.style.transform = `translate(${img3_x}px, ${img3_y}px)`;
		img3.setAttribute("data-x" , `${img3_x}px`);
		img3.setAttribute("data-y" , `${img3_y}px`);
		img3.style.zIndex = "3";

		img4.style.transform = `translate(${img4_x}px, ${img4_y}px)`;
		img4.setAttribute("data-x" , `${img4_x}px`);
		img4.setAttribute("data-y" , `${img4_y}px`);
		img4.style.zIndex = "1";

		img5.style.transform = `translate(${img5_x}px, ${img5_y}px)`;
		img5.setAttribute("data-x" , `${img5_x}px`);
		img5.setAttribute("data-y" , `${img5_y}px`);
		img5.style.zIndex = "6";

		img6.style.transform = `translate(${img6_x}px, ${img6_y}px)`;
		img6.setAttribute("data-x" , `${img6_x}px`);
		img6.setAttribute("data-y" , `${img6_y}px`);
		img6.style.zIndex = "4";

	newDiv.appendChild(img1);
	newDiv.appendChild(img2);
	newDiv.appendChild(img3);
	newDiv.appendChild(img4);
	newDiv.appendChild(img5);
	newDiv.appendChild(img6);


	setTimeout(function() {
		newDiv.classList.add("storyActive");

		setTimeout(function() {
			img4.classList.add("loaded-in");
			setTimeout(function() {
				img1.classList.add("loaded-in");
				setTimeout(function() {
					img3.classList.add("loaded-in");
					setTimeout(function() {
						img6.classList.add("loaded-in");
						setTimeout(function() {
							img2.classList.add("loaded-in");
							setTimeout(function() {
								img5.classList.add("loaded-in");
							},500)
						},500)
					},500)
				},500)
			},500)
		}, 500)

		const storyContainerBorder = document.querySelector('.story-container-border');
		const draggable = interact('.draggable')

		async function onWindowResize () {
			// start a resize action and wait for inertia to finish
			await draggable.reflow({ name: 'drag', axis: 'xy' })

			// start a drag action
			await draggable.reflow({
			name: 'resize',
			edges: { left: true, bottom: true },
			})
		}

		window.addEventListener('resize', onWindowResize)

		// target elements with the "draggable" class
		draggable.draggable({
		// enable inertial throwing
		inertia: true,
		inertia: {
			resistance: 30
		},
		// keep the element within the area of it's parent
		modifiers: [
			interact.modifiers.restrictRect({
			restriction: 'parent',
			endOnly: true
			})
		],
		// enable autoScroll
		autoScroll: false,

		listeners: {
			// call this function on every dragmove event
			start: dragStartListener,
			move: dragMoveListener,
			end: dragEndListener
		}
		})

		function dragStartListener (event) {
			let target = event.target
			let polaroids = document.querySelectorAll('.draggable');

			if(target.style.zIndex != 6) {
				polaroids.forEach((img) => {
					img.style.zIndex = img.style.zIndex - 1;
				})
	
				target.style.zIndex = 6;
			}
			
		}

		function dragMoveListener (event) {

			const singleImg = document.querySelector('.draggable');
			const style = getComputedStyle(singleImg)
			let scale = style.getPropertyValue("scale");

			let target = event.target;
			
			// keep the dragged position in the data-x/data-y attributes
			let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale;
			let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale;
			// translate the element
			target.style.webkitTransform =
			target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);

			target.classList.add('picked-up');
		}

		function dragEndListener (event) {
			let target = event.target
			target.classList.remove('picked-up');

		}

		// console.log("Loaded");
	}, 100);
		
}


export function unloadBackgroundImage() {
	const currentDiv = document.getElementById("story-photo-bg");
	currentDiv.classList.remove("storyActive");

	setTimeout(function() {
		document.getElementById("story-photo-bg").remove();
	}, 1000);
	// console.log("Unloaded");
}