module.exports = function customSetup (banner, done) {
	const actions = banner.innerElement.querySelector('div.n-alert-banner__actions');
	const button = banner.innerElement.querySelector('a.n-alert-banner__button');

	actions.className += ' n-alert-banner__actions--clickarea';
	actions.addEventListener('click', event => {
		// Hit test to see if the click originated on expanded click area
		if (event.target !== button) {
			event.stopPropagation();
			button.click();
			return false;
		}
	});

	done();
};
