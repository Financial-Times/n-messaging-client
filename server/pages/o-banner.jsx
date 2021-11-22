/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from '@financial-times/x-engine';


export default function Obanner ({
	renderOpen,
	themeMarketing,
	themeProduct,
	themeCompact,
	themeSlateLemon,
	small,
	bannerClass,
	suppressCloseButton,
	closeLabel,
	contentLong,
	contentShort,
	buttonUrl,
	buttonLabel,
	linkUrl,
	linkLabel,
	...props
}) {

	let bannerAttributes = {};

	if (Boolean(renderOpen)) { bannerAttributes.renderOpen = renderOpen; }
	if (Boolean(themeMarketing)) { bannerAttributes.themeMarketing = themeMarketing; }
	if (Boolean(themeProduct)) { bannerAttributes.themeProduct = themeProduct; }
	if (Boolean(themeCompact)) { bannerAttributes.themeCompact = themeCompact; }
	if (Boolean(themeSlateLemon)) { bannerAttributes.themeSlateLemon = themeSlateLemon; }
	if (Boolean(small)) { bannerAttributes.small = small; }
	if (Boolean(suppressCloseButton)) { bannerAttributes['data-o-banner-suppress-close-button'] = true; }
	if (Boolean(closeLabel)) { bannerAttributes['data-o-banner-close-button-label'] = closeLabel; }
	bannerAttributes['data-o-banner-banner-class'] = bannerClass || 'o-banner';


	return (
		<div className="o-banner n-messaging-client-messaging-banner"
			{...bannerAttributes}
			data-n-messaging-component=""
			data-o-banner-auto-open="false"
		>
			<div className="o-banner__outer">
				{Boolean(props.children) && <Fragment>{props.children}</Fragment>}
				{!Boolean(props.children) &&
				<div className="o-banner__inner" data-o-banner-inner="">

					{
						contentLong &&
						(
							// Content to display on larger screens
							<div className="o-banner__content o-banner__content--long">
								{contentLong}
							</div>
						)
					}



					{
						contentShort &&
						(
							// Content to display on smaller screens
							<div className="o-banner__content o-banner__content--short">
								{contentShort}
							</div>
						)
					}

					{/* Button and link */}
					<div className="o-banner__actions">
						{
							buttonUrl &&
							(
								<div className="o-banner__action">
									<a href={buttonUrl} className="o-banner__button" data-n-messaging-banner-action="" data-trackable="onsite-message-button">{buttonLabel}</a>
								</div>
							)
						}


						{
							linkUrl &&
							(
								<div className="o-banner__action o-banner__action--secondary">
									<a href={linkUrl} className="o-banner__link" data-n-messaging-banner-action="" data-trackable="onsite-message-link">{linkLabel}</a>
								</div>
							)
						}
					</div>

				</div>
				}
			</div>
		</div >
	)
}