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
		document.body.focus();
	};

	const updateConsent = (elem, event) => {
		event.preventDefault();
		const elemAction = elem.getAttribute('href');
		// call the consent proxy to set default cookie acceptance
		// but still hide banner if those fail
		// User can manage via preferences pages
		return fetch(elemAction, {
			method: 'GET',
			credentials: 'include'
		})
		.then(removeBanner)
		.catch(error => ({ error }));
	};

	const setup = () => {
		const cookieBanner = bannerElem.closest('.n-ui-hide-enhanced');
		if (cookieBanner)
			cookieBanner.classList.remove('n-ui-hide-enhanced');
		const acceptForm = [].slice.call(wrapper.querySelectorAll('[data-action="accept-form"]'));
		acceptForm.forEach(elem => elem.addEventListener('click', (event) => updateConsent(elem, event), false));

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
		done({ skip: true });
	} else {
		setup();
		done();
	}

};
