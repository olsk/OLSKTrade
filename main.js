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

const mod = {

	OLSKTradeStripeSession (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).checkout.sessions.retrieve(param2, {
			expand: ['customer'],
		});

		return param1(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).checkout.sessions.retrieve(param2);
	},

	OLSKTradeStripeSubscription (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).subscriptions.retrieve(param2);
	},

	OLSKTradeStripeInvoice (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).invoices.retrieve(param2);
	},

	OLSKTradeStripeCharge (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).charges.retrieve(param2);
	},

	OLSKTradeStripeListCharges (inputData) {
		if (typeof inputData !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(inputData(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).charges.list({
			limit: 30,
		})).then(function (inputData) {
			return inputData.data;
		});
	},

	OLSKTradeStripeListInvoices (inputData) {
		if (typeof inputData !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(inputData(process.env.OLSK_DONATE_STRIPE_SECRET_API_KEY).invoices.list({
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

	OLSKTradePayPalAccessToken (inputData) {
		if (typeof inputData !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(inputData(process.env.OLSK_DONATE_PAYPAL_CLIENT_ID, process.env.OLSK_DONATE_PAYPAL_CLIENT_SECRET).access.token()).then(function (inputData) {
			return inputData.access_token;
		});
	},

	OLSKTradePayPalSubscription (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_PAYPAL_CLIENT_ID, process.env.OLSK_DONATE_PAYPAL_CLIENT_SECRET, process.env.OLSK_DONATE_PAYPAL_TEMP_TOKEN).subscriptions.retrieve(param2);
	},

	OLSKTradePayPalTransactions (inputData) {
		if (typeof inputData !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(inputData(process.env.OLSK_DONATE_PAYPAL_CLIENT_ID, process.env.OLSK_DONATE_PAYPAL_CLIENT_SECRET, process.env.OLSK_DONATE_PAYPAL_TEMP_TOKEN).transactions.list()).then(function (inputData) {
			return inputData.transaction_details;
		});
	},

	OLSKTradePayPalOrder (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_PAYPAL_CLIENT_ID, process.env.OLSK_DONATE_PAYPAL_CLIENT_SECRET, process.env.OLSK_DONATE_PAYPAL_TEMP_TOKEN).orders.retrieve(param2);
	},

	OLSKTradePayPalPlan (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return param1(process.env.OLSK_DONATE_PAYPAL_CLIENT_ID, process.env.OLSK_DONATE_PAYPAL_CLIENT_SECRET, process.env.OLSK_DONATE_PAYPAL_TEMP_TOKEN).plans.retrieve(param2);
	},

	OLSKTradePayPalSubscriptionTransactions (param1, param2) {
		if (typeof param1 !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof param2 !== 'string') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return uPromise(param1(process.env.OLSK_DONATE_PAYPAL_CLIENT_ID, process.env.OLSK_DONATE_PAYPAL_CLIENT_SECRET, process.env.OLSK_DONATE_PAYPAL_TEMP_TOKEN).subscriptions.transactions(param2)).then(function (inputData) {
			return inputData.transactions;
		});
	},

};

Object.assign(exports, mod);
