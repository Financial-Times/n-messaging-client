const oTooltip = require('@financial-times/o-tooltip').default;
const oTracking = require('@financial-times/o-tracking').default;

function onClose () {
	oTracking.event({
		detail: {
			category: 're-onboarding',
			action: 'close',
			referrer: document.referrer,
			url: document.URL,
		}
	});
}

function onOpen () {
	oTracking.event({
		detail: {
			category: 're-onboarding',
			action: 'view',
			referrer: document.referrer,
			url: document.URL,
		}
	});
}

function removeVeil () {
	document.querySelector('.embedded-onboarding-veil').remove();
}

function addVeil () {
	document.querySelector('.embedded-onboarding-veil').classList.add('embedded-onboarding-veil--active');
}

function showMessage () {
	document.querySelector('.n-messaging-client-messaging-banner-embedded-onboarding').classList.remove('n-messaging-client-messaging-banner-embedded-onboarding--hidden');
}

function resize (dimensions) {
	const windowHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	const frameHeight = dimensions.height || 0;

	if (frameHeight && windowHeight) {
		// Calculates the percentage of the window to be taken by the frame. Adds an extra 10px for spacing.
		const frameVH = Math.round(((frameHeight + 10)* 100) / windowHeight);
		// Sets the frame height to a maximum of 90vh.
		document.querySelector('.n-messaging-client-messaging-banner-embedded-onboarding-content').style.height =`${Math.min(frameVH, 90)}vh`;
	}
}

function showTooltip () {
	const tooltipTemplate = document.createElement('div');
	const opts = {
		target: 'o-header-top-link-myft',
		content: 'Your preference has been recorded.<br/><strong>Manage your choices in myFT</strong>',
		showOnConstruction: true,
		closeAfter: 5,
		position: 'below'
	};

	new oTooltip(tooltipTemplate, opts);
};

module.exports = (banner, done, guruResult) => {
	const { renderData } = guruResult || {};

	if (!renderData || !renderData.embeddedOnboarding || !renderData.embeddedOnboarding.homepageOnboarding) {
		return done();
	}

	addVeil();
	showMessage();
	onOpen();

	const closeButton = banner.bannerElement.querySelector('.o-banner__close');
	closeButton.addEventListener('click', function () {
		onClose();
		removeVeil();
	});

	const handleMessage = (event) => {
		const { action, payload } = event.data || {};

		switch(action) {
			case 'activationReady':
				const dimensions = payload;
				resize(dimensions);
				break;
			case 'activationComplete':
				banner.close();
				removeVeil();
				showTooltip();
				break;
		}
	};

	window.addEventListener('message', (event) => {
		if (!event.origin.includes('ft.com')) {
			return;
		}

		handleMessage(event);
	}, false);

	done();
};
