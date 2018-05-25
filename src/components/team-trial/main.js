const Overlay = require('o-overlay');
const componentName = 'n-overlay';
const loaderClass = 'o-overlay--n-overlay-loader';
const iframeClass = 'o-overlay--n-overlay-iframe';
const generateHtml = (src) => `
<article class="${loaderClass}">
	<div class="${loaderClass}-indicator"></div>
</article>
<iframe class="${iframeClass}" src="${src}"></iframe>`;

module.exports = function customSetup (banner, done) {
	const overlayTrigger = banner.innerElement.querySelector('.n-alert-banner__action a');
	const closeTrigger = banner.innerElement.querySelector('.n-alert-banner__action--secondary a');

	if (overlayTrigger) {
		const src = overlayTrigger.href + (/\?/.test(overlayTrigger.href) ? '&' : '?') + 'embedded=true';
		const options = {
			html: `${generateHtml(src)}`,
			trigger: overlayTrigger,
			heading: {
				title: overlayTrigger.text,
				visuallyHideTitle: true
			}
		};

		// Remove default link functionality for overlay to open
		overlayTrigger.addEventListener('click', e => e.preventDefault());

		new Overlay(componentName, options);
	}

	if (closeTrigger) {
		closeTrigger.addEventListener('click', e => {
			// Add close class rather than calling close to avoid a close event firing
			banner.alertBannerElement.classList.add('n-alert-banner--closed');
			e.preventDefault();
		});
	}

	done();
};
