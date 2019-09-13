module.exports = function customSetup (banner, done) {

	const bannerActions = banner.messageElement.querySelector('.n-alert-banner__actions');
	const bannerButton = banner.messageElement.querySelector('.n-alert-banner__actions__primary');

	bannerActions.className += ' n-alert-banner__actions--clickarea';
	bannerActions.addEventListener('click', clickEvent => {
		// Hit test to see if the click originated on expanded click area
		if (clickEvent.target !== bannerButton) {
			clickEvent.stopPropagation();
			bannerButton.click();
			return false;
		}
	});

	done();
};
