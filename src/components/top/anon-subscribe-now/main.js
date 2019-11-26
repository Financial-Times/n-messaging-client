module.exports = function customSetup (banner, done) {

	const bannerActions = banner.messageElement.querySelector('.o-message__actions');
	const bannerButton = banner.messageElement.querySelector('.o-message__actions__primary');

	bannerActions.className += ' o-message__actions--clickarea';
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
