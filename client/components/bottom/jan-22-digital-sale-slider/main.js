const cookies = require('js-cookie');

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const POPUP_PROMPT_COOKIE_NAME = 'jan22SalePromptShown';

module.exports = (banner, done) => {
	const timeSet = cookies.get(POPUP_PROMPT_COOKIE_NAME);

	if (timeSet === undefined) {
		banner.open();
	}

	const closeButton = banner.bannerElement.querySelector('.o-banner__close');
	closeButton.addEventListener('click', function addCookie () {
		const expiryDate = new Date(new Date().getTime() + 10 * ONE_DAY_MS);
		cookies.set(POPUP_PROMPT_COOKIE_NAME, 'OK', { domain: 'ft.com', expires: expiryDate });
	});

	return done({ skip: true });
};
