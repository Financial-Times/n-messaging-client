const oViewport = require('o-viewport');
const cookieStore = require('n-ui-foundations').cookieStore;
const LOCAL_STORE_KEY = 'FTCookieConsentGDPR';

module.exports = function customSetup (banner, done) {
	const hasAccepted = cookieStore.get(LOCAL_STORE_KEY) === 'true';
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
		cookieStore.set(LOCAL_STORE_KEY, 'true', {
			domain: '.ft.com',
			maxAge: 60*60*24*365*2
		});
		removeBanner();
		if (elemHref) { // continue with journey
			location.href = elemHref;
		}
	};

	const setup = () => {
		const accepted = [].slice.call(wrapper.querySelectorAll('[data-action="accepted"]'));
		accepted.forEach(elem => elem.addEventListener('click', (event) => accept(elem, event), false));

		if (typeof CSS === 'undefined' || !CSS.supports('position', 'sticky')) {
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
