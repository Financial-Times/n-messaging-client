import SlidingPopup from 'n-sliding-popup';

import * as utils from './utils';
import { broadcast } from 'n-ui-foundations';

const populateHTML = ({ discount, price, offerId }) => {
	const el = document.querySelector('.n-sliding-popup');
	const discountEls = Array.prototype.slice.call(el.querySelectorAll('.js-discount'));
	const priceEls = Array.prototype.slice.call(el.querySelectorAll('.js-price'));
	const signupEl = el.querySelector('.js-signup-link');

	signupEl.href = `https://www.ft.com/signup?offerId=${offerId}`;
	for (const discountEl of discountEls) {
		discountEl.innerHTML = discount;
	}
	for (const priceEl of priceEls) {
		priceEl.innerHTML = price;
	}

	return el;
};

const createSubscriptionPrompt = values => {
	let focusedElementBeforePrompt;
	let focusableElementsStrings = ['.subscription-prompt__subscribe-btn', '.n-sliding-popup-close'];

	const subscriptionPrompt = populateHTML(values);
	let focusableElements = subscriptionPrompt.querySelectorAll(focusableElementsStrings);
	focusableElements = Array.prototype.slice.call(focusableElements);

	subscriptionPrompt.onClose = () => {
		broadcast('oTracking.event', {
			category: 'message',
			action: 'close',
			opportunity: {
				type: 'discount',
				subtype: 'slider_promo'
			},
			offers: [values.offerId]
		});

		if(focusedElementBeforePrompt !== undefined) {
			focusedElementBeforePrompt.focus();
		}
		subscriptionPrompt.removeEventListener('keydown', trapTab);
		focusableElements.forEach((elem) => {
			elem.setAttribute('tabindex', '-1');
		});
	};
	document.body.appendChild(subscriptionPrompt);

	let firstTabStop = focusableElements[0];
	let lastTabStop = focusableElements[focusableElements.length - 1];

	const trapTab = (e) => {
		if(e.keyCode === 9) { //TAB key
			if(e.shiftKey) {
				if(document.activeElement === firstTabStop) {
					e.preventDefault();
					lastTabStop.focus();
				}
			} else {
				if(document.activeElement === lastTabStop) {
					e.preventDefault();
					firstTabStop.focus();
				}
			}
		}

		if(e.keyCode === 27) { //ESC key
			slidingPopup.close();
		}
	};

	subscriptionPrompt.addEventListener('keydown', trapTab);
	const slidingPopup = new SlidingPopup(subscriptionPrompt);

	setTimeout(() => {
		slidingPopup.open();
		focusedElementBeforePrompt = document.activeElement;
		firstTabStop.focus();

		broadcast('oTracking.event', {
			category: 'message',
			action: 'show',
			opportunity: {
				type: 'discount',
				subtype: 'slider_promo'
			},
			offers: [values.offerId]
		});
	}, 2000);
	return slidingPopup;
};

const getPrice = (countryCode, withDiscount) => {
	let prices;
	if (withDiscount) {
		prices = {
			AUS: [429, 'AUD'],
			CAN: [429, 'USD'],
			CHE: [439, 'CHF'],
			GBR: [355, 'GBP'],
			HKG: [3295, 'HKD'],
			JPN: [583, 'JPN'],
			SGP: [555, 'SGD'],
			USA: [429, 'USD'],
			IND: [429, 'USD'],
			default: [395, 'EUR']
		};
	} else {
		prices = {
			AUS: [479, 'AUD'],
			CAN: [470, 'USD'], // This is different from API (479)
			CHE: [489, 'CHF'],
			GBR: [399, 'GBP'],
			HKG: [3690, 'HKD'], // This is different from API (3689)
			JPN: [65300, 'JPN'], // This is different from API (653)
			SGP: [619, 'SGD'],
			USA: [429, 'USD'],
			IND: [470, 'USD'],
			default: [439, 'EUR']
		};
	}
	return utils.toCurrency.apply(null, prices[countryCode] || prices.default);
};

const getSubscriptionPromptValues = (countryCode, withDiscount) => {
	const price = getPrice(countryCode, withDiscount);
	if (countryCode === 'USA' || withDiscount) {
		return { discount: 33, offerId: 'a9582121-87c2-09a7-0cc0-4caf594985d5', price };
	} else {
		return { discount: 25, offerId: 'c1773439-53dc-df3d-9acc-20ce2ecde318', price };
	}
};

const render = (countryCode, withDiscount) => {
	// NOTE: for now, while pricing is inconsistent across slider, barrier and form, don't show it for these countries
	if (['SPM', 'ALA', 'BLM', 'MAF', 'AND', 'REU', 'GLP', 'MYT', 'MTQ', 'ZWE'].indexOf(countryCode) > -1) {
		return;
	}
	const subscriptionValues = getSubscriptionPromptValues(countryCode, withDiscount);
	return createSubscriptionPrompt(subscriptionValues);
};

module.exports = function customSetup (banner, flags, done) {
	return fetch('/country', { credentials: 'same-origin' })
		.then(response => response.json())
		.then((countryCode = 'GBR') => {
			render(countryCode, flags.priceFlashSale);

			return done();
		});
};
