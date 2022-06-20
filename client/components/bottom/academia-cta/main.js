const Message = require("@financial-times/o-message").default;
const pageKitFlags = require("@financial-times/dotcom-ui-flags");

let successMessages = new Map();

const handleActionClickEvent = (event) => {
	if (!event.target.classList.contains("o-banner__action")) {
		return;
	}

	event.preventDefault();

	const target = event.target;
	const urlSelectorElement = target.closest(".academia-cta-url-selector");
	const anchorElement = urlSelectorElement.querySelector(
		".academia-cta-url-selector__url a"
	);

	// as there are two content elements (one for small screens, one for large)
	// we need to identify which element the click originated from
	// and generate a unique query selector to pass to o-message
	const bannerContentElement = target.closest(".o-banner__content");
	const bannerContentSelector = Array.from(
		bannerContentElement.classList.values()
	).reduce((prev, curr) => {
		return `${prev}.${curr}`;
	}, "");

	navigator.clipboard.writeText(anchorElement.getAttribute("href")).then(() => {
		urlSelectorElement.style.display = "none";

		if (successMessages.has(bannerContentSelector)) {
			successMessages.get(bannerContentSelector).open();
		} else {
			const msg = new Message(null, {
				type: "alert",
				state: "success",
				content: {
					detail: "The link has been copied to the clipboard",
				},
				parentElement: `${bannerContentSelector} .academia-cta-message-container`,
			});

			msg.messageElement.addEventListener("o.messageClosed", () => {
				urlSelectorElement.style.display = "flex";
			});

			// store the message in a map for later retrieval
			// as o-message has no method for deletion/removal
			successMessages.set(bannerContentSelector, msg);
		}
	});
};

module.exports = (banner, done) => {
	const flags = pageKitFlags.init();
	const bannerElement = banner.bannerElement;

	if (flags.get("academicCtaTest") !== "variant") {
		return done({ skip: true });
	}

	document.addEventListener( "click", handleClick, false );

	function handleClick( event ) {

		if (bannerElement.contains(event.target) === false) {
			banner.close()
		}
	}	

	if (navigator.clipboard && navigator.clipboard.writeText) {
		bannerElement
			.querySelectorAll(".o-banner__action")
			.forEach((buttonElement) => buttonElement.classList.remove("n-ui-hide"));
		bannerElement.addEventListener("click", handleActionClickEvent);
	}

	done();
};
