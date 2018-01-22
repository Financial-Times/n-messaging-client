const { getCurrentLayout } = require('o-grid');

const FORM_SELECTOR = '.js-n-app-banner-form';
const SUBMIT_SELECTOR = '.js-n-app-banner-button';
const ERROR_SELECTOR = '.js-n-app-banner-error-message';

module.exports = function customSetup (banner, done) {
	const form = banner.innerElement.querySelector(FORM_SELECTOR);
	const submitBtn = banner.innerElement.querySelector(SUBMIT_SELECTOR);
	const errorMessage = banner.innerElement.querySelector(ERROR_SELECTOR);

	const wrapper = banner.innerElement;

	if (isShowable()) {
		form.addEventListener('submit', handleFormSubmit);
		done();
	} else {
		done({ skip: true });
	}

	function handleFormSubmit (e) {
		if (!submitBtn.disabled) {
			submitBtn.disabled = 'disabled';
			submitForm();
		}
		e.preventDefault();
		return false;
	}

	function isShowable () {
		return ['M','L','XL'].indexOf(getCurrentLayout()) !== -1;
	}

	function submitForm () {
		return fetch(form.action, { method: 'POST', credentials: 'same-origin' })
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('<strong>Oops!</strong> Please try again.');
				}
				wrapper.className += ' has-sent';
			})
			.catch((e) => {
				errorMessage.innerHTML = `<p>${e.message}</p>`;
				submitBtn.disabled = false;
			});
	}

};
