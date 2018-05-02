const store = require('superstore-sync');
const oViewport = require('o-viewport');
const LOCAL_STORE_KEY = 'COOKIE_CONSENT_GDPR';

module.exports = function customSetup (banner, done) {
	const hasAccepted = store.local.get(LOCAL_STORE_KEY);
	const bannerElem = banner.bannerElement;
	const wrapper = banner.innerElement;

	let documentHeight;
	let bannerElemHeight;

	const updateDocumentHeight = () => {
		documentHeight = document.body.clientHeight;
	};

	const addBannerHeight = () => {
		document.body.style.height = `${documentHeight + bannerElemHeight}px`;
	};

	const removeBanner = () => {
		bannerElem.parentNode.removeChild(bannerElem);
	};

	const accept = (elem, event) => {
		const elemHref = elem.getAttribute('href');
		if (elemHref) { // pause to allow us to save new state
			event.preventDefault();
		}
		store.local.set(LOCAL_STORE_KEY, true);
		removeBanner();
		if (elemHref) { // continue with journey
			location.href = elemHref;
		}
	};

	const setup = () => {
		const accepted = wrapper.querySelectorAll('[data-action="accepted"]');
		accepted.forEach(elem => elem.addEventListener('click', (event) => accept(elem, event), false));

		// NB: we are adding height to the bottom of the page for user testing and then refining to snap-to-static, there are som edge cases to iron out
		oViewport.listenTo('resize');
		oViewport.listenTo('orientation');
		oViewport.listenTo('scroll');
		document.body.addEventListener('oViewport.orientation', () => {
			updateDocumentHeight();
			addBannerHeight();
		});
		document.body.addEventListener('oViewport.resize', () => {
			updateDocumentHeight();
			addBannerHeight();
		});
		updateDocumentHeight();
		setTimeout(() => {
			bannerElemHeight = bannerElem.getBoundingClientRect().height;
			addBannerHeight();
		}, 1);
	};

	document.addEventListener('DOMContentLoaded', () => {
	if (hasAccepted) {
			removeBanner();
		} else {
			setup();
		}
		done();
	});
};
