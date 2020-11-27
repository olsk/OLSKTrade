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

	OLSKTradeStripeSession (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.checkout.sessions.retrieve(inputData, {
			expand: ['customer'],
		});
	},

	OLSKTradeStripeCreateSession (inputData) {
		if (typeof inputData !== 'object' || inputData === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.checkout.sessions.create(Object.assign(inputData, {
			payment_method_types: ['card'],
		}));
	},

	OLSKTradeStripeListSubscriptions () {
		return uPromise(this._DataFoilStripe.subscriptions.list({
			limit: 50,
		})).then(function (inputData) {
			return inputData.data;
		});
	},

	OLSKTradeStripeSubscription (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.subscriptions.retrieve(inputData);
	},

	OLSKTradeStripeSubscriptionDelete (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilStripe.subscriptions.del(inputData);
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

		return (inputData.match(/\b\w{8}\b/) || [inputData])[0];
	},

	OLSKTradeStripeListCustomers (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(this._DataFoilStripe.customers.list({
			email: inputData,
		})).then(function (inputData) {
			return inputData.data;
		});
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

		return uPromise(this._DataFoilPayPal.subscriptions.retrieve(inputData)).then(function (result) {
			return result.name === 'RESOURCE_NOT_FOUND' ? null : result;
		});
	},

	OLSKTradePayPalSubscriptionDelete (inputData) {
		if (typeof inputData !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return this._DataFoilPayPal.subscriptions.del(inputData);
	},

	OLSKTradePayPalCacheOrder (inputData) {
		if (!uIsFilled(inputData)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return uPromise(this.OLSKTradePayPalOrder(inputData)).then(function (order) {
			if (!order) {
				return;
			}

			_this.OLSKTradePayPalCacheTransaction(new Date(order.create_time), parseInt(order.purchase_units[0].amount.value), order.purchase_units[0].custom_id, order.purchase_units[0].invoice_id);
		});
	},

	OLSKTradePayPalCacheTransaction (param1, param2, param3, param4) {
		if (!(param1 instanceof Date) || Number.isNaN(param1.getTime())) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (parseInt(param2) !== param2 || param2 < 1) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!uIsFilled(param3) || param3[0] !== '{') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!uIsFilled(param4)) {
			throw new Error('OLSKErrorInputNotValid');
		}

		this._DataPayPalCachedTransactions.push({
			transaction_info: {
			  transaction_initiation_date: param1.toJSON(),
			  transaction_amount: {
			    value: param2 + '.00'
			  },
			  custom_field: param3,
			  invoice_id: param4,
			},
		});
	},

	OLSKTradePayPalTransactions () {
		const _this = this;
		
		return uPromise(Promise.all([
			this._DataFoilPayPal.transactions.list(0),
			this._DataFoilPayPal.transactions.list(1),
			])).then(function (inputData) {
			return _this._DataPayPalCachedTransactions.concat([].concat.apply([], inputData.map(function (e) {
				return e.transaction_details;
			})));
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

	_DataFoilStripe: require('stripe')(process.env.OLSK_TRADE_STRIPE_SECRET_API_KEY),
	_DataPayPalCachedTransactions: [],
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

		const uFetchNoContent = function () {
			return require('node-fetch')(...arguments);
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
				async list (inputData) {
					const uDate = function (inputData = 0) {
						return (new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * inputData)).toJSON();
					};

					return uFetch(uURL(`https://${ kPayPalService }.paypal.com/v1/reporting/transactions`, {
						start_date: uDate(inputData + 1),
						end_date: uDate(inputData),
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
				async update (inputData) {
					return (await require('node-fetch')(uURL(`https://${ kPayPalService }.paypal.com/v1/billing/subscriptions/${ inputData }`, {
					}), {
						method: 'PATCH',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
							'Content-Type': 'application/json',
						}),
						body: JSON.stringify([{
							op: 'replace',
							path: '/custom_id',
					    value: 'alfa',
					  }]),
					})).text()
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
				async del (inputData) {
					return uFetchNoContent(uURL(`https://${ kPayPalService }.paypal.com/v1/billing/subscriptions/${ inputData }/cancel`, {
					}), {
						method: 'POST',
						headers: uHeaders({
							'Authorization': 'Bearer ' + await mod.OLSKTradePayPalAccessToken(),
							'Content-Type': 'application/json',
						}),
						body: JSON.stringify({
							reason: 'cancel',
						}),
					});
				},
			},
		};
	})(process.env.OLSK_TRADE_PAYPAL_CLIENT_ID, process.env.OLSK_TRADE_PAYPAL_CLIENT_SECRET),

};

Object.assign(exports, mod);
