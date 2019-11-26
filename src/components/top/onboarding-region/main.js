const oTooltip = require('o-tooltip');

const init = (banner, done) => {
	const selector = '[data-trackable="World"]';
	const contentEl = banner.messageElement.querySelector('.o-message__content');
	const targetElement = document.querySelector(selector);
	const opts = {
		target: selector,
		content: contentEl.innerHTML,
		showOnConstruction: true,
		position: 'below'
	};

	if (targetElement) {
		const tooltip = new oTooltip(targetElement, opts);
		tooltip.tooltipEl.classList.add('n-messaging-client-tooltip');
		tooltip.tooltipEl.querySelector('.o-message__content-main').classList.add('o-message--alert-bleed');
		tooltip.tooltipEl.addEventListener('oTooltip.close', () => {
			banner.close();
		});
	}
	done();
};

module.exports = function customSetup (banner, done) {
	setTimeout(() => {
		init(banner, done);
	}, 4000);

};
