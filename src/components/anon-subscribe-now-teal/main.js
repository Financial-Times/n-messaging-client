module.exports = function customSetup (banner, done) {
	const bannerActions = banner.innerElement.querySelector('div.n-alert-banner__actions');
	const bannerButton = banner.innerElement.querySelector('a.n-alert-banner__button');

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
