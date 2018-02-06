const MESSAGING_PRESENTER = '../../src/handlebars-helpers/nMessagingPresenter';
const SLOT_PRESENTER = '../presenters/slot-presenter';

const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const nMessagingPresenter = require(MESSAGING_PRESENTER);

describe('nMessagingPresenter', () => {
	let context;
	let options;
	let stub;

	beforeEach(() => {
		context = {};
		options = {
			hash: {test: 'property'},
			data: {},
			fn: () => {}
		};
		stub = sinon.stub();
	});

	it('should copy properties from options.hash to the context', () => {
		nMessagingPresenter(context, options);
		expect(context).to.include({test: 'property'});
	});

	it('should not copy any other properties to the context', () => {
		options.test = options.hash;
		delete options.hash;
		nMessagingPresenter(context, options);
		expect(context).to.not.include({test: 'property'});
	});

	it('should run the options.fn method if options has data', () => {
		sinon.spy(options, 'fn');
		nMessagingPresenter(context, options);
		expect(options.fn.callCount).to.equal(1);
	});

	it('should initalising the SlotPresenter if options has data', () => {
		const proxyNMessagingPresenter = proxyquire(MESSAGING_PRESENTER, {
			[SLOT_PRESENTER]: stub
		});
		proxyNMessagingPresenter(context, options);
		expect(stub.callCount).to.equal(1);
	});

	it('should not run the options.fn method if options has no data', () => {
		sinon.spy(options, 'fn');
		delete options.data;
		nMessagingPresenter(context, options);
		expect(options.fn.callCount).to.equal(0);
	});

	it('should not initalise the SlotPresent if options has no data', () => {
		const proxyNMessagingPresenter = proxyquire(MESSAGING_PRESENTER, {
			[SLOT_PRESENTER]: stub
		});
		delete options.data;
		proxyNMessagingPresenter(context, options);
		expect(stub.callCount).to.equal(0);
	});
});
