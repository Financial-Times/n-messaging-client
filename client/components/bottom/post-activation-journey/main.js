module.exports = (banner, done) => {
	const closeButton = banner.bannerElement.querySelector('.n-messaging-client-messaging-banner-post-activation-journey--close');
	closeButton.addEventListener('click', function closePopup () {
		banner.close();
	});
	done();
};
