let oBanner = require('o-banner');
oBanner = oBanner.default || oBanner;

const { generateMessageEvent, listen, messageEventLimitsBreached } = require('./utils');

const BOTTOM_SLOT_CONTENT_SELECTOR = '[data-n-messaging-slot="bottom"] [data-n-messaging-component]';
const BANNER_CLASS = 'o-banner';
const N_MESSAGING_BANNER_CLASS = 'n-messaging-client-messaging-banner';
const BANNER_ACTION_SELECTOR = '[data-n-messaging-banner-action]';
const BANNER_BUTTON_SELECTOR = `.${BANNER_CLASS}__button`;
const BANNER_LINK_SELECTOR = `.${BANNER_CLASS}__link`;
const BOTTOM_SLOT_FLAG = 'messageSlotBottom';

module.exports = function ({ config={}, guruResult, customSetup }={}) {
	const guruRenderData = guruResult && guruResult.renderData || {};
	const trackEventAction = getTracker(config, guruRenderData);

	const skip = guruResult && guruResult.skip;
	const bannerLimitBreached = messageEventLimitsBreached(config.name);
	if (skip | bannerLimitBreached) {
		trackEventAction('skip');
		return;
	}

	// Return silently if the banner cannot be rendered.
	// Note: This logic is carried over after refactoring, it's unclear if the
	// original intention was to silently skip without firing an event.
	const declarativeElement = !config.lazy && config.content;
	const hasGuruResult = guruResult && guruResult.renderData;
	const cannotRenderBanner = !declarativeElement && !hasGuruResult;
	if (cannotRenderBanner) {
		return;
	}

	// Render the banner.
	const banner = declarativeElement ?
		new oBanner(declarativeElement) :
		renderBannerFromData(guruRenderData);

	// Setup banner tracking.
	trackBannerInteractions(banner, trackEventAction);

	// Display the banner.
	if (!customSetup) {
		banner.open();
	} else {
		customSetup = customSetup || customSetup.default; // ESM modules
		function customSetupCallback ({ skip = false } = {}) {
			if (skip) {
				trackEventAction('skip');
				return;
			}
			banner.open();
		}
		customSetup(banner, customSetupCallback, guruResult, trackEventAction);
		return;
	}
};

function trackBannerInteractions (banner, trackEventAction) {
	// attach event handlers
	let actions = banner.innerElement.querySelectorAll(BANNER_ACTION_SELECTOR);
	let linkActions = [];
	if (actions.length === 0) {
		// if no actions specified in markup then default to adding it to the
		// button element (this can happen when declared imperatively)
		actions = banner.innerElement.querySelectorAll(BANNER_BUTTON_SELECTOR);
		linkActions = banner.innerElement.querySelectorAll(BANNER_LINK_SELECTOR);
	}
	actions = [
		...actions,
		...linkActions
	];
	listen(banner.bannerElement, 'o.bannerClosed', () => trackEventAction('close'));
	listen(banner.bannerElement, 'o.bannerOpened', () => trackEventAction('view'));
	if (actions && actions.length > 0) {
		actions.forEach((el) => {
			const trackingAttr = el.dataset.nMessagingBannerActionType;
			const actionText = el.textContent;
			listen(el, 'click', () => trackEventAction(el.dataset['nMessagingBannerAction'] || 'act', trackingAttr || actionText));
		});
	}
}

function renderBannerFromData (guruRenderData) {
	const options = {
		autoOpen: guruRenderData.autoOpen || false,
		suppressCloseButton: guruRenderData.suppressCloseButton || false,
		bannerClass: guruRenderData.bannerClass || BANNER_CLASS,
		theme: guruRenderData.bannerTheme,
		layout: guruRenderData.bannerLayout,
		formEncoding: guruRenderData.formEncoding,
		formMethod: guruRenderData.formMethod,
		formAction: guruRenderData.formAction,
		contentLong: guruRenderData.contentLong,
		contentShort: guruRenderData.contentShort,
		buttonLabel: guruRenderData.buttonLabel,
		buttonUrl: guruRenderData.buttonUrl,
		linkLabel: guruRenderData.linkLabel,
		linkUrl: guruRenderData.linkUrl,
		appendTo: BOTTOM_SLOT_CONTENT_SELECTOR,
		dynamicTrackingData: guruRenderData.dynamicTrackingData
	};

	const banner = new oBanner(null, options);

	// Add custom classes to the banner.
	banner.bannerElement.classList.add(N_MESSAGING_BANNER_CLASS);
	if (Array.isArray(guruRenderData.customThemes)) {
		for (const theme of guruRenderData.customThemes) {
			banner.bannerElement.classList.add(`${N_MESSAGING_BANNER_CLASS}--${theme}`);
		}
	}

	return banner;
}

function getTracker (config, guruRenderData) {
	const variant = guruRenderData.dynamicTrackingData || config.name;
	const trackingContext = Object.assign(
		config.trackingContext || {},
		guruRenderData.trackingContext || {},
	);
	return generateMessageEvent({
		flag: BOTTOM_SLOT_FLAG,
		messageId: config.name,
		position: config.slot,
		trackingContext,
		variant
	});
};
