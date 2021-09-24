module.exports = (banner, done) => {
	const BOOK_NOW = 'book-now';
	const ctaButtons = Array.from(banner.bannerElement.querySelectorAll('.n-messaging-client-messaging-banner--customer-care-call__book-now-action'));
	ctaButtons.forEach((ctaButton) => {
		ctaButton.addEventListener('click', (event) => {
			const isFeedbackBtn = event.target.name === BOOK_NOW;

			isFeedbackBtn ? banner.bannerElement.parentNode.removeChild(banner.bannerElement) : banner.close();
		});
	});

	done();
};
