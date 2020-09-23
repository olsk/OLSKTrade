const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

const liveEnabled = false;

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

	const uStripe = function () {
		return {
			invoices: {
				retrieve () {
					return Array.from(arguments);
				},
			},
		};
	};

	it('throws if param1 not stripe', function () {
		throws(function () {
			mod.OLSKTradeStripeInvoice(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKTradeStripeInvoice(uStripe, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns invoices.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(mod.OLSKTradeStripeInvoice(uStripe, item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeInvoice(require('stripe'), 'in_0HNKC3YiCgQEaSkygSOetZ6p')), '');
		});
	}

});

describe('OLSKTradeStripeCharge', function test_OLSKTradeStripeCharge() {

	const uStripe = function () {
		return {
			charges: {
				retrieve () {
					return Array.from(arguments);
				},
			},
		};
	};

	it('throws if param1 not stripe', function () {
		throws(function () {
			mod.OLSKTradeStripeCharge(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKTradeStripeCharge(uStripe, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns charges.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(mod.OLSKTradeStripeCharge(uStripe, item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeCharge(require('stripe'), 'ch_0HNKC4YiCgQEaSkyywcDEnVg')), '');
		});
	}

});

describe('OLSKTradeStripeListCharges', function test_OLSKTradeStripeListCharges() {

	const uStripe = function () {
		return {
			charges: {
				list () {
					return {
						data: [{
							alfa: 'bravo',
						}],
					};
				},
			},
		};
	};

	it('throws if param1 not stripe', function () {
		throws(function () {
			mod.OLSKTradeStripeListCharges(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns charges.list', function () {
		deepEqual(mod.OLSKTradeStripeListCharges(uStripe), [{
			alfa: 'bravo',
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual((await mod.OLSKTradeStripeListCharges(require('stripe'))), [{}]);
		});
	}

});

describe('OLSKTradeStripeListInvoices', function test_OLSKTradeStripeListInvoices() {

	const uStripe = function () {
		return {
			invoices: {
				list () {
					return {
						data: [{
							alfa: 'bravo',
						}],
					};
				},
			},
		};
	};

	it('throws if not stripe', function () {
		throws(function () {
			mod.OLSKTradeStripeListInvoices(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns invoices.list.data', function () {
		deepEqual(mod.OLSKTradeStripeListInvoices(uStripe), [{
			alfa: 'bravo',
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeListInvoices(require('stripe'))), '');
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

	const uPayPal = function (inputData) {
		return {
			access: {
				token () {
					return {
						access_token: 'alfa',
					};
				},
			},
		};
	};

	it('throws if inputData not paypal', function () {
		throws(function () {
			mod.OLSKTradePayPalAccessToken(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns access.token', function () {
		deepEqual(mod.OLSKTradePayPalAccessToken(uPayPal), 'alfa');
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual((await mod.OLSKTradePayPalAccessToken(mod.DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalSubscription', function test_OLSKTradePayPalSubscription() {

	const uPayPal = function (inputData) {
		return {
			subscriptions: {
				retrieve () {
					return Array.from(arguments);
				},
			},
		};
	};

	it('throws if param1 not paypal', function () {
		throws(function () {
			mod.OLSKTradePayPalSubscription(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKTradePayPalSubscription(uPayPal, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns subscriptions.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(mod.OLSKTradePayPalSubscription(uPayPal, item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradePayPalSubscription(mod.DataFoilPayPal, 'I-SRVSXYP043JX')), '');
		});
	}

});

describe('OLSKTradePayPalTransactions', function test_OLSKTradePayPalTransactions() {

	const uPayPal = function (inputData) {
		return {
			transactions: {
				list () {
					return {
						transaction_details: [{
							alfa: 'bravo',
						}],
					};
				},
			},
		};
	};

	it('throws if inputData not paypal', function () {
		throws(function () {
			mod.OLSKTradePayPalTransactions(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns transactions.list', function () {
		deepEqual(mod.OLSKTradePayPalTransactions(uPayPal), [{
			alfa: 'bravo',
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradePayPalTransactions(mod.DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalOrder', function test_OLSKTradePayPalOrder() {

	const uPayPal = function (inputData) {
		return {
			orders: {
				retrieve () {
					return Array.from(arguments);
				},
			},
		};
	};

	it('throws if param1 not paypal', function () {
		throws(function () {
			mod.OLSKTradePayPalOrder(null, '');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not string', function () {
		throws(function () {
			mod.OLSKTradePayPalOrder(uPayPal, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns orders.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(mod.OLSKTradePayPalOrder(uPayPal, item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradePayPalOrder(mod.DataFoilPayPal, '1JF658855X7653252')), '');
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
