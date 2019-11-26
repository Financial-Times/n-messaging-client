const oViewport = require('o-viewport');

module.exports = function customSetup (banner, done) {
	const hasAccepted = /FTCookieConsentGDPR=true/.test(document.cookie);
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
		// call the consent proxy to set default cookie acceptance
		// but still hide banner if those fail
		// User can manage via preferences pages
		return fetch('https://consent.ft.com/__consent/consent-record-cookie', {
			method: 'GET',
			credentials: 'include'
		})
			.then(removeBanner)
			.catch(error => ({ error }));
	};

	const setup = () => {
		const cookieBanner = bannerElem.closest('.n-ui-hide-enhanced');
		if (cookieBanner) {
			cookieBanner.classList.remove('n-ui-hide-enhanced');
		}
		const acceptButton = wrapper.querySelector('[data-action="accept-form"]');
		acceptButton.addEventListener(
			'click',
			event => updateConsent(acceptButton, event),
			false
		);

		if (typeof CSS === 'undefined' || !CSS.supports('position', 'sticky')) {
			bannerElem.classList.add('o-banner--fixed');
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
