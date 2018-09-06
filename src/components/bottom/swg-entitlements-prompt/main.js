const swgLoader = require('n-swg').swgLoader;

module.exports = (banner, done) => {
		let swg;
		return swgLoader({ customOnwardJourney: true })
			.then(loaded => {
				swg = loaded;
				swg.init();
				return swg.checkEntitlements();
			}).then(entitlements => {
				if (entitlements && !entitlements.granted && !entitlements.hasEntitlements) {
					// get cta properties from n-swg and apply them to the banner button
					const ctaProperties = swg.getEntitledOnwardJourneyProps(entitlements);
					const bannerCta = banner.bannerElement.querySelector('.n-messaging-banner__button');
					bannerCta.innerHTML = ctaProperties.copy;
					bannerCta.setAttribute('href', ctaProperties.href);
					bannerCta.addEventListener('click', ctaProperties.callback);

					done();
				} else {
					done({skip: true});
				}
			});
};
