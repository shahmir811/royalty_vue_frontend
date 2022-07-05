import axios from '../../BaseUrl';
// import router from '../../../routes/router';
import { getURL } from '../../../helpers/index';

/////////////////////// Fetch all customers credit list ///////////////////////

export const fetchCustomerCredits = async ({ commit, dispatch }) => {
	commit('startPageLoad');

	const url = (await getURL()) + 'get-all-customers-credit';

	try {
		const response = await axios.get(url);

		commit('setCustomersList', response.data.data.customers);

		commit('endPageLoad');
	} catch (error) {
		console.log(error);
		checkAndRedirect(error.response.status, dispatch);
		commit('endPageLoad');
	}
};

/////////////////////// Fetch Customer Credit Details ///////////////////////

export const fetchCustomerCreditsDetailsFromServer = async ({ commit, dispatch }, customerId) => {
	commit('setFetchingCreditDetails', true);
	commit('clearCustomerRecord');
	commit('setCustomerSalesDropDownRecord');

	const url = (await getURL()) + 'customer-credit-details/' + customerId;

	return new Promise((resolve, reject) => {
		axios
			.get(`${url}`)
			.then(response => {
				const { customer_id, customer_name, data } = response.data;

				commit('setSelectedCustomerRecord', {
					id: customer_id,
					name: customer_name,
				});

				commit('setCreditRecordsData', data.credits);
				commit('setCustomerSalesDropDownRecord', data.sales);
				resolve();
				commit('setFetchingCreditDetails', false);
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
				commit('setFetchingCreditDetails', false);
			});
	});
};

/////////////////////// Fetch Payment Details ///////////////////////

export const fetchPaymentDetailsFromServer = async ({ commit, dispatch }, creditId) => {
	commit('setTotal');
	commit('setDueAmount');
	commit('setFetchingPaymentDetails', true);

	const url = (await getURL()) + 'credit-payment-details/' + creditId;

	return new Promise((resolve, reject) => {
		axios
			.get(`${url}`)
			.then(response => {
				const { customer_id, customer_name, data, due_amount, total } = response.data;

				commit('setTotal', total);
				commit('setDueAmount', due_amount);

				commit('setSelectedCustomerRecord', {
					id: customer_id,
					name: customer_name,
				});

				commit('setPaymentRecordsData', data.payments);
				resolve();
				commit('setFetchingPaymentDetails', false);
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
				commit('setFetchingPaymentDetails', false);
			});
	});
};

/////////////////////// Print Payment Details ///////////////////////

export const printPaymentDetailsOnServer = async ({ commit }, creditId) => {
	commit('clearErrors');

	const url = (await getURL()) + 'print-payment-details/' + creditId;

	axios
		.get(url, { responseType: 'arraybuffer' })
		.then(response => {
			let blob = new Blob([response.data], { type: 'application/pdf' });
			let link = document.createElement('a');
			link.href = window.URL.createObjectURL(blob);
			link.download = 'payment_details.pdf';
			link.click();
		})
		.catch(error => {
			console.log(error);
		});
};

/////////////////////// add Payment Details ///////////////////////

export const addPaymentToServer = async ({ commit, dispatch }, data) => {
	const { creditId, amount, paid_by, reason } = data;

	commit('setServerRequest', true);
	commit('clearErrors');
	const url = (await getURL()) + 'add-payment/' + creditId;

	return new Promise((resolve, reject) => {
		axios
			.post(`${url}`, { amount, paid_by, reason })
			.then(response => {
				const { due_amount, data } = response.data;

				commit('setDueAmount', due_amount);
				commit('pushLatestPayment', data.payment);
				resolve();
				commit('setServerRequest', false);
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
				commit('setError', error.response.data.errors);
				commit('setServerRequest', false);
			});
	});
};

/////////////////////// remove credit record ///////////////////////

export const removeCreditRecordFromServer = async ({ commit, dispatch }, creditId) => {
	const url = (await getURL()) + 'remove-customer-credit-record/' + creditId;

	return new Promise((resolve, reject) => {
		axios
			.get(`${url}`)
			.then(response => {
				const { data } = response.data;

				commit('setCustomerSalesDropDownRecord', data.sales);
				commit('removeCreditRow', creditId);
				resolve();
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
			});
	});
};

/////////////////////// add new customer credit record ///////////////////////

export const addNewCustomerCreditRecordOnServer = async ({ commit, dispatch }, data) => {
	commit('clearErrors');
	commit('setServerRequest', true);

	const { customer_id } = data;

	// console.log(rest);

	const url = (await getURL()) + 'add-new-customer-credit/' + customer_id;

	return new Promise((resolve, reject) => {
		axios
			.post(`${url}`, { ...data })
			.then(response => {
				const { data } = response.data;

				commit('addCreditRow', data.credit);
				commit('setCustomerSalesDropDownRecord', data.sales);
				resolve();
				commit('setServerRequest', false);
			})
			.catch(error => {
				console.log(error);
				checkAndRedirect(error.response.status, dispatch);
				reject();
				commit('setError', error.response.data.errors);
				commit('setServerRequest', false);
			});
	});
};

/////////////////////// clear Auth State and redirect ///////////////////////
const checkAndRedirect = (status, dispatch) => {
	if (status === 401) {
		dispatch('auth/clearAuth', '', { root: true });
	}
};
