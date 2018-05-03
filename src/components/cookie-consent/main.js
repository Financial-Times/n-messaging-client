const store = require('superstore-sync');
const oViewport = require('o-viewport');
const LOCAL_STORE_KEY = 'COOKIE_CONSENT_GDPR';

module.exports = function customSetup (banner, done) {
	const hasAccepted = store.local.get(LOCAL_STORE_KEY);
	const bannerElem = banner.bannerElement;
	const wrapper = banner.innerElement;

	const setBodyMarginForBanner = () => {
		const bannerElemHeight = bannerElem.getBoundingClientRect().height + parseInt(window.getComputedStyle(bannerElem).marginBottom, 10);
		document.body.style.marginBottom = `${bannerElemHeight}px`;
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

		if (!CSS.supports('position', 'sticky')) {
			bannerElem.classList.add('n-messaging-banner--fixed');
			oViewport.listenTo('resize');
			oViewport.listenTo('orientation');
			document.body.addEventListener('oViewport.orientation', () => {
				setBodyMarginForBanner();
			});
			document.body.addEventListener('oViewport.resize', () => {
				setBodyMarginForBanner();
			});
			setTimeout(() => {
				setBodyMarginForBanner();
			}, 1);
		}
	};

	if (hasAccepted) {
		removeBanner();
	} else {
		setup();
	}
	done();
};
