const { throws, deepEqual } = require('assert');

const mod = require('./main.js');

const liveEnabled = false;

const uDone = function (inputData) {
	return inputData;
};

describe('OLSKTradeStripeSession', function test_OLSKTradeStripeSession() {

	const _OLSKTradeStripeSession = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				checkout: {
					sessions: {
						retrieve () {
							return Array.from(arguments);
						},
					},
				},
			},
		}).OLSKTradeStripeSession(...arguments);
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeSession(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns checkout.sessions.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradeStripeSession(item), [item, {
			expand: ['customer'],
		}]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeSession('cs_test_349RhhKHLSqyTxTGDF7zoZvLEm8eEss0snlu991ZOm7c5FvDVubbvFFo')), '');
		});
	}

});

describe('OLSKTradeStripeCreateSession', function test_OLSKTradeStripeCreateSession() {

	const _OLSKTradeStripeCreateSession = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				checkout: {
					sessions: {
						create () {
							return Array.from(arguments);
						},
					},
				},
			},
		}).OLSKTradeStripeCreateSession(...arguments);
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTradeStripeCreateSession(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns checkout.sessions.create', function () {
		const item = {
			alfa: 'bravo',
		};

		deepEqual(_OLSKTradeStripeCreateSession(item), [Object.assign(item, {
			payment_method_types: ['card'],
		})]);
	});

});

describe('OLSKTradeStripeListSubscriptions', function test_OLSKTradeStripeListSubscriptions() {

	const _OLSKTradeStripeListSubscriptions = function (list) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				subscriptions: {
					list,
				},
			},
		}).OLSKTradeStripeListSubscriptions();
	};

	it('calls subscriptions.list', function () {
		const item = [];

		_OLSKTradeStripeListSubscriptions(function () {
			item.push(...arguments);

			return {};
		});

		deepEqual(item, [{
			limit: 50,
		}]);
	});

	it('returns subscriptions.list.data', function () {
		const data = [Math.random().toString()];

		deepEqual(_OLSKTradeStripeListSubscriptions(function () {
			return {
				data,
			};
		}), data);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeListSubscriptions()), '');
		});
	}

});

describe('OLSKTradeStripeSubscription', function test_OLSKTradeStripeSubscription() {

	const _OLSKTradeStripeSubscription = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				subscriptions: {
					retrieve () {
						return Array.from(arguments);
					},
				},
			},
		}).OLSKTradeStripeSubscription(...arguments);
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeSubscription(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns subscriptions.retrieve', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradeStripeSubscription(item), [item]);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeSubscription('sub_HxEfQdyTuBzal0')), '');
		});
	}

});

describe('OLSKTradeStripeSubscriptionDelete', function test_OLSKTradeStripeSubscriptionDelete() {

	const _OLSKTradeStripeSubscriptionDelete = function () {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				subscriptions: {
					del () {
						return Array.from(arguments);
					},
				},
			},
		}).OLSKTradeStripeSubscriptionDelete(...arguments);
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeSubscriptionDelete(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns subscriptions.del', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradeStripeSubscriptionDelete(item), [item]);
	});

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
		}).OLSKTradeStripeInvoice(...arguments);
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
		}).OLSKTradeStripeCharge(...arguments);
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

	it('excludes over eight characters', function () {
		deepEqual(mod.OLSKTradeStripeInvoicePrefix('alfabravo'), 'alfabravo');
	});

	it('extracts if suffix', function () {
		deepEqual(mod.OLSKTradeStripeInvoicePrefix('CA86B084-0001'), 'CA86B084');
	});

	it('matches description', function () {
		deepEqual(mod.OLSKTradeStripeInvoicePrefix('Invoice CA86B084-0001'), 'CA86B084');
	});

});

describe('OLSKTradeStripeListCustomers', function test_OLSKTradeStripeListCustomers() {

	const _OLSKTradeStripeListCustomers = function (list, inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilStripe: {
				customers: {
					list,
				},
			},
		}).OLSKTradeStripeListCustomers(inputData || Math.random().toString());
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradeStripeListCustomers(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('calls customers.list', function () {
		const item = [];

		const email = Math.random().toString();

		_OLSKTradeStripeListCustomers(function () {
			item.push(...arguments);

			return {};
		}, email);

		deepEqual(item, [{
			email,
		}]);
	});

	it('returns customers.list.data', function () {
		const data = [Math.random().toString()];

		deepEqual(_OLSKTradeStripeListCustomers(function () {
			return {
				data,
			};
		}), data);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await mod.OLSKTradeStripeListCustomers()), '');
		});
	}

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

	it('returns null if not found', function () {
		deepEqual(_OLSKTradePayPalSubscription('alfa', {
			subscriptions: {
				retrieve () {
					return {
						name: 'RESOURCE_NOT_FOUND',
					};
				},
			},
		}), null);
	});

	if (liveEnabled) {
		it('returns live data', async function () {
			deepEqual(JSON.stringify(await _OLSKTradePayPalSubscription('I-SRVSXYP043JX', mod._DataFoilPayPal)), '');
		});
	}

});

describe('OLSKTradePayPalSubscriptionDelete', function test_OLSKTradePayPalSubscriptionDelete() {

	const _OLSKTradePayPalSubscriptionDelete = function (param1, param2) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				subscriptions: {
					del () {
						return Array.from(arguments);
					},
				},
			}, param2),
		}).OLSKTradePayPalSubscriptionDelete(param1);
	};

	it('throws if not string', function () {
		throws(function () {
			_OLSKTradePayPalSubscriptionDelete(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('returns _DataFoilPayPal.subscriptions.del', function () {
		const item = Date.now().toString();
		deepEqual(_OLSKTradePayPalSubscriptionDelete(item), [item]);
	});

});

describe('OLSKTradePayPalCacheTransaction', function test_OLSKTradePayPalCacheTransaction() {

	beforeEach(function () {
		mod._DataPayPalCachedTransactions = [];
	});

	it('throws if param1 not date', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date('alfa'), 1, 'alfa');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not integer', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date(), null, 'alfa');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param2 not above 0', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date(), 0, 'alfa');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param3 not string', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date(), 1, null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param3 not JSON', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date(), 1, '}');
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param4 not string', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date(), 1, '{}', null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if param4 not filled', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheTransaction(new Date(), 1, '{}', ' ');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns undefined', function () {
		deepEqual(mod.OLSKTradePayPalCacheTransaction(new Date(), 1, '{}', 'bravo'), undefined);
	});

	context('_DataPayPalCachedTransactions', function () {

		it('generates _DataPayPalCachedTransactions', function () {
			const date = new Date();
			const number = Date.now();
			const string1 = JSON.stringify({
				alfa: Math.random(),
			});
			const string2 = Math.random().toString();
			
			mod.OLSKTradePayPalCacheTransaction(date, number, string1, string2);

			deepEqual(mod._DataPayPalCachedTransactions, [{
		    transaction_info: {
		      transaction_initiation_date: date.toJSON(),
		      transaction_amount: {
		        value: number + '.00'
		      },
		      custom_field: string1,
		      invoice_id: string2,
		    },
		  }])
		});
	
	});

});

describe('OLSKTradePayPalCacheOrder', function test_OLSKTradePayPalCacheOrder() {

	beforeEach(function () {
		mod._DataPayPalCachedTransactions = [];
	});

	const _OLSKTradePayPalCacheOrder = function (inputData = null) {
		return Object.assign(Object.assign({}, mod), {
			OLSKTradePayPalOrder () {
				return inputData;
			},
		}).OLSKTradePayPalCacheOrder('alfa');
	};

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheOrder(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if not filled', function () {
		throws(function () {
			mod.OLSKTradePayPalCacheOrder(' ');
		}, /OLSKErrorInputNotValid/);
	});

	it('returns undefined', function () {
		deepEqual(_OLSKTradePayPalCacheOrder(), undefined);
	});

	context('_DataPayPalCachedTransactions', function () {

		it('generates nothing if returns null', function () {
			_OLSKTradePayPalCacheOrder();

			deepEqual(mod._DataPayPalCachedTransactions, [])
		});

		it('generates _DataPayPalCachedTransactions', function () {
			const date = new Date();
			const number = Date.now();
			const string1 = JSON.stringify({
				alfa: Math.random(),
			});
			const string2 = Math.random().toString();
			
			_OLSKTradePayPalCacheOrder({
				purchase_units: [
				  {
				    amount: {
				      value: number + '.00',
				    },
				    custom_id: string1,
				    invoice_id: string2,
				  }
				],
				create_time: date.toJSON(),
			});

			deepEqual(mod._DataPayPalCachedTransactions, [{
		    transaction_info: {
		      transaction_initiation_date: date.toJSON(),
		      transaction_amount: {
		        value: number + '.00'
		      },
		      custom_field: string1,
		      invoice_id: string2,
		    },
		  }])
		});
	
	});

	if (liveEnabled) {
		it('caches live data', async function () {
			this.timeout(10000)
			await mod.OLSKTradePayPalCacheOrder('1M500636BA509790U');

			deepEqual(mod._DataPayPalCachedTransactions, [{
		    transaction_info: {
		      invoice_id: 'kfy044jt',
		      transaction_amount: {
		        value: '3.00'
		      },
		      transaction_initiation_date: '2020-10-06T13:31:06.000Z'
		    }
		  }]);
		});
	}

});

describe('OLSKTradePayPalTransactions', function test_OLSKTradePayPalTransactions() {

	const _OLSKTradePayPalTransactions = function (inputData) {
		return Object.assign(Object.assign({}, mod), {
			_DataFoilPayPal: Object.assign({
				transactions: {
					list (inputData) {
						return {
							transaction_details: [{
								alfa: inputData,
							}],
						};
					},
				},
			}, inputData),
		}).OLSKTradePayPalTransactions();
	};

	beforeEach(function () {
		mod._DataPayPalCachedTransactions = [];
	});

	it('returns _DataFoilPayPal.transactions.list', async function () {
		deepEqual(await _OLSKTradePayPalTransactions(), [{
			alfa: 0,
		}, {
			alfa: 1,
		}]);
	});

	it('includes _DataPayPalCachedTransactions', async function () {
		mod._DataPayPalCachedTransactions = ['alfa'];
		
		deepEqual(await _OLSKTradePayPalTransactions(), ['alfa', {
			alfa: 0,
		}, {
			alfa: 1,
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
