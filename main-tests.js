const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

const liveEnabled = false;

const uDone = function (inputData) {
	return inputData;
};

describe('OLSKTradeStripeGuardMiddleware', function test_OLSKTradeStripeGuardMiddleware() {

	const _OLSKTradeStripeGuardMiddleware = function (inputData) {
		return mod.OLSKTradeStripeGuardMiddleware({
			_FakeEnv: Object.assign({
				OLSK_TRADE_STRIPE_SECRET_API_KEY: 'alfa',
			}, inputData),
		}, {}, uDone);
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKTradeStripeGuardMiddleware({
				_FakeEnv: 'alfa',
			}, {}, uDone)
		}, /OLSKErrorInputNotValid/);
	});

	it('returns error if no OLSK_TRADE_STRIPE_SECRET_API_KEY', function () {
		deepEqual(_OLSKTradeStripeGuardMiddleware({
			OLSK_TRADE_STRIPE_SECRET_API_KEY: null,
		}), new Error('OLSK_TRADE_STRIPE_SECRET_API_KEY not filled'));
	});

	it('returns error if OLSK_TRADE_STRIPE_SECRET_API_KEY blank', function () {
		deepEqual(_OLSKTradeStripeGuardMiddleware({
			OLSK_TRADE_STRIPE_SECRET_API_KEY: ' ',
		}), new Error('OLSK_TRADE_STRIPE_SECRET_API_KEY not filled'));
	});

	it('returns undefined', function() {
		deepEqual(_OLSKTradeStripeGuardMiddleware(), undefined);
	});

});

describe('OLSKTradePayPalGuardMiddleware', function test_OLSKTradePayPalGuardMiddleware() {

	const _OLSKTradePayPalGuardMiddleware = function (inputData) {
		return mod.OLSKTradePayPalGuardMiddleware({
			_FakeEnv: Object.assign({
				OLSK_TRADE_PAYPAL_CLIENT_ID: 'alfa',
				OLSK_TRADE_PAYPAL_CLIENT_SECRET: 'alfa',
			}, inputData),
		}, {}, uDone);
	};

	it('throws if not object', function() {
		throws(function() {
			mod.OLSKTradePayPalGuardMiddleware({
				_FakeEnv: 'alfa',
			}, {}, uDone)
		}, /OLSKErrorInputNotValid/);
	});

	it('returns error if no OLSK_TRADE_PAYPAL_CLIENT_ID', function () {
		deepEqual(_OLSKTradePayPalGuardMiddleware({
			OLSK_TRADE_PAYPAL_CLIENT_ID: null,
		}), new Error('OLSK_TRADE_PAYPAL_CLIENT_ID not filled'));
	});

	it('returns error if OLSK_TRADE_PAYPAL_CLIENT_ID blank', function () {
		deepEqual(_OLSKTradePayPalGuardMiddleware({
			OLSK_TRADE_PAYPAL_CLIENT_ID: ' ',
		}), new Error('OLSK_TRADE_PAYPAL_CLIENT_ID not filled'));
	});

	it('returns error if no OLSK_TRADE_PAYPAL_CLIENT_SECRET', function () {
		deepEqual(_OLSKTradePayPalGuardMiddleware({
			OLSK_TRADE_PAYPAL_CLIENT_SECRET: null,
		}), new Error('OLSK_TRADE_PAYPAL_CLIENT_SECRET not filled'));
	});

	it('returns error if OLSK_TRADE_PAYPAL_CLIENT_SECRET blank', function () {
		deepEqual(_OLSKTradePayPalGuardMiddleware({
			OLSK_TRADE_PAYPAL_CLIENT_SECRET: ' ',
		}), new Error('OLSK_TRADE_PAYPAL_CLIENT_SECRET not filled'));
	});

	it('returns undefined', function() {
		deepEqual(_OLSKTradePayPalGuardMiddleware(), undefined);
	});

});

describe('OLSKTradeStripeSession', function test_OLSKTradeStripeSession() {

	const uStripe = function () {
		return {
			checkout: {
				sessions: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			},
		};
	};

	it('throws if param1 not stripe', function () {
		throws(function () {
			mod.OLSKTradeStripeSession(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKTradeStripeSession(uStripe, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns checkout.sessions.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(mod.OLSKTradeStripeSession(uStripe, item), [item, {
			expand: ['customer'],
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeSession(require('stripe'), 'cs_test_349RhhKHLSqyTxTGDF7zoZvLEm8eEss0snlu991ZOm7c5FvDVubbvFFo')), '');
		});
	}

});

describe('OLSKTradeStripeSubscription', function test_OLSKTradeStripeSubscription() {

	const uStripe = function () {
		return {
			subscriptions: {
				retrieve () {
					return Array.from(arguments);
				},
			},
		};
	};

	it('throws if param1 not stripe', function () {
		throws(function () {
			mod.OLSKTradeStripeSubscription(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKTradeStripeSubscription(uStripe, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns subscriptions.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(mod.OLSKTradeStripeSubscription(uStripe, item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeSubscription(require('stripe'), 'sub_HxEfQdyTuBzal0')), '');
		});
	}

});

describe('OLSKTradeStripeInvoice', function test_OLSKTradeStripeInvoice() {

	const _OLSKTradeStripeInvoice = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				invoices: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			},
		}).OLSKTradeStripeInvoice(...Array.from(arguments));
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeInvoice(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns invoices.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradeStripeInvoice(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeInvoice('in_0HNKC3YiCgQEaSkygSOetZ6p')), '');
		});
	}

});

describe('OLSKTradeStripeCharge', function test_OLSKTradeStripeCharge() {

	const _OLSKTradeStripeCharge = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				charges: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			},
		}).OLSKTradeStripeCharge(...Array.from(arguments));
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeCharge(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns charges.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradeStripeCharge(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeCharge('ch_0HNKC4YiCgQEaSkyywcDEnVg')), '');
		});
	}

});

describe('OLSKTradeStripeListCharges', function test_OLSKTradeStripeListCharges() {

	const _OLSKTradeStripeListCharges = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				charges: Object.assign({
					list () {
						return {
							data: [{
								alfa: 'bravo',
							}],
						};
					},
				}, inputData),
			},
		}).OLSKTradeStripeListCharges();
	};

	it('returns charges.list.data', function () {
		deepEqual(_OLSKTradeStripeListCharges(), [{
			alfa: 'bravo',
		}]);
	});

	it('passes input params', function () {
		deepEqual(_OLSKTradeStripeListCharges({
			list () {
				return {
					data: Array.from(arguments),
				};
			},
		}), [{
			limit: 30,
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeListCharges()), '');
		});
	}

});

describe('OLSKTradeStripeListInvoices', function test_OLSKTradeStripeListInvoices() {

	const _OLSKTradeStripeListInvoices = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				invoices: {
					list () {
						return {
							data: [{
								alfa: 'bravo',
							}],
						};
					},
				},
			},
		}).OLSKTradeStripeListInvoices();
	};

	it('returns invoices.list.data', function () {
		deepEqual(_OLSKTradeStripeListInvoices(), [{
			alfa: 'bravo',
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeListInvoices()), '');
		});
	}

});

describe('OLSKTradeStripeInvoicePrefix', function test_OLSKTradeStripeInvoicePrefix() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeInvoicePrefix(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns inputData', function () {
		deepEqual(mod.OLSKTradeStripeInvoicePrefix(''), '');
	});

	it('trims over eight characters', function () {
		deepEqual(mod.OLSKTradeStripeInvoicePrefix('alfabravo'), 'alfabrav');
	});

});

describe('OLSKTradePayPalAccessToken', function test_OLSKTradePayPalAccessToken() {

	const _OLSKTradePayPalAccessToken = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				access: {
					token () {
						return {
							access_token: 'alfa',
						};
					},
				},
			}, inputData),
		}).OLSKTradePayPalAccessToken();
	};

	it('returns _DataFoilPayPal.access.token', function () {
		deepEqual(_OLSKTradePayPalAccessToken(), 'alfa');
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual((await _OLSKTradePayPalAccessToken(mod._DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalSubscription', function test_OLSKTradePayPalSubscription() {

	const _OLSKTradePayPalSubscription = function (param1, param2) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				subscriptions: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			}, param2),
		}).OLSKTradePayPalSubscription(param1);
	};

	it('throws if not string', function () {
		throws(function () {
			_OLSKTradePayPalSubscription(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns _DataFoilPayPal.subscriptions.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradePayPalSubscription(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await _OLSKTradePayPalSubscription('I-SRVSXYP043JX', mod._DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalTransactions', function test_OLSKTradePayPalTransactions() {

	const _OLSKTradePayPalTransactions = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				transactions: {
					list () {
						return {
							transaction_details: [{
								alfa: 'bravo',
							}],
						};
					},
				},
			}, inputData),
		}).OLSKTradePayPalTransactions();
	};

	it('returns _DataFoilPayPal.transactions.list', function () {
		deepEqual(_OLSKTradePayPalTransactions(), [{
			alfa: 'bravo',
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await _OLSKTradePayPalTransactions(mod._DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalOrder', function test_OLSKTradePayPalOrder() {

	const _OLSKTradePayPalOrder = function (param1, param2) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				orders: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			}, param2),
		}).OLSKTradePayPalOrder(param1);
	};

	it('throws if not string', function () {
		throws(function () {
			_OLSKTradePayPalOrder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns _DataFoilPayPal.orders.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradePayPalOrder(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await _OLSKTradePayPalOrder('1JF658855X7653252', mod._DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalPlan', function test_OLSKTradePayPalPlan() {

	const _OLSKTradePayPalPlan = function (param1, param2) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				plans: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			}, param2),
		}).OLSKTradePayPalPlan(param1);
	};

	it('throws if not string', function () {
		throws(function () {
			_OLSKTradePayPalPlan(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns _DataFoilPayPal.plans.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradePayPalPlan(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await _OLSKTradePayPalPlan('P-5DR07778R1859725TLWN3OYA', mod._DataFoilPayPal)), '{"id":"P-5DR07778R1859725TLWN3OYA","product_id":"PROD-84K464577F8918311","name":"Yearly","status":"ACTIVE","usage_type":"LICENSED","billing_cycles":[{"pricing_scheme":{"version":1,"fixed_price":{"currency_code":"CAD","value":"1.0"},"create_time":"2019-10-07T22:08:32Z","update_time":"2019-10-07T22:08:32Z"},"frequency":{"interval_unit":"YEAR","interval_count":1},"tenure_type":"REGULAR","sequence":1,"total_cycles":0}],"payment_preferences":{"service_type":"PREPAID","auto_bill_outstanding":false,"setup_fee":{"currency_code":"CAD","value":"0.0"},"setup_fee_failure_action":"CANCEL","payment_failure_threshold":3},"quantity_supported":true,"create_time":"2019-10-07T22:08:32Z","update_time":"2019-10-07T22:08:32Z","links":[{"href":"https://api.sandbox.paypal.com/v1/billing/plans/P-5DR07778R1859725TLWN3OYA","rel":"self","method":"GET","encType":"application/json"},{"href":"https://api.sandbox.paypal.com/v1/billing/plans/P-5DR07778R1859725TLWN3OYA","rel":"edit","method":"PATCH","encType":"application/json"},{"href":"https://api.sandbox.paypal.com/v1/billing/plans/P-5DR07778R1859725TLWN3OYA/deactivate","rel":"self","method":"POST","encType":"application/json"}]}');
		});
	}

});

describe('OLSKTradePayPalSubscriptionTransactions', function test_OLSKTradePayPalSubscriptionTransactions() {

	const _OLSKTradePayPalSubscriptionTransactions = function (param1, param2) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				subscriptions: {
					transactions () {
						return {
							transactions: Array.from(arguments),
						};
					},
				},
			}, param2),
		}).OLSKTradePayPalSubscriptionTransactions(param1);
	};

	it('throws if not string', function () {
		throws(function () {
			_OLSKTradePayPalSubscriptionTransactions(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns _DataFoilPayPal.subscriptions.transactions', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradePayPalSubscriptionTransactions(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await _OLSKTradePayPalSubscriptionTransactions('I-SRVSXYP043JX', mod._DataFoilPayPal)), '[{"status":"COMPLETED","id":"0AV673891R3839400","amount_with_breakdown":{"gross_amount":{"currency_code":"CAD","value":"1.00"},"fee_amount":{"currency_code":"CAD","value":"0.33"},"net_amount":{"currency_code":"CAD","value":"0.67"}},"payer_name":{"given_name":"John","surname":"Doe"},"payer_email":"sb-ihwnq353851@personal.example.com","time":"2020-09-04T16:09:38.000Z"}]');
		});
	}

});
