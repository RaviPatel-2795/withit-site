import {config} from './config.js'
import { appGrain } from "./modules/app-grain.js";
import { campaignScripts } from "./modules/campaign-scripts.js";
import { dataTheme } from "./modules/data-theme.js";
import { navOverlay } from "./modules/nav-overlay.js";
import { shopButton } from "./modules/shop-button.js";
import * as splashPageScripts from "./modules/splash-scripts.js";
import * as storyScripts from "./modules/story-scripts.js";
import { tvFunc } from "./modules/tv-functions.js";
import { visionTyped } from "./modules/vision-typed.js";
import * as wardrobeInit from "./modules/wardrobe.js";

if (document.querySelector("#themeModeContainer")) {
	dataTheme();
}

if (document.querySelector("#hamburger")) {
	navOverlay();
}

if (document.querySelector("#splash-screen")) {
	splashPageScripts.splashPageScripts();
	splashPageScripts.showSplash();
}

function init(){

	window.scrollTo(0, 0)

	if (document.querySelector("#static-bg")) {
        appGrain();
    }

	if (document.querySelector("#tv-remote-container")) {
		if (document.querySelector("#tv-remote-container").classList.contains("tvShown")) {
			document.querySelector("#tv-remote-container").classList.remove("inactive");
			tvFunc();
		}
    }

	if (document.querySelector("#typed-strings")) {
        visionTyped();
    }

	if (document.querySelector("#sidebar-shop-btn-container")) {
		shopButton();
	}

	if (document.querySelector("#collection-component-1655998424637")) {
        wardrobeInit.wardrobeShopifyInit(config.storefrontAccessToken);
		wardrobeInit.wardrobeLoad();
    }

	if (document.querySelector(".story-container")) {
		storyScripts.loadBackgroundImage();
	}

	if (document.querySelector(".campaign-grid-container")) {
		campaignScripts();
	}
}


function unload() {
	if (document.querySelector(".story-container")) {
		storyScripts.unloadBackgroundImage();
	}

	if (document.querySelector("#collection-component-1655998424637")) {
        wardrobeInit.wardrobeUnload();
    }
}


// run once when page loads
if (document.readyState === "complete") {
	init();
} else {
	document.addEventListener("DOMContentLoaded", () => init());
}

// Swup page animations
const swup = new Swup();

// run after every additional navigation by swup
swup.hooks.on('content:replace', init);

// Unload scripts
swup.hooks.before('content:replace', unload);