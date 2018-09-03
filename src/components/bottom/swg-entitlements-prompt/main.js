const swgImport = require('n-swg');
const swgLoader = swgImport.swgLoader;

module.exports = (banner) => {
		let swg;
		swgLoader({ customOnwardJourney: true })
		.then((result) => {
			swg = result;
			swg.init();
		})
		.then(() => swg.checkEntitlements())
		.then(entitlements => {
			if (entitlements) {
				// get cta properties from n-swg and apply them to the banner button
				const ctaProperties = swg.getEntitledOnwardJourneyProps(entitlements);
				const bannerCta = banner.bannerElement.querySelector('.n-messaging-banner__button');
				bannerCta.innerHTML = ctaProperties.copy;
				bannerCta.setAttribute('href', ctaProperties.href);
				bannerCta.addEventListener('click', ctaProperties.callback);
				banner.open();
			}
		});
};
