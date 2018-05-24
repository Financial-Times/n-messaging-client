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

	const updateConsent = (elem, event) => {
		const elemAction = elem.getAttribute('action');
		const elemMethod = elem.getAttribute('method');
		event.preventDefault();
		// call the consent proxy to set other cookies to yes, but still hide banner if those fail. User can manage via preferences pages.
		return fetch(elemAction, {
			method: elemMethod,
			credentials: 'include'
		})
		.then(removeBanner)
		.catch(error => {
			return { error };
		});
	};

	const setup = () => {
		const acceptForm = [].slice.call(wrapper.querySelectorAll('[data-action="accept-form"]'));
		acceptForm.forEach(elem => elem.addEventListener('submit', (event) => updateConsent(elem, event), false));

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
