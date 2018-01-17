const { getCurrentLayout } = require('o-grid');

module.exports = function customSetup (banner, done) {
    const form = banner.querySelector('.js-n-app-banner-form');
    console.log('==================');
    console.log('form', form);
    console.log('==================');
    
    const submitBtn = banner.querySelector('.js-n-app-banner-button');
    const errorMessage = banner.querySelector('.js-n-app-banner-error-message');
    const wrapper = banner;

    // if (isShowable()) {
        form.addEventListener('submit', handleFormSubmit);
    // }
    
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

	done();
};
