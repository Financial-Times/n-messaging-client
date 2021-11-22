/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line no-unused-vars
import { h, Fragment } from '@financial-times/x-engine';


export default function Obanner ({
	renderOpen,
	theme,
	customClass,
	customDataTrackableBanner,
	closeButton,
	contentTitle,
	contentDetail,
	contentImage,
	buttonUrl,
	buttonAction,
	buttonLabel,
	linkUrl,
	linkAction,
	linkLabel,
	customDataTrackableActions,
	customDataTrackableButton,
	customDataTrackableLink
}) {

	const messageContainerAttributes = {};
	let className = [
		'o-message n-messaging-client-alert-banner o-message--alert',
		`o-message--${theme}`,
		`n-messaging-client-alert-banner--${theme}`
	];
	if (!renderOpen) {
		className.push('o-message--closed')
	}

	if (customClass) {
		className.push(customClass);
	}

	messageContainerAttributes.className = className;

	if (customDataTrackableBanner) {
		messageContainerAttributes['data-trackable'] = customDataTrackableBanner;
	}

	const messageActionsAttributes = {};
	if(customDataTrackableActions) {
		messageActionsAttributes['data-trackable'] = customDataTrackableActions;
	}


	return (
		<div
			data-o-component="o-message"
			data-close={closeButton}
			data-n-messaging-component=""
			data-o-message-auto-open="false"
			{...messageContainerAttributes}
		>
			<div className="o-message__container">
				<div className="o-message__content">
					{
						(Boolean(contentTitle) || Boolean(contentDetail)) &&
						<Fragment>
							<p className="o-message__content-main o-message__cell">
								{Boolean(contentTitle) && (<span className="o-message__content-highlight">{contentTitle}</span>)}
								{Boolean(contentDetail) && (<span className="o-message__content-detail">{contentDetail}</span>)}
							</p>
						</Fragment>
					}

					{
						(Boolean(contentImage)) &&
						(<div className="o-message__image o-message__cell">
							<img src={contentImage} alt="" />
						</div>)
					}

					{
						(Boolean(buttonUrl) || Boolean(linkUrl)) &&
						<div className="o-message__actions o-message__cell" {...customDataTrackableActions} >
							{Boolean(buttonUrl) &&
								<a href={buttonUrl} className="o-message__actions__primary" data-o-message-action={buttonAction} data-trackable={customDataTrackableButton? customDataTrackableButton: 'onsite-message-button'} role="button">{buttonLabel}</a>
							}
							{Boolean(linkUrl) &&
							<a href={linkUrl} className="o-message__actions__secondary" data-o-message-action={linkAction} data-trackable={customDataTrackableLink? customDataTrackableLink: 'onsite-message-link'}>{linkLabel}</a>
							}
						</div>

					}

				</div>
			</div>
		</div>

	)
}