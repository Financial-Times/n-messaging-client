const swgLoader = require('n-swg').swgLoader;

module.exports = async banner => {
		const swg = await swgLoader({ customOnwardJourney: true });
		swg.init();

		const entitlements = await swg.checkEntitlements();
		if (entitlements) {
			// get cta properties from n-swg and apply them to the banner button
			const ctaProperties = swg.getEntitledOnwardJourneyProps(entitlements);
			const bannerCta = banner.bannerElement.querySelector('.n-messaging-banner__button');
			bannerCta.innerHTML = ctaProperties.copy;
			bannerCta.setAttribute('href', ctaProperties.href);
			bannerCta.addEventListener('click', ctaProperties.callback);
			banner.open();
		}
};
