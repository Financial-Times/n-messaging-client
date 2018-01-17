const { getCurrentLayout } = require('o-grid');

export default class DesktopAppBanner {

	constructor () {
		this.wrapper = document.querySelector('.js-n-app-banner-wrapper');

		if(this.isShowable()) {
			this.closeLink = document.querySelector('.js-app-banner-close');
			this.emailButton = document.querySelector('.js-n-app-banner-button');
			this.errorMessage = document.querySelector('.js-n-app-banner-error-message');
			this.form = document.querySelector('.js-n-app-banner-form');

			this.trackEvent({ action: 'view' });

			this.bindEvents();
		} else {
			// Might as well nuke the markup since it doesn't need to be there.
			this.wrapper.remove();

			this.trackEvent({ action: 'skip' });
		}
	}

	bindEvents () {
		this.closeLink.addEventListener('click', this.handleCloseClick.bind(this));
		this.form.addEventListener('submit', this.handleFormSubmit.bind(this));
	}

	handleCloseClick () {
		this.trackEvent({ action: 'close' });

		this.wrapper.style.bottom = `-${this.wrapper.clientHeight}px`;
	}

	handleFormSubmit (e) {
		if (!this.emailButton.disabled) {
			this.emailButton.disabled = 'disabled';

			this.trackEvent({ action: 'act' });

			this.submitForm();
		}

		e.preventDefault();
		return false;
	}

	isShowable () {
		return ['M','L','XL'].indexOf(getCurrentLayout()) !== -1;
	}

	submitForm () {
		return fetch(this.form.action, { method: 'POST', credentials: 'same-origin' })
			.then((response) => {
				if (response.status !== 200) {
					throw new Error('<strong>Oops!</strong> Please try again.');
				}
				this.wrapper.className += ' has-sent';
			})
			.catch((e) => {
				this.errorMessage.innerHTML = `<p>${e.message}</p>`;
				this.emailButton.disabled = false;
			});
	}

	trackEvent ({ action } = {}) {
		document.body.dispatchEvent(new CustomEvent('oTracking.event', {
			detail: {
				category: 'component',
				action,
				messaging: 'desktop-app-banner'
			},
			bubbles: true
		}));
	}

};
