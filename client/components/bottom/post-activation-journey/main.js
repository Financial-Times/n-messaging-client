module.exports = (banner, done) => {
	const LEAVE_FEEDBACK = 'leave-feedback';
	const closeButtons = Array.from(banner.bannerElement.querySelectorAll('.n-messaging-client-messaging-banner-post-activation-journey__action'));
	closeButtons.forEach((closeButton) => {
		closeButton.addEventListener('click', (event) => {
			const isFeedbackBtn = event.target.name === LEAVE_FEEDBACK;

			isFeedbackBtn ? banner.bannerElement.parentNode.removeChild(banner.bannerElement) : banner.close();
		});
	});

	done();
};
