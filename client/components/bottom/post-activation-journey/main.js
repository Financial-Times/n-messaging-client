module.exports = (banner, done) => {
	const closeButtons = Array.from(banner.bannerElement.querySelectorAll('.n-messaging-client-messaging-banner-post-activation-journey__action'));
	closeButtons.forEach((closeButton) =>
		closeButton.addEventListener('click', () => typeof banner.bannerElement.remove === 'function' && banner.bannerElement.remove()));

	done();
};
