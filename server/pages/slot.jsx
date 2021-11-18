import { h, Fragment } from '@financial-times/x-engine';
import { Presenter } from '../presenter';

export default function Slot ({flags, type, variants}) {

	const presenter = new Presenter({ flags, type, variants });

	if(!presenter.hasMessage) {
		return (<Fragment></Fragment>)
	}

	return (
		<div
			class="n-messaging-slot"
			data-n-messaging-slot={type}
			data-n-messaging-name={presenter.data.variant}
			data-trackable={`onsite-message-${presenter.data.variant}`}
			data-n-messaging-tooltip={presenter.data.tooltip}>
			{{>(lookup @nMessagingPresenter.data 'path')}}
		</div>
	)


}