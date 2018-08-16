const OShare = require('o-share');
const COPY_BUTTON_SELECTOR = '.invite-colleagues__copy-link-button';
const COPY_TEXT_SELECTOR = '.invite-colleagues__copy-link';
const COPY_SUCCESS_CLASS = 'copy-success';
const NON_INITED_SHARE_CONTAINER_SELECTOR = '[data-o-component=o-share]:not([data-o-share--js])';

module.exports = function customSetup (banner, done) {

	const shareContainer = banner.innerElement.querySelector(NON_INITED_SHARE_CONTAINER_SELECTOR);

	if (shareContainer) {
		OShare.init(shareContainer);
	}

	const copyButtons = banner.innerElement.querySelectorAll(COPY_BUTTON_SELECTOR);

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

	if (copyButtons) {
		copyButtons.forEach(button => button.addEventListener('click', () => copyLink(button), false));
	}

	done();
};
