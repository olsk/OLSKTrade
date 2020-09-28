const kPayPalService = process.env.NODE_ENV === 'production' ? 'api' : 'api.sandbox';

const uPromise = function (inputData) {
	if (inputData instanceof Promise) {
		return inputData;
	}

	return {
		then (res) {
			return res(inputData);
		},
	};
};

const uIsFilled = function (inputData) {
	return typeof inputData === 'string' && inputData.trim() !== '';
};

const mod = {

	OLSKTradeStripeGuardMiddleware (req, res, next) {
		return next((function (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!uIsFilled(inputData.OLSK_TRADE_STRIPE_SECRET_API_KEY)) {
				return new Error('OLSK_TRADE_STRIPE_SECRET_API_KEY not filled');
			}
		})(req._FakeEnv || process.env));
	},

	OLSKTradePayPalGuardMiddleware (req, res, next) {
		return next((function (inputData) {
			if (typeof inputData !== 'object' || inputData === null) {
				throw new Error('OLSKErrorInputNotValid');
			}

			if (!uIsFilled(inputData.OLSK_TRADE_PAYPAL_CLIENT_ID)) {
				return new Error('OLSK_TRADE_PAYPAL_CLIENT_ID not filled');
			}

			if (!uIsFilled(inputData.OLSK_TRADE_PAYPAL_CLIENT_SECRET)) {
				return new Error('OLSK_TRADE_PAYPAL_CLIENT_SECRET not filled');
			}
		})(req._FakeEnv || process.env));
	},

	OLSKTradeStripeSession (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_TRADE_STRIPE_SECRET_API_KEY).checkout.sessions.retrieve(param2, {
			expand: ['customer'],
		});

		return param1(process.env.OLSK_TRADE_STRIPE_SECRET_API_KEY).checkout.sessions.retrieve(param2);
	},

	OLSKTradeStripeSubscription (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.subscriptions.retrieve(inputData);
	},

	OLSKTradeStripeInvoice (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.invoices.retrieve(inputData);
	},

	OLSKTradeStripeCharge (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.charges.retrieve(inputData);
	},

	OLSKTradeStripeListCharges () {
		return uPromise(this._DataFoilStripe.charges.list({
			limit: 30,
		})).then(function (inputData) {
			return inputData.data;
		});
	},

	OLSKTradeStripeListInvoices () {
		return uPromise(this._DataFoilStripe.invoices.list({
			limit: 30,
		})).then(function (inputData) {
			return inputData.data;
		});
	},

	OLSKTradeStripeInvoicePrefix (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return inputData.slice(0, 8);
	},

	OLSKTradePayPalAccessToken () {
		return uPromise(this._DataFoilPayPal.access.token()).then(function (inputData) {
			return inputData.access_token;
		});
	},

	OLSKTradePayPalSubscription (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!this._DataFoilPayPal) {
			Object.assign(this, mod); // #hotfix-test-global-this
		}

		return this._DataFoilPayPal.subscriptions.retrieve(inputData);
	},

	OLSKTradePayPalTransactions () {
		return uPromise(this._DataFoilPayPal.transactions.list()).then(function (inputData) {
			return inputData.transaction_details;
		});
	},

	OLSKTradePayPalOrder (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilPayPal.orders.retrieve(inputData);
	},

	OLSKTradePayPalPlan (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilPayPal.plans.retrieve(inputData);
	},

	OLSKTradePayPalSubscriptionTransactions (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(this._DataFoilPayPal.subscriptions.transactions(inputData)).then(function (inputData) {
			return inputData.transactions;
		});
	},

	// DATA

	_DataFoilStripe: (function(inputData) {
		return require('stripe')(inputData);
	})(process.env.OLSK_TRADE_STRIPE_SECRET_API_KEY),
	_DataFoilPayPal: (function(user, pass) {
		const uHeaders = function (inputData = {}) {
			const header = require('node-fetch').Headers;
			
			return Object.entries(Object.assign({
				'Accept': 'application/json',
				'Accept-Language': 'en_US',
			}, inputData)).reduce(function (coll, item) {
				coll.set(item[0], item[1]);
				return coll;
			}, new header());
		};

		const uURL = function (param1, param2) {
			const { URL, URLSearchParams } = require('url');

			return (function(inputData) {
				inputData.search = new URLSearchParams(param2).toString();

				return inputData;
			})(new URL(param1));
		};

		const uFetch = async function () {
			return (await require('node-fetch')(...arguments)).json();
		};

		return {
			access: {
				async token () {
					return uFetch(`https://${ kPayPalService }.paypal.com/v1/oauth2/token?grant_type=client_credentials`, {
						method: 'POST',
						headers: uHeaders({
							'Authorization': 'Basic ' + Buffer.from((`${ user }:${ pass }`)).toString('base64'),
						}),
					});
				},
			},
			transactions: {
				async list () {
					const uDate = function (inputData = 0) {
						return (new Date(Date.now() - inputData)).toJSON();
					};

					return uFetch(uURL(`https://${ kPayPalService }.paypal.com/v1/reporting/transactions`, {
						start_date: uDate(1000 * 60 * 60 * 24 * 30),
						end_date: uDate(),
						fields: 'all',
					}), {
						method: 'GET',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
						}),
					});
				},
			},
			orders: {
				async retrieve (inputData) {
					return uFetch(uURL(`https://${ kPayPalService }.paypal.com/v2/checkout/orders/${ inputData }`, {
					}), {
						method: 'GET',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
						}),
					});
				},
			},
			plans: {
				async retrieve (inputData) {
					return uFetch(uURL(`https://${ kPayPalService }.paypal.com/v1/billing/plans/${ inputData }`, {
					}), {
						method: 'GET',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
						}),
					});
				},
			},
			subscriptions: {
				async retrieve (inputData) {
					return uFetch(uURL(`https://${ kPayPalService }.paypal.com/v1/billing/subscriptions/${ inputData }`, {
					}), {
						method: 'GET',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
						}),
					});
				},
				async transactions (inputData) {
					const uDate = function (inputData = 0) {
						return (new Date(Date.now() - inputData)).toJSON();
					};

					return uFetch(uURL(`https://${ kPayPalService }.paypal.com/v1/billing/subscriptions/${ inputData }/transactions`, {
						start_time: uDate(1000 * 60 * 60 * 24 * 30),
						end_time: uDate(),
					}), {
						method: 'GET',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
						}),
					});
				},
			},
		};
	})(process.env.OLSK_TRADE_PAYPAL_CLIENT_ID, process.env.OLSK_TRADE_PAYPAL_CLIENT_SECRET),

};

Object.assign(exports, mod);
