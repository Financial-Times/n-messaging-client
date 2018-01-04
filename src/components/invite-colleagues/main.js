const COPY_BUTTON_SELECTOR = '.invite-colleagues__copy-link-button';
const COPY_TEXT_SELECTOR = '.invite-colleagues__copy-link';
const COPY_SUCCESS_CLASS = 'copy-success';

module.exports = function customSetup (banner, done) {
	const copyButtons = banner.innerElement.querySelectorAll(COPY_BUTTON_SELECTOR);

	if (copyButtons) {
		copyButtons.forEach(button => button.addEventListener('click', () => copyLink(button), false));
	}

	function copyLink (el) {
		const copyDiv = el.parentNode;
		const copyText = copyDiv.querySelector(COPY_TEXT_SELECTOR);
		// select text
		copyText.focus();
		copyText.select();

		try {
			// copy text
			document.execCommand('copy');
			copyDiv.classList.add(COPY_SUCCESS_CLASS); // adds after element with tick icon and confirmation text
		} catch (e) {}
	}

	done();
};
