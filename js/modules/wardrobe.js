/*<![CDATA[*/
export function wardrobeShopifyInit(apiKey) {
	var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
	if (window.ShopifyBuy) {
		if (window.ShopifyBuy.UI) {
			ShopifyBuyInit();
		} else {
			loadScript();
		}
	} else {
		loadScript();
	}
	function loadScript() {
		var script = document.createElement('script');
		script.async = true;
		script.src = scriptURL;
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
		script.onload = ShopifyBuyInit;
	}
	function ShopifyBuyInit() {
		var client = ShopifyBuy.buildClient({
			domain: 'withit-wardrobe.myshopify.com',
			storefrontAccessToken: apiKey,
		});
		ShopifyBuy.UI.onReady(client).then(function (ui) {

			const quantityTemplate = `<div class="{{data.classes.product.quantity}} {{data.quantityClass}}" data-element="product.quantity">
										{{#data.contents.quantityDecrement}}
										<button class="{{data.classes.product.quantityButton}} {{data.classes.product.quantityDecrement}}" type="button" data-element="product.quantityDecrement"><span>-</span><span class="visuallyhidden">Decrement</span></button>
										{{/data.contents.quantityDecrement}}
										{{#data.contents.quantityInput}}
										<input class="{{data.classes.product.quantityInput}}" type="number" min="0" aria-label="Quantity" value="{{data.selectedQuantity}}" data-element="product.quantityInput">
										{{/data.contents.quantityInput}}
										{{#data.contents.quantityIncrement}}
										<button class="{{data.classes.product.quantityButton}} {{data.classes.product.quantityIncrement}}" type="button" data-element="product.quantityIncrement"><span>+</span><span class="visuallyhidden">Increment</span></button>
										{{/data.contents.quantityIncrement}}
									</div>`;
			const buttonTemplate = '<div class="{{data.classes.product.buttonWrapper}}" data-element="product.buttonWrapper"><button {{#data.buttonDisabled}}disabled{{/data.buttonDisabled}} class="{{data.classes.product.button}} {{data.buttonClass}}" data-element="product.button">{{data.buttonText}}</button></div>';

			const productTemplate = {
				imgOG: '{{#data.currentImage.srcLarge}}<div class="{{data.classes.product.imgWrapper}}" data-element="product.imgWrapper"><img alt="{{data.currentImage.altText}}" data-element="product.img" class="{{data.classes.product.img}}" src="{{data.currentImage.srcLarge}}" /></div>{{/data.currentImage.srcLarge}}',
				imgBU: '{{#data.currentImage.srcLarge}}<div class="{{data.classes.product.imgWrapper}}" data-element="product.imgWrapper"><img alt="{{data.currentImage.altText}}" data-element="product.img" class="{{data.classes.product.img}}" src="{{data.currentImage.srcLarge}}" /></div>{{/data.currentImage.srcLarge}}',
				img: '{{#data.currentImage.srcLarge}} <div class="{{data.classes.product.imgWrapper}}" data-element="product.imgWrapper"> <div class="wardrobe-container-message {{#data.availableForSale}}availableforsale{{/data.availableForSale}}">SOLD OUT</div> <img alt="{{data.currentImage.altText}}" data-element="product.img.1" class="{{data.classes.product.img}} heroImg" src="{{data.currentImage.srcLarge}}" /><img alt="{{data.currentImage.altText}}" data-element="product.img.2" class="{{data.classes.product.img}} nextImg" src="{{data.currentImage.srcLarge}}" /></div>{{/data.currentImage.srcLarge}}',
				imgWithCarousel: `<div class="{{data.classes.product.imgWrapper}}" data-element="product.imageWrapper">
									<div class="main-image-wrapper">
										<button type="button" class="carousel-button carousel-button--previous">
										Left
										<img class="carousel-button-arrow" src="//sdks.shopifycdn.com/buy-button/latest/arrow.svg" alt="Carousel Arrow"/>
										</button>
										<img class="{{data.classes.product.img}}" alt="{{data.currentImage.altText}}" src="{{data.currentImage.srcLarge}}" data-element="product.img" />
										<button type="button" class="carousel-button carousel-button--next">
										Right
										<img class="carousel-button-arrow" src="//sdks.shopifycdn.com/buy-button/latest/arrow.svg" alt="Carousel Arrow"/>
										</button>
									</div>
									<div class="{{data.classes.product.carousel}}">
										{{#data.carouselImages}}
										<a data-element="product.carouselitem" aria-label="{{altText}}" href="{{src}}" class="{{data.classes.product.carouselItem}} {{#isSelected}} {{data.classes.product.carouselItemSelected}} {{/isSelected}}" data-image-id="{{id}}" style="background-image: url({{carouselSrc}})"></a>
										{{/data.carouselImages}}
									</div>
								</div>`,
				productModalTitle: '<h1 class="{{data.classes.product.title}}" data-element="product.title">{{data.title}}</h1>',
				productCardTitle: '<h1 class="{{data.classes.product.title}}" data-element="product.title">{{data.title}}</h1>',
				variantTitle: '{{#data.hasVariants}}<h2 class="{{data.classes.product.variantTitle}}" data-element="product.variantTitle">{{data.selectedVariant.title}}</h2>{{/data.hasVariants}}',
				optionsBU: '<div class="size_selector__container"><label class="size_selector__title">Size: </label><div class="{{data.classes.product.options}}" data-element="product.options">{{{data.optionsHtml}}}</div></div>',
				options: '<div class="size_selector__container"><div class="{{data.classes.product.options}}" data-element="product.options">{{{data.optionsHtml}}}</div></div>',
				price: `<div class="{{data.classes.product.prices}}" data-element="product.prices">
							{{#data.selectedVariant}}
							<span class="visuallyhidden">{{data.priceAccessibilityLabel}}&nbsp;</span>
							<span class="{{data.classes.product.price}} {{data.priceClass}}" data-element="product.price">{{data.formattedPrice}}</span>
							{{#data.hasCompareAtPrice}}
							<span class="visuallyhidden">{{data.compareAtPriceAccessibilityLabel}}&nbsp;</span>
							<span class="{{data.classes.product.compareAt}}" data-element="product.compareAt">{{data.formattedCompareAtPrice}}</span>
							{{/data.hasCompareAtPrice}}
							{{#data.showUnitPrice}}
							<div class="{{data.classes.product.unitPrice}}" data-element="product.unitPrice">
							<span class="visuallyhidden">{{data.text.unitPriceAccessibilityLabel}}</span>
							{{data.formattedUnitPrice}}<span aria-hidden="true">/</span><span class="visuallyhidden">&nbsp;{{data.text.unitPriceAccessibilitySeparator}}&nbsp;</span>{{data.formattedUnitPriceBaseUnit}}
							</div>
							{{/data.showUnitPrice}}
							{{/data.selectedVariant}}
						</div>`,
				description: '<div class="{{data.classes.product.description}}" data-element="product.description">{{{data.descriptionHtml}}}</div>',
				descriptionModal: '<div class="{{data.classes.product.description}}" data-element="product.description"><div class="size_guide_wrapper" id="size_guide_wrapper"><span>Size Guide</span> <i class="fa-solid fa-ruler"></i></div><br>{{{data.descriptionHtml}}}</div>',
				button: buttonTemplate,
				quantity: quantityTemplate,
				buttonWithQuantity: `<div class="{{data.classes.product.buttonWithQuantity}}" data-element="product.buttonWithQuantity">${quantityTemplate}${buttonTemplate}</div>`,
			};

			const newPriceAndQuantity = `<div class="price_quantity__one_liner">${productTemplate.price} ${productTemplate.options}</div>`

			const newProductLayoutTemplate = `<div class="product_details__border"><div class="price_quantity__one_liner">${productTemplate.productCardTitle}${productTemplate.price}</div></div>`

			let allProductHOverImgArr = [];

			ui.createComponent('collection', {
				id: 233729884359,
				node: document.getElementById('collection-component-1655998424637'),
				moneyFormat: '£{{amount}}',
				options: {
					"option": {
						"templates": {
						  "option": '' +
							'<div class="{{data.classes.option.wrapper}}">' +
								'<p class="{{data.classes.option.label}}">{{data.name}}</p>' +
								'<div>' +
									'{{#data.values}}' +
									'<button data-value="{{name}}" data-option={{data.name}} class="{{data.classes.option.option}}{{#disabled}} {{data.classes.option.optionDisabled}}{{/disabled}}{{#selected}} {{data.classes.option.optionSelected}}{{/selected}}">{{#data.optionName}}{{name}}{{/data.optionName}}</button>' +
									'{{/data.values}}' +
								'</div>' +
							'</div>'
						}
					},
					"productSet": {
						"iframe": false,
						"contents": {
							"pagination": true,
						},
						"text": {
							"nextPageButton": "SEE MORE SICK STUFF",
						  },
					},
					"product": {
						"buttonDestination": 'modal',
						"contents": {
							"img": true,
							"title": true,
							"price": false,
							"options": false,
							"button": false,
						},
						"templates": {
							"img": productTemplate.img,
							"title": newProductLayoutTemplate,
						},
						"events": {
							beforeInit: function (product) {
											Object.defineProperty(product, "isButton", {
												get: function () {
													return true;
												}
											});
											Object.defineProperty(product, "options", {
												get: function () {
													return this.config[this.typeKey];
												}
											});
											var actualOnButtonClick = product.onButtonClick;
											product.onButtonClick = function (event, target) {
												event.stopImmediatePropagation();
												this.options.buttonDestination = "modal";
												actualOnButtonClick.call(this, event, target);
											};
										},
							afterRender: function (product) {
											allProductHOverImgArr.push(String(product.model.images[1].src));
											let productHoverImgArr = [...new Set(allProductHOverImgArr)];

											const productHoverImgsElements = document.querySelectorAll(".nextImg");

											for (let i = 0; i < productHoverImgsElements.length; i++) {
												productHoverImgsElements[i].src = productHoverImgArr[i];
											}
										}
						}
					},
					"toggle": {
						"iframe": false
					},
					"cart": {
						"iframe": false,
						"text": {
							title: 'Your Wardrobe'
						},
						"popup": false
					},
					"modal": {
						"iframe": false,
						"events": {
							beforeRender: function (product) {

								function createTableFromObjects(data) {
									const table = document.createElement('table');
									const headerRow = document.createElement('tr');
									
									// Create table header row
									const keys = Object.keys(data[0]);
									for (const key of keys) {
										const headerCell = document.createElement('th');
										headerCell.textContent = key;
										headerRow.appendChild(headerCell);
									}
									table.appendChild(headerRow);
								  
									// Create table data rows
									for (const obj of data) {
										const dataRow = document.createElement('tr');
										for (const key of keys) {
											const dataCell = document.createElement('td');
											dataCell.textContent = obj[key];
											dataRow.appendChild(dataCell);
										}
										table.appendChild(dataRow);
									}
									return table;
								}

								function sizeGuideRender(productType, productName) {

									const sizeGuideGymTop = [
										{ Size: 'S', A: '49.5', B: '73.5', C: '12.5' },
										{ Size: 'M', A: '52', B: '75', C: '14' },
										{ Size: 'L', A: '54.5', B: '76.5', C: '15.5' },
										{ Size: 'XL', A: '57', B: '78', C: '17' }
									];

									const sizeGuideJacket = [
										{ Size: 'S', A: '51.5', B: '70.8', C: '13.5' },
										{ Size: 'M', A: '54', B: '72', C: '15' },
										{ Size: 'L', A: '56.5', B: '73.2', C: '16.5' },
										{ Size: 'XL', A: '59', B: '74.4', C: '18' }
									];

									const sizeGuideHoodie = [
										{ Size: 'S', A: 'X', B: 'X', C: 'X' },
										{ Size: 'M', A: 'X', B: 'X', C: 'X' },
										{ Size: 'L', A: 'X', B: 'X', C: 'X' },
										{ Size: 'XL', A: 'X', B: 'X', C: 'X' }
									];

									const sizeGuideTShirt = [
										{ Size: 'S', A: '62', B: '50', C: '19' },
										{ Size: 'M', A: '67', B: '56', C: '22.5' },
										{ Size: 'L', A: '67', B: '60', C: '22.5' },
										{ Size: 'XL', A: '69', B: '64', C: '25' }
									];

									const sizeGuideSweatshirt = [
										{ Size: 'S', A: 'X', B: 'X', C: 'X' },
										{ Size: 'M', A: 'X', B: 'X', C: 'X' },
										{ Size: 'L', A: 'X', B: 'X', C: 'X' },
										{ Size: 'XL', A: 'X', B: 'X', C: 'X' }
									];

									const sizeGuideShorts = [
										{ Size: 'S', A: '37', B: '25', C: '71' },
										{ Size: 'M', A: '38', B: '26', C: '76' },
										{ Size: 'L', A: '39', B: '27', C: '81' },
										{ Size: 'XL', A: '40', B: '28', C: '86' }
									];

									const sizeGuideBottoms = [
										{ Size: 'S', A: '99', B: '14.75', C: '71' },
										{ Size: 'M', A: '101', B: '15.5', C: '76' },
										{ Size: 'L', A: '103', B: '16.25', C: '81' },
										{ Size: 'XL', A: '105', B: '17', C: '86' }
									];

									const sizeGuideJoggers = [
										{ Size: 'S', A: 'X', B: 'X', C: 'X' },
										{ Size: 'M', A: 'X', B: 'X', C: 'X' },
										{ Size: 'L', A: 'X', B: 'X', C: 'X' },
										{ Size: 'XL', A: 'X', B: 'X', C: 'X' }
									];

									const createSizeGuideWrapperOverlay = document.createElement('div');
									createSizeGuideWrapperOverlay.setAttribute("id", "size-guide-overlay");
									document.body.append(createSizeGuideWrapperOverlay);

									const sizeGuideWrapperOverlay = document.querySelector('#size-guide-overlay');
									
									sizeGuideWrapperOverlay.classList.add("size-guide-overlay-active");
								
									sizeGuideWrapperOverlay.innerHTML = 
										`<div id="size-guide-modal" class="size-guide-modal">` +
											`<p id="size-guide-modal-close-btn" class="size-guide-modal-close-btn">×</p>` +
											`<h1 class="size-guide-modal-title">${productName}</h1><hr class="size-guide-modal-title-underline"><p class="size-guide-text"><strong>Size Guide</strong></p>` +
											`<img id="size-guide-product-image">` +
											`<p class="size-guide-text"><strong>CM</strong></p>` +
											`<table id="size-guide-product-table"><div class="row"></table>` +
											`<p class="size-guide-text">Make sure you get the right size we don't like dealing with returns! It is a massive effort!</p>` +
										`</div>`;

									const productSizeImg = document.querySelector('#size-guide-product-image');
									const productSizeTable = document.querySelector('#size-guide-product-table');
									const productSizeModal = document.querySelector('#size-guide-modal');
									
									setTimeout(function(){
										sizeGuideWrapperOverlay.classList.add("size-guide-overlay-active-transition");
										productSizeModal.classList.add("size-guide-modal-active-transition");
									}, 50)

									if(productType === "Gym Top") {
										productSizeImg.src = "./media/images/wardrobe_images/GymTop.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideGymTop));
									}

									if(productType === "Track Jacket") {
										productSizeImg.src = "./media/images/wardrobe_images/Jacket.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideJacket));
									}

									if(productType === "Hoodie") {
										productSizeImg.src = "./media/images/wardrobe_images/Hoodie.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideHoodie));
									}

									if(productType === "T-Shirt") {
										productSizeImg.src = "./media/images/wardrobe_images/TShirt.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideTShirt));
									}

									if(productType === "Sweatshirt") {
										productSizeImg.src = "./media/images/wardrobe_images/Sweatshirt.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideSweatshirt));
									}

									if(productType === "Shorts") {
										productSizeImg.src = "./media/images/wardrobe_images/Shorts.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideShorts));
									}

									if(productType === "Track Bottoms") {
										productSizeImg.src = "./media/images/wardrobe_images/Bottoms.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideBottoms));
									}

									if(productType === "Joggers") {
										productSizeImg.src = "./media/images/wardrobe_images/Joggers.png";
										productSizeTable.appendChild(createTableFromObjects(sizeGuideJoggers));
									}

									sizeGuideWrapperOverlay.addEventListener("click", (e) => {
										if(e.target.id == 'size-guide-overlay' || e.target.id == 'size-guide-modal-close-btn') {
											// console.log(e.target);
											const element = document.getElementById("size-guide-overlay");
										
											setTimeout(function() {
												sizeGuideWrapperOverlay.classList.remove('size-guide-overlay-active-transition');
												setTimeout(function(){
													sizeGuideWrapperOverlay.classList.remove('size-guide-overlay-active');
													setTimeout(function(){
														element.remove();
													}, 50)
												}, 500)
											}, 50)
											
										}
									})
								}
								
								const arrOfVariants = this.model.variants;

								setTimeout(function(){
									const optionSelectors = document.querySelectorAll('.shopify-buy__option-select');
									const sizeGuideSelector = document.querySelector('#size_guide_wrapper');

									for (let i = 0; i < arrOfVariants.length; i++) {

										if(arrOfVariants[i].length > 1){
											if (!arrOfVariants[i].available) {
												optionSelectors[i].classList.add("shopify-buy__option--disabled");
											}
										}
									}

									if(sizeGuideSelector){
										sizeGuideSelector.addEventListener('click', (e) => {
											sizeGuideRender(product.model.productType, product.model.title);
										})
									}

								},50)
							},
							afterRender: function(product) {

								setTimeout(function(){
									const arrOfVariants = product.model.variants
									const optionSelectors = document.querySelectorAll('.shopify-buy__option-select');

									for (let i = 0; i < arrOfVariants.length; i++) {
										if (!arrOfVariants[i].available) {
											optionSelectors[i].classList.add("shopify-buy__option--disabled");
										}
									}

									if(product.model.productType === "Hoodie" || product.model.productType === "Sweatshirt" || product.model.productType === "Joggers") {
										const sizeGuideIcon = document.getElementById('size_guide_wrapper');
										sizeGuideIcon.remove();
									}

								},10)
							}
						}
					},
					"modalProduct": {
						"iframe": false,
						"contents": {
							"img": false,
							"title": true,
							"imgWithCarousel": true,
							"description": true
						},
						"templates": {
							"title": productTemplate.productModalTitle,
							"imgWithCarousel": productTemplate.imgWithCarousel,
							"description": productTemplate.descriptionModal
						},
						"DOMEvents": {
							'click .shopify-buy__option-select': function (evt, target) {
							  	var data = target.dataset;
								
								this.component.updateVariant(data.option, data.value);
								
								const arrOfVariants = this.component.model.variants

								const optionSelectors = document.querySelectorAll('.shopify-buy__option-select');
																				
								for (let i = 0; i < arrOfVariants.length; i++) {
									if (!arrOfVariants[i].available) {
										optionSelectors[i].classList.add("shopify-buy__option--disabled");
									}
								}

								let productType = this.component.model.productType;
							
								if(productType === "Hoodie" || productType === "Sweatshirt" || productType === "Joggers") {
									const sizeGuideIcon = document.getElementById('size_guide_wrapper');
									sizeGuideIcon.remove();
								}
							},
							'click .carousel-button': function (evt, target) {
								const arrOfVariants = this.component.model.variants

								const optionSelectors = document.querySelectorAll('.shopify-buy__option-select');
																				
								for (let i = 0; i < arrOfVariants.length; i++) {
									if (!arrOfVariants[i].available) {
										optionSelectors[i].classList.add("shopify-buy__option--disabled");
									}
								}

								let productType = this.component.model.productType;
							
								if(productType === "Hoodie" || productType === "Sweatshirt" || productType === "Joggers") {
									const sizeGuideIcon = document.getElementById('size_guide_wrapper');
									sizeGuideIcon.remove();
								}
							},
							'click .shopify-buy__carousel': function (evt, target) {
								const arrOfVariants = this.component.model.variants

								const optionSelectors = document.querySelectorAll('.shopify-buy__option-select');
																				
								for (let i = 0; i < arrOfVariants.length; i++) {
									if (!arrOfVariants[i].available) {
										optionSelectors[i].classList.add("shopify-buy__option--disabled");
									}
								}

								let productType = this.component.model.productType;
							
								if(productType === "Hoodie" || productType === "Sweatshirt" || productType === "Joggers") {
									const sizeGuideIcon = document.getElementById('size_guide_wrapper');
									sizeGuideIcon.remove();
								}
					 		}
						},
						"viewData": {
							optionName: function () {
								return function (text, render) {
								  var key = render(text).trim();
								  return key;
								}
							}
						}

					}
				}
			});
		});	
	};
};



const sidebarNav = document.querySelector("#sidebar-nav");
const sidebarFooter = document.querySelector("#sidebar-footer");
const hamburger = document.querySelector("#hamburger");
const mainOverlay = document.querySelector("#main-overlay");

export function wardrobeLoad() {

	setTimeout(function(){
		window._klOnsite = window._klOnsite || [];
		window._klOnsite.push(['openForm', 'TkKKcm']);
	}, 5000)
	

	// Load Trustpilot Widget
	const trustpilotContainer = document.querySelectorAll('#trustpilot-container');
	let storedDataTheme = sessionStorage.getItem('dataTheme');

	window.Trustpilot.loadFromElement(trustpilotContainer[0]);
	window.Trustpilot.loadFromElement(trustpilotContainer[1]);

	if (storedDataTheme === "dark") {
		document.querySelector('.tp-light').style.display = "none";
	} else {
		document.querySelector('.tp-dark').style.display = "none";
	}

	// Add buybutton stylesheet
	const link = document.createElement('link');
 
	link.rel = 'stylesheet';
	link.type = 'text/css';
	link.href = 'https://sdks.shopifycdn.com/buy-button/latest/buybutton.css';

	document.getElementsByTagName('HEAD')[0].insertBefore(link, document.getElementsByTagName('link')[0]);

	const shopifyElements = document.querySelectorAll(".shopify-buy-frame");

	shopifyElements.forEach((widget) => {
		widget.classList.remove('element-disabled');
	});

	sidebarNav.classList.add('element-disabled');

	sidebarFooter.classList.add('element-disabled');
	hamburger.classList.add('hamburger-wardrobe');
	mainOverlay.classList.add('overlay-wardrobe');

};

export function wardrobeUnload() {

	// Remove buybutton stylesheet
	document.getElementsByTagName('HEAD')[0].removeChild(document.getElementsByTagName('link')[0]);

	const shopifyElements = document.querySelectorAll(".shopify-buy-frame");

	shopifyElements.forEach((widget) => {
		widget.classList.add('element-disabled');
	});

	sidebarNav.classList.remove('element-disabled');
	
	sidebarFooter.classList.remove('element-disabled');
	hamburger.classList.remove('hamburger-wardrobe');
	mainOverlay.classList.remove('overlay-wardrobe');
	
};
/*]]>*/


// https://shopify.github.io/buy-button-js/

// https://github.com/Shopify/buy-button-js

// https://www.shopify.com/uk/partners/blog/introducing-buybutton-js-shopifys-new-javascript-library

// https://codepen.io/tessa-lt/pen/XjBqYe

// https://codepen.io/tessa-lt/pen/KgByGO