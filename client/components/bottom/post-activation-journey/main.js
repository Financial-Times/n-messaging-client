module.exports = (banner, done) => {
	const LEAVE_FEEDBACK = 'leave-feedback';
	const closeButtons = Array.from(banner.bannerElement.querySelectorAll('.n-messaging-client-messaging-banner-post-activation-journey__action'));
	closeButtons.forEach((closeButton) => {
		closeButton.addEventListener('click', (event) => {
			const isFeedbackBtn = event.target.name === LEAVE_FEEDBACK && typeof banner.bannerElement.remove === 'function';

			isFeedbackBtn ? banner.bannerElement.remove() : banner.close();
		});
	});

	done();
};
